import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    items: string[];
    speed?: number; // duration in seconds
    className?: string;
    itemClassName?: string;
    pauseOnHover?: boolean;
}

export const Marquee = ({
    items,
    speed = 50, // default slower for better UX
    className,
    itemClassName,
    pauseOnHover = true,
}: MarqueeProps) => {
    const prefersReducedMotion = useReducedMotion();
    // CENTRAL STYLE CONFIGURATION
    // Change these values to update all Marquee instances simultaneously
    const defaultItemStyles = "text-2xl md:text-4xl font-bold tracking-widest h-18 bg-muted";
    const defaultColor = "text-foreground/60"; // Global default color

    // For infinite loop, we need two sets of items moving together
    const doubledItems = [...items, ...items];

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden flex items-center",
                "[mask-image:linear-gradient(to_right,transparent,black_15%,black_90%,transparent)]",
                className
            )}
        >
            <style jsx>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: ${prefersReducedMotion ? "none" : `marquee ${speed}s linear infinite`};
                }
                .pause-on-hover:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div
                className={cn(
                    "flex whitespace-nowrap min-w-full shrink-0 items-center animate-marquee",
                    pauseOnHover && "pause-on-hover"
                )}
            >
                {doubledItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            defaultItemStyles,
                            defaultColor,
                            "flex items-center",
                            itemClassName
                        )}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};
