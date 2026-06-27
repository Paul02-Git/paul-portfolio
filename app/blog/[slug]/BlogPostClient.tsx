"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin, Mail, Link2, Check, Share2 } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { cn } from "@/lib/utils";

type TocItem = { id: string; text: string; level: number };

/** WhatsApp brand glyph, lucide-react has no WhatsApp icon, so we inline it. */
function WhatsappIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

/** Newsletter signup block, shared by the desktop right rail and the mobile layout. */
function SubscribeBlock({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-md p-6", className)}>
            <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold leading-snug max-w-[20ch]">Get the week&apos;s best marketing content</p>
                <Image src="/images/newsletter-envelope.png" alt="" width={48} height={50} quality={95} className="shrink-0 -mt-1" />
            </div>
            <NewsletterForm layout="stacked" className="mt-4" />
        </div>
    );
}

/** Typographic styling for the article body (shared across split halves). */
const PROSE_CLASSES =
    "text-base md:text-lg text-foreground/80 leading-relaxed " +
    "[&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 " +
    "[&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 " +
    "[&_h3]:text-foreground [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 " +
    "[&_h4]:text-foreground " +
    "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 " +
    "[&_strong]:text-foreground [&_strong]:font-bold " +
    "[&_i]:text-primary " +
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 " +
    "[&_img]:h-auto [&_img]:w-full " +
    // Callout / "Quick Win" box. Authored in post HTML as <div class="callout">,
    // styled globally here so the markup stays a one-liner and never drifts.
    "[&_.callout]:my-10 [&_.callout]:p-6 [&_.callout]:bg-primary/5 [&_.callout]:border [&_.callout]:border-primary/20 [&_.callout]:rounded-2xl " +
    "[&_.callout>h4]:text-lg [&_.callout>h4]:font-bold [&_.callout>h4]:text-primary [&_.callout>h4]:mb-2 " +
    "[&_.callout>p]:text-sm";

/** Drop-cap treatment, applied only to the first paragraph of the article. */
const DROPCAP_CLASSES =
    "[&>div>p:first-of-type]:first-letter:float-left " +
    "[&>div>p:first-of-type]:first-letter:mr-3 " +
    "[&>div>p:first-of-type]:first-letter:mt-1 " +
    "[&>div>p:first-of-type]:first-letter:text-6xl " +
    "[&>div>p:first-of-type]:first-letter:font-bold " +
    "[&>div>p:first-of-type]:first-letter:leading-[0.7] " +
    "[&>div>p:first-of-type]:first-letter:text-foreground";

/** Full-bleed "book a call" CTA dropped into the middle of the article. */
function InlineCta() {
    return (
        <div className="my-12 relative overflow-hidden rounded-xl shadow-lg">
            <Image
                src="/images/ATF Background.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b2430] via-[#1b2430]/85 to-[#1b2430]/30" />
            <div className="relative p-8 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Free Website Audit</p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white max-w-[15ch] leading-tight">
                    Build, improve, and grow online.
                </h3>
                <p className="mt-3 text-white/75 max-w-[40ch]">
                    Whether you're starting fresh or improving an existing site, discover opportunities to grow online.
                </p>
                <Link
                    href="/book-a-call"
                    className="mt-6 inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold text-foreground bg-muted hover:bg-primary/90 hover:text-muted transition-colors"
                >
                    Book a Free Call
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

/**
 * Split the article HTML at an <h2> near the middle so a CTA can be hosted
 * between the two halves. Returns the original HTML (and a null `after`) when
 * there aren't enough sections to split cleanly.
 */
function splitForCta(html: string): { before: string; after: string | null } {
    const openMatch = html.match(/^\s*<div[^>]*>/);
    const headings = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index ?? 0);
    if (!openMatch || headings.length < 3) return { before: html, after: null };

    const openTag = openMatch[0];
    const mid = html.length / 2;
    // Pick the heading nearest the middle, but never the very first section.
    let target = headings[1];
    for (const pos of headings.slice(1)) {
        if (Math.abs(pos - mid) < Math.abs(target - mid)) target = pos;
    }
    return { before: html.slice(0, target) + "</div>", after: openTag + html.slice(target) };
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

    // Split the body around a mid-article CTA.
    const { before: bodyBefore, after: bodyAfter } = React.useMemo(
        () => splitForCta(contentHtml),
        [contentHtml]
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

    // Social share targets, add/remove entries here to change the share row.
    const socialShares: {
        label: string;
        Icon: React.ComponentType<{ className?: string }>;
        build: (url: string, title: string) => string;
        mail?: boolean;
    }[] = [
        { label: "Share on X", Icon: Twitter, build: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
        { label: "Share on Facebook", Icon: Facebook, build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
        { label: "Share on LinkedIn", Icon: Linkedin, build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
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
            /* user dismissed the share sheet, or it's unsupported, ignore */
        }
    };

    const author = post.author ?? "Paul Puzon";
    const authorBio =
        post.authorBio ??
        "Building Websites That Drive Growth • WordPress Developer • Elementor Expert • GoHighLevel";
    const authorImage = "/images/Paul Puzon Profile.png";

    // Author social links shown in the right-rail card.
    const authorSocials: { label: string; Icon: React.ComponentType<{ className?: string }>; href: string }[] = [
        { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/paul-puzon-932b86303/" },
        { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/paul.puzon73/" },
        { label: "WhatsApp", Icon: WhatsappIcon, href: "https://wa.me/639914075808" },
        ];
    const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Related posts, same category first, then fill with the most recent others.
    const related = [
        ...blogPosts.filter((p) => p.slug !== slug && p.category === post.category),
        ...blogPosts.filter((p) => p.slug !== slug && p.category !== post.category),
    ].slice(0, 3);

    return (
        <main className="pb-20 pt-30 md:pt-40">
            <Navbar />

            <div className="max-w-[1280px] mx-auto">

                {/* ── HEADER (1280 content) ── */}
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
                    <h1 className="mt-5 text-center text-3xl md:text-4xl max-w-[31ch] mx-auto text-balance">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="mt-6 text-center text-lg text-muted-foreground leading-relaxed mx-auto max-w-[60ch] text-balance">
                        {post.excerpt}
                    </p>

                    {/* Featured image */}
                    <div className="mt-10 relative aspect-[16/9] sm:aspect-[2/1] w-full mx-auto overflow-hidden rounded-md bg-muted/30">
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
                            <span className="relative w-11 h-11 rounded-full overflow-hidden bg-muted shrink-0">
                                <Image src={authorImage} alt={author} fill quality={95} sizes="128px" className="object-cover" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-foreground leading-tight">{author}</p>
                                <p className="text-xs text-muted-foreground">{post.date} · {readTime} min read</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={copyLink}
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-sm border border-border/60 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
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

                {/* ── BODY GRID (TOC · article · author) ── */}
                <div className="mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:gap-10 mx-auto">

                {/* ── Left rail: contents (sticky) ── */}
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
                    </div>
                </aside>

            <article className="min-w-0 w-full">

                {/* Body — first half (with drop-cap), CTA, then the remainder. */}
                <div
                    className={cn("mt-10", PROSE_CLASSES, DROPCAP_CLASSES)}
                    dangerouslySetInnerHTML={{ __html: bodyBefore }}
                />
                <InlineCta />
                {bodyAfter && (
                    <div
                        className={PROSE_CLASSES}
                        dangerouslySetInnerHTML={{ __html: bodyAfter }}
                    />
                )}

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

                {/* Author block, mobile only (desktop uses the right rail) */}
                <div className="lg:hidden mt-12 rounded-md border border-border/60 bg-muted/30 p-6">
                    <div className="flex items-center gap-4">
                        <span className="relative w-14 h-14 rounded-full overflow-hidden bg-muted shrink-0">
                            <Image src={authorImage} alt={author} fill quality={95} sizes="128px" className="object-cover" />
                        </span>
                        <div className="min-w-0">
                            <p className="font-bold text-foreground leading-tight">{author}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{authorBio}</p>
                    <div className="mt-5 flex items-center gap-2">
                        {authorSocials.map(({ label, Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Subscribe block, mobile only (desktop uses the sidebar block) */}
                <SubscribeBlock className="lg:hidden mt-8" />
            </article>

                {/* ── Right rail: author card + newsletter (sticky) ── */}
                <aside className="hidden lg:block">
                    <div className="sticky top-28 space-y-6">
                        <div className="rounded-md border border-border/60 bg-muted/30 p-6">
                            <span className="relative w-16 h-16 rounded-full overflow-hidden bg-muted block">
                                <Image src={authorImage} alt={author} fill quality={95} sizes="128px" className="object-cover" />
                            </span>
                            <p className="mt-4 font-bold text-foreground leading-tight">{author}</p>
                            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{authorBio}</p>
                            <div className="mt-5 flex items-center gap-2">
                                {authorSocials.map(({ label, Icon, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Work-with-me CTA */}
                        <div className="rounded-md border border-border/60 bg-muted/30 p-6">
                            <p className="font-bold leading-snug text-foreground">Need a website that works for your business?</p>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                I build fast WordPress websites and GoHighLevel automations for growing businesses.
                            </p>
                            <Link
                                href="/book-a-call"
                                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                            >
                                Book a Call
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Newsletter */}
                        <SubscribeBlock />
                    </div>
                </aside>
                </div>

                {/* ── Related Articles, full-width row below the body ── */}
                {related.length > 0 && (
                    <section className="mt-16 border-t border-border/60 pt-10">
                        <h2 className="text-2xl mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {related.map((rp) => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                                    <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-3 bg-muted/30">
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
