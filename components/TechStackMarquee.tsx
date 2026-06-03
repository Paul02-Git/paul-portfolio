"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Tool = { name: string; logo: string };

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.55, ease: "easeOut" as const },
};

/**
 * Two-row, opposite-direction scrolling logo marquee ("trusted tools").
 * Pass the list of tools/brands to display; rows split at the midpoint.
 */
export function TechStackMarquee({
  items,
  heading = "The trusted tools I use to build, automate & scale your business",
}: {
  items: Tool[];
  heading?: string;
}) {
  const mid = Math.ceil(items.length / 2);
  const rows = [
    { list: items, reverse: false },
    { list: [...items.slice(mid), ...items.slice(0, mid)], reverse: true },
  ];

  return (
    <div className="relative max-w-[1100px] mx-auto">
      <motion.h3 {...fadeUp} className="text-center tracking-wide mb-8">
        {heading}
      </motion.h3>

      {/* Two-row marquee — opposite directions */}
      <div className="relative overflow-hidden py-1">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="space-y-4">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex items-center gap-4 w-max"
              style={{ animation: `marquee 75s linear infinite${row.reverse ? " reverse" : ""}` }}
            >
              {[...row.list, ...row.list].map((brand, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2.5 rounded-[8px] border border-border/70 bg-card px-6 py-3 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative w-7 h-7 shrink-0">
                    <Image src={brand.logo} alt={brand.name} fill sizes="28px" className="object-contain" />
                  </div>
                  <span className="text-foreground/90 font-semibold text-base whitespace-nowrap tracking-tight">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
