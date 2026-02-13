"use client";

import React from "react";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Calendar, Github } from "lucide-react";
import { Card } from "./Card";
import { Whatsapp } from "./icons/Whatsapp";
<<<<<<< HEAD
=======
import { Discord } from "./icons/Discord";
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
import { Button } from "./Button";

import { cn } from "@/lib/utils";

export const ProfileCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex flex-col gap-grid h-full", className)}>
            <Card className="flex-grow p-card-md flex-col">
                <div className="relative w-full overflow-hidden h-[200px] sm:h-[250px] lg:h-[180px] rounded-md">
                    <Image
                        src="/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg"
                        alt="Paul Puzon"
                        fill
<<<<<<< HEAD
=======
                        quality={80}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 20vw"
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        priority
                    />
                </div>
                <div className="flex-grow flex flex-col justify-between pt-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="flex items-center gap-2">
<<<<<<< HEAD
                            How you doing? <span className="text-3xl lg:text-3xl">👋</span>
                        </h1>
                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                            I'm Paul, I help clients build fast, reliable <span className="text-foreground font-semibold">WordPress</span> & <span className="text-foreground font-semibold"> Elementor</span> websites with seamless integrations and <span className="text-foreground font-semibold">GHL workflows.</span>
=======
                            <span className="text-2xl lg:text-3xl">How you doing? 👋</span>
                        </h1>
                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                            I&apos;m Paul, I help clients build fast, reliable <span className="text-foreground font-semibold">WordPress</span> & <span className="text-foreground font-semibold"> Elementor</span> websites with seamless integrations and <span className="text-foreground font-semibold">GHL workflows.</span>
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-auto">
                            <Button
                                className="w-full sm:flex-1"
                                icon={<Calendar className="w-5 h-5" />}
                                iconPosition="left"
<<<<<<< HEAD
=======
                                href="https://calendly.com/paulpuzon0007/30min"
                                target="_blank"
                                rel="noopener noreferrer"
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                            >
                                Book A Call
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full sm:flex-1"
                                href="mailto:paulpuzon0007@gmail.com"
                                icon={<Mail className="w-5 h-5" />}
                                iconPosition="left"
                            >
                                <span className="text-muted-foreground font-medium">Send Email</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="flex flex-col items-center p-card-sm gap-4">
                <h2>
<<<<<<< HEAD
                    <div className="flex items-center gap-2">Stay Connected <img src="/images/undraw_friendly-guy-avatar_dqp5.svg" alt="Avatar" className="w-10 h-10" /></div>
=======
                    <div className="flex items-center gap-2">Stay Connected <Image src="/images/undraw_friendly-guy-avatar_dqp5.svg" alt="Avatar" width={40} height={40} className="w-10 h-10" /></div>
>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                </h2>
                <div className="flex justify-center gap-4">
                    {[
                        { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/paul.puzon73/" },
                        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paul-puzon-932b86303/" },
<<<<<<< HEAD
                        { icon: Whatsapp, label: "Whatsapp", href: "https://wa.me/639914075808" },
                        { icon: Github, label: "Github", href: "https://github.com/Paul02-Git" },
=======
                        { icon: Discord, label: "Discord", href: "https://discord.gg/6kcnz2c7" },
                        { icon: Whatsapp, label: "Whatsapp", href: "https://wa.me/639914075808" },
                        { icon: Github, label: "Github", href: "https://github.com/Paul02-Git" },


>>>>>>> 218ee1c4dca668fc6d1b635d211e7cfe9265732f
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-sm bg-muted/30 border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all hover:-translate-y-0.5 shadow-sm group"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5 transition-colors group-hover:text-primary" />
                        </a>
                    ))}
                </div>
            </Card>
        </div>
    );
};
