/**
 * Single source of truth for the site's base URL and name.
 * Change the domain here (or via NEXT_PUBLIC_SITE_URL) when moving to a custom
 * domain, everything else (sitemap, robots, canonicals, OG, schema) derives
 * from this.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://paul-portfolio-drab.vercel.app").replace(/\/$/, "");

export const SITE_NAME = "Paul Puzon | WordPress & GHL Specialist";
