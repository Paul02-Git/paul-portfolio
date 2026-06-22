import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Paul Puzon collects, uses, and protects your information when you use this website or get in touch.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "June 3, 2026";

const sections: { title: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    title: "Overview",
    paragraphs: [
      "This Privacy Policy explains what information is collected when you visit this website or contact me (Paul Puzon), how it is used, and the choices you have. I keep things minimal, I only collect what's needed to respond to you and to understand how the site is performing.",
    ],
  },
  {
    title: "Information I Collect",
    paragraphs: ["I may collect the following:"],
    bullets: [
      "Information you provide, your name, email address, and any details you include when you submit the contact form or book a call.",
      "Usage data, basic, anonymised analytics such as pages visited, device type, and referral source, collected through tools like Google Analytics 4, Google Tag Manager, and Microsoft Clarity.",
    ],
  },
  {
    title: "How I Use Your Information",
    bullets: [
      "To respond to your enquiry and provide the services you request.",
      "To improve the website's content, speed, and user experience.",
      "To send information you've asked for, such as a project proposal.",
    ],
  },
  {
    title: "Cookies & Analytics",
    paragraphs: [
      "This site uses cookies and similar technologies to measure traffic and improve performance. These analytics tools may set cookies in your browser. You can disable cookies in your browser settings at any time, the site will still work, though some measurement may be limited.",
    ],
  },
  {
    title: "Sharing Your Information",
    paragraphs: [
      "I do not sell or rent your personal information. Data may be processed by trusted third-party services that help run this site and my business (for example analytics providers, email, and scheduling tools), and only to the extent needed to deliver those services.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "I keep enquiry and project information only as long as needed to respond to you, deliver work, and meet legal or accounting obligations. You can ask me to delete your information at any time.",
    ],
  },
  {
    title: "Your Rights",
    paragraphs: [
      "You can request access to, correction of, or deletion of the personal information you've shared with me. To make a request, just get in touch using the details below.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about this policy? Email me at paulpuzon0007@gmail.com and I'll be happy to help.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="page-top">
      <Navbar />

      <section className="section-yb max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="space-y-3">
              <h2 className="text-xl text-foreground">{s.title}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="text-muted-foreground leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
