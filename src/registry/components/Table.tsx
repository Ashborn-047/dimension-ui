import React from "react";
import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className="relative w-full overflow-auto rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl">
            <table className={cn("w-full caption-bottom text-sm", className)}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children, className }: { children: React.ReactNode, className?: string }) {
    return <thead className={cn("[&_tr]:border-b-2 dark:[&_tr]:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50", className)}>{children}</thead>;
}

export function TableBody({ children, className }: { children: React.ReactNode, className?: string }) {
    return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

export function TableFooter({ children, className }: { children: React.ReactNode, className?: string }) {
    return <tfoot className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}>{children}</tfoot>;
}

export function TableRow({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <tr className={cn(
            "border-b transition-colors hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 data-[state=selected]:bg-muted",
            className
        )}>
            {children}
        </tr>
    );
}

export function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <th className={cn(
            "h-12 px-4 text-left align-middle font-bold text-neutral-500 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0",
            className
        )}>
            {children}
        </th>
    );
}

export function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}>
            {children}
        </td>
    );
}

export function TableCaption({ children, className }: { children: React.ReactNode, className?: string }) {
    return <caption className={cn("mt-4 text-sm text-neutral-500 dark:text-neutral-400", className)}>{children}</caption>;
}
