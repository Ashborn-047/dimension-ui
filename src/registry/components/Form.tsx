import React from "react";
import { cn } from "@/lib/utils";

export function Form({ children, className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
    return (
        <form className={cn("space-y-6", className)} {...props}>
            {children}
        </form>
    );
}

export function FormItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function FormLabel({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <label className={cn("text-sm font-bold leading-none tracking-tight text-neutral-700 dark:text-neutral-300", className)}>
            {children}
        </label>
    );
}

export function FormControl({ children }: { children: React.ReactNode }) {
    return <div className="relative">{children}</div>;
}

export function FormDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-[13px] text-neutral-500 dark:text-neutral-400", className)}>{children}</p>;
}

export function FormMessage({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-[13px] font-medium text-neutral-900 dark:text-neutral-100 italic animate-in fade-in slide-in-from-top-1", className)}>{children}</p>;
}
