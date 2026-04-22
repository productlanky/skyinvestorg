"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Activity, Clock, Target, Terminal, ArrowRightLeft } from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

type Investment = {
  id: string;
  amount: number;
  status: string;
  startDate: Date;
  endDate: Date;
  planName: string;
  interestRate: number;
};

export default function UserInvestments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch ALL investments for this user, ordered by newest first
      const invQuery = query(
        collection(db, "investments"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribeInv = onSnapshot(invQuery, (snapshot) => {
        const processedInvestments = snapshot.docs.map((docSnap) => {
          const inv = docSnap.data();
          
          return {
            id: docSnap.id,
            amount: Number(inv.amount || 0),
            status: inv.status || "active",
            startDate: inv.startDate?.toDate() || new Date(),
            endDate: inv.endDate?.toDate() || new Date(),
            planName: inv.planName || "Unknown Protocol",
            interestRate: Number(inv.interestRate || 0)
          };
        });

        setInvestments(processedInvestments);
        setLoading(false);
      });

      return () => unsubscribeInv();
    });

    return () => unsubscribeAuth();
  }, []);

  // --- Terminal Status Logic ---
  const getStatusBadge = (status: string, endDate: Date) => {
    const now = new Date();

    // If it's active but the end date has passed, it is waiting for the Lazy Evaluator to process the payout
    if (status === "active" && now >= endDate) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
              <Activity size={10} className="animate-pulse" /> MATURING_NODE...
            </span>
        );
    }

    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-500/10 text-brand-500 border border-brand-500/20 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
          <Activity size={10} className="animate-pulse" /> ACTIVE_LOCK
        </span>
      );
    }

    if (status === "completed") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
          <CheckCircle2 size={10} /> YIELD_DISTRIBUTED
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden animate-in fade-in duration-500">
        
        {/* Decorative Terminal Glow & Tag */}
        <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10 hidden sm:block">
            CAPITAL_ALLOCATION_LEDGER
        </div>

        {/* Header Title Area */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3">
            <Target size={16} className="text-brand-500" /> Capital Allocations
            </h2>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-tighter">Historical ledger of all locked liquidity and generated yields.</p>
        </div>

        {/* Table Area (Raw HTML for strict geometry) */}
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5">
                    <tr>
                        {["Protocol_Node", "Capital_Deployed", "Target_Yield", "Network_Status", "Commencement", "Maturity_Target"].map((h) => (
                            <th
                                key={h}
                                className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Activity size={24} className="text-brand-500 animate-pulse" />
                                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest animate-pulse">Syncing_Ledger_Nodes...</span>
                                </div>
                            </td>
                        </tr>
                    ) : investments.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center text-slate-500 gap-3 opacity-40">
                                    <Target size={32} className="text-slate-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]">NO_ALLOCATIONS_FOUND_IN_LEDGER</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        investments.map((inv) => {
                            const profitAmount = inv.amount * inv.interestRate;

                            return (
                                <tr
                                    key={inv.id}
                                    className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] group"
                                >
                                    {/* Protocol Name */}
                                    <td className="px-6 py-4">
                                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-brand-500 transition-colors whitespace-nowrap">
                                            {inv.planName}
                                        </span>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4">
                                        <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tighter">
                                            ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </td>

                                    {/* Expected Profit */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-emerald-500 tracking-tighter">
                                                +${profitAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                                                ({(inv.interestRate * 100).toFixed(0)}% APY)
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        {getStatusBadge(inv.status, inv.endDate)}
                                    </td>

                                    {/* Start Date */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                                            <Terminal size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                            {inv.startDate.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                                        </div>
                                    </td>

                                    {/* End Date */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                                            <Clock size={10} className={inv.status === 'completed' ? 'text-slate-400' : 'text-brand-500'} />
                                            {inv.endDate.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}