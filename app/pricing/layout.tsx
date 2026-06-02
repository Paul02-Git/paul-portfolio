import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | WordPress Website Packages & Rates',
    description: 'Simple, transparent pricing for custom WordPress & Elementor websites. Fixed scope, fixed price, no surprise invoices — packages built to turn visitors into leads.',
    keywords: [
        'WordPress Website Pricing',
        'WordPress Developer Rates',
        'Website Design Packages',
        'Elementor Development Cost',
        'GoHighLevel Setup Pricing',
        'Web Development Pricing',
        'Custom Website Cost',
        'WordPress Freelancer Pricing'
    ],
    openGraph: {
        title: 'Pricing | WordPress Website Packages & Rates',
        description: 'Simple, transparent pricing for custom WordPress & Elementor websites — fixed scope, fixed price, no surprise invoices.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pricing | WordPress Website Packages & Rates',
        description: 'Simple, transparent pricing for custom WordPress & Elementor websites — fixed scope, fixed price, no surprise invoices.',
    },
    alternates: {
        canonical: 'https://paul-portfolio-drab.vercel.app/pricing'
    }
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
