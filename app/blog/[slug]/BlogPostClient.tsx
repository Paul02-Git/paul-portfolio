"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Facebook, Twitter, Link2, Check } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

type TocItem = { id: string; text: string; level: number };

/** Inject ids into the article's h2/h3 headings and return a table-of-contents list. */
function buildToc(html: string): { html: string; toc: TocItem[] } {
    const toc: TocItem[] = [];
    const used = new Set<string>();
    const slugify = (s: string) => {
        const base = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
        let id = base;
        let n = 1;
        while (used.has(id)) id = `${base}-${++n}`;
        used.add(id);
        return id;
    };
    const newHtml = html.replace(
        /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g,
        (m: string, tag: string, attrs: string, inner: string) => {
            const text = inner.replace(/<[^>]+>/g, "").trim();
            if (!text) return m;
            const level = tag === "h2" ? 2 : 3;
            const existing = attrs.match(/id="([^"]+)"/);
            if (existing) {
                toc.push({ id: existing[1], text, level });
                return m;
            }
            const id = slugify(text);
            toc.push({ id, text, level });
            return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
        }
    );
    return { html: newHtml, toc };
}

export default function BlogPostClient({ slug }: { slug: string }) {
    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const post = blogPosts[currentIndex];

    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    const [copied, setCopied] = React.useState(false);
    const [activeId, setActiveId] = React.useState("");

    // Build the table of contents (and id-injected HTML) from the article body.
    const { html: contentHtml, toc } = React.useMemo(
        () => buildToc(post?.content ?? ""),
        [post?.content]
    );

    // Scroll-spy: the active TOC entry = the last heading scrolled past the top offset.
    React.useEffect(() => {
        if (!toc.length) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const offset = 120; // clears the fixed navbar
            let current = toc[0].id;
            for (const t of toc) {
                const el = document.getElementById(t.id);
                if (el && el.getBoundingClientRect().top - offset <= 0) current = t.id;
            }
            setActiveId(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [toc]);

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
    const initials = author.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Related posts — same category first, then fill with the most recent others.
    const related = [
        ...blogPosts.filter((p) => p.slug !== slug && p.category === post.category),
        ...blogPosts.filter((p) => p.slug !== slug && p.category !== post.category),
    ].slice(0, 3);

    // Breadcrumb structured data for SEO.
    const siteUrl = SITE_URL;
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
        ],
    };

    return (
        <main className="pb-20 pt-30 md:pt-40">
            <Navbar />

            {/* Breadcrumb schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="max-w-[960px] mx-auto">

                {/* ── HEADER (full content width) ── */}
                <header>
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <span className="text-primary mx-1.5">/</span>
                        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                        <span className="text-primary mx-1.5">/</span>
                        <span className="text-foreground">{post.category}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="mt-5 text-center text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight max-w-[30ch] mx-auto">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="mt-6 text-center text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">
                        {post.excerpt}
                    </p>

                    {/* Featured image */}
                    <div className="mt-10 relative aspect-[16/9] sm:aspect-[2/1] w-full mx-auto overflow-hidden rounded-2xl bg-muted/30">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            quality={90}
                            sizes="(max-width: 1024px) 100vw, 1000px"
                            className="object-cover"
                        />
                    </div>

                    {/* Author + Share row */}
                    <div className="mt-6 mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {initials}
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-foreground leading-tight">{author}</p>
                                <p className="text-xs text-muted-foreground">{post.date} · {readTime} min read</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyLink}
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-[8px] border border-border/60 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Link2 className="w-3.5 h-3.5" />}
                                {copied ? "Copied" : "Copy link"}
                            </button>
                            <button
                                onClick={() => openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl())}&text=${encodeURIComponent(post.title)}`)}
                                aria-label="Share on X"
                                className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`)}
                                aria-label="Share on Facebook"
                                className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* ── BODY GRID ── */}
                <div className="mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 mx-auto">

                {/* ── Left rail: contents + newsletter (sticky) ── */}
                <aside className="hidden lg:block">
                    <div className="sticky top-28 space-y-8">
                        {toc.length > 0 && (
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">On This Page</p>
                                <nav className="border-l border-border/60">
                                    {toc.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={cn(
                                                "block border-l-2 -ml-px py-1.5 leading-snug transition-colors",
                                                item.level === 3 ? "pl-7 text-[13px]" : "pl-4 text-sm",
                                                activeId === item.id
                                                    ? "border-primary text-primary font-semibold"
                                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* Newsletter */}
                        <div className="rounded-[8px] border border-border/60 bg-muted/30 p-5">
                            <p className="text-sm font-bold leading-snug">Subscribe to newsletter</p>
                            <NewsletterForm layout="stacked" className="mt-4" />
                        </div>
                    </div>
                </aside>

            <article className="min-w-0 w-full">

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
                               [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28
                               [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
                               [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
                               [&_h4]:text-foreground [&_h4]:font-bold
                               [&_p]:mb-6
                               [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                               [&_strong]:text-foreground [&_strong]:font-bold
                               [&_i]:text-primary
                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
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

                {/* Subscribe CTA — mobile only (desktop uses the sidebar block) */}
                <div className="lg:hidden mt-12 text-center rounded-[8px] border border-border/60 bg-muted/30 p-8 space-y-5">
                    <div className="space-y-2">
                        <h3>Enjoyed this article?</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Get practical WordPress, GoHighLevel &amp; SEO insights in your inbox — no spam, just value.
                        </p>
                    </div>
                    <NewsletterForm className="max-w-md mx-auto" />
                </div>
            </article>
                </div>

                {/* ── Related Articles — full-width row below the body ── */}
                {related.length > 0 && (
                    <section className="mt-16 border-t border-border/60 pt-10">
                        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {related.map((rp) => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                                    <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden mb-3 bg-muted/30">
                                        <Image
                                            src={rp.image}
                                            alt={rp.title}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 30vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{rp.category}</p>
                                    <h3 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {rp.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">{rp.date}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
