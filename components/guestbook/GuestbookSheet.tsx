"use client";

import { Dialog, VisuallyHidden } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";
import { GuestbookPill } from "./GuestbookPill";
import { GuestbookBody } from "./GuestbookBody";
import type { GuestbookMessage } from "./GuestbookMessageList";

interface GuestbookSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    visits: number;
    messages: GuestbookMessage[];
    loading: boolean;
    error: string | null;
    onPosted: (message: GuestbookMessage) => void;
}

const TITLE_ID = "guestbook-sheet-title";

/** Mobile trigger + full-screen slide-up sheet (true modal: focus trap, escape-to-close). */
export function GuestbookSheet({ open, onOpenChange, visits, messages, loading, error, onPosted }: GuestbookSheetProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                <GuestbookPill
                    visits={visits}
                    open={open}
                    className="fixed z-30 right-4 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+4.5rem)]"
                />
            </Dialog.Trigger>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild forceMount>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-[60] bg-black/40"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content
                            forceMount
                            aria-labelledby={TITLE_ID}
                            aria-describedby={undefined}
                            className="fixed inset-0 z-[61] outline-none"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            {/* Radix requires a real Dialog.Title descendant for a11y even though
                                the visible heading (in GuestbookBody) is already wired via
                                aria-labelledby above — this one stays visually hidden. */}
                            <VisuallyHidden.Root asChild>
                                <Dialog.Title>Guestbook</Dialog.Title>
                            </VisuallyHidden.Root>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="absolute inset-0 bg-card"
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
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
