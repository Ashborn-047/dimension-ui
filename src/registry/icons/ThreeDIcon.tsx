import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDIconProps {
    children: React.ReactNode;
    color?: string;
    depth?: number;
    size?: number;
    className?: string;
    animate?: boolean;
}

export function ThreeDIcon({
    children,
    color = "currentColor",
    depth = 4,
    size = 24,
    className,
    animate = true
}: ThreeDIconProps) {
    return (
        <div
            className={cn("relative inline-block perspective-[500px]", className)}
            style={{ width: size, height: size }}
        >
            <motion.div
                animate={animate ? {
                    rotateY: [0, 10, -10, 0],
                    rotateX: [0, -10, 10, 0],
                } : {}}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-full h-full"
                style={{
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.2, rotateZ: 5 }}
            >
                {/* The SVG layers for depth */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            transform: `translateZ(${-i}px)`,
                            color: i === 0 ? color : `color-mix(in srgb, ${color}, black ${i * 10}%)`,
                            opacity: 1 - (i / (depth * 2)),
                        }}
                    >
                        {children}
                    </div>
                ))}

                {/* Top Face with highlight */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "translateZ(1px)",
                        color: color,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
