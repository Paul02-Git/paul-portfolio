"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Facebook, Twitter, Link2, Check } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import Navbar from "@/components/Navbar";

export default function BlogPostClient({ slug }: { slug: string }) {
    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const post = blogPosts[currentIndex];

    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    const [copied, setCopied] = React.useState(false);

    const shareUrl = () => (typeof window !== "undefined" ? window.location.href : "");

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* noop */
        }
    };

    const openShare = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

    if (!post) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1>Post Not Found</h1>
                    <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    const author = post.author ?? "Paul Puzon";
    const authorRole = post.authorRole ?? "WordPress & GHL Specialist";
    const initials = author.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <main className="pb-20 pt-40">
            <Navbar />

            <article className="max-w-[960px] mx-auto">

                {/* Date */}
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {post.date} <span className="text-border">·</span> {readTime} min read
                </p>

                {/* Title */}
                <h1 className="mt-5 text-center text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                    {post.title}
                </h1>

                {/* Excerpt */}
                <p className="mt-6 text-center text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">
                    {post.excerpt}
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {initials}
                    </span>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-primary leading-tight">{author}</p>
                        <p className="text-xs text-muted-foreground">{authorRole}</p>
                    </div>
                </div>

                {/* Share */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Share
                    </span>
                    <button
                        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`)}
                        aria-label="Share on Facebook"
                        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl())}&text=${encodeURIComponent(post.title)}`)}
                        aria-label="Share on X"
                        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={copyLink}
                        aria-label="Copy link"
                        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
                    </button>
                </div>

                {/* Featured image */}
                <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted/30">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 960px"
                        className="object-cover"
                    />
                </div>

                {/* Body */}
                <div
                    className="mt-10 text-base md:text-lg text-foreground/80 leading-relaxed
                               [&>div>p:first-of-type]:first-letter:float-left
                               [&>div>p:first-of-type]:first-letter:mr-3
                               [&>div>p:first-of-type]:first-letter:mt-1
                               [&>div>p:first-of-type]:first-letter:text-6xl
                               [&>div>p:first-of-type]:first-letter:font-bold
                               [&>div>p:first-of-type]:first-letter:leading-[0.7]
                               [&>div>p:first-of-type]:first-letter:text-foreground
                               [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
                               [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
                               [&_h4]:text-foreground [&_h4]:font-bold
                               [&_p]:mb-6
                               [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                               [&_strong]:text-foreground [&_strong]:font-bold
                               [&_i]:text-primary
                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Prev / Next */}
                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-10">
                    {prevPost ? (
                        <Link href={`/blog/${prevPost.slug}`} className="group space-y-1 text-left">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-2">
                                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Previous
                            </span>
                            <p className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {prevPost.title}
                            </p>
                        </Link>
                    ) : <div />}

                    {nextPost && (
                        <Link href={`/blog/${nextPost.slug}`} className="group space-y-1 sm:text-right">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-2 sm:justify-end w-full">
                                Next <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </span>
                            <p className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {nextPost.title}
                            </p>
                        </Link>
                    )}
                </div>

                {/* Subscribe CTA */}
                <div className="mt-12 text-center rounded-[8px] border border-border/60 bg-muted/30 p-8 space-y-5">
                    <div className="space-y-2">
                        <h3>Enjoyed this article?</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Get practical WordPress, GoHighLevel &amp; SEO insights in your inbox — no spam, just value.
                        </p>
                    </div>
                    <form
                        action="/contact"
                        className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            aria-label="Email address"
                            className="flex-1 rounded-[8px] border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold rounded-[8px] px-6 py-3 text-sm hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
                        >
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </article>
        </main>
    );
}
