import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleProps {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export function Toggle({
    pressed,
    onPressedChange,
    children,
    className,
    disabled
}: ToggleProps) {
    return (
        <motion.button
            whileHover={!disabled ? { y: -2 } : {}}
            whileTap={!disabled ? { y: 0 } : {}}
            onClick={() => !disabled && onPressedChange?.(!pressed)}
            className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all group",
                pressed
                    ? "bg-primary text-primary-foreground border-2 border-primary-foreground/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    : "bg-transparent text-foreground border-2 border-border hover:bg-muted",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {/* 3D Depth Plate */}
            <div
                className={cn(
                    "absolute inset-0 rounded-lg -z-10",
                    pressed ? "bg-primary/50" : "bg-black/10"
                )}
                style={{
                    transform: pressed ? "translateZ(0px)" : "translateZ(-4px)",
                    opacity: pressed ? 0.3 : 1
                }}
            />

            <div
                className="flex items-center gap-2"
                style={{
                    transform: pressed ? "translateZ(0px)" : "translateZ(2px)",
                    transition: "transform 0.1s ease"
                }}
            >
                {children}
            </div>
        </motion.button>
    );
}
