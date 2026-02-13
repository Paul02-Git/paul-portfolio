"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 pointer-events-none">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-6 lg:px-6">
                    <nav className="pointer-events-auto bg-white/50 backdrop-blur-md border border-white/20 shadow-sm shadow-black/10 rounded-sm px-4 py-4 flex items-center justify-between transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="flex items-center text-foreground group-hover:text-primary transition-colors">
                                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20L40 90L55 55" />
                                        <path d="M45 55L60 90L90 20" />
                                    </svg>
                                </div>
                                <span className="font-bold text-lg hidden sm:block">W!P</span>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-foreground",
                                        pathname === link.href ? "text-foreground font-bold" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <Button
                                size="sm"
                                className="group shadow-lg shadow-black/5"
                                icon={<ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />}
                                href="/contact"
                            >
<<<<<<< HEAD
                                Let's Talk
=======
                                Let&apos;s Talk
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
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
            </div>

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
                </div>
            )}
        </>
    );
}

