"use client";

import { formatRelativeTime } from "@/lib/relative-time";

export interface GuestbookMessage {
    id: string;
    nickname: string;
    message: string;
    createdAt: string;
}

interface GuestbookMessageListProps {
    messages: GuestbookMessage[];
    loading: boolean;
    error: string | null;
}

export function GuestbookMessageList({ messages, loading, error }: GuestbookMessageListProps) {
    if (loading) {
        return <p className="text-xs text-muted-foreground py-6 text-center">Loading messages…</p>;
    }
    if (error) {
        return <p className="text-xs text-red-500 py-6 text-center">{error}</p>;
    }
    if (messages.length === 0) {
        return <p className="text-xs text-muted-foreground py-6 text-center">Be the first to sign!</p>;
    }

    return (
        <div className="flex flex-col gap-2">
            {messages.map((m) => (
                <div key={m.id} className="bg-muted rounded-md px-2.5 py-1.5">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-semibold text-foreground text-xs">{m.nickname}</span>
                        <span className="text-muted-foreground text-[10px]">{formatRelativeTime(m.createdAt)}</span>
                    </div>
                    <p className="text-foreground text-xs leading-relaxed mt-0.5 break-words">{m.message}</p>
                </div>
            ))}
        </div>
    );
}
