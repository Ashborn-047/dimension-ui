import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("relative group rounded-lg overflow-hidden border border-border bg-slate-950", className)}>
            <div className="absolute right-4 top-4 z-10">
                <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 shadow-lg"
                >
                    {copied ? <Check size={16} className="text-neutral-100" /> : <Copy size={16} />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className={cn("text-sm font-mono text-slate-300", language && `language-${language}`)}>
                    <code>{code}</code>
                </pre>
            </div>

            {/* Decorative neutral corners */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-neutral-100/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-neutral-900/10 blur-2xl pointer-events-none" />
        </div>
    );
}
