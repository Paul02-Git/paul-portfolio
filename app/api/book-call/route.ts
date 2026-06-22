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
const LIMITS = { name: 100, email: 254, business: 150, website: 300, projectType: 60, budget: 60, description: 5000, service: 60 };

// ── Best-effort in-memory rate limiter (per warm serverless instance) ──
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
            console.error('RESEND_API_KEY is not set. Add it to .env.local and your Vercel env vars.');
            return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
        }

        if (isRateLimited(getClientIp(req))) {
            return NextResponse.json(
                { error: 'Too many requests. Please wait a minute and try again.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

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
        const business = str(data.business);
        const website = str(data.website);
        const projectType = str(data.projectType);
        const description = str(data.description);
        const budget = str(data.budget);
        const services = Array.isArray(data.services)
            ? data.services.filter((s): s is string => typeof s === 'string').map((s) => s.trim()).filter(Boolean).slice(0, 10)
            : [];

        // Validation, required fields per the form.
        if (!name || !email || !description) {
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
            business.length > LIMITS.business ||
            website.length > LIMITS.website ||
            projectType.length > LIMITS.projectType ||
            budget.length > LIMITS.budget ||
            description.length > LIMITS.description ||
            services.some((s) => s.length > LIMITS.service)
        ) {
            return NextResponse.json({ error: 'One or more fields exceed the maximum length.' }, { status: 400 });
        }

        const resend = new Resend(apiKey);
        const servicesText = services.join(', ');

        // HTML-escape every interpolated value before it goes into the email markup.
        const s = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            business: escapeHtml(business),
            website: escapeHtml(website),
            projectType: escapeHtml(projectType),
            services: escapeHtml(servicesText),
            budget: escapeHtml(budget),
            description: escapeHtml(description),
        };

        const rows: EmailRow[] = [
            { label: 'Name', value: s.name },
            { label: 'Email', value: s.email, href: `mailto:${s.email}` },
        ];
        if (s.business) rows.push({ label: 'Business', value: s.business });
        if (s.website) rows.push({ label: 'Website', value: s.website });
        if (s.projectType) rows.push({ label: 'Project Type', value: s.projectType });
        if (s.services) rows.push({ label: 'Services', value: s.services });
        if (s.budget) rows.push({ label: 'Budget', value: s.budget });

        const { data: sent, error } = await resend.emails.send({
            from: 'Discovery Call Request <onboarding@resend.dev>',
            to: ['paulpuzon0007@gmail.com'],
            subject: singleLine(`New Discovery Call Request from ${name}`).slice(0, 200),
            replyTo: email,
            html: renderLeadEmail({
                heading: 'New Discovery Call Request',
                subheading: `from ${s.name}`,
                badge: 'Discovery Call',
                rows,
                message: s.description ? { label: 'Project details', value: s.description } : undefined,
                cta: { label: `Reply to ${s.name} →`, href: `mailto:${s.email}` },
            }),
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: 'Failed to send request. Please try again later.' }, { status: 502 });
        }

        // Best-effort: capture the lead in Klaviyo. Never block the request on a failure.
        const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
        const leadsListId = process.env.KLAVIYO_LEADS_LIST_ID || process.env.KLAVIYO_LIST_ID;
        if (klaviyoKey && leadsListId) {
            const [firstName, ...rest] = name.split(/\s+/);
            const lastName = rest.join(' ');
            const leadProperties: Record<string, string> = { 'Lead Source': 'Discovery Call Request' };
            if (website) leadProperties['Website URL'] = website;
            if (projectType) leadProperties['Project Type'] = projectType;
            if (servicesText) leadProperties['Services'] = servicesText;
            if (budget) leadProperties['Budget'] = budget;
            if (description) leadProperties['Project Description'] = description;

            try {
                const subRes = await subscribeToKlaviyoList({
                    apiKey: klaviyoKey,
                    listId: leadsListId,
                    email,
                    source: 'Discovery Call Request',
                });
                if (!subRes.ok) {
                    console.error('Klaviyo subscribe failed:', subRes.status, await subRes.text().catch(() => ''));
                }

                const upRes = await upsertKlaviyoProfile({
                    apiKey: klaviyoKey,
                    email,
                    firstName: firstName || undefined,
                    lastName: lastName || undefined,
                    organization: business || undefined,
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
        console.error('Book Call API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
