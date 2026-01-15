import React from "react";
import { cn } from "@/lib/utils";

interface ThreeDIconProps {
    children: React.ReactNode;
    color?: string;
    depth?: number;
    size?: number;
    className?: string;
    animate?: boolean;
}

/**
 * ThreeDIcon - A pure "Original Code" implementation for 3D icons.
 * Uses vanilla CSS 3D transforms and stacking to create depth without any external 3D libraries.
 */
export function ThreeDIcon({
    children,
    color = "black",
    depth = 5,
    size = 24,
    className,
    animate = true
}: ThreeDIconProps) {
    return (
        <div
            className={cn("relative inline-block perspective-[800px] group cursor-pointer", className)}
            style={{ width: size, height: size }}
        >
            <style>{`
                @keyframes float-3d {
                    0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
                    25% { transform: rotateY(15deg) rotateX(-10deg); }
                    50% { transform: rotateY(0deg) rotateX(-20deg); }
                    75% { transform: rotateY(-15deg) rotateX(-10deg); }
                }
                .threed-container {
                    transform-style: preserve-3d;
                    transition: transform 0.3s ease-out;
                }
                .group:hover .threed-container {
                    transform: scale(1.1) rotateZ(5deg);
                }
                .animate-threed {
                    animation: float-3d 6s ease-in-out infinite;
                }
            `}</style>

            <div className={cn(
                "threed-container w-full h-full relative",
                animate && "animate-threed"
            )}>
                {/* 3D Depth Layers - Manual Extrusion */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            transform: `translateZ(${-i}px)`,
                            color: i === 0 ? color : `rgba(0,0,0,${0.8 - (i * 0.1)})`,
                            opacity: 1 - (i / depth),
                        }}
                    >
                        {children}
                    </div>
                ))}

                {/* Main Face (Top) */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "translateZ(1px)",
                        color: color,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
