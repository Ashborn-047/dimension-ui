import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverCardProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    className?: string;
}

export function HoverCard({ trigger, content, className }: HoverCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {trigger}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                            rotateX: -15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotateX: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                            rotateX: -15,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                        }}
                        className={cn(
                            "absolute z-50 mt-2 w-64 rounded-lg border border-border bg-white dark:bg-neutral-900 p-4 shadow-2xl",
                            className
                        )}
                        style={{
                            transformStyle: "preserve-3d",
                            transformOrigin: "top center",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        }}
                    >
                        <motion.div
                            style={{
                                transform: "translateZ(20px)",
                            }}
                        >
                            {content}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
