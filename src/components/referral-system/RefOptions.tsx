"use client";

import React from "react";
import Button from "../ui/button/Button";
import CopyLinkInput from "../form/group-input/CopyLinkInput";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { Share2, Terminal } from "lucide-react";

export default function RefOptions({ referralLink }: { referralLink: string }) {
  const hasLink = Boolean(referralLink);

  const shareOnTwitter = () => {
    if (!hasLink) return;
    const msg = encodeURIComponent(
      `Join me on SkyInvestOrg and initialize your wealth protocol 🚀 ${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${msg}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    if (!hasLink) return;
    const msg = encodeURIComponent(
      `Access the Sovereign Terminal. Secure your capital node here: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div
      className="
        bg-white dark:bg-[#0D1117] 
        border border-slate-200 dark:border-white/5 
        p-6 relative group overflow-hidden
      "
    >
      {/* Decorative Terminal Accent */}
      <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
        SHARE_INTERFACE_V1
      </div>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="p-3 border border-brand-500/20 bg-brand-500/5 shrink-0">
             <Share2 className="text-brand-500" size={20} />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
              Distribution Protocol
            </h2>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tight leading-relaxed max-w-xl">
              Broadcast your unique coordinate to the network. Every node established 
              via your link generates a recurring commission stream.
            </p>
          </div>
        </div>

        {/* Link Input Section */}
        <div className="space-y-2">
            <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
              Primary_Node_Link
            </label>
            <CopyLinkInput link={referralLink} />
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={shareOnTwitter}
            disabled={!hasLink}
            className="flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-500/10 hover:border-brand-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaXTwitter size={14} className="text-slate-900 dark:text-white" />
            Share on X
          </button>

          <button
            onClick={shareOnWhatsApp}
            disabled={!hasLink}
            className="flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaWhatsapp size={14} className="text-emerald-500" />
            Share on WhatsApp
          </button>
        </div>

        {!hasLink && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/5 border border-amber-500/20">
             <Terminal size={12} className="text-amber-500 animate-pulse" />
             <p className="text-[9px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-tighter">
               Waiting for profile sync... Link generation in progress.
             </p>
          </div>
        )}
      </div>

      {/* Bottom Corner Detail */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-t border-r border-slate-200 dark:border-white/10"></div>
    </div>
  );
}