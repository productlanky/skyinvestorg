"use client";

import { useState } from 'react';
import { Search, Terminal, Activity, Globe } from 'lucide-react';
import Link from 'next/link';

// Mock Data for Indices (Enhanced with Region tags for visual depth)
const indicesData = [
  { symbol: 'AUSTRALIA 200', region: 'APAC', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'EUROPE 50', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'FRANCE 40', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'GERMANY 30', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'HONG KONG 50', region: 'APAC', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'ITALY 40', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'JAPAN 225', region: 'APAC', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'NETHERLANDS 25', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '1.00', comm: '0.00' },
  { symbol: 'SPAIN 35', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'SWITZERLAND 20', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'UK 100', region: 'EMEA', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'US 30', region: 'AMER', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'US 500', region: 'AMER', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' },
  { symbol: 'US TECH 100', region: 'AMER', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0.00' }
];

export default function IndicesMarketTable() {
  const [search, setSearch] = useState('');

  const filteredIndices = indicesData.filter(idx => 
    idx.symbol.toLowerCase().includes(search.toLowerCase()) ||
    idx.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="indices-table" className="py-24 bg-[#05070a] relative overflow-hidden">
      
      {/* Background Texture & Ambient Depth */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Terminal className="w-5 h-5 text-purple-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-purple-400">Asset_Class_Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Global Benchmark <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 italic">Ledger.</span>
            </h2>
          </div>
          
          {/* Command Line Search (Replacing Standard Input) */}
          <div className="mt-8 md:mt-0 w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-purple-500 font-mono font-bold animate-pulse">{'>'}</span>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 transition-all uppercase placeholder:text-gray-600" 
              placeholder="QUERY_INDEX_OR_REGION..." 
              spellCheck="false"
            />
            {/* Sci-fi Corner Cut */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/50"></div>
          </div>
        </div>

        {/* Data Ledger (Replacing Card Table) */}
        <div className="bg-[#0D1117]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          {/* Top Scan Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
             <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-purple-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Live_Data_Feed_Active</span>
             </div>
             <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Nodes Found: {filteredIndices.length}</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0D1117] sticky top-0 z-10">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Index Symbol</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Max Leverage</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Contract Size</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Min Allocation</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Commission</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Terminal Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredIndices.map((idx) => (
                  <tr key={idx.symbol} className="group hover:bg-white/[0.03] transition-colors duration-200">
                    
                    {/* Symbol Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                          <Globe className={`w-4 h-4 ${idx.region === 'AMER' ? 'text-indigo-400' : idx.region === 'EMEA' ? 'text-purple-400' : 'text-pink-400'}`} />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-lg text-white tracking-tight group-hover:text-purple-400 transition-colors block">
                            {idx.symbol}
                          </span>
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{idx.region} Zone</span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Leverage Column */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-bold text-white bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded">
                        {idx.leverage}
                      </span>
                    </td>
                    
                    {/* Lot Size Column */}
                    <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                      {idx.lotSize}
                    </td>
                    
                    {/* Min Lot Column */}
                    <td className="px-6 py-4 font-mono text-gray-300 text-sm font-bold">
                      {idx.minLot}
                    </td>
                    
                    {/* Commission Column */}
                    <td className="px-6 py-4 font-mono text-gray-400 text-sm">
                      ${idx.comm} <span className="text-[10px] text-gray-600">/ LOT</span>
                    </td>
                    
                    {/* Action Column */}
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href="/login" 
                        className="inline-flex px-6 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Login
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {/* 404 State */}
                {filteredIndices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center bg-white/[0.01]">
                      <p className="text-purple-500/50 font-mono text-sm uppercase tracking-widest animate-pulse">
                        ERR: 404 // BENCHMARK_NOT_FOUND IN DATABANK
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