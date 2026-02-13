import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";
import { ThemeScript } from "@/components/ThemeScript";
import { DynamicBackground } from "@/components/DynamicBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul — Personal Portfolio",
  description: "A premium, high-converting bento-style portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased bg-slate-50 relative overflow-x-hidden bg-grain-refined" suppressHydrationWarning>
        <ThemeManager />
        <DynamicBackground />

        <div className="min-h-screen max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6 py-6 relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
