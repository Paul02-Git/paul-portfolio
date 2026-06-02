import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";
import { ThemeScript } from "@/components/ThemeScript";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = "https://paul-portfolio-drab.vercel.app";
const siteName = "Paul Puzon | WordPress & GHL Specialist";
const siteDescription = "I build conversion-focused WordPress websites and GoHighLevel systems that automate follow-ups and increase client acquisition.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
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
  description: "Hire a WordPress developer with 4+ years experience. 50+ projects delivered. Elementor & GoHighLevel specialist based in Philippines. Free consultation available.",
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
        url: `${siteUrl}/images/og-image.png`,
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
    images: [`${siteUrl}/images/og-image.png`],
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
  logo: `${siteUrl}/app/favicon.ico`,
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
    <html lang="en" className={`${spaceGrotesk.variable} overflow-x-clip`} suppressHydrationWarning>
      <head>
        <ThemeScript />
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
        <ThemeManager />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6 pt-6 relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
