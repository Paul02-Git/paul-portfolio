import React from "react";
import { cn } from "@/lib/utils";

/**
 * Section eyebrow, the small uppercase label above a heading.
 * Standardizes the style in one place; pass the wording as children.
 * Override colour for dark bands via className (e.g. "text-white").
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-primary font-semibold text-sm uppercase tracking-widest", className)}>
      {children}
    </p>
  );
}
