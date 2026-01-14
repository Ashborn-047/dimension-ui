import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function DropdownMenu({
    trigger,
    children,
    className
}: {
    trigger: React.ReactNode,
    children: React.ReactNode,
    className?: string
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
                        className={cn(
                            "absolute z-50 mt-2 min-w-[160px] rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shadow-2xl overflow-hidden",
                            className
                        )}
                        style={{
                            transformOrigin: "top left",
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div style={{ transform: "translateZ(10px)" }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}

export function DropdownMenuItem({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center px-3 py-2 text-sm font-bold rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left",
                className
            )}
        >
            {children}
        </button>
    );
}
