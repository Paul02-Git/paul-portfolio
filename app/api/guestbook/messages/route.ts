import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getOrCreateVisitorId } from "@/lib/guestbook-visitor";
import { looksLikeSpam } from "@/lib/antispam";
import { containsBlockedWord } from "@/lib/guestbook-blocklist";

// No HTML-escaping here: messages/nicknames are stored as plain text and
// rendered via JSX text children in GuestbookMessageList (never
// dangerouslySetInnerHTML), so React already escapes them at render time.
// Escaping here too would double-encode (e.g. "Tom & Jerry" -> "Tom &amp; Jerry"
// displayed literally).

/** Collapse CR/LF to spaces so a pasted-in newline can't break the nickname's single-line display. */
function singleLine(input: string): string {
    return input.replace(/[\r\n]+/g, " ").trim();
}

const LIMITS = { nickname: 40, message: 300 };
const MAX_MESSAGES_PER_VISITOR = 3;

// ── Best-effort in-memory rate limiter (own instance, separate from the
// contact form's and the visit route's) ──
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const ipHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
    if (recent.length >= RATE_LIMIT.max) {
        ipHits.set(ip, recent);
        return true;
    }
    recent.push(now);
    ipHits.set(ip, recent);
    if (ipHits.size > 5000) {
        for (const [key, times] of ipHits) {
            if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) ipHits.delete(key);
        }
    }
    return false;
}

export async function POST(req: Request) {
    try {
        if (isRateLimited(getClientIp(req))) {
            return NextResponse.json(
                { error: "Too many requests. Please wait a minute and try again." },
                { status: 429, headers: { "Retry-After": "60" } }
            );
        }

        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
        }

        const data = (body ?? {}) as Record<string, unknown>;

        // Anti-spam: honeypot + time-trap. Silently succeed so bots learn nothing.
        if (looksLikeSpam({ honeypot: data.honeypot, elapsedMs: data.elapsedMs })) {
            return NextResponse.json({ success: true });
        }

        const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
        const nickname = str(data.nickname);
        const message = str(data.message);

        if (!nickname || !message) {
            return NextResponse.json({ error: "Nickname and message are required." }, { status: 400 });
        }
        if (nickname.length > LIMITS.nickname || message.length > LIMITS.message) {
            return NextResponse.json({ error: "Nickname or message is too long." }, { status: 400 });
        }
        if (containsBlockedWord(nickname) || containsBlockedWord(message)) {
            return NextResponse.json({ error: "Please keep it friendly." }, { status: 400 });
        }

        const visitorId = await getOrCreateVisitorId();

        let supabase;
        try {
            supabase = getSupabaseAdmin();
        } catch (e) {
            console.error("Guestbook messages POST: Supabase not configured:", e);
            return NextResponse.json({ error: "Guestbook is not configured." }, { status: 503 });
        }

        // Count-then-insert isn't atomic — two concurrent requests from the same
        // visitor (a double-click, two open tabs) could both pass this check
        // before either inserts, letting the cap slip by one or two. Accepted
        // for the "Basic" anti-spam tier; Paul can delete any excess via the
        // Supabase dashboard if it ever matters in practice.
        const { count, error: countError } = await supabase
            .from("guestbook_messages")
            .select("*", { count: "exact", head: true })
            .eq("visitor_id", visitorId);

        if (countError) {
            console.error("Guestbook messages POST: count query failed:", countError);
            return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
        }
        if ((count ?? 0) >= MAX_MESSAGES_PER_VISITOR) {
            return NextResponse.json(
                { error: "You've used all 3 of your messages. Thanks for signing!" },
                { status: 403 }
            );
        }

        const { data: inserted, error: insertError } = await supabase
            .from("guestbook_messages")
            .insert({
                visitor_id: visitorId,
                nickname: singleLine(nickname),
                message: message,
            })
            .select("id, nickname, message, created_at")
            .single();

        if (insertError) {
            console.error("Guestbook messages POST: insert failed:", insertError);
            return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
        }

        return NextResponse.json(
            {
                id: inserted.id,
                nickname: inserted.nickname,
                message: inserted.message,
                createdAt: inserted.created_at,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Guestbook messages POST Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
