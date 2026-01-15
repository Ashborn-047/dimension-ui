import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
}

export function Checkbox({
    checked: controlledChecked,
    onChange,
    disabled = false,
    label,
    className
}: CheckboxProps) {
    const [internalChecked, setInternalChecked] = useState(false);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleToggle = () => {
        if (disabled) return;

        if (isControlled) {
            onChange?.(!isChecked);
        } else {
            setInternalChecked(!isChecked);
            onChange?.(!isChecked);
        }
    };

    return (
        <label className={cn("inline-flex items-center gap-3 cursor-pointer group", disabled && "opacity-50 cursor-not-allowed", className)}>
            <div className="perspective-[600px]">
                <motion.button
                    type="button"
                    onClick={handleToggle}
                    disabled={disabled}
                    className={cn(
                        "relative w-7 h-7 rounded-md transition-all duration-200",
                        "shadow-[inset_0_2px_6px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.05)]",
                        isChecked
                            ? "bg-neutral-800 dark:bg-neutral-100"
                            : "bg-gradient-to-b from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800"
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Checkbox depth/well */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-md",
                            isChecked ? "bg-neutral-900 dark:bg-white" : "bg-gray-400 dark:bg-neutral-900"
                        )}
                        style={{
                            transform: "translateZ(-4px)",
                        }}
                    />

                    {/* Inner beveled edge */}
                    <div
                        className="absolute inset-0 rounded-md border border-black/10"
                        style={{
                            transform: "translateZ(-2px)",
                        }}
                    />

                    {/* Checkmark - pops OUT when checked */}
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isChecked ? 1 : 0,
                            rotateX: isChecked ? 0 : -90,
                            z: isChecked ? 8 : -4,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 600,
                            damping: 25,
                        }}
                        className="absolute inset-0 flex items-center justify-center text-white"
                        style={{
                            transformStyle: "preserve-3d",
                            transformOrigin: "center",
                        }}
                    >
                        <div
                            className="bg-white rounded-full p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                            style={{
                                transform: "translateZ(2px)",
                            }}
                        >
                            <Check size={16} strokeWidth={3} className="text-neutral-50 dark:text-neutral-950" />
                        </div>
                    </motion.div>

                    {/* Top highlight */}
                    <div
                        className="absolute inset-x-0 top-0 h-1/2 rounded-t-md bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                        style={{
                            transform: "translateZ(1px)",
                        }}
                    />
                </motion.button>
            </div>
            {label && <span className="text-sm font-medium select-none group-hover:text-foreground/80 transition-colors">{label}</span>}
        </label>
    );
}
