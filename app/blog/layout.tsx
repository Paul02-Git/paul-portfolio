import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | WordPress, GHL & Marketing Insights',
    description: 'Expert insights on WordPress development, GoHighLevel automation, and marketing strategies. Learn how to build high-converting websites and automate your business.',
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
        description: 'Expert insights on WordPress development, GoHighLevel automation, and marketing strategies. Learn how to build high-converting websites and automate your business.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | WordPress, GHL & Web Development Tips',
        description: 'Read the latest tutorials, guides, and insights on WordPress, Elementor, GoHighLevel, and web development.',
    },
    alternates: {
        canonical: 'https://paul-portfolio.vercel.app/blog'
    }
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
