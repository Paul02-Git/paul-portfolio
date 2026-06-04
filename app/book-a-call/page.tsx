import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { DiscoveryCallForm } from "@/components/DiscoveryCallForm";

export const metadata: Metadata = {
    title: "Book a Free Discovery Call",
    description:
        "Tell me about your project and request a free discovery call. WordPress, GoHighLevel, e-commerce & web development for service businesses.",
    alternates: { canonical: "/book-a-call" },
};

export default function BookACallPage() {
    return (
        <main className="pb-24 pt-24 md:pt-32 gap-4">
            <Navbar />

            {/* Header */}
            <div className="text-center mb-10 max-w-[70ch] mx-auto">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">No Pressure, No Obligation</p>
                <h1 className="font-bold tracking-tight max-w-[10ch] md:max-w-[40ch] mx-auto">Book a Free Discovery Call</h1>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                    Share a few details about your project and I&apos;ll get back to you to schedule your free
                    discovery call — we&apos;ll map out the right scope and next steps, whether you hire me or not.
                </p>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto">
                <DiscoveryCallForm />
            </div>
        </main>
    );
}
