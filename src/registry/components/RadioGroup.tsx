import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function RadioGroup({ options, value, onChange, className }: RadioGroupProps) {
    const [internalValue, setInternalValue] = useState(options[0]?.value);
    const currentValue = value !== undefined ? value : internalValue;

    const handleSelect = (val: string) => {
        setInternalValue(val);
        onChange?.(val);
    };

    return (
        <div className={cn("grid gap-4", className)}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="relative flex items-center justify-center size-5">
                        <input
                            type="radio"
                            name="radio-group"
                            className="sr-only"
                            checked={currentValue === option.value}
                            onChange={() => handleSelect(option.value)}
                        />

                        {/* Outset Outer Ring */}
                        <div className={cn(
                            "absolute inset-0 rounded-full border-2 transition-all duration-200",
                            currentValue === option.value
                                ? "bg-neutral-900 border-neutral-900 dark:bg-white dark:border-white shadow-lg"
                                : "bg-neutral-100 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700"
                        )} />

                        {/* 3D "Dot" */}
                        <motion.div
                            initial={false}
                            animate={{
                                scale: currentValue === option.value ? 1 : 0,
                                y: currentValue === option.value ? 0 : 2
                            }}
                            className="relative size-2 rounded-full bg-white dark:bg-neutral-900 shadow-sm"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute inset-0 rounded-full border-t border-black/10 dark:border-white/10" />
                        </motion.div>
                    </div>
                    <span className="text-sm font-medium leading-none group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
