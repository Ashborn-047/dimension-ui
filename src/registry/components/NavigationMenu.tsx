import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationMenu({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <nav className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}>
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                {children}
            </ul>
        </nav>
    );
}

export function NavigationMenuItem({ children }: { children: React.ReactNode }) {
    return <li className="relative">{children}</li>;
}

export function NavigationMenuTrigger({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.button
            whileHover={{ y: -2 }}
            className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-xl border-2 border-transparent bg-background px-4 py-2 text-sm font-bold transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 shadow-sm",
                className
            )}
        >
            {children}
            <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180"
                aria-hidden="true"
            />
        </motion.button>
    );
}
