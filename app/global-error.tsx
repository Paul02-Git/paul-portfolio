"use client";

import { useEffect } from "react";

// Catches errors in the root layout itself. It replaces the whole document,
// so it must render its own <html>/<body> and can't rely on the app's CSS.
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    fontFamily: "system-ui, sans-serif",
                    minHeight: "100vh",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#F8FAFC",
                    color: "#181818",
                }}
            >
                <div style={{ textAlign: "center", padding: "2rem", maxWidth: "40ch" }}>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Something went wrong</h1>
                    <p style={{ color: "#707070", marginTop: "0.5rem" }}>
                        A critical error occurred. Please reload the page.
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            marginTop: "1.5rem",
                            padding: "0.65rem 1.5rem",
                            borderRadius: 8,
                            border: "none",
                            background: "#108a00",
                            color: "#fff",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Reload
                    </button>
                </div>
            </body>
        </html>
    );
}
