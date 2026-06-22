import { Resend } from "resend";
import { NextResponse } from "next/server";
import { subscribeToKlaviyoList } from "@/lib/klaviyo";
import { renderLeadEmail } from "@/lib/email";
import { hasDeliverableDomain } from "@/lib/validate-email";
import { looksLikeSpam } from "@/lib/antispam";

/** Escape HTML special characters to prevent HTML injection in the email body. */
function escapeHtml(input: string): string {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Best-effort in-memory rate limiter (per warm serverless instance) ──
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
        const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
        const listId = process.env.KLAVIYO_LIST_ID;
        if (!apiKey || !listId) {
            console.error(
                "KLAVIYO_PRIVATE_API_KEY and/or KLAVIYO_LIST_ID is not set. Add them to .env.local (local) and your Vercel env vars (production)."
            );
            return NextResponse.json({ error: "Newsletter is not configured." }, { status: 503 });
        }

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

        const sd = (body ?? {}) as Record<string, unknown>;

        // Anti-spam: honeypot + time-trap. Silently succeed so bots learn nothing.
        if (looksLikeSpam({ honeypot: sd.company, elapsedMs: sd.elapsedMs })) {
            return NextResponse.json({ success: true });
        }

        const email = typeof sd.email === "string" ? sd.email.trim() : "";

        if (!EMAIL_RE.test(email) || email.length > 254) {
            return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
        }
        if (!(await hasDeliverableDomain(email))) {
            return NextResponse.json({ error: "That email domain doesn’t exist. Please use a real email address." }, { status: 400 });
        }

        const res = await subscribeToKlaviyoList({
            apiKey,
            listId,
            email,
            source: "Website Newsletter",
        });

        // The bulk endpoint returns 202 Accepted on success (async job).
        if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error("Klaviyo subscribe error:", res.status, detail);
            return NextResponse.json(
                { error: "Could not subscribe right now. Please try again later." },
                { status: 502 }
            );
        }

        // Best-effort: notify the admin of the new subscriber with a branded email.
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                const esc = escapeHtml(email);
                await new Resend(resendKey).emails.send({
                    from: "New Subscriber <onboarding@resend.dev>",
                    to: ["paulpuzon0007@gmail.com"],
                    subject: `New newsletter subscriber: ${email}`.slice(0, 200),
                    replyTo: email,
                    html: renderLeadEmail({
                        heading: "New Newsletter Subscriber",
                        subheading: "Someone just joined your list.",
                        badge: "Newsletter",
                        rows: [{ label: "Email", value: esc, href: `mailto:${esc}` }],
                        cta: { label: "Reply to subscriber →", href: `mailto:${esc}` },
                    }),
                });
            } catch (e) {
                console.error("Subscriber notification email failed:", e);
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Subscribe API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
