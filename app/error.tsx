"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";
import Navbar from "@/components/Navbar";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to the console (swap for a real error reporter in production).
        console.error(error);
    }, [error]);

    return (
        <main className="pt-28 md:pt-32 pb-20 min-h-[70vh] flex items-center">
            <Navbar />
            <div className="mx-auto max-w-[50ch] text-center">
                <p className="text-primary font-bold uppercase tracking-widest text-sm">Error</p>
                <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Something Went Wrong</h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    An unexpected error occurred. Please try again — if it keeps happening, get in touch.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <Button onClick={reset}>Try Again</Button>
                    <Button href="/" variant="outline">Back Home</Button>
                </div>
            </div>
        </main>
    );
}
