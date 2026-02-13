import { Service } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: Service;
    index: number;
}

<<<<<<< HEAD
export const ServiceCard = ({ service, index }: ServiceCardProps) => (
    <div
        className={cn(
            "bg-muted/50 border border-border/40 rounded-lg p-card-sm md:p-card-md hover:bg-white hover:border-primary/20 transition-all group flex flex-col items-center text-center gap-grid flex-grow min-w-0",
            index === 4 ? "w-full lg:flex-1" : "w-[calc(50%-12px)] lg:flex-1"
        )}
    >
        <div className="p-card-md bg-white rounded-lg border border-border/50 shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all group-hover:border-primary">
            <service.icon className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h3 className="font-semibold text-foreground text-sm tracking-tight whitespace-pre-line min-h-[40px] flex items-center justify-center">
=======
export const ServiceCard = ({
    service,
    index,
    layout = "flex"
}: ServiceCardProps & { layout?: "flex" | "grid" }) => (
    <div
        className={cn(
            "bg-muted/50 border border-border/40 rounded-[1rem] p-4 hover:bg-white hover:border-primary/20 transition-all group flex flex-col items-center text-center gap-grid",
            layout === "flex" ? (
                index === 4 ? "w-full lg:flex-1" : "w-[calc(50%-12px)] lg:flex-1"
            ) : "w-full"
        )}
    >
        <div className="w-full aspect-[4/3] bg-white rounded-[0.5rem] border border-border/50 shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all group-hover:border-primary flex items-center justify-center">
            <service.icon strokeWidth={1.5} className="w-10 h-10 md:w-10 md:h-10" />
        </div>
        <h3 className="font-medium text-foreground text-sm md:text-base tracking-tight leading-tight whitespace-pre-line">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
            {service.title}
        </h3>
    </div>
);
