import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export function Switch({
    checked: controlledChecked,
    onChange,
    disabled = false,
    className
}: SwitchProps) {
    const [internalChecked, setInternalChecked] = useState(false);

    const isControlled = controlledChecked !== undefined;
    const isOn = isControlled ? controlledChecked : internalChecked;

    const handleToggle = () => {
        if (disabled) return;

        if (isControlled) {
            onChange?.(!isOn);
        } else {
            setInternalChecked(!isOn);
            onChange?.(!isOn);
        }
    };

    return (
        <div className="perspective-[800px]">
            <motion.button
                onClick={handleToggle}
                disabled={disabled}
                className={cn(
                    "relative h-9 w-16 rounded-full transition-all duration-300",
                    "shadow-[inset_0_2px_8px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]",
                    isOn
                        ? "bg-gradient-to-b from-blue-400 to-blue-500"
                        : "bg-gradient-to-b from-gray-300 to-gray-400 dark:from-neutral-700 dark:to-neutral-800",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                style={{
                    transformStyle: "preserve-3d",
                }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Track depth/groove */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        isOn ? "bg-blue-600" : "bg-gray-500 dark:bg-neutral-900"
                    )}
                    style={{
                        transform: "translateZ(-3px)",
                    }}
                />

                {/* Toggle knob */}
                <motion.div
                    animate={{
                        x: isOn ? 32 : 4,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}
                    className="absolute top-1 w-7 h-7"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Knob shadow/base */}
                    <div
                        className="absolute inset-0 rounded-full bg-gray-400 dark:bg-neutral-700 blur-sm"
                        style={{
                            transform: "translateZ(-2px) translateY(2px)",
                        }}
                    />

                    {/* Knob main body */}
                    <motion.div
                        className={cn(
                            "relative w-full h-full rounded-full",
                            "bg-gradient-to-b from-white to-gray-100",
                            "shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.1)]",
                        )}
                        style={{
                            transform: "translateZ(4px)",
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* Knob highlight */}
                        <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white/60 blur-[1px]" />
                    </motion.div>
                </motion.div>

                {/* Shine overlay */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-black/5 pointer-events-none"
                    style={{
                        transform: "translateZ(1px)",
                    }}
                />
            </motion.button>
        </div>
    );
}
