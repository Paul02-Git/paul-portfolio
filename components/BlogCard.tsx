"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
    return (
        <div
            className="group h-full"
        >
            <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="flex flex-col h-full rounded-2xl border border-border/40 bg-muted/30 overflow-hidden hover:border-primary/30 hover:bg-muted/50 transition-all duration-300">
                    {/* Image Section */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/40 text-[10px] font-bold uppercase tracking-widest text-primary">
                                {post.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 gap-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                        </div>

                        <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-primary gap-2 group-hover:gap-3 transition-all">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
