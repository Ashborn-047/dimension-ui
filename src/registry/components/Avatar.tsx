import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: "sm" | "md" | "lg";
    status?: "online" | "offline" | "away" | "busy";
    className?: string;
}

export function Avatar({
    src,
    alt = "Avatar",
    size = "md",
    status,
    className
}: AvatarProps) {
    const sizes = {
        sm: "size-8",
        md: "size-12",
        lg: "size-16",
    };

    const statusColors = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        away: "bg-yellow-500",
        busy: "bg-red-500",
    };

    return (
        <div className={cn("relative inline-block perspective-[500px]", className)}>
            <motion.div
                className={cn(
                    "rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center",
                    sizes[size]
                )}
                whileHover={{
                    scale: 1.1,
                    rotateY: 15,
                    rotateX: -10,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
                style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={size === "sm" ? 16 : size === "md" ? 24 : 32} className="text-muted-foreground" />
                )}
            </motion.div>

            {/* Floating status indicator with orbit animation */}
            {status && (
                <motion.div
                    className={cn(
                        "absolute size-3 rounded-full border-2 border-background",
                        statusColors[status]
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                        right: 0,
                        bottom: 0,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        z: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            )}
        </div>
    );
}
