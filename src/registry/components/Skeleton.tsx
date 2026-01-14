import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
    variant?: "text" | "circle" | "rectangular";
    width?: string;
    height?: string;
    className?: string;
}

export function Skeleton({
    variant = "rectangular",
    width,
    height,
    className
}: SkeletonProps) {
    const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted relative overflow-hidden";

    const variantClasses = {
        text: "h-4 rounded",
        circle: "rounded-full aspect-square",
        rectangular: "rounded-lg",
    };

    return (
        <motion.div
            className={cn(
                baseClasses,
                variantClasses[variant],
                className
            )}
            style={{
                width: width || (variant === "circle" ? "48px" : "100%"),
                height: height || (variant === "text" ? "16px" : variant === "circle" ? "48px" : "100px"),
                transformStyle: "preserve-3d",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.05)",
            }}
            animate={{
                rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                    x: ["-100%", "200%"],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    transform: "translateZ(10px)",
                }}
            />

            {/* Edge highlight */}
            <div className="absolute inset-0 border border-white/10 rounded-[inherit]" />
        </motion.div>
    );
}

// Preset skeleton layouts
export function SkeletonCard() {
    return (
        <div className="space-y-3 p-4 border border-border rounded-lg">
            <Skeleton variant="rectangular" height="120px" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
        </div>
    );
}

export function SkeletonAvatar() {
    return (
        <div className="flex items-center gap-3">
            <Skeleton variant="circle" width="48px" height="48px" />
            <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
            </div>
        </div>
    );
}
