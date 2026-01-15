export interface RegistryItem {
    usage: {
        code: string;
        filename: string;
    };
    source: {
        code: string;
        filename: string;
    };
}

export const REGISTRY_DATA: Record<string, RegistryItem> = {
    "button": {
        usage: {
            filename: "Demo.tsx",
            code: `import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`
        },
        source: {
            filename: "components/ui/button.tsx",
            code: `import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, "children"> {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    variant = "default",
    size = "md",
    className,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        default: {
            top: "bg-neutral-800 dark:bg-neutral-100",
            side: "bg-neutral-950 dark:bg-neutral-300",
            text: "text-neutral-50 dark:text-neutral-950",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        },
        secondary: {
            top: "bg-neutral-100 dark:bg-neutral-800",
            side: "bg-neutral-300 dark:bg-neutral-950",
            text: "text-neutral-900 dark:text-neutral-50",
            glow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        },
        destructive: {
            top: "bg-neutral-950 dark:bg-neutral-900 border border-neutral-700",
            side: "bg-black",
            text: "text-neutral-50",
            glow: "shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        },
        outline: {
            top: "bg-background border border-border dark:bg-neutral-900",
            side: "bg-neutral-200 dark:bg-neutral-800",
            text: "text-foreground",
            glow: "shadow-sm"
        },
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const depthSizes = {
        sm: 3,
        md: 4,
        lg: 6,
    };

    const depth = depthSizes[size];

    return (
        <div className={cn("inline-block perspective-[1000px]", className)}>
            <motion.button
                disabled={disabled}
                whileHover={{ y: -2, transition: { duration: 0.1 } }}
                whileTap={{ y: depth - 1 }}
                className="relative group outline-none"
                style={{
                    transformStyle: "preserve-3d",
                }}
                {...props}
            >
                {/* Button Side/Depth */}
                <motion.div
                    className={cn(
                        "absolute inset-0 rounded-lg",
                        variants[variant].side
                    )}
                    style={{
                        transform: \`translateZ(-\${depth}px)\`,
                    }}
                />

                {/* Button Sides (left, right, bottom) - creates the 3D edge */}
                <div
                    className={cn("absolute inset-0 rounded-lg", variants[variant].side)}
                    style={{
                        transform: \`translateY(\${depth}px)\`,
                        height: \`\${depth}px\`,
                        top: '100%',
                    }}
                />

                {/* Button Top Face */}
                <motion.div
                    whileTap={{
                        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                    className={cn(
                        "relative rounded-lg font-semibold transition-all duration-100",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)]",
                        variants[variant].top,
                        variants[variant].text,
                        variants[variant].glow,
                        sizes[size],
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                    style={{
                        transform: \`translateZ(\${depth}px)\`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                        {children}
                    </span>
                </motion.div>
            </motion.button>
        </div>
    );
}`
        }
    },
    "alert": {
        usage: {
            filename: "Demo.tsx",
            code: `import { Alert } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Alert title="Default Alert">
        This is a standard information alert with a 3D effect.
      </Alert>
      <Alert variant="success" title="Success Alert">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning Alert">
        Please review your information before proceeding.
      </Alert>
      <Alert variant="destructive" title="Error Alert">
        Something went wrong while processing your request.
      </Alert>
    </div>
  );
}`
        },
        source: {
            filename: "components/ui/alert.tsx",
            code: `import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
    title?: string;
    children?: React.ReactNode;
    variant?: "default" | "destructive" | "warning" | "success";
    className?: string;
    icon?: React.ReactNode;
}

export function Alert({
    title,
    children,
    variant = "default",
    className,
    icon
}: AlertProps) {
    const variants = {
        default: {
            bg: "bg-neutral-50 dark:bg-neutral-950/20",
            border: "border-neutral-200 dark:border-neutral-800",
            text: "text-neutral-800 dark:text-neutral-300",
            icon: <Info className="h-5 w-5 text-neutral-500" />
        },
        destructive: {
            bg: "bg-neutral-100 dark:bg-black/40",
            border: "border-neutral-900 dark:border-neutral-100",
            text: "text-neutral-950 dark:text-neutral-50",
            icon: <AlertCircle className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
        },
        warning: {
            bg: "bg-neutral-50 dark:bg-neutral-900/40",
            border: "border-neutral-400 dark:border-neutral-600",
            text: "text-neutral-900 dark:text-neutral-200",
            icon: <AlertTriangle className="h-5 w-5 text-neutral-600" />
        },
        success: {
            bg: "bg-neutral-50 dark:bg-neutral-950/50",
            border: "border-neutral-300 dark:border-neutral-700",
            text: "text-neutral-950 dark:text-neutral-50",
            icon: <CheckCircle2 className="h-5 w-5 text-neutral-500" />
        }
    };

    const style = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={cn(
                "relative w-full rounded-xl border-2 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                style.bg,
                style.border,
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {/* 3D Depth Effect */}
            <div
                className={cn("absolute inset-0 rounded-xl opacity-20", style.bg)}
                style={{ transform: "translateZ(-4px)", zIndex: -1 }}
            />

            <div className="flex gap-4">
                <div className="flex-shrink-0 animate-pulse">
                    {icon || style.icon}
                </div>
                <div className="flex-1 space-y-1">
                    {title && (
                        <h5 className={cn("font-bold leading-none tracking-tight", style.text)}>
                            {title}
                        </h5>
                    )}
                    {children && (
                        <div className={cn("text-sm opacity-90", style.text)}>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}`
        }
    },
    "badge": {
        usage: {
            filename: "Demo.tsx",
            code: `import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`
        },
        source: {
            filename: "components/ui/badge.tsx",
            code: `import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline";
    animate?: boolean;
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    animate = true,
    className
}: BadgeProps) {
    const variants = {
        default: "bg-neutral-900 text-neutral-50 border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900",
        secondary: "bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700",
        destructive: "bg-neutral-50 text-neutral-950 border-neutral-950 font-black dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-50",
        outline: "bg-background text-foreground border-border",
    };

    return (
        <motion.span
            whileHover={animate ? { y: -2, translateZ: "10px" } : undefined}
            animate={animate ? { y: 0, translateZ: "0px" } : undefined}
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-md",
                variants[variant],
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <span className="relative z-10">{children}</span>
        </motion.span>
    );
}`
        }
    },
    "input": {
        usage: {
            filename: "Demo.tsx",
            code: `import { Input } from "@/components/ui/input";

export default function InputDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <Input placeholder="Enter your email" label="Email" />
      <Input placeholder="Search..." icon={<Search size={18} />} />
    </div>
  );
}`
        },
        source: {
            filename: "components/ui/input.tsx",
            code: `import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-2 text-foreground">
                    {label}
                </label>
            )}

            <div className="perspective-[800px]">
                <motion.div
                    animate={{
                        rotateX: isFocused ? -2 : 0,
                        y: isFocused ? -1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                    }}
                    className="relative"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div
                        className={cn(
                            "absolute inset-0 rounded-lg",
                            error ? "bg-black" : "bg-gray-400"
                        )}
                        style={{ transform: "translateZ(-4px)" }}
                    />
                    <input
                        {...props}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={cn(
                            "relative w-full px-4 py-2.5 rounded-lg border-2",
                            className
                        )}
                        style={{ transform: "translateZ(2px)" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}`
        }
    },
    "icons": {
        usage: {
            filename: "Demo.tsx",
            code: `import { ThreeDIcon } from "@/components/ui/3d-icon";
import { Search, Home, Settings } from "lucide-react";

export default function IconsDemo() {
  return (
    <div className="flex gap-12 p-8">
      <ThreeDIcon size={48}><Search size={48} /></ThreeDIcon>
      <ThreeDIcon size={48}><Home size={48} /></ThreeDIcon>
      <ThreeDIcon size={48}><Settings size={48} /></ThreeDIcon>
    </div>
  );
}`
        },
        source: {
            filename: "components/ui/3d-icon.tsx",
            code: `import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDIconProps {
    children: React.ReactNode;
    color?: string;
    depth?: number;
    size?: number;
    className?: string;
    animate?: boolean;
}

export function ThreeDIcon({
    children,
    color = "currentColor",
    depth = 4,
    size = 24,
    className,
    animate = true
}: ThreeDIconProps) {
    return (
        <div
            className={cn("relative inline-block perspective-[500px]", className)}
            style={{ width: size, height: size }}
        >
            <motion.div
                animate={animate ? {
                    rotateY: [0, 10, -10, 0],
                    rotateX: [0, -10, 10, 0],
                } : {}}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            transform: \`translateZ(-\${i}px)\`,
                            color: i === 0 ? color : \`color-mix(in srgb, \${color}, black \${i * 10}%)\`,
                            opacity: 1 - (i / (depth * 2)),
                        }}
                    >
                        {children}
                    </div>
                ))}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "translateZ(1px)",
                        color: color,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}`
        }
    }
};
