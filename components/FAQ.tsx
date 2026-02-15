"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className={cn(
            "border border-border/40 rounded-lg transition-all duration-300 overflow-hidden",
            isOpen ? "bg-white border-primary/20 shadow-sm" : "bg-muted/50 hover:bg-muted/20"
        )}>
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                aria-expanded={isOpen}
            >
                <span className="font-bold text-foreground text-sm md:text-lg">
                    {question}
                </span>
                <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0",
                    isOpen && "rotate-180 text-primary"
                )} />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div
                            className="px-6 pb-6 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border/10 pt-4 faq-answer"
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                        <style jsx global>{`
                            .faq-answer a {
                                color: var(--primary);
                                font-weight: 700;
                                text-decoration: underline;
                                text-underline-offset: 4px;
                                transition: opacity 0.2s;
                            }
                            .faq-answer a:hover {
                                opacity: 0.8;
                            }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface FAQProps {
    items: { question: string; answer: string }[];
    title?: string;
}

export const FAQ = ({ items, title = "Frequently Asked Questions❓" }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="space-y-8">
            <h2>
                {title}
            </h2>
            <div className="grid gap-4">
                {items.map((item, i) => (
                    <FAQItem
                        key={i}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === i}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                ))}
            </div>
        </section>
    );
};
