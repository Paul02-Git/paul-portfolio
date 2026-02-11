import { Service } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: Service;
    index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => (
    <div
        className={cn(
            "bg-muted/30 border border-border/40 rounded-lg p-5 md:p-8 hover:bg-white hover:border-primary/20 transition-all group flex flex-col items-center text-center gap-grid flex-grow min-w-0",
            index === 4 ? "w-full lg:flex-1" : "w-[calc(50%-6px)] lg:flex-1"
        )}
    >
        <div className="p-4 md:p-6 bg-white rounded-lg border border-border/50 shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all group-hover:border-primary">
            <service.icon className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h3 className="font-bold text-foreground text-[13px] md:text-sm tracking-tight whitespace-pre-line min-h-[40px] flex items-center justify-center">
            {service.title}
        </h3>
    </div>
);
