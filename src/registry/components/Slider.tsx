import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SliderProps {
    defaultValue?: number[];
    value?: number[];
    onValueChange?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export function Slider({
    defaultValue = [0],
    value: controlledValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    className,
}: SliderProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const values = controlledValue || internalValue;
    const trackRef = useRef<HTMLDivElement>(null);

    const percentage = ((values[0] - min) / (max - min)) * 100;

    const handleDrag = (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const pos = (clientX - rect.left) / rect.width;
        const rawValue = pos * (max - min) + min;
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.min(Math.max(steppedValue, min), max);

        if (!controlledValue) setInternalValue([clampedValue]);
        onValueChange?.([clampedValue]);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        handleDrag(e.clientX);
        const onMouseMove = (moveEvent: MouseEvent) => handleDrag(moveEvent.clientX);
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            className={cn("relative flex w-full touch-none select-none items-center py-4", className)}
            ref={trackRef}
            onMouseDown={onMouseDown}
        >
            {/* 3D Recessed Track */}
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-inner">
                <div
                    className="absolute h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-75"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* 3D Machined Thumb */}
            <motion.div
                className="absolute h-6 w-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{ left: `${percentage}%`, x: "-50%" }}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95, y: 0 }}
            >
                {/* Thumb Surface Texture */}
                <div className="size-3 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 shadow-inner" />

                {/* Subtle 3D Volume */}
                <div className="absolute inset-0 rounded-full border-t border-white/40 dark:border-white/10 pointer-events-none" />
            </motion.div>
        </div>
    );
}
