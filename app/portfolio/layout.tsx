import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portfolio | WordPress & Web Development Projects',
    description: 'View my latest WordPress, Elementor, and web development projects. High-quality websites built for clients worldwide with technical excellence and user-centric design.',
    keywords: [
        'WordPress Portfolio',
        'Web Development Projects',
        'Elementor Websites',
        'Client Work Showcase',
        'Website Design Portfolio',
        'WordPress Case Studies',
        'Landing Page Examples',
        'GoHighLevel Projects',
        'Professional Websites',
        'Web Design Gallery'
    ],
    openGraph: {
        title: 'Portfolio | WordPress & Web Development Projects',
        description: 'View my latest WordPress, Elementor, and web development projects. High-quality websites built for clients worldwide with technical excellence and user-centric design.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio | WordPress & Web Development Projects',
        description: 'View my latest WordPress, Elementor, and web development projects.',
    },
    alternates: {
        canonical: 'https://paul-portfolio-drab.vercel.app/portfolio'
    }
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
