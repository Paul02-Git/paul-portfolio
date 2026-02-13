"use client";

import React, { useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { faqs } from "@/data/portfolio";
import { Send } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        budget: "$20000+",
        comment: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    budget: "$20000+",
                    comment: ""
                });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="space-y-6 pb-12 pt-28 md:pt-24">
            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid items-start">
                {/* Left Column - Sticky Profile Card */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                    <ProfileCard />
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8">
                    {/* Consolidated Content Card */}
                    <Card className="p-grid md:p-12 space-y-12 md:space-y-16">
                        {/* Contact Section */}
                        <section className="space-y-12">
                            <div className="flex flex-col gap-4 mb-8">
                                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                    Let&apos;s 👋 <span className="text-primary">Work</span> Together
                                </h1>
                                I&apos;m here to help if you&apos;re searching for a product designer to bring your idea to life or a design partner to help take your business to the next level.
                            </div>

                            {/* Contact Form */}
                            <form onSubmit={handleSubmit} className="space-y-grid p-grid md:p-12 bg-muted rounded-lg">
                                {/* 2-Column Grid for Name and Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-grid">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="border border-border/40 w-full px-4 py-3 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="border border-border/40 w-full px-4 py-3 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* 2-Column Grid for Subject and Budget */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-grid">
                                    {/* Subject Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="block text-sm font-semibold text-foreground">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                            className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Budget Dropdown */}
                                    <div className="space-y-2">
                                        <label htmlFor="budget" className="block text-sm font-semibold text-foreground">
                                            Budget
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer appearance-none"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 1rem center',
                                                backgroundSize: '1.25rem'
                                            }}
                                        >
                                            <option value="$500-$1000">$500-$1000</option>
                                            <option value="$1000-$2000">$1000-$2000</option>
                                            <option value="$2000+">$2000+</option>
                                            <option value="not-sure-yet">Not sure yet</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Comment/Message Field */}
                                <div className="space-y-2">
                                    <label htmlFor="comment" className="block text-sm font-semibold text-foreground">
                                        Comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        placeholder="Type details about your inquiry"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-border/40 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={cn(
                                        "w-full font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 group cursor-pointer",
                                        status === "loading" ? "bg-muted text-muted-foreground cursor-not-allowed" :
                                            status === "success" ? "bg-green-600 text-white" :
                                                status === "error" ? "bg-red-600 text-white" :
                                                    "bg-primary text-primary-foreground hover:bg-primary/90"
                                    )}
                                >
                                    {status === "loading" ? (
                                        "Sending..."
                                    ) : status === "success" ? (
                                        "Message Sent! ✨"
                                    ) : status === "error" ? (
                                        "Error! Try Again"
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                {status === "success" && (
                                    <p className="text-center text-green-600 font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                                        Thanks for reaching out! I&apos;ll get back to you soon.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-center text-red-600 font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                                        Something went wrong. Please try emailing me directly.
                                    </p>
                                )}
                            </form>
                        </section>

                        {/* Google Map Section */}
                        <section className="space-y-grid">
                            <div className="overflow-hidden rounded-xl h-[400px] border border-border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15442.279603348185!2d120.97059437153664!3d14.62319985923985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec387%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1711234567890!5m2!1sen!2sph"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map - Manila, Philippines"
                                />
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <FAQ items={faqs} />

                    </Card>

                    <Footer />
                </div>
            </div>
        </main >
    );
}
