"use client";

import React from "react";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Calendar } from "lucide-react";
import { Card } from "./Card";
import { Whatsapp } from "./icons/Whatsapp";
import { Button } from "./Button";

import { cn } from "@/lib/utils";

export const ProfileCard = ({ className }: { className?: string }) => {
    return (
        <Card className={cn("p-0 flex flex-col", className)}>
            <div className="relative w-full overflow-hidden p-4 h-[300px] sm:h-[350px] lg:h-[270px]">
                <div className="w-full h-full rounded-md overflow-hidden relative ">
                    <Image
                        src="/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg"
                        alt="Paul Puzon"
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        priority
                    />
                </div>
            </div>
            <div className="p-grid space-y-4 pt-2 lg:pt-4 flex-none flex flex-col justify-between">
                <div>
                    <h1 className="mb-2 flex items-center gap-2">
                        Paul Puzon <span className="text-3xl lg:text-3xl">👋</span>
                    </h1>
                    <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                        I help clients build fast, reliable <span className="text-foreground font-semibold">WordPress</span> & <span className="text-foreground font-semibold"> Elementor</span> websites with seamless integrations and <span className="text-foreground font-semibold">GoHighLevel workflows.</span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                        className="w-full sm:flex-1"
                        icon={<Calendar className="w-5 h-5" />}
                        iconPosition="left"
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
                <div className="flex justify-left gap-4 pt-2">
                    {[
                        { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/paul.puzon73/" },
                        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/paul-puzon-932b86303/" },
                        { icon: Whatsapp, label: "Whatsapp", href: "https://wa.me/639914075808" },
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-sm bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary/20 transition-all hover:-translate-y-0.5 shadow-sm"
                            aria-label={social.label}
                        >
                            <social.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>
        </Card>
    );
};
