import { Metadata } from 'next';
import { ogImage } from '@/lib/og';

const OG = ogImage({ eyebrow: 'Pricing', title: "Simple Pricing That's Built to Convert" });

export const metadata: Metadata = {
    title: 'Pricing | WordPress Website Packages & Rates',
    description: 'Simple, transparent pricing for custom WordPress & Elementor websites. Fixed scope, fixed price, no surprise invoices.',
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
        description: 'Simple, transparent pricing for custom WordPress & Elementor websites, fixed scope, fixed price, no surprise invoices.',
        type: 'website',
        images: [OG],
    },
    twitter: {
        card: 'summary_large_image',
        images: [OG.url],
        title: 'Pricing | WordPress Website Packages & Rates',
        description: 'Simple, transparent pricing for custom WordPress & Elementor websites, fixed scope, fixed price, no surprise invoices.',
    },
    alternates: {
        canonical: '/pricing'
    }
};

const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Website Development",
    serviceType: "Web Development",
    provider: { "@type": "Person", name: "Paul Puzon" },
    areaServed: "Worldwide",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "WordPress Website Packages",
        itemListElement: [
            { "@type": "Offer", name: "Launch", price: "750", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "Launch plan" } },
            { "@type": "Offer", name: "Growth", price: "1800", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "Growth plan" } },
            { "@type": "Offer", name: "Scale", price: "3500", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "Scale plan" } },
        ],
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            {children}
        </>
    );
}
