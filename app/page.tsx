"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Calendar,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom UI Components
import Navbar from "@/components/Navbar";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { ExperienceCarousel } from "@/components/ExperienceCarousel";
import { ExpertArea } from "@/components/ExpertArea";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { ProfileCard } from "@/components/ProfileCard";
import { Marquee } from "@/components/Marquee";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TechStack } from "@/components/TechStack";
import { Footer } from "@/components/Footer";
import { HomeCtaGrid } from "@/components/HomeCtaGrid";
// Data
import { experiences, tools, projects, services, marqueeItems, testimonials, brands } from "@/data/portfolio";
import { Button } from "@/components/Button";



export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="space-y-6 pb-12 pt-28 md:pt-24">
      {/* Navbar with Hamburger Menu */}
      <Navbar />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid auto-rows-[minmax(180px,auto)]">

        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 transition-all duration-300">
          <ProfileCard className="h-full" />
        </div>

        {/* Middle Column: Experience & Expert Area */}
        <div className="lg:col-span-4 flex flex-col gap-grid h-full">
          <Card className="h-[250px] flex-grow flex-col">
            <SectionTitle>Work Experience</SectionTitle>
            <ExperienceCarousel experiences={experiences} />
          </Card>

          <Card className="shrink-0">
            <SectionTitle>My Expert Area</SectionTitle>
            <ExpertArea tools={tools} />
          </Card>
        </div>

        {/* Right Column: Recent Projects */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <Card className="h-full flex flex-col flex-1">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="flex-1 flex flex-col gap-4">
              {projects.slice(0, 2).map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  onClick={(img) => setSelectedImage(img)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* New Grid Section: 2 Boxes (60/40 split) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-grid">
        <Card className="lg:col-span-6">
          <TestimonialCarousel testimonials={testimonials} />
        </Card>
        <TechStack brands={brands} className="lg:col-span-4" />
      </div>
      <HomeCtaGrid />
      {/* Services Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid ">
        <div className="lg:col-span-8">
          <Card>
            <SectionTitle link="/services" linkText="See All Services">Services I Offer</SectionTitle>
            <div className="flex flex-wrap gap-grid">
              {services.slice(0, 4).map((service, i) => (
                <ServiceCard key={i} service={service} index={i} />
              ))}
            </div>
          </Card>
        </div>

        {/* Marquee Section */}
        <div className="lg:col-span-4">
          <Card className="space-y-4 relative h-full flex flex-col justify-between items-start text-left overflow-hidden rounded-lg border border-border/60 backdrop-blur-md shadow-md shadow-black/10">
            <Marquee
              items={marqueeItems}
            />

            <div className="space-y-2 w-full">
              <h2 className="text-4xl font-bold text-foreground tracking-tight leading-[1.1]">
                Let&apos;s <span className="inline-block animate-bounce-subtle">👋</span><br />
                Work Together
              </h2>

              <div className="pt-2">
                <Button
                  className="w-full"
                  icon={<Calendar className="w-5 h-5" />}
                  iconPosition="left"
                  href="https://calendly.com/paulpuzon0007/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book A Free Call
                </Button>

              </div>
            </div>
          </Card>
        </div>
      </div>




      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 m-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage}
                  alt="Project Preview"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
