"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Interface for the Button component props.
 * Supports both button and link behaviors.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
    href?: string;
    target?: string;
    rel?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    asChild?: boolean; // For future Radix compatibility if needed
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            href,
            icon,
            iconPosition = "right",
            children,
            ...props
        },
        ref
    ) => {
        // Variant Styles
        const variants = {
            primary: "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/10",
            secondary: "bg-muted text-foreground hover:bg-muted/80",
            outline: "bg-white border border-border text-foreground hover:bg-muted/40 shadow-sm",
            ghost: "bg-transparent hover:bg-muted/50 text-foreground",
        };

        // Size Styles
        const sizes = {
            sm: "px-4 py-2 text-sm rounded-[8px]",
            md: "px-6 py-3 text-base rounded-[8px] font-bold",
            lg: "px-8 py-4 text-lg rounded-[8px] font-bold",
            icon: "p-3 rounded-[8px]",
        };

        const baseStyles = cn(
            "inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2 whitespace-nowrap",
            variants[variant],
            sizes[size],
            className
        );

        const content = (
            <>
                {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
                {children}
                {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
            </>
        );

        if (href) {
            return (
                <Link href={href} className={baseStyles} target={props.target} rel={props.rel}>
                    {content}
                </Link>
            );
        }

        return (
            <button ref={ref} className={baseStyles} {...props}>
                {content}
            </button>
        );
    }
);

Button.displayName = "Button";
