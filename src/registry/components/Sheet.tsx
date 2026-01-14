import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    side?: "left" | "right" | "top" | "bottom";
    children: React.ReactNode;
    className?: string;
}

export function Sheet({
    open,
    onOpenChange,
    title,
    description,
    side = "right",
    children,
    className
}: SheetProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    const slideVariants = {
        left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
        right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
        top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
        bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
    };

    const positionClasses = {
        left: "left-0 top-0 h-full w-3/4 max-w-sm",
        right: "right-0 top-0 h-full w-3/4 max-w-sm",
        top: "top-0 left-0 w-full h-3/4 max-h-96",
        bottom: "bottom-0 left-0 w-full h-3/4 max-h-96",
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={slideVariants[side].initial}
                        animate={slideVariants[side].animate}
                        exit={slideVariants[side].exit}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className={cn(
                            "fixed z-50 bg-white dark:bg-neutral-900 border-border shadow-2xl overflow-y-auto",
                            positionClasses[side],
                            side === "left" && "border-r",
                            side === "right" && "border-l",
                            side === "top" && "border-b",
                            side === "bottom" && "border-t",
                            className
                        )}
                        style={{
                            transformStyle: "preserve-3d",
                            boxShadow: side === "left"
                                ? "4px 0 24px rgba(0,0,0,0.3)"
                                : side === "right"
                                    ? "-4px 0 24px rgba(0,0,0,0.3)"
                                    : side === "top"
                                        ? "0 4px 24px rgba(0,0,0,0.3)"
                                        : "0 -4px 24px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="space-y-1">
                                    {title && <h2 className="text-xl font-bold">{title}</h2>}
                                    {description && (
                                        <p className="text-sm text-muted-foreground">{description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div>{children}</div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
