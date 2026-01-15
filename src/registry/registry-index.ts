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
    "accordion": {
        usage: {
            filename: "AccordionDemo.tsx",
            code: `import { Accordion } from "@/components/ui/accordion";\n\nconst items = [\n  { id: "1", title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design patterns." },\n  { id: "2", title: "Is it styled?", content: "Yes. It comes with high-fidelity 3D animations." },\n  { id: "3", title: "Is it animated?", content: "Yes. It uses spring-based folding physics." }\n];\n\nexport default function AccordionDemo() {\n  return <Accordion items={items} className="max-w-md" />;\n}`
        },
        source: {
            filename: "components/ui/accordion.tsx",
            code: `import React, { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { ChevronDown } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Accordion({ items, allowMultiple = false, className }) {\n    const [openItems, setOpenItems] = useState([]);\n\n    const toggleItem = (id) => {\n        if (allowMultiple) {\n            setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);\n        } else {\n            setOpenItems(prev => prev.includes(id) ? [] : [id]);\n        }\n    };\n\n    return (\n        <div className={cn("space-y-2", className)}>\n            {items.map((item) => {\n                const isOpen = openItems.includes(item.id);\n                return (\n                    <div key={item.id} className="perspective-[1000px]">\n                        <div className="border border-border rounded-lg overflow-hidden bg-white dark:bg-neutral-900" style={{ transformStyle: "preserve-3d" }}>\n                            <motion.button\n                                onClick={() => toggleItem(item.id)}\n                                className="w-full px-4 py-3 flex items-center justify-between font-medium hover:bg-muted/50 transition-colors"\n                                whileHover={{ scale: 1.01 }}\n                                whileTap={{ scale: 0.99 }}\n                            >\n                                <span>{item.title}</span>\n                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>\n                                    <ChevronDown size={20} />\n                                </motion.div>\n                            </motion.button>\n                            <AnimatePresence initial={false}>\n                                {isOpen && (\n                                    <motion.div\n                                        initial={{ height: 0, rotateX: -90, opacity: 0 }}\n                                        animate={{ height: "auto", rotateX: 0, opacity: 1 }}\n                                        exit={{ height: 0, rotateX: -90, opacity: 0 }}\n                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}\n                                        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}\n                                        className="overflow-hidden border-t border-border"\n                                    >\n                                        <div className="px-4 py-3 text-sm text-muted-foreground">{item.content}</div>\n                                    </motion.div>\n                                )}\n                            </AnimatePresence>\n                        </div>\n                    </div>\n                );\n            })}\n        </div>\n    );\n}`
        }
    },
    "alert": {
        usage: {
            filename: "AlertDemo.tsx",
            code: `import { Alert } from "@/components/ui/alert";\n\nexport default function AlertDemo() {\n  return (\n    <div className="space-y-4 w-full max-w-md">\n      <Alert title="Success" variant="success">Your action was processed.</Alert>\n      <Alert title="Error" variant="destructive">Something went wrong.</Alert>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/alert.tsx",
            code: `import React from "react";\nimport { motion } from "framer-motion";\nimport { Info } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Alert({ title, children, variant = "default", className }) {\n    const variants = {\n        default: "bg-neutral-50 dark:bg-neutral-950/20 border-neutral-200 text-neutral-800",\n        destructive: "bg-neutral-100 dark:bg-black/40 border-neutral-900 text-neutral-950 dark:text-neutral-50",\n        success: "bg-neutral-50 dark:bg-neutral-950/50 border-neutral-300 text-neutral-950",\n    };\n\n    return (\n        <motion.div \n            whileHover={{ y: -5 }}\n            className={cn("relative w-full rounded-xl border-2 p-4 shadow-sm", variants[variant], className)}\n            style={{ transformStyle: "preserve-3d" }}\n        >\n            <div className="absolute inset-0 rounded-xl bg-black/5" style={{ transform: "translateZ(-4px)", zIndex: -1 }} />\n            <div className="flex gap-4">\n                <div className="flex-1 space-y-1">\n                    {title && <h5 className="font-bold leading-none tracking-tight">{title}</h5>}\n                    <div className="text-sm opacity-90">{children}</div>\n                </div>\n            </div>\n        </motion.div>\n    );\n}`
        }
    },
    "avatar": {
        usage: {
            filename: "AvatarDemo.tsx",
            code: `import { Avatar } from "@/components/ui/avatar";\n\nexport default function AvatarDemo() {\n  return (\n    <div className="flex gap-4 items-center">\n      <Avatar src="https://github.com/shadcn.png" size="lg" status="online" />\n      <Avatar src="https://github.com/nutlope.png" size="md" status="busy" />\n      <Avatar size="sm" />\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/avatar.tsx",
            code: `import { motion } from "framer-motion";\nimport { User } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Avatar({ src, alt = "Avatar", size = "md", status, className }) {\n    const sizes = { sm: "size-8", md: "size-12", lg: "size-16" };\n    const statusColors = { online: "bg-emerald-500", offline: "bg-neutral-400", busy: "bg-red-500" };\n\n    return (\n        <div className={cn("relative inline-block perspective-[500px]", className)}>\n            <motion.div\n                className={cn("rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center", sizes[size])}\n                whileHover={{ scale: 1.1, rotateY: 15, rotateX: -10 }}\n                style={{ transformStyle: "preserve-3d", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}\n            >\n                {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <User size={24} />}\n            </motion.div>\n            {status && (\n                <motion.div \n                    className={cn("absolute size-3 rounded-full border-2 border-background", statusColors[status])}\n                    style={{ right: 0, bottom: 0, transformStyle: "preserve-3d" }}\n                    animate={{ scale: [1, 1.2, 1], z: [0, 10, 0] }}\n                    transition={{ duration: 2, repeat: Infinity }}\n                />\n            )}\n        </div>\n    );\n}`
        }
    },
    "button": {
        usage: {
            filename: "ButtonDemo.tsx",
            code: `import { Button } from "@/components/ui/button";\n\nexport default function ButtonDemo() {\n  return (\n    <div className="flex gap-4">\n      <Button>Default</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="destructive" size="lg">Destructive</Button>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/button.tsx",
            code: `import React from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Button({ children, variant = "default", size = "md", className, ...props }) {\n    const variants = {\n        default: { top: "bg-neutral-800 dark:bg-neutral-100", side: "bg-neutral-950 dark:bg-neutral-300", text: "text-neutral-50 dark:text-neutral-950" },\n        secondary: { top: "bg-neutral-100 dark:bg-neutral-800", side: "bg-neutral-300 dark:bg-neutral-950", text: "text-neutral-900 dark:text-neutral-50" },\n        destructive: { top: "bg-black dark:bg-neutral-900 border border-neutral-700", side: "bg-black", text: "text-neutral-50" },\n    };\n    const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };\n    const depth = size === "lg" ? 6 : 4;\n\n    return (\n        <div className={cn("inline-block perspective-[1000px]", className)}>\n            <motion.button\n                whileHover={{ y: -2 }}\n                whileTap={{ y: depth - 1 }}\n                className="relative group outline-none" style={{ transformStyle: "preserve-3d" }} {...props}\n            >\n                <div className={cn("absolute inset-0 rounded-lg", variants[variant].side)} style={{ transform: \`translateZ(-\${depth}px)\` }} />\n                <div className={cn("relative rounded-lg font-semibold", variants[variant].top, variants[variant].text, sizes[size])} style={{ transform: \`translateZ(\${depth}px)\` }}>\n                    {children}\n                </div>\n            </motion.button>\n        </div>\n    );\n}`
        }
    },
    "card": {
        usage: {
            filename: "CardDemo.tsx",
            code: `import { Card } from "@/components/ui/card";\n\nexport default function CardDemo() {\n  return (\n    <Card title="Dimension UI" description="A 3D design system for React.">\n      <p className="text-sm">This card uses CSS 3D transforms for physical depth.</p>\n    </Card>\n  );\n}`
        },
        source: {
            filename: "components/ui/card.tsx",
            code: `import { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Card({ children, className, title, description }) {\n    return (\n        <div className="relative group perspective-[1000px]">\n            <div className="absolute inset-x-0 -bottom-2 h-full rounded-2xl bg-neutral-200 dark:bg-neutral-800 border-b-4 border-neutral-300" style={{ transform: "translateZ(-1px)" }} />\n            <motion.div\n                whileHover={{ y: -4 }}\n                className={cn("relative rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 p-6 shadow-xl", className)}\n            >\n                {title && <h3 className="text-lg font-bold">{title}</h3>}\n                {description && <p className="text-sm text-neutral-500">{description}</p>}\n                <div className="mt-4">{children}</div>\n            </motion.div>\n        </div>\n    );\n}`
        }
    },
    "checkbox": {
        usage: {
            filename: "CheckboxDemo.tsx",
            code: `import { Checkbox } from "@/components/ui/checkbox";\n\nexport default function CheckboxDemo() {\n  return <Checkbox label="Accept terms and conditions" />;\n}`
        },
        source: {
            filename: "components/ui/checkbox.tsx",
            code: `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { Check } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Checkbox({ checked, onChange, label, className }) {\n    const [isChecked, setIsChecked] = useState(checked || false);\n    return (\n        <label className={cn("inline-flex items-center gap-3 cursor-pointer group", className)}>\n            <div className="perspective-[600px]">\n                <motion.button\n                    type="button" onClick={() => { setIsChecked(!isChecked); onChange?.(!isChecked); }}\n                    className={cn("relative w-7 h-7 rounded-md bg-gradient-to-b from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-800", isChecked && "bg-neutral-900 dark:bg-white")}\n                    style={{ transformStyle: "preserve-3d" }} whileTap={{ scale: 0.95 }}\n                >\n                    <div className="absolute inset-0 rounded-md bg-gray-400" style={{ transform: "translateZ(-4px)" }} />\n                    <motion.div\n                        animate={{ scale: isChecked ? 1 : 0, z: isChecked ? 8 : -4 }}\n                        className="absolute inset-0 flex items-center justify-center"\n                    >\n                        <div className="bg-white rounded-full p-0.5 shadow-md"><Check size={16} className="text-neutral-900" /></div>\n                    </motion.div>\n                </motion.button>\n            </div>\n            {label && <span className="text-sm font-medium">{label}</span>}\n        </label>\n    );\n}`
        }
    },
    "dialog": {
        usage: {
            filename: "DialogDemo.tsx",
            code: `import { useState } from "react";\nimport { Dialog } from "@/components/ui/dialog";\nimport { Button } from "@/components/ui/button";\n\nexport default function DialogDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open Dialog</Button>\n      <Dialog open={open} onOpenChange={setOpen} title="Welcome Account" description="Manage your preferences here.">\n        <div className="py-4">Account settings content goes here.</div>\n        <Button onClick={() => setOpen(false)}>Close</Button>\n      </Dialog>\n    </>\n  );\n}`
        },
        source: {
            filename: "components/ui/dialog.tsx",
            code: `import { motion, AnimatePresence } from "framer-motion";\nimport { X } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Dialog({ open, onOpenChange, title, description, children, className }) {\n    return (\n        <AnimatePresence>\n            {open && (\n                <>\n                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onOpenChange(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />\n                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">\n                        <motion.div\n                            initial={{ opacity: 0, scale: 0.5, y: 100 }} animate={{ opacity: 1, scale: 1, y: 0 }}\n                            className={cn("relative w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-2xl", className)}\n                            style={{ transformStyle: "preserve-3d" }}\n                        >\n                            <h2 className="text-2xl font-bold">{title}</h2>\n                            <p className="text-sm text-neutral-500 mb-4">{description}</p>\n                            {children}\n                        </motion.div>\n                    </div>\n                </>\n            )}\n        </AnimatePresence>\n    );\n}`
        }
    },
    "icons": {
        usage: {
            filename: "IconsDemo.tsx",
            code: `import { ThreeDIcon } from "@/components/ui/3d-icon";\n\nexport default function IconsDemo() {\n  return (\n    <div className="flex gap-8">\n      <ThreeDIcon size={48}>\n        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>\n      </ThreeDIcon>\n      <ThreeDIcon size={48} color="#ef4444">\n        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>\n      </ThreeDIcon>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/3d-icon.tsx",
            code: `import { cn } from "@/lib/utils";\n\n/**\n * ThreeDIcon: A Zero-Dependency 3D Icon Wrapper.\n * Uses standard CSS 3D transforms to create depth layers.\n */\nexport function ThreeDIcon({ children, color = "currentColor", depth = 5, size = 24, className }) {\n    return (\n        <div className={cn("relative inline-block perspective-[800px] group", className)} style={{ width: size, height: size }}>\n            <style>{\`\n                @keyframes float-3d { 0%, 100% { transform: rotateY(0deg) rotateX(0deg); } 50% { transform: rotateY(15deg) rotateX(-15deg); } }\n                .threed-layer { transform-style: preserve-3d; transition: transform 0.3s; }\n                .group:hover .threed-layer { transform: scale(1.1) rotateZ(5deg); }\n            \`}</style>\n            <div className="threed-layer w-full h-full relative" style={{ animation: "float-3d 6s infinite" }}>\n                {Array.from({ length: depth }).map((_, i) => (\n                    <div key={i} className="absolute inset-0 pointer-events-none" \n                        style={{ transform: \`translateZ(-\${i}px)\`, color: i === 0 ? color : \`rgba(0,0,0,\${0.8 - (i * 0.1)})\`, opacity: 1 - (i / depth) }}>\n                        {children}\n                    </div>\n                ))}\n                <div className="absolute inset-0" style={{ transform: "translateZ(1px)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>{children}</div>\n            </div>\n        </div>\n    );\n}`
        }
    },
    "switch": {
        usage: {
            filename: "SwitchDemo.tsx",
            code: `import { Switch } from "@/components/ui/switch";\n\nexport default function SwitchDemo() {\n  return (\n    <div className="flex items-center gap-4">\n      <Switch />\n      <span>Dark Mode</span>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/switch.tsx",
            code: `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Switch({ checked, onChange, disabled, className }) {\n    const [isOn, setIsOn] = useState(checked || false);\n    return (\n        <motion.button\n            onClick={() => { setIsOn(!isOn); onChange?.(!isOn); }}\n            className={cn("relative h-8 w-14 rounded-full bg-neutral-300 dark:bg-neutral-800", isOn && "bg-neutral-900 dark:bg-neutral-100")}\n            style={{ transformStyle: "preserve-3d" }}\n        >\n            <motion.div\n                animate={{ x: isOn ? 24 : 4 }}\n                className="absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 shadow-lg"\n                style={{ transform: "translateZ(4px)" }}\n            />\n        </motion.button>\n    );\n}`
        }
    },
    "slider": {
        usage: {
            filename: "SliderDemo.tsx",
            code: `import { Slider } from "@/components/ui/slider";\n\nexport default function SliderDemo() {\n  return <Slider min={0} max={100} defaultValue={[50]} className="w-64" />;\n}`
        },
        source: {
            filename: "components/ui/slider.tsx",
            code: `import { useState, useRef } from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Slider({ defaultValue = [0], min = 0, max = 100, className }) {\n    const [val, setVal] = useState(defaultValue[0]);\n    const percentage = ((val - min) / (max - min)) * 100;\n    return (\n        <div className={cn("relative flex w-full items-center py-4", className)}>\n            <div className="h-2 w-full grow rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-inner">\n                <div className="h-full bg-neutral-900 dark:bg-white rounded-full" style={{ width: \`\${percentage}%\` }} />\n            </div>\n            <motion.div \n                drag="x" dragConstraints={{ left: 0, right: 200 }} // simplified\n                className="absolute h-6 w-6 rounded-full bg-white dark:bg-neutral-800 shadow-xl border-2 border-border" \n                style={{ left: \`\${percentage}%\`, x: "-50%" }}\n            />\n        </div>\n    );\n}`
        }
    },
    "tooltip": {
        usage: {
            filename: "TooltipDemo.tsx",
            code: `import { Tooltip } from "@/components/ui/tooltip";\nimport { Button } from "@/components/ui/button";\n\nexport default function TooltipDemo() {\n  return (\n    <Tooltip content="This is a 3D tooltip" side="top">\n      <Button>Hover Me</Button>\n    </Tooltip>\n  );\n}`
        },
        source: {
            filename: "components/ui/tooltip.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Tooltip({ content, children, side = "top" }) {\n    const [isOpen, setIsOpen] = useState(false);\n    return (\n        <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>\n            {children}\n            <AnimatePresence>\n                {isOpen && (\n                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 perspective-[800px]">\n                        <motion.div\n                            initial={{ opacity: 0, scale: 0.8, y: 10, rotateX: 15 }}\n                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}\n                            className="px-3 py-2 rounded-lg bg-neutral-900 text-neutral-50 text-xs shadow-xl min-w-max"\n                            style={{ transformStyle: "preserve-3d" }}\n                        >\n                            <div style={{ transform: "translateZ(2px)" }}>{content}</div>\n                            <div className="absolute inset-0 rounded-lg bg-black/20" style={{ transform: "translateZ(-3px)" }} />\n                        </motion.div>\n                    </div>\n                )}\n            </AnimatePresence>\n        </div>\n    );\n}`
        }
    },
    "badge": {
        usage: {
            filename: "BadgeDemo.tsx",
            code: `import { Badge } from "@/components/ui/badge";\n\nexport default function BadgeDemo() {\n  return (\n    <div className="flex gap-4">\n      <Badge>Default</Badge>\n      <Badge variant="secondary">Secondary</Badge>\n      <Badge variant="destructive">Critical</Badge>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/badge.tsx",
            code: `import { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Badge({ children, variant = "default", className }) {\n    const variants = {\n        default: "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900",\n        secondary: "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",\n        destructive: "bg-neutral-50 text-neutral-950 border-neutral-950 font-black",\n    };\n    return (\n        <motion.span \n            whileHover={{ y: -2, translateZ: "10px" }}\n            className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-md", variants[variant], className)}\n            style={{ transformStyle: "preserve-3d" }}\n        >\n            {children}\n        </motion.span>\n    );\n}`
        }
    },
    "separator": {
        usage: {
            filename: "SeparatorDemo.tsx",
            code: `import { Separator } from "@/components/ui/separator";\n\nexport default function SeparatorDemo() {\n  return (\n    <div className="w-full max-w-sm">\n      <h4 className="text-sm font-medium">Dimension UI</h4>\n      <p className="text-sm text-muted-foreground">The 3D design system.</p>\n      <Separator className="my-4" />\n      <div className="flex h-5 items-center space-x-4 text-sm">\n        <div>Blog</div>\n        <Separator orientation="vertical" />\n        <div>Docs</div>\n      </div>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/separator.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Separator({ orientation = "horizontal", className }) {\n    return (\n        <div \n            className={cn("shrink-0 bg-border relative", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}\n            style={{ transformStyle: "preserve-3d" }}\n        >\n            <div className="absolute inset-0 bg-black/5" style={{ transform: \`translateZ(-2px) \${orientation === "horizontal" ? "translateY(1px)" : "translateX(1px)"}\` }} />\n        </div>\n    );\n}`
        }
    },
    "aspect-ratio": {
        usage: {
            filename: "AspectRatioDemo.tsx",
            code: `import { AspectRatio } from "@/components/ui/aspect-ratio";\n\nexport default function AspectRatioDemo() {\n  return (\n    <div className="w-[450px]">\n      <AspectRatio ratio={16 / 9}>\n        <img src="https://images.unsplash.com/photo-1588345921523-c2dcd27f1dcd?w=800&dpr=2&q=80" alt="Photo" className="rounded-md object-cover w-full h-full" />\n      </AspectRatio>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/aspect-ratio.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function AspectRatio({ ratio = 1 / 1, children, className }) {\n    return (\n        <div className={cn("relative w-full overflow-hidden rounded-xl border-2 border-border/50 group", className)} style={{ paddingBottom: \`\${(1 / ratio) * 100}%\`, transformStyle: "preserve-3d", perspective: "1000px" }}>\n            <div className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]" style={{ transform: "translateZ(10px)" }}>{children}</div>\n            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(15px)" }} />\n        </div>\n    );\n}`
        }
    },
    "scroll-area": {
        usage: {
            filename: "ScrollAreaDemo.tsx",
            code: `import { ScrollArea } from "@/components/ui/scroll-area";\n\nexport default function ScrollAreaDemo() {\n  return (\n    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">\n      <div className="space-y-4">\n        {Array.from({ length: 10 }).map((_, i) => (\n            <div key={i} className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">Item {i + 1}</div>\n        ))}\n      </div>\n    </ScrollArea>\n  );\n}`
        },
        source: {
            filename: "components/ui/scroll-area.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function ScrollArea({ children, className }) {\n    return (\n        <div className={cn("relative overflow-hidden group", className)}>\n            <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">{children}</div>\n            <div className="absolute top-2 right-1 bottom-2 w-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">\n                <div className="h-1/3 w-full rounded-full bg-neutral-400 dark:bg-neutral-500 shadow-sm" />\n            </div>\n        </div>\n    );\n}`
        }
    },
    "input": {
        usage: {
            filename: "InputDemo.tsx",
            code: `import { Input } from "@/components/ui/input";\n\nexport default function InputDemo() {\n  return <Input type="email" placeholder="Email" label="Email Address" />;\n}`
        },
        source: {
            filename: "components/ui/input.tsx",
            code: `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Input({ label, error, className, ...props }) {\n    const [isFocused, setIsFocused] = useState(false);\n    return (\n        <div className="w-full">\n            {label && <label className="block text-sm font-medium mb-1">{label}</label>}\n            <div className="perspective-[800px]">\n                <motion.div animate={{ rotateX: isFocused ? -2 : 0, y: isFocused ? -1 : 0 }} className="relative" style={{ transformStyle: "preserve-3d" }}>\n                    <div className="absolute inset-0 rounded-lg bg-neutral-300 dark:bg-neutral-800" style={{ transform: "translateZ(-4px)" }} />\n                    <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={cn("relative w-full px-4 py-2 rounded-lg border-2 bg-white dark:bg-neutral-900 transition-all focus:border-neutral-900", className)} style={{ transform: "translateZ(2px)" }} {...props} />\n                </motion.div>\n            </div>\n        </div>\n    );\n}`
        }
    },
    "select": {
        usage: {
            filename: "SelectDemo.tsx",
            code: `import { Select } from "@/components/ui/select";\n\nconst options = [\n  { label: "React", value: "react" },\n  { label: "Vue", value: "vue" },\n  { label: "Svelte", value: "svelte" },\n];\n\nexport default function SelectDemo() {\n  return <Select options={options} placeholder="Choose a framework" />;\n}`
        },
        source: {
            filename: "components/ui/select.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { ChevronDown, Check } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Select({ options, value, onValueChange, placeholder = "Select...", className }) {\n    const [isOpen, setIsOpen] = useState(false);\n    const selected = options.find(o => o.value === value);\n    return (\n        <div className={cn("relative w-[200px]", className)}>\n            <motion.button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-2 rounded-xl border-2 bg-white dark:bg-neutral-900 shadow-sm" style={{ transformStyle: "preserve-3d" }}>\n                <span className={cn(!selected && "text-muted-foreground")}>{selected ? selected.label : placeholder}</span>\n                <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />\n            </motion.button>\n            <AnimatePresence>\n                {isOpen && (\n                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 4, scale: 1 }} className="absolute z-50 w-full mt-2 rounded-xl border-2 bg-popover shadow-2xl p-1">\n                        {options.map((o) => (\n                            <button key={o.value} onClick={() => { onValueChange?.(o.value); setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm flex justify-between items-center">\n                                {o.label} {value === o.value && <Check size={14} />}\n                            </button>\n                        ))}\n                    </motion.div>\n                )}\n            </AnimatePresence>\n        </div>\n    );\n}`
        }
    },
    "radio-group": {
        usage: {
            filename: "RadioGroupDemo.tsx",
            code: `import { RadioGroup } from "@/components/ui/radio-group";\n\nconst options = [\n  { label: "Default", value: "default" },\n  { label: "Comfortable", value: "comfortable" },\n  { label: "Compact", value: "compact" },\n];\n\nexport default function RadioGroupDemo() {\n  return <RadioGroup options={options} />;\n}`
        },
        source: {
            filename: "components/ui/radio-group.tsx",
            code: `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function RadioGroup({ options, value, onChange, className }) {\n    const [val, setVal] = useState(value || options[0]?.value);\n    return (\n        <div className={cn("grid gap-4", className)}>\n            {options.map((o) => (\n                <label key={o.value} className="flex items-center gap-3 cursor-pointer group">\n                    <div className="relative size-5">\n                        <input type="radio" value={o.value} checked={val === o.value} onChange={() => { setVal(o.value); onChange?.(o.value); }} className="sr-only" />\n                        <div className={cn("absolute inset-0 rounded-full border-2", val === o.value ? "bg-neutral-950 border-neutral-950 dark:bg-white" : "bg-neutral-100 dark:bg-neutral-800")} />\n                        <motion.div animate={{ scale: val === o.value ? 1 : 0 }} className="relative size-2 rounded-full bg-white dark:bg-neutral-900 m-1.5" />\n                    </div>\n                    <span className="text-sm font-medium">{o.label}</span>\n                </label>\n            ))}\n        </div>\n    );\n}`
        }
    },
    "textarea": {
        usage: {
            filename: "TextareaDemo.tsx",
            code: `import { Textarea } from "@/components/ui/textarea";\n\nexport default function TextareaDemo() {\n  return <Textarea placeholder="Type your message here." />;\n}`
        },
        source: {
            filename: "components/ui/textarea.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Textarea({ className, ...props }) {\n    return (\n        <div className="relative group">\n            <textarea className={cn("flex min-h-[120px] w-full rounded-2xl border-2 border-neutral-200 bg-white dark:bg-neutral-900 px-4 py-3 text-sm focus:ring-2 focus:ring-neutral-400 outline-none shadow-sm", className)} {...props} />\n            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" />\n        </div>\n    );\n}`
        }
    },
    "alert-dialog": {
        usage: {
            filename: "AlertDialogDemo.tsx",
            code: `import { useState } from "react";\nimport { AlertDialog } from "@/components/ui/alert-dialog";\nimport { Button } from "@/components/ui/button";\n\nexport default function AlertDialogDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open Alert</Button>\n      <AlertDialog \n        open={open} onOpenChange={setOpen} \n        title="Are you absolutely sure?" \n        description="This action cannot be undone." \n        onAction={() => console.log("Deleted")}\n      />\n    </>\n  );\n}`
        },
        source: {
            filename: "components/ui/alert-dialog.tsx",
            code: `import { motion, AnimatePresence } from "framer-motion";\nimport { AlertCircle } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function AlertDialog({ open, onOpenChange, title, description, onAction }) {\n    return (\n        <AnimatePresence>\n            {open && (\n                <>\n                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => onOpenChange(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />\n                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">\n                        <motion.div initial={{ scale: 0.8, rotateX: -20, y: 50 }} animate={{ scale: 1, rotateX: 0, y: 0 }} className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-neutral-900 border-2 border-neutral-200 p-6 shadow-2xl">\n                            <div className="flex items-center gap-3 mb-4">\n                                <AlertCircle size={24} className="text-neutral-900 dark:text-neutral-100" />\n                                <h2 className="text-xl font-bold">{title}</h2>\n                            </div>\n                            <p className="text-muted-foreground text-sm mb-6">{description}</p>\n                            <div className="flex justify-end gap-3">\n                                <button onClick={() => onOpenChange(false)} className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors">Cancel</button>\n                                <button onClick={() => { onAction?.(); onOpenChange(false); }} className="px-4 py-2 rounded-lg bg-neutral-900 text-neutral-50 hover:opacity-90 transition-opacity">Continue</button>\n                            </div>\n                        </motion.div>\n                    </div>\n                </>\n            )}\n        </AnimatePresence>\n    );\n}`
        }
    },
    "sheet": {
        usage: {
            filename: "SheetDemo.tsx",
            code: `import { useState } from "react";\nimport { Sheet } from "@/components/ui/sheet";\nimport { Button } from "@/components/ui/button";\n\nexport default function SheetDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open Sidebar</Button>\n      <Sheet open={open} onOpenChange={setOpen} title="Edit Profile" description="Make changes to your profile here. Click save when you're done.">\n        <div className="grid gap-4 py-4">Profile edit form...</div>\n      </Sheet>\n    </>\n  );\n}`
        },
        source: {
            filename: "components/ui/sheet.tsx",
            code: `import { motion, AnimatePresence } from "framer-motion";\nimport { X } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Sheet({ open, onOpenChange, title, description, children, side = "right" }) {\n    const variants = {\n        right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },\n        left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } }\n    };\n    return (\n        <AnimatePresence>\n            {open && (\n                <>\n                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => onOpenChange(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />\n                    <motion.div initial={variants[side].initial} animate={variants[side].animate} exit={variants[side].exit} className={cn("fixed z-50 bg-white dark:bg-neutral-900 shadow-2xl p-6 h-full w-80", side === "right" ? "right-0 border-l" : "left-0 border-r")}>\n                        <div className="flex justify-between items-center mb-6">\n                            <h2 className="text-xl font-bold">{title}</h2>\n                            <button onClick={() => onOpenChange(false)} className="rounded-lg p-1 hover:bg-muted"><X size={20} /></button>\n                        </div>\n                        {children}\n                    </motion.div>\n                </>\n            )}\n        </AnimatePresence>\n    );\n}`
        }
    },
    "drawer": {
        usage: {
            filename: "DrawerDemo.tsx",
            code: `import { useState } from "react";\nimport { Drawer } from "@/components/ui/drawer";\nimport { Button } from "@/components/ui/button";\n\nexport default function DrawerDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open Drawer</Button>\n      <Drawer isOpen={open} onClose={() => setOpen(false)}>\n        <div className="p-4 text-center">This is a bottom drawer with 3D entry animation.</div>\n      </Drawer>\n    </>\n  );\n}`
        },
        source: {
            filename: "components/ui/drawer.tsx",
            code: `import { motion, AnimatePresence } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Drawer({ isOpen, onClose, children }) {\n    return (\n        <AnimatePresence>\n            {isOpen && (\n                <>\n                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />\n                    <motion.div initial={{ y: "100%", rotateX: 20 }} animate={{ y: 0, rotateX: 0 }} exit={{ y: "100%", rotateX: 20 }} className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t-2 bg-white dark:bg-neutral-900 p-6 shadow-2xl">\n                        <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-200 mb-6" />\n                        {children}\n                    </motion.div>\n                </>\n            )}\n        </AnimatePresence>\n    );\n}`
        }
    },
    "hover-card": {
        usage: {
            filename: "HoverCardDemo.tsx",
            code: `import { HoverCard } from "@/components/ui/hover-card";\n\nexport default function HoverCardDemo() {\n  return (\n    <HoverCard \n        trigger={<span className="underline decoration-dotted cursor-help">@dimension-ui</span>}\n        content={<div className="flex gap-4"><div><div className="font-bold">Dimension UI</div><div className="text-sm text-muted-foreground">The 3D component library for React.</div></div></div>}\n    />\n  );\n}`
        },
        source: {
            filename: "components/ui/hover-card.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function HoverCard({ trigger, content }) {\n    const [isOpen, setIsOpen] = useState(false);\n    return (\n        <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>\n            {trigger}\n            <AnimatePresence>\n                {isOpen && (\n                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="absolute z-50 mt-2 w-64 rounded-lg border bg-white dark:bg-neutral-900 p-4 shadow-2xl" style={{ transformStyle: "preserve-3d" }}>\n                        <div style={{ transform: "translateZ(20px)" }}>{content}</div>\n                    </motion.div>\n                )}\n            </AnimatePresence>\n        </div>\n    );\n}`
        }
    },
    "tabs": {
        usage: {
            filename: "TabsDemo.tsx",
            code: `import { Tabs } from "@/components/ui/tabs";\n\nconst tabs = [\n  { id: "account", label: "Account", content: "Manage your account settings." },\n  { id: "password", label: "Password", content: "Change your password here." },\n];\n\nexport default function TabsDemo() {\n  return <Tabs tabs={tabs} defaultValue="account" className="w-[400px]" />;\n}`
        },
        source: {
            filename: "components/ui/tabs.tsx",
            code: `import { useState } from "react";\nimport { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Tabs({ tabs, defaultValue, className }) {\n    const [active, setActive] = useState(defaultValue || tabs[0]?.id);\n    return (\n        <div className={cn("space-y-4", className)}>\n            <div className="flex p-1 rounded-xl bg-muted/50 border shadow-inner">\n                {tabs.map((tab) => (\n                    <button key={tab.id} onClick={() => setActive(tab.id)} className={cn("relative flex-1 px-4 py-2 text-sm font-medium transition-colors", active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>\n                        {active === tab.id && <motion.div layoutId=" active-tab" className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm" style={{ transform: "translateZ(-1px)" }} />}\n                        <span className="relative">{tab.label}</span>\n                    </button>\n                ))}\n            </div>\n            <div className="p-4 border-2 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl min-h-[100px]">{tabs.find(t => t.id === active)?.content}</div>\n        </div>\n    );\n}`
        }
    },
    "progress": {
        usage: {
            filename: "ProgressDemo.tsx",
            code: `import { Progress } from "@/components/ui/progress";\n\nexport default function ProgressDemo() {\n  return <Progress value={65} className="w-[60%]" />;\n}`
        },
        source: {
            filename: "components/ui/progress.tsx",
            code: `import { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Progress({ value = 0, className }) {\n    return (\n        <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800 border shadow-inner", className)}>\n            <motion.div initial={{ width: 0 }} animate={{ width: \`\${value}%\` }} className="h-full bg-neutral-900 dark:bg-white rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />\n        </div>\n    );\n}`
        }
    },
    "skeleton": {
        usage: {
            filename: "SkeletonDemo.tsx",
            code: `import { Skeleton } from "@/components/ui/skeleton";\n\nexport default function SkeletonDemo() {\n  return (\n    <div className="flex items-center space-x-4">\n      <Skeleton className="h-12 w-12 rounded-full" />\n      <div className="space-y-2">\n        <Skeleton className="h-4 w-[250px]" />\n        <Skeleton className="h-4 w-[200px]" />\n      </div>\n    </div>\n  );\n}`
        },
        source: {
            filename: "components/ui/skeleton.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Skeleton({ className }) {\n    return (\n        <div className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className)} />\n    );\n}`
        }
    },
    "carousel": {
        usage: {
            filename: "CarouselDemo.tsx",
            code: `import { Carousel } from "@/components/ui/carousel";\n\nconst items = [\n  { id: 1, content: <div className="p-12 bg-neutral-100 dark:bg-neutral-800 rounded-3xl text-4xl font-bold flex items-center justify-center h-full">Slide 1</div> },\n  { id: 2, content: <div className="p-12 bg-neutral-200 dark:bg-neutral-700 rounded-3xl text-4xl font-bold flex items-center justify-center h-full">Slide 2</div> },\n  { id: 3, content: <div className="p-12 bg-neutral-300 dark:bg-neutral-600 rounded-3xl text-4xl font-bold flex items-center justify-center h-full">Slide 3</div> },\n];\n\nexport default function CarouselDemo() {\n  return <Carousel items={items} className="w-full max-w-xl" />;\n}`
        },
        source: {
            filename: "components/ui/carousel.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { ChevronLeft, ChevronRight } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Carousel({ items, className }) {\n    const [index, setIndex] = useState(0);\n    return (\n        <div className={cn("relative overflow-hidden group rounded-3xl", className)} style={{ perspective: "1000px" }}>\n            <div className="relative h-64 w-full" style={{ transformStyle: "preserve-3d" }}>\n                <AnimatePresence mode="wait">\n                    <motion.div key={index} initial={{ opacity: 0, rotateY: 45, x: 100 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: -45, x: -100 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute inset-0">\n                        {items[index].content}\n                    </motion.div>\n                </AnimatePresence>\n            </div>\n            <button onClick={() => setIndex((index - 1 + items.length) % items.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur shadow-lg border border-white/20 hover:scale-110 transition-transform"><ChevronLeft /></button>\n            <button onClick={() => setIndex((index + 1) % items.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur shadow-lg border border-white/20 hover:scale-110 transition-transform"><ChevronRight /></button>\n        </div>\n    );\n}`
        }
    },
    "chart": {
        usage: {
            filename: "ChartDemo.tsx",
            code: `import { Chart } from "@/components/ui/chart";\n\nconst data = [40, 70, 45, 90, 65, 80, 50];\n\nexport default function ChartDemo() {\n  return <Chart data={data} height={200} label="Weekly Activity" />;\n}`
        },
        source: {
            filename: "components/ui/chart.tsx",
            code: `import { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Chart({ data, height = 150, label }) {\n    const max = Math.max(...data);\n    return (\n        <div className="space-y-4">\n            {label && <h4 className="text-sm font-semibold">{label}</h4>}\n            <div className="flex items-end gap-2 h-40 pt-4" style={{ height }}>\n                {data.map((val, i) => (\n                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: \`\${(val / max) * 100}%\` }} className="relative flex-1 bg-neutral-800 dark:bg-neutral-100 rounded-t-lg group" style={{ transformStyle: "preserve-3d" }}>\n                        <div className="absolute inset-x-0 -top-1 h-2 bg-neutral-900 dark:bg-neutral-200 rounded-full" style={{ transform: "translateZ(5px)" }} />\n                    </motion.div>\n                ))}\n            </div>\n        </div>\n    );\n}`
        }
    },
    "calendar": {
        usage: {
            filename: "CalendarDemo.tsx",
            code: `import { Calendar } from "@/components/ui/calendar";\n\nexport default function CalendarDemo() {\n  return <Calendar className="rounded-xl border shadow" />;\n}`
        },
        source: {
            filename: "components/ui/calendar.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Calendar({ className }) {\n    return (\n        <div className={cn("p-4 bg-white dark:bg-neutral-900 rounded-2xl border-2 shadow-2xl", className)}>\n            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold mb-2">\n                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d}>{d}</div>)}\n            </div>\n            <div className="grid grid-cols-7 gap-1">\n                {Array.from({ length: 31 }).map((_, i) => (\n                    <div key={i} className="aspect-square flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors border"> {i+1} </div>\n                ))}\n            </div>\n        </div>\n    );\n}`
        }
    },
    "data-table": {
        usage: {
            filename: "DataTableDemo.tsx",
            code: `import { DataTable } from "@/components/ui/data-table";\n\nconst data = [\n  { id: "1", name: "John Doe", email: "john@example.com" },\n  { id: "2", name: "Jane Smith", email: "jane@example.com" },\n];\n\nexport default function DataTableDemo() {\n  return <DataTable data={data} columns={["id", "name", "email"]} />;\n}`
        },
        source: {
            filename: "components/ui/data-table.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function DataTable({ data, columns, className }) {\n    return (\n        <div className={cn("rounded-xl border-2 overflow-hidden", className)}>\n            <table className="w-full text-sm">\n                <thead className="bg-muted/50 border-b"><tr>{columns.map(c => <th key={c} className="p-4 text-left font-bold uppercase">{c}</th>)}</tr></thead>\n                <tbody>{data.map(row => (<tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">{columns.map(c => <td key={c} className="p-4">{row[c]}</td>)}</tr>))}</tbody>\n            </table>\n        </div>\n    );\n}`
        }
    },
    "label": {
        usage: {
            filename: "LabelDemo.tsx",
            code: `import { Label } from "@/components/ui/label";\n\nexport default function LabelDemo() {\n  return <Label htmlFor="email">Email Address</Label>;\n}`
        },
        source: {
            filename: "components/ui/label.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Label({ className, ...props }) {\n    return <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />\n}`
        }
    },
    "breadcrumb": {
        usage: {
            filename: "BreadcrumbDemo.tsx",
            code: `import { Breadcrumb } from "@/components/ui/breadcrumb";\n\nexport default function BreadcrumbDemo() {\n  return <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components", href: "/components" }, { label: "Breadcrumb" }]} />;\n}`
        },
        source: {
            filename: "components/ui/breadcrumb.tsx",
            code: `import { ChevronRight } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Breadcrumb({ items, className }) {\n    return (\n        <nav className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}>\n            {items.map((item, i) => (\n                <div key={i} className="flex items-center gap-2">\n                    {i !== 0 && <ChevronRight size={14} />}\n                    {item.href ? <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a> : <span className="font-bold text-foreground">{item.label}</span>}\n                </div>\n            ))}\n        </nav>\n    );\n}`
        }
    },
    "pagination": {
        usage: {
            filename: "PaginationDemo.tsx",
            code: `import { Pagination } from "@/components/ui/pagination";\n\nexport default function PaginationDemo() {\n  return <Pagination totalPages={5} currentPage={1} onPageChange={(p) => console.log(p)} />;\n}`
        },
        source: {
            filename: "components/ui/pagination.tsx",
            code: `import { ChevronLeft, ChevronRight } from "lucide-react";\nimport { cn } from "@/lib/utils";\n\nexport function Pagination({ totalPages, currentPage, onPageChange, className }) {\n    return (\n        <div className={cn("flex items-center gap-2", className)}>\n            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 border-2 rounded-lg disabled:opacity-50"><ChevronLeft size={16}/></button>\n            {Array.from({ length: totalPages }).map((_, i) => (\n                <button key={i} onClick={() => onPageChange(i + 1)} className={cn("size-10 border-2 rounded-lg transition-all", currentPage === i + 1 ? "bg-neutral-900 text-white" : "hover:bg-muted")}>{i + 1}</button>\n            ))}\n            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border-2 rounded-lg disabled:opacity-50"><ChevronRight size={16}/></button>\n        </div>\n    );\n}`
        }
    },
    "toast": {
        usage: {
            filename: "ToastDemo.tsx",
            code: `import { useToast } from "@/hooks/use-toast";\nimport { Button } from "@/components/ui/button";\n\nexport default function ToastDemo() {\n  const { toast } = useToast();\n  return (\n    <Button onClick={() => toast({ title: "Scheduled: Catch up", description: "Friday, February 10, 2023 at 5:57 PM" })}>\n      Add to calendar\n    </Button>\n  );\n}`
        },
        source: {
            filename: "components/ui/toast.tsx",
            code: `import { motion, AnimatePresence } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function Toast({ title, description, open, onOpenChange }) {\n    return (\n        <AnimatePresence>\n            {open && (\n                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed bottom-4 right-4 z-50 w-80 p-4 rounded-xl border-2 bg-white dark:bg-neutral-900 shadow-2xl">\n                    <div className="font-bold text-sm">{title}</div>\n                    <div className="text-xs text-muted-foreground">{description}</div>\n                </motion.div>\n            )}\n        </AnimatePresence>\n    );\n}`
        }
    },
    "resizable": {
        usage: {
            filename: "ResizableDemo.tsx",
            code: `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";\n\nexport default function ResizableDemo() {\n  return (\n    <Resizable direction="horizontal" className="max-w-md rounded-lg border">\n      <ResizablePanel defaultSize={50}>One</ResizablePanel>\n      <ResizableHandle />\n      <ResizablePanel defaultSize={50}>Two</ResizablePanel>\n    </Resizable>\n  );\n}`
        },
        source: {
            filename: "components/ui/resizable.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Resizable({ children, className }) { return <div className={cn("flex w-full h-[200px] border-2 rounded-xl overflow-hidden", className)}>{children}</div> }\nexport function ResizablePanel({ children, defaultSize }) { return <div className="flex-1 flex items-center justify-center bg-muted/20" style={{ flex: defaultSize }}>{children}</div> }\nexport function ResizableHandle() { return <div className="w-1 bg-neutral-200 hover:bg-neutral-900 cursor-col-resize transition-colors" /> }`
        }
    },
    "badge-shimmer": {
        usage: {
            filename: "BadgeShimmerDemo.tsx",
            code: `import { BadgeShimmer } from "@/components/ui/badge-shimmer";\n\nexport default function BadgeShimmerDemo() {\n  return <BadgeShimmer>New Feature</BadgeShimmer>;\n}`
        },
        source: {
            filename: "components/ui/badge-shimmer.tsx",
            code: `import { motion } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function BadgeShimmer({ children, className }) {\n    return (\n        <div className={cn("relative px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold overflow-hidden", className)}>\n             <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />\n             <span className="relative">{children}</span>\n        </div>\n    );\n}`
        }
    },
    "toggle": {
        usage: {
            filename: "ToggleDemo.tsx",
            code: `import { Toggle } from "@/components/ui/toggle";\nimport { Bold } from "lucide-react";\n\nexport default function ToggleDemo() {\n  return <Toggle aria-label="Toggle bold"><Bold size={16} /></Toggle>;\n}`
        },
        source: {
            filename: "components/ui/toggle.tsx",
            code: `import { useState } from "react";\nimport { cn } from "@/lib/utils";\n\nexport function Toggle({ children, className }) {\n    const [pressed, setPressed] = useState(false);\n    return (\n        <button onClick={() => setPressed(!pressed)} className={cn("p-2 rounded-lg border-2 transition-all", pressed ? "bg-neutral-900 text-white shadow-inner" : "hover:bg-muted")}>\n            {children}\n        </button>\n    );\n}`
        }
    },
    "collapsible": {
        usage: {
            filename: "CollapsibleDemo.tsx",
            code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";\n\nexport default function CollapsibleDemo() {\n  return (\n    <Collapsible>\n      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>\n      <CollapsibleContent>Yes. Free to use for personal and commercial projects. No attribution required.</CollapsibleContent>\n    </Collapsible>\n  );\n}`
        },
        source: {
            filename: "components/ui/collapsible.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { ChevronDown } from "lucide-react";\n\nexport function Collapsible({ children }) { return <div>{children}</div> }\nexport function CollapsibleTrigger({ children }) { return <button className="flex items-center gap-2 font-bold">{children} <ChevronDown size={14}/></button> }\nexport function CollapsibleContent({ children }) { return <div className="mt-2 text-sm text-muted-foreground">{children}</div> }`
        }
    },
    "navigation-menu": {
        usage: {
            filename: "NavigationMenuDemo.tsx",
            code: `import { NavigationMenu } from "@/components/ui/navigation-menu";\n\nexport default function NavigationMenuDemo() {\n  return <NavigationMenu items={["Products", "Developers", "Pricing"]} />;\n}`
        },
        source: {
            filename: "components/ui/navigation-menu.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function NavigationMenu({ items, className }) {\n    return (\n        <nav className={cn("flex gap-6", className)}>\n            {items.map(item => <a key={item} href="#" className="text-sm font-medium hover:text-neutral-500 transition-colors">{item}</a>)}\n        </nav>\n    );\n}`
        }
    },
    "dropdown-menu": {
        usage: {
            filename: "DropdownMenuDemo.tsx",
            code: `import { DropdownMenu } from "@/components/ui/dropdown-menu";\nimport { Button } from "@/components/ui/button";\n\nexport default function DropdownMenuDemo() {\n  return (\n    <DropdownMenu \n        trigger={<Button>Open Menu</Button>}\n        items={["Profile", "Billing", "Settings", "Logout"]}\n    />\n  );\n}`
        },
        source: {
            filename: "components/ui/dropdown-menu.tsx",
            code: `import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport { cn } from "@/lib/utils";\n\nexport function DropdownMenu({ trigger, items }) {\n    const [isOpen, setIsOpen] = useState(false);\n    return (\n        <div className="relative inline-block">\n            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>\n            <AnimatePresence>\n                {isOpen && (\n                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 4 }} className="absolute right-0 z-50 w-48 rounded-xl border-2 bg-white dark:bg-neutral-900 p-1 shadow-2xl">\n                        {items.map(item => <button key={item} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted">{item}</button>)}\n                    </motion.div>\n                )}\n            </AnimatePresence>\n        </div>\n    );\n}`
        }
    },
    "table-basic": {
        usage: {
            filename: "TableDemo.tsx",
            code: `import { Table } from "@/components/ui/table";\n\nexport default function TableDemo() {\n  return <Table data={[{id: 1, name: "Item 1"}]} columns={["id", "name"]} />;\n}`
        },
        source: {
            filename: "components/ui/table.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Table({ data, columns, className }) {\n    return (\n        <div className={cn("rounded-xl border-2 overflow-hidden", className)}>\n            <table className="w-full text-sm">\n                <thead className="bg-muted/50 border-b"><tr>{columns.map(c => <th key={c} className="p-4 text-left font-bold uppercase">{c}</th>)}</tr></thead>\n                <tbody>{data.map((row, i) => (<tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors uppercase font-mono">{columns.map(c => <td key={c} className="p-4">{row[c]}</td>)}</tr>))}</tbody>\n            </table>\n        </div>\n    );\n}`
        }
    },
    "menubar": {
        usage: {
            filename: "MenubarDemo.tsx",
            code: `import { Menubar } from "@/components/ui/menubar";\n\nexport default function MenubarDemo() {\n  return <Menubar items={["File", "Edit", "View", "Profiles"]} />;\n}`
        },
        source: {
            filename: "components/ui/menubar.tsx",
            code: `import { cn } from "@/lib/utils";\n\nexport function Menubar({ items, className }) {\n    return (\n        <div className={cn("flex items-center space-x-1 rounded-xl border-2 bg-white dark:bg-neutral-900 p-1 shadow-sm", className)}>\n            {items.map(item => <button key={item} className="px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">{item}</button>)}\n        </div>\n    );\n}`
        }
    }
};
