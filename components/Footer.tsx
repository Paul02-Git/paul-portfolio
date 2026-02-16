import React from "react";

export const Footer = () => {
    return (
        <footer className="text-center py-10 mt-auto">
            <p className="text-xs font-medium text-foreground/70">
                © {new Date().getFullYear()} <span className="text-foreground font-bold">Paul Puzon</span>. Crafted with ❤️ for Digital Excellence.
            </p>
        </footer>
    );
};
