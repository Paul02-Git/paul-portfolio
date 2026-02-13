import { Layout, Zap, Code2, Headset, Puzzle, Palette, Search, Gauge, Bot, ShieldCheck, Sparkles, Globe, Activity } from "lucide-react";
import { Experience, Tool, Project, Service, Testimonial } from "@/types/portfolio";

export const vibes = [
    { name: "Professional", color: "#108a00", icon: ShieldCheck, label: "Trust & Growth" },
    { name: "Creative", color: "#000000", icon: Palette, label: "Innovation & Design" },
    { name: "Premium", color: "#f06431", icon: Sparkles, label: "Excellence & Quality" },
    { name: "Visionary", color: "#2563eb", icon: Globe, label: "Global Reach" },
    { name: "Modern", color: "#854836", icon: Activity, label: "Dynamic & Bold" }
];

export const experiences: Experience[] = [
    { year: "2018-2022", company: "24task", role: "Virtual Assistant", logo: "/images/24Task.png" },
    { year: "2022-2024", company: "MTC", role: "Data Analyst", logo: "/images/MTC.jpg" },
    { year: "2019-2021", company: "Techloq Filter", role: "Administrative VA", logo: "/images/Techloq.png" },
    { year: "2019-2022", company: "RedLineCoin", role: "Web & Mobile QA Tester", logo: "/images/Redline.jpg" },
    { year: "2023-Present", company: "Freelancer", role: "WordPress Developer", logo: "/images/elementor-custom.png" },
    { year: "2026", company: "Vibe Coding", role: "Noob Vibe Coder", logo: "/images/GAG.webp" },
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
        category: "Web Development",
        image: "/images/Jets-Fan-Cruise.png",

    },
    {
        title: "Ichiban Go",
        category: "Web Development",
        image: "/images/IchibanGO.png",
    },
    {
        title: "Health Optimization GT3",
        category: "Web Development",
        image: "/images/GT3Health.png",

    },
    {
        title: "Evident Elements",
        category: "Web Development",
        image: "/images/EvidentElements.png",
    },
    {
        title: "ForeverLawn Central Florida",
        category: "Web Development",
        image: "/images/Foreverlawn.png",
    },
    {
        title: "K9 Grass Synthetic Turf",
        category: "Landing Page",
        image: "/images/K9Grass FLCL.png",
    },
    {
        title: "Winning Tax Strategies",
        category: "Mockup Development",
        image: "/images/WinningTaxStrategies.png",

    },
    {
        title: "Landscape Synthetic Turf",
        category: "Landing Page",
        image: "/images/Landspace Synthetic Turf.png",

    }, {
        title: "Consult with Che",
        category: "Web Development",
        image: "/images/CHE.png",

    },
    {
        title: "Dr. Precious Diaz",
        category: "Web Development",
        image: "/images/Precious Diaz.png",

    },
    {
        title: "Techloq",
        category: "Virtual Assistant",
        image: "/images/Techloq-Filter.png",

    },
    {
        title: "24Task",
        category: "Virtual Assistant",
        image: "/images/24task-Va.png",

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
        quote: "I am genuinely grateful for having been recommended to WebCornerstone by a trusted colleague. I required a professional website to be developed very quickly,",
        name: "Mark P. Smith",
        role: "Owner, MPS & Associates, LLC",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "I've worked with dozens of developers over 15 years, but Paul truly stands out. He delivers top-notch WordPress solutions on time, on budget, and with impressive results.",
        name: "David Chen",
        role: "Founder & CEO",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Paul is a great developer. He is very skilled with Elementor. He understood the design quickly and executed it perfectly.",
        name: "Michael Johnson",
        role: "CEO",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Great communication and fast turnaround. My website is now optimized and running smoothly.",
        name: "James Wilson",
        role: "CEO",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Helped us fix several WordPress issues and improved our site speed. Reliable and efficient.",
        name: "Robert Brown",
        role: "Operations Manager",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Set up our pages in Elementor beautifully. Everything is responsive and looks great on mobile.",
        name: "Jessica Lee",
        role: "Marketing Manager",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Professional, detail-oriented, and easy to work with. Also helped with admin tasks beyond the website.",
        name: "Daniel Brooks",
        role: "Startup Founder",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Handled our website updates and integrations without any problems. Smooth experience from start to finish.",
        name: "Olivia Martinez",
        role: "Startup Founder",
        source: "Framer.com"
    },
    {
        rating: 5,
        quote: "Very dependable virtual assistant with strong technical skills in WordPress and website management.",
        name: "Kevin Rodriguez",
        role: "Small Business Owner",
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
    { title: "WordPress &\nElementor", icon: Layout },
    { title: "GHL\nSpecialist", icon: Zap },
    { title: "Web\nDevelopment", icon: Code2 },
    { title: "Virtual\nAssistant", icon: Headset },
    { title: "Marketing\nIntegrations", icon: Puzzle },
    { title: "SEO\nOptimization", icon: Search },
    { title: "Speed\nOptimization", icon: Gauge },
    { title: "CRM\nAutomation", icon: Bot },
];
