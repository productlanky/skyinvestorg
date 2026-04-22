"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { 
  TrendingUp, 
  Wallet, 
  Layers, 
  Activity, 
  Terminal,
  ShieldCheck,
  Zap
} from "lucide-react";

// --- CUSTOM UI COMPONENTS ---
import Input from "@/components/form/input/InputField";

// --- FIREBASE & AUTH IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, serverTimestamp, writeBatch } from "firebase/firestore";
import { fetchTeslaPrice } from "@/lib/appwrite/auth"; 

export default function BuySharesPage() {
    const [sharePrice, setSharePrice] = useState(0);
    const [quantity, setQuantity] = useState<number | "">("");
    const [amount, setAmount] = useState<number | "">("");
    const [mode, setMode] = useState<"shares" | "amount">("shares");
    
    // Updated State for Siphoning Protocol
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Derived Liquidity Metrics
    const currentDeposit = Number(profile?.totalDeposit || 0);
    const currentProfit = Number(profile?.profit || 0);
    const availableLiquidity = currentDeposit + currentProfit;

    useEffect(() => {
        // Fetch Live Market Data
        fetchTeslaPrice().then((price) => {
            setSharePrice(parseFloat(price));
        });

        // Real-time Profile Sync via Firebase
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) return;
            setUserId(user.uid);

            const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                }
            });
            return () => unsubProfile();
        });

        return () => unsubscribeAuth();
    }, []);

    const handleSharesChange = (val: string) => {
        const shares = parseFloat(val);
        if (!isNaN(shares) && shares >= 0) {
            const total = parseFloat((shares * sharePrice).toFixed(2));
            setQuantity(shares);
            setAmount(total);
            validateBalance(total);
        } else {
            setQuantity("");
            setAmount("");
            setError("");
        }
    };

    const handleAmountChange = (val: string) => {
        const dollars = parseFloat(val);
        if (!isNaN(dollars) && dollars >= 0) {
            const shares = parseFloat((dollars / sharePrice).toFixed(4));
            setAmount(dollars);
            setQuantity(shares);
            validateBalance(dollars);
        } else {
            setAmount("");
            setQuantity("");
            setError("");
        }
    };

    const validateBalance = (total: number) => {
        // Validation now checks against Combined Liquidity
        if (total > availableLiquidity) {
            setError("INSUFFICIENT_LIQUIDITY: Order exceeds available nodes.");
        } else {
            setError("");
        }
    };

    const shootConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#1f95c9', '#ffffff', '#0ea5e9'] 
        });
    };

    // --- CORE EXECUTION PROTOCOL ---
    const handleBuy = async () => {
        const tradeAmount = Number(amount);
        if (!quantity || !tradeAmount || tradeAmount > availableLiquidity || !userId) return;

        try {
            setIsLoading(true);

            const batch = writeBatch(db);

            // 1. CAPITAL SIPHONING MATH
            let newDeposit = currentDeposit;
            let newProfit = currentProfit;

            if (newDeposit >= tradeAmount) {
                // Deposit covers the whole purchase
                newDeposit -= tradeAmount;
            } else {
                // Deposit exhausted, pull remainder from profit
                const remainder = tradeAmount - newDeposit;
                newDeposit = 0;
                newProfit -= remainder;
            }

            // 2. UPDATE PROFILE BALANCES
            const profileRef = doc(db, "profiles", userId);
            batch.update(profileRef, {
                totalDeposit: newDeposit,
                profit: newProfit
            });

            // 3. LOG TO STOCK LEDGER (Asset Tracking)
            const newStockRef = doc(collection(db, "stockLogs"));
            batch.set(newStockRef, {
                userId,
                shares: Number(quantity),
                amount: tradeAmount,
                pricePerShare: sharePrice,
                symbol: "TSLA",
                type: "buy",
                status: "successful",
                createdAt: serverTimestamp()
            });

            // 4. LOG TO TRANSACTION LEDGER (Global Tracking & Admin View)
            const newTxRef = doc(collection(db, "transactions"));
            batch.set(newTxRef, {
                userId,
                amount: tradeAmount,
                type: "asset_acquisition",
                category: "share", // Categorization tag for history sorting
                status: "approved",
                createdAt: serverTimestamp(),
                metadata: {
                    symbol: "TSLA",
                    sharesAcquired: Number(quantity),
                    executionPrice: sharePrice
                }
            });

            // Commit the entire atomic batch
            await batch.commit();

            toast.success(`PROTOCOL_EXECUTED: Acquired ${quantity} TSLA nodes.`);
            shootConfetti();
            setQuantity("");
            setAmount("");
            setError("");
        } catch (err) {
            console.error("EXECUTION_FAILURE:", err);
            toast.error("SYSTEM_ERR: Transaction aborted.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500 p-4 sm:p-6">
            
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1117]/80 backdrop-blur-sm">
                    <div className="border border-brand-500/30 bg-[#0D1117] p-8 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(31,149,201,0.1)]">
                        <Terminal size={32} className="text-brand-500 animate-pulse" />
                        <p className="text-[10px] font-mono font-bold text-brand-500 uppercase tracking-widest">
                            Executing_Transaction_Protocol...
                        </p>
                    </div>
                </div>
            )}

            {/* Header Identity Node */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 md:p-8 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-[0.2em]">
                    ASSET_ACQUISITION_V2
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-3 border border-brand-500/20 bg-brand-500/5 shrink-0">
                        <TrendingUp className="text-brand-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Initialize Buy Order</h1>
                        <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Flash Profits System · Instant Settlement Node</p>
                    </div>
                </div>

                {/* Market Price Node */}
                <div className="flex items-center gap-6 sm:px-6 sm:py-3 sm:border-l border-slate-200 dark:border-white/5">
                    <div className="space-y-1">
                        <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">TSLA_MARKET_PRICE</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">${sharePrice.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 text-emerald-500 font-black text-[10px]">
                            <Zap size={10} /> +2.41%
                        </div>
                        <p className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">Live_Relay</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Summary and Intelligence (7/12) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 md:p-8 relative overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <DataNode 
                                label="Available_Liquidity" 
                                value={`$${availableLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
                                icon={<Wallet size={14}/>} 
                            />
                            <DataNode 
                                label="Projected_Position" 
                                value={quantity ? `${quantity} TSLA` : "0.0000 TSLA"} 
                                icon={<Layers size={14}/>} 
                            />
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Transaction_Preview</span>
                                <Activity size={14} className="text-brand-500 animate-pulse" />
                            </div>
                            <div className="space-y-4">
                                <PreviewRow label="Total_Execution_Cost" value={amount ? `$${amount}` : "$0.00"} />
                                <PreviewRow label="Post_Trade_Liquidity" value={`$${(availableLiquidity - Number(amount)).toFixed(2)}`} />
                                <PreviewRow label="Settlement_Speed" value="INSTANT_NODE" isDimmed />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-brand-500/5 border border-brand-500/20">
                        <Terminal size={16} className="text-brand-500 shrink-0 mt-1" />
                        <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed tracking-tight">
                            Orders are processed via simulated liquidity pools. Prices reflect the current TSLA relay and do not account for real-world slippage or institutional latency.
                        </p>
                    </div>
                </div>

                {/* Right: Execution Form (5/12) */}
                <div className="lg:col-span-5 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 md:p-8 space-y-8">
                    {/* Execution Mode Toggle */}
                    <div className="flex p-1 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <button
                            onClick={() => { setMode("shares"); setQuantity(""); setAmount(""); setError(""); }}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === "shares" ? "bg-brand-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                        >
                            BY_SHARES
                        </button>
                        <button
                            onClick={() => { setMode("amount"); setQuantity(""); setAmount(""); setError(""); }}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${mode === "amount" ? "bg-brand-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                        >
                            BY_AMOUNT
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
                                    {mode === "shares" ? "Node_Quantity" : "Capital_Volume_USD"}
                                </label>
                                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                                    {mode === "amount" ? `MAX: $${availableLiquidity.toFixed(2)}` : "MIN: 0.0001"}
                                </span>
                            </div>
                            <div className="relative group">
                                {mode === "amount" && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 font-mono font-bold">$</div>}
                                <Input
                                    type="number"
                                    step="0.0001"
                                    placeholder={mode === "shares" ? "0.0000" : "0.00"}
                                    value={mode === "shares" ? quantity : amount}
                                    onChange={(e) => mode === "shares" ? handleSharesChange(e.target.value) : handleAmountChange(e.target.value)}
                                    onWheel={(e: any) => e.target.blur()} 
                                    className={`w-full py-4 text-xl font-black font-mono tracking-tighter uppercase [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${mode === "amount" ? "pl-8" : "pl-4"}`}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20 text-red-500">
                                <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                                <p className="text-[9px] font-mono font-bold uppercase leading-relaxed">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleBuy}
                            disabled={!quantity || !amount || !!error || isLoading}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-brand-500/10 active:scale-[0.98]"
                            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                        >
                            <Zap size={14}/> Execute Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function DataNode({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
                {icon}
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
        </div>
    );
}

function PreviewRow({ label, value, isDimmed = false }: { label: string; value: string; isDimmed?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">{label}</span>
            <span className={`text-[12px] font-black uppercase tracking-wide ${isDimmed ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>{value}</span>
        </div>
    );
}