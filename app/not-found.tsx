import { Button } from "@/components/Button";
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <main className="pt-28 md:pt-32 pb-20 min-h-[70vh] flex items-center">
            <Navbar />
            <div className="mx-auto max-w-[50ch] text-center">
                <p className="text-primary font-bold uppercase tracking-widest text-sm">404</p>
                <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Page Not Found</h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <Button href="/">Back Home</Button>
                    <Button href="/contact" variant="outline">Get In Touch</Button>
                </div>
            </div>
        </main>
    );
}
