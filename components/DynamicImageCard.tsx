"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface DynamicImageCardProps {
    images: string[];
    className?: string;
    interval?: number;
}

export const DynamicImageCard = ({
    images,
    className,
    interval = 250
}: DynamicImageCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isHovered && images.length > 1) {
            timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    let next = Math.floor(Math.random() * images.length);
                    // Ensure we don't pick the same image twice in a row if possible
                    while (next === prev && images.length > 1) {
                        next = Math.floor(Math.random() * images.length);
                    }
                    return next;
                });
            }, interval);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isHovered, images, interval]);

    return (
        <Card
            className={cn("p-0 relative overflow-hidden group transition-all duration-300", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 z-10 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

            {images.map((src, index) => (
                <div
                    key={src}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-150",
                        currentIndex === index ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Image
                        src={src}
                        alt={`Shuffle Image ${index}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </div>
            ))}

            {/* Fallback/Initial state if images list is empty */}
            {images.length === 0 && (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">No images found</span>
                </div>
            )}
        </Card>
    );
};
