import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => (
    <div
        className={cn("bg-card border border-border rounded-sm p-6 shadow-sm overflow-hidden", className)}
    >
        {children}
    </div>
);
