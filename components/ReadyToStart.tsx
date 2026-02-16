import Link from "next/link";
import { Calendar } from "lucide-react";

export const ReadyToStart = () => {
    return (
        <section className="p-8 bg-primary/10 border-2 border-primary/20 rounded-lg text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-[46ch] mx-auto">
                Book a free 30-minute consultation to discuss your project. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="https://calendly.com/paulpuzon0007/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-[8px] hover:bg-primary/90 transition-colors"
                >
                    <Calendar className="w-5 h-5" />
                    Book Free Consultation
                </Link>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-[8px] hover:bg-primary/10 transition-colors"
                >
                    Let&apos;s Work
                </Link>
            </div>
        </section>
    );
};
