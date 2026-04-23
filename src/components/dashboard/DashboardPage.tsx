"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    Wallet, TrendingUp,
    ArrowDownCircle, ArrowUpCircle, Gift, ShieldAlert,
    Globe, Activity, Clock,
    ShieldCheck, ChevronDown, UserCheck, Plus, BrainCircuit,
    BarChart4, ArrowUpRight
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { fetchTeslaPrice } from "@/lib/appwrite/auth";

// --- UI COMPONENTS ---
import RecentOrders from "../ecommerce/RecentOrders";
import CopyLinkInput from "../form/group-input/CopyLinkInput";
import QuickTradeForm from "./QuickTradeForm";
import { FaSlash } from "react-icons/fa6";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [referralLink, setReferralLink] = useState("");

    // Financial States
    const [sharePrice, setSharePrice] = useState(0);
    const [totalShares, setTotalShares] = useState(0);
    const [stats, setStats] = useState({ profit: 0, deposit: 0, withdrawal: 0, bonus: 0 });

    const [kycExpanded, setKycExpanded] = useState(false);

    // --- REALTIME FIREBASE & MARKET SYNC ---
    useEffect(() => {
        let isMounted = true;

        // 1. Fetch Live Market Price for Asset Valuation
        fetchTeslaPrice()
            .then(price => {
                if (isMounted) setSharePrice(parseFloat(price));
            })
            .catch(err => console.error("Market Feed Error:", err));

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            let masterProfileProfit = 0; // Fallback variable

            // 2. Profile Sync (Gets absolute master balances)
            const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    masterProfileProfit = Number(data.profit || 0); // Capture Master Profit
                    setProfile(data);
                    setReferralLink(`${window.location.origin}/register?ref=${data.refereeId || user.uid}`);
                }
            });

            // 3. Transactions Sync (Calculates Historical Stats)
            const qTx = query(
                collection(db, "transactions"),
                where("userId", "==", user.uid),
                where("status", "==", "approved")
            );

            const unsubTx = onSnapshot(qTx, (snapshot) => {
                const calculated = snapshot.docs.reduce((acc, doc) => {
                    const tx = doc.data();
                    const amount = Number(tx.amount || 0);
                    const txType = (tx.type || "").toLowerCase();

                    // --- THE FIX: Catching ALL terminology used in your database ---
                    if (txType === 'deposit') acc.deposit += amount;
                    if (txType === 'withdrawal') acc.withdrawal += amount;
                    if (txType.includes('bonus')) acc.bonus += amount;

                    // Catch both old 'profit' tags and our new 'yield_generation' tags
                    if (txType === 'profit' || txType === 'yield_generation') {
                        acc.profit += amount;
                    }

                    return acc;
                }, { profit: 0, deposit: 0, withdrawal: 0, bonus: 0 });

                // --- DOUBLE SECURITY PROTOCOL ---
                // If the sum of transactions is 0, but the Master Profile has profit, use the Profile!
                if (calculated.profit === 0 && masterProfileProfit > 0) {
                    calculated.profit = masterProfileProfit;
                }

                setStats(calculated);
            });

            // 4. Stock Logs Sync (Calculates Total Owned Shares)
            const qStocks = query(
                collection(db, "stockLogs"),
                where("userId", "==", user.uid)
            );

            const unsubStocks = onSnapshot(qStocks, (snapshot) => {
                let sharesCount = 0;
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const type = (data.type || "").toLowerCase();

                    if (type === 'buy') sharesCount += Number(data.shares || 0);
                    else if (type === 'sell') sharesCount -= Number(data.shares || 0);
                    else sharesCount += Number(data.shares || 0); // Fallback
                });

                setTotalShares(sharesCount);
                setLoading(false);
            });

            return () => { unsubProfile(); unsubTx(); unsubStocks(); };
        });

        return () => {
            isMounted = false;
            unsubscribeAuth();
        };
    }, []);

    // --- MASTER BALANCE CALCULATION ---
    const remainingDeposit = Number(profile?.totalDeposit || 0);
    const remainingProfit = Number(profile?.profit || 0);
    const totalSharesValue = totalShares * sharePrice;

    const totalBalance = remainingDeposit + remainingProfit + totalSharesValue;

    const isKycApproved = profile?.kycStatus === 'approved';

    if (loading) return <TerminalLoading />;

    return (
        <div className="space-y-6 max-w-[1920px] mx-auto pb-24 animate-in fade-in duration-500">

            {/* 1. GLOBAL LIVE TICKER TAPE */}
            <div className="bg-slate-50 dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 -mx-6 -mt-6 mb-8 h-10 overflow-hidden shadow-sm relative ">
                <iframe
                    src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22US%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%7D"
                    className="w-full h-full pointer-events-none" frameBorder="0"
                />
            </div>

            {/* 2. HEADER & ACTIONS */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                        Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-indigo-500 italic">{profile?.firstName || 'Operator'}</span>
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                            <Activity size={10} className="animate-pulse" /> System Online
                        </span>
                        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Institutional Dashboard Overview</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/investments" className="px-8 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                        <TrendingUp size={14} /> Invest Now
                    </Link>
                </div>
            </div>

            {/* 3. ALERTS & PROMPTS */}
            <div className="grid grid-cols-1 gap-6">
                {!isKycApproved && (
                    <div className="bg-white dark:bg-[#0D1117] border border-rose-500/30 transition-all duration-300 relative">
                        <div className="p-6 border-b border-rose-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 text-center sm:text-left">
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20">
                                    <ShieldAlert className="text-rose-500 w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Identity Verification</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase mt-1">Complete verification to access all features.</p>
                                </div>
                            </div>
                            <button onClick={() => setKycExpanded(!kycExpanded)} className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2">
                                View Details <ChevronDown className={`w-4 h-4 transition-transform ${kycExpanded ? "rotate-180" : ""}`} />
                            </button>
                        </div>
                        {kycExpanded && (
                            <div className="p-6 bg-slate-50 dark:bg-white/[0.02] animate-in slide-in-from-top-4 duration-300">
                                <div className="max-w-2xl mx-auto text-center space-y-6">
                                    <div className="w-16 h-16 mx-auto bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                                        <UserCheck className="w-8 h-8 text-brand-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">Complete Your Verification</h4>
                                        <p className="text-slate-500 text-xs font-mono mt-2 uppercase">Verify your identity to unlock higher capital limits and enhanced algorithmic security features.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                                        <div className="p-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-center">
                                            <ShieldAlert className="w-5 h-5 mx-auto mb-2 text-brand-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Enhanced Security</span>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-center">
                                            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Higher Limits</span>
                                        </div>
                                    </div>
                                    <Link href="/profile" className="inline-flex items-center justify-center gap-2 w-full max-w-sm mx-auto py-4 bg-brand-600 text-white font-black uppercase text-xs tracking-widest hover:bg-brand-500 transition-all">
                                        <ShieldCheck size={16} /> Start Verification
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 4. PRIMARY METRICS (6-Column Sharp Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">

                {/* Account Balance (Aggregated Total) */}
                <div className="xl:col-span-2 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-between relative group">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">SYS_LIQUIDITY</div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                                <Wallet size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Gross Equity</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20">
                                <BrainCircuit size={10} className="text-blue-500" />
                                <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">AI Status: Optimal</span>
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">
                            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>

                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                                <Activity size={12} className="text-emerald-500" /> Master Balance Includes Market Assets
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <Link href="/deposit" className="flex justify-center items-center gap-2 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                            <Plus size={14} /> Deposit
                        </Link>
                        <Link href="/withdraw" className="flex justify-center items-center gap-2 py-3.5 bg-slate-100 text-slate-900 dark:bg-transparent dark:text-white dark:border-white/10 border border-slate-200 text-xs font-black uppercase tracking-widest hover:border-brand-500 transition-colors">
                            <ArrowUpRight size={14} /> Withdraw
                        </Link>
                    </div>
                </div>

                {/* Historical Execution Stats */}
                <MiniStatCard label="Total Profit" value={stats.profit} icon={<TrendingUp size={18} className="text-emerald-500" />} />
                <MiniStatCard label="Total Deposit" value={stats.deposit} icon={<ArrowDownCircle size={18} className="text-brand-500" />} />
                <MiniStatCard label="Total Withdrawal" value={stats.withdrawal} icon={<ArrowUpCircle size={18} className="text-indigo-500" />} />
                <MiniStatCard label="Total Shares Value" value={totalSharesValue} icon={<FaSlash size={18} className="text-amber-500" />} />
            </div>

            {/* 5. ASSET OVERVIEW CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "FX:EURUSD", "FX:GBPUSD", "NASDAQ:AAPL", "TVC:GOLD"].map((symbol) => {
                    const widgetConfig = encodeURIComponent(JSON.stringify({
                        symbol: symbol,
                        width: "100%",
                        height: "100%",
                        dateRange: "1D",
                        colorTheme: "dark",
                        isTransparent: true,
                        autosize: true
                    }));

                    return (
                        <div key={symbol} className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 h-[160px] relative hover:border-brand-500/50 transition-colors">
                            <div className="absolute inset-0 pointer-events-none">
                                <iframe
                                    src={`https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#${widgetConfig}`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                />
                            </div>
                            <div className="absolute inset-0 z-10 hover:bg-white/5 transition-colors cursor-pointer" />
                        </div>
                    );
                })}
            </div>

            {/* 6. TRADING TERMINAL & QUICK TRADE */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-[#0D1117] border border-white/5 h-[600px] flex flex-col relative group">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-20">CHART_NODE</div>
                    <div className="p-5 border-b border-white/5 flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <BarChart4 className="text-brand-500" size={18} />
                            <h3 className="font-black text-sm uppercase tracking-widest text-white">Market Overview</h3>
                        </div>
                        <Link href="/transactions" className="text-[10px] font-mono font-bold text-brand-500 hover:text-brand-400 uppercase tracking-widest">View History</Link>
                    </div>
                    <div className="flex-1 relative w-full">
                        <iframe
                            src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=30&theme=dark&style=1&backgroundColor=rgba(0,0,0,0)"
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                        />
                    </div>
                </div>
                <QuickTradeForm />
            </div>

            {/* 7. LIVE MARKET QUOTES WIDGET */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 h-[500px] relative">
                <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-20">DATA_STREAM</div>
                <div className="p-5 border-b border-slate-200 dark:border-white/5 relative z-10">
                    <h3 className="font-black text-sm tracking-widest uppercase text-slate-900 dark:text-white flex items-center gap-2"><Globe className="text-brand-500" size={18} /> Global Currency & Asset Pairs</h3>
                </div>
                <div className="w-full h-[calc(100%-61px)]">
                    <iframe
                        src="https://www.tradingview-widget.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Crypto%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22BINANCE%3ABTCUSDT%22%2C%22displayName%22%3A%22Bitcoin%22%7D%2C%7B%22name%22%3A%22BINANCE%3AETHUSDT%22%2C%22displayName%22%3A%22Ethereum%22%7D%2C%7B%22name%22%3A%22BINANCE%3ABNBUSDT%22%2C%22displayName%22%3A%22BNB%22%7D%5D%7D%2C%7B%22name%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FX%3AEURUSD%22%2C%22displayName%22%3A%22EUR%2FUSD%22%7D%2C%7B%22name%22%3A%22FX%3AGBPUSD%22%2C%22displayName%22%3A%22GBP%2FUSD%22%7D%2C%7B%22name%22%3A%22FX%3AUSDJPY%22%2C%22displayName%22%3A%22USD%2FJPY%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%7D"
                        className="w-full h-full"
                        frameBorder="0"
                    />
                </div>
            </div>

            {/* 8. BOTTOM ROW: LOGS, REFERRALS & TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Latest Trades */}
                <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">LOGS</div>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Latest Trades</h4>
                        <Link href="/transactions" className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 hover:underline uppercase tracking-widest">View All</Link>
                    </div>
                    <div className="border border-slate-200 dark:border-white/5">
                        <RecentOrders />
                    </div>
                </div>

                {/* Referrals */}
                <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">NETWORK</div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white mb-2">Referrals</h4>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-6 leading-relaxed uppercase">Present our project to your network and enjoy financial benefits. You don’t need an active deposit to earn affiliate commissions.</p>
                        <Link href="/referral" className="inline-flex px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-xs font-black uppercase tracking-widest transition-colors">
                            Learn More
                        </Link>
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                        <h5 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-3">Personal Referral Link</h5>
                        <CopyLinkInput link={referralLink} />
                    </div>
                </div>

                {/* Timeline / News */}
                <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 h-[450px] relative">
                    <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-20">FEED</div>
                    <div className="p-5 border-b border-slate-200 dark:border-white/5 relative z-10">
                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                            <Activity className="text-brand-500" size={18} /> Market News
                        </h4>
                    </div>
                    <iframe
                        src="https://www.tradingview-widget.com/embed-widget/timeline/#%7B%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22compact%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%7D"
                        className="w-full h-[calc(100%-61px)]" frameBorder="0"
                    />
                </div>

            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function MiniStatCard({ label, value, icon, trend }: { label: string, value: number, icon: any, trend?: string }) {
    return (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 flex flex-col justify-between group hover:border-brand-500/50 transition-colors relative">
            <div className="absolute top-0 right-0 p-1.5 border-l border-b border-slate-100 dark:border-white/5 opacity-50 group-hover:opacity-100 transition-opacity text-slate-400">
                {icon}
            </div>
            <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-4 block">{label}</span>
            <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter truncate">
                    ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <div className="text-[10px] font-mono font-bold text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
                    <Clock size={10} /> <span>All time</span>
                    {trend && <span className="ml-auto text-emerald-500">{trend}</span>}
                </div>
            </div>
        </div>
    );
}

function TerminalLoading() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em] animate-pulse">Syncing_Protocol_Data...</p>
        </div>
    );
}