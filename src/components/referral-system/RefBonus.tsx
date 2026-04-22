"use client";

import React from "react";
import { Gift, Users, Activity, BarChart3 } from "lucide-react";

type RefBonusProps = {
  totalReferred: number;
  referralBonus: number;
};

export default function RefBonus({ totalReferred, referralBonus }: RefBonusProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      
      {/* --- Total Referrals Node --- */}
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-5 md:p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-slate-400 border-l border-b border-white/5 uppercase tracking-widest">
            NODE_COUNT
        </div>
        
        <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-14 h-14 border border-brand-500/20 bg-brand-500/5 text-brand-500 group-hover:bg-brand-500/10 transition-colors">
                <Users className="w-6 h-6" />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <Activity size={10} className="text-slate-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Network_Size
                    </span>
                </div>
                <h4 className="font-black text-slate-900 text-3xl dark:text-white tracking-tighter">
                    {totalReferred.toString().padStart(2, '0')}
                </h4>
            </div>
        </div>
        
        <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-white/5">
            <div className="h-full bg-brand-500 w-1/3 opacity-30" />
        </div>
      </div>

      {/* --- Total Bonus Node --- */}
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-5 md:p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-1.5 bg-emerald-500/5 text-[8px] font-mono text-emerald-500 border-l border-b border-white/5 uppercase tracking-widest">
            ASSET_YIELD
        </div>

        <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-14 h-14 border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <Gift className="w-6 h-6" />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <BarChart3 size={10} className="text-slate-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Total_Rewards
                    </span>
                </div>
                <h4 className="font-black text-slate-900 text-3xl dark:text-white tracking-tighter">
                    <span className="text-emerald-500 mr-1">$</span>
                    {referralBonus.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h4>
            </div>
        </div>

        <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-white/5">
            <div className="h-full bg-emerald-500 w-1/2 opacity-30" />
        </div>
      </div>

    </div>
  );
}