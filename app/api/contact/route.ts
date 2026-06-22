import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { subscribeToKlaviyoList, upsertKlaviyoProfile } from '@/lib/klaviyo';
import { renderLeadEmail, type EmailRow } from '@/lib/email';
import { hasDeliverableDomain } from '@/lib/validate-email';
import { looksLikeSpam } from '@/lib/antispam';

/** Escape HTML special characters to prevent HTML injection in the email body. */
function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Collapse CR/LF to spaces so values used in the Subject header can't inject headers. */
function singleLine(input: string): string {
    return input.replace(/[\r\n]+/g, ' ').trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length caps, reject oversized payloads / abuse.
const LIMITS = { name: 100, email: 254, phone: 40, subject: 150, budget: 60, comment: 5000 };

// ── Best-effort in-memory rate limiter ──
// Caps requests per IP on a warm serverless instance. State is per-instance and
// resets on cold start, so it is not a hard cross-fleet guarantee. For durable,
// distributed limiting, swap this for @upstash/ratelimit backed by Upstash Redis.
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const ipHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
    const xff = req.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    return req.headers.get('x-real-ip') ?? 'unknown';
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
    // Opportunistic cleanup so the map can't grow unbounded across many IPs.
    if (ipHits.size > 5000) {
        for (const [key, times] of ipHits) {
            if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) ipHits.delete(key);
        }
    }
    return false;
}

export async function POST(req: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not set. Add it to .env.local (local) and your Vercel env vars (production).');
            return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
        }

        // Rate limit by client IP.
        if (isRateLimited(getClientIp(req))) {
            return NextResponse.json(
                { error: 'Too many requests. Please wait a minute and try again.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        // Parse body defensively.
        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
        }

        const data = (body ?? {}) as Record<string, unknown>;

        // Anti-spam: honeypot + time-trap. Silently succeed so bots learn nothing.
        if (looksLikeSpam({ honeypot: data.company, elapsedMs: data.elapsedMs })) {
            return NextResponse.json({ success: true });
        }

        const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

        const name = str(data.name);
        const email = str(data.email);
        const phone = str(data.phone);
        const subject = str(data.subject);
        const budget = str(data.budget);
        const comment = str(data.comment);

        // Validation
        if (!name || !email || !comment) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }
        if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }
        if (!(await hasDeliverableDomain(email))) {
            return NextResponse.json({ error: 'That email domain doesn’t exist. Please use a real email address.' }, { status: 400 });
        }
        if (
            name.length > LIMITS.name ||
            phone.length > LIMITS.phone ||
            subject.length > LIMITS.subject ||
            budget.length > LIMITS.budget ||
            comment.length > LIMITS.comment
        ) {
            return NextResponse.json({ error: 'One or more fields exceed the maximum length.' }, { status: 400 });
        }

        const resend = new Resend(apiKey);

        // HTML-escape every interpolated value before it goes into the email markup.
        const s = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            subject: escapeHtml(subject),
            budget: escapeHtml(budget),
            comment: escapeHtml(comment),
        };

        const rows: EmailRow[] = [
            { label: 'Name', value: s.name },
            { label: 'Email', value: s.email, href: `mailto:${s.email}` },
        ];
        if (s.phone) rows.push({ label: 'Phone', value: s.phone });
        if (s.subject) rows.push({ label: 'Subject', value: s.subject });
        if (s.budget) rows.push({ label: 'Budget', value: s.budget });

        const { data: sent, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: ['paulpuzon0007@gmail.com'],
            subject: singleLine(`New Inquiry from ${name}${subject ? `: ${subject}` : ''}`).slice(0, 200),
            replyTo: email,
            html: renderLeadEmail({
                heading: 'New Contact Inquiry',
                subheading: `from ${s.name}`,
                badge: 'Contact Form',
                rows,
                message: { label: 'Message', value: s.comment },
                cta: { label: `Reply to ${s.name} →`, href: `mailto:${s.email}` },
            }),
        });

        if (error) {
            // Log the detail server-side, return a generic message to the client.
            console.error('Resend Error:', error);
            return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
        }

        // Best-effort: also capture the lead in Klaviyo. Never block or fail the
        // contact submission on a Klaviyo error, the email already went through.
        const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
        const leadsListId = process.env.KLAVIYO_LEADS_LIST_ID || process.env.KLAVIYO_LIST_ID;
        if (klaviyoKey && leadsListId) {
            const [firstName, ...rest] = name.split(/\s+/);
            const lastName = rest.join(' ');
            const leadProperties: Record<string, string> = { 'Lead Source': 'Contact Form' };
            if (subject) leadProperties['Inquiry Subject'] = subject;
            if (budget) leadProperties['Budget'] = budget;
            if (comment) leadProperties['Message'] = comment;
            if (phone) leadProperties['Phone'] = phone;

            try {
                // Add to the list with email-marketing consent.
                const subRes = await subscribeToKlaviyoList({
                    apiKey: klaviyoKey,
                    listId: leadsListId,
                    email,
                    source: 'Contact Form',
                });
                if (!subRes.ok) {
                    console.error('Klaviyo subscribe failed:', subRes.status, await subRes.text().catch(() => ''));
                }

                // Upsert the full profile (name, phone, inquiry details).
                const upRes = await upsertKlaviyoProfile({
                    apiKey: klaviyoKey,
                    email,
                    firstName: firstName || undefined,
                    lastName: lastName || undefined,
                    phone: phone || undefined,
                    properties: leadProperties,
                });
                if (!upRes.ok) {
                    console.error('Klaviyo profile upsert failed:', upRes.status, await upRes.text().catch(() => ''));
                }
            } catch (e) {
                console.error('Klaviyo lead capture error:', e);
            }
        }

        return NextResponse.json({ success: true, id: sent?.id });
    } catch (err) {
        console.error('Contact API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
