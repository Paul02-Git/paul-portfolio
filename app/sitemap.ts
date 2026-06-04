import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/portfolio';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;
    // Fixed "last meaningful update" for static pages — avoids signalling that
    // every page changed on every deploy (which erodes lastmod trust).
    const lastUpdated = new Date('2026-06-01');

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: lastUpdated,
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: lastUpdated,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: lastUpdated,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: lastUpdated,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: lastUpdated,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: lastUpdated,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/book-a-call`,
            lastModified: lastUpdated,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: lastUpdated,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: lastUpdated,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: lastUpdated,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

    // Dynamic blog posts
    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
}
