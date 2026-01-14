import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Pagination({ className }: { className?: string }) {
    return (
        <nav className={cn("mx-auto flex w-full justify-center", className)}>
            <ul className="flex flex-row items-center gap-2">
                <li>
                    <PaginationLink href="#" className="gap-1 pl-2.5">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                    </PaginationLink>
                </li>
                <li><PaginationLink href="#">1</PaginationLink></li>
                <li><PaginationLink href="#" isActive>2</PaginationLink></li>
                <li><PaginationLink href="#">3</PaginationLink></li>
                <li>
                    <span className="flex h-9 w-9 items-center justify-center">
                        <MoreHorizontal className="h-4 w-4" />
                    </span>
                </li>
                <li>
                    <PaginationLink href="#" className="gap-1 pr-2.5">
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                </li>
            </ul>
        </nav>
    );
}

function PaginationLink({
    href,
    isActive,
    className,
    children,
    ...props
}: {
    href: string,
    isActive?: boolean,
    className?: string,
    children: React.ReactNode
}) {
    return (
        <motion.a
            href={href}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={cn(
                "inline-flex size-9 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all shadow-sm",
                isActive
                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white shadow-lg"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                className
            )}
            {...props}
        >
            {children}
        </motion.a>
    );
}
