import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | WordPress, GHL & Web Development',
    description: 'Professional WordPress development, GoHighLevel setup, web development, and marketing automation services. Get high-converting websites and automated systems.',
    keywords: [
        'WordPress Development Services',
        'GoHighLevel Setup',
        'GHL Services',
        'Elementor Development',
        'Web Development Services',
        'Marketing Automation',
        'CRM Integration Services',
        'WordPress Consultant'
    ],
    openGraph: {
        title: 'Services | WordPress, GHL & Web Development',
        description: 'Professional WordPress development, GoHighLevel setup, and web development services.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Services | WordPress, GHL & Web Development',
        description: 'Professional WordPress development, GoHighLevel setup, and web development services.',
    },
    alternates: {
        canonical: 'https://paul-portfolio.vercel.app/services'
    }
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
