import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
    id: string;
    title: string;
    description?: string;
    variant?: "default" | "success" | "error" | "warning" | "info";
    duration?: number;
}

export function Toast({
    toast,
    index,
    onDismiss
}: {
    toast: ToastProps,
    index: number,
    onDismiss: (id: string) => void
}) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (toast.duration && toast.duration > 0) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => onDismiss(toast.id), 300);
            }, toast.duration);
            return () => clearTimeout(timer);
        }
    }, [toast, onDismiss]);

    const variants = {
        default: {
            bg: "bg-white dark:bg-neutral-900 border-border",
            icon: <Info size={20} className="text-neutral-500" />,
        },
        success: {
            bg: "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
            icon: <CheckCircle size={20} className="text-neutral-900 dark:text-neutral-100" />,
        },
        error: {
            bg: "bg-neutral-950 dark:bg-white border-neutral-800 dark:border-neutral-200",
            icon: <AlertCircle size={20} className="text-neutral-50 dark:text-neutral-950" />,
        },
        warning: {
            bg: "bg-neutral-100 dark:bg-neutral-900 border-neutral-400 dark:border-neutral-600",
            icon: <AlertTriangle size={20} className="text-neutral-600" />,
        },
        info: {
            bg: "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
            icon: <Info size={20} className="text-neutral-500" />,
        },
    };

    const variant = variants[toast.variant || "default"];

    return (
        <motion.div
            layout
            initial={{
                opacity: 0,
                y: -50,
                scale: 0.8,
                rotateX: -20,
            }}
            animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? -50 : index * 8,
                scale: isExiting ? 0.8 : 1 - index * 0.02,
                rotateX: 0,
                z: -index * 10,
            }}
            exit={{
                opacity: 0,
                y: -50,
                scale: 0.8,
                rotateX: -20,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            className={cn(
                "relative pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg",
                variant.bg
            )}
            style={{
                transformStyle: "preserve-3d",
                boxShadow: `0 ${4 + index * 2}px ${12 + index * 4}px rgba(0,0,0,${0.1 + index * 0.05})`,
            }}
        >
            <div className="flex gap-3">
                <div className="flex-shrink-0">{variant.icon}</div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold text-sm">{toast.title}</p>
                    {toast.description && (
                        <p className="text-sm text-muted-foreground">{toast.description}</p>
                    )}
                </div>
                <button
                    onClick={() => {
                        setIsExiting(true);
                        setTimeout(() => onDismiss(toast.id), 300);
                    }}
                    className="flex-shrink-0 rounded-md p-1 hover:bg-muted/50 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    );
}

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastProps[], onDismiss: (id: string) => void }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 perspective-[1000px]">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        index={index}
                        onDismiss={onDismiss}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (toast: Omit<ToastProps, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { ...toast, id, duration: toast.duration || 5000 }]);
    };

    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return {
        toasts,
        addToast,
        dismissToast,
    };
}
