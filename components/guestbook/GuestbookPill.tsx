"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestbookPillProps {
    visits: number;
    open: boolean;
    className?: string;
}

/** Collapsed trigger pill: status dot + visit count + chevron. */
export const GuestbookPill = React.forwardRef<HTMLButtonElement, GuestbookPillProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ visits, open, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                aria-expanded={open}
                aria-label={open ? "Close guestbook" : "Open guestbook"}
                className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer",
                    className
                )}
                {...props}
            >
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span className="font-semibold text-foreground">{visits.toLocaleString()}</span>
                <span className="text-muted-foreground">visits</span>
                {open ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                )}
            </button>
        );
    }
);
GuestbookPill.displayName = "GuestbookPill";
