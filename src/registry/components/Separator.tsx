
import { cn } from "@/lib/utils";

interface SeparatorProps {
    orientation?: "horizontal" | "vertical";
    className?: string;
}

export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
    return (
        <div
            className={cn(
                "shrink-0 bg-border relative",
                orientation === "horizontal" ? "h-[1px] w-full my-4" : "h-full w-[1px] mx-4",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {/* 3D Depth Shadow */}
            <div
                className="absolute inset-0 bg-black/5 dark:bg-white/5"
                style={{
                    transform: `translateZ(-2px) ${orientation === "horizontal" ? "translateY(1px)" : "translateX(1px)"}`,
                }}
            />
        </div>
    );
}
