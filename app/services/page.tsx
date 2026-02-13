"use client";

import React from "react";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Marquee } from "@/components/Marquee";
import { Toolbox } from "@/components/Toolbox";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
<<<<<<< HEAD
import { brands, stats, testimonials, marqueeItems, faqs, fullServices } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
=======
import { ServiceCard } from "@/components/ServiceCard";
import { testimonials, marqueeItems, faqs, fullServices } from "@/data/portfolio";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f

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
<<<<<<< HEAD
                    <Card className="p-grid md:p-12 space-y-12 md:space-y-16">
                        {/* Services Section */}
                        <section className="space-y-8">
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold self-start uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Premium Service Offerings
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                    Services I <span className="text-primary">Offer</span>
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    I provide high-end <span className="text-foreground font-semibold">WordPress</span> & <span className="text-foreground font-semibold">Full Stack</span> solutions tailored for growth. From complex integrations to high-converting funnels, I handle the technical excellence so you can focus on your business.
                                </p>
=======
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
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                            </div>

                            {/* Refined Services Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
<<<<<<< HEAD
                                {fullServices.map((service: { icon: React.ElementType; title: string; }, i: number) => (
                                    <div
                                        key={i}
                                        className="bg-muted/50 border border-border/40 rounded-[1rem] p-4 flex flex-col items-center text-center gap-grid"
                                    >
                                        <div className="w-full aspect-[4/3] bg-white rounded-[0.5rem] text-primary border border-border/50 flex items-center justify-center">
                                            <service.icon strokeWidth={1.5} className="w-12 h-12 md:w-10 md:h-10" />
                                        </div>
                                        <h3 className="font-medium text-foreground text-sm md:text-base tracking-tight leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
=======
                                {fullServices.map((service, i) => (
                                    <ServiceCard
                                        key={i}
                                        service={service}
                                        index={i}
                                        layout="grid"
                                    />
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                                ))}
                            </div>
                        </section>

<<<<<<< HEAD
                        <section>
                            <img src="/images/Think Plan.jpg" alt="" className="w-full h-auto rounded-lg" />
=======
                        <section className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50">
                            <Image
                                src="/images/Think Plan.jpg"
                                alt="Think Plan Execution"
                                fill
                                quality={85}
                                sizes="(max-width: 1024px) 100vw, 800px"
                                className="object-cover"
                            />
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
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
