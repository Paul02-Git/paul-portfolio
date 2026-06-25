import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            // Allow the OG image route so crawlers can fetch social/preview images;
            // the more specific allow wins over the /api/ disallow below.
            allow: ['/', '/api/og'],
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
