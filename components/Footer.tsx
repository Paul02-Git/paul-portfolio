import React from "react";

export const Footer = () => {
    return (
        <footer className="text-center py-10 opacity-60 mt-auto">
            <p className="text-xs font-medium text-muted-foreground">
                © {new Date().getFullYear()} <span className="text-foreground">Paul Puzon</span>. Crafted with ❤️ for Digital Excellence.
            </p>
        </footer>
    );
};
