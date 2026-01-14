import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Drawer({
    isOpen,
    onClose,
    children,
    className
}: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
    className?: string
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ y: "100%", rotateX: 20 }}
                        animate={{ y: 0, rotateX: 0 }}
                        exit={{ y: "100%", rotateX: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]",
                            className
                        )}
                        style={{
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* Grab Handle */}
                        <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 shadow-inner" />

                        <div className="relative" style={{ transform: "translateZ(20px)" }}>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
