import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SonnerToast {
    id: string;
    title: string;
    description?: string;
    type?: "default" | "success" | "error";
}

export function Sonner({ toasts, onDismiss }: { toasts: SonnerToast[], onDismiss: (id: string) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        className={cn(
                            "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 pr-8 shadow-2xl transition-all",
                            toast.type === "error" && "border-red-500/50"
                        )}
                        style={{
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div className="grid gap-1" style={{ transform: "translateZ(10px)" }}>
                            <div className="text-sm font-bold tracking-tight">{toast.title}</div>
                            {toast.description && (
                                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                                    {toast.description}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => onDismiss(toast.id)}
                            className="absolute right-2 top-2 rounded-lg p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>

                        {/* 3D Under-Plate */}
                        <div
                            className="absolute inset-x-0 -bottom-1 h-full rounded-2xl bg-neutral-100 dark:bg-neutral-800 border-b-2 border-neutral-300 dark:border-neutral-950 -z-10"
                            style={{ transform: "translateZ(-10px)" }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
