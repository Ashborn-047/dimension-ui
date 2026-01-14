import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Menubar({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(
            "flex h-10 items-center space-x-1 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shadow-lg",
            className
        )}>
            {children}
        </div>
    );
}

export function MenubarMenu({ children }: { children: React.ReactNode }) {
    return <div className="relative">{children}</div>;
}

export function MenubarTrigger({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className={cn(
                "flex cursor-default select-none items-center rounded-lg px-3 py-1.5 text-sm font-bold outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                className
            )}
        >
            {children}
        </motion.button>
    );
}
