import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Combobox({ options, placeholder = "Select...", className }: { options: { label: string, value: string }[], placeholder?: string, className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [search, setSearch] = useState("");

    const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={cn("relative w-[240px]", className)}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-between rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm font-bold shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
                <span className={cn(!selected && "text-neutral-400")}>
                    {selected ? options.find(o => o.value === selected)?.label : placeholder}
                </span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 4, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10, rotateX: -10 }}
                        className="absolute z-50 w-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shadow-2xl"
                        style={{
                            transformOrigin: "top center",
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div style={{ transform: "translateZ(10px)" }}>
                            <div className="flex items-center px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
                                <Search size={14} className="text-neutral-400 mr-2" />
                                <input
                                    className="bg-transparent text-sm w-full outline-none font-medium"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="max-h-[200px] overflow-y-auto no-scrollbar pt-1">
                                {filtered.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSelected(opt.value); setIsOpen(false); }}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                                            selected === opt.value && "bg-neutral-100 dark:bg-neutral-800"
                                        )}
                                    >
                                        {opt.label}
                                        {selected === opt.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}
