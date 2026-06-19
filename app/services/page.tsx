"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/Button";
import { FloatingIconsHero, type FloatingIcon } from "@/components/FloatingIconsHero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Eyebrow } from "@/components/Eyebrow";
import { brands } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;
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
        description: "Fast, custom, pixel-perfect websites built for performance and conversion — sites that load under 3 seconds and guide every visitor toward a single action.",
        image: "/images/blog/Landing Pages.webp",
    },
    {
        num: "02",
        title: "Shopify & Printify Stores",
        description: "Custom Shopify builds, product optimisation, and Printify print-on-demand — catalogues and product pages built to turn browsers into buyers.",
        image: "/images/shopify-theme-store.webp",
    },
    {
        num: "03",
        title: "GoHighLevel Systems",
        description: "Full CRM setup, SMS and email automation, follow-up sequences, and calendar booking flows. Your lead pipeline runs 24/7 — even while you sleep.",
        image: "/images/blog/gohighlevel-workflow.webp",
    },
    {
        num: "04",
        title: "Marketing Integrations",
        description: "GA4, GTM, Microsoft Clarity, and CRM sync — full attribution tracking so you know exactly which channels bring in paying clients.",
        image: "/images/blog/GA4 and GTM.webp",
    },
    {
        num: "05",
        title: "SEO & Speed Optimisation",
        description: "Technical SEO audits, Core Web Vitals fixes, structured data, and server-level tuning. Built to rank, built to stay there, built to be found.",
        image: "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        num: "06",
        title: "Care Plans & Maintenance",
        description: "Ongoing updates, backups, security monitoring, and quick edits — so your site stays fast, safe, and always online.",
        image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
];

// Trusted-tool logos floated around the hero (sourced from `brands` so they stay in sync).
const logo = (name: string) => brands.find((b) => b.name === name)?.logo ?? "";
const heroIcons: FloatingIcon[] = [
    // Core five — visible on every breakpoint, scattered around the headline.
    { id: 1, name: "Wordpress", logo: logo("Wordpress"), className: "top-[10%] left-[20%]" },
    { id: 2, name: "Shopify", logo: logo("Shopify"), className: "top-[10%] right-[15%]" },
    { id: 4, name: "Klaviyo", logo: logo("Klaviyo"), className: "bottom-[2%] left-[15%] md:bottom-[20%]" },
    { id: 5, name: "Elementor", logo: logo("Elementor"), className: "bottom-[33%] right-[20%] md:bottom-[20%]"},
    // Desktop-only extras — mid bands, hidden on mobile to keep the five clean.
    { id: 6, name: "GHL", logo: logo("GHL"), className: "top-[34%] right-[25%] hidden md:block" },
    { id: 7, name: "Google Analytics", logo: logo("Google Analytics"), className: "top-[44%] left-[8%] hidden md:block" },
    { id: 8, name: "Printify", logo: logo("Printify"), className: "top-[46%] left-[24%] hidden lg:block" },
    { id: 9, name: "Claude", logo: logo("Claude"), className: "top-[48%] right-[10%] hidden lg:block" },
];

const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "7+", label: "Years of Experience" },
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

export default function ServicesPage() {
    return (
        <>
            <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            <main className="section-yb">
                <Navbar />

                {/* ── HERO (floating, cursor-reactive icons) ── */}
                <FloatingIconsHero
                    className="mt-10 md:min-h-[80vh]"
                    eyebrow="What We Offer"
                    title={
                        <>
                            WordPress &amp; GHL Services<span className="text-primary"> Built to Win</span> You More Clients
                        </>
                    }
                    subtitle="From fast WordPress builds to complete GoHighLevel systems, everything you need to turn your website into your hardest-working sales tool."
                    ctaText="Book A Call"
                    ctaHref="/book-a-call"
                    ctaIcon={<ArrowUpRight className="w-5 h-5" />}
                    secondaryCtaText="Get In Touch"
                    secondaryCtaHref="/contact"
                    secondaryCtaIcon={<ArrowUpRight className="w-5 h-5" />}
                    icons={heroIcons}
                />

                {/* ── WHAT I BUILD (from homepage) ── */}
                <section className="section-y">
                    {/* Header */}
                    <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                        <div className="space-y-3 max-w-[30ch] md:max-w-[40ch]">
                            <Eyebrow>What I Build</Eyebrow>
                            <h2>Built to Convert. Designed to Scale.</h2>
                        </div>
                        <div className="flex flex-col gap-6 md:items-end md:text-right max-w-[40ch]">
                            <p className="text-muted-foreground leading-relaxed ">
                                Every website, funnel, and digital experience I create is built with one goal: helping your business attract, convert, and retain more clients.
                            </p>
                            </div>
                    </motion.div>

                    {/* Service cards — image on top, 3 across */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {buildServices.map((service, i) => (
                            <motion.div
                                key={service.title}
                                {...fadeUp(i * 0.07)}
                                className="group flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted/30">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="mt-5 flex flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-[1.3rem]">{service.title}</h3>
                                        <span className="text-foreground/90 font-mono text-xl md:text-2xl font-bold shrink-0 leading-none">
                                            [{service.num}]
                                        </span>
                                    </div>
                                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                                    <Button
                                        href="/book-a-call"
                                        variant="outline"
                                        size="sm"
                                        icon={<ArrowRight className="w-4 h-4" />}
                                        className="mt-auto pt-4 self-start sm:ml-0"
                                    >
                                        Get a quote<span className="sr-only"> about {service.title}</span>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── STATS BAND ── */}
                <section className="full-bleed bg-muted/40">
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
                        <motion.h2 {...fadeUp()} className="max-w-[20ch]">
                            Simple Steps To Complete Your Project
                        </motion.h2>
                        <motion.div {...fadeUp(0.1)} className="shrink-0">
                            <Button href="/book-a-call" icon={<ArrowUpRight className="w-5 h-5" />}>
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
                                <h3 className="mt-4 text-xl">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[48ch]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── SHOWCASE (full-bleed image) ── */}
                <section className="pb-4">
                    <div className="full-bleed">
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
                    <TechStackMarquee items={brands} />
                </section>

                {/* ── CTA + closing marquee ── */}
                <motion.section {...fadeUp()} className="text-center">
                    <h2 className="max-w-[20ch] mx-auto">
                        Have A Project In Mind? Let&apos;s Make It Happen.
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <Button href="/book-a-call" icon={<ArrowUpRight className="w-5 h-5" />}>
                            Book A Free Call
                        </Button>
                    </div>
                </motion.section>

            </main>
        </>
    );
}
