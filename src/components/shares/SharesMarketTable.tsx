"use client";

import { useState } from 'react';
import { Search, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

// Mock Data for Shares (Extended slightly for better visual density)
const sharesData = [
  { symbol: 'AAPL', company: 'Apple Inc.', price: '173.50', change: '+1.25%', isUp: true, volume: '52.4M', sector: 'Technology' },
  { symbol: 'TSLA', company: 'Tesla, Inc.', price: '175.34', change: '-2.10%', isUp: false, volume: '89.1M', sector: 'Automotive' },
  { symbol: 'MSFT', company: 'Microsoft Corp.', price: '416.42', change: '+0.85%', isUp: true, volume: '22.3M', sector: 'Technology' },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', price: '178.15', change: '+1.05%', isUp: true, volume: '35.6M', sector: 'Consumer' },
  { symbol: 'NVDA', company: 'NVIDIA Corp.', price: '880.08', change: '+3.40%', isUp: true, volume: '45.8M', sector: 'Semiconductors' },
  { symbol: 'META', company: 'Meta Platforms', price: '510.92', change: '-0.50%', isUp: false, volume: '15.2M', sector: 'Communications' },
  { symbol: 'GOOGL', company: 'Alphabet Inc.', price: '154.20', change: '+0.30%', isUp: true, volume: '28.9M', sector: 'Communications' },
  { symbol: 'NFLX', company: 'Netflix, Inc.', price: '612.45', change: '-1.15%', isUp: false, volume: '8.4M', sector: 'Entertainment' },
];

export default function SharesMarketTable() {
  const [search, setSearch] = useState('');

  const filteredShares = sharesData.filter(share => 
    share.symbol.toLowerCase().includes(search.toLowerCase()) || 
    share.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      
      {/* Background Texture & Ambient Depth */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-emerald-400">Asset_Class_Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 italic">Equities Ledger.</span>
            </h2>
          </div>
          
          {/* Command Line Search (Replacing Standard Input) */}
          <div className="mt-8 md:mt-0 w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-emerald-500 font-mono font-bold animate-pulse">{'>'}</span>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-emerald-500 focus:bg-emerald-500/5 transition-all uppercase placeholder:text-gray-600" 
              placeholder="QUERY_TICKER_OR_COMPANY..." 
              spellCheck="false"
            />
            {/* Sci-fi Corner Cut */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-500/50"></div>
          </div>
        </div>

        {/* Data Ledger (Replacing Card Table) */}
        <div className="bg-[#0D1117]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          {/* Top Scan Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
             <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Live_Data_Feed_Active</span>
             </div>
             <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Results: {filteredShares.length}</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0D1117] sticky top-0 z-10">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Ticker</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Corporate Entity</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Market Price (USD)</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">24H Delta</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Volume</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Terminal Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredShares.map((share) => (
                  <tr key={share.symbol} className="group hover:bg-white/[0.03] transition-colors duration-200">
                    
                    {/* Symbol Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                          <span className="text-[10px] font-mono font-bold text-white">
                            {share.symbol[0]}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                          {share.symbol}
                        </span>
                      </div>
                    </td>
                    
                    {/* Company Column */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-200 tracking-wide">{share.company}</p>
                      <p className="text-[10px] font-mono text-gray-500 uppercase">{share.sector}</p>
                    </td>
                    
                    {/* Price Column */}
                    <td className="px-6 py-4 font-mono text-white text-sm font-bold">
                      ${share.price}
                    </td>
                    
                    {/* Change Column */}
                    <td className={`px-6 py-4 font-mono text-sm font-bold ${share.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {share.change}
                    </td>
                    
                    {/* Volume Column */}
                    <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                      {share.volume}
                    </td>
                    
                    {/* Action Column */}
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href="/login" 
                        className="inline-flex px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                       Login
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {/* 404 State */}
                {filteredShares.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center bg-white/[0.01]">
                      <p className="text-emerald-500/50 font-mono text-sm uppercase tracking-widest animate-pulse">
                        ERR: 404 // TICKER_NOT_FOUND IN DATABANK
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