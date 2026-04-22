"use client";

import React, { useState } from "react";
import { CheckIcon, CopyIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface CopyLinkInputProps {
    link: string;
    placeholder?: string;
}

const CopyLinkInput: React.FC<CopyLinkInputProps> = ({ link }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            toast.success('DATA_COPIED: Link saved to clipboard.');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy link:", error);
            toast.error("SYS_ERR: Clipboard access denied.");
        }
    };

    return (
        <div className="relative flex flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors pointer-events-none">
                <LinkIcon size={14} />
            </div>
            
            <input
                type="text"
                readOnly
                value={link}
                className="h-12 w-full pl-10 pr-28 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors selection:bg-brand-500/30 truncate"
            />

            <button
                onClick={handleCopy}
                type="button"
                className={`absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center border-l transition-all text-[10px] font-black uppercase tracking-widest
                    ${copied 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-brand-500 hover:text-white hover:border-brand-500'
                    }
                `}
            >
                {copied ? (
                    <span className="flex items-center gap-1.5 animate-in zoom-in duration-200">
                        <CheckIcon size={14} /> Copied
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <CopyIcon size={14} /> Copy
                    </span>
                )}
            </button>
        </div>
    );
};

export default CopyLinkInput;