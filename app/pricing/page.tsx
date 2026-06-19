"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  ArrowUpRight,
  ArrowRight,
  Star,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/lib/utils";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const CALENDLY = "/book-a-call";

/* ───────────────────────────────────────────────
   PRICING DATA — edit the numbers/copy here.
   Prices are USD "starting at" figures (one-time builds).
─────────────────────────────────────────────── */
const plans = [
  {
    name: "Launch",
    price: "$750",
    blurb: "A focused 1–3 page site to get you online and converting — fast.",
    featuresLabel: "What's included",
    features: [
      "Up to 3 custom pages",
      "Custom Elementor design (no templates)",
      "Mobile-responsive, loads under 3s",
      "Lead / contact form",
      "On-page SEO basics",
      "30 days post-launch support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,800",
    blurb: "A complete website built to turn visitors into real leads.",
    featuresLabel: "Everything in Launch, plus…",
    features: [
      "Up to 7 custom pages",
      "Lead-capture forms wired to your CRM",
      "Conversion-focused layout & copy guidance",
      "Speed & Core Web Vitals optimisation",
      "Blog / resources setup",
      "30 days support + a training walkthrough",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$3,500",
    blurb: "A complete website and lead system, built end to end.",
    featuresLabel: "Everything in Growth, plus…",
    features: [
"Large multi-page WordPress website",
"Full GoHighLevel CRM & automation",
"Email & SMS follow-up sequences",
"Custom functionality & integrations",
"Lead capture & conversion optimization",
"Priority support",
],
    popular: false,
  },
];

// WordPress-focused tool stack shown in the logo strip
const tools = [
  { name: "WordPress", logo: "/images/WPLOGO.svg" },
  { name: "Elementor", logo: "/images/Elementor-Logo-Symbol-Red.svg" },
  { name: "GoHighLevel", logo: "/images/GHL Logo.svg" },
  { name: "Google Analytics", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
  { name: "Tag Manager", logo: "/images/GTM.svg" },
  { name: "Microsoft Clarity", logo: "/images/MS CLARITY.svg" },
  { name: "Cloudways", logo: "/images/Cloudways_Logo.svg" },
  { name: "Figma", logo: "/images/Figma-logo.svg" },
];

const pricingFaqs = [
  {
    question: "How long does a project take?",
    answer:
      "Most Launch sites go live in 1–2 weeks, Growth sites in 2–4 weeks, and Scale projects in 4–6 weeks — depending on how ready your content is. You'll get a clear timeline in your proposal before we start.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your logo, brand colours (if you have them), and any copy or images you'd like to use. No assets yet? No problem — I'll guide the content and recommend stock or AI-assisted options.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Each package includes two rounds of revisions per page so we get it right. Extra rounds are available as a small add-on if you need them.",
  },
  {
    question: "What if I need something that isn't listed?",
    answer:
      "Almost anything is possible. Add-ons cover the common extras, and anything custom gets scoped and priced upfront on our call — never a surprise invoice.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. Projects are typically split 50% to start and 50% on launch. For larger Scale builds we can arrange milestone payments.",
  },
  {
    question: "Do I own my website?",
    answer:
      "100%. Once the final payment clears, the site, domain, and all accounts are fully yours — no lock-in, no hostage hosting.",
  },
];

export default function PricingPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Navbar />

      {/* ── HERO ── */}
      <section className="section-yb">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="max-w-[18ch]">
              Simple pricing for your {" "}
              <span className="text-primary">business website</span>
            </h1>
            <p className="text-muted-foreground max-w-[52ch] leading-relaxed">
              Fixed scope. Fixed price. No retainers to get started and no surprise invoices — just a clear plan that turns visitors into leads.
            </p>
          </div>

          {/* Mini social proof */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 shrink-0">
            <div className="flex -spwwace-x-2.5">
              {[
                "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/29852852/pexels-photo-29852852.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/30198184/pexels-photo-30198184.jpeg?auto=compress&cs=tinysrgb&w=1600",
              ].map((src, i) => (
                <span key={i} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-background bg-muted">
                  <Image src={src} alt="Happy client" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                ))}
                <span className="ml-1.5 text-sm font-bold text-foreground">5.0</span>
              </div>
              <p className="text-xs text-muted-foreground leading-tight">Rated by 20+ happy clients</p>
            </div>
          </motion.div>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUp(i * 0.08)}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 sm:p-7",
                plan.popular
                  ? "border-primary/40 ring-1 ring-primary/30 shadow-xl"
                  : "border-border/60 shadow-sm"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-foreground">{plan.name} plan</h3>
                {plan.popular && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
                <span className="mb-1 text-xs leading-tight text-muted-foreground">
                  starting<br />one-time
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                {plan.blurb}
              </p>

              {/* CTA */}
              <Button
                href={CALENDLY}
                icon={<ArrowUpRight className="w-5 h-5" />}
                className={cn(
                  "mt-5 w-full",
                  !plan.popular && "bg-foreground text-white hover:bg-foreground/90 shadow-md shadow-black/5"
                )}
              >
                Book a Call
              </Button>

              {/* Features */}
              <div className="mt-6 border-t border-border/60 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">Features</p>
                <p className="mt-1 mb-4 text-xs text-muted-foreground">{plan.featuresLabel}</p>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-foreground/90 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ── TRUSTED TOOLS ── */}
      <section className="section-yb">
        <TechStackMarquee items={tools} />
      </section>

      {/* ── FAQ ── */}
      <section className="section-y max-w-screen mx-auto bg-foreground/3 rounded-3xl px-6 py-12 sm:px-12 sm:py-16 ">
        <FaqAccordion
          items={pricingFaqs}
          eyebrow="Pricing FAQ"
          heading="Everything you might be wondering"
          description="Clear answers before we start — timelines, revisions, payments, and ownership."
        />
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-y">
        <motion.div
          {...fadeUp()}
          className="rounded-3xl text-center flex flex-col items-center gap-5"
        >
          <Eyebrow>No risk, no pressure</Eyebrow>
          <h2 className="text-foreground  max-w-[24ch]">
            Not sure which plan fits? Let&apos;s figure it out — free.
          </h2>
          <p className="text-foreground/75 leading-relaxed max-w-[55ch]">
            Book a free 30-minute call. I&apos;ll review your goals and recommend the right scope and price — whether you hire me or not.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <Button
              href={CALENDLY}
              icon={<ArrowUpRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Book A Call
            </Button>
            <Button
              href="/contact"
              variant="outline"
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Ask a Question
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
