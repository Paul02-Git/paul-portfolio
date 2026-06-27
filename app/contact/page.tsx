"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { faqs } from "@/data/portfolio";
import { Send, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { Whatsapp } from "@/components/icons/Whatsapp";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { cn, isValidEmail } from "@/lib/utils";
import { trackEvent } from "@/lib/gtm";
import Script from "next/script";

// FAQ Schema for SEO
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer.replace(/<[^>]*>/g, ""),
        },
    })),
};

// Decorative SVG used as a subtle background accent on the CTA section.
const SECTION_VECTOR =
    "https://cdn.prod.website-files.com/65b8e12a56259feed61841a0/65b8e12a56259feed61841c6_review-vecotr.svg";

const socials = [
    { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/paul.puzon73/" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paul-puzon-932b86303/" },
    { Icon: Whatsapp, label: "WhatsApp", href: "https://wa.me/639914075808" },
];

export default function ContactPage() {
    const initialForm = {
        name: "",
        email: "",
        subject: "",
        budget: "$1,000 – $3,000",
        comment: "",
    };
    const [formData, setFormData] = useState(initialForm);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("Please enter a valid email address.");
    const hpRef = React.useRef<HTMLInputElement>(null);
    const startedAt = React.useRef<number>(Date.now());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(formData.email)) {
            setEmailError(true);
            setEmailErrorMsg("Please enter a valid email address.");
            return;
        }
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    company: hpRef.current?.value ?? "",
                    elapsedMs: Date.now() - startedAt.current,
                }),
            });
            if (response.ok) {
                setStatus("success");
                trackEvent("generate_lead", { form_name: "contact" });
                setFormData(initialForm);
                setTimeout(() => setStatus("idle"), 5000);
            } else if (response.status === 400) {
                const data = (await response.json().catch(() => ({}))) as { error?: string };
                setEmailError(true);
                setEmailErrorMsg(data?.error || "Please enter a valid email address.");
                setStatus("idle");
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name === "email") setEmailError(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputClass =
        "w-full px-4 py-3 rounded-sm border border-border bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";
    const labelClass = "block text-xs font-bold uppercase tracking-wider text-foreground mb-2";
    const cardHeader = "px-6 md:px-8 py-5 border-b border-border/60 bg-muted/30";

    return (
        <>
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <main className="pb-20 page-top">
                <Navbar />

                {/* Header, masthead */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-[6rem] uppercase">
                        <span className="text-foreground">Contact </span>
                        <span className="text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]">Us</span>
                    </h1>
                    <p className="mt-6 text-muted-foreground max-w-[52ch] mx-auto leading-relaxed">
                        If you have any questions, please feel free to get in touch with me via phone, text, email, the form below, or even on social media.
                    </p>
                </div>

                {/* Form + Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

                    {/* Left, Form */}
                    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                        <div className={cardHeader}>
                            <h2 className="text-lg">Get In Touch</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                            {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
                            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                                <label>Company (leave this empty)
                                    <input ref={hpRef} type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className={labelClass}>Name</label>
                                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name*" className={inputClass} required />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClass}>Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email*"
                                        aria-invalid={emailError}
                                        className={cn(inputClass, emailError && "border-red-500 focus:border-red-500 focus:ring-red-500/15")}
                                        required
                                    />
                                    {emailError && (
                                        <p className="mt-2 text-sm font-medium text-red-600">{emailErrorMsg}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="subject" className={labelClass}>Subject</label>
                                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="What's this about?*" className={inputClass} required />
                                </div>
                                <div>
                                    <label htmlFor="budget" className={labelClass}>Budget</label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className={cn(inputClass, "cursor-pointer appearance-none pr-10")}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23707070' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 0.9rem center",
                                            backgroundSize: "1.1rem",
                                        }}
                                    >
                                        <option>Less than $1,000</option>
                                        <option>$1,000 – $3,000</option>
                                        <option>$3,000 – $5,000</option>
                                        <option>$5,000+</option>
                                        <option>Not sure yet</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="comment" className={labelClass}>Your Message</label>
                                <textarea id="comment" name="comment" rows={6} value={formData.comment} onChange={handleChange} placeholder="Type details about your inquiry" className={cn(inputClass, "resize-none")} required />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={cn(
                                    "w-full font-bold py-3.5 px-6 rounded-sm flex items-center justify-center gap-2 uppercase tracking-wide text-sm transition-colors cursor-pointer",
                                    status === "loading" ? "bg-muted text-muted-foreground cursor-not-allowed" :
                                        status === "success" ? "bg-green-600 text-white" :
                                            status === "error" ? "bg-red-600 text-white" :
                                                "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                            >
                                {status === "loading" ? "Sending..." :
                                    status === "success" ? "Message Sent! ✨" :
                                        status === "error" ? "Error! Try Again" :
                                            <>Send Message <Send className="w-4 h-4" /></>}
                            </button>

                            {status === "success" && (
                                <p className="text-center text-green-600 text-sm font-medium">Thanks for reaching out! I&apos;ll get back to you soon.</p>
                            )}
                            {status === "error" && (
                                <p className="text-center text-red-600 text-sm font-medium">Something went wrong. Please email me directly.</p>
                            )}
                        </form>
                    </div>

                    {/* Right, Map + Social */}
                    <div className="flex flex-col gap-5">
                        {/* Location map */}
                        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card min-h-[320px]">
                            <div className={cardHeader}>
                                <h2 className="text-lg">Location</h2>
                            </div>
                            <div className="flex-1">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15442.279603348185!2d120.97059437153664!3d14.62319985923985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec387%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1711234567890!5m2!1sen!2sph"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map, Manila, Philippines"
                                    className="block h-full w-full"
                                />
                            </div>
                        </div>

                        {/* Social media */}
                        <div className="rounded-2xl border border-border/60 bg-card px-6 md:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-lg">Follow Me</h2>
                            <div className="flex flex-wrap gap-3">
                                {socials.map(({ Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-11 h-11 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-20">
                    <FaqAccordion items={faqs} />
                </div>

                {/* CTA */}
                <section className="relative mt-20 overflow-hidden rounded-2xl bg-[#0047AB] px-6 py-16 text-center md:px-12 md:py-24">
                    {/* Subtle dot-grid texture */}
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(30,58,138,0.10) 1px, transparent 1.5px)",
                            backgroundSize: "18px 18px",
                        }}
                    />

                    {/* Decorative section vectors, mirrored on both ends */}
                    <span
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-0 h-[164px] w-[160px] bg-contain bg-no-repeat sm:h-[205px] sm:w-[200px] md:h-[243px] md:w-[237px]"
                        style={{ backgroundImage: `url(${SECTION_VECTOR})` }}
                    />
                    <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 left-0 h-[164px] w-[160px] rotate-180 bg-contain bg-no-repeat sm:h-[205px] sm:w-[200px] md:h-[243px] md:w-[237px]"
                        style={{ backgroundImage: `url(${SECTION_VECTOR})` }}
                    />

                    <div className="relative z-10">
                        <h2 className="text-3xl uppercase text-muted sm:text-4xl lg:text-5xl">
                            Let&apos;s build something great
                        </h2>
                        <p className="mx-auto mt-5 max-w-[46ch] leading-relaxed text-muted/90">
                            Have a project in mind? Book a free consultation and we&apos;ll map out how to bring it to life.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Button href="/book-a-call" className="bg-muted text-foreground" icon={<ArrowUpRight className="h-5 w-5" />}>
                                Book a Free Call
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
