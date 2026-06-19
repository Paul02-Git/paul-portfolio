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
        // Pill padding for the solid primary button (text-only — no icon).
        const primaryPad = {
            sm: "py-[var(--btn-sm-py)] px-[var(--btn-sm-px)] text-[length:var(--btn-sm-font)]",
            md: "py-[var(--btn-md-py)] px-[var(--btn-md-px)] text-[length:var(--btn-md-font)]",
            lg: "py-[var(--btn-lg-py)] px-[var(--btn-lg-px)] text-[length:var(--btn-lg-font)]",
            icon: "p-2",
        };

        // Generic box padding reused by the ghost variant.
        const boxPad = {
            sm: "px-4 py-2 text-sm rounded-[8px]",
            md: "px-6 py-3 text-base font-bold rounded-[8px]",
            lg: "px-8 py-4 text-lg font-bold rounded-[8px]",
            icon: "p-3 rounded-[8px]",
        };

        const variantStyles = {
            // Solid primary: rounded pill in the brand colour. On hover it lifts, the
            // shadow grows, and the label characters roll up (see `.btn-roll` in globals.css).
            primary: cn("btn-roll rounded-[8px] bg-primary text-white duration-300", primaryPad[size]),
            // Plain text link with an underline that wipes in from the side on hover (CSS ::after).
            // `sm:ml-3` gives a consistent gap from a preceding primary button once they sit in a row.
            secondary: "relative text-foreground no-underline sm:ml-3 after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:rounded-[5px] after:bg-current after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100",
            outline: "relative text-foreground no-underline sm:ml-3 after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:rounded-[5px] after:bg-current after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100",
            ghost: cn("bg-transparent hover:bg-muted/50 text-foreground", boxPad[size]),
        };

        const baseStyles = cn(
            // leading-none fixes the line box to the font size so a font swap can't
            // change the button's height (keeps the CTA row from shifting vertically).
            "inline-flex items-center justify-center leading-none transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2 whitespace-nowrap uppercase font-bold tracking-wide",
            variantStyles[variant],
            className
        );

        // The primary button shows no icon — its label rolls up on hover. The string is
        // split into per-character spans (staggered), with an sr-only copy for a11y.
        const isRollingPrimary = variant === "primary" && typeof children === "string";

        const content = isRollingPrimary ? (
            <>
                <span className="sr-only">{children}</span>
                <span className="btn-roll-text" aria-hidden="true">
                    {(children as string).split("").map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 0.03}s` }}>
                            {char === " " ? " " : char}
                        </span>
                    ))}
                </span>
            </>
        ) : (
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
