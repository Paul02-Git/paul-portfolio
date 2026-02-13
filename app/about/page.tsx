"use client";

import React from "react";
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Marquee } from "@/components/Marquee";
import { Toolbox } from "@/components/Toolbox";
import { Footer } from "@/components/Footer";
import { stats, testimonials, marqueeItems } from "@/data/portfolio";


export default function AboutPage() {
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
                    <Card className="p-6 md:p-12 space-y-12 md:space-y-16">
                        {/* About Me Section Body */}
                        <section className="space-y-8">
                            <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4">
                                <div className="space-y-4 flex-1">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                        Hi, This Is <span className="text-primary">Paul</span> 👋
                                    </h1>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        A Passionate
                                        <span className="text-foreground font-semibold"> WordPress Specialist</span> having <span className="text-foreground font-semibold">4+ years</span> of
                                        Experiences over 24+ Country Worldwide. I specialize in building high-performing, accessible, and beautiful web experiences that convert.
                                    </p>
                                </div>
                                <div className="my-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Available For Hire
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-grid">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-6 text-center border border-border/60 rounded-lg bg-muted/20 hover:border-primary/20 transition-all group">
                                        <div className="text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest leading-tight">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>


                        {/* Brands Section */}
                        <Toolbox />

                        {/* Testimonials Section */}
                        <TestimonialCarousel testimonials={testimonials} />

                        {/* Marquee Section */}
                        <Marquee
                            items={marqueeItems}
                            speed={70}

                        />
                    </Card>

                    <Footer />
                </div>
            </div>
        </main>
    );
}

