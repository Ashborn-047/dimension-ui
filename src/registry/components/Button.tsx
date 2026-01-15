import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, "children"> {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    variant = "default",
    size = "md",
    className,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        default: {
            top: "bg-neutral-800 dark:bg-neutral-100",
            side: "bg-neutral-950 dark:bg-neutral-300",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        },
        secondary: {
            top: "bg-neutral-100 dark:bg-neutral-800",
            side: "bg-neutral-300 dark:bg-neutral-950",
            glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        },
        destructive: {
            top: "bg-neutral-950 dark:bg-neutral-900 border border-neutral-700",
            side: "bg-black",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        },
        outline: {
            top: "bg-background border border-border text-foreground dark:bg-neutral-900",
            side: "bg-neutral-200 dark:bg-neutral-800",
            glow: "shadow-sm"
        },
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const depthSizes = {
        sm: 3,
        md: 4,
        lg: 6,
    };

    const depth = depthSizes[size];

    return (
        <div className={cn("inline-block perspective-[1000px]", className)}>
            <motion.button
                disabled={disabled}
                whileHover={{ y: -2, transition: { duration: 0.1 } }}
                whileTap={{ y: depth - 1 }}
                className="relative group outline-none"
                style={{
                    transformStyle: "preserve-3d",
                }}
                {...props}
            >
                {/* Button Side/Depth */}
                <motion.div
                    className={cn(
                        "absolute inset-0 rounded-lg",
                        variants[variant].side
                    )}
                    style={{
                        transform: `translateZ(-${depth}px)`,
                    }}
                />

                {/* Button Sides (left, right, bottom) - creates the 3D edge */}
                <div
                    className={cn("absolute inset-0 rounded-lg", variants[variant].side)}
                    style={{
                        transform: `translateY(${depth}px)`,
                        height: `${depth}px`,
                        top: '100%',
                    }}
                />

                {/* Button Top Face */}
                <motion.div
                    whileTap={{
                        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                    className={cn(
                        "relative rounded-lg font-semibold text-white transition-all duration-100",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)]",
                        variants[variant].top,
                        variants[variant].glow,
                        sizes[size],
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                    style={{
                        transform: `translateZ(${depth}px)`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                        {children}
                    </span>
                </motion.div>
            </motion.button>
        </div>
    );
}
