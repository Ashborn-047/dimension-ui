import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

export function Card({ children, className, title, description }: CardProps) {
    return (
        <div className="relative group">
            {/* Physical Depth Layer (The Body) */}
            <div
                className="absolute inset-x-0 -bottom-2 h-full rounded-2xl bg-neutral-200 dark:bg-neutral-800 border-b-4 border-neutral-300 dark:border-neutral-900"
                style={{ transform: "translateZ(-1px)" }}
            />

            {/* Main Surface */}
            <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                    "relative rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 p-6 shadow-xl",
                    className
                )}
            >
                {(title || description) && (
                    <div className="mb-4">
                        {title && <h3 className="text-lg font-bold tracking-tight">{title}</h3>}
                        {description && <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
                    </div>
                )}
                <div className="relative">
                    {children}
                </div>

                {/* Subtle Shine/Bevel */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none border-t border-white/20 dark:border-white/5" />
            </motion.div>
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("flex flex-col space-y-1.5", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;
}
