"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";

/* ── Tunable motion config — single place to adjust the feel of the hero ── */
const REPEL_RADIUS = 140; // px: how close the cursor must be to push a tile
const REPEL_STRENGTH = 42; // px: maximum distance a tile is pushed
const SPRING_CONFIG = { stiffness: 300, damping: 20 } as const;
const FLOAT_KEYFRAMES = { y: [0, -6, 0, 6, 0], x: [0, 4, 0, -4, 0], rotate: [0, 3, 0, -3, 0] };

// A single floating logo: an image, a label, and custom positioning classes.
export interface FloatingIcon {
    id: number;
    name: string;
    logo: string;
    className: string;
}

export interface FloatingIconsHeroProps {
    eyebrow?: string;
    title: React.ReactNode;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    ctaIcon?: React.ReactNode;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    secondaryCtaIcon?: React.ReactNode;
    icons: FloatingIcon[];
}

// One logo tile: springs away from the cursor when near, and floats gently otherwise.
const Icon = ({
    mouseX,
    mouseY,
    iconData,
    index,
    reduced,
}: {
    mouseX: React.MutableRefObject<number>;
    mouseY: React.MutableRefObject<number>;
    iconData: FloatingIcon;
    index: number;
    reduced: boolean;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);

    // Randomised once so the floating loop doesn't reset on every render.
    const floatDuration = React.useMemo(() => 7 + Math.random() * 5, []);

    React.useEffect(() => {
        if (reduced) return; // Respect prefers-reduced-motion: no cursor repulsion.

        const handleMouseMove = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const distance = Math.hypot(mouseX.current - cx, mouseY.current - cy);

            if (distance < REPEL_RADIUS) {
                const angle = Math.atan2(mouseY.current - cy, mouseX.current - cx);
                const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH; // closer → stronger
                x.set(-Math.cos(angle) * force);
                y.set(-Math.sin(angle) * force);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y, mouseX, mouseY, reduced]);

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute", iconData.className)}
            aria-hidden="true"
        >
            {/* Inner wrapper drives the continuous floating motion. */}
            <motion.div
                className="group flex items-center justify-center w-8 h-8 lg:w-14 lg:h-14 rounded-md backdrop-blur-md border border-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                animate={reduced ? undefined : FLOAT_KEYFRAMES}
                transition={
                    reduced
                        ? undefined
                        : { duration: floatDuration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                }
            >
                <div className="relative w-6 h-6 lg:w-8 lg:h-8">
                    <Image
                        src={iconData.logo}
                        alt=""
                        fill
                        sizes="24px"
                        className="object-contain transition-opacity duration-500"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

const FloatingIconsHero = React.forwardRef<
    HTMLElement,
    Omit<React.HTMLAttributes<HTMLElement>, "title"> & FloatingIconsHeroProps
>(({ className, eyebrow, title, subtitle, ctaText, ctaHref, ctaIcon, secondaryCtaText, secondaryCtaHref, secondaryCtaIcon, icons, ...props }, ref) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);
    const reduced = useReducedMotion() ?? false;

    // Section-relative cursor position used to mask the indigo dot-pattern highlight.
    const maskX = useMotionValue(0);
    const maskY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        mouseX.current = event.clientX;
        mouseY.current = event.clientY;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        maskX.set(event.clientX - left);
        maskY.set(event.clientY - top);
    };

    // Dot grid shared by every background layer (colour swapped per layer).
    const dotPattern = (color: string) => ({
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
    });

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("group section-y full-bleed overflow-hidden bg-background flex flex-col items-center justify-center", className)}
            {...props}
        >
            {/* Dot-pattern background — base grid + cursor-reactive indigo highlight. */}
            <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={dotPattern("rgb(230, 230, 230)")}
            />
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    ...dotPattern("rgb(0, 0, 0)"),
                    WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${maskX}px ${maskY}px, black 0%, transparent 100%)`,
                    maskImage: useMotionTemplate`radial-gradient(200px circle at ${maskX}px ${maskY}px, black 0%, transparent 100%)`,
                }}
            />

            {/* Soft warm glow — a quiet luxury accent behind the headline. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[50%] rounded-full bg-primary/[0.02] blur-3xl" />

            {/* Floating logo layer — decorative. Per-icon classes control mobile visibility. */}
            <div className="absolute inset-0 pointer-events-none">
                {icons.map((iconData, index) => (
                    <Icon
                        key={iconData.id}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        iconData={iconData}
                        index={index}
                        reduced={reduced}
                    />
                ))}
            </div>

            {/* Foreground content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-6">
                {eyebrow && (
                    <p className="mb-6 text-primary font-semibold text-sm uppercase tracking-widest">{eyebrow}</p>
                )}
                <h1 className="max-w-[25ch] mx-auto text-foreground">
                    {title}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
                <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
                    <Button href={ctaHref} icon={ctaIcon} iconPosition="right">
                        {ctaText}
                    </Button>
                    {secondaryCtaText && secondaryCtaHref && (
                        <Button href={secondaryCtaHref} variant="outline" icon={secondaryCtaIcon} iconPosition="right">
                            {secondaryCtaText}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
});

FloatingIconsHero.displayName = "FloatingIconsHero";

export { FloatingIconsHero };
