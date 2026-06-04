import { NextResponse } from "next/server";
import { subscribeToKlaviyoList } from "@/lib/klaviyo";

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

        const email = typeof (body as Record<string, unknown>)?.email === "string"
            ? ((body as Record<string, string>).email).trim()
            : "";

        if (!EMAIL_RE.test(email) || email.length > 254) {
            return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
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

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Subscribe API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
