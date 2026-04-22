"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, RefreshCw, DollarSign, Wallet, TrendingUp,
  Copy, ShieldCheck, Activity, Search, Terminal, Zap
} from "lucide-react";
import { toast } from "sonner";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

type CopyTrade = {
  id: string;
  expertName: string;
  amount: number;
  profit: number;
  status: string;
  startDate: Date;
};

export default function CopyTradingPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [copyTrades, setCopyTrades] = useState<CopyTrade[]>([]);
  const [stats, setStats] = useState({
    activeSyndicates: 0,
    deployedCapital: 0,
    totalYield: 0,
    portfolioValuation: 0,
    roi: 0
  });

  // --- REALTIME DATA SYNC ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Query active copy trades for this user
      const q = query(
        collection(db, "copy_trades"),
        where("userId", "==", user.uid),
        where("status", "==", "active")
      );

      const unsubscribeTrades = onSnapshot(q, (snapshot) => {
        let totalCap = 0;
        let totalProfit = 0;

        // 1. Map through docs to create the array and accumulate totals
        const trades = snapshot.docs.map(doc => {
          const data = doc.data();
          const amount = Number(data.amount || 0);
          const profit = Number(data.profit || 0);

          // Accumulate values for stats
          totalCap += amount;
          totalProfit += profit;

          // --- BULLETPROOF DATE PARSING ---
          let parsedDate = new Date();
          if (data.createdAt) {
            if (typeof data.createdAt.toDate === 'function') {
              parsedDate = data.createdAt.toDate();
            } else {
              const dateObj = new Date(data.createdAt);
              if (!isNaN(dateObj.getTime())) parsedDate = dateObj;
            }
          }

          return {
            id: doc.id,
            expertName: data.expertName || "Unknown Node",
            amount: amount,
            profit: profit,
            status: data.status,
            startDate: parsedDate
          };
        });

        // 2. Calculate Final Metrics AFTER the loop is finished
        const valuation = totalCap + totalProfit;
        const roiPercent = totalCap > 0 ? (totalProfit / totalCap) * 100 : 0;

        // 3. Update state once with the final values
        setStats({
          activeSyndicates: trades.length, 
          deployedCapital: totalCap,
          totalYield: totalProfit,
          portfolioValuation: valuation,
          roi: roiPercent
        });

        setCopyTrades(trades);
        setLoading(false);
      }, (error) => {
        console.error("Ledger Sync Error:", error);
        setLoading(false);
        toast.error("SYS_ERR: Failed to sync syndicate data.");
      });

      return () => unsubscribeTrades();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("SYNCING_NETWORK: Fetching latest syndicate data...");

    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("SYNC_COMPLETE: Dashboard data is current.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] pb-20 animate-in fade-in duration-500">

      {/* --- HEADER PROTOCOL --- */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-[0.2em] z-10">
          SYNDICATE_MIRROR_V1
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-500/10 border border-brand-500/20 shrink-0">
                  <Copy className="text-brand-500" size={20} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">
                  Copy Trading Hub
                </h1>
              </div>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tight mt-3">
                Manage automated portfolio mirroring and track syndicate performance metrics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || loading}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all disabled:opacity-50"
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                <span className="hidden sm:inline">Sync_Data</span>
              </button>

              <Link
                href="/copy-trading/experts"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-500/20"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              >
                <Users size={14} />
                <span className="hidden sm:inline">Browse_Experts</span>
                <span className="sm:hidden">Experts</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* TELEMETRY METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <DataNode
            label="Active_Syndicates"
            value={loading ? "..." : stats.activeSyndicates.toString()}
            subValue="Experts being mirrored"
            icon={<Activity size={16} />}
          />
          <DataNode
            label="Deployed_Capital"
            value={loading ? "..." : `$${stats.deployedCapital.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subValue="Total volume allocated"
            icon={<DollarSign size={16} />}
          />
          <DataNode
            label="Portfolio_Valuation"
            value={loading ? "..." : `$${stats.portfolioValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subValue="Current liquid status"
            icon={<Wallet size={16} />}
          />
          <DataNode
            label="Total_Yield_P&L"
            value={loading ? "..." : `${stats.totalYield >= 0 ? '+' : ''}$${stats.totalYield.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subValue={`${stats.roi.toFixed(2)}% ROI`}
            icon={<TrendingUp size={16} />}
            highlight={stats.totalYield >= 0}
            highlightColor={stats.totalYield >= 0 ? "text-emerald-500" : "text-rose-500"}
          />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0D1117]">
            <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em] animate-pulse">Syncing_Syndicate_Nodes...</p>
          </div>
        ) : copyTrades.length > 0 ? (

          /* --- POPULATED STATE: ACTIVE MIRRORS LEDGER --- */
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-3">
              <Activity className="text-brand-500 animate-pulse" size={18} />
              <div>
                <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">Active Mirror Nodes</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">Live synchronization feeds with expert traders.</p>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5">
                  <tr>
                    {["Expert_Node", "Deployed_Capital", "Current_Yield", "Network_Status", "Uplink_Date"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {copyTrades.map(trade => (
                    <tr key={trade.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] group">
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest whitespace-nowrap">
                          {trade.expertName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tighter">
                          ${trade.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-black tracking-tighter ${trade.profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {trade.profit >= 0 ? '+' : ''}${trade.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className={`text-[8px] font-mono uppercase tracking-widest ${trade.profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {trade.amount > 0 ? ((trade.profit / trade.amount)).toFixed(2) : '0.00'}% ROI
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                          <Activity size={10} className="animate-pulse" /> MIRRORING
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                        {trade.startDate.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        ) : (

          /* --- EMPTY STATE / ONBOARDING NODE --- */
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
            <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center border border-brand-500/30 bg-brand-500/5 relative">
                <div className="absolute top-[-4px] left-[-4px] w-2 h-2 border-t border-l border-brand-500" />
                <div className="absolute top-[-4px] right-[-4px] w-2 h-2 border-t border-r border-brand-500" />
                <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 border-b border-l border-brand-500" />
                <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 border-b border-r border-brand-500" />
                <Copy className="text-brand-500" size={32} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">
                Initialize Mirror Protocol
              </h3>

              <p className="text-[11px] font-mono text-slate-500 uppercase leading-relaxed max-w-2xl mb-10">
                No active syndicates detected in your portfolio. Browse verified institutional traders and deploy automated mirror parameters to duplicate their execution strategies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
                <FeatureBlock icon={<ShieldCheck size={14} />} title="Verified_Intelligence" desc="Mirror data from institutional-grade traders with proven track records." />
                <FeatureBlock icon={<Zap size={14} />} title="Autonomous_Execution" desc="Trades are routed and executed with zero-latency synchronization." />
                <FeatureBlock icon={<Terminal size={14} />} title="Parameter_Control" desc="Maintain absolute sovereignty over risk limits and volume allocation." />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/copy-trading/experts"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  <Search size={14} /> Scan_Expert_Registry
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function DataNode({ label, value, subValue, icon, highlight = false, highlightColor = 'text-brand-500' }: any) {
  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden group hover:border-brand-500/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className={`text-2xl font-black uppercase tracking-tighter ${highlight ? highlightColor : 'text-slate-900 dark:text-white'}`}>
            {value}
          </p>
        </div>
        <div className={`p-2 border ${highlight ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 text-slate-400 group-hover:text-brand-500 group-hover:border-brand-500/30 group-hover:bg-brand-500/5 transition-all'}`}>
          {icon}
        </div>
      </div>
      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">{subValue}</p>
    </div>
  );
}

function FeatureBlock({ icon, title, desc }: any) {
  return (
    <div className="p-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-left">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-brand-500/10 text-brand-500 border border-brand-500/20">
          {icon}
        </div>
        <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{title}</h4>
      </div>
      <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed">
        {desc}
      </p>
    </div>
  );
}