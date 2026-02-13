"use client";

import React from "react";
import Image from "next/image";
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Marquee } from "@/components/Marquee";
import { Toolbox } from "@/components/Toolbox";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { testimonials, marqueeItems, faqs, fullServices } from "@/data/portfolio";

export default function ServicesPage() {
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
                        {/* Services Section */}
                        <section className="space-y-8">
                            <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4">
                                <div className="space-y-4 flex-1">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                        Services I <span className="text-primary">Offer</span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        I provide high-end <span className="text-foreground font-semibold">WordPress</span> & <span className="text-foreground font-semibold">Full Stack</span> solutions tailored for growth. From complex integrations to high-converting funnels, I handle the technical excellence so you can focus on your business.
                                    </p>
                                </div>
                                <div className="my-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Available For Hire
                                </div>
                            </div>

                            {/* Refined Services Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
                                {fullServices.map((service, i) => (
                                    <ServiceCard
                                        key={i}
                                        service={service}
                                        index={i}
                                        layout="grid"
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50">
                            <Image
                                src="/images/Think Plan.jpg"
                                alt="Think Plan Execution"
                                fill
                                quality={85}
                                sizes="(max-width: 1024px) 100vw, 800px"
                                className="object-cover"
                            />
                        </section>
                        {/* Brands Section - Kept for social proof */}
                        <Toolbox />

                        {/* Testimonials Section */}
                        <TestimonialCarousel testimonials={testimonials} />

                        {/* FAQ Section */}
                        <FAQ items={faqs} />

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
