import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function Dialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    className
}: DialogProps) {
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

                    {/* Dialog */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.5,
                                y: 100,
                                rotateX: -15,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                rotateX: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                y: 100,
                                rotateX: 15,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className={cn(
                                "relative w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800",
                                className
                            )}
                            style={{
                                transformStyle: "preserve-3d",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-4 right-4 rounded-lg p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-4">
                                {title && (
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                )}
                                {description && (
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                )}
                                <div>{children}</div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
