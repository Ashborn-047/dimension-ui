import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartProps {
    data: number[];
    className?: string;
}

export function Chart({ data, className }: ChartProps) {
    const max = Math.max(...data);

    return (
        <div className={cn("flex items-end gap-2 h-48 px-4 py-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-2xl", className)} style={{ perspective: "1000px" }}>
            {data.map((val, i) => {
                const height = (val / max) * 100;
                return (
                    <div key={i} className="relative flex-1 group" style={{ height: "100%", transformStyle: "preserve-3d" }}>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            whileHover={{ translateZ: "20px", scale: 1.05 }}
                            className="absolute bottom-0 w-full bg-neutral-900 dark:bg-white rounded-t-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* 3D Sides for the bar */}
                            <div
                                className="absolute inset-y-0 -left-1 w-1 bg-neutral-700 dark:bg-neutral-200"
                                style={{ transform: "rotateY(-90deg)", transformOrigin: "right" }}
                            />
                            <div
                                className="absolute inset-x-0 -top-1 h-1 bg-neutral-800 dark:bg-neutral-100"
                                style={{ transform: "rotateX(90deg)", transformOrigin: "bottom" }}
                            />

                            {/* Tooltip on hover */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-neutral-50 px-2 py-1 rounded text-[10px] font-bold">
                                {val}
                            </div>
                        </motion.div>
                    </div>
                );
            })}

            {/* Chart Base */}
            <div className="absolute inset-x-0 bottom-0 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-b-2xl border-t border-neutral-200 dark:border-neutral-700" />
        </div>
    );
}
