"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bot, Activity, TrendingUp, Users, ArrowRight, 
  Terminal, ShieldCheck, Cpu 
} from "lucide-react";

// --- EXPANDED DATA PAYLOAD ---
const BOT_DATA = [
  // --- FOREX ---
  {
    id: 1,
    name: "Forex Precision Elite",
    category: "FOREX",
    successRate: 93,
    description: "Premium forex trading bot utilizing advanced neural networks and sentiment analysis. Designed for institutional-grade precision.",
    dailyProfit: "1.50% - 4.10%",
    duration: 90,
    range: "$750 - $50,000",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "+2 MORE"],
    activeUsers: 142,
    totalEarned: 45020,
  },
  {
    id: 7,
    name: "FX Carry Trade Pro",
    category: "FOREX",
    successRate: 88,
    description: "Exploits interest rate differentials between high-yield and low-yield fiat currencies. Optimal for stable, long-term macroeconomic environments.",
    dailyProfit: "0.80% - 2.20%",
    duration: 180,
    range: "$1,000 - $100,000",
    pairs: ["AUD/JPY", "NZD/JPY", "USD/CHF", "+4 MORE"],
    activeUsers: 312,
    totalEarned: 89400,
  },
  {
    id: 16,
    name: "Asian Session Scalper",
    category: "FOREX",
    successRate: 94,
    description: "High-frequency scalping node optimized for the low-volatility Asian trading session (Tokyo/Sydney overlap).",
    dailyProfit: "1.10% - 3.50%",
    duration: 30,
    range: "$500 - $25,000",
    pairs: ["AUD/USD", "NZD/USD", "EUR/AUD", "+3 MORE"],
    activeUsers: 420,
    totalEarned: 56000,
  },

  // --- CRYPTO ---
  {
    id: 2,
    name: "AlgoTrader Supreme",
    category: "CRYPTO",
    successRate: 91,
    description: "Next-generation algorithmic trading bot powered by quantum computing principles. Specializes in high-frequency crypto arbitrage.",
    dailyProfit: "2.10% - 6.80%",
    duration: 45,
    range: "$500 - $100,000",
    pairs: ["BTC/USDT", "ETH/USDT", "BNB/USDT", "ADA/USDT", "+4 MORE"],
    activeUsers: 89,
    totalEarned: 112400,
  },
  {
    id: 8,
    name: "DeFi Yield Sniper",
    category: "CRYPTO",
    successRate: 86,
    description: "Scans decentralized exchanges (DEXs) across multiple blockchains to identify and exploit flash-loan arbitrage and liquidity pool imbalances.",
    dailyProfit: "3.50% - 8.00%",
    duration: 14,
    range: "$1,500 - $20,000",
    pairs: ["UNI/USDT", "LINK/USDT", "AAVE/USDT", "+12 MORE"],
    activeUsers: 56,
    totalEarned: 34900,
  },
  {
    id: 13,
    name: "Altcoin Momentum Scanner",
    category: "CRYPTO",
    successRate: 82,
    description: "Monitors social sentiment and on-chain volume spikes to catch early momentum breakouts in mid-cap cryptocurrencies.",
    dailyProfit: "4.00% - 12.00%",
    duration: 7,
    range: "$250 - $10,000",
    pairs: ["SOL/USDT", "AVAX/USDT", "MATIC/USDT", "+25 MORE"],
    activeUsers: 890,
    totalEarned: 210500,
  },
  {
    id: 20,
    name: "Bitcoin Whale Tracker",
    category: "CRYPTO",
    successRate: 95,
    description: "Analyzes massive on-chain wallet movements to front-run institutional block trades. Extremely high accuracy, low trade frequency.",
    dailyProfit: "1.00% - 5.00%",
    duration: 60,
    range: "$5,000 - $250,000",
    pairs: ["BTC/USDT", "BTC/USDC"],
    activeUsers: 24,
    totalEarned: 840000,
  },

  // --- STOCKS ---
  {
    id: 3,
    name: "Stock Momentum Master",
    category: "STOCKS",
    successRate: 89,
    description: "Advanced momentum trading bot that identifies breakout patterns and trending stocks. Focuses on high-volume equities.",
    dailyProfit: "1.20% - 3.80%",
    duration: 120,
    range: "$1,500 - $80,000",
    pairs: ["AAPL", "TSLA", "NVDA", "AMD", "+12 MORE"],
    activeUsers: 215,
    totalEarned: 89000,
  },
  {
    id: 9,
    name: "Blue Chip Dividend Harvester",
    category: "STOCKS",
    successRate: 96,
    description: "Low-risk protocol that rotates capital through Fortune 500 companies specifically timing ex-dividend dates to harvest maximum yield.",
    dailyProfit: "0.30% - 1.10%",
    duration: 365,
    range: "$5,000 - $500,000",
    pairs: ["KO", "JNJ", "PG", "JPM", "+30 MORE"],
    activeUsers: 1042,
    totalEarned: 1250000,
  },
  {
    id: 12,
    name: "Tech Sector Breakout",
    category: "STOCKS",
    successRate: 84,
    description: "Aggressive equity node targeting volatile tech earnings reports and product launch cycles. Uses options flow data to predict moves.",
    dailyProfit: "2.50% - 6.00%",
    duration: 30,
    range: "$1,000 - $50,000",
    pairs: ["META", "MSFT", "GOOGL", "AMZN", "+5 MORE"],
    activeUsers: 334,
    totalEarned: 145000,
  },
  {
    id: 19,
    name: "Dark Pool Liquidity Scanner",
    category: "STOCKS",
    successRate: 91,
    description: "Monitors off-exchange (dark pool) trading volumes to identify hidden institutional buying pressure before it hits public lit markets.",
    dailyProfit: "1.80% - 4.50%",
    duration: 90,
    range: "$10,000 - $1,000,000",
    pairs: ["SPY", "QQQ", "IWM", "+100 MORE"],
    activeUsers: 18,
    totalEarned: 3200000,
  },

  // --- COMMODITIES ---
  {
    id: 4,
    name: "Commodity Weather AI",
    category: "COMMODITIES",
    successRate: 87,
    description: "Intelligent commodity trading bot incorporating weather data, supply chain analysis, and seasonal patterns for agriculture.",
    dailyProfit: "1.30% - 4.50%",
    duration: 180,
    range: "$800 - $40,000",
    pairs: ["WHEAT", "CORN", "SOYBEANS", "COFFEE", "+5 MORE"],
    activeUsers: 64,
    totalEarned: 34500,
  },
  {
    id: 11,
    name: "Precious Metals Vault",
    category: "COMMODITIES",
    successRate: 92,
    description: "Hedges against fiat inflation by algorithmically trading the Gold/Silver ratio and tracking central bank reserve purchases.",
    dailyProfit: "0.50% - 1.50%",
    duration: 365,
    range: "$2,000 - $200,000",
    pairs: ["XAU/USD", "XAG/USD", "PLATINUM", "PALLADIUM"],
    activeUsers: 512,
    totalEarned: 410000,
  },
  {
    id: 17,
    name: "Energy Grid Algorithm",
    category: "COMMODITIES",
    successRate: 85,
    description: "Trades crude oil and natural gas futures by analyzing OPEC+ supply quotas, geopolitical unrest, and global shipping bottleneck data.",
    dailyProfit: "2.00% - 5.50%",
    duration: 60,
    range: "$1,500 - $75,000",
    pairs: ["BRENT", "WTI", "NATGAS", "+2 MORE"],
    activeUsers: 128,
    totalEarned: 189000,
  },

  // --- OPTIONS ---
  {
    id: 6,
    name: "Options Gamma Scalper",
    category: "OPTIONS",
    successRate: 85,
    description: "Sophisticated options trading bot specializing in gamma scalping strategies. Exploits volatility changes and time decay.",
    dailyProfit: "2.50% - 7.20%",
    duration: 30,
    range: "$2,000 - $60,000",
    pairs: ["SPY", "QQQ", "IWM", "AAPL", "+8 MORE"],
    activeUsers: 112,
    totalEarned: 67800,
  },
  {
    id: 10,
    name: "Volatility Crusher",
    category: "OPTIONS",
    successRate: 90,
    description: "Sells out-of-the-money options premium during periods of extreme VIX spikes, profiting systematically as market fear subsides.",
    dailyProfit: "1.00% - 3.50%",
    duration: 45,
    range: "$5,000 - $150,000",
    pairs: ["VIX", "SPX Options", "NDX Options"],
    activeUsers: 88,
    totalEarned: 245000,
  },
  {
    id: 15,
    name: "Theta Decay Harvester",
    category: "OPTIONS",
    successRate: 94,
    description: "Automates the writing of Iron Condors and Credit Spreads, generating steady income strictly from the daily decay of option time-value.",
    dailyProfit: "0.50% - 1.80%",
    duration: 90,
    range: "$3,000 - $100,000",
    pairs: ["RUT Options", "SPY Options", "+5 MORE"],
    activeUsers: 415,
    totalEarned: 380000,
  },

  // --- MIXED ---
  {
    id: 5,
    name: "Global Macro Beast",
    category: "MIXED",
    successRate: 90,
    description: "Comprehensive macro trading bot that implements global macro strategies across currencies, bonds, commodities, and equities.",
    dailyProfit: "0.70% - 2.80%",
    duration: 365,
    range: "$10,000 - $500,000",
    pairs: ["USD_INDEX", "EUR/USD", "GOLD", "10Y_BOND", "+20 MORE"],
    activeUsers: 41,
    totalEarned: 215000,
  },
  {
    id: 14,
    name: "Macro Event Driven",
    category: "MIXED",
    successRate: 88,
    description: "Uses natural language processing (NLP) to read central bank minutes and non-farm payroll reports in milliseconds, executing trades before human reaction.",
    dailyProfit: "3.00% - 9.00%",
    duration: 14,
    range: "$2,500 - $50,000",
    pairs: ["US30", "EUR/USD", "BTC/USDT", "+15 MORE"],
    activeUsers: 75,
    totalEarned: 95000,
  },
  {
    id: 18,
    name: "Multi-Asset Hedger",
    category: "MIXED",
    successRate: 98,
    description: "The ultimate capital preservation node. Simultaneously longs equities while shorting highly correlated risk assets to ensure zero market-direction exposure.",
    dailyProfit: "0.10% - 0.80%",
    duration: 365,
    range: "$25,000 - $5,000,000",
    pairs: ["SPY / VXX", "BTC / GOLD", "+50 MORE"],
    activeUsers: 12,
    totalEarned: 1450000,
  }
];

const FILTERS = ["ALL", "FOREX", "CRYPTO", "STOCKS", "COMMODITIES", "OPTIONS", "MIXED"];

export default function AIBotHub() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredBots = BOT_DATA.filter(bot => 
    activeFilter === "ALL" || bot.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090C10] pb-20">
      
      {/* 1. HERO TERMINAL */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 relative overflow-hidden">
        {/* Abstract Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 mb-6">
                <div className="w-1.5 h-1.5 bg-brand-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-brand-500 uppercase tracking-widest">Automated_Execution_Node</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none mb-4">
                Algorithmic <br /> <span className="text-brand-500">Trading Hub</span>
              </h1>
              
              <p className="text-sm font-mono text-slate-600 dark:text-slate-400 uppercase leading-relaxed max-w-lg">
                Deploy autonomous, AI-driven trading protocols operating 24/7 across high-liquidity global markets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link 
                href="/dashboard"
                className="px-6 py-3 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-center"
              >
                Return_To_Command
              </Link>
              <Link 
                href="/bot-trading/deployment"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-500/20"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              >
                <Activity size={14} /> Active_Deployments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12 bg-transparent">
        
        {/* Navigation / Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu size={18} className="text-brand-500" /> Available Protocols
            </h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">Select a trading node to initialize deployment.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all
                  ${activeFilter === f 
                    ? "bg-brand-600 border-brand-500 text-white" 
                    : "bg-white dark:bg-[#0D1117] border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBots.map((bot) => (
            <div 
              key={bot.id}
              className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 relative group flex flex-col hover:border-brand-500/50 transition-colors animate-in fade-in zoom-in-95 duration-300"
            >
              {/* Decorative Tag */}
              <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
                {bot.category}_NODE
              </div>

              {/* Card Header */}
              <div className="p-6 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 border border-brand-500/20 bg-brand-500/5 text-brand-500 shrink-0">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight">
                        {bot.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[9px] font-mono font-bold text-brand-500 uppercase tracking-widest">{bot.category}</span>
                         <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                         <span className="text-[9px] font-mono text-emerald-500 uppercase flex items-center gap-1">
                           <ShieldCheck size={10} /> {bot.successRate}% WIN_RATE
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 h-[50px]">
                  {bot.description}
                </p>
              </div>

              {/* Card Stats */}
              <div className="p-6 grid grid-cols-2 gap-4 flex-1">
                <StatBlock label="Daily_Yield" value={bot.dailyProfit} />
                <StatBlock label="Cycle_Duration" value={`${bot.duration} DAYS`} />
                <div className="col-span-2 space-y-1 mt-2">
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Target_Markets</p>
                    <div className="flex flex-wrap gap-1.5">
                        {bot.pairs.map((pair, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-600 dark:text-slate-300 uppercase">
                                {pair}
                            </span>
                        ))}
                    </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase mb-4 px-2">
                   <span className="flex items-center gap-1.5"><Users size={12} className="text-slate-400" /> {bot.activeUsers} Deployments</span>
                   <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-emerald-500" /> ${bot.totalEarned.toLocaleString()} Generated</span>
                </div>

                <Link 
                  href={`/bot-trading/${bot.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-200 dark:bg-white/5 hover:bg-brand-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                >
                  Initialize_Deployment <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// --- MICRO COMPONENTS ---
function StatBlock({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{value}</p>
        </div>
    );
}