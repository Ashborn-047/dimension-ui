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
            bg: "bg-blue-50 dark:bg-blue-950/20",
            border: "border-blue-200 dark:border-blue-800",
            text: "text-blue-800 dark:text-blue-300",
            icon: <Info className="h-5 w-5 text-blue-500" />
        },
        destructive: {
            bg: "bg-red-50 dark:bg-red-950/20",
            border: "border-red-200 dark:border-red-800",
            text: "text-red-800 dark:text-red-300",
            icon: <AlertCircle className="h-5 w-5 text-red-500" />
        },
        warning: {
            bg: "bg-yellow-50 dark:bg-yellow-950/20",
            border: "border-yellow-200 dark:border-yellow-800",
            text: "text-yellow-800 dark:text-yellow-300",
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
        },
        success: {
            bg: "bg-green-50 dark:bg-green-950/20",
            border: "border-green-200 dark:border-green-800",
            text: "text-green-800 dark:text-green-300",
            icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
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
