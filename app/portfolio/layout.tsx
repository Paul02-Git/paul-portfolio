import { Metadata } from 'next';
import { ogImage } from '@/lib/og';

const OG = ogImage({ eyebrow: 'Portfolio', title: 'Selected Work & Projects' });

export const metadata: Metadata = {
    title: 'Portfolio | WordPress & Web Development Projects',
    description: 'View my latest WordPress, Elementor, and web development projects — high-quality websites built for clients worldwide.',
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
        description: 'View my latest WordPress, Elementor, and web development projects — high-quality websites built for clients worldwide.',
        images: [OG],
    },
    twitter: {
        card: 'summary_large_image',
        images: [OG.url],
        title: 'Portfolio | WordPress & Web Development Projects',
        description: 'View my latest WordPress, Elementor, and web development projects.',
    },
    alternates: {
        canonical: '/portfolio'
    }
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
