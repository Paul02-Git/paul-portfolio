import { blogPosts } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

// Served at /llms.txt — a curated, LLM-friendly map of the site's key content
// (https://llmstxt.org/). Derives its base URL from SITE_URL and auto-includes
// blog posts, so it stays in sync on a domain change just like sitemap/robots.
export const dynamic = "force-static";

export function GET() {
    const base = SITE_URL;

    // [path, label, description]
    const pages: [string, string, string][] = [
        ["/", "Home", "Overview of Paul Puzon's services, results, and positioning as a WordPress & GoHighLevel specialist."],
        ["/services", "Services", "WordPress/Elementor development, GoHighLevel setup & automation, web development, Shopify & Printify, virtual assistant work, and marketing integrations."],
        ["/pricing", "Pricing", "Packages and pricing for website builds and ongoing work."],
        ["/portfolio", "Portfolio", "Selected websites and systems built for clients worldwide."],
        ["/about", "About", "Who Paul is, how he works, and why clients trust him with their websites."],
        ["/contact", "Contact", "Get in touch with project details for a reply within 24–48 hours."],
        ["/book-a-call", "Book a Call", "Book a free discovery call to scope a project."],
    ];

    const pageList = pages
        .map(([path, label, desc]) => `- [${label}](${base}${path}): ${desc}`)
        .join("\n");

    const blogList = blogPosts
        .map((post) => `- [${post.title}](${base}/blog/${post.slug}): ${post.excerpt}`)
        .join("\n");

    const body = `# Paul Puzon — WordPress Developer & GoHighLevel Specialist

> Freelance WordPress (Elementor) developer and GoHighLevel specialist based in the Philippines, building fast, conversion-focused websites and marketing-automation systems for small businesses worldwide.

Paul Puzon has 7+ years of experience and 50+ delivered projects. Work spans WordPress/Elementor sites, GoHighLevel (GHL) CRM setup and automation, Shopify & Printify stores, web development, virtual assistant support, and marketing/analytics integrations (GA4, Google Tag Manager, Klaviyo). The focus is on websites that load fast, look professional, and turn visitors into real leads.

## Main Pages

${pageList}

## Blog

${blogList}

## Optional

- [Blog Index](${base}/blog): All articles on web design, SEO, and automation.
- [Privacy Policy](${base}/privacy)
- [Terms of Service](${base}/terms)
`;

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=0, must-revalidate",
        },
    });
}
