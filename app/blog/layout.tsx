import { Metadata } from 'next';
import { ogImage } from '@/lib/og';

const OG = ogImage({ eyebrow: 'Blog', title: 'WordPress, GHL & Marketing Insights' });

export const metadata: Metadata = {
    title: 'Blog | WordPress, GHL & Marketing Insights',
    description: 'Expert insights on WordPress development, GoHighLevel automation, and marketing to build high-converting websites.',
    keywords: [
        'WordPress Blog',
        'GoHighLevel Tutorials',
        'Web Development Tips',
        'Marketing Automation Guide',
        'Elementor Tips',
        'SEO Best Practices',
        'GHL Workflows',
        'WordPress Optimization',
        'Digital Marketing Insights',
        'Web Development Blog',
        'Technical SEO',
        'CRM Automation Tips'
    ],
    openGraph: {
        title: 'Blog | WordPress, GHL & Marketing Insights',
        description: 'Expert insights on WordPress development, GoHighLevel automation, and marketing to build high-converting websites.',
        images: [OG],
    },
    twitter: {
        card: 'summary_large_image',
        images: [OG.url],
        title: 'Blog | WordPress, GHL & Web Development Tips',
        description: 'Read the latest tutorials, guides, and insights on WordPress, Elementor, GoHighLevel, and web development.',
    },
    alternates: {
        canonical: '/blog'
    }
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
