import React from "react";
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
            bg: "bg-white dark:bg-neutral-950/50",
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
}
