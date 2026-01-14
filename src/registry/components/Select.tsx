import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function Select({ options, value, onValueChange, placeholder = "Select an option", className }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={cn("relative w-[200px]", className)}>
            <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-2 rounded-xl border-2 bg-card text-sm font-medium transition-all shadow-sm",
                    isOpen ? "border-primary" : "border-border"
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="absolute inset-0 rounded-xl bg-black/5 -z-10 shadow-inner" style={{ transform: "translateZ(-4px)" }} />
                <span className={cn(!selectedOption && "text-muted-foreground")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, rotateX: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, rotateX: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, rotateX: -15, scale: 0.95 }}
                        className="absolute z-50 w-full mt-2 rounded-xl border-2 border-border bg-popover p-1 shadow-2xl"
                        style={{
                            transformOrigin: "top center",
                            transformStyle: "preserve-3d",
                            perspective: "1000px"
                        }}
                    >
                        {/* List Shadow/Depth */}
                        <div className="absolute inset-0 rounded-xl bg-black/5 -z-10" style={{ transform: "translateZ(-10px)" }} />

                        <div className="max-h-[200px] overflow-y-auto no-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onValueChange?.(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                        value === option.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    )}
                                    style={{ transform: "translateZ(10px)" }}
                                >
                                    {option.label}
                                    {value === option.value && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}
