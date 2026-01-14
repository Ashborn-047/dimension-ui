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
            icon: <Info size={20} className="text-blue-500" />,
        },
        success: {
            bg: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
            icon: <CheckCircle size={20} className="text-green-500" />,
        },
        error: {
            bg: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
            icon: <AlertCircle size={20} className="text-red-500" />,
        },
        warning: {
            bg: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
            icon: <AlertTriangle size={20} className="text-yellow-500" />,
        },
        info: {
            bg: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
            icon: <Info size={20} className="text-blue-500" />,
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
