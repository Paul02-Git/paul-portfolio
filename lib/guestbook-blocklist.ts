/**
 * Deliberately small, non-exhaustive blocklist for the public guestbook wall.
 * This is a blunt first line of defense, not a moderation system — the real
 * backstop is manually deleting a bad row via the Supabase table editor.
 */
const BLOCKLIST = [
    "fuck",
    "shit",
    "bitch",
    "cunt",
    "asshole",
    "nigger",
    "faggot",
    "retard",
    "viagra",
    "cialis",
    "porn",
    "xxx",
    "onlyfans",
] as const;

const BLOCKLIST_RE = new RegExp(`\\b(${BLOCKLIST.join("|")})\\b`, "i");

export function containsBlockedWord(text: string): boolean {
    return BLOCKLIST_RE.test(text);
}
