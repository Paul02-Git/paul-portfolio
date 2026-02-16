import type { Metadata } from "next";

const siteUrl = "https://paul-portfolio.vercel.app";

export const metadata: Metadata = {
    title: "Hire WordPress Developer | Paul Puzon | Elementor & GHL Expert",
    description: "Ready to hire a WordPress developer? Get a free consultation. 4+ years experience, 50+ projects delivered. Elementor, GoHighLevel, and full-stack development services. Fast turnaround, transparent pricing.",
    keywords: [
        "Hire WordPress Developer",
        "WordPress Developer for Hire",
        "Hire Elementor Developer",
        "Hire Elementor Expert",
        "Freelance WordPress Developer",
        "WordPress Developer Philippines",
        "GoHighLevel Developer for Hire",
        "Hire GHL Expert",
        "WordPress Consultant",
        "Elementor Specialist for Hire"
    ],
    openGraph: {
        title: "Hire WordPress Developer | Paul Puzon",
        description: "Get a free consultation with an experienced WordPress & Elementor developer. 50+ projects delivered worldwide.",
        url: `${siteUrl}/hire`,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hire WordPress Developer | Paul Puzon",
        description: "Get a free consultation with an experienced WordPress & Elementor developer. 50+ projects delivered worldwide.",
    },
    alternates: {
        canonical: `${siteUrl}/hire`
    }
};

export default function HireLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
