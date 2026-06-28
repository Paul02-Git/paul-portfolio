"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DockItem {
    icon: LucideIcon;
    label: string;
    /** Renders the item as a navigation link. */
    href?: string;
    /** Used when the item is an action rather than a link. */
    onClick?: () => void;
    /** Highlights the item as the current page when used as navigation. */
    active?: boolean;
}

interface DockProps {
    className?: string;
    items: DockItem[];
    /** Accessible name for the navigation landmark. */
    ariaLabel?: string;
}

const itemClasses = (active?: boolean) =>
    cn(
        "flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5",
        "transition-[transform,background-color,color] active:scale-95",
        active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
    );

function DockItemContent({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
    return (
        <>
            <Icon className="w-5 h-5 shrink-0" />
            <span className="w-full truncate text-center text-[10px] font-medium leading-none">{label}</span>
        </>
    );
}

const Dock = React.forwardRef<HTMLElement, DockProps>(
    ({ items, className, ariaLabel = "Primary" }, ref) => {
        return (
            // pointer-events-none on the wrapper so the transparent area never blocks the
            // page; the bar below re-enables pointer events for the items.
            <div className={cn("pointer-events-none flex justify-center", className)}>
                <nav
                    ref={ref}
                    aria-label={ariaLabel}
                    className={cn(
                        "pointer-events-auto mx-auto flex w-full max-w-lg items-stretch gap-0.5 p-1.5",
                        // Opaque bar — no backdrop-filter. backdrop-blur on a fixed element
                        // forces the browser to re-blur the page behind it on every scroll
                        // frame, which is the main source of jank on low-end phones. The
                        // translateZ(0) keeps the bar on its own GPU layer so page scrolling
                        // never repaints it.
                        "rounded-2xl border border-border bg-background shadow-lg [transform:translateZ(0)]"
                    )}
                >
                    {items.map((item) =>
                        item.href ? (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-current={item.active ? "page" : undefined}
                                className={itemClasses(item.active)}
                            >
                                <DockItemContent icon={item.icon} label={item.label} />
                            </Link>
                        ) : (
                            <button
                                key={item.label}
                                type="button"
                                onClick={item.onClick}
                                aria-current={item.active ? "page" : undefined}
                                className={itemClasses(item.active)}
                            >
                                <DockItemContent icon={item.icon} label={item.label} />
                            </button>
                        )
                    )}
                </nav>
            </div>
        );
    }
);
Dock.displayName = "Dock";

export { Dock };
