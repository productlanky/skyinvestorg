"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  CandlestickChart, Bitcoin, Building2, Banknote, 
  Landmark, CircleDollarSign, ArrowUpRight, Search, Loader2 
} from "lucide-react";

interface AssetOption { value: string; name: string; logo: string; }
interface AssetGroup { label: string; options: AssetOption[]; }

export default function TradeArenaPage() {
  const router = useRouter();
  const [assetGroups, setAssetGroups] = useState<AssetGroup[]>([]);
  const [activeCategory, setActiveCategory] = useState("Crypto");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(data => {
      setAssetGroups(data);
      setLoading(false);
    });
  }, []);

  const filteredAssets = assetGroups
    .find(g => g.label.includes(activeCategory))
    ?.options.filter(a => a.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5">
        <h1 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3">
          <CandlestickChart className="text-brand-500" /> Market Selection Hub
        </h1>
        <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">Select an instrument to initialize execution protocols.</p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2">
        {["Crypto", "Forex", "Stocks"].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white dark:bg-[#0D1117] border-slate-200 dark:border-white/10 text-slate-500 hover:border-brand-500'}`}
          >
            {cat} Assets
          </button>
        ))}
        {/* Search Bar */}
        <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="SEARCH INSTRUMENT..." 
                className="w-full h-full bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 pl-10 text-[10px] font-mono uppercase outline-none focus:border-brand-500 text-slate-900 dark:text-white" 
            />
        </div>
      </div>

      {/* Asset List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 uppercase font-mono text-xs gap-3">
                <Loader2 className="animate-spin text-brand-500" /> Syncing Global Markets...
            </div>
        ) : filteredAssets.map((asset) => (
          <div 
            key={asset.value}
            onClick={() => router.push(`/trading-market/${asset.value.replace('/', '-')}`)}
            className="group p-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 hover:border-brand-500 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                {asset.logo ? <img src={asset.logo} className="w-6 h-6 object-contain" alt="" /> : <span className="text-xs font-bold text-brand-500">{asset.value.charAt(0)}</span>}
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-widest">{asset.value}</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase">{asset.name}</p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}