import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputOTPProps {
    maxLength?: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function InputOTP({
    maxLength = 6,
    value = "",
    onChange,
    className
}: InputOTPProps) {
    const [internalValue, setInternalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.slice(0, maxLength);
        if (/^\d*$/.test(newValue)) {
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    const isFocused = useRef(false);

    return (
        <div className={cn("relative flex items-center gap-2", className)}>
            <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d*"
                maxLength={maxLength}
                value={internalValue}
                onChange={handleChange}
                onFocus={() => (isFocused.current = true)}
                onBlur={() => (isFocused.current = false)}
                className="absolute inset-0 opacity-0 cursor-default"
            />

            <div className="flex gap-2" style={{ perspective: "1000px" }}>
                {Array.from({ length: maxLength }).map((_, i) => {
                    const char = internalValue[i];
                    const isActive = i === internalValue.length;
                    const isFilled = i < internalValue.length;

                    return (
                        <motion.div
                            key={i}
                            onClick={() => inputRef.current?.focus()}
                            animate={{
                                scale: isActive ? 1.05 : 1,
                                rotateX: isActive ? 5 : 0,
                                y: isActive ? -2 : 0,
                            }}
                            className={cn(
                                "relative size-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-colors cursor-pointer",
                                isActive ? "border-primary bg-primary/5" : "border-border bg-card",
                                isFilled && "border-primary/50"
                            )}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* 3D Sides */}
                            <div
                                className="absolute inset-0 rounded-lg bg-black/10 -z-10"
                                style={{ transform: "translateZ(-4px)" }}
                            />

                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={char || 'empty'}
                                    initial={{ opacity: 0, scale: 0.5, z: 20 }}
                                    animate={{ opacity: 1, scale: 1, z: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, z: -20 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {char}
                                </motion.span>
                            </AnimatePresence>

                            {isActive && (
                                <motion.div
                                    className="absolute bottom-2 w-4 h-0.5 bg-primary"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
