import { ArrowUpRight } from "lucide-react";

interface SectionTitleProps {
    children: React.ReactNode;
    link?: string;
    linkText?: string;
}

export const SectionTitle = ({ children, link, linkText = "Explore All" }: SectionTitleProps) => (
    <div className="flex justify-between items-center mb-6 md:mb-4">
        <h2 className="">{children}</h2>
        {link && (
            <a href={link} className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group">
                {linkText} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
        )}
    </div>
);
