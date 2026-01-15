import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export function Tooltip({
    content,
    children,
    side = "top",
    className
}: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);

    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const origins = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {children}

            <AnimatePresence>
                {isOpen && (
                    <div className={cn("absolute z-50 perspective-[800px]", positions[side])}>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: side === "top" ? 10 : side === "bottom" ? -10 : 0,
                                x: side === "left" ? 10 : side === "right" ? -10 : 0,
                                rotateX: side === "top" ? 15 : side === "bottom" ? -15 : 0,
                                rotateY: side === "left" ? -15 : side === "right" ? 15 : 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                x: 0,
                                rotateX: 0,
                                rotateY: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: side === "top" ? 10 : side === "bottom" ? -10 : 0,
                                x: side === "left" ? 10 : side === "right" ? -10 : 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                            className={cn(
                                "relative px-3 py-2 rounded-lg text-sm text-neutral-50 whitespace-nowrap",
                                "bg-gradient-to-b from-gray-800 to-gray-900",
                                "shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
                                "border border-gray-700",
                                className
                            )}
                            style={{
                                transformStyle: "preserve-3d",
                                transformOrigin: origins[side],
                            }}
                        >
                            {/* Tooltip depth */}
                            <div
                                className="absolute inset-0 rounded-lg bg-gray-950"
                                style={{
                                    transform: "translateZ(-3px)",
                                    zIndex: -1,
                                }}
                            />

                            {/* Content */}
                            <div
                                style={{
                                    transform: "translateZ(2px)",
                                }}
                            >
                                {content}
                            </div>

                            {/* Shine */}
                            <div
                                className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none"
                                style={{
                                    transform: "translateZ(1px)",
                                }}
                            />

                            {/* Arrow */}
                            <div
                                className={cn(
                                    "absolute w-2 h-2 rotate-45",
                                    "bg-gradient-to-br from-gray-800 to-gray-900",
                                    "border-gray-700",
                                    side === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r",
                                    side === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2 border-t border-l",
                                    side === "left" && "right-[-4px] top-1/2 -translate-y-1/2 border-r border-t",
                                    side === "right" && "left-[-4px] top-1/2 -translate-y-1/2 border-l border-b"
                                )}
                                style={{
                                    transform: side === "top"
                                        ? "translateX(-50%) translateZ(-1.5px) rotate(45deg)"
                                        : side === "bottom"
                                            ? "translateX(-50%) translateZ(-1.5px) rotate(45deg)"
                                            : side === "left"
                                                ? "translateY(-50%) translateZ(-1.5px) rotate(45deg)"
                                                : "translateY(-50%) translateZ(-1.5px) rotate(45deg)",
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
