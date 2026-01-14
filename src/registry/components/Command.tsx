import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command as IconCommand, History, Star, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    className?: string;
}

export function Command({ open, onOpenChange, className }: CommandProps) {
    const [search, setSearch] = useState("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            }}
                            onMouseMove={handleMouseMove}
                            className={cn(
                                "relative w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden",
                                className
                            )}
                            style={{
                                transformStyle: "preserve-3d",
                                rotateY: mousePos.x * 10,
                                rotateX: -mousePos.y * 10,
                            }}
                        >
                            {/* Search Header */}
                            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                                <Search size={20} className="text-muted-foreground" />
                                <input
                                    autoFocus
                                    placeholder="Type a command or search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
                                />
                                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className="text-xs">ESC</span>
                                </kbd>
                            </div>

                            {/* Suggestions */}
                            <div className="p-2 max-h-[400px] overflow-y-auto">
                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Suggestions</div>

                                {[
                                    { icon: <IconCommand size={18} />, label: "Command Menu", shortcut: "⌘K" },
                                    { icon: <Search size={18} />, label: "Search Components", shortcut: "⌘S" },
                                    { icon: <History size={18} />, label: "Recent Projects", shortcut: "⌘P" },
                                    { icon: <Star size={18} />, label: "Favorites", shortcut: "⌘D" },
                                    { icon: <Settings size={18} />, label: "Settings", shortcut: "⌘," },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{
                                            x: 8,
                                            backgroundColor: "rgba(0,0,0,0.05)",
                                            transform: "translateZ(10px)"
                                        }}
                                        className="flex items-center justify-between px-3 py-3 rounded-xl cursor-not-allowed group transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-muted-foreground group-hover:text-blue-500 transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground font-mono">{item.shortcut}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Parallax elements */}
                            <div
                                className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"
                                style={{ transform: `translateZ(-50px)` }}
                            />
                            <div
                                className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"
                                style={{ transform: `translateZ(-50px)` }}
                            />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
