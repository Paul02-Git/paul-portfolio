import { Metadata } from 'next';
import { ogImage } from '@/lib/og';

const OG = ogImage({ eyebrow: 'About', title: "I'm a Specialist in Web Design & Development" });

export const metadata: Metadata = {
    title: 'About Paul | WordPress & GHL Specialist',
    description: 'Learn about Paul Puzon, a passionate WordPress specialist with 7+ years of experience building high-performing, accessible websites for clients worldwide.',
    keywords: [
        'Paul Puzon',
        'WordPress Specialist',
        'About WordPress Developer',
        'Web Developer Background',
        'Elementor Expert Bio',
        'GoHighLevel Specialist',
        'Freelance WordPress Developer'
    ],
    openGraph: {
        title: 'About Paul | WordPress & GHL Specialist',
        description: 'Learn about Paul Puzon, a passionate WordPress specialist with 7+ years of experience.',
        type: 'profile',
        images: [OG],
    },
    twitter: {
        card: 'summary_large_image',
        images: [OG.url],
        title: 'About Paul | WordPress & GHL Specialist',
        description: 'Learn about Paul Puzon, a passionate WordPress specialist with 7+ years of experience.',
    },
    alternates: {
        canonical: '/about'
    }
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
