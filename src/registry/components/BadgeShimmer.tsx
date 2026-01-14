import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BadgeShimmer({
    children,
    className
}: { children: React.ReactNode; className?: string }) {
    return (
        <motion.span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white border-purple-400/50 shadow-lg bg-[length:200%_100%]",
                className
            )}
            animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <span className="relative z-10">{children}</span>
        </motion.span>
    );
}
