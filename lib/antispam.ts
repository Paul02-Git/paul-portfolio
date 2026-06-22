/**
 * Lightweight, no-dependency spam heuristics for form submissions.
 *
 * - Honeypot: a hidden field (`company`) that real users never see. Bots that
 *   auto-fill every input populate it; a non-empty value is a strong bot signal.
 * - Time-trap: forms send how long they were on screen before submit. A human
 *   can't complete a form in under ~0.8s, so faster submissions are dropped.
 *
 * Callers should treat a positive result as spam and *silently* succeed (return
 * 200 without doing the work) so bots don't learn they were filtered.
 */

const MIN_FILL_MS = 800;

export function looksLikeSpam(input: { honeypot?: unknown; elapsedMs?: unknown }): boolean {
    // Honeypot filled → almost certainly a bot.
    const hp = typeof input.honeypot === "string" ? input.honeypot.trim() : "";
    if (hp.length > 0) return true;

    // Submitted implausibly fast → bot. Missing/odd values are ignored (allowed).
    const elapsed = Number(input.elapsedMs);
    if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) return true;

    return false;
}
