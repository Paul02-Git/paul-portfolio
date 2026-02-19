"use client";

import React from "react";
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Check, Clock, DollarSign, Zap, MessageSquare, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { stats } from "@/data/portfolio";
import { Button } from "@/components/Button";
import { ReadyToStart } from "@/components/ReadyToStart";
import { HowItWorks } from "@/components/HowItWorks";

export default function HirePage() {
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
                    <Card className="p-6 md:p-12 space-y-12">
                        {/* Hero Section */}
                        <section className="space-y-6">


                            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-[20ch]">
                                Hire a <span className="text-primary">WordPress Developer</span> Who Delivers Results
                            </h2>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Looking for a reliable WordPress developer? I specialize in building high-performance,
                                conversion-focused websites using WordPress, Elementor, and GoHighLevel. With 4+ years
                                of experience and 50+ projects delivered worldwide, I help businesses grow through
                                technical excellence and strategic implementation.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="https://calendly.com/paulpuzon0007/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-[8px] hover:bg-primary/90 transition-colors"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book Free Consultation
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-[8px] hover:bg-primary/10 transition-colors"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Send Message
                                </Link>
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="grid grid-cols-3 gap-4 p-6 bg-muted rounded-lg">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </section>

                        {/* Why Hire Me */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-bold text-foreground">Why Hire Me?</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">Fast Turnaround</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Most projects completed in 2-4 weeks. I respect deadlines and deliver on time.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">Transparent Pricing</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Clear, fixed-price quotes or hourly estimates. No hidden costs or surprises.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">Quality Guaranteed</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Clean code, responsive design, and thorough testing. 30 days post-launch support included.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">Ongoing Support</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Available for maintenance, updates, and new features after project completion.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Services Offered */}
                        <section className="space-y-8">
                            <div className="flex flex-row justify-between gap-4 items-center"><h2 className="text-3xl font-bold text-foreground">Services I Offer</h2>
                                <Button
                                    size="sm"
                                    icon={<ArrowUpRight className="w-4 h-4 transition-transform" />}
                                    href="/services"
                                >
                                    View All
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg text-foreground mb-2">Marketing Integrations</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Connect and automate your marketing stack with GA4, Google Tag Manager, GoHighLevel forms.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Google Analytics 4 (GA4) setup and tracking</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Google Tag Manager (GTM) implementation</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>GoHighLevel (GHL) form integration and automation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg text-foreground mb-2">WordPress & Elementor Development</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Custom WordPress websites, Elementor page designs, theme customization, and plugin integration.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Responsive, mobile-first designs</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Custom Elementor widgets and templates</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>SEO optimization and speed optimization</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg text-foreground mb-2">GoHighLevel Setup & Automation</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Complete GHL CRM setup, workflow automation, and marketing funnel creation.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>CRM pipeline configuration</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Email and SMS automation workflows</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>WordPress + GHL integration</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg text-foreground mb-2">Website Speed Optimization</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Make your WordPress site load faster with proven optimization techniques.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Image optimization and lazy loading</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Caching and CDN setup</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Database optimization and cleanup</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                        </section>

                        {/* How It Works */}
                        <HowItWorks />

                        {/* Final CTA */}
                        <ReadyToStart />
                    </Card>

                    <Footer />
                </div>
            </div>
        </main>
    );
}
