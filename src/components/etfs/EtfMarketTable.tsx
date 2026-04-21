"use client";

import { useState } from 'react';
import { Search, BarChart3, Database, Globe2, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Index ETFs', desc: 'Track major market indices like S&P 500, NASDAQ, and Dow Jones', icon: BarChart3 },
  { name: 'Sector ETFs', desc: 'Focus on specific sectors like Technology, Healthcare, and Energy', icon: Database },
  { name: 'International ETFs', desc: 'Access global markets including emerging markets and developed economies', icon: Globe2 },
  { name: 'Thematic ETFs', desc: 'Focus on specific themes like Clean Energy, AI, Cybersecurity, and more', icon: LayoutTemplate },
];

const etfData = [
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: '$512.30', change: '+0.45%', aum: '$450B', spread: '0.02' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: '$445.15', change: '+1.12%', aum: '$230B', spread: '0.03' },
  { symbol: 'VTI', name: 'Vanguard Total Stock', price: '$265.80', change: '+0.38%', aum: '$310B', spread: '0.02' },
  { symbol: 'XLF', name: 'Financial Select Sector', price: '$41.20', change: '-0.15%', aum: '$38B', spread: '0.01' },
  { symbol: 'XLK', name: 'Technology Select Sector', price: '$205.40', change: '+1.50%', aum: '$52B', spread: '0.02' },
  { symbol: 'ARKK', name: 'Innovation ETF', price: '$48.90', change: '-2.10%', aum: '$8B', spread: '0.04' },
  { symbol: 'EEM', name: 'Emerging Markets', price: '$42.15', change: '+0.80%', aum: '$28B', spread: '0.03' },
  { symbol: 'GLD', name: 'SPDR Gold Trust', price: '$208.50', change: '+0.25%', aum: '$58B', spread: '0.02' },
];

export default function EtfMarketTable() {
  const [search, setSearch] = useState('');

  const filteredETFs = etfData.filter(etf => 
    etf.symbol.toLowerCase().includes(search.toLowerCase()) ||
    etf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="etf-markets" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Available ETFs
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ETF Markets
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Trade a wide range of Exchange-Traded Funds with competitive spreads and advanced tools
          </p>
        </div>

        {/* ETF Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                  <cat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          
          <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search ETFs..." 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow">
                <option value="All">All ETFs</option>
                <option value="Index">Index ETFs</option>
                <option value="Sector">Sector ETFs</option>
                <option value="International">International ETFs</option>
                <option value="Thematic">Thematic ETFs</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-300 whitespace-nowrap">
              <thead className="text-xs uppercase bg-gray-900 text-gray-400 sticky top-0 z-10 shadow-sm border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">24h Change</th>
                  <th className="px-6 py-4 font-semibold">AUM</th>
                  <th className="px-6 py-4 font-semibold">Spread</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900">
                {filteredETFs.map((etf) => (
                  <tr key={etf.symbol} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-400">{etf.symbol}</td>
                    <td className="px-6 py-4">{etf.name}</td>
                    <td className="px-6 py-4 font-medium text-white">{etf.price}</td>
                    <td className={`px-6 py-4 font-medium ${etf.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {etf.change}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{etf.aum}</td>
                    <td className="px-6 py-4">{etf.spread}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">Trade</Link>
                    </td>
                  </tr>
                ))}
                {filteredETFs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No matching ETFs found</td>
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