"use client";

import { Calendar, Mail, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const HomeCtaGrid = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid">
            <Card className="lg:col-span-12 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between sm:p-4 md:p-10">
                    <div className="space-y-4">
                        <p className="font-bold uppercase tracking-wider text-primary">Ready To Scale?</p>
                        <h2 className="max-w-[25ch] md:max-w-[30ch]">
                            Let&apos;s build a conversion-focused website and automation flow for your business.
                        </h2>
                        <p>
                            Get a clear action plan, timeline, and next steps in one free strategy call.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Free strategy call", "Conversion-focused", "Built for Automation"].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/70 px-3 py-1 text-sm font-medium text-foreground/90"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap gap-3">
                        <Button
                            className="w-full sm:flex-[1_1_220px] xl:flex-1"
                            icon={<Calendar className="w-5 h-5" />}
                            iconPosition="left"
                            href="https://calendly.com/paulpuzon0007/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book A Free Call
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full sm:flex-[1_1_220px] xl:flex-1"
                            href="/contact"
                            icon={<Mail className="w-5 h-5" />}
                            iconPosition="left"
                        >
                            Send A Message
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
