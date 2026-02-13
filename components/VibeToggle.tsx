"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vibes } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface VibeToggleProps {
    className?: string;
    showLabel?: boolean;
}

export const VibeToggle = ({
    className,
    showLabel = false,
}: VibeToggleProps) => {
    // Always start with default index
    const [vibeIndex, setVibeIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    /**
     * After mount, sync with localStorage
     */
    useEffect(() => {
        setIsMounted(true);

        const saved = localStorage.getItem("selected-vibe");
        if (saved !== null) {
            setVibeIndex(parseInt(saved, 10));
        }
    }, []);

    /**
     * Sync to localStorage when vibe changes (after mount only)
     */
    useEffect(() => {
        if (!isMounted) return;
        localStorage.setItem("selected-vibe", vibeIndex.toString());
    }, [vibeIndex, isMounted]);

    /**
     * Listen for external vibe changes
     */
    useEffect(() => {
        const handleVibeChange = (event: Event) => {
            const customEvent = event as CustomEvent<{ index: number }>;
            const index = customEvent.detail?.index;
            if (typeof index === "number") {
                setVibeIndex(index);
            }
        };

        window.addEventListener("vibe-change", handleVibeChange);
        return () => {
            window.removeEventListener("vibe-change", handleVibeChange);
        };
    }, []);

    const handleVibeToggle = useCallback(() => {
        const nextIndex = (vibeIndex + 1) % vibes.length;

        setVibeIndex(nextIndex);

        window.dispatchEvent(
            new CustomEvent("vibe-change", {
                detail: { index: nextIndex },
            })
        );
    }, [vibeIndex]);

    const activeVibe = vibes[vibeIndex];

    /**
     * IMPORTANT:
     * Prevent dynamic attributes before mount.
     * This guarantees identical HTML server/client.
     */
    if (!isMounted) {
        return (
            <button
                className={cn(
                    "relative flex items-center gap-2 p-2 rounded-full border border-border/40",
                    "bg-white/50 backdrop-blur-sm shadow-sm",
                    className
                )}
                aria-label="Switch theme"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={handleVibeToggle}
            className={cn(
                "relative flex items-center gap-2 p-2 rounded-full border border-border/40",
                "bg-white/50 backdrop-blur-sm hover:bg-white/80",
                "hover:border-primary/20 shadow-sm transition-all duration-200",
                "group",
                className
            )}
            aria-label={`Switch theme (Current: ${activeVibe.name})`}
            title={`Current: ${activeVibe.name} - Click to switch`}
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeVibe.name}
                        initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute"
                    >
                        <activeVibe.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {showLabel && (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {activeVibe.name}
                </span>
            )}

            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
                {activeVibe.name}
            </span>
        </button>
    );
};
