"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { testimonials } from "@/data/portfolio";
import type { Testimonial } from "@/types/portfolio";

// Global entrance effect (matches fadeUp used across the site).
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

/** Small star-rating row, tinted to read on light or dark cards. */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

/** Author row, avatar tone adapts to the card surface (light / pastel / accent). */
function Author({
  name,
  role,
  tone,
  avatar,
}: {
  name: string;
  role: string;
  tone: "light" | "pastel" | "accent";
  avatar?: string;
}) {
  // Light + pastel are light surfaces (dark text); accent is the solid brand colour.
  const onLight = tone === "light" || tone === "pastel";
  const avatarClass =
    tone === "light"
      ? "bg-foreground text-white"
      : tone === "pastel"
        ? "bg-primary text-white"
        : "bg-white/15 text-white ring-1 ring-white/30";
  const nameClass = onLight ? "text-foreground" : "text-white";
  const roleClass = onLight ? "text-muted-foreground" : "text-white";

  // If the headshot fails to load (e.g. missing/renamed file), fall back to initials.
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(avatar) && !imgFailed;

  return (
    <div className="flex justify-between items-end pt-5">
      <div className="min-w-0">
        <h5 className={nameClass}>{name}</h5>
        <p className={`text-sm ${roleClass}`}>{role}</p>
      </div>
      {showImage ? (
        <Image
          src={avatar as string}
          alt=""
          width={48}
          height={48}
          sizes="48px"
          onError={() => setImgFailed(true)}
          className={`shrink-0 w-12 h-12 rounded-full object-cover ring-2 ${
            onLight ? "ring-black/10" : "ring-white/10"
          }`}
        />
      ) : (
        <span
          className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-light ${avatarClass}`}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}

/**
 * Quote card body. Bounds-safe: renders nothing if the testimonial is missing
 * (e.g. the data array was trimmed), so the bento layout never crashes.
 */
function Quote({
  testimonial,
  tone,
  small,
}: {
  testimonial?: Testimonial;
  tone: "light" | "pastel" | "accent";
  small?: boolean;
}) {
  if (!testimonial) return null;
  return (
    <article className="relative mt-auto">
      <Stars count={testimonial.rating} />
      <p className={`pt-3 leading-relaxed ${small ? "text-sm" : ""}`}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <Author
        name={testimonial.name}
        role={testimonial.role}
        tone={tone}
        avatar={testimonial.avatar}
      />
    </article>
  );
}

export function ClientFeedback() {
  // Card surfaces: light (grid), accent (primary). The middle column cycles the
  // soft pastel tints used on the services page steps grid — one per card.
  const lightCard =
    "relative overflow-hidden rounded-xl border border-border bg-card text-foreground p-5 flex flex-col justify-between shadow-sm";
  const accentCard =
    "rounded-xl bg-primary text-primary-foreground p-5 flex flex-col justify-between shadow-sm";
  const pastelCard =
    "rounded-xl text-foreground p-5 flex flex-col justify-between shadow-sm";
  const pastelTints = ["bg-[#f5f3ff]", "bg-[#ecfdf5]", "bg-[#fff7ed]"]; // violet · mint · peach

  const grid = (
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1f_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
  );

  return (
    <section className="section-y">
      <div>
        {/* Header */}
        <div className="mx-auto text-center space-y-4 mb-12">
          <motion.div {...fadeUp()}>
            <Eyebrow className="inline-block">Social Proof</Eyebrow>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)} className="max-w-[20ch] mx-auto">
            Trusted by Businesses That Made the Switch
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:flex-row lg:flex-col h-full">
            <motion.div {...fadeUp()} className={`lg:flex-[7] flex-[6] ${lightCard}`}>
              {grid}
              <Quote testimonial={testimonials[1]} tone="light" />
            </motion.div>

            <motion.div {...fadeUp(0.1)} className={`lg:flex-[3] flex-[4] ${accentCard}`}>
              <Quote testimonial={testimonials[2]} tone="accent" />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 md:flex-row lg:flex-col h-full">
            {[3, 4, 5].map((idx, i) => (
              <motion.div
                key={idx}
                {...fadeUp(0.1 + i * 0.08)}
                className={`flex-1 ${pastelCard} ${pastelTints[i]}`}
              >
                <Quote testimonial={testimonials[idx]} tone="pastel" small />
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 md:flex-row lg:flex-col h-full">
            <motion.div {...fadeUp()} className={`lg:flex-[3] flex-[4] ${accentCard}`}>
              <Quote testimonial={testimonials[6]} tone="accent" />
            </motion.div>

            <motion.div {...fadeUp(0.1)} className={`lg:flex-[7] flex-[6] ${lightCard}`}>
              {grid}
              <Quote testimonial={testimonials[0]} tone="light" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientFeedback;
