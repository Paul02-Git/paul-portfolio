"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GuestbookMessage } from "./GuestbookMessageList";

const NICKNAME_KEY = "gb_nickname";
const MAX_MESSAGES_PER_VISITOR = 3;

interface GuestbookComposerProps {
    onPosted: (message: GuestbookMessage) => void;
}

type Status = "idle" | "loading" | "error" | "capped";

export function GuestbookComposer({ onPosted }: GuestbookComposerProps) {
    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const [postedCount, setPostedCount] = useState(0);
    const hpRef = React.useRef<HTMLInputElement>(null);
    const startedAt = React.useRef<number>(0);

    React.useEffect(() => {
        startedAt.current = Date.now();
        const saved = window.localStorage.getItem(NICKNAME_KEY);
        if (saved) setNickname(saved);
    }, []);

    const handleNicknameChange = (value: string) => {
        setNickname(value);
        window.localStorage.setItem(NICKNAME_KEY, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading" || status === "capped") return;
        if (!nickname.trim() || !message.trim()) {
            setStatus("error");
            setError("Pick a nickname and write a message.");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/guestbook/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname,
                    message,
                    honeypot: hpRef.current?.value ?? "",
                    elapsedMs: Date.now() - startedAt.current,
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.status === 403) {
                setStatus("capped");
                setError(data?.error || "You've used all 3 of your messages. Thanks for signing!");
                return;
            }
            if (!res.ok) {
                setStatus("error");
                setError(data?.error || "Something went wrong. Please try again.");
                return;
            }

            onPosted(data as GuestbookMessage);
            setMessage("");
            startedAt.current = Date.now();

            const nextCount = postedCount + 1;
            setPostedCount(nextCount);
            setStatus(nextCount >= MAX_MESSAGES_PER_VISITOR ? "capped" : "idle");
            if (nextCount >= MAX_MESSAGES_PER_VISITOR) {
                setError("You've used all 3 of your messages. Thanks for signing!");
            }
        } catch {
            setStatus("error");
            setError("Network error. Please try again.");
        }
    };

    const disabled = status === "loading" || status === "capped";

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                    <label>Company (leave this empty)
                        <input ref={hpRef} type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </label>
                </div>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                        handleNicknameChange(e.target.value);
                        if (status === "error") setStatus("idle");
                    }}
                    placeholder="Nickname"
                    aria-label="Nickname"
                    maxLength={40}
                    disabled={disabled}
                    className="w-20 shrink-0 rounded-sm border border-border bg-background px-2.5 py-2 text-xs outline-none focus:border-primary transition-colors disabled:opacity-60"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        if (status === "error") setStatus("idle");
                    }}
                    placeholder="Say something…"
                    aria-label="Message"
                    maxLength={300}
                    disabled={disabled}
                    className="flex-1 min-w-0 rounded-sm border border-border bg-background px-2.5 py-2 text-xs outline-none focus:border-primary transition-colors disabled:opacity-60"
                />
                <button
                    type="submit"
                    disabled={disabled}
                    aria-label="Send message"
                    className={cn(
                        "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer",
                        "disabled:opacity-60 disabled:cursor-not-allowed"
                    )}
                >
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </form>
            {(status === "error" || status === "capped") && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}
