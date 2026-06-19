"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Facebook, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { VibeToggle } from "./VibeToggle";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

// Desktop top-level links — Portfolio / Blog / Contact live inside the About mega menu.
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

// Mobile has no mega menu, so it lists every page flat.
const mobileNavLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

// Pages surfaced inside the About mega menu.
const aboutMenuLinks = [
    { href: "/portfolio", title: "Portfolio", desc: "A look at the websites and systems I've built." },
    { href: "/blog", title: "Blog", desc: "Guides on web design, SEO & automation." },
];

// Routes that should keep the About trigger looking "active".
const aboutRoutes = ["/about", "/portfolio", "/blog"];

// Radix NavigationMenu opens on hover by default. Preventing the default on these
// pointer events makes Radix skip its hover-open logic, so the mega menu only opens
// on click (and closes on click again / click outside).
const preventHover = (e: React.PointerEvent) => e.preventDefault();

function ListItem({ title, children, href, active }: { title: string; children: React.ReactNode; href: string; active: boolean }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href} aria-current={active ? "page" : undefined} className={cn(active && "bg-accent")}>
                    <div className="text-sm leading-none font-medium text-foreground">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

function AboutMega({ pathname }: { pathname: string }) {
    const active = aboutRoutes.includes(pathname);
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        onPointerMove={preventHover}
                        onPointerLeave={preventHover}
                        className={cn(
                            "h-auto rounded-none bg-transparent px-0 py-0 text-sm font-medium transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground",
                            active ? "text-foreground font-semibold" : "text-muted-foreground",
                        )}
                    >
                        About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        onPointerEnter={preventHover}
                        onPointerLeave={preventHover}
                        className="group-data-[viewport=false]/navigation-menu:mt-7 group-data-[viewport=false]/navigation-menu:duration-100"
                    >
                        <ul className="grid w-[330px] gap-1">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/about"
                                        aria-current={pathname === "/about" ? "page" : undefined}
                                        className={cn(
                                            "flex w-full flex-col justify-end rounded-md p-4 no-underline outline-hidden transition-colors select-none hover:bg-accent",
                                            pathname === "/about" && "bg-accent",
                                        )}
                                    >
                                        <div className="mb-1 text-sm leading-none font-medium text-foreground">About Me</div>
                                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                            Who I am, how I work, and why clients trust me with their websites.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            {aboutMenuLinks.map((item) => (
                                <ListItem key={item.href} href={item.href} title={item.title} active={pathname === item.href}>
                                    {item.desc}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Lock background scroll while the mobile menu is open. This page scrolls on the
    // <html> element (it carries overflow-x-clip), so the lock must target documentElement.
    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/60">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6">
                    <nav className="relative flex items-center justify-between h-16">

                        {/* Logo — left */}
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Paul Puzon Home">
                            <Image
                                src="/images/paul_logo.png"
                                alt="Paul Puzon"
                                width={505}
                                height={522}
                                priority
                                className="h-11 w-auto object-contain"
                            />

                        </Link>

                        {/* Desktop Links — centered (lg+; tablet uses the hamburger) */}
                        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) =>
                                link.label === "About" ? (
                                    <AboutMega key="about" pathname={pathname} />
                                ) : (
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
                                )
                            )}
                        </div>

                        {/* Right — actions */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <VibeToggle className="cursor-pointer" />

                            <Button
                                size="sm"
                                className="shadow-lg shadow-black/5"
                                icon={<ArrowUpRight className="w-4 h-4" />}
                                href="/book-a-call"
                            >
                                Book A Call
                            </Button>

                            {/* Mobile/Tablet Menu Button */}
                            <button
                                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu — luxury minimalist panel below the header */}
            {isOpen && (
                <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-card lg:hidden animate-in fade-in duration-150">
                    <nav className="flex flex-col px-6 pt-4">
                        {mobileNavLinks.map((link, i) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ animationDelay: `${i * 20}ms` }}
                                    className={cn(
                                        "w-full border-b border-border/40 py-5 text-lg font-extrabold tracking-tight transition-colors fill-mode-both duration-150 animate-in fade-in slide-in-from-bottom-2",
                                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Connect — social links */}
                    <div
                        style={{ animationDelay: `${mobileNavLinks.length * 20}ms` }}
                        className="relative mt-20 flex flex-col items-center text-center fill-mode-both duration-150 animate-in fade-in slide-in-from-bottom-2"
                    >
                        {/* Faded illustration sitting behind the Connect content */}
                        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                            <Image
                                src="/images/message-sent.svg"
                                alt=""
                                aria-hidden="true"
                                width={500}
                                height={400}
                                className="w-[100%] max-w-[150px] h-auto select-none opacity-[0.1]"
                            />
                        </div>

                        <p className="relative z-10 mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Let&apos;s Connect</p>
                        <div className="relative z-10 flex items-center gap-6">
                            {[
                                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/paul.puzon73/", external: true },
                                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paul-puzon-932b86303/", external: true },
                                { Icon: Mail, label: "Email", href: "mailto:paulpuzon0007@gmail.com", external: false },
                            ].map(({ Icon, label, href, external }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    onClick={() => setIsOpen(false)}
                                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border bg-primary text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
