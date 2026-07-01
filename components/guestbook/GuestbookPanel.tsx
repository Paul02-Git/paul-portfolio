"use client";

import { Popover } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";
import { GuestbookPill } from "./GuestbookPill";
import { GuestbookBody } from "./GuestbookBody";
import type { GuestbookMessage } from "./GuestbookMessageList";

interface GuestbookPanelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    visits: number;
    messages: GuestbookMessage[];
    loading: boolean;
    error: string | null;
    onPosted: (message: GuestbookMessage) => void;
}

const TITLE_ID = "guestbook-panel-title";

/** Desktop floating widget: an anchored popover, not a page-blocking modal. */
export function GuestbookPanel({ open, onOpenChange, visits, messages, loading, error, onPosted }: GuestbookPanelProps) {
    return (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
            <Popover.Trigger asChild>
                <GuestbookPill visits={visits} open={open} className="fixed bottom-4 right-4 z-30" />
            </Popover.Trigger>
            <AnimatePresence>
                {open && (
                    <Popover.Portal forceMount>
                        <Popover.Content
                            forceMount
                            side="top"
                            align="end"
                            sideOffset={12}
                            aria-labelledby={TITLE_ID}
                            className="z-[45] w-[300px]"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                                transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="bg-card border border-border/60 rounded-lg shadow-xl h-[380px] max-h-[60vh] overflow-hidden"
                            >
                                <GuestbookBody
                                    visits={visits}
                                    messages={messages}
                                    loading={loading}
                                    error={error}
                                    onPosted={onPosted}
                                    onClose={() => onOpenChange(false)}
                                    titleId={TITLE_ID}
                                />
                            </motion.div>
                        </Popover.Content>
                    </Popover.Portal>
                )}
            </AnimatePresence>
        </Popover.Root>
    );
}
