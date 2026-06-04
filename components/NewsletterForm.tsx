"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
    /** "inline" = email + button on one row (stacks on mobile); "stacked" = full-width column. */
    layout?: "inline" | "stacked";
    /** Extra classes for the outer wrapper. */
    className?: string;
}

/**
 * Newsletter signup wired to /api/subscribe (Klaviyo private API, server-side).
 * Single source of truth — used in the footer and on blog posts.
 */
export function NewsletterForm({ layout = "inline", className }: NewsletterFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");

    const stacked = layout === "stacked";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = (await res.json().catch(() => ({}))) as { error?: string };
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data?.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <p className={cn("inline-flex items-center gap-2 text-sm font-semibold text-primary", className)}>
                <Check className="w-4 h-4 shrink-0" /> You&apos;re subscribed — check your inbox to confirm.
            </p>
        );
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className={cn(stacked ? "space-y-2" : "flex flex-col sm:flex-row gap-2")}>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className={cn(
                        "rounded-[8px] border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors",
                        stacked ? "w-full" : "flex-1 min-w-0"
                    )}
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                        "inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground font-bold rounded-[8px] px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors duration-200 shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
                        stacked && "w-full"
                    )}
                >
                    {status === "loading" ? "Subscribing…" : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
                </button>
            </form>
            {status === "error" && <p className="mt-2 text-xs text-red-500">{message}</p>}
        </div>
    );
}
