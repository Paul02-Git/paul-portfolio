"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
    Award,
    Eye,
    MessagesSquare,
    ArrowUpRight,
    Calendar,
    Asterisk,
    ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const siteUrl = "https://paul-portfolio-drab.vercel.app";
const INNER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const services = [
    "Web Design",
    "WordPress Development",
    "Shopify",
    "SEO Optimization",
    "GoHighLevel",
    "Conversion Optimization",
    "Lead Generation",
    "Branding",
];

/** Full-bleed marquee band — matches the homepage dark band, keeps the services copy. */
function MarqueeBand() {
    return (
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <div className="bg-foreground py-12">
                <div className="overflow-hidden">
                    <div className="flex items-center animate-marquee w-max ">
                        {[...Array(2)].flatMap(() => services).map((item, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-8 px-4 text-white font-bold text-2xl uppercase tracking-widest whitespace-nowrap"
                            >
                                {item}
                                <Asterisk className="w-7 h-7 text-white/80" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const stats = [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Happy Clients", value: "20+" },
    { label: "Countries Served", value: "24+" },
];

const values = [
    {
        Icon: Award,
        title: "Proven Expertise",
        desc: "4+ years of WordPress, Shopify & GoHighLevel builds for clients across 24+ countries — never cookie-cutter templates.",
    },
    {
        Icon: Eye,
        title: "Obsessive Detail",
        desc: "I sweat the small stuff so your site is fast, pixel-perfect, and built to turn visitors into real leads.",
    },
    {
        Icon: MessagesSquare,
        title: "Clear Communication",
        desc: "Honest updates, quick replies, and zero jargon. You'll always know exactly where your project stands.",
    },
];

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
        "@type": "Person",
        name: "Paul Puzon",
        jobTitle: "WordPress Developer & GoHighLevel Specialist",
        url: `${siteUrl}/about`,
        image: `${siteUrl}/images/profile.png`,
        address: { "@type": "PostalAddress", addressLocality: "Manila", addressCountry: "PH" },
    },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
           
            {children}
        </span>
    );
}

export default function AboutPage() {
    return (
        <>
            <Script id="about-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

            <main className="pt-28 md:pt-32">
                <Navbar />

                {/* ── HERO — Who I Am (static — paints immediately) ── */}
                <section>
                    <div>
                        <Eyebrow>Who I Am</Eyebrow>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center mt-4 md:mt-2">
                        <h1 className="lg:col-span-7 leading-[1.05] tracking-tight max-w-[20ch]">
                            I&apos;m A Specialist In <span className="text-primary">Web Design &amp; Development</span>
                        </h1>

                        <div className="lg:col-span-5 space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                                My work covers a wide range of digital needs — from fast WordPress builds and conversion-ready Shopify stores to GoHighLevel funnels, SEO, and automation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="https://calendly.com/paulpuzon0007/30min" target="_blank" rel="noopener noreferrer" icon={<Calendar className="w-5 h-5" />} iconPosition="left">
                                    Free Consultation
                                </Button>
                                <Button href="/contact" variant="outline">
                                    Contact Us <ArrowUpRight className="w-4 h-4" />
                                </Button>

                            </div>
                        </div>
                    </div>

                    {/* hero image */}
                    <div className="mt-10 relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden ">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                            alt="Paul Puzon working with a client on a web project"
                            fill
                            priority
                            quality={90}
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* ── Services marquee band ── */}
                <div className="mt-14 md:mt-16">
                    <MarqueeBand />
                </div>

                {/* ── START WITH ME — muted band + stats ── */}
                <section className="relative left-1/2 -translate-x-1/2 w-screen bg-muted/40">
                    <div className={cn(INNER, "section-y")}>
                        <motion.div {...fadeUp()}>
                            <Eyebrow>Start With Me</Eyebrow>
                        </motion.div>

                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            <motion.h2
                                {...fadeUp(0.05)}
                                className="lg:col-span-5 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight"
                            >
                                Straightforward Web Solutions With No Hidden Surprises
                            </motion.h2>

                            <motion.div {...fadeUp(0.12)} className="lg:col-span-7 space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    I believe in clear, transparent work you can actually trust. Whether you&apos;re launching a brand-new site, rescuing a slow one, or scaling a store, I deliver personalized solutions and simplify the process so it&apos;s easy to understand every step of the way.
                                </p>
                                <p>
                                    Every project is built for results — fast, accessible, and optimized to convert — all while building a long-term relationship focused on the outcomes that matter most to your business.
                                </p>
                            </motion.div>
                        </div>

                        {/* stats */}
                        <motion.div {...fadeUp(0.18)} className="mt-12 grid grid-cols-2 md:grid-cols-4 center text-center">
                            {stats.map((s, i) => (
                                <div
                                    key={s.label}
                                    className={cn(
                                        "px-4 py-4 md:px-6",
                                        i > 0 && "md:border-l md:border-border/60",
                                        i % 2 === 1 && "border-l border-border/60 md:border-l"
                                    )}
                                >
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                                    <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{s.value}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── WHY WORK WITH ME — cards + CTA ── */}
                <section className="section-y">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <motion.div {...fadeUp()} className="lg:col-span-6">
                            <Eyebrow>Why Work With Me</Eyebrow>
                            <h2 className="mt-5 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight">
                                I Build Your Trust And Handle Your Project
                            </h2>
                        </motion.div>
                        <motion.p {...fadeUp(0.1)} className="lg:col-span-6 text-muted-foreground leading-relaxed self-end">
                            I pride myself on being a dependable partner, ready to guide you through complex digital challenges with genuine expertise and care — from first call to final launch.
                        </motion.p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                {...fadeUp(i * 0.08)}
                                className="group rounded-2xl border border-border/60 bg-card p-6 md:p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <span className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                                    <v.Icon className="w-5 h-5 text-primary" />
                                </span>
                                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}

                        {/* CTA card */}
                        <motion.div
                            {...fadeUp(values.length * 0.08)}
                            className="rounded-2xl bg-primary text-white p-6 md:p-7 flex flex-col justify-between min-h-[220px]"
                        >
                            <div>
                                <Asterisk className="w-7 h-7 text-white/80 mb-4" />
                                <h3 className="text-xl font-bold text-white leading-snug">Let&apos;s Work Together!</h3>
                                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                                    Exciting projects await. Tell me about yours.
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center justify-center gap-2 rounded-[8px] bg-white text-foreground font-bold px-5 py-3 hover:bg-white/90 transition-colors"
                            >
                                Get In Touch <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}
