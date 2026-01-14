import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav
            className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}
            style={{ perspective: "1000px" }}
        >
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className="flex items-center gap-1.5 group cursor-pointer"
                        style={{
                            transformStyle: "preserve-3d",
                            transition: "transform 0.2s ease"
                        }}
                    >
                        <div
                            className="hover:text-foreground transition-colors flex items-center gap-1"
                            style={{ transform: "translateZ(0px)" }}
                        >
                            {item.icon && <span className="text-muted-foreground group-hover:text-primary transition-colors">{item.icon}</span>}
                            <span className={cn(index === items.length - 1 && "font-bold text-foreground")}>
                                {item.label}
                            </span>
                        </div>

                        {/* 3D Underline for current item */}
                        {index === items.length - 1 && (
                            <div
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"
                                style={{ transform: "translateZ(5px)" }}
                            />
                        )}
                    </div>

                    {index < items.length - 1 && (
                        <ChevronRight
                            size={14}
                            className="text-muted-foreground/50"
                            style={{ transform: "translateZ(2px)" }}
                        />
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
