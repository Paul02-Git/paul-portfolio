import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => (
    <div
        className={cn("bg-white/80 backdrop-blur-xl border border-white/20 rounded-lg p-card shadow-md shadow-black/10 overflow-hidden", className)}
        {...props}
    >
        {children}
    </div>
);
