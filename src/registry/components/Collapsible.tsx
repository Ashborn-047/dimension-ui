import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Collapsible({ trigger, children, className }: { trigger: React.ReactNode, children: React.ReactNode, className?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("w-full space-y-2", className)}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all shadow-md group"
            >
                <div className="font-bold text-sm">{trigger}</div>
                <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")} />
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, scaleY: 0.8 }}
                        animate={{ height: "auto", opacity: 1, scaleY: 1 }}
                        exit={{ height: 0, opacity: 0, scaleY: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ transformOrigin: "top" }}
                    >
                        <div className="px-4 py-3 rounded-2xl border-2 border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 text-sm italic text-neutral-600 dark:text-neutral-400 shadow-inner">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
