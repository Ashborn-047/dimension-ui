import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline";
    animate?: boolean;
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    animate = true,
    className
}: BadgeProps) {
    const variants = {
        default: "bg-neutral-900 text-neutral-50 border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900",
        secondary: "bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700",
        destructive: "bg-neutral-50 text-neutral-950 border-neutral-950 font-black dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-50",
        outline: "bg-background text-foreground border-border",
    };

    return (
        <motion.span
            whileHover={animate ? { y: -2, translateZ: "10px" } : undefined}
            animate={animate ? { y: 0, translateZ: "0px" } : undefined}
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-md",
                variants[variant],
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <span className="relative z-10">{children}</span>
        </motion.span>
    );
}
