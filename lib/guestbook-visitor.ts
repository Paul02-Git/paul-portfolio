import { cookies } from "next/headers";

const COOKIE_NAME = "gb_visitor";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Reads the visitor's guestbook identity cookie, minting one if absent. */
export async function getOrCreateVisitorId(): Promise<string> {
    const store = await cookies();
    const existing = store.get(COOKIE_NAME)?.value;
    if (existing) return existing;

    const id = crypto.randomUUID();
    store.set(COOKIE_NAME, id, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: ONE_YEAR_SECONDS,
    });
    return id;
}
