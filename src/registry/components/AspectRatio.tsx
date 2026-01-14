import React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps {
    ratio?: number;
    children: React.ReactNode;
    className?: string;
}

export function AspectRatio({ ratio = 1 / 1, children, className }: AspectRatioProps) {
    return (
        <div
            className={cn("relative w-full overflow-hidden rounded-xl border-2 border-border/50 group", className)}
            style={{
                paddingBottom: `${(1 / ratio) * 100}%`,
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
        >
            <div
                className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{
                    transform: "translateZ(10px)",
                }}
            >
                {children}
            </div>

            {/* 3D Glass Layer */}
            <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    transform: "translateZ(15px)",
                }}
            />
        </div>
    );
}
