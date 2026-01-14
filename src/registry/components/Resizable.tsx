import { cn } from "@/lib/utils";

export function Resizable({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("flex h-full w-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 p-4 shadow-inner overflow-hidden", className)}>
            {children}
        </div>
    );
}

export function ResizablePanel({ children, className, flex = 1 }: { children: React.ReactNode, className?: string, flex?: number }) {
    return (
        <div className={cn("rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-lg overflow-auto", className)} style={{ flex }}>
            {children}
        </div>
    );
}

export function ResizableHandle({ className }: { className?: string }) {
    return (
        <div className={cn("flex w-4 cursor-col-resize items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group", className)}>
            <div className="h-8 w-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-inner group-hover:bg-neutral-400 transition-colors flex flex-col items-center justify-center gap-1">
                <div className="size-0.5 rounded-full bg-white dark:bg-black" />
                <div className="size-0.5 rounded-full bg-white dark:bg-black" />
                <div className="size-0.5 rounded-full bg-white dark:bg-black" />
            </div>
        </div>
    );
}
