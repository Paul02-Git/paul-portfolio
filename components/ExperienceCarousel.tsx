import Image from "next/image";
import { Experience } from "@/types/portfolio";

interface ExperienceCarouselProps {
    experiences: Experience[];
}

const ExperienceItem = ({ exp }: { exp: Experience }) => (
    <div className="grid grid-cols-[120px_4fr] items-center group mb-grid px-2 w-full">
        <div className="text-[12px] font-bold text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap">
            {exp.year}
        </div>
        <div className="flex gap-4 items-center">
            <div className="w-11 h-11 rounded-sm bg-muted/50 border border-border/50 flex-shrink-0 flex items-center justify-center p-2 group-hover:bg-white transition-all shadow-sm relative">
                <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    className="p-2 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
            </div>
            <div className="flex flex-col items-start min-w-0">
                <h3 className="font-bold text-foreground text-sm leading-tight mb-0.5">{exp.company}</h3>
                <p className="text-[14px] text-muted-foreground leading-normal">{exp.role}</p>
            </div>
        </div>
    </div>
);

export const ExperienceCarousel = ({ experiences }: ExperienceCarouselProps) => {
    // Triplicated for density as per original logic
    const tripleExperiences = [...experiences, ...experiences, ...experiences];

    return (
        <div className="relative flex-1 overflow-hidden">
            <div className="carousel-scroll">
                <div className="space-y-2">
                    {tripleExperiences.map((exp, i) => (
                        <ExperienceItem key={`set1-${i}`} exp={exp} />
                    ))}
                </div>
                <div className="space-y-2">
                    {tripleExperiences.map((exp, i) => (
                        <ExperienceItem key={`set2-${i}`} exp={exp} />
                    ))}
                </div>
            </div>
        </div>
    );
};
