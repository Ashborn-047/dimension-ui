import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    className?: string;
}

export function Accordion({
    items,
    allowMultiple = false,
    className
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(id)
                    ? prev.filter(item => item !== id)
                    : [...prev, id]
            );
        } else {
            setOpenItems(prev =>
                prev.includes(id) ? [] : [id]
            );
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);

                return (
                    <div
                        key={item.id}
                        className="perspective-[1000px]"
                    >
                        <div
                            className="border border-border rounded-lg overflow-hidden bg-white dark:bg-neutral-900"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Header */}
                            <motion.button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-4 py-3 flex items-center justify-between font-medium hover:bg-muted/50 transition-colors"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <span>{item.title}</span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </motion.button>

                            {/* Content - Unfolds like paper */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            rotateX: -90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            height: "auto",
                                            rotateX: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            rotateX: -90,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        style={{
                                            transformOrigin: "top",
                                            transformStyle: "preserve-3d",
                                        }}
                                        className="overflow-hidden border-t border-border"
                                    >
                                        <div className="px-4 py-3 text-sm text-muted-foreground">
                                            {item.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
