import React from "react";
import { cn } from "@/lib/utils";

export function ScrollArea({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("relative overflow-hidden group", className)}>
            <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">
                {children}
            </div>

            {/* 3D Scrollbar Mimic */}
            <div className="absolute top-2 right-1 bottom-2 w-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="h-1/3 w-full rounded-full bg-neutral-400 dark:bg-neutral-500 shadow-sm" />
            </div>
        </div>
    );
}
