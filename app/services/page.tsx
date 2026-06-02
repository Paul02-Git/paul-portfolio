"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Calendar } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/Button";
import { brands } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const siteUrl = "https://paul-portfolio-drab.vercel.app";
const INNER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const buildServices = [
    {
        num: "01",
        title: "WordPress & Elementor",
        description: "Fast, custom, pixel-perfect websites built for performance and conversion. Not templates. Not shortcuts. Sites that load under 3 seconds and guide every visitor toward a single action.",
        image: "/images/blog/Landing Pages.webp",
    },
    {
        num: "02",
        title: "Shopify & Printify Stores",
        description: "Custom Shopify store builds, product listing and optimisation, and Printify print-on-demand integration. Done-for-you catalogues, mockups, and product pages built to turn browsers into buyers.",
        image: "/images/shopify-theme-store.webp",
    },
    {
        num: "03",
        title: "GoHighLevel Systems",
        description: "Full CRM setup, SMS and email automation, follow-up sequences, and calendar booking flows. Your lead pipeline runs 24/7 — even when you're with a client or asleep.",
        image: "/images/blog/gohighlevel-workflow.webp",
    },
    {
        num: "04",
        title: "Marketing Integrations",
        description: "GA4, GTM, Microsoft Clarity, and CRM sync — full attribution tracking so you know exactly which channels bring in paying clients and which ones to cut.",
        image: "/images/blog/GA4 and GTM.webp",
    },
    {
        num: "05",
        title: "SEO & Speed Optimisation",
        description: "Technical SEO audits, Core Web Vitals fixes, structured data markup, and server-level tuning. Built to rank. Built to stay there. Built to be found by the right people.",
        image: "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
];

const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "4+", label: "Years of Experience" },
    { value: "20+", label: "Happy Clients" },
];

const steps = [
    { num: "01", title: "Discovery", desc: "I learn your business, goals, and audience to map a clear, focused plan before any design begins." },
    { num: "02", title: "Plan & Design", desc: "A design that fits your brand identity — user-friendly, polished, and built from the ground up to convert." },
    { num: "03", title: "Development", desc: "A fast, responsive, SEO-ready build with obsessive attention to every detail and interaction." },
    { num: "04", title: "Test & Launch", desc: "Rigorous testing for speed, security, and bugs — then a smooth launch that's ready to grow with you." },
];


const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Paul Puzon WordPress & GoHighLevel Development Services",
    url: `${siteUrl}/services`,
    description:
        "Professional WordPress development, Elementor customization, GoHighLevel automation, Shopify, SEO, and web development services for businesses worldwide.",
    provider: { "@type": "Person", name: "Paul Puzon", url: siteUrl },
    areaServed: "Worldwide",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: buildServices.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
    },
};
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
           
            {children}
        </span>
    );
}

export default function ServicesPage() {
    return (
        <>
            <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            <main className="pb-20 pt-28 md:pt-32">
                <Navbar />

                {/* ── HERO (static — paints immediately) ── */}
                <section>
                    <div>
                        <Eyebrow>What We Offer</Eyebrow>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-12 items-center mt-4 md:mt-2">
                        <h1 className="leading-[1.05] tracking-tight max-w-[20ch]">
                            Innovation Meets Expertise In My Range Of <span className="text-primary">Services</span>
                        </h1>

                        <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                                From fast WordPress builds to complete GoHighLevel systems — everything you need to turn your website into your hardest-working sales tool.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="https://calendly.com/paulpuzon0007/30min" target="_blank" rel="noopener noreferrer" icon={<Calendar className="w-5 h-5" />} iconPosition="left">
                                    Book A Call
                                </Button>
                                <Button href="/contact" variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
                                    Get In Touch
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 relative left-1/2 -translate-x-1/2 w-screen">
                        <div className="relative h-[200px] sm:h-[280px] lg:h-[500px] overflow-hidden">
                            <Image
                                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt="Paul Puzon collaborating on a web development project"
                                fill
                                priority
                                quality={90}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* ── WHAT I BUILD (from homepage) ── */}
                <section className="section-y">
                    {/* Header */}
                    <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                        <div className="space-y-3 max-w-[30ch] md:max-w-[40ch]">
                            <p className="text-primary font-semibold text-sm uppercase tracking-widest">What I Build</p>
                            <h2>Built to Convert. Designed to Scale.</h2>
                        </div>
                        <div className="flex flex-col gap-6 md:items-end md:text-right max-w-[40ch]">
                            <p className="text-muted-foreground leading-relaxed ">
                                Every service is engineered with one goal: getting your business more clients.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/40 rounded-full px-4 py-2 hover:bg-primary hover:text-white transition-all duration-200 self-start md:self-auto"
                            >
                                Start A Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Service rows */}
                    <div className="mt-10">
                        {buildServices.map((service, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.08)}
                                className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-10 items-center border-t border-border/50 py-8 hover:border-primary/50 transition-colors duration-300"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted/30">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="leading-snug">{service.title}</h3>
                                        <span className="text-black/90 font-mono text-2xl md:text-3xl font-bold shrink-0 leading-none">
                                            [{service.num}]
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed max-w-lg">{service.description}</p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-border/60 px-4 py-2 hover:border-primary hover:text-primary transition-all duration-200"
                                    >
                                        Contact Us <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── STATS BAND ── */}
                <section className="relative left-1/2 -translate-x-1/2 w-screen bg-muted/40">
                    <div className={cn(INNER, "py-12 md:py-16")}>
                        <div className="grid grid-cols-2 md:grid-cols-4">
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    {...fadeUp(i * 0.06)}
                                    className={cn(
                                        "px-2 md:px-6 py-4 text-center md:text-center",
                                        i > 0 && "md:border-l md:border-border/60",
                                        i % 2 === 1 && "border-l border-border/60 md:border-l"
                                    )}
                                >
                                    <div className="text-4xl md:text-5xl font-bold tracking-tight">{s.value}</div>
                                    <div className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SIMPLE STEPS ── */}
                <section className="section-y">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.h2 {...fadeUp()} className="text-3xl md:text-4xl font-bold tracking-tight max-w-[18ch]">
                            Simple Steps To Complete Your Project
                        </motion.h2>
                        <motion.div {...fadeUp(0.1)} className="shrink-0">
                            <Button href="https://calendly.com/paulpuzon0007/30min" target="_blank" rel="noopener noreferrer" icon={<Calendar className="w-5 h-5" />} iconPosition="left">
                                Start Your Project
                            </Button>
                        </motion.div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                {...fadeUp(i * 0.08)}
                                className="rounded-2xl border border-border/60 bg-card p-7 md:p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <span className="text-5xl md:text-6xl font-bold text-primary/90">{step.num}</span>
                                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[48ch]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── SHOWCASE (full-bleed image) ── */}
                <section className="pb-4">
                    <div className="relative left-1/2 -translate-x-1/2 w-screen">
                        <motion.div {...fadeUp()} className="relative h-[200px] sm:h-[280px] lg:h-[500px] overflow-hidden">
                            <Image
                                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt="Building and developing a custom website"
                                fill
                                quality={90}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ── TOOLS / TECH STACK (from homepage) ── */}
                <section className="section-y">
                    <div className="relative max-w-[1100px] mx-auto">
                        <motion.h3 {...fadeUp()} className="text-center tracking-wide mb-8">
                            The trusted tools I use to build, automate &amp; scale your business
                        </motion.h3>

                        {/* Two-row marquee — opposite directions */}
                        <div className="relative overflow-hidden py-1">
                            {/* Edge fades */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

                            <div className="space-y-4">
                                {[
                                    { list: brands, reverse: false },
                                    { list: [...brands.slice(7), ...brands.slice(0, 7)], reverse: true },
                                ].map((row, rowIdx) => (
                                    <div
                                        key={rowIdx}
                                        className="flex items-center gap-4 w-max"
                                        style={{ animation: `marquee 75s linear infinite${row.reverse ? " reverse" : ""}` }}
                                    >
                                        {[...row.list, ...row.list].map((brand, i) => (
                                            <div
                                                key={i}
                                                className="inline-flex items-center gap-2.5 rounded-[8px] border border-border/70 bg-card px-6 py-3 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                                            >
                                                <div className="relative w-7 h-7 shrink-0">
                                                    <Image src={brand.logo} alt={brand.name} fill sizes="28px" className="object-contain" />
                                                </div>
                                                <span className="text-foreground/90 font-semibold text-base whitespace-nowrap tracking-tight">
                                                    {brand.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA + closing marquee ── */}
                <motion.section {...fadeUp()} className="text-center">
                    <h2 className="leading-tight max-w-[20ch] mx-auto">
                        Have A Project In Mind? Let&apos;s Make It Happen.
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <Button href="https://calendly.com/paulpuzon0007/30min" target="_blank" rel="noopener noreferrer" size="lg" icon={<Calendar className="w-5 h-5" />} iconPosition="left">
                            Book A Free Call
                        </Button>
                    </div>
                </motion.section>

            </main>
        </>
    );
}
