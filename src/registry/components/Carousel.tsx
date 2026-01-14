import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
    items: React.ReactNode[];
    className?: string;
}

export function Carousel({ items, className }: CarouselProps) {
    const [index, setIndex] = React.useState(0);

    const next = () => setIndex((i) => (i + 1) % items.length);
    const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

    return (
        <div className={cn("relative w-full max-w-xl mx-auto group", className)} style={{ perspective: "1200px" }}>
            <div className="relative h-64 w-full overflow-visible" style={{ transformStyle: "preserve-3d" }}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotateY: 45, x: 100, z: -100 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
                        exit={{ opacity: 0, rotateY: -45, x: -100, z: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0"
                    >
                        {items[index]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button onClick={prev} className="p-3 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 active:scale-95 transition-transform">
                    <ChevronLeft size={20} />
                </button>
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <button onClick={next} className="p-3 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 active:scale-95 transition-transform">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={cn(
                            "size-2 rounded-full transition-all duration-300",
                            i === index ? "w-8 bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
