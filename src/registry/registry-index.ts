export const REGISTRY_CODE: Record<string, string> = {
    "button": `import React from "react";
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
            text: "text-neutral-50 dark:text-neutral-950",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        },
        secondary: {
            top: "bg-neutral-100 dark:bg-neutral-800",
            side: "bg-neutral-300 dark:bg-neutral-950",
            text: "text-neutral-900 dark:text-neutral-50",
            glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        },
        destructive: {
            top: "bg-neutral-950 dark:bg-neutral-900 border border-neutral-700",
            side: "bg-black",
            text: "text-neutral-50",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        },
        outline: {
            top: "bg-background border border-border dark:bg-neutral-900",
            side: "bg-neutral-200 dark:bg-neutral-800",
            text: "text-foreground",
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
                        transform: \`translateZ(-\${depth}px)\`,
                    }}
                />

                {/* Button Sides (left, right, bottom) - creates the 3D edge */}
                <div
                    className={cn("absolute inset-0 rounded-lg", variants[variant].side)}
                    style={{
                        transform: \`translateY(\${depth}px)\`,
                        height: \`\${depth}px\`,
                        top: '100%',
                    }}
                />

                {/* Button Top Face */}
                <motion.div
                    whileTap={{
                        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                    className={cn(
                        "relative rounded-lg font-semibold transition-all duration-100",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)]",
                        variants[variant].top,
                        variants[variant].text,
                        variants[variant].glow,
                        sizes[size],
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                    style={{
                        transform: \`translateZ(\${depth}px)\`,
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
}`,
    "alert": `import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
    title?: string;
    children?: React.ReactNode;
    variant?: "default" | "destructive" | "warning" | "success";
    className?: string;
    icon?: React.ReactNode;
}

export function Alert({
    title,
    children,
    variant = "default",
    className,
    icon
}: AlertProps) {
    const variants = {
        default: {
            bg: "bg-neutral-50 dark:bg-neutral-950/20",
            border: "border-neutral-200 dark:border-neutral-800",
            text: "text-neutral-800 dark:text-neutral-300",
            icon: <Info className="h-5 w-5 text-neutral-500" />
        },
        destructive: {
            bg: "bg-neutral-100 dark:bg-black/40",
            border: "border-neutral-900 dark:border-neutral-100",
            text: "text-neutral-950 dark:text-neutral-50",
            icon: <AlertCircle className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
        },
        warning: {
            bg: "bg-neutral-50 dark:bg-neutral-900/40",
            border: "border-neutral-400 dark:border-neutral-600",
            text: "text-neutral-900 dark:text-neutral-200",
            icon: <AlertTriangle className="h-5 w-5 text-neutral-600" />
        },
        success: {
            bg: "bg-neutral-50 dark:bg-neutral-950/50",
            border: "border-neutral-300 dark:border-neutral-700",
            text: "text-neutral-950 dark:text-neutral-50",
            icon: <CheckCircle2 className="h-5 w-5 text-neutral-500" />
        }
    };

    const style = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={cn(
                "relative w-full rounded-xl border-2 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                style.bg,
                style.border,
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {/* 3D Depth Effect */}
            <div
                className={cn("absolute inset-0 rounded-xl opacity-20", style.bg)}
                style={{ transform: "translateZ(-4px)", zIndex: -1 }}
            />

            <div className="flex gap-4">
                <div className="flex-shrink-0 animate-pulse">
                    {icon || style.icon}
                </div>
                <div className="flex-1 space-y-1">
                    {title && (
                        <h5 className={cn("font-bold leading-none tracking-tight", style.text)}>
                            {title}
                        </h5>
                    )}
                    {children && (
                        <div className={cn("text-sm opacity-90", style.text)}>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}`,
    "badge": `import React from "react";
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
}`,
    "input": `import React, { useState } from "react";
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
                                "shadow-[inset_0_2px_4_rgba(0,0,0,0.06),0_1px_2_rgba(0,0,0,0.05)]",
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
}`,
};
