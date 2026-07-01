"use client";

import { useEffect, useState } from "react";
import { GuestbookPanel } from "./GuestbookPanel";
import { GuestbookSheet } from "./GuestbookSheet";
import type { GuestbookMessage } from "./GuestbookMessageList";

const VISITED_KEY = "gb_visited";
const DESKTOP_QUERY = "(min-width: 1024px)"; // matches the `lg:` breakpoint used by the mobile dock nav

/** Floating guestbook widget: a visit counter + a public message wall. Mounted once, site-wide. */
export function Guestbook() {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [open, setOpen] = useState(false);
    const [visits, setVisits] = useState(0);
    const [messages, setMessages] = useState<GuestbookMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const mql = window.matchMedia(DESKTOP_QUERY);
        setIsDesktop(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await fetch("/api/guestbook");
                if (!res.ok) throw new Error("Failed to load guestbook.");
                const data = await res.json();
                if (cancelled) return;
                setVisits(data.visits ?? 0);
                setMessages(data.messages ?? []);
            } catch {
                if (!cancelled) setError("Couldn't load the guestbook right now.");
            } finally {
                if (!cancelled) setLoading(false);
            }

            // Count this as a visit once per tab session, not per internal navigation.
            if (!window.sessionStorage.getItem(VISITED_KEY)) {
                try {
                    const res = await fetch("/api/guestbook/visit", { method: "POST" });
                    if (res.ok) {
                        const data = await res.json();
                        if (!cancelled) setVisits(data.visits ?? 0);
                    }
                    window.sessionStorage.setItem(VISITED_KEY, "1");
                } catch {
                    // Best-effort — a failed visit ping shouldn't disrupt the widget.
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const handlePosted = (message: GuestbookMessage) => {
        setMessages((prev) => [message, ...prev]);
    };

    if (isDesktop === null) return null;

    const shared = {
        open,
        onOpenChange: setOpen,
        visits,
        messages,
        loading,
        error,
        onPosted: handlePosted,
    };

    return isDesktop ? <GuestbookPanel {...shared} /> : <GuestbookSheet {...shared} />;
}
