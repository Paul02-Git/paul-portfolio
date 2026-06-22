"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

interface FaqAccordionProps {
    items: { question: string; answer: string }[];
    /** Pass null to hide the eyebrow label */
    eyebrow?: string | null;
    /** Pass null to hide the heading */
    heading?: string | null;
    description?: string | null;
}

/**
 * Minimal two-column FAQ accordion. Single source of truth, edit here to update everywhere.
 */
export const FaqAccordion = ({
    items,
    eyebrow = "FAQ",
    heading = "We're Ready to Answer All Your Questions",
    description = "Everything you need to know before we start working together, clear, upfront, no jargon.",
}: FaqAccordionProps) => {
    const [open, setOpen] = useState<number | null>(0);

    const half = Math.ceil(items.length / 2);
    const columns = [
        { list: items.slice(0, half), offset: 0 },
        { list: items.slice(half), offset: half },
    ];

    return (
        <>
            {(eyebrow || heading || description) && (
                <motion.div {...fadeUp()} className="text-center mb-12 space-y-4">
                    {eyebrow && (
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest">{eyebrow}</p>
                    )}
                    {heading && <h2>{heading}</h2>}
                    {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
                </motion.div>
            )}

            <motion.div
                {...fadeUp(0.1)}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 max-w-5xl mx-auto"
            >
                {columns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col">
                        {col.list.map((item, i) => {
                            const idx = col.offset + i;
                            const isOpen = open === idx;
                            return (
                                <div key={idx} className="border-b border-border/70">
                                    <button
                                        onClick={() => setOpen(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-start justify-between gap-4 py-5 text-left group cursor-pointer"
                                    >
                                        <span className="font-semibold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors">
                                            {item.question}
                                        </span>
                                        <span className="shrink-0 mt-0.5 text-muted-foreground">
                                            {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                className="overflow-hidden"
                                            >
                                                <div
                                                    className="pb-5 -mt-1 text-muted-foreground text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
                                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </motion.div>
        </>
    );
};
