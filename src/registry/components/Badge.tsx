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
        default: "bg-primary text-primary-foreground border-primary/50",
        secondary: "bg-secondary text-secondary-foreground border-secondary",
        destructive: "bg-destructive text-destructive-foreground border-destructive/50",
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
