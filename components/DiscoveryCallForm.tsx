"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = ["New Website", "Website Redesign", "E-commerce Store", "Landing Page", "Other"];
const SERVICES = ["WordPress & Elementor", "GHL Specialist", "Web Development", "Virtual Assistant", "Shopify & Printify", "Marketing Integrations"];
const BUDGETS = ["Under $1,000", "$1,000–$3,000", "$3,000–$5,000", "$5,000+"];

const inputClass =
    "w-full px-4 py-3 rounded-[8px] border border-border bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-foreground mb-2";
const selectStyle: React.CSSProperties = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23707070' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.9rem center",
    backgroundSize: "1.1rem",
};

export function DiscoveryCallForm() {
    const initialForm = {
        name: "",
        email: "",
        business: "",
        website: "",
        projectType: "",
        description: "",
        budget: "",
    };
    const [formData, setFormData] = useState(initialForm);
    const [services, setServices] = useState<string[]>([]);
    const [status, setStatus] = useState<Status>("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleService = (service: string) => {
        setServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/book-call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, services }),
            });
            if (res.ok) {
                setStatus("success");
                setFormData(initialForm);
                setServices([]);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-10 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">✅</div>
                <h2 className="text-xl font-bold">Request received!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Thanks for reaching out — I&apos;ll review your project and get back to you shortly to schedule your free discovery call.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className={labelClass}>Name*</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} required />
                </div>
                <div>
                    <label htmlFor="email" className={labelClass}>Email*</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} required />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="business" className={labelClass}>Business Name</label>
                    <input id="business" name="business" type="text" value={formData.business} onChange={handleChange} placeholder="Your business" className={inputClass} />
                </div>
                <div>
                    <label htmlFor="website" className={labelClass}>Website URL <span className="text-muted-foreground font-normal normal-case">(if any)</span></label>
                    <input id="website" name="website" type="text" inputMode="url" value={formData.website} onChange={handleChange} placeholder="https://…" className={inputClass} />
                </div>
            </div>

            <div>
                <label htmlFor="projectType" className={labelClass}>Project Type</label>
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className={cn(inputClass, "cursor-pointer appearance-none pr-10")} style={selectStyle}>
                    <option value="" disabled>Select project type</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            <div>
                <span className={labelClass}>Services You Need</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((service) => {
                        const checked = services.includes(service);
                        return (
                            <label
                                key={service}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-[8px] border px-3.5 py-2.5 text-sm cursor-pointer transition-colors",
                                    checked ? "border-primary bg-primary/5 text-foreground font-medium" : "border-border bg-background text-muted-foreground hover:border-primary/40"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    name="services"
                                    value={service}
                                    checked={checked}
                                    onChange={() => toggleService(service)}
                                    className="h-4 w-4 shrink-0 accent-primary"
                                />
                                {service}
                            </label>
                        );
                    })}
                </div>
            </div>

            <div>
                <label htmlFor="description" className={labelClass}>Briefly describe your project*</label>
                <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} placeholder="Goals, timeline, and what you're looking for" className={cn(inputClass, "resize-none")} required />
            </div>

            <div>
                <label htmlFor="budget" className={labelClass}>Budget Range</label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={cn(inputClass, "cursor-pointer appearance-none pr-10")} style={selectStyle}>
                    <option value="" disabled>Select budget range</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                    "w-full font-bold py-3.5 px-6 rounded-[8px] flex items-center justify-center gap-2 uppercase tracking-wide text-sm transition-colors cursor-pointer",
                    status === "loading" ? "bg-muted text-muted-foreground cursor-not-allowed" :
                        status === "error" ? "bg-red-600 text-white" :
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
            >
                {status === "loading" ? "Sending…" :
                    status === "error" ? "Error — Try Again" :
                        <>Request a Discovery Call <Send className="w-4 h-4" /></>}
            </button>

            {status === "error" && (
                <p className="text-center text-red-600 text-sm font-medium">Something went wrong. Please try again or email me directly at paulpuzon0007@gmail.com</p>
            )}
        </form>
    );
}
