"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import React from "react";

type TimelineContentProps = {
  children: React.ReactNode;
  /** Stagger index — passed to `customVariants` as the custom value. */
  animationNum: number;
  /** Ref of the section that triggers the animation when scrolled into view. */
  timelineRef: React.RefObject<HTMLElement | null>;
  /** Variants driving the hidden → visible transition. */
  customVariants: Variants;
  /** Rendered element/tag (e.g. "h1", "p", "div"). Defaults to a div. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

/**
 * Scroll-triggered, staggered reveal wrapper. Each child animates from its
 * `hidden` to `visible` variant once `timelineRef` enters the viewport, with the
 * delay derived from `animationNum`.
 */
export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  as = "div",
  className,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  // Respect reduced-motion: skip the reveal animation and render content in its
  // final (visible) state straight away.
  if (prefersReducedMotion) {
    return (
      <MotionComponent
        custom={animationNum}
        variants={customVariants}
        initial={false}
        animate="visible"
        transition={{ duration: 0 }}
        className={className}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
