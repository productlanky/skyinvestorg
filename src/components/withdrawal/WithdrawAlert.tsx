"use client";

import React from "react";
import { ShieldAlert, ShieldX, Lock, AlertTriangle, Terminal } from "lucide-react";

interface WithdrawAlertProps {
  kycStatus: string;
  withdrawalPasswordSet: boolean;
}

export default function WithdrawAlert({ kycStatus, withdrawalPasswordSet }: WithdrawAlertProps) {
  // If everything is clear, we don't render the alert container
  if (kycStatus === "approved" && withdrawalPasswordSet) return null;

  return (
    <div className="space-y-3 pb-6">
      
      {/* ─────────────────────────────── KYC STATUS PROTOCOL */}
      {kycStatus !== "approved" && (
        <div className="bg-red-500/5 border border-red-500/20 p-4 relative overflow-hidden group">
          {/* Decorative Terminal Accent */}
          <div className="absolute top-0 right-0 p-1 bg-red-500/10 text-[7px] font-mono text-red-500 uppercase tracking-widest">
            AUTH_ERR_01
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/10 border border-red-500/20 shrink-0">
               <ShieldX className="text-red-500 animate-pulse" size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
                Identity_Verification_Void
              </h4>
              <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase leading-relaxed">
                KYC status currently marked as <span className="text-red-500 font-bold">[{kycStatus.toUpperCase()}]</span>. 
                Capital outflow protocols are locked until identity node is synchronized.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────── SECURITY PASSWORD PROTOCOL */}
      {!withdrawalPasswordSet && (
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 relative overflow-hidden">
          {/* Decorative Terminal Accent */}
          <div className="absolute top-0 right-0 p-1 bg-amber-500/10 text-[7px] font-mono text-amber-500 uppercase tracking-widest">
            SEC_ERR_04
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 shrink-0">
               <Lock className="text-amber-500" size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                Encryption_Key_Missing
              </h4>
              <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase leading-relaxed">
                Secondary withdrawal password not detected in profile registry. 
                Initialize security key to authorize asset liquidation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Feed (Optional) */}
      <div className="flex items-center gap-2 px-1">
        <Terminal size={10} className="text-slate-400" />
        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">
          System_Check: Security_Barriers_Active
        </span>
      </div>
    </div>
  );
}