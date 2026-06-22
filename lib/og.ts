/**
 * Builds the social share-image descriptor for a page, pointing at the
 * dynamic /api/og route. Pass a per-page title/eyebrow/subtitle and the
 * card is generated to match. Edit the design in app/api/og/route.tsx.
 */
export function ogImage(opts: { title?: string; eyebrow?: string; subtitle?: string } = {}) {
  const p = new URLSearchParams();
  if (opts.title) p.set("title", opts.title);
  if (opts.eyebrow) p.set("eyebrow", opts.eyebrow);
  if (opts.subtitle) p.set("subtitle", opts.subtitle);
  const qs = p.toString();
  return {
    url: `/api/og${qs ? `?${qs}` : ""}`,
    width: 1200,
    height: 630,
    alt: opts.title ? `${opts.title}, Paul Puzon` : "Paul Puzon, WordPress & GoHighLevel Specialist",
  };
}
