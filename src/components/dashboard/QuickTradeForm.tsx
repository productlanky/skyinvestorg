"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

interface AssetOption {
    value: string;
    name: string;
    logo: string;
}

interface AssetGroup {
    label: string;
    options: AssetOption[];
}

const LEVERAGE_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// 1. UPDATED TTL OPTIONS
const EXPIRATION_OPTIONS = ["30 Seconds", "45 Seconds", "1 Minute"];

// 2. UPDATED HELPER: Now calculates milliseconds from Seconds
const getExpirationMs = (expStr: string) => {
    const value = parseInt(expStr);
    if (expStr.includes("Second")) return value * 1000;
    if (expStr.includes("Minute")) return value * 60 * 1000;
    return 30000; // Default to 30s as failsafe
};

export default function QuickTradeForm({ initialAsset }: { initialAsset?: string }) {
    const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<AssetOption | null>(null);
    const [isLoadingAssets, setIsLoadingAssets] = useState(true);

    const [amount, setAmount] = useState("");
    const [leverage, setLeverage] = useState("");
    const [expiration, setExpiration] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchMarketData = async () => {
            setIsLoadingAssets(true);
            try {
                const res = await fetch('/api/assets');
                if (!res.ok) throw new Error(`API returned status: ${res.status}`);

                const data: AssetGroup[] = await res.json();
                setAssetGroups(data);

                if (initialAsset) {
                    const match = data.flatMap(g => g.options).find(
                        o => o.value.toLowerCase() === initialAsset.toLowerCase()
                    );
                    if (match) setSelectedAsset(match);
                    else if (data.length > 0) setSelectedAsset(data[0].options[0]);
                } else if (data.length > 0 && data[0].options.length > 0) {
                    setSelectedAsset(data[0].options[0]);
                }
            } catch (error) {
                console.error("Internal API Sync Error:", error);
            } finally {
                setIsLoadingAssets(false);
            }
        };

        fetchMarketData();
    }, [initialAsset]);

    const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const allOptions = assetGroups.flatMap(g => g.options);
        const match = allOptions.find(opt => opt.value === val);
        if (match) setSelectedAsset(match);
    };

    // --- PHASE 3: THE RESOLUTION ENGINE ---
    const resolveTrade = async (txId: string, userId: string, tradeAmount: number, levRatio: number, asset: string, direction: string) => {
        try {
            // Simulate Market Outcome (60% win rate for simulation)
            const isWin = Math.random() > 0.4; 
            
            // Calculate Profit: Amount * (Leverage / 100)
            const calculatedProfit = isWin ? (tradeAmount * (levRatio / 100)) : 0;
            const finalStatus = isWin ? "won" : "lost";

            // Update Transaction Record
            const txRef = doc(db, "transactions", txId);
            await updateDoc(txRef, {
                status: finalStatus,
                profit: calculatedProfit,
                resolvedAt: serverTimestamp()
            });

            // Inject Winnings Back to User (If Won)
            if (isWin) {
                const profileRef = doc(db, "profiles", userId);
                const profileSnap = await getDoc(profileRef);
                
                if (profileSnap.exists()) {
                    const currentProfitBalance = Number(profileSnap.data().profit || 0);
                    // Return the original stake PLUS the new profit
                    const newProfitBalance = currentProfitBalance + tradeAmount + calculatedProfit;
                    
                    await updateDoc(profileRef, { profit: newProfitBalance });
                }
                toast.success(`TRADE WON: ${direction} ${asset} returned +$${calculatedProfit.toFixed(2)}`);
            } else {
                toast.error(`TRADE LOST: ${direction} ${asset} closed out of the money.`);
            }

        } catch (error) {
            console.error("Trade Resolution Error:", error);
        }
    };

    // --- PHASE 1 & 2: EXECUTION & TIMER ---
    const executeTrade = async (tradeType: "Buy" | "Sell") => {
        if (!selectedAsset) {
            toast.error("DATA_ERR: Market data not synchronized.");
            return;
        }
        
        const tradeAmount = Number(amount);
        if (!tradeAmount || tradeAmount < 50) {
            toast.error("VOL_ERR: Minimum execution volume is $50.00 USD");
            return;
        }
        if (!leverage || !expiration) {
            toast.error("PARAM_ERR: Missing leverage or expiration parameters.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            toast.error("AUTH_ERR: Terminal session invalid.");
            return;
        }

        setIsSubmitting(true);
        toast.info("INITIALIZING_TRANSACTION...");

        try {
            const profileRef = doc(db, "profiles", user.uid);
            const profileSnap = await getDoc(profileRef);

            if (!profileSnap.exists()) throw new Error("Profile node missing.");

            const pData = profileSnap.data();
            let currentDeposit = Number(pData.totalDeposit || 0);
            let currentProfit = Number(pData.profit || 0);

            // LIQUIDITY CHECK
            if (tradeAmount > (currentDeposit + currentProfit)) {
                toast.error("INSUFFICIENT_FUNDS: Gross equity cannot support this order.");
                setIsSubmitting(false);
                return;
            }

            // CAPITAL SIPHONING PROTOCOL (Deduct funds immediately)
            let newDeposit = currentDeposit;
            let newProfit = currentProfit;

            if (currentDeposit >= tradeAmount) {
                newDeposit -= tradeAmount;
            } else {
                const remainingNeeded = tradeAmount - currentDeposit;
                newDeposit = 0;
                newProfit -= remainingNeeded;
            }

            await updateDoc(profileRef, {
                totalDeposit: newDeposit,
                profit: newProfit
            });

            // LOG AS RUNNING
            const txDocRef = await addDoc(collection(db, "transactions"), {
                userId: user.uid,
                type: 'trade_execution',     
                category: 'trade',           
                amount: tradeAmount,
                status: "running", 
                createdAt: serverTimestamp(),
                metadata: {
                    tradeDirection: tradeType, 
                    assetSymbol: selectedAsset.value,
                    assetName: selectedAsset.name,
                    leverageRatio: leverage,
                    expirationTime: expiration
                }
            });

            // START THE SIMULATION TIMER
            const expirationMs = getExpirationMs(expiration);
            const levRatio = Number(leverage);
            
            toast.success(`ORDER PLACED: Running ${expiration} Trade on ${selectedAsset.value}.`);
            
            setTimeout(() => {
                resolveTrade(txDocRef.id, user.uid, tradeAmount, levRatio, selectedAsset.value, tradeType);
            }, expirationMs);

            // Reset Form
            setAmount(""); 
            setLeverage("");
            setExpiration("");

        } catch (error) {
            console.error("Execution Error:", error);
            toast.error("SYS_ERR: Transaction aborted.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const terminalInput = "w-full rounded-none bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 px-4 py-3.5 text-[11px] font-mono font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors uppercase tracking-widest";

    return (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative group overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
            <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
                EXECUTION_NODE
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 border border-brand-500/20 bg-brand-500/10">
                        <BarChart3 className="text-brand-500" size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Place a Trade</h3>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">Direct Market Access</p>
                    </div>
                </div>
            </div>

            <form className="space-y-6 flex-1 flex flex-col relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Target_Asset</label>
                    {isLoadingAssets ? (
                        <div className={`${terminalInput} flex items-center justify-center gap-2 text-slate-500 py-3`}>
                            <Loader2 size={14} className="animate-spin" />
                            <span className="text-[10px] font-mono uppercase">Syncing_Markets...</span>
                        </div>
                    ) : (
                        <div className="relative">
                            <select
                                value={selectedAsset?.value || ""}
                                onChange={handleAssetChange}
                                className={`${terminalInput} appearance-none cursor-pointer`}
                            >
                                {assetGroups.map((group, idx) => (
                                    <optgroup key={idx} label={group.label} className="bg-white dark:bg-[#0D1117] font-sans font-bold text-brand-500">
                                        {group.options.map(opt => (
                                            <option key={opt.value} value={opt.value} className="text-slate-900 dark:text-white font-mono font-normal">
                                                {opt.value}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                        </div>
                    )}

                    {selectedAsset && !isLoadingAssets && (
                        <div className="flex items-center gap-2 mt-2 px-1">
                            {selectedAsset.logo ? (
                                <img src={selectedAsset.logo} alt={selectedAsset.name} className="w-5 h-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-0.5 object-contain" />
                            ) : (
                                <div className="w-5 h-5 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
                                    <span className="text-[9px] font-bold text-brand-500">{selectedAsset.value.charAt(0)}</span>
                                </div>
                            )}
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{selectedAsset.name}</span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Capital_Deployment</label>
                        <span className="text-[8px] text-slate-500 font-mono uppercase tracking-tighter">Min: 50 | Max: 500k</span>
                    </div>
                    <div className="flex border border-slate-200 dark:border-white/10 focus-within:border-brand-500 transition-colors">
                        <span className="bg-slate-100 dark:bg-white/5 px-4 flex items-center text-[10px] font-mono font-black text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-white/10">USD</span>
                        <input
                            type="number"
                            min="50"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onWheel={(e: any) => e.target.blur()} 
                            placeholder="0.00"
                            className="w-full bg-slate-50 dark:bg-[#0D1117] p-4 text-lg font-black font-mono text-slate-900 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none tracking-tighter"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Multiplier</label>
                        <div className="relative">
                            <select value={leverage} onChange={(e) => setLeverage(e.target.value)} className={`${terminalInput} appearance-none cursor-pointer py-4`}>
                                <option value="" disabled>Ratio</option>
                                {LEVERAGE_OPTIONS.map(lev => <option key={lev} value={lev}>1:{lev}</option>)}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Time_Limit</label>
                        <div className="relative">
                            <select value={expiration} onChange={(e) => setExpiration(e.target.value)} className={`${terminalInput} appearance-none cursor-pointer py-4`}>
                                <option value="" disabled>TTL</option>
                                {EXPIRATION_OPTIONS.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
                        </div>
                    </div>
                </div>

                {/* Execution Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
                    <button
                        type="button"
                        onClick={() => executeTrade("Buy")}
                        disabled={isSubmitting || isLoadingAssets}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-5 font-black uppercase text-[10px] tracking-[0.3em] disabled:opacity-50 transition-colors shadow-lg shadow-emerald-500/10 active:scale-[0.98]"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={16} />} LONG
                    </button>

                    <button
                        type="button"
                        onClick={() => executeTrade("Sell")}
                        disabled={isSubmitting || isLoadingAssets}
                        className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white py-5 font-black uppercase text-[10px] tracking-[0.3em] disabled:opacity-50 transition-colors shadow-lg shadow-rose-500/10 active:scale-[0.98]"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowDownRight size={16} />} SHORT
                    </button>
                </div>
            </form>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-500/50 pointer-events-none"></div>
        </div>
    );
}