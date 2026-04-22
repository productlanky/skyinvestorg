"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  ArrowLeft, Activity, Target, Clock, Info, 
  ShieldAlert, Zap, Terminal, CheckSquare, 
  Users, BarChart2, Briefcase, Star
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, serverTimestamp, writeBatch } from "firebase/firestore";

// --- EXPANDED DATA PAYLOAD (Must match the Hub page exactly) ---
const BOT_DATA = [
  // --- FOREX ---
  {
    id: 1, name: "Forex Precision Elite", category: "FOREX", successRate: 93, totalTrades: 12450, totalProfit: 890450, expectedReturn: "1.50% - 4.10%", duration: 90, description: "Premium forex trading bot utilizing advanced neural networks and sentiment analysis. Designed for institutional-grade precision.", strategyType: "Neural Sentiment Arbitrage", frequency: "High-Frequency (Sub-second)", minInvestment: 750, maxInvestment: 50000, riskLevel: "HIGH_RISK", pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "+2 MORE"], activeUsers: 142, totalEarned: 45020, rating: 5
  },
  {
    id: 7, name: "FX Carry Trade Pro", category: "FOREX", successRate: 88, totalTrades: 8420, totalProfit: 340500, expectedReturn: "0.80% - 2.20%", duration: 180, description: "Exploits interest rate differentials between high-yield and low-yield fiat currencies. Optimal for stable, long-term macroeconomic environments.", strategyType: "Macro Interest Differential", frequency: "Low-Frequency (Position)", minInvestment: 1000, maxInvestment: 100000, riskLevel: "LOW_RISK", pairs: ["AUD/JPY", "NZD/JPY", "USD/CHF", "+4 MORE"], activeUsers: 312, totalEarned: 89400, rating: 4
  },
  {
    id: 16, name: "Asian Session Scalper", category: "FOREX", successRate: 94, totalTrades: 45000, totalProfit: 125000, expectedReturn: "1.10% - 3.50%", duration: 30, description: "High-frequency scalping node optimized for the low-volatility Asian trading session (Tokyo/Sydney overlap).", strategyType: "Session Volatility Scalping", frequency: "High-Frequency (Intraday)", minInvestment: 500, maxInvestment: 25000, riskLevel: "MODERATE_RISK", pairs: ["AUD/USD", "NZD/USD", "EUR/AUD", "+3 MORE"], activeUsers: 420, totalEarned: 56000, rating: 5
  },

  // --- CRYPTO ---
  {
    id: 2, name: "AlgoTrader Supreme", category: "CRYPTO", successRate: 91, totalTrades: 3247, totalProfit: 84750, expectedReturn: "2.10% - 6.80%", duration: 45, description: "Next-generation algorithmic trading bot powered by quantum computing principles. Specializes in high-frequency crypto arbitrage.", strategyType: "Quantitative Arbitrage", frequency: "High-Frequency (HFT)", minInvestment: 500, maxInvestment: 100000, riskLevel: "MODERATE_RISK", pairs: ["BTC/USDT", "ETH/USDT", "BNB/USDT", "ADA/USDT", "+4 MORE"], activeUsers: 89, totalEarned: 112400, rating: 5
  },
  {
    id: 8, name: "DeFi Yield Sniper", category: "CRYPTO", successRate: 86, totalTrades: 1250, totalProfit: 45000, expectedReturn: "3.50% - 8.00%", duration: 14, description: "Scans decentralized exchanges (DEXs) across multiple blockchains to identify and exploit flash-loan arbitrage and liquidity pool imbalances.", strategyType: "DEX Flash Arbitrage", frequency: "Event-Driven", minInvestment: 1500, maxInvestment: 20000, riskLevel: "HIGH_RISK", pairs: ["UNI/USDT", "LINK/USDT", "AAVE/USDT", "+12 MORE"], activeUsers: 56, totalEarned: 34900, rating: 4
  },
  {
    id: 13, name: "Altcoin Momentum Scanner", category: "CRYPTO", successRate: 82, totalTrades: 8900, totalProfit: 320000, expectedReturn: "4.00% - 12.00%", duration: 7, description: "Monitors social sentiment and on-chain volume spikes to catch early momentum breakouts in mid-cap cryptocurrencies.", strategyType: "Social Sentiment Breakout", frequency: "Medium-Frequency", minInvestment: 250, maxInvestment: 10000, riskLevel: "HIGH_RISK", pairs: ["SOL/USDT", "AVAX/USDT", "MATIC/USDT", "+25 MORE"], activeUsers: 890, totalEarned: 210500, rating: 4
  },
  {
    id: 20, name: "Bitcoin Whale Tracker", category: "CRYPTO", successRate: 95, totalTrades: 450, totalProfit: 1250000, expectedReturn: "1.00% - 5.00%", duration: 60, description: "Analyzes massive on-chain wallet movements to front-run institutional block trades. Extremely high accuracy, low trade frequency.", strategyType: "On-Chain Order Flow", frequency: "Low-Frequency", minInvestment: 5000, maxInvestment: 250000, riskLevel: "LOW_RISK", pairs: ["BTC/USDT", "BTC/USDC"], activeUsers: 24, totalEarned: 840000, rating: 5
  },

  // --- STOCKS ---
  {
    id: 3, name: "Stock Momentum Master", category: "STOCKS", successRate: 89, totalTrades: 4567, totalProfit: 134500, expectedReturn: "1.20% - 3.80%", duration: 120, description: "Advanced momentum trading bot that identifies breakout patterns and trending stocks. Focuses on high-volume equities.", strategyType: "Momentum Breakout", frequency: "Medium-Frequency (Daily)", minInvestment: 1500, maxInvestment: 80000, riskLevel: "MODERATE_RISK", pairs: ["AAPL", "TSLA", "NVDA", "AMD", "+12 MORE"], activeUsers: 215, totalEarned: 89000, rating: 5
  },
  {
    id: 9, name: "Blue Chip Dividend Harvester", category: "STOCKS", successRate: 96, totalTrades: 890, totalProfit: 45000, expectedReturn: "0.30% - 1.10%", duration: 365, description: "Low-risk protocol that rotates capital through Fortune 500 companies specifically timing ex-dividend dates to harvest maximum yield.", strategyType: "Dividend Capture Rotation", frequency: "Low-Frequency", minInvestment: 5000, maxInvestment: 500000, riskLevel: "LOW_RISK", pairs: ["KO", "JNJ", "PG", "JPM", "+30 MORE"], activeUsers: 1042, totalEarned: 1250000, rating: 5
  },
  {
    id: 12, name: "Tech Sector Breakout", category: "STOCKS", successRate: 84, totalTrades: 2100, totalProfit: 89000, expectedReturn: "2.50% - 6.00%", duration: 30, description: "Aggressive equity node targeting volatile tech earnings reports and product launch cycles. Uses options flow data to predict moves.", strategyType: "Earnings Volatility Scalping", frequency: "Event-Driven", minInvestment: 1000, maxInvestment: 50000, riskLevel: "HIGH_RISK", pairs: ["META", "MSFT", "GOOGL", "AMZN", "+5 MORE"], activeUsers: 334, totalEarned: 145000, rating: 4
  },
  {
    id: 19, name: "Dark Pool Liquidity Scanner", category: "STOCKS", successRate: 91, totalTrades: 3200, totalProfit: 450000, expectedReturn: "1.80% - 4.50%", duration: 90, description: "Monitors off-exchange (dark pool) trading volumes to identify hidden institutional buying pressure before it hits public lit markets.", strategyType: "Institutional Order Flow Tracking", frequency: "Medium-Frequency", minInvestment: 10000, maxInvestment: 1000000, riskLevel: "MODERATE_RISK", pairs: ["SPY", "QQQ", "IWM", "+100 MORE"], activeUsers: 18, totalEarned: 3200000, rating: 5
  },

  // --- COMMODITIES ---
  {
    id: 4, name: "Commodity Weather AI", category: "COMMODITIES", successRate: 87.0, totalTrades: 4320, totalProfit: 125000, expectedReturn: "1.30% - 4.50%", duration: 180, description: "Intelligent commodity trading bot that incorporates weather data, supply chain analysis, and seasonal patterns for agricultural and energy commodities.", strategyType: "Macro Environmental Tracking", frequency: "Low-Frequency (Swing)", minInvestment: 800, maxInvestment: 40000, riskLevel: "MODERATE_RISK", pairs: ["WHEAT", "CORN", "SOYBEANS", "COFFEE", "+5 MORE"], activeUsers: 64, totalEarned: 34500, rating: 4
  },
  {
    id: 11, name: "Precious Metals Vault", category: "COMMODITIES", successRate: 92, totalTrades: 1500, totalProfit: 89000, expectedReturn: "0.50% - 1.50%", duration: 365, description: "Hedges against fiat inflation by algorithmically trading the Gold/Silver ratio and tracking central bank reserve purchases.", strategyType: "Ratio Arbitrage & Macro Hedging", frequency: "Low-Frequency", minInvestment: 2000, maxInvestment: 200000, riskLevel: "LOW_RISK", pairs: ["XAU/USD", "XAG/USD", "PLATINUM", "PALLADIUM"], activeUsers: 512, totalEarned: 410000, rating: 5
  },
  {
    id: 17, name: "Energy Grid Algorithm", category: "COMMODITIES", successRate: 85, totalTrades: 3200, totalProfit: 150000, expectedReturn: "2.00% - 5.50%", duration: 60, description: "Trades crude oil and natural gas futures by analyzing OPEC+ supply quotas, geopolitical unrest, and global shipping bottleneck data.", strategyType: "Geopolitical Supply/Demand", frequency: "Medium-Frequency", minInvestment: 1500, maxInvestment: 75000, riskLevel: "HIGH_RISK", pairs: ["BRENT", "WTI", "NATGAS", "+2 MORE"], activeUsers: 128, totalEarned: 189000, rating: 4
  },

  // --- OPTIONS ---
  {
    id: 6, name: "Options Gamma Scalper", category: "OPTIONS", successRate: 85, totalTrades: 15400, totalProfit: 67800, expectedReturn: "2.50% - 7.20%", duration: 30, description: "Sophisticated options trading bot specializing in gamma scalping strategies. Exploits volatility changes and time decay.", strategyType: "Gamma Scalping", frequency: "High-Frequency (Intraday)", minInvestment: 2000, maxInvestment: 60000, riskLevel: "HIGH_RISK", pairs: ["SPY", "QQQ", "IWM", "AAPL", "+8 MORE"], activeUsers: 112, totalEarned: 67800, rating: 4
  },
  {
    id: 10, name: "Volatility Crusher", category: "OPTIONS", successRate: 90, totalTrades: 890, totalProfit: 145000, expectedReturn: "1.00% - 3.50%", duration: 45, description: "Sells out-of-the-money options premium during periods of extreme VIX spikes, profiting systematically as market fear subsides.", strategyType: "Premium Selling (Short Volatility)", frequency: "Medium-Frequency", minInvestment: 5000, maxInvestment: 150000, riskLevel: "MODERATE_RISK", pairs: ["VIX", "SPX Options", "NDX Options"], activeUsers: 88, totalEarned: 245000, rating: 5
  },
  {
    id: 15, name: "Theta Decay Harvester", category: "OPTIONS", successRate: 94, totalTrades: 3200, totalProfit: 89000, expectedReturn: "0.50% - 1.80%", duration: 90, description: "Automates the writing of Iron Condors and Credit Spreads, generating steady income strictly from the daily decay of option time-value.", strategyType: "Delta-Neutral Income Collection", frequency: "Low-Frequency", minInvestment: 3000, maxInvestment: 100000, riskLevel: "LOW_RISK", pairs: ["RUT Options", "SPY Options", "+5 MORE"], activeUsers: 415, totalEarned: 380000, rating: 5
  },

  // --- MIXED ---
  {
    id: 5, name: "Global Macro Beast", category: "MIXED", successRate: 90, totalTrades: 1250, totalProfit: 450000, expectedReturn: "0.70% - 2.80%", duration: 365, description: "Comprehensive macro trading bot that implements global macro strategies across currencies, bonds, commodities, and equities.", strategyType: "Global Macro", frequency: "Low-Frequency (Position)", minInvestment: 10000, maxInvestment: 500000, riskLevel: "LOW_RISK", pairs: ["USD_INDEX", "EUR/USD", "GOLD", "10Y_BOND", "+20 MORE"], activeUsers: 41, totalEarned: 215000, rating: 5
  },
  {
    id: 14, name: "Macro Event Driven", category: "MIXED", successRate: 88, totalTrades: 890, totalProfit: 125000, expectedReturn: "3.00% - 9.00%", duration: 14, description: "Uses natural language processing (NLP) to read central bank minutes and non-farm payroll reports in milliseconds, executing trades before human reaction.", strategyType: "News & Data Arbitrage", frequency: "Event-Driven", minInvestment: 2500, maxInvestment: 50000, riskLevel: "HIGH_RISK", pairs: ["US30", "EUR/USD", "BTC/USDT", "+15 MORE"], activeUsers: 75, totalEarned: 95000, rating: 4
  },
  {
    id: 18, name: "Multi-Asset Hedger", category: "MIXED", successRate: 98, totalTrades: 450, totalProfit: 89000, expectedReturn: "0.10% - 0.80%", duration: 365, description: "The ultimate capital preservation node. Simultaneously longs equities while shorting highly correlated risk assets to ensure zero market-direction exposure.", strategyType: "Delta-Neutral Statistical Arbitrage", frequency: "Low-Frequency", minInvestment: 25000, maxInvestment: 5000000, riskLevel: "LOW_RISK", pairs: ["SPY / VXX", "BTC / GOLD", "+50 MORE"], activeUsers: 12, totalEarned: 1450000, rating: 5
  }
];

// --- HELPER FUNCTION FOR URL MATCHING ---
const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

export default function BotDeploymentPage() {
  const params = useParams();
  const router = useRouter();
  
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Find the specific bot dynamically based on the slug
  const botSlug = params.botName as string;
  const bot = BOT_DATA.find(b => generateSlug(b.name) === botSlug);

  // Form State
  const [amount, setAmount] = useState<number | "">(bot?.minInvestment || "");
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [reinvestPercent, setReinvestPercent] = useState<number>(50);
  const [isDeploying, setIsDeploying] = useState(false);

  // Derived Liquidity Metrics
  const currentDeposit = Number(profile?.totalDeposit || 0);
  const currentProfit = Number(profile?.profit || 0);
  const availableLiquidity = currentDeposit + currentProfit;

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

  // --- CORE EXECUTION PROTOCOL ---
  const handleDeployment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bot) return;

    const deployAmount = Number(amount);
    
    // Validations
    if (!deployAmount || deployAmount < bot.minInvestment || deployAmount > bot.maxInvestment) {
        toast.error(`SYS_ERR: Allocation must be between $${bot.minInvestment.toLocaleString()} and $${bot.maxInvestment.toLocaleString()}`);
        return;
    }
    if (deployAmount > availableLiquidity) {
        toast.error("INSUFFICIENT_LIQUIDITY: Gross equity cannot support this deployment.");
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

        // 1. CAPITAL SIPHONING PROTOCOL
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

        // 3. LOG ACTIVE BOT DEPLOYMENT
        const newBotRef = doc(collection(db, "active_bots"));
        batch.set(newBotRef, {
            userId,
            botId: bot.id,
            botName: bot.name,
            amountDeployed: deployAmount,
            status: "running",
            autoReinvest: autoReinvest,
            reinvestPercent: autoReinvest ? reinvestPercent : 0,
            startedAt: serverTimestamp(),
        });

        // 4. LOG TRANSACTION FOR MASTER LEDGER
        const newTxRef = doc(collection(db, "transactions"));
        batch.set(newTxRef, {
            userId,
            amount: deployAmount,
            type: "bot_deployment",
            category: "bot_trade", // Explicit categorization for transaction filtering
            status: "approved",
            createdAt: serverTimestamp(),
            metadata: {
                botName: bot.name,
                strategy: bot.strategyType,
                expectedYield: bot.expectedReturn
            }
        });

        // 5. SEND NOTIFICATION
        const notifRef = doc(collection(db, "notifications"));
        batch.set(notifRef, {
            userId,
            title: "Node Deployed",
            message: `Successfully allocated $${deployAmount.toLocaleString()} to ${bot.name}.`,
            type: "success",
            read: false,
            createdAt: serverTimestamp()
        });

        await batch.commit();

        toast.success(`PROTOCOL_EXECUTED: ${bot.name} is now actively trading.`);
        router.push("/transactions"); // Redirect to active deployments

    } catch (error) {
        console.error("Deployment Error:", error);
        toast.error("SYS_ERR: Failed to initialize deployment node.");
    } finally {
        setIsDeploying(false);
    }
  };

  // Safe Fallback for Invalid Slugs
  if (!bot) {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] flex items-center justify-center animate-in fade-in">
              <div className="p-10 border border-rose-500/20 bg-rose-500/5 flex flex-col items-center gap-4 text-rose-500">
                  <ShieldAlert size={32} />
                  <p className="font-mono uppercase tracking-widest text-xs font-bold text-center">ERR_NODE_NOT_FOUND<br/>INVALID_URL_SLUG</p>
                  <Link href="/bot-trading" className="mt-4 px-6 py-2 border border-rose-500 hover:bg-rose-500/10 text-[10px] uppercase font-bold transition-colors">Return to Hub</Link>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER PROTOCOL --- */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">
            EXPERT_PROFILE_NODE
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
            <Link 
                href="/bot-trading" 
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-500 transition-colors mb-6"
            >
                <ArrowLeft size={14} /> Return_To_Hub
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-5 items-start">
                    {/* Institutional Avatar Box */}
                    <div className="w-16 h-16 shrink-0 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-center p-1">
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl font-black text-slate-500">
                            {bot.name.charAt(0)}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                {bot.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-brand-500/10 border border-brand-500/20 text-brand-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                                {bot.category}_SPECIALIST
                            </span>
                            <span className="flex items-center gap-1 text-amber-500">
                                {[...Array(bot.rating)].map((_, i) => (
                                    <Star key={i} size={12} className="fill-current" />
                                ))}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                                <Users size={12} /> {bot.activeUsers.toLocaleString()} Deployments
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 shrink-0 h-fit">
                    <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                        Network_Active
                    </span>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: INTELLIGENCE --- */}
        <div className="xl:col-span-8 space-y-8">
            
            {/* Performance Node */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">PERFORMANCE_METRICS</div>
                <div className="p-6 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                        <BarChart2 size={16} className="text-brand-500" /> Performance Telemetry
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <DataNode label="Success_Rate" value={`${bot.successRate}%`} highlight />
                    <DataNode label="Total_Executions" value={bot.totalTrades.toLocaleString()} />
                    <DataNode label="Total_Profit" value={`$${bot.totalProfit.toLocaleString()}`} highlightColor="text-emerald-500" />
                    <DataNode label="Expected_Return" value={bot.expectedReturn} />
                </div>
            </div>

            {/* Strategy Node */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">STRATEGY_CONFIG</div>
                <div className="p-6 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                        <Target size={16} className="text-brand-500" /> Algorithm Parameters
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StrategyRow icon={<Briefcase size={14}/>} label="Strategy_Type" value={bot.strategyType} />
                    <StrategyRow icon={<Clock size={14}/>} label="Trade_Frequency" value={bot.frequency} />
                    
                    <div className="sm:col-span-2 p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-start gap-3 mt-2">
                        <Info size={16} className="text-brand-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">Architecture_Summary</p>
                            <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 uppercase leading-relaxed">{bot.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: EXECUTION --- */}
        <div className="xl:col-span-4 space-y-6">
            
            {/* Execution Form */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative">
                <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">MIRROR_CONFIG</div>
                
                <div className="p-6 border-b border-slate-100 dark:border-white/5">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                        <Terminal size={16} className="text-brand-500" /> Capital Allocation
                    </h3>
                </div>

                <div className="p-6 space-y-4 mb-2">
                    <ParamRow label="Available_Liquidity" value={`$${availableLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} highlight />
                    <ParamRow label="Min_Capital" value={`$${bot.minInvestment.toLocaleString()}`} />
                    <ParamRow label="Max_Capacity" value={`$${bot.maxInvestment.toLocaleString()}`} />
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Risk_Profile</span>
                        <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20">
                            {bot.riskLevel}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleDeployment} className="p-6 border-t border-slate-100 dark:border-white/5 space-y-6 bg-slate-50 dark:bg-white/[0.01]">
                    
                    {/* Capital Input */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Allocated_Funds_USD</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">$</span>
                            <input 
                                type="number" 
                                min={bot.minInvestment}
                                max={bot.maxInvestment}
                                step="0.01"
                                required
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                onWheel={(e: any) => e.target.blur()} // Scroll prevention fix
                                className="w-full bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 pl-8 pr-4 py-4 text-xl font-black text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest px-1">
                            <span>MIN: ${bot.minInvestment.toLocaleString()}</span>
                            <span>MAX: ${bot.maxInvestment.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Auto-Reinvest Toggle */}
                    <div className="p-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    checked={autoReinvest}
                                    onChange={(e) => setAutoReinvest(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 border transition-colors ${autoReinvest ? 'bg-brand-500 border-brand-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-brand-500'}`}>
                                    {autoReinvest && <CheckSquare size={14} className="text-white absolute top-[1px] left-[1px]" />}
                                </div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">Auto-Compound Profits</span>
                        </label>

                        {/* Reinvest Percentage (Conditional Render) */}
                        {autoReinvest && (
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 space-y-2 animate-in slide-in-from-top-2">
                                <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Compound_Ratio_%</label>
                                <div className="relative group">
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">%</span>
                                    <input 
                                        type="number" 
                                        min="0" max="100"
                                        value={reinvestPercent}
                                        onChange={(e) => setReinvestPercent(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-black font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit"
                        disabled={isDeploying}
                        className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50 shadow-lg shadow-brand-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        {isDeploying ? "SYNCING_NODE..." : "START_COPYING"}
                    </button>
                </form>
            </div>

            {/* Risk Protocol Alert */}
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-4">
                    <ShieldAlert size={14} /> Risk_Protocol_Notice
                </h3>
                <RiskBullet text="Copy trading carries inherent capital risk." />
                <RiskBullet text="Past performance does not guarantee future yields." />
                <RiskBullet text="Deployments are automated but not guaranteed to profit." />
            </div>
            
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function DataNode({ label, value, highlight = false, highlightColor = 'text-brand-500' }: any) {
    return (
        <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-center">
            <p className={`text-xl font-black uppercase tracking-tighter ${highlight ? highlightColor : 'text-slate-900 dark:text-white'}`}>
                {value}
            </p>
            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
        </div>
    );
}

function StrategyRow({ icon, label, value }: any) {
    return (
        <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-500">
                {icon} <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-900 dark:text-white">{value}</p>
        </div>
    );
}

function ParamRow({ label, value, highlight = false }: any) {
    return (
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            <span className={`text-[11px] font-black uppercase tracking-wide ${highlight ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{value}</span>
        </div>
    );
}

function RiskBullet({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-2">
            <div className="w-1 h-1 bg-amber-500 shrink-0 mt-1.5" />
            <p className="text-[9px] font-mono text-amber-700/80 dark:text-amber-500/80 uppercase leading-relaxed">{text}</p>
        </div>
    );
}