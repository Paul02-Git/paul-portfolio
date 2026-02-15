import Image from "next/image";
import { Tool } from "@/types/portfolio";

interface ExpertAreaProps {
    tools: Tool[];
}

export const ExpertArea = ({ tools }: ExpertAreaProps) => (
    <div className="grid grid-cols-3 gap-grid">
        {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center group text-xs font-medium">
                <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-lg bg-muted/50 flex items-center justify-center p-2 group-hover:bg-muted relative mb-2">
                    <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill={true}
                        className="p-4 object-contain transition-transform group-hover:scale-110"
                    />
                </div>
                <span className="text-foreground">{tool.name}</span>
            </div>
        ))}
    </div>
);
