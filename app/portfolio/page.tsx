"use client";

import React, { useState } from "react";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
import { ProfileCard } from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { PortfolioProjectCard } from "@/components/PortfolioProjectCard";
import { projects, marqueeItems } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PortfolioPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
    const ITEMS_PER_PAGE = 5;
=======
    const ITEMS_PER_PAGE = 6;
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
    const projectsGridRef = React.useRef<HTMLDivElement>(null);

    // Calculate pagination
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, endIndex);
    const showPagination = projects.length > ITEMS_PER_PAGE;

    // Scroll to projects grid when page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Scroll with offset to account for fixed navbar
        setTimeout(() => {
            const element = projectsGridRef.current;
            if (element) {
                const yOffset = -130; // Navbar height + extra spacing
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 0);
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
<<<<<<< HEAD
                    <Card className="p-grid md:p-12 space-y-12 md:space-y-16">
=======
                    <Card className="p-6 md:p-12 space-y-12 md:space-y-16">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                        {/* Portfolio Section */}
                        <section className="space-y-12">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
<<<<<<< HEAD
                                    Check Out My Latest <span className="text-primary">Projects</span>
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    A collection of projects where I've blended <span className="text-foreground font-semibold">Technical Excellence</span> with <span className="text-foreground font-semibold">User-Centric Design</span>. Each piece represents a unique challenge solved with precision and passion.
                                </p>
                            </div>

                            {/* Projects Grid */}
                            <div ref={projectsGridRef} className="grid grid-cols-1 gap-12 md:grid-cols-1 pb-8">
=======
                                    My Latest <span className="text-primary">Projects</span>
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-[50ch]">
                                    A collection of projects where I&apos;ve blended <span className="text-foreground font-semibold">Technical Excellence</span> with <span className="text-foreground font-semibold">User-Centric Design</span>. Each piece represents a unique challenge solved with precision and passion.
                                </p>
                            </div>

                            <div ref={projectsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 pb-8">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                                {currentProjects.map((project, i) => (
                                    <PortfolioProjectCard
                                        key={i}
                                        project={project}
                                        onClick={(img: string) => setSelectedImage(img)}
<<<<<<< HEAD
=======
                                        priority={i < 4}
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                                    />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {showPagination && (
                                <div className="flex items-center justify-center gap-2 pt-8">
                                    <button
                                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-sm border border-border/40 bg-muted/30 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors font-medium text-sm"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 rounded-sm border transition-colors font-medium text-sm cursor-pointer ${currentPage === page
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'border-border/40 bg-muted/30 hover:bg-muted/50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-sm border border-border/40 bg-muted/30 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors font-medium text-sm"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* Marquee Section */}
                        <Marquee
                            items={marqueeItems}
                            speed={70}
                        />
                    </Card>

                    <Footer />
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
<<<<<<< HEAD
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>
=======
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
<<<<<<< HEAD
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Project Screenshot"
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
=======
                            className="relative max-w-7xl w-full h-[85vh] flex items-center justify-center p-2"
                        >
                            <Image
                                src={selectedImage}
                                alt="Project Screenshot"
                                fill
                                quality={90}
                                sizes="90vw"
                                className="object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
                                priority
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
