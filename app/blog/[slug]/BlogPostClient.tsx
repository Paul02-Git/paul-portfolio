"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin, Mail, Link2, Check, Share2 } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

type TocItem = { id: string; text: string; level: number };

/** WhatsApp brand glyph — lucide-react has no WhatsApp icon, so we inline it. */
function WhatsappIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

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
    const [canNativeShare, setCanNativeShare] = React.useState(false);

    // Detect the Web Share API on the client (avoids an SSR/hydration mismatch).
    React.useEffect(() => {
        setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    }, []);

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

    const openShare = (url: string, mail = false) => {
        if (mail) {
            window.location.assign(url);
            return;
        }
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // Social share targets — add/remove entries here to change the share row.
    const socialShares: {
        label: string;
        Icon: React.ComponentType<{ className?: string }>;
        build: (url: string, title: string) => string;
        mail?: boolean;
    }[] = [
        { label: "Share on X", Icon: Twitter, build: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
        { label: "Share on Facebook", Icon: Facebook, build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
        { label: "Share on LinkedIn", Icon: Linkedin, build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
        { label: "Share on WhatsApp", Icon: WhatsappIcon, build: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
        { label: "Share via email", Icon: Mail, build: (u, t) => `mailto:?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(u)}`, mail: true },
    ];

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

    const nativeShare = async () => {
        try {
            await navigator.share({ title: post.title, text: post.excerpt, url: shareUrl() });
        } catch {
            /* user dismissed the share sheet, or it's unsupported — ignore */
        }
    };

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
                    <h1 className="mt-5 text-center text-3xl md:text-4xl max-w-[35ch] mx-auto">
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
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={copyLink}
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-[8px] border border-border/60 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Link2 className="w-3.5 h-3.5" />}
                                {copied ? "Copied" : "Copy link"}
                            </button>
                            {canNativeShare && (
                                <button
                                    onClick={nativeShare}
                                    aria-label="Share via your device"
                                    className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                            )}
                            {socialShares.map(({ label, Icon, build, mail }) => (
                                <button
                                    key={label}
                                    onClick={() => openShare(build(shareUrl(), post.title), mail)}
                                    aria-label={label}
                                    className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
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
                               [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
                               [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
                               [&_h4]:text-foreground
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
                        <h2 className="text-2xl mb-8">Related Articles</h2>
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
                                    <h3 className="mt-1 text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
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
