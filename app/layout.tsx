import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";
import { ThemeManager } from "@/components/ThemeManager";

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
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased bg-slate-50 relative overflow-x-hidden bg-grain-refined" suppressHydrationWarning>
        <ThemeManager />
        {/* Rich Theme-Aligned Mesh Gradient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#F7DB91]/30 blur-[100px] rounded-full animate-rotate-slower" style={{ animationDuration: '40s' }} />
          <div className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] bg-[#83D475]/15 blur-[100px] rounded-full animate-float" />
          <div className="absolute bottom-[-10%] left-[10%] w-[55%] h-[50%] bg-[#83D475]/15 blur-[100px] rounded-full animate-rotate-fast" style={{ animationDirection: 'reverse', animationDuration: '35s' }} />
          <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[50%] bg-[#F7DB91]/15 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-5s' }} />

          <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
            <Particles
              particleColors={["#108a00", "#56AB2F"]}
              particleCount={150}
              particleSpread={10}
              speed={0.4}
              particleBaseSize={40}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>
        </div>

        <div className="min-h-screen max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-6 py-6 relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
