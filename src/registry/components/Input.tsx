import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-2 text-foreground">
                    {label}
                </label>
            )}

            <div className="perspective-[800px]">
                <motion.div
                    animate={{
                        rotateX: isFocused ? -2 : 0,
                        y: isFocused ? -1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                    }}
                    className="relative"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Input depth/well */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-lg",
                            error ? "bg-black dark:bg-neutral-50" : isFocused ? "bg-neutral-800 dark:bg-neutral-200" : "bg-gray-400 dark:bg-neutral-900"
                        )}
                        style={{
                            transform: "translateZ(-4px)",
                        }}
                    />

                    {/* Input container */}
                    <div className="relative">
                        {icon && (
                            <div
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
                                style={{
                                    transform: "translateY(-50%) translateZ(4px)",
                                }}
                            >
                                {icon}
                            </div>
                        )}

                        <input
                            {...props}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }}
                            className={cn(
                                "relative w-full px-4 py-2.5 rounded-lg",
                                "bg-gradient-to-b from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900",
                                "border-2 transition-all duration-200",
                                "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.05)]",
                                "focus:outline-none",
                                error
                                    ? "border-neutral-900 dark:border-neutral-100 focus:border-neutral-950"
                                    : "border-gray-200 dark:border-neutral-700 focus:border-neutral-400",
                                isFocused && "shadow-[inset_0_2px_6px_rgba(0,0,0,0.08),0_0_0_3px_rgba(0,0,0,0.05)]",
                                icon && "pl-10",
                                className
                            )}
                            style={{
                                transform: "translateZ(2px)",
                            }}
                        />

                        {/* Top shine */}
                        <div
                            className="absolute inset-x-0 top-0 h-1/3 rounded-t-lg bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                            style={{
                                transform: "translateZ(3px)",
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {error && (
                <p className="text-xs text-neutral-900 dark:text-neutral-100 mt-1 ml-1 italic font-medium">{error}</p>
            )}
        </div>
    );
}
