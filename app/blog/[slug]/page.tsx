import { Metadata } from 'next';
import { blogPosts } from '@/data/portfolio';
import BlogPostClient from './BlogPostClient';

const siteUrl = 'https://paul-portfolio.vercel.app';

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${siteUrl}${post.image}`,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        author: {
            "@type": "Person",
            name: "Paul Puzon",
            url: siteUrl
        },
        publisher: {
            "@type": "Organization",
            name: "Paul Puzon | WordPress & GHL Specialist",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/images/logo.png`
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${post.slug}`
        }
    };

    return {
        title: post.title,
        description: post.excerpt,
        keywords: [post.category, 'WordPress', 'GoHighLevel', 'Web Development', 'Marketing'],
        authors: [{ name: 'Paul Puzon' }],
        openGraph: {
            type: 'article',
            url: `${siteUrl}/blog/${post.slug}`,
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: `${siteUrl}${post.image}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            publishedTime: new Date(post.date).toISOString(),
            authors: ['Paul Puzon'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [`${siteUrl}${post.image}`],
            creator: '@paulpuzon',
        },
        other: {
            'article:schema': JSON.stringify(articleSchema),
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return <BlogPostClient slug={params.slug} />;
}
