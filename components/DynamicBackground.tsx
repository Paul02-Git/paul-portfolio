"use client";

import React, { useState, useEffect } from "react";
import { vibes } from "@/data/portfolio";
import Particles from "./Particles";

export const DynamicBackground = () => {
    const [vibeIndex, setVibeIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem("selected-vibe");
        if (saved !== null) {
            setVibeIndex(parseInt(saved, 10));
        }

        const handleVibeChange = (event: Event) => {
            const customEvent = event as CustomEvent<{ index: number }>;
            const index = customEvent.detail?.index;
            if (typeof index === "number") {
                setVibeIndex(index);
            }
        };

        window.addEventListener("vibe-change", handleVibeChange);
        return () => window.removeEventListener("vibe-change", handleVibeChange);
    }, []);

    const activeVibe = vibes[vibeIndex] || vibes[0];

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Mesh Gradients linked to primary color via CSS variable */}
            {/* Top-Left Strong Gradient (Secondary) */}
            <div
                className="absolute top-[-15%] left-[-45%] w-[80%] h-[50%] blur-[100px] rounded-full animate-rotate-slower"
                style={{
                    backgroundColor: 'var(--secondary)',
                    opacity: 0.1,
                    animationDuration: '70s'
                }}
            />
            {/* Mid-Right Strong Gradient (Primary) */}
            <div
                className="absolute top-[20%] right-[-35%] w-[85%] h-[65%] blur-[140px] rounded-full animate-float"
                style={{
                    backgroundColor: 'var(--primary)',
                    opacity: 0.12,
                    animationDuration: '90s'
                }}
            />
            {/* Bottom-Right Soft Half-Circle (Secondary) */}
            <div
                className="absolute bottom-[-20%] right-[-30%] w-[75%] h-[55%] blur-[120px] rounded-full animate-rotate-slowest"
                style={{
                    backgroundColor: 'var(--secondary)',
                    opacity: 0.08,
                    animationDuration: '100s'
                }}
            />

            <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                {isMounted && (
                    <Particles
                        particleColors={[activeVibe.color, activeVibe.color + 'aa']}
                        particleCount={150}
                        particleSpread={10}
                        speed={0.05}
                        particleBaseSize={40}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                    />
                )}
            </div>
        </div>
    );
};
