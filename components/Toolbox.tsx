"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/portfolio";
import { Brand } from "@/types/portfolio";

const BrandItem = ({ brand }: { brand: Brand }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="flex items-center justify-center relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full aspect-[4/3] rounded-lg bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted/80 relative">
                <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
<<<<<<< HEAD
=======
                    quality={80}
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 150px"
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                    className="p-5 object-contain"
                />
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -45, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-bold whitespace-nowrap shadow-xl pointer-events-none"
                    >
                        {brand.name}
                        {/* Tooltip Arrow */}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ToolboxProps {
    title?: string;
    data?: Brand[];
}

export const Toolbox = ({ title = "The Dev Toolbox 🧰", data = brands }: ToolboxProps) => {
    return (
        <section className="space-y-10 md:space-y-6">
            <h2 className="flex flex-wrap items-center gap-3 text-wrap">
                {title}
            </h2>

            <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {data.map((brand, i) => (
                    <BrandItem key={i} brand={brand} />
                ))}
            </div>
        </section>
    );
};
