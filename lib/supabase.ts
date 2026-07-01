import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service-role key, which bypasses RLS.
 * Only ever import this from app/api/guestbook/** route handlers — never from
 * a "use client" component.
 */
export function getSupabaseAdmin(): SupabaseClient {
    if (cached) return cached;

    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
        throw new Error(
            "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. Add them to .env.local (local) and your Vercel env vars (production)."
        );
    }

    cached = createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
    return cached;
}
