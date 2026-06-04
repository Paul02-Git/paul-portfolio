import { Metadata } from 'next';
import { ogImage } from '@/lib/og';

const OG = ogImage({ eyebrow: 'Contact', title: "Let's Build Something Great" });

export const metadata: Metadata = {
    title: 'Contact | Get in Touch with Paul',
    description: 'Ready to build your next WordPress website or automate your business with GoHighLevel? Contact Paul Puzon for professional web development services.',
    keywords: [
        'Hire WordPress Developer',
        'Contact Web Developer',
        'GoHighLevel Consultant',
        'Freelance WordPress Expert',
        'Web Development Quote',
        'Hire Elementor Developer',
        'WordPress Project Inquiry',
        'Get Web Development Help',
        'Book Consultation',
        'Hire Virtual Assistant'
    ],
    openGraph: {
        title: 'Contact | Get in Touch with Paul',
        description: 'Ready to build your next WordPress website or automate your business with GoHighLevel? Contact Paul Puzon for professional web development services.',
        images: [OG],
    },
    twitter: {
        card: 'summary_large_image',
        images: [OG.url],
        title: 'Contact Paul | Hire WordPress Developer',
        description: 'Get in touch to discuss your WordPress, Elementor, or GoHighLevel project. Free consultation available.',
    },
    alternates: {
        canonical: '/contact'
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
