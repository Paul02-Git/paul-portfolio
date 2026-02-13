import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/portfolio";

interface PortfolioProjectCardProps {
    project: Project;
    onClick: (image: string) => void;
    priority?: boolean;
}

export const PortfolioProjectCard = ({ project, onClick, priority = false }: PortfolioProjectCardProps) => (
    <div className="group space-y-5">
        {/* Image Card */}
        <button
            className="group cursor-pointer relative w-full aspect-[16/10] rounded-[10px] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary border border-border/50 bg-muted shadow-sm hover:shadow-md transition-shadow duration-500"
            onClick={() => onClick(project.image)}
            aria-label={`View ${project.title} screenshot`}
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
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
                    {project.category}
                </p>
            </div>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mt-1 whitespace-nowrap group/link"
                >
                    Visit Site
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
            )}
        </div>
    </div>
);
