"use client";

import React, { useRef, useEffect } from "react";

interface ParticlesProps {
    className?: string;
    particleColors?: string[];
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleBaseSize?: number;
    moveParticlesOnHover?: boolean;
    alphaParticles?: boolean;
    disableRotation?: boolean;
    pixelRatio?: number;
}

export default function Particles({
    className,
    particleColors = ["#ffffff"],
    particleCount = 100,
    speed = 0.1,
    particleBaseSize = 300,
    moveParticlesOnHover = true,
    alphaParticles = true,
    disableRotation = false,
    pixelRatio = 1, // devicePixelRatio can be passed as number or handled internally
}: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particles = useRef<any[]>([]);
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle resizing
        const resizeCanvas = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.offsetWidth * Number(pixelRatio);
                canvas.height = containerRef.current.offsetHeight * Number(pixelRatio);
                canvas.style.width = `${containerRef.current.offsetWidth}px`;
                canvas.style.height = `${containerRef.current.offsetHeight}px`;
                ctx.scale(Number(pixelRatio), Number(pixelRatio));
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Initialize particles
        const initParticles = () => {
            particles.current = [];
            const width = canvas.width / Number(pixelRatio);
            const height = canvas.height / Number(pixelRatio);

            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    size: Math.random() * particleBaseSize + 1, // Adjusted size logic 
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    alpha: alphaParticles ? Math.random() * 0.6 + 0.1 : 1,
                    rotation: disableRotation ? 0 : Math.random() * 360,
                });
            }
        };

        initParticles();

        // Animation Loop
        const animate = () => {
            const width = canvas.width / Number(pixelRatio);
            const height = canvas.height / Number(pixelRatio);

            ctx.clearRect(0, 0, width, height);

            particles.current.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Simple bounce/wrap logic
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Movement on Hover
                if (moveParticlesOnHover) {
                    // simple interaction
                    // (Optional: adding logic to move away from mouse or towards)
                }

                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 10, 0, Math.PI * 2); // size / 10 because baseSize=100 is huge for pixels
                ctx.fill();
                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };

    }, [particleColors, particleCount, speed, particleBaseSize, moveParticlesOnHover, alphaParticles, disableRotation, pixelRatio]);

    return (
        <div ref={containerRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
}
