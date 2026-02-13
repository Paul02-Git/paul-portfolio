"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import { Music, Play, Pause, ExternalLink, Calendar } from "lucide-react";
import { vibes } from "@/data/portfolio";

interface TechStackProps {
    className?: string;
    brands?: { name: string; logo: string }[]; // Optional now
}

export const TechStack = ({ className }: TechStackProps) => {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [spotifyData, setSpotifyData] = useState<{
        isPlaying: boolean;
        title?: string;
        artist?: string;
        albumImageUrl?: string;
        songUrl?: string;
        previewUrl?: string;
    } | null>(null);
    const [dominantColor, setDominantColor] = useState<string>("rgba(var(--primary-rgb), 0.1)");

    // Vibe Toggle Logic
    const [vibeIndex, setVibeIndex] = useState(0);

    // Initial load from localStorage
    useEffect(() => {
        const savedVibe = localStorage.getItem('selected-vibe');
        if (savedVibe !== null) {
            setVibeIndex(parseInt(savedVibe, 10));
        }
    }, []);

    const activeVibe = vibes[vibeIndex];

    const handleVibeToggle = () => {
        const nextIndex = (vibeIndex + 1) % vibes.length;
        setVibeIndex(nextIndex);

        // Notify the global ThemeManager
        window.dispatchEvent(new CustomEvent('vibe-change', {
            detail: { index: nextIndex }
        }));
    };

    // Fetch Spotify Data
    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch('/api/spotify');
                const data = await res.json();
                setSpotifyData(data);
            } catch (error) {
                console.error("Error fetching Spotify data", error);
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    // Extract color from album art
    useEffect(() => {
        if (!spotifyData?.isPlaying || !spotifyData.albumImageUrl) {
            setDominantColor("rgba(var(--primary-rgb), 0.1)");
            return;
        }

        const img = new window.Image();
        img.crossOrigin = "Anonymous";
        img.src = spotifyData.albumImageUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = 1;
            canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            setDominantColor(`rgba(${r}, ${g}, ${b}, 0.15)`);
        };
    }, [spotifyData?.albumImageUrl, spotifyData?.isPlaying]);

    const toggleAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!audioRef.current || !spotifyData?.previewUrl) return;

        if (isPlayingAudio) {
            audioRef.current.pause();
            setIsPlayingAudio(false);
        } else {
            audioRef.current.src = spotifyData.previewUrl;
            audioRef.current.play().catch(e => console.error("Audio play error:", e));
            setIsPlayingAudio(true);
        }
    };

    return (
        <Card className={cn("relative overflow-hidden flex items-center justify-center min-h-[350px] p-0 bg-transparent border-0 shadow-none perspective-1000", className)}>
            {/* Background Gradient/Glow */}


            {/* Audio Element */}
            <audio
                ref={audioRef}
                onEnded={() => setIsPlayingAudio(false)}
                className="hidden"
            />
            {/* Grid Layout: 3 Rows, 2 Columns */}
            <div className="absolute inset-0 grid grid-rows-2 grid-cols-2 gap-4">

                {/* Big Spotify Card (Takes Top 2 Rows) */}
                <div className="row-span-2 col-span-2 relative group w-full h-full">
                    <a
                        href={spotifyData?.songUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: dominantColor }}
                        className="backdrop-blur-sm rounded-lg p-card-md border border-border/50 flex flex-col justify-between gap-3 shadow-sm transition-colors w-full h-full block relative overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between z-10 relative">
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <Music className="w-5 h-5 text-primary" /> Now Playing
                            </span>
                            {spotifyData?.isPlaying && (
                                <span className="flex h-2.5 w-2.5 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex items-center gap-4 z-10 relative gap-4 pt-2">
                            <div className="w-24 h-24 bg-black/5 rounded-md flex items-center justify-center relative overflow-hidden shrink-0 shadow-md border border-border/10">
                                {spotifyData?.albumImageUrl ? (
                                    <Image src={spotifyData.albumImageUrl} alt="Album Art" fill className="object-contain" />
                                ) : (
                                    <Music className="w-8 h-8 text-foreground/30" />
                                )}
                                {/* Overlay Play Button on Album Art */}
                                {spotifyData?.previewUrl && (
                                    <div
                                        onClick={toggleAudio}
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
                                    >
                                        {isPlayingAudio ? (
                                            <Pause className="w-6 h-6 text-white fill-current" />
                                        ) : (
                                            <Play className="w-6 h-6 text-white fill-current" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-base font-bold truncate group-hover:text-primary transition-colors leading-tight mb-1">
                                    {spotifyData?.isPlaying ? spotifyData.title : "Not Playing"}
                                </span>
                                <span className="text-sm text-muted-foreground truncate font-medium">
                                    {spotifyData?.isPlaying ? spotifyData.artist : "Spotify"}
                                </span>
                            </div>
                        </div>

                        {/* Visualizer / Audio Control */}
                        <div className="flex items-center justify-between gap-2 z-10 relative mt-auto w-full pt-3 border-t border-border/10">
                            {spotifyData?.previewUrl ? (
                                <button
                                    onClick={toggleAudio}
                                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    {isPlayingAudio ? (
                                        <><Pause className="w-3.5 h-3.5 fill-current" /> Pause Preview</>
                                    ) : (
                                        <><Play className="w-3.5 h-3.5 fill-current" /> Play Preview</>
                                    )}
                                </button>
                            ) : (
                                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-bold">No Preview Available</span>
                            )}
                            <div className="flex gap-1 items-end h-6 ml-auto">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={cn("w-1 rounded-full", isPlayingAudio ? "bg-[#1DB954]" : spotifyData?.isPlaying ? "bg-primary/60" : "bg-primary/20")}
                                        style={(!isPlayingAudio && spotifyData?.isPlaying && dominantColor) ? { backgroundColor: dominantColor.replace('0.15)', '0.6)') } : {}}
                                        animate={(isPlayingAudio || spotifyData?.isPlaying) ? { height: [4, 20, 10, 24, 8, 16, 4] } : { height: 4 }}
                                        transition={(isPlayingAudio || spotifyData?.isPlaying) ? { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 } : {}}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Background Art Glow */}
                        {spotifyData?.albumImageUrl && (
                            <div
                                className="absolute inset-0 opacity-[0.25] pointer-events-none transition-opacity duration-1000"
                                style={{
                                    background: `radial-gradient(circle at center, ${dominantColor.replace('0.15)', '0.4)')} 0%, transparent 70%)`
                                }}
                            />
                        )}
                    </a>
                </div>

                {/* Small Bentos at Bottom row */}
                {/* Permanent Scheduler Card */}
                <div className="row-span-2 col-span-1 bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-border flex flex-col items-center justify-center gap-2 shadow-sm h-full group hover:bg-white/80 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Calendar className="w-8 h-8 text-primary rotate-12" />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Availability</span>
                        <span className="text-sm font-bold text-foreground leading-tight">Book Your Call:<br /><span className="text-primary">See Available Slot</span></span>
                    </div>
                    <a
                        href="https://calendly.com/paulpuzon0007/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-1 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white text-[10px] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 border border-primary/20"
                    >
                        Book Discovery <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </div>

                {/* Vibe Toggle Card */}
                <div
                    onClick={handleVibeToggle}
                    className="row-span-2 col-span-1 bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-border/80 flex flex-col items-center justify-center gap-1.5 shadow-sm relative overflow-hidden h-full group hover:bg-white/80 transition-all duration-300 cursor-pointer select-none active:scale-95"
                >
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />

                    <div className="relative z-10 flex flex-col items-center w-full">
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            Pick A Color
                        </div>

                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={activeVibe.name}
                                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute"
                                >
                                    <activeVibe.icon className="w-8 h-8 text-primary" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="text-[11px] font-bold text-foreground mt-1 text-center">
                            {activeVibe.name}
                        </div>
                        <div className="text-[9px] text-muted-foreground text-center font-medium opacity-80">
                            {activeVibe.label}
                        </div>
                    </div>

                    {/* Tactile progress indicator */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 px-3">
                        {vibes.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-300",
                                    i === vibeIndex ? "w-4 bg-primary" : "w-1 bg-primary/20"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};
