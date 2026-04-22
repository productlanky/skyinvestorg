"use client";

import React, { useEffect, useState } from "react";
import { Terminal, ArrowRightLeft, Activity, Layers, Database } from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

type StockLog = {
  id: string;
  shares: number;
  amount: number;
  pricePerShare: number;
  symbol: string;
  type: string;
  status: string;
  date: string;
};

export default function ShareLogs() {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Real-time listener for the user's stock asset ledger
      const q = query(
        collection(db, "stockLogs"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribeLogs = onSnapshot(q, (snapshot) => {
        const mappedLogs = snapshot.docs.map((doc) => {
          const data = doc.data();

          // --- BULLETPROOF DATE PARSING ---
          // Prevents the "toDate is not a function" crash from legacy strings
          let parsedDate = new Date().toISOString(); 
          if (data.createdAt) {
              if (typeof data.createdAt.toDate === 'function') {
                  // Modern Firebase Timestamp
                  parsedDate = data.createdAt.toDate().toISOString();
              } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
                  // Legacy Appwrite String or Unix Number
                  const dateObj = new Date(data.createdAt);
                  if (!isNaN(dateObj.getTime())) {
                      parsedDate = dateObj.toISOString();
                  }
              }
          }

          return {
            id: doc.id,
            shares: Number(data.shares || 0),
            amount: Number(data.amount || 0),
            pricePerShare: Number(data.pricePerShare || 0),
            symbol: data.symbol || "SYS_ASSET", 
            type: data.type || "buy",
            status: data.status || "successful",
            date: parsedDate,
          };
        });

        setLogs(mappedLogs);
        setLoading(false);
      }, (error) => {
        console.error("Ledger Sync Error:", error);
        setLoading(false);
      });

      return () => unsubscribeLogs();
    });

    return () => unsubscribeAuth();
  }, []);

  // --- Terminal Status Logic ---
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending")
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-widest whitespace-nowrap"><Activity size={10} className="animate-pulse" /> AWAITING_SYNC</span>;
    if (s === "successful" || s === "approved")
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest whitespace-nowrap"><Terminal size={10} /> EXECUTED</span>;
    return <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase tracking-widest whitespace-nowrap">REJECTED</span>;
  };

  const getTypeBadge = (type: string) => {
    if (type.toLowerCase() === "buy")
        return <span className="text-emerald-500 font-bold uppercase">ACQUIRE</span>;
    return <span className="text-rose-500 font-bold uppercase">LIQUIDATE</span>;
  }

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden animate-in fade-in duration-500">
      
      {/* Decorative Terminal Accent */}
      <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-[0.2em] z-10 hidden sm:block">
        ASSET_LEDGER_V1
      </div>

      {/* Header Area */}
      <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-3">
        <div className="p-2 border border-brand-500/20 bg-brand-500/5">
            <ArrowRightLeft className="text-brand-500" size={18} />
        </div>
        <div>
            <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">Transaction Ledger</h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">Historical log of all asset acquisitions and liquidations.</p>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5">
            <tr>
              {["Action", "Node_Volume", "Execution_Price", "Total_Capital", "Network_Status", "Timestamp"].map((label) => (
                <th
                  key={label}
                  className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {loading ? (
               Array.from({ length: 3 }).map((_, i) => (
                   <tr key={i} className="hover:bg-transparent border-b border-slate-100 dark:border-white/5">
                       {[...Array(6)].map((__, j) => (
                           <td key={j} className="py-4 px-6">
                               <div className="h-4 w-full max-w-[80px] bg-slate-100 dark:bg-white/5 animate-pulse" />
                           </td>
                       ))}
                   </tr>
               ))
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 opacity-40">
                      <Database size={32} className="text-slate-400" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">NO_ASSET_HISTORY_FOUND</span>
                  </div>
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] group border-b border-slate-100 dark:border-white/5"
                >
                  <td className="px-6 py-4 text-[10px] font-mono tracking-widest whitespace-nowrap">
                    {getTypeBadge(log.type)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase group-hover:text-brand-500 transition-colors">
                        {log.shares} {log.symbol}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    ${log.pricePerShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </td>

                  <td className="px-6 py-4 text-[11px] font-black text-slate-900 dark:text-white tracking-tighter">
                    ${log.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(log.status)}
                  </td>

                  <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                        <Terminal size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-500" />
                        {new Date(log.date).toLocaleString(undefined, { 
                            month: 'short', 
                            day: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}