"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, ArrowRight, Calendar } from "lucide-react";
import { Whatsapp } from "./icons/Whatsapp";
import { NewsletterForm } from "./NewsletterForm";

const linkColumns = [
    {
        title: "Services",
        links: [
            { label: "WordPress & Elementor", href: "/services" },
            { label: "GoHighLevel Systems", href: "/services" },
            { label: "SEO & Speed", href: "/services" },
            { label: "Shopify & Printify", href: "/services" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Blog", href: "/blog" },
            { label: "Hire Me", href: "/contact" },
        ],
    },
    {
        title: "Get in Touch",
        links: [
            { label: "Contact", href: "/contact" },
            { label: "Book a Call", href: "/book-a-call" },
            { label: "Email Me", href: "mailto:paulpuzon0007@gmail.com" },
        ],
    },
];

const socials = [
    { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/paul.puzon73/" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paul-puzon-932b86303/" },
    { Icon: Whatsapp, label: "WhatsApp", href: "https://wa.me/639914075808" },
];

export const Footer = () => {
    return (
        <footer className="w-full">

            {/* ── Get In Touch CTA band ── */}
            <div className="relative overflow-hidden bg-primary section-y">
                {/* Concentric rings glowing on the right */}
                <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[600px] h-[600px] md:w-[760px] md:h-[760px]">
                    {[
                        { size: 100, bg: "bg-white/[0.04]" },
                        { size: 78, bg: "bg-white/[0.05]" },
                        { size: 57, bg: "bg-white/[0.07]" },
                        { size: 38, bg: "bg-white/[0.10]" },
                        { size: 20, bg: "bg-white/25" },
                    ].map((r, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 m-auto rounded-full ${r.bg}`}
                            style={{ width: `${r.size}%`, height: `${r.size}%` }}
                        />
                    ))}
                    <div
                        className="absolute inset-0 m-auto rounded-full bg-white/40 blur-2xl"
                        style={{ width: "12%", height: "12%" }}
                    />
                </div>

                {/* Content */}
                <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6 space-y-5">
                    <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                        Let&apos;s Get In Touch.
                    </h2>
                    <p className="text-white/80 leading-relaxed max-w-[56ch]">
                        Every day without a conversion-focused website is a day your competitors get the call instead. Let&apos;s fix that — free, and no obligation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        <Link
                            href="/book-a-call"
                            className="inline-flex items-center justify-between gap-3 bg-white text-black font-bold rounded-[8px] pl-5 pr-2 py-2 hover:bg-white/90 transition-colors duration-200"
                        >
                            Book a Discovery Call
                            <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4" />
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 bg-foreground text-white font-bold rounded-[8px] pl-5 pr-2 py-2 hover:bg-foreground/90 transition-colors duration-200"
                        >
                            Send a Message
                            <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-card border-t border-border/60">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6">

                {/* Newsletter row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 border-b border-border/60">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">Get website & lead-gen tips in your inbox</h3>
                        <p className="text-muted-foreground text-sm">
                            WordPress, GoHighLevel & SEO insights — no spam, just value.
                        </p>
                    </div>
                    <NewsletterForm className="w-full md:w-auto md:min-w-[320px]" />
                </div>

                {/* Main columns */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
                    {/* Brand */}
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="inline-block" aria-label="Paul Puzon home">
                            <Image
                                src="/images/paul_logo.png"
                                alt="Paul Puzon"
                                width={2000}
                                height={2000}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[34ch]">
                            WordPress developer & GoHighLevel specialist building conversion-focused
                            websites and automation for service businesses worldwide.
                        </p>
                        <div className="flex items-center gap-2">
                            {socials.map(({ Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {linkColumns.map((col) => (
                        <div key={col.title} className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">{col.title}</p>
                            <ul className="space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
               <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-border/60">
    <p className="text-sm text-muted-foreground">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        <span className="font-semibold text-foreground">
            Paul Puzon
        </span>
        . All rights reserved.
    </p>

    <nav
  aria-label="Footer navigation"
  className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground"
>
  <Link href="/privacy" className="transition-colors hover:text-primary">
    Privacy
  </Link>

  <Link href="/terms" className="transition-colors hover:text-primary">
    Terms
  </Link>

  <Link href="/sitemap.xml" className="transition-colors hover:text-primary">
    Sitemap
  </Link>

  <span className="text-muted-foreground/80">
    Based in the Philippines 🇵🇭
  </span>
</nav>

    
</div>
            </div>
            </div>
        </footer>
    );
};
