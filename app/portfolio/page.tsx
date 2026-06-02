"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/portfolio";
import type { ToolKey } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

// Logo (or text badge) shown for each tool used on a project.
const TOOL_META: Record<ToolKey, { name: string; logo?: string; text?: string }> = {
    shopify: { name: "Shopify", logo: "/images/shopify.svg" },
    klaviyo: { name: "Klaviyo", logo: "/images/klaviyo.svg" },
    figma: { name: "Figma", logo: "/images/Figma-logo.svg" },
    elementor: { name: "Elementor", logo: "/images/Elementor-Logo-Symbol-Red.svg" },
    ghl: { name: "GoHighLevel", logo: "/images/GHL Logo.svg" },
    hubspot: { name: "HubSpot", logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg" },
    va: { name: "Virtual Assistant", text: "VA" },
};

const ITEMS_PER_PAGE = 9;

export default function PortfolioPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = React.useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const currentProjects = projects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Only scroll on an actual pagination action — never on initial page load.
    const hasPaginated = React.useRef(false);

    const goToPage = (p: number) => {
        hasPaginated.current = true;
        setCurrentPage(Math.min(Math.max(p, 1), totalPages));
    };

    // Scroll to the grid AFTER the new page renders (grid has `scroll-mt-28` to clear
    // the navbar). Running it post-render avoids overshooting into the footer when the
    // last page is short and the document shrinks.
    React.useEffect(() => {
        if (!hasPaginated.current) return;
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [currentPage]);

    // Lock background page scroll while the lightbox is open.
    React.useEffect(() => {
        if (!selectedImage) return;
        const html = document.documentElement;
        const scrollbarW = window.innerWidth - html.clientWidth;
        const prevOverflow = html.style.overflow;
        const prevPad = document.body.style.paddingRight;
        html.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
        return () => {
            html.style.overflow = prevOverflow;
            document.body.style.overflow = "";
            document.body.style.paddingRight = prevPad;
        };
    }, [selectedImage]);

    return (
        <main className="pb-20 pt-28 md:pt-32">
            <Navbar />

            {/* ── Heading ── */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-[60ch]">
                    <p className="text-primary font-semibold text-sm uppercase tracking-widest">Portfolio</p>
                    <h1 className="mt-3 font-bold tracking-tight">
                        Selected Work &amp; <span className="text-primary">Projects</span>
                    </h1>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-[50ch]">
                        A collection of WordPress, Shopify, and web projects I&apos;ve designed and built for clients worldwide.
                    </p>
                </div>

                <Button href="/contact" icon={<ArrowUpRight className="w-5 h-5" />} className="shrink-0 self-start md:self-auto">
                    Hire Me
                </Button>
            </header>

            {/* ── Grid ── */}
            <div ref={gridRef} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 scroll-mt-28">
                {currentProjects.map((project) => (
                    <button
                        key={project.title}
                        onClick={() => setSelectedImage(project.image)}
                        className="group text-left cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-border/60 bg-muted/30 shadow-sm">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                quality={85}
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    {project.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{project.category}</p>
                            </div>

                            {/* Tools used */}
                            {project.tools && project.tools.length > 0 && (
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {project.tools.map((t) => {
                                        const meta = TOOL_META[t];
                                        if (!meta) return null;
                                        if (meta.text) {
                                            return (
                                                <span
                                                    key={t}
                                                    title={meta.name}
                                                    className="w-7 h-7 rounded-md bg-foreground text-background text-[10px] font-bold flex items-center justify-center"
                                                >
                                                    {meta.text}
                                                </span>
                                            );
                                        }
                                        return (
                                            <span
                                                key={t}
                                                title={meta.name}
                                                className="w-7 h-7 rounded-md border border-border/60 bg-card flex items-center justify-center p-1"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={meta.logo}
                                                    alt={meta.name}
                                                    className="max-w-full max-h-full object-contain"
                                                    loading="lazy"
                                                />
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-[8px] border border-border/60 text-sm font-medium hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                aria-current={currentPage === page ? "page" : undefined}
                                className={cn(
                                    "w-10 h-10 rounded-[8px] border text-sm font-medium transition-colors cursor-pointer",
                                    currentPage === page
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border/60 hover:bg-muted/50"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-[8px] border border-border/60 text-sm font-medium hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                            className="fixed top-4 right-4 z-[120] w-11 h-11 rounded-full bg-black/60 text-white ring-1 ring-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl ring-1 ring-white/10 bg-white cursor-default"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedImage}
                                alt="Project screenshot"
                                className="w-full h-auto block"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
