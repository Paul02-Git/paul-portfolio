// Lightweight GTM dataLayer helper. The GTM container is loaded in app/layout.tsx;
// these pushes feed Custom Event triggers inside GTM (e.g. generate_lead,
// newsletter_signup) which in turn fire the GA4 event tags.

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

/** Push a named event (plus optional params) onto the GTM dataLayer. No-op on the server. */
export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}
