"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio";

interface PortfolioProjectCardProps {
    project: Project;
    onClick: (image: string) => void;
}

export const PortfolioProjectCard = ({ project, onClick }: PortfolioProjectCardProps) => (
    <div className="group space-y-5">
        {/* Image Card */}
        <button
            className="group cursor-pointer relative w-full aspect-[16/10] rounded-sm overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary border border-border/40"
            onClick={() => onClick(project.image)}
            aria-label={`View ${project.title} screenshot`}
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
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
                    {project.category}
                </p>
            </div>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mt-1 whitespace-nowrap group/link"
                >
                    Visit Site
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
            )}
        </div>
    </div>
);
