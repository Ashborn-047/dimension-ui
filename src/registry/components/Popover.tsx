import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function Popover({ trigger, children, className }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateX: -20, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={cn(
                            "absolute z-50 mt-2 min-w-[200px] rounded-xl border-2 border-border bg-popover p-4 text-popover-foreground shadow-2xl",
                            className
                        )}
                        style={{
                            transformOrigin: "top center",
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                        }}
                    >
                        {/* 3D Content Container */}
                        <div style={{ transform: "translateZ(20px)" }}>
                            {children}
                        </div>

                        {/* 3D Arrow */}
                        <div
                            className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 border-l-2 border-t-2 border-border bg-popover"
                            style={{ transform: "translateZ(-1px) rotate(45deg)" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay to close when clicking outside (simplified for demo) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
