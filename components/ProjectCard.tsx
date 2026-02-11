"use client";

import Image from "next/image";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
    project: Project;
    onClick: (image: string) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
    <button
        className="flex-grow group cursor-pointer relative w-full aspect-16/9 rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onClick={() => onClick(project.image)}
        aria-label={`View ${project.title} details`}
    >
        <div className="relative h-full w-full border border-border">
            <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-foreground border border-white">
                {project.category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-8 text-left">
                <h3 className="font-bold text-white text-md">{project.title}</h3>
            </div>
        </div>
    </button>
);
