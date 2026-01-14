

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="relative group">
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm",
                    className
                )}
                {...props}
            />
            {/* Recessed Shadow Box Effect */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" />
        </div>
    );
}
