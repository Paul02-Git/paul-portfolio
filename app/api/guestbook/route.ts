import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getOrCreateVisitorId } from "@/lib/guestbook-visitor";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export async function GET(req: Request) {
    try {
        // A GET is itself a visit worth recognizing (even if the visitor never
        // posts a message), so mint the identity cookie here if it's missing.
        await getOrCreateVisitorId();

        const { searchParams } = new URL(req.url);
        const rawLimit = Number(searchParams.get("limit"));
        const limit = Number.isFinite(rawLimit) && rawLimit > 0
            ? Math.min(Math.floor(rawLimit), MAX_LIMIT)
            : DEFAULT_LIMIT;

        let supabase;
        try {
            supabase = getSupabaseAdmin();
        } catch (e) {
            console.error("Guestbook GET: Supabase not configured:", e);
            return NextResponse.json({ error: "Guestbook is not configured." }, { status: 503 });
        }

        const [visitsResult, messagesResult] = await Promise.all([
            // maybeSingle (not single): if the singleton counter row is ever
            // missing, degrade to 0 instead of failing the whole GET.
            supabase.from("guestbook_visits").select("total").eq("id", 1).maybeSingle(),
            supabase
                .from("guestbook_messages")
                .select("id, nickname, message, created_at")
                .order("created_at", { ascending: false })
                .limit(limit),
        ]);

        if (visitsResult.error) {
            console.error("Guestbook GET: visits query failed:", visitsResult.error);
            return NextResponse.json({ error: "Failed to load guestbook." }, { status: 500 });
        }
        if (messagesResult.error) {
            console.error("Guestbook GET: messages query failed:", messagesResult.error);
            return NextResponse.json({ error: "Failed to load guestbook." }, { status: 500 });
        }

        return NextResponse.json({
            visits: visitsResult.data?.total ?? 0,
            messages: (messagesResult.data ?? []).map((m) => ({
                id: m.id,
                nickname: m.nickname,
                message: m.message,
                createdAt: m.created_at,
            })),
        });
    } catch (err) {
        console.error("Guestbook GET Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
