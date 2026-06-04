import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use this website or work with Paul Puzon on a web development or automation project.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "June 3, 2026";

const sections: { title: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By using this website or engaging my services, you agree to these Terms of Service. If you don't agree, please don't use the site or services. These terms are written in plain language and are meant to set clear, fair expectations on both sides.",
    ],
  },
  {
    title: "Services",
    paragraphs: [
      "I (Paul Puzon) provide WordPress and Elementor website development, GoHighLevel CRM and automation setup, and related web services. The exact scope, deliverables, timeline, and price for any project are agreed in writing before work begins.",
    ],
  },
  {
    title: "Scope & Payments",
    bullets: [
      "Each project is quoted with a fixed scope and price — no surprise invoices.",
      "Payments are typically split 50% to start and 50% on launch, unless otherwise agreed.",
      "Work outside the agreed scope is quoted separately before it's carried out.",
    ],
  },
  {
    title: "Revisions",
    paragraphs: [
      "Each package includes a set number of revision rounds, as outlined in your proposal. Additional revisions can be arranged as a small add-on.",
    ],
  },
  {
    title: "Ownership",
    paragraphs: [
      "Once final payment is received, you own your website, domain, and associated accounts in full. Until then, deliverables remain my property. Third-party tools, plugins, and assets remain subject to their own licenses.",
    ],
  },
  {
    title: "Client Responsibilities",
    paragraphs: [
      "To keep your project on schedule, you agree to provide content, brand assets, access, and timely feedback. Delays in providing these may affect the agreed timeline.",
    ],
  },
  {
    title: "Third-Party Tools",
    paragraphs: [
      "Projects may rely on third-party platforms and services (such as hosting, WordPress, GoHighLevel, and analytics tools). I'm not responsible for outages, changes, or issues caused by those third parties, though I'll always do my best to help resolve them.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Services are provided on a best-effort, professional basis. To the fullest extent permitted by law, I'm not liable for any indirect or consequential loss arising from the use of the website or the services. Nothing in these terms limits liability that can't be limited by law.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "These terms may be updated from time to time. The latest version will always be posted on this page with an updated date.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms? Email me at paulpuzon0007@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="pt-28 md:pt-32">
      <Navbar />

      <section className="section-yb max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">{s.title}</h2>
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
