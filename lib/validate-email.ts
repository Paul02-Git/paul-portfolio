/**
 * Server-side email deliverability check (Node runtime only).
 *
 * Regex validation only proves an address is well-formed (`name@domain.tld`).
 * It cannot tell that the *domain* actually exists or can receive mail — so
 * `tets@gm.qew` passes a regex but is undeliverable. This resolves the domain's
 * DNS records to reject made-up domains:
 *   - MX records present        → deliverable
 *   - no MX but an A/AAAA record → still deliverable (RFC 5321 fallback)
 *   - domain does not exist      → rejected
 *   - transient DNS error/timeout → accepted (don't block real users on infra)
 */

import { promises as dns } from "dns";

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
    ]);
}

async function resolveDomain(domain: string): Promise<boolean> {
    try {
        const mx = await dns.resolveMx(domain);
        if (Array.isArray(mx) && mx.some((r) => r.exchange)) return true;
        // Empty MX set — fall through to A/AAAA lookup below.
    } catch (err) {
        const code = (err as NodeJS.ErrnoException)?.code;
        // ENOTFOUND = domain doesn't exist; ENODATA = no MX records.
        if (code && code !== "ENODATA" && code !== "ENOTFOUND") {
            // Transient/unknown DNS failure — don't block a potentially real user.
            return true;
        }
        if (code === "ENOTFOUND") return false;
    }

    // No usable MX: a domain with an A/AAAA record can still accept mail.
    try {
        const records = await dns.resolve(domain);
        return records.length > 0;
    } catch {
        try {
            const v6 = await dns.resolve6(domain);
            return v6.length > 0;
        } catch {
            return false;
        }
    }
}

/** True if the email's domain has DNS records that allow it to receive mail. */
export async function hasDeliverableDomain(email: string): Promise<boolean> {
    const domain = email.split("@")[1]?.trim().toLowerCase();
    if (!domain || !domain.includes(".")) return false;
    // Cap the lookup so a slow resolver can't hang the request; be lenient on timeout.
    return withTimeout(resolveDomain(domain), 4000, true);
}
