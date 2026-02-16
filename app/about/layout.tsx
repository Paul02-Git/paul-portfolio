import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Paul | WordPress & GHL Specialist',
    description: 'Learn about Paul Puzon, a passionate WordPress specialist with 4+ years of experience building high-performing, accessible websites for clients worldwide.',
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
        description: 'Learn about Paul Puzon, a passionate WordPress specialist with 4+ years of experience.',
        type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Paul | WordPress & GHL Specialist',
        description: 'Learn about Paul Puzon, a passionate WordPress specialist with 4+ years of experience.',
    },
    alternates: {
        canonical: 'https://paul-portfolio-drab.vercel.app/about'
    }
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
