import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./Calendar";
import { cn } from "@/lib/utils";

export function DatePicker({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [date] = useState<Date | null>(null);

    return (
        <div className={cn("relative w-[280px]", className)}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "flex w-full items-center justify-start gap-3 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-left text-sm font-bold shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors",
                    !date && "text-neutral-400"
                )}
            >
                <CalendarIcon size={16} />
                {date ? date.toLocaleDateString() : "Pick a date"}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 4, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                        className="absolute z-50 mt-2 rounded-2xl p-1 bg-white dark:bg-neutral-900 shadow-2xl border-2 border-neutral-200 dark:border-neutral-800"
                        style={{
                            transformOrigin: "top center",
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div style={{ transform: "translateZ(10px)" }}>
                            <Calendar />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}
