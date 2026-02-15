"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function BlogPage() {
    return (
        <main className="space-y-6 pb-12 pt-28 md:pt-24">
            <Navbar />

            <div>
                <Card className="p-6 md:p-12 space-y-12">
                    {/* Header Section */}
                    <header className="space-y-6 max-w-2xl mx-auto text-center">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Insights & Articles
                        </div>

                        <div className="space-y-4 text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                <span className="text-primary">Blog</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Exploring the intersection of <span className="text-foreground font-semibold">Technical Excellence</span> and <span className="text-foreground font-semibold">Marketing Automation</span>. Digital insights on WordPress, GHL, and scaling businesses.
                            </p>
                        </div>
                    </header>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, i) => (
                            <BlogCard key={post.slug} post={post} index={i} />
                        ))}
                    </div>
                </Card>

                <Footer />
            </div>
        </main>
    );
}
