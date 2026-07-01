"use client";

import { X } from "lucide-react";
import { GuestbookMessageList, type GuestbookMessage } from "./GuestbookMessageList";
import { GuestbookComposer } from "./GuestbookComposer";

interface GuestbookBodyProps {
    visits: number;
    messages: GuestbookMessage[];
    loading: boolean;
    error: string | null;
    onPosted: (message: GuestbookMessage) => void;
    onClose: () => void;
    titleId: string;
}

/** Shared header + message list + composer, used by both the desktop panel and the mobile sheet. */
export function GuestbookBody({ visits, messages, loading, error, onPosted, onClose, titleId }: GuestbookBodyProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-3 p-3 pb-2">
                <div>
                    <p id={titleId} className="font-bold text-foreground text-sm">Guestbook</p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground">{visits.toLocaleString()} visits</span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close guestbook"
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1 -m-1"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <p className="px-3 pb-2 text-xs text-muted-foreground">
                Leave your mark. 3 messages each, and you can see everyone who passed through.
            </p>

            <div className="flex-1 overflow-y-auto px-3 min-h-0">
                <GuestbookMessageList messages={messages} loading={loading} error={error} />
            </div>

            <div className="p-3 pt-2 border-t border-border/60">
                <GuestbookComposer onPosted={onPosted} />
            </div>
        </div>
    );
}
