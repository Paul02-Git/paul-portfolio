"use client";

import { useEffect } from "react";
import { vibes } from "@/data/portfolio";

export const ThemeManager = () => {
    useEffect(() => {
        // Function to apply the theme
        const applyTheme = (index: number) => {
            const theme = vibes[index];
            if (theme) {
                document.documentElement.style.setProperty('--primary', theme.color);
                document.documentElement.style.setProperty('--secondary', theme.secondaryColor);
                localStorage.setItem('selected-vibe', index.toString());
            }
        };

        // 1. Initial Load: Read from localStorage
        const savedVibe = localStorage.getItem('selected-vibe');
        if (savedVibe !== null) {
            const index = parseInt(savedVibe, 10);
            applyTheme(index);
        } else {
            // Apply default professional vibe (index 0)
            applyTheme(0);
        }

        // 2. Event Listener: Listen for vibe changes from the toggle
        const handleVibeChange = (event: Event) => {
            const customEvent = event as CustomEvent<{ index: number }>;
            const index = customEvent.detail?.index;
            if (typeof index === 'number') {
                applyTheme(index);
            }
        };

        window.addEventListener('vibe-change', handleVibeChange);

        return () => {
            window.removeEventListener('vibe-change', handleVibeChange);
        };
    }, []);

    return null; // This component doesn't render anything
};
