import { LucideIcon } from "lucide-react";

export type ProjectCategory = 'Web Design' | 'Web Development' | 'Figma Design' | 'Web Application' | 'SaaS App | UI UX Design' | 'Landing Page' | 'Mockup Development' | 'Virtual Assistant' | 'Shopify Development';
export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export interface Experience {
    year: string;
    company: string;
    role: string;
    logo: string;
}

export interface Tool {
    name: string;
    logo: string;
}

export type ToolKey = 'shopify' | 'klaviyo' | 'figma' | 'elementor' | 'ghl' | 'hubspot' | 'va';

export interface Project {
    title: string;
    category: ProjectCategory;
    image: string;
    link?: string;
    tools?: ToolKey[];
}

export interface Service {
    title: string;
    icon: LucideIcon;
}

export interface Testimonial {
    rating: TestimonialRating;
    quote: string;
    name: string;
    role: string;

}

export interface Stat {
    label: string;
    value: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Brand {
    name: string;
    logo: string;
}

export interface Vibe {
    name: string;
    color: string;
    secondaryColor: string;
    icon: LucideIcon;
    label: string;
}
export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    category: 'WordPress' | 'Marketing' | 'GHL' | 'SEO' | 'SEO & Speed Optimization' | 'Web Design Investment' | 'Business Growth' | 'Website Strategy';
    image: string;
    slug: string;
    content: string;
    author?: string;
    authorRole?: string;
    authorBio?: string;
}
