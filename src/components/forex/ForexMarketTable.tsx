"use client";

import { useState } from 'react';
import { Search, Globe, Flame, Navigation, Terminal } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Major', desc: 'EUR/USD, GBP/USD, USD/JPY...', icon: Globe },
  { name: 'Minor', desc: 'EUR/GBP, EUR/CHF, GBP/JPY...', icon: Navigation },
  { name: 'Exotic', desc: 'USD/TRY, USD/ZAR, EUR/HUF...', icon: Flame },
  { name: 'Australasian', desc: 'AUD/USD, NZD/USD...', icon: Globe },
  { name: 'Scandinavian', desc: 'EUR/NOK, EUR/SEK...', icon: Navigation },
];

const allPairs = [
  { symbol: "AUD/CAD", category: "Australasian" }, { symbol: "AUD/CHF", category: "Australasian" },
  { symbol: "AUD/JPY", category: "Minor" }, { symbol: "AUD/NZD", category: "Australasian" },
  { symbol: "AUD/SGD", category: "Australasian" }, { symbol: "AUD/USD", category: "Major" },
  { symbol: "CAD/CHF", category: "Minor" }, { symbol: "CAD/JPY", category: "Minor" },
  { symbol: "CHF/JPY", category: "Minor" }, { symbol: "CHF/NOK", category: "Minor" },
  { symbol: "EUR/AUD", category: "Minor" }, { symbol: "EUR/CAD", category: "Minor" },
  { symbol: "EUR/CHF", category: "Minor" }, { symbol: "EUR/GBP", category: "Minor" },
  { symbol: "EUR/HUF", category: "Exotic" }, { symbol: "EUR/JPY", category: "Minor" },
  { symbol: "EUR/MXN", category: "Exotic" }, { symbol: "EUR/NOK", category: "Scandinavian" },
  { symbol: "EUR/SEK", category: "Scandinavian" }, { symbol: "EUR/TRY", category: "Exotic" },
  { symbol: "EUR/USD", category: "Major" }, { symbol: "EUR/ZAR", category: "Exotic" },
  { symbol: "GBP/AUD", category: "Minor" }, { symbol: "GBP/CAD", category: "Minor" },
  { symbol: "GBP/CHF", category: "Minor" }, { symbol: "GBP/JPY", category: "Minor" },
  { symbol: "GBP/USD", category: "Major" }, { symbol: "NZD/USD", category: "Major" },
  { symbol: "USD/CAD", category: "Major" }, { symbol: "USD/CHF", category: "Major" },
  { symbol: "USD/JPY", category: "Major" }, { symbol: "USD/MXN", category: "Exotic" },
  { symbol: "USD/TRY", category: "Exotic" }, { symbol: "USD/ZAR", category: "Exotic" }
];

export default function ForexMarketTable() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPairs = allPairs.filter(pair => {
    const matchesCategory = activeCategory === 'All' || pair.category === activeCategory;
    const matchesSearch = pair.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="forex-markets" className="py-24 bg-[#05070a] relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Terminal className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Instrument Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Order Book.</span>
            </h2>
          </div>
          
          {/* Command Line Search */}
          <div className="mt-8 md:mt-0 w-full md:w-80 relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-brand-500 focus:bg-brand-500/5 transition-all uppercase placeholder:text-gray-600" 
              placeholder="QUERY_SYMBOL..." 
              spellCheck="false"
            />
            {/* Sci-fi Corner Cut */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-500/50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Category Nodes (3 Cols) */}
          <div className="xl:col-span-3 space-y-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`w-full flex items-center justify-between p-4 border-l-2 transition-all ${
                activeCategory === 'All' 
                ? 'border-brand-500 bg-gradient-to-r from-brand-500/10 to-transparent' 
                : 'border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <span className={`font-bold tracking-widest uppercase text-xs ${activeCategory === 'All' ? 'text-brand-400' : 'text-gray-400'}`}>
                All Markets
              </span>
              <span className="text-[10px] font-mono text-gray-600">{allPairs.length}</span>
            </button>

            {categories.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full flex flex-col items-start p-4 border-l-2 transition-all group ${
                  activeCategory === cat.name 
                  ? 'border-brand-500 bg-gradient-to-r from-brand-500/10 to-transparent' 
                  : 'border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <cat.icon className={`w-4 h-4 ${activeCategory === cat.name ? 'text-brand-400' : 'text-gray-500 group-hover:text-gray-400'}`} />
                  <span className={`font-bold tracking-widest uppercase text-xs ${activeCategory === cat.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                  {cat.desc}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Data Ledger (9 Cols) */}
          <div className="xl:col-span-9">
            <div className="bg-gray-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Symbol</th>
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Class</th>
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Leverage</th>
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Lot Size</th>
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Commission</th>
                      <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Execute</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPairs.map((pair) => (
                      <tr key={pair.symbol} className="group hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                              <span className="text-[10px] font-mono font-bold text-white">
                                {pair.symbol.split('/')[0]}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-lg text-white tracking-tight group-hover:text-brand-400 transition-colors">
                              {pair.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                          {pair.category}
                        </td>
                        <td className="px-6 py-4 font-mono text-white text-sm">
                          1:500
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                          100k <span className="text-[10px] text-gray-600 uppercase">{pair.symbol.split('/')[0]}</span>
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                          $2.5 <span className="text-[10px] text-gray-600 uppercase">/ 100k</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            href="/login" 
                            className="inline-flex px-4 py-2 bg-brand-500/10 border border-brand-500/30 text-brand-400 hover:bg-brand-500 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-all"
                          >
                            Login
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {filteredPairs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-16 text-center">
                          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">ERR: 404 // No Market Data Found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}