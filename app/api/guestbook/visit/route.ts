import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getOrCreateVisitorId } from "@/lib/guestbook-visitor";

// ── Best-effort in-memory rate limiter ──
// Caps requests per IP on a warm serverless instance. State is per-instance and
// resets on cold start, so it is not a hard cross-fleet guarantee. Defensive
// only, this route has no server-side dedup of "already counted this session"
// (that lives client-side via sessionStorage) — this just stops a scripted loop
// from hammering the counter.
const RATE_LIMIT = { max: 10, windowMs: 60_000 };
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
                { error: "Too many requests." },
                { status: 429, headers: { "Retry-After": "60" } }
            );
        }

        await getOrCreateVisitorId();

        let supabase;
        try {
            supabase = getSupabaseAdmin();
        } catch (e) {
            console.error("Guestbook visit POST: Supabase not configured:", e);
            return NextResponse.json({ error: "Guestbook is not configured." }, { status: 503 });
        }

        const { data, error } = await supabase.rpc("increment_guestbook_visits");
        if (error) {
            console.error("Guestbook visit POST: increment failed:", error);
            return NextResponse.json({ error: "Failed to record visit." }, { status: 500 });
        }

        return NextResponse.json({ visits: data ?? 0 });
    } catch (err) {
        console.error("Guestbook visit POST Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
