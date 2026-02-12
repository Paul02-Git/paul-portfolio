import { LucideIcon } from "lucide-react";

export type ProjectCategory = 'Web Design' | 'Web Development' | 'Figma Design' | 'Web Application' | 'SaaS App | UI UX Design';
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

export interface Project {
    title: string;
    category: ProjectCategory;
    image: string;
    link?: string;
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
    source: string;
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
