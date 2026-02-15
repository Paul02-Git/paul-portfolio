"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, Clock } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const currentIndex = blogPosts.findIndex(p => p.slug === params.slug);
    const post = blogPosts[currentIndex];

    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    const [copied, setCopied] = React.useState(false);

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    if (!post) {
        return (
            <main className="min-h-screen flex items-center justify-center p-card">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Post Not Found</h1>
                    <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-6 pb-12 pt-32 md:pt-34">
            <Navbar />

            <div className="max-w-[1120px] mx-auto">
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Blog
                    </Link>
                </div>

                <Card className="overflow-hidden border-none shadow-2xl shadow-black/5">
                    {/* Header Image */}
                    <div className="relative aspect-[21/10] w-full overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t" />
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                            <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="mt-8 p-2 md:p-card space-y-10">
                        <header className="space-y-4">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    5 min read
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto group/share"
                                >
                                    <Share2 className={cn("w-4 h-4 transition-transform", copied ? "scale-125 text-primary" : "group-hover/share:rotate-12")} />
                                    {copied ? "Link Copied!" : "Share"}
                                </button>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                        </header>

                        {/* Visual Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />

                        {/* Main Body */}
                        <div
                            className="prose prose-lg prose-invert max-w-none text-muted-foreground leading-relaxed
                                       [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10
                                       [&_p]:mb-6
                                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                                       [&_strong]:text-foreground [&_strong]:font-bold
                                       [&_i]:text-primary"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Post-to-Post Navigation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/10 pt-10">
                            {prevPost ? (
                                <Link
                                    href={`/blog/${prevPost.slug}`}
                                    className="group p-6 rounded-2xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-all space-y-2 text-left"
                                >
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                                        Previous Post
                                    </span>
                                    <h4 className="text-md font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {prevPost.title}
                                    </h4>
                                </Link>
                            ) : <div />}

                            {nextPost && (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="group p-6 rounded-2xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-all space-y-2 text-right"
                                >
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-end gap-2 text-right">
                                        Next Post
                                        <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <h4 className="text-md font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {nextPost.title}
                                    </h4>
                                </Link>
                            )}
                        </div>

                        {/* Footer / CTA */}
                        <footer className="pt-4 mt-4 border-t border-border/10">
                            <div className="bg-muted/30 rounded-2xl p-8 text-center space-y-4 border border-border/40">
                                <h3 className="text-2xl font-bold text-foreground">Liked this article?</h3>
                                <p className="text-muted-foreground max-w-lg mx-auto text-md">
                                    I regularly share insights on WordPress development and marketing automation.
                                    Let's build something amazing together.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                    >
                                        Work with me <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </article>
                </Card>

                <Footer />
            </div>
        </main>
    );
}
