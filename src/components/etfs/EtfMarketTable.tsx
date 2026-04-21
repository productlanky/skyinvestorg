"use client";

import { useState } from 'react';
import { Search, Terminal, Activity, Layers } from 'lucide-react';
import Link from 'next/link';

const etfData = [
  { symbol: 'SPY', name: 'SPDR S&P 500', category: 'Broad Market', price: '512.30', change: '+0.85%', isUp: true, exp: '0.09%' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', category: 'Technology', price: '438.15', change: '+1.12%', isUp: true, exp: '0.20%' },
  { symbol: 'VTI', name: 'Vanguard Total Stock', category: 'Broad Market', price: '254.80', change: '+0.75%', isUp: true, exp: '0.03%' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF', category: 'Thematic Tech', price: '48.90', change: '-1.40%', isUp: false, exp: '0.75%' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', category: 'Commodities', price: '202.40', change: '-0.45%', isUp: false, exp: '0.40%' },
  { symbol: 'USO', name: 'United States Oil Fund', category: 'Commodities', price: '76.15', change: '+2.10%', isUp: true, exp: '0.60%' },
  { symbol: 'XLF', name: 'Financial Select Sector', category: 'Financials', price: '41.20', change: '+0.30%', isUp: true, exp: '0.10%' },
  { symbol: 'XLV', name: 'Health Care Select', category: 'Healthcare', price: '142.50', change: '-0.20%', isUp: false, exp: '0.10%' },
];

export default function EtfMarketTable() {
  const [search, setSearch] = useState('');

  const filteredETFs = etfData.filter(etf => 
    etf.symbol.toLowerCase().includes(search.toLowerCase()) || 
    etf.category.toLowerCase().includes(search.toLowerCase()) ||
    etf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden border-y border-white/5">
      
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Terminal className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Asset_Class_Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Exchange Traded <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Funds.</span>
            </h2>
          </div>
          
          {/* Command Line Search */}
          <div className="mt-8 md:mt-0 w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-brand-500 focus:bg-brand-500/5 transition-all uppercase placeholder:text-gray-600" 
              placeholder="QUERY_TICKER_OR_THEME..." 
              spellCheck="false"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-500/50"></div>
          </div>
        </div>

        {/* Data Ledger */}
        <div className="bg-[#0D1117]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
          
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
             <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-brand-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Live_Data_Feed_Active</span>
             </div>
             <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Results: {filteredETFs.length}</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0D1117] sticky top-0 z-10">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Fund Symbol</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Fund Target</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Market Price</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">24H Delta</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Exp. Ratio</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Terminal Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredETFs.map((etf) => (
                  <tr key={etf.symbol} className="group hover:bg-white/[0.03] transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-500/30 transition-colors">
                          <Layers className="w-4 h-4 text-brand-400" />
                        </div>
                        <span className="font-mono font-bold text-lg text-white tracking-tight group-hover:text-brand-400 transition-colors">
                          {etf.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-200 tracking-wide">{etf.name}</p>
                      <p className="text-[10px] font-mono text-gray-500 uppercase">{etf.category}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-white text-sm font-bold">
                      ${etf.price}
                    </td>
                    <td className={`px-6 py-4 font-mono text-sm font-bold ${etf.isUp ? 'text-success-400' : 'text-error-400'}`}>
                      {etf.change}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                      {etf.exp}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href="/login" 
                        className="inline-flex px-6 py-2 bg-brand-500/10 border border-brand-500/30 text-brand-400 hover:bg-brand-500 hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Execute
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {filteredETFs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center bg-white/[0.01]">
                      <p className="text-brand-500/50 font-mono text-sm uppercase tracking-widest animate-pulse">
                        ERR: 404 // FUND_NOT_FOUND IN DATABANK
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}