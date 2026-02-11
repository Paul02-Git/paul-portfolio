import { Layout, Zap, Code2, Headset, Puzzle, Palette, Smartphone, Box, Fingerprint, Camera, Film, Eye } from "lucide-react";
import { Experience, Tool, Project, Service, Stat, FAQItem, Brand, Testimonial } from "@/types/portfolio";

export const experiences: Experience[] = [
    { year: "2018-2022", company: "24task", role: "Virtual Assistant", logo: "/images/24Task.png" },
    { year: "2022-2024", company: "MTC", role: "Data Analyst", logo: "/images/MTC.jpg" },
    { year: "2019-2021", company: "Techloq Filter", role: "Administrative VA", logo: "/images/Techloq.png" },
    { year: "2019-2022", company: "RedLineCoin", role: "Web & Mobile QA Tester", logo: "/images/Redline.jpg" },
    { year: "2023-Present", company: "Freelancer", role: "WordPress Developer", logo: "/images/elementor-custom.png" },
];

export const tools: Tool[] = [
    { name: "Figma", logo: "/images/Figma-logo.svg" },
    { name: "Wordpress", logo: "https://s.w.org/style/images/about/WordPress-logotype-wmark.png" },
    { name: "GHL", logo: "/images/GHL Logo.svg" },
    { name: "Elementor", logo: "/images/elementor-custom.png" },
    { name: "Antigravity", logo: "/images/GAG.webp" },
    { name: "GA4", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
];

export const projects: Project[] = [
    {
        title: "Jets Fan Cruise",
        category: "Web Design",
        image: "/images/Jets.png",
        link: "https://jetsfancruise.com"
    },
    {
        title: "Raiders Fan Cruise",
        category: "Web Development",
        image: "/images/Raidersfancruise.png",
        link: "https://raidersfancruise.com"
    },
    {
        title: "Jets Fan Cruise",
        category: "Figma Design",
        image: "/images/Jets.png",
        link: "#"
    },
    {
        title: "Raiders Fan Cruise",
        category: "Web Application",
        image: "/images/Raidersfancruise.png",
        link: "#"
    }, {
        title: "Jets Fan Cruise",
        category: "SaaS App | UI UX Design",
        image: "/images/Jets.png",
        link: "#"
    },
    {
        title: "Raiders Fan Cruise",
        category: "SaaS App | UI UX Design",
        image: "/images/Raidersfancruise.png",
        link: "#"
    },
];

export const services: Service[] = [
    { title: "WordPress &\nElementor", icon: Layout },
    { title: "GHL\nSpecialist", icon: Zap },
    { title: "Web\nDevelopment", icon: Code2 },
    { title: "Virtual\nAssistant", icon: Headset },
    { title: "Marketing\nIntegrations", icon: Puzzle },
];

export const stats = [
    { label: "Years of Experience", value: "4+" },
    { label: "Project Completed", value: "50+" },
    { label: "Happy Clients", value: "20+" },
];

export const brands = [

    { name: "Elementor", logo: "/images/elementor-custom.png" },
    { name: "Figma", logo: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
    { name: "Wordpress", logo: "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg" },
    { name: "Antigravity", logo: "/images/GAG.webp" },
    { name: "Slack", logo: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg" },
    { name: "HubSpot", logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg" },
    { name: "GHL", logo: "/images/GHL Logo.svg" },
    { name: "Google Analytics", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
    { name: "Google Tag Manager", logo: "/images/GTM.webp" },
    { name: "Microsoft Clarity", logo: "/images/Microsoft Clarity.png" },
    { name: "Cloudways", logo: "/images/cloudways.png" },
    { name: "ClickUp", logo: "/images/clickup.png" },



];

export const testimonials: Testimonial[] = [
    {
        rating: 5,
        quote: "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
        name: "Oliver Clain",
        role: "Product Designer",
        source: "Framer.com"
    },
    {
        rating: 4,
        quote: "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
        name: "Oliver Clain",
        role: "Product Designer",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
        name: "Oliver Clain",
        role: "Product Designer",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
        name: "Oliver Clain",
        role: "Product Designer",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
        name: "Oliver Clain",
        role: "Product Designer",
        source: "Framer.com"
    }
];

export const marqueeItems = [
    "Fast, Reliable Websites⚡",
    "Crafting Digital Experiences🎨",
    "Available For Hire🚀",
    "Full Stack Excellence🌟",
    "Modern Web Design✨",
];

export const faqs = [
    {
        question: "What services do you offer?",
        answer: "I build and optimize WordPress websites using Elementor, set up GoHighLevel (GHL) workflows, and handle marketing and CRM integrations to help businesses generate and manage leads."
    },
    {
        question: "What is your typical project timeline?",
        answer: "Timelines depend on the scope. A standard WordPress or Elementor site usually takes 2–4 weeks, while GoHighLevel setup and marketing integrations typically take 1–3 weeks."
    },
    {
        question: "How much do your services cost?",
        answer: "Pricing depends on project requirements, features, and integrations. After a short discussion, I provide a clear, fixed-price quote or hourly estimate—no hidden costs."
    },
    {
        question: "Do you work with existing WordPress websites?",
        answer: "Yes. I can redesign, optimize, fix issues, or add new features to existing WordPress and Elementor websites."
    },
    {
        question: "What GoHighLevel services do you provide?",
        answer: "I handle GHL account setup, CRM pipelines, email and SMS workflows, calendar booking, lead capture forms, and automation for follow-ups."
    },
    {
        question: "Can you integrate marketing tools and third-party services?",
        answer: "Yes. I integrate email platforms, CRMs, forms, analytics tools, calendars, and other marketing tools to ensure smooth data flow and automation."
    },
    {
        question: "Will my website be mobile-friendly?",
        answer: "Absolutely. All WordPress and Elementor websites I build or update are fully responsive and optimized for mobile, tablet, and desktop devices."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes. I provide 30 days of post-launch support to fix issues and ensure everything runs smoothly. Ongoing maintenance is also available."
    },
    {
        question: "How do we get started?",
        answer: "You can book a call or send a message with your project details. I’ll review your requirements and provide a clear plan and timeline within 24–48 hours."
    }

];

export const fullServices: Service[] = [
    { title: "UI UX Design", icon: Palette },
    { title: "Mobile App", icon: Smartphone },
    { title: "Product Design", icon: Box },
    { title: "Branding", icon: Fingerprint },
    { title: "Photography", icon: Camera },
    { title: "Motion Design", icon: Film },
    { title: "Web Development", icon: Code2 },
    { title: "Visualization", icon: Eye },
];
