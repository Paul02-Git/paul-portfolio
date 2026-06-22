import type { Metadata } from "next";
import { Inter, Belanosima } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";
import { ThemeScript } from "@/components/ThemeScript";
import { Footer } from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  // Pin only the weights we use instead of the full variable axis, a much
  // smaller woff2 that arrives inside the "optional" window, so no flash.
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  // "optional" = no visible swap/flash: the browser uses the font only if it's
  // ready within ~100ms, otherwise it keeps the matched fallback for that pageview.
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

const belanosima = Belanosima({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-belanosima",
  display: "optional",
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

const siteUrl = SITE_URL;
const siteName = SITE_NAME;
const siteDescription = "I build conversion-focused WordPress websites and GoHighLevel systems that automate follow-ups and increase client acquisition.";

// Google Tag Manager, container ID is public (rendered in page HTML). Override via env per environment.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PV257VBJ";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "HIRE PAUL",
  },
  title: {
    default: "Paul Puzon | WordPress Developer Philippines | Hire Elementor Expert",
    template: "%s | Paul Puzon"
  },
  description: "Hire a WordPress developer with 7+ years experience & 50+ projects delivered, Elementor & GoHighLevel specialist based in the Philippines.",
  keywords: [
    "WordPress Developer",
    "WordPress Developer Philippines",
    "Hire WordPress Developer",
    "GoHighLevel Specialist",
    "GHL Expert in Philippines",
    "Elementor Developer",
    "Elementor Expert in the Philippines",
    "Web Development",
    "Marketing Automation",
    "CRM Integration",
    "Lead Generation",
    "Virtual Assistant",
    "SEO Optimization",
    "Hire Elementor Expert",
    "WordPress Developer for Hire"
  ],
  authors: [{ name: "Paul Puzon" }],
  creator: "Paul Puzon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Paul | Get More Leads & Booked Calls With WordPress & GHL",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Paul Puzon - WordPress & GHL Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul | Get More Leads & Booked Calls With WordPress & GHL",
    description: siteDescription,
    images: [`${siteUrl}/api/og`],
    creator: "@paulpuzon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "gRE2C5nqu6rMyDkVtVDI8pBMvzj2uA-sKN2b_6zIhyI", // User will need to add this
  },
};

// JSON-LD Schema Markup
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Puzon",
  url: siteUrl,
  image: `${siteUrl}/images/og-image.png`,
  jobTitle: "WordPress Developer & GoHighLevel Specialist",
  description: siteDescription,
  knowsAbout: [
    "WordPress Development",
    "GoHighLevel",
    "Elementor",
    "Web Development",
    "Marketing Automation",
    "CRM Integration",
    "SEO Optimization",
    "Virtual Assistant Services"
  ],
  sameAs: [
    "https://www.linkedin.com/in/paul-puzon-932b86303/",
    "https://www.facebook.com/paul.puzon73/",
    "https://www.youtube.com/@paulpuzon73",
    "https://wa.me/639914075808"

  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/images/paul_logo.png`,
  description: siteDescription,
  founder: {
    "@type": "Person",
    name: "Paul Puzon"
  },
  areaServed: "Worldwide",
  serviceType: [
    "WordPress Development",
    "GoHighLevel Setup",
    "Web Development",
    "Marketing Automation",
    "CRM Integration"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${belanosima.variable} overflow-x-clip`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background relative overflow-x-clip" suppressHydrationWarning>
        {/* Google Tag Manager (noscript), fallback for JS-disabled clients */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ThemeManager />

        <div className="container-page pt-6 relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
