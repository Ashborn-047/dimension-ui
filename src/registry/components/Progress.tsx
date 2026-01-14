
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
    value: number;
    max?: number;
    className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={cn("w-full space-y-2", className)}>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.1)]">
                {/* Recessed Track Texture */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

                {/* 3D Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative h-full bg-neutral-900 dark:bg-white rounded-full group overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Bevel/Depth effect for the fill */}
                    <div className="absolute inset-0 border-t border-white/30 dark:border-black/10" />
                    <div className="absolute inset-0 border-b border-black/20 dark:border-white/10" />

                    {/* Subtle Shimmer */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    );
}
