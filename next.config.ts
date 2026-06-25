import type { NextConfig } from "next";

// 'unsafe-eval' and websocket connections are only needed by the dev server
// (React Refresh / HMR). Production gets the tighter policy.
const isDev = process.env.NODE_ENV !== "production";

// Hosts for Google Tag Manager, GA4 (gtag) and Microsoft Clarity — required so the
// CSP doesn't block gtm.js / analytics scripts. connect-src already allows https:.
const analyticsScriptHosts =
  "https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms";

const contentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsScriptHosts};
  connect-src 'self' https:${isDev ? " ws: wss:" : ""};
  frame-src 'self' https://www.google.com;
  object-src 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 90, 92, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.thegenielab.com",
      },
      {
        protocol: "https",
        hostname: "www.vectorlogo.zone",
      },
      {
        protocol: "https",
        hostname: "s.w.org",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
