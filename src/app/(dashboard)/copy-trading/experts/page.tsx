"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  ArrowLeft, Search, Star, TrendingUp, Users, Wallet, Copy, Loader2, ShieldCheck
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, serverTimestamp, writeBatch } from "firebase/firestore";

// --- FULL EXPERT REGISTRY PAYLOAD ---
const EXPERT_REGISTRY = [
  { id: "exp_1", name: "Isabella Foster", category: "Fixed Income", min: 3800, winRate: 93, return: "+124,500%", equity: "$385,000", trades: 2789, followers: 13800, rating: 5, desc: "Fixed income and bond trading expert with institutional background. Specializes in yield curve strategies and credit spread trading." },
  { id: "exp_2", name: "Alex Thompson", category: "Forex Expert", min: 100, winRate: 93, return: "+124,500%", equity: "$385,000", trades: 2789, followers: 13801, rating: 5, desc: "Experienced forex trader specializing in major currency pairs with a focus on risk management." },
  { id: "exp_3", name: "David Kim", category: "Swing Trader", min: 300, winRate: 92, return: "+86%", equity: "$125,000", trades: 1547, followers: 234, rating: 4, desc: "Swing trading specialist using fundamental and technical analysis for medium-term positions." },
  { id: "exp_4", name: "Alexandra Chen", category: "Quant Expert", min: 2500, winRate: 89, return: "+84,750%", equity: "$285,000", trades: 3247, followers: 12450, rating: 5, desc: "Former Goldman Sachs quantitative analyst specializing in algorithmic trading strategies. 15+ years experience in institutional trading." },
  { id: "exp_5", name: "Marcus Rodriguez", category: "Stock Market Pro", min: 500, winRate: 89, return: "+204%", equity: "$310,000", trades: 2341, followers: 412, rating: 4, desc: "Professional stock trader with 15+ years experience in equity markets and technical analysis." },
  { id: "exp_6", name: "Yuki Tanaka", category: "Asian Markets", min: 2600, winRate: 88, return: "+78,940%", equity: "$265,000", trades: 3123, followers: 7650, rating: 5, desc: "Asian markets expert with deep understanding of Japanese and Chinese equity markets. Specializes in cross-border arbitrage." },
  { id: "exp_7", name: "Lisa Anderson", category: "ESG Investing", min: 4200, winRate: 87, return: "+145,600%", equity: "$420,000", trades: 2345, followers: 16750, rating: 5, desc: "ESG and sustainable investing pioneer. Combines fundamental analysis with environmental and social impact criteria." },
  { id: "exp_8", name: "Emma Wilson", category: "Day Trader", min: 150, winRate: 86, return: "+63,480%", equity: "$210,000", trades: 2945, followers: 9340, rating: 4, desc: "High-frequency day trader focusing on scalping strategies and momentum trading." },
  { id: "exp_9", name: "Roberto Silva", category: "Emerging Markets", min: 1600, winRate: 81, return: "+45,670%", equity: "$175,000", trades: 1934, followers: 5890, rating: 4, desc: "Emerging markets specialist focusing on Latin American and Brazilian markets. Expert in currency volatility." },
  { id: "exp_10", name: "James Thompson", category: "Commodities", min: 1950, winRate: 82, return: "+49,870%", equity: "$185,000", trades: 1678, followers: 11200, rating: 4, desc: "Commodities trading specialist with expertise in energy and agricultural markets. Uses fundamental analysis." },
  { id: "exp_11", name: "Mohammed Al-Rashid", category: "Energy Sector", min: 2100, winRate: 85, return: "+67,890%", equity: "$240,000", trades: 5678, followers: 8450, rating: 5, desc: "Middle Eastern markets specialist with expertise in oil and gas sector investments. Strong background in geopolitical analysis." },
  { id: "exp_12", name: "Viktor Petrov", category: "HFT Expert", min: 2900, winRate: 80, return: "+0%", equity: "$0", trades: 0, followers: 0, rating: 4, desc: "High-frequency trading specialist with expertise in market microstructure. Former prop trader." }
];

export default function ExpertsRegistryPage() {
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- FIREBASE SYNC ---
  useEffect(() => {
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

  // Safe Liquidity Calculation (With Legacy Fallback)
  const currentDeposit = profile?.totalDeposit !== undefined ? Number(profile.totalDeposit) : Number(profile?.balance || 0);
  const currentProfit = Number(profile?.profit || 0);
  const availableLiquidity = currentDeposit + currentProfit;

  // Filter Logic
  const filteredExperts = EXPERT_REGISTRY.filter(exp => 
    exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    exp.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER PROTOCOL --- */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">
            EXPERT_REGISTRY_NODE
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
            <Link 
                href="/copy-trading" 
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-500 transition-colors mb-6"
            >
                <ArrowLeft size={14} /> Return_To_Hub
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">
                        Syndicate Directory
                    </h1>
                    <p className="text-xs font-mono text-slate-500 uppercase leading-relaxed max-w-2xl">
                        Browse verified institutional traders. Deploy automated mirror parameters to duplicate their execution strategies in real-time.
                    </p>
                </div>

                <div className="flex flex-col items-start sm:items-end bg-slate-50 dark:bg-white/5 px-4 py-2 border border-slate-200 dark:border-white/10 shrink-0">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Wallet size={12} /> Available_Liquidity
                    </span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter leading-none">
                        ${availableLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-8 relative max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="SCAN_REGISTRY (Name or Category)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 pl-12 pr-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
                />
            </div>
        </div>
      </div>

      {/* --- EXPERT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredExperts.map(expert => (
                <ExpertCard 
                    key={expert.id} 
                    expert={expert} 
                    userId={userId}
                    currentDeposit={currentDeposit}
                    currentProfit={currentProfit}
                    availableLiquidity={availableLiquidity}
                />
            ))}
        </div>

        {filteredExperts.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 opacity-50">
                <Search size={32} className="mb-4" />
                <p className="text-[10px] font-mono uppercase tracking-[0.2em]">NO_TRADERS_MATCH_QUERY</p>
            </div>
        )}
      </div>
    </div>
  );
}

// --- ISOLATED EXPERT CARD COMPONENT ---
function ExpertCard({ expert, userId, currentDeposit, currentProfit, availableLiquidity }: any) {
    const [amount, setAmount] = useState<number | "">(expert.min);
    const [isDeploying, setIsDeploying] = useState(false);

    // --- CORE EXECUTION PROTOCOL ---
    const handleCopy = async () => {
        const deployAmount = Number(amount);

        // Validation
        if (!deployAmount || deployAmount < expert.min) {
            toast.error(`SYS_ERR: Minimum allocation for ${expert.name} is $${expert.min.toLocaleString()}.`);
            return;
        }
        if (deployAmount > availableLiquidity) {
            toast.error("INSUFFICIENT_LIQUIDITY: Gross equity cannot support this order.");
            return;
        }
        if (!userId) {
            toast.error("AUTH_ERR: Terminal session missing.");
            return;
        }

        setIsDeploying(true);
        toast.info("ESTABLISHING_LINK: Synchronizing with expert node...");

        try {
            const batch = writeBatch(db);

            // 1. CAPITAL SIPHONING
            let newDeposit = currentDeposit;
            let newProfit = currentProfit;

            if (newDeposit >= deployAmount) {
                newDeposit -= deployAmount;
            } else {
                const remainder = deployAmount - newDeposit;
                newDeposit = 0;
                newProfit -= remainder;
            }

            // 2. UPDATE PROFILE
            const profileRef = doc(db, "profiles", userId);
            batch.update(profileRef, {
                totalDeposit: newDeposit,
                profit: newProfit
            });

            // 3. LOG ACTIVE COPY TRADE
            const newCopyRef = doc(collection(db, "copy_trades"));
            batch.set(newCopyRef, {
                userId,
                expertId: expert.id,
                expertName: expert.name,
                amount: deployAmount,
                profit: 0,
                status: "active",
                createdAt: serverTimestamp(),
            });

            // 4. LOG TRANSACTION FOR LEDGER
            const newTxRef = doc(collection(db, "transactions"));
            batch.set(newTxRef, {
                userId,
                amount: deployAmount,
                type: "mirror_deployment",
                category: "copy_trade", // Strictly categorized for filtering
                status: "approved",
                createdAt: serverTimestamp(),
                metadata: {
                    expertName: expert.name,
                    expertCategory: expert.category
                }
            });

            // 5. SEND NOTIFICATION
            const notifRef = doc(collection(db, "notifications"));
            batch.set(notifRef, {
                userId,
                title: "Mirror Protocol Active",
                message: `Successfully allocated $${deployAmount.toLocaleString()} to mirror ${expert.name}.`,
                type: "success",
                read: false,
                createdAt: serverTimestamp()
            });

            await batch.commit();
            toast.success(`PROTOCOL_EXECUTED: Now mirroring ${expert.name}.`);

            // Reset the input field
            setAmount("");

        } catch (error) {
            console.error("Copy Error:", error);
            toast.error("SYS_ERR: Failed to initialize mirror node.");
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 flex flex-col hover:border-brand-500/50 transition-colors group">
            
            {/* Expert Header */}
            <div className="p-6 border-b border-slate-100 dark:border-white/5 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-amber-500">
                    {[...Array(expert.rating)].map((_, i) => (
                        <Star key={i} size={10} className="fill-current" />
                    ))}
                </div>

                <div className="text-center mb-4">
                    <div className="w-16 h-16 rounded-none bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xl font-black text-brand-500 mx-auto mb-3">
                        {expert.name.charAt(0)}
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                        {expert.name}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                        {expert.category}
                    </p>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="p-6 pb-4 grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01]">
                <div className="text-center">
                    <div className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">{expert.winRate}%</div>
                    <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Win Rate</div>
                    <div className="w-full bg-slate-200 dark:bg-white/10 h-1 mt-2">
                        <div className="bg-emerald-500 h-1 transition-all" style={{ width: `${expert.winRate}%` }}></div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-black text-emerald-500 tracking-tighter">{expert.return}</div>
                    <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Return</div>
                </div>
                <div className="text-center mt-2">
                    <div className="text-sm font-black text-slate-900 dark:text-white">{expert.equity}</div>
                    <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Equity</div>
                </div>
                <div className="text-center mt-2">
                    <div className="text-sm font-black text-slate-900 dark:text-white">{expert.trades.toLocaleString()}</div>
                    <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Trades</div>
                </div>
            </div>

            {/* Description & Followers */}
            <div className="p-6 pb-2">
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed h-[50px]">
                    {expert.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <Users size={12} className="text-brand-500" /> {expert.followers.toLocaleString()} Followers
                </div>
                
                {/* Min Investment Node */}
                <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Min_Allocation</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter">${expert.min.toLocaleString()}.00</span>
                </div>
            </div>

            {/* Action Area */}
            <div className="p-6 pt-0 space-y-3 mt-auto">
                <div className="relative group/input">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">$</span>
                    <input 
                        type="number" 
                        min={expert.min}
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        onWheel={(e: any) => e.target.blur()}
                        className="w-full bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 pl-8 pr-4 py-3 text-sm font-black text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                <button 
                    onClick={handleCopy}
                    disabled={isDeploying}
                    className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-lg shadow-brand-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                >
                    {isDeploying ? (
                        <><Loader2 size={14} className="animate-spin" /> SYNCING_NODE...</>
                    ) : (
                        <><Copy size={14} /> EXECUTE_MIRROR</>
                    )}
                </button>
            </div>
        </div>
    );
}