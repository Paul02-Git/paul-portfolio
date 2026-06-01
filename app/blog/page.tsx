"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/portfolio";
import { LayoutGrid } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

export default function BlogPage() {
    return (
        <main className="pb-20 pt-28 md:pt-32">
            <Navbar />

            {/* Breadcrumb */}
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <span className="text-primary mx-1.5">/</span>
                <span className="text-foreground">Blog</span>
            </p>

            {/* Masthead */}
            <h1 className="mt-5 text-center font-bold tracking-tighter text-5xl sm:text-6xl lg:text-[6rem] uppercase">
                <span className="text-foreground">Ideas </span>
                <span className="text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]">That </span>
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                    <motion.article key={post.slug} {...fadeUp((i % 2) * 0.08)}>
                        <Link href={`/blog/${post.slug}`} className="group block">
                            <div className="relative aspect-[3/2] rounded-[8px] overflow-hidden mb-5 bg-muted/30">
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
                            <h3 className="line-clamp-2 text-lg md:text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
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
        </main>
    );
}
