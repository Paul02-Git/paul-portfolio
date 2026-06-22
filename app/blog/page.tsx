"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const gridRef = React.useRef<HTMLDivElement>(null);
    const hasPaginated = React.useRef(false);

    const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const currentPosts = blogPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    const goToPage = (p: number) => {
        hasPaginated.current = true;
        setCurrentPage(Math.min(Math.max(p, 1), totalPages));
    };

    // Scroll back to the grid after the new page renders (grid has scroll-mt-28 to clear the navbar).
    React.useEffect(() => {
        if (!hasPaginated.current) return;
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [currentPage]);

    return (
        <main className="pb-20 page-top">
            <Navbar />

            {/* Breadcrumb */}
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span className="text-primary mx-1.5">/</span>
                <span className="text-foreground">Blog</span>
            </p>

            {/* Masthead */}
            <h1 className="mt-5 text-center text-5xl sm:text-6xl lg:text-[6rem] uppercase">
                <span className="text-foreground">Ideas </span>
                <span className="text-outline">That </span>
                <span className="text-primary">Inspire</span>
            </h1>

            {/* Toolbar */}
            <div className="mt-14 flex items-center justify-between py-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <LayoutGrid className="w-4 h-4 text-primary" />
                    <span>
                        Showing <span className="text-primary font-bold">{blogPosts.length} articles</span>
                    </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                    Sort by: <span className="text-foreground font-semibold">Latest</span>
                </p>
            </div>

            {/* Grid */}
            <div ref={gridRef} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 scroll-mt-28">
                {currentPosts.map((post, i) => (
                    <motion.article key={post.slug} {...fadeUp((i % 2) * 0.08)}>
                        <Link href={`/blog/${post.slug}`} className="group block">
                            <div className="relative aspect-[3/2] rounded-md overflow-hidden mb-5 bg-muted/30">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    quality={90}
                                    sizes="(max-width: 768px) 90vw, 45vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black text-[10px] font-bold uppercase tracking-widest text-white">
                                    {post.category}
                                </span>
                            </div>
                            <h3 className="line-clamp-2 text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {post.date} <span className="text-foreground/40">by</span>{" "}
                                <span className="text-foreground font-medium">{post.author ?? "Paul Puzon"}</span>
                            </p>
                        </Link>
                    </motion.article>
                ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-sm border border-border/60 text-sm font-medium hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
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
                                    "w-10 h-10 rounded-sm border text-sm font-medium transition-colors cursor-pointer",
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
                        className="px-4 py-2 rounded-sm border border-border/60 text-sm font-medium hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </main>
    );
}
