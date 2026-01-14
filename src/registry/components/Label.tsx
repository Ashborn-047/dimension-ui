import React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    className?: string;
    required?: boolean;
}

export function Label({ children, className, required, ...props }: LabelProps) {
    return (
        <label
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex items-center gap-1",
                className
            )}
            style={{
                transform: "translateZ(5px)",
                transformStyle: "preserve-3d",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
            {...props}
        >
            {children}
            {required && <span className="text-destructive text-xs animate-pulse opacity-70" style={{ transform: "translateZ(2px)" }}>*</span>}
        </label>
    );
}
