"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft, Info, Activity, ShieldCheck,
    Clock, TrendingUp, BarChart3, Globe
} from "lucide-react";
import QuickTradeForm from "@/components/dashboard/QuickTradeForm";

export default function AssetTradingPage() {
    const params = useParams();
    const router = useRouter();
    const symbol = params.symbol as string;
    const cleanSymbol = symbol.replace('-', '/');

    // Mapping for TradingView (Standardize formats)
    const tvSymbol = symbol.includes('USD') && !symbol.includes('EUR')
        ? `BINANCE:${symbol.replace('-', '')}T`
        : symbol.replace('-', '');

    return (
        <div className="space-y-4 pb-10 animate-in fade-in zoom-in-95 duration-500 max-w-[1600px] mx-auto">

            {/* --- TOP NAVIGATION BAR --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500" />

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-500 hover:text-brand-500"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                                {cleanSymbol}
                            </h1>
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                Live
                            </span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Market Execution Node • 0.001s Latency</p>
                    </div>
                </div>

                {/* Real-time Mini Price Info - Adjusted for visibility */}
                <div className="flex-1 max-w-xs hidden md:block h-12">
                    <iframe
                        src={`https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#${encodeURIComponent(JSON.stringify({
                            symbol: tvSymbol,
                            width: "100%",
                            colorTheme: "dark",
                            isTransparent: true
                        }))}`}
                        className="w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                    />
                </div>
            </div>

            {/* --- MAIN TERMINAL GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* LEFT COLUMN: Charting & Intelligence (8/12) */}
                <div className="lg:col-span-8 space-y-4">

                    {/* Main Interactive Chart */}
                    <div className="h-[550px] bg-black border border-slate-200 dark:border-white/5 relative group">
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5">
                            <BarChart3 size={14} className="text-brand-500" />
                            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Primary_Analysis_View</span>
                        </div>
                        <iframe
                            src={`https://s.tradingview.com/widgetembed/?symbol=${tvSymbol}&interval=30&theme=dark&style=1&backgroundColor=rgba(0,0,0,1)`}
                            className="w-full h-full" frameBorder="0"
                        />
                    </div>

                    {/* Bottom Panel: Fundamentals & Analytics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Technical Analysis Gauge */}
                        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 h-[420px] relative">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center gap-2">
                                    <TrendingUp size={14} className="text-brand-500" /> Sentiment Analysis
                                </h4>
                                <div className="text-[9px] font-mono text-slate-500 uppercase">Updates every 60s</div>
                            </div>
                            <iframe
                                src={`https://www.tradingview-widget.com/embed-widget/technical-analysis/?locale=en#${encodeURIComponent(JSON.stringify({
                                    symbol: tvSymbol,
                                    colorTheme: "dark",
                                    isTransparent: true,
                                    width: "100%",
                                    height: "100%"
                                }))}`}
                                className="w-full h-[calc(100%-40px)]" frameBorder="0"
                            />
                        </div>

                        {/* Market Stats Ledger */}
                        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-5">
                                <Globe size={80} className="text-brand-500" />
                            </div>

                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Activity size={14} className="text-brand-500" /> Data Intelligence
                            </h4>

                            <div className="space-y-1.5 flex-1 relative z-10">
                                <TerminalStat label="Operational Status" value="Online / Liquid" icon={<Activity size={12} className="text-emerald-500" />} />
                                <TerminalStat label="Execution Protocol" value="Instant_STP" icon={<ShieldCheck size={12} className="text-blue-500" />} />
                                <TerminalStat label="Settlement Time" value="< 0.1ms" icon={<Clock size={12} className="text-amber-500" />} />
                                <TerminalStat label="Market Depth" value="High" icon={<TrendingUp size={12} className="text-brand-500" />} />

                                <div className="mt-6 p-4 bg-brand-500/5 border border-brand-500/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck size={14} className="text-brand-500" />
                                        <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">Sovereign Protection</span>
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                                        Liquidity provided by tier-1 institutional nodes. High leverage restricted during extreme volatility events.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Execution (4/12) */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* The Order Form - Make it sticky if the screen is large */}
                    <div className="sticky top-24">
                        <QuickTradeForm initialAsset={cleanSymbol} />

                        {/* Visual Metadata below form */}
                        <div className="mt-4 p-4 border border-dashed border-slate-200 dark:border-white/10 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Selected Node</span>
                                <span className="text-[9px] font-mono text-slate-900 dark:text-white uppercase font-bold">AWS_NORTH_VIRGINIA</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Encryption</span>
                                <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">AES_256_ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function TerminalStat({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                {icon} {label}
            </span>
            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{value}</span>
        </div>
    )
}