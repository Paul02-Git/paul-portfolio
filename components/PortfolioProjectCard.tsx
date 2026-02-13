<<<<<<< HEAD
"use client";

=======
import { motion } from "framer-motion";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio";

interface PortfolioProjectCardProps {
    project: Project;
    onClick: (image: string) => void;
<<<<<<< HEAD
}

export const PortfolioProjectCard = ({ project, onClick }: PortfolioProjectCardProps) => (
    <div className="group space-y-5">
        {/* Image Card */}
        <button
            className="group cursor-pointer relative w-full aspect-[16/10] rounded-sm overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary border border-border/40"
=======
    priority?: boolean;
}

export const PortfolioProjectCard = ({ project, onClick, priority = false }: PortfolioProjectCardProps) => (
    <div className="group space-y-5">
        {/* Image Card */}
        <button
            className="group cursor-pointer relative w-full aspect-[16/10] rounded-[10px] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary border border-border/50 bg-muted shadow-sm hover:shadow-md transition-shadow duration-500"
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
            onClick={() => onClick(project.image)}
            aria-label={`View ${project.title} screenshot`}
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
<<<<<<< HEAD
                className="object-cover"
            />
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </button>

        {/* Content Section */}
        <div className="flex items-start justify-between gap-4 px-2">
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                    {project.title}
                </h3>
                <p className="text-muted-foreground font-medium">
=======
                quality={80}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-500" />
        </button>

        {/* Content Section */}
        <div className="flex items-start justify-between gap-4 px-1">
            <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                    {project.category}
                </p>
            </div>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
<<<<<<< HEAD
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mt-1 whitespace-nowrap group/link"
                >
                    Visit Site
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
=======
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mt-1 whitespace-nowrap group/link"
                >
                    Visit Site
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                </a>
            )}
        </div>
    </div>
);
