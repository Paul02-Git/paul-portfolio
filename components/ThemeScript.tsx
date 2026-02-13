"use client";

import React from "react";
import { vibes } from "@/data/portfolio";

export const ThemeScript = () => {
  const scriptContent = `
    (function() {
      try {
        const vibes = ${JSON.stringify(vibes)};
        const saved = localStorage.getItem('selected-vibe');
        const index = saved !== null ? parseInt(saved, 10) : 0;
        const theme = vibes[index] || vibes[0];
        document.documentElement.style.setProperty('--primary', theme.color);
        document.documentElement.style.setProperty('--secondary', theme.secondaryColor);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};
