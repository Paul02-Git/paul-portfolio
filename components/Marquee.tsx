import { motion, useReducedMotion } from "framer-motion";
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
    speed = 20, // default slower for better UX
    className,
    itemClassName,
    pauseOnHover = true,
}: MarqueeProps) => {
    const prefersReducedMotion = useReducedMotion();
    // CENTRAL STYLE CONFIGURATION
    // Change these values to update all Marquee instances simultaneously
<<<<<<< HEAD
    const defaultItemStyles = "text-lg md:text-2xl font-bold tracking-widest pt-8 py-8 bg-muted/70";
=======
    const defaultItemStyles = "text-lg md:text-md font-bold tracking-widest pt-8 py-8 bg-muted/70";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
    const defaultColor = "text-foreground/60"; // Global default color

    // For infinite loop, we need two sets of items moving together
    const doubledItems = [...items, ...items];

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden flex items-center bg-muted/20",
                "[mask-image:linear-gradient(to_right,transparent,black_15%,black_90%,transparent)]",
                className
            )}
        >
            <motion.div
                className={cn(
                    "flex whitespace-nowrap min-w-full shrink-0 items-center",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                animate={prefersReducedMotion ? {} : {
                    x: ["0%", "-50%"]
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
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
            </motion.div>
        </div>
    );
};

// Example Usage Component
export const MarqueeDemo = () => {
    const sampleItems = [
        "Fast, Reliable Websites ⚡",
        "Crafting Digital Experiences 🎨",
        "Available For Hire 🚀",
        "Modern Web Design ✨",
        "High Performance Code 💻",
        "Full Stack Excellence 🌟",
    ];

    return (
<<<<<<< HEAD
        <div className="space-y-12 py-10">
=======
        <div className="space-y-12 py-6">
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
            <div className="space-y-4 px-6">
                <h3 className="text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">Default Speed</h3>
                <Marquee items={sampleItems} />
            </div>

            <div className="space-y-4 px-6">
                <h3 className="text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">Fast Speed</h3>
                <Marquee items={sampleItems} speed={60} className="bg-primary/5 rounded-2xl" />
            </div>

            <div className="space-y-4 px-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Slow Speed</h3>
                <Marquee
                    items={sampleItems}
                    speed={60}
                    className="border-y border-border/60 bg-transparent py-4"
                    itemClassName="text-primary italic font-medium"
                />
            </div>
        </div>
    );
};
