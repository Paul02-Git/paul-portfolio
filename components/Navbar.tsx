"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { VibeToggle } from "./VibeToggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/60">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6">
                    <nav className="relative flex items-center justify-between h-16">

                        {/* Logo — left */}
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Paul Puzon Home">
                            <div className="flex items-center text-foreground group-hover:text-primary transition-colors">
                                <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20L40 90L55 55" />
                                    <path d="M45 55L60 90L90 20" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg hidden sm:block">W!P</span>
                        </Link>

                        {/* Desktop Links — centered */}
                        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-foreground",
                                        pathname === link.href ? "text-foreground font-semibold" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right — actions */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <VibeToggle className="cursor-pointer" />

                            <Button
                                size="sm"
                                className="group shadow-lg shadow-black/5"
                                icon={<ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />}
                                href="/contact"
                            >
                                Let&apos;s Connect
                            </Button>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                    <div className="flex flex-col items-center gap-6 text-xl font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "hover:text-primary transition-colors",
                                    pathname === link.href ? "text-primary font-bold" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Vibe Toggle in Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Theme:</span>
                        <VibeToggle showLabel={true} />
                    </div>
                </div>
            )}
        </>
    );
}

