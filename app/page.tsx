"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Star,
  Zap,
  Code2,
  BarChart3,
  Search,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { HeroBuildIllustration } from "@/components/HeroBuildIllustration";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { testimonials, projects, brands, blogPosts, faqs } from "@/data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

export default function Home() {
  return (
    <main className="pt-14 md:pt-32">
      <Navbar />

        {/* ── HERO ── */}
        <section className="section-yb grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">

          {/* Left — Text */}
          <div className="space-y-6 order-2 lg:order-1">


            {/* Eyebrow — primary keyword */}
            <p className="text-foreground font-semibold text-sm uppercase tracking-widest pt-6 md:pt-0">
              WordPress Website Developer
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.06]">
              Your Business Is Legit.{" "}
              <span className="text-primary">Your Website Should Be Too.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-[46ch] leading-relaxed">
              I build fast, professional websites that make your business look the part, and turn visitors into real leads.
            </p>

            

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
                href="/book-a-call"
              >
                Book A Call
              </Button>
              <Button
                variant="outline"
                href="/contact"
                icon={<ArrowUpRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Ask a Question
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border/40 max-w-sm">
              {[
                { value: "7+",  label: "Years"     },
                { value: "50+", label: "Projects"  },
                { value: "20+", label: "Clients"   },
                { value: "5★",  label: "Rating"    },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold text-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard cards */}
          <div className="relative order-1 lg:order-2 w-full pt-6 lg:pt-0">

            {/* Soft glow */}
            <div className="pointer-events-none absolute -z-10 right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-[34rem] py-4">

              {/* Vector illustration (accent follows brand color) */}
              <HeroBuildIllustration className="text-foreground w-full" />

              {/* Brand tag — top left (WordPress) */}
              <div className="absolute top-[8%] left-[7%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap -rotate-3">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                WordPress Dev
              </div>

              {/* Brand tag — top right (GHL) */}
              <div className="absolute top-[6%] right-[7%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap rotate-2">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                GHL Specialist
              </div>

              {/* Brand tag — upper left (Available) */}
              <div className="absolute top-[31%] left-[2%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap -rotate-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available
              </div>

              {/* Brand tag — upper right (Klaviyo) */}
              <div className="absolute top-[34%] right-[2%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap rotate-3">
                <span className="relative h-3.5 w-3.5"><Image src="/images/klaviyo.svg" alt="Klaviyo" fill sizes="14px" className="object-contain" /></span>
                Klaviyo
              </div>

              {/* Brand tag — lower left (Shopify) */}
              <div className="absolute top-[66%] left-[6%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap rotate-2">
                <span className="relative h-3.5 w-3.5"><Image src="/images/shopify.svg" alt="Shopify" fill sizes="14px" className="object-contain" /></span>
                Shopify
              </div>

              {/* Brand tag — lower right (Elementor) */}
              <div className="absolute top-[59%] right-[5%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap rotate-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                Elementor Pro
              </div>

              {/* Brand tag — bottom center (Printify) */}
              <div className="absolute bottom-[13%] left-[37%] z-20 flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap -rotate-2">
                <span className="relative h-3.5 w-3.5"><Image src="/images/printify.svg" alt="Printify" fill sizes="14px" className="object-contain" /></span>
                Printify
              </div>
            </div>
          </div>

        </section>

        {/* ── DOUBLE MARQUEE BAND — full viewport width ── */}
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
          <div className="bg-foreground py-8 space-y-3">

            {/* Row 1 — scrolls left */}
            <div className="overflow-hidden">
              <div className="flex items-center animate-marquee w-max">
                {[...Array(2)].flatMap(() => [
                  "More Booked Calls",
                  "Faster Websites",
                  "Automated Follow-Ups",
                  "Higher Conversions",
                  "Better First Impressions",
                  "No Leads Left Behind",
                  "Google-Ready Sites",
                ]).map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-8 px-4 text-white font-bold text-lg uppercase tracking-widest whitespace-nowrap"
                  >
                    {item}
                    <span className="text-white/90 leading-none">✦</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── PROBLEM ── */}
        <section className="section-y">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left — Text (order-2 on mobile, order-1 on desktop) */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <Eyebrow>The Real Problem</Eyebrow>
                <h2 className="max-w-[20ch]">
                  If Your Website Isn&apos;t Bringing In Leads, It&apos;s Costing You Every Day
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Most service businesses have a website. Very few have one that actually works. Here&apos;s what&apos;s usually broken — and what I fix.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  { Icon: Search,    text: "You're invisible on Google — your competitors aren't." },
                  { Icon: BarChart3, text: "Visitors land on your site and leave without contacting you." },
                  { Icon: Zap,       text: "Leads go cold because there's no automated follow-up." },
                ].map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span className="text-foreground leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>

              <Button
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
                href="/book-a-call"
              >
                Book A Call
              </Button>
            </div>

            {/* Right — Image with offset accent (order-1 on mobile, order-2 on desktop) */}
            <motion.div {...fadeUp(0.15)} className="relative flex justify-start lg:justify-end order-1 lg:order-2">
               
              {/* Image */}
              <div className="relative w-full max-w-full lg:max-w-none aspect-[3/2] rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="https://images.pexels.com/photos/36764792/pexels-photo-36764792.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Stressed business owner at his desk because his website isn't bringing in leads"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── SERVICES ── */}
        <section>

          {/* Header */}
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-0 border-t border-border/50 pt-12">
            <div className="space-y-3 max-w-[30ch] md:max-w-[40ch]">
              <Eyebrow>What I Build</Eyebrow>
              <h2>Built to Convert. Designed to Scale.</h2>
            </div>
            <div className="flex flex-col gap-3 md:items-end md:text-right max-w-[45ch]">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Every service is engineered with one goal: getting your business more clients.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/40 rounded-full px-4 py-2 hover:bg-primary hover:text-white transition-all duration-200 self-start md:self-auto"
              >
                See All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Service rows */}
          <div className="mt-10">
            {[
              {
                num: "01",
                title: "WordPress & Elementor",
                description: "Fast, custom, pixel-perfect websites built for performance and conversion. Not templates. Not shortcuts. Sites that load under 3 seconds and guide every visitor toward a single action.",
                image: "/images/blog/Landing Pages.webp",
                href: "/services",
              },
              {
                num: "02",
                title: "Shopify & Printify Stores",
                description: "Custom Shopify store builds, product listing and optimisation, and Printify print-on-demand integration. Done-for-you catalogues, mockups, and product pages built to turn browsers into buyers.",
                image: "/images/shopify-theme-store.webp",
                href: "/services",
              },
              {
                num: "03",
                title: "GoHighLevel Systems",
                description: "Full CRM setup, SMS and email automation, follow-up sequences, and calendar booking flows. Your lead pipeline runs 24/7 — even when you're with a client or asleep.",
                image: "/images/blog/gohighlevel-workflow.webp",
                href: "/services",
              },
              {
                num: "04",
                title: "Marketing Integrations",
                description: "GA4, GTM, Microsoft Clarity, and CRM sync — full attribution tracking so you know exactly which channels bring in paying clients and which ones to cut.",
                image: "/images/blog/GA4 and GTM.webp",
                href: "/services",
              },
              
              {
                num: "05",
                title: "SEO & Speed Optimisation",
                description: "Technical SEO audits, Core Web Vitals fixes, structured data markup, and server-level tuning. Built to rank. Built to stay there. Built to be found by the right people.",
                image: "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&w=1600",
                href: "/services",
              },
            ].slice(0, 3).map((service, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-10 items-center border-t border-border/50 py-8 hover:border-primary/50 transition-colors duration-300 "
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
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-border/60 px-4 py-2 hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    Learn More<span className="sr-only"> about {service.title}</span> <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TOOLS / TECH STACK ── */}
        <section className="section-y">
          <TechStackMarquee items={brands} />
        </section>

        {/* ── FULL-BLEED CTA ── */}
        <section className="section-y relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">

          {/* Background image */}
          <Image
            src="https://images.pexels.com/photos/30690786/pexels-photo-30690786.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="A designer working late at a multi-monitor desk setup"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark overlays for legibility */}
          <div className="absolute inset-0 bg-foreground/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-foreground/40 to-foreground/60" />

          {/* Content */}
          <div className="relative mx-auto px-4 sm:px-6 lg:px-6">
            <motion.div
              {...fadeUp()}
              className="flex flex-col items-center text-center space-y-6"
            >
              <Eyebrow className="text-white">No Risk, No Pressure</Eyebrow>
              <h2 className="text-white max-w-[25ch]">
                Not Sure What Your Website Needs? Let&apos;s Figure It Out — Free.
              </h2>
              <p className="text-white/75 text-lg leading-relaxed max-w-[60ch]">
                Book a free 30-minute strategy call. I&apos;ll review your current site and show you exactly what&apos;s holding back your leads — whether you hire me or not.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold rounded-[8px] px-7 py-4 hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-primary/20"
                >
                  <Calendar className="w-5 h-5" /> Book A Call
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURED WORK ── */}
        <section className="section-y">
          {/* Header */}
          <motion.div
            {...fadeUp()}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10"
          >
            <div className="space-y-4">
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="max-w-[16ch]">Explore My Portfolio</h2>
            </div>
            <p className="text-muted-foreground max-w-[34ch] lg:text-right">
              A look at the websites and systems I&apos;ve built to help businesses grow.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div key={i} {...fadeUp((i % 3) * 0.08)}>
                <Link
                  href="/portfolio"
                  aria-label={`View ${project.title}`}
                  className="group relative block aspect-[3/2] rounded-[8px] overflow-hidden bg-muted shadow-sm"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="min-w-0">
                      <span className="inline-block px-2.5 py-1 mb-2 rounded-[4px] bg-foreground text-[10px] font-semibold uppercase tracking-wider text-white">
                        {project.category}
                      </span>
                      <h3 className="text-white text-base font-bold leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    <span className="shrink-0 w-10 h-10 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View all */}
          <motion.div {...fadeUp(0.1)} className="flex justify-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border border-border/70 rounded-[8px] px-5 py-2.5 hover:border-primary hover:text-primary transition-all duration-200"
            >
              See All Projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* ── PROCESS MARQUEE BAND (matches top marquee) ── */}
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
          <div className="bg-foreground py-8 w-screen">
            <div className="overflow-hidden">
              <div className="flex items-center animate-marquee w-max">
                {[...Array(4)].flatMap(() => [
                  "Discover",
                  "Strategy",
                  "Design",
                  "Build",
                  "Test",
                  "Launch",
                  "Support",
                ]).map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-8 px-4 text-white font-bold text-lg uppercase tracking-widest whitespace-nowrap"
                  >
                    {item}
                    <span className="text-white/90 leading-none">✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="section-y">
          <motion.div {...fadeUp()}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
<Eyebrow>The Process</Eyebrow>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-10 md:mb-14">
              <h2 className="max-w-[15ch] shrink-0">
                From First Call to a Live Site in 3 Steps
              </h2>
              <div className="hidden md:block flex-1 h-px bg-border" />
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  step: "01.",
                  title: "Book A Call",
                  description:
                    "Tell me about your business, your goals, and what's not working. 30 minutes — no sales pitch, no pressure, just honest advice you can use either way.",
                },
                {
                  step: "02.",
                  title: "Get a Scoped Plan",
                  description:
                    "You receive a detailed proposal: exactly what gets built, when it goes live, and a fixed price. No scope creep. No surprise invoices.",
                },
                {
                  step: "03.",
                  title: "Launch & Grow",
                  description:
                    "We build, test, and launch a site that converts — with automation that follows up. 30 days of post-launch support included.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  className="group rounded-xl bg-card border border-border/60 p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <span className="text-primary text-5xl font-bold leading-none mb-4">{step.step}</span>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-5 rounded-xl bg-muted/30 border border-border/60 p-4 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3 min-w-0">
                <div className="flex -space-x-2.5 shrink-0">
                  {[
                    { src: "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=1600", name: "Client" },
                    { src: "https://images.pexels.com/photos/29852852/pexels-photo-29852852.jpeg?auto=compress&cs=tinysrgb&w=1600", name: "Client" },
                    { src: "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&w=1600", name: "Client" },
                    { src: "https://images.pexels.com/photos/30198184/pexels-photo-30198184.jpeg?auto=compress&cs=tinysrgb&w=1600", name: "Client" },
                  ].map((a, i) => (
                    <span key={i} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-card bg-muted">
                      <Image src={a.src} alt={a.name} fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-snug">
                  Align with businesses that <span className="font-semibold text-foreground">choose quality</span>
                </p>
              </div>
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold rounded-full pl-5 pr-2 py-2 hover:bg-primary/90 transition-colors duration-200 shrink-0"
              >
                Book A Call
                <span className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Elegant divider ── */}
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <span className="w-2 h-2 rotate-45 border border-primary/50 bg-primary/15" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        {/* ── TESTIMONIALS ── */}
        <section className="section-y">
          <motion.div {...fadeUp()} className="text-center mx-auto mb-12 space-y-4">
            <Eyebrow>Social Proof</Eyebrow>
            <h2>Clients Who Made the Switch</h2>
            <p className="text-muted-foreground leading-relaxed">
              Real results from real businesses. Here&apos;s what working together actually looks like.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 sm:p-8 md:p-10"
          >
            {/* Warm gradient accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary/10 via-primary/[0.04] to-transparent" />

            {/* Social-proof bar */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[
                    "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    "https://images.pexels.com/photos/29852852/pexels-photo-29852852.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    "https://images.pexels.com/photos/30198184/pexels-photo-30198184.jpeg?auto=compress&cs=tinysrgb&w=1600",
                  ].map((src, i) => (
                    <span key={i} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-card bg-muted">
                      <Image src={src} alt="Client" fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">20+ businesses</span> rated my work <span className="font-semibold text-foreground">5 stars</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold rounded-[8px] px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors duration-200"
                >
                  <Calendar className="w-4 h-4" /> Book A Call
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-bold rounded-[8px] px-5 py-2.5 text-sm hover:bg-muted/40 transition-colors duration-200"
                >
                  Contact Me <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Testimonial grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.slice(0, 6).map((t, i) => {
                return (
                  <motion.div
                    key={i}
                    {...fadeUp((i % 3) * 0.08)}
                    className="rounded-xl border border-border/60 bg-background/60 p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-border/40">
                      <span className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── LATEST INSIGHTS (BLOG) — dark band ── */}
        <section className="section-y relative left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-muted">
          {/* Soft, minimal glow for depth */}
          
          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6">
            <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="space-y-3 max-w-[30ch] md:max-w-[40ch]">
                <Eyebrow className="text-primary/80">Latest Insights</Eyebrow>
                <h2 className="text-foreground">Tips to Grow Your Business Online</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-lg font-medium text-foreground"
              >
                Read the blog <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {blogPosts.slice(0, 3).map((post, i) => (
                <motion.div key={post.slug} {...fadeUp(i * 0.1)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 border border-border/60"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out scale-101 group-hover:scale-105 will-change-transform"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/90 text-[10px] font-bold uppercase tracking-widest text-white">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-4 bg-card/95">
                      <div className="flex items-center gap-2 text-xs text-black/50 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <h3 className="text-lg font-bold text-black leading-tight group-hover:text-primary/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-black gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-y">
          <FaqAccordion items={faqs} />
        </section>
    </main>
  );
}