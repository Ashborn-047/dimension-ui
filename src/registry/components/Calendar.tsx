
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Calendar({ className }: { className?: string }) {
    // Simplified static calendar for the 3D demo
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "p-4 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-2xl",
                className
            )}
            style={{ transformStyle: "preserve-3d" }}
        >
            <div className="flex items-center justify-between mb-4 px-2">
                <h4 className="font-bold text-sm">January 2024</h4>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {weekDays.map(day => (
                    <span key={day} className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                        {day}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map(day => (
                    <motion.button
                        key={day}
                        whileHover={{ y: -2, z: 10 }}
                        className={cn(
                            "size-8 flex items-center justify-center text-xs rounded-lg transition-all",
                            day === 14
                                ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-bold shadow-lg"
                                : "hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                        )}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {day}
                    </motion.button>
                ))}
            </div>

            {/* 3D Base Plate */}
            <div
                className="absolute inset-x-0 -bottom-2 h-full rounded-2xl bg-neutral-100 dark:bg-neutral-800 border-b-4 border-neutral-300 dark:border-neutral-950 -z-10"
                style={{ transform: "translateZ(-10px)" }}
            />
        </motion.div>
    );
}
