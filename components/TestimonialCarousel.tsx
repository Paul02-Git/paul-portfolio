"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./Button";
=======
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { Button } from "./Button";
import Image from "next/image";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f

interface Testimonial {
    rating: number;
    quote: string;
    name: string;
    role: string;
<<<<<<< HEAD
    source: string;
=======
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

<<<<<<< HEAD
const TestimonialCard = ({ rating, quote, name, role, source }: Testimonial) => {
    return (
        <div className="p-card-md rounded-lg bg-muted/30 border border-border/20 space-y-6 h-full flex flex-col justify-between">
=======
const TestimonialCard = ({ rating, quote, name, role }: Testimonial) => {
    return (
        <div className="p-card-md rounded-lg bg-muted/30 border border-border/50 space-y-4 h-full flex flex-col justify-between">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
            <div className="space-y-4">
                {/* Header with stars and source */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`}
                            />
                        ))}
                    </div>
<<<<<<< HEAD
                    <div className="px-3 py-1.5 rounded-lg bg-white border border-border/40 shadow-sm shrink-0">
                        <a
                            href={`https://${source}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1.5 uppercase tracking-wider"
                        >
                            {source}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
=======

                    <div className="px-2 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1.5">
                        <div className="bg-primary rounded-full p-0.5">
                            <Check className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Satisfied Client</span>
                    </div>


>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                </div>

                {/* Quote */}
                <p className="text-base text-foreground/90 leading-relaxed font-medium line-clamp-4">
<<<<<<< HEAD
                    "{quote}"
=======
                    &quot;{quote}&quot;
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="text-sm font-bold text-foreground">{name}</p>
                    <p className="text-xs font-semibold text-muted-foreground/80">{role}</p>
                </div>
            </div>
        </div>
    );
};

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItems(2);
            } else {
                setVisibleItems(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - visibleItems);

    const next = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2>
<<<<<<< HEAD
                    <div className="flex items-center gap-2">Trusted By Clients <img src="/images/undraw_online-review_08y6.svg" alt="Client Approved" className="w-14 h-14 object-contain" /></div></h2>
=======
                    <div className="flex items-center gap-2">What Clients Say <Image src="/images/undraw_online-review_08y6.svg" alt="Client Approved" width={56} height={56} className="w-14 h-14 object-contain" /></div></h2>
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                    </Button>
                </div>
            </div>

<<<<<<< HEAD
            <div className="relative overflow-hidden px-1 py-4">
=======
            <div className="relative overflow-hidden py-2">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                <motion.div
                    className="flex"
                    initial={false}
                    animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                >
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className="w-full lg:w-1/2 flex-shrink-0 px-2"
                        >
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: testimonials.length - (visibleItems - 1) }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 transition-all duration-300 rounded-full ${i === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
