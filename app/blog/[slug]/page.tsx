import { Metadata } from 'next';
import { blogPosts } from '@/data/portfolio';
import BlogPostClient from './BlogPostClient';
import { SITE_URL, SITE_NAME } from '@/lib/site';

type BlogPost = (typeof blogPosts)[number];

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

function buildArticleSchema(post: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}${post.image}`,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        author: {
            "@type": "Person",
            name: "Paul Puzon",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/images/paul_logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
        },
    };
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: [post.category, 'WordPress', 'GoHighLevel', 'Web Development', 'Marketing'],
        authors: [{ name: 'Paul Puzon' }],
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            url: `${SITE_URL}/blog/${post.slug}`,
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: `${SITE_URL}${post.image}`,
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
            images: [`${SITE_URL}${post.image}`],
            creator: '@paulpuzon',
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    return (
        <>
            {post && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }}
                />
            )}
            <BlogPostClient slug={slug} />
        </>
    );
}
