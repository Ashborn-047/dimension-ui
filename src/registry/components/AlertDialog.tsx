import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    cancelText?: string;
    actionText?: string;
    onAction?: () => void;
    variant?: "default" | "destructive";
}

export function AlertDialog({
    open,
    onOpenChange,
    title,
    description,
    cancelText = "Cancel",
    actionText = "Continue",
    onAction,
    variant = "default"
}: AlertDialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                rotateX: -20,
                                y: 50
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateX: 0,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                rotateX: 20,
                                y: 50
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 p-6 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* Physical Thickness Effect */}
                            <div
                                className="absolute inset-0 rounded-[24px] bg-neutral-300 dark:bg-neutral-950"
                                style={{
                                    transform: "translateZ(-8px)",
                                    zIndex: -1,
                                }}
                            />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-full",
                                        variant === "destructive" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                    )}>
                                        <AlertCircle size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold">{title}</h2>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {description}
                                </p>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        {cancelText}
                                    </Button>
                                    <Button
                                        variant={variant === "destructive" ? "destructive" : "default"}
                                        onClick={() => {
                                            onAction?.();
                                            onOpenChange(false);
                                        }}
                                    >
                                        {actionText}
                                    </Button>
                                </div>
                            </div>

                            {/* Float highlights */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
