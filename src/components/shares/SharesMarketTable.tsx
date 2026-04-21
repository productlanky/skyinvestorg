"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

// Mock Data for Shares
const sharesData = [
  { symbol: 'AAPL', company: 'Apple Inc.', price: '$173.50', change: '+1.25%', isUp: true, volume: '52.4M' },
  { symbol: 'TSLA', company: 'Tesla, Inc.', price: '$175.34', change: '-2.10%', isUp: false, volume: '89.1M' },
  { symbol: 'MSFT', company: 'Microsoft Corp.', price: '$416.42', change: '+0.85%', isUp: true, volume: '22.3M' },
  { symbol: 'AMZN', company: 'Amazon.com Inc.', price: '$178.15', change: '+1.05%', isUp: true, volume: '35.6M' },
  { symbol: 'NVDA', company: 'NVIDIA Corp.', price: '$880.08', change: '+3.40%', isUp: true, volume: '45.8M' },
  { symbol: 'META', company: 'Meta Platforms', price: '$510.92', change: '-0.50%', isUp: false, volume: '15.2M' },
  { symbol: 'GOOGL', company: 'Alphabet Inc.', price: '$154.20', change: '+0.30%', isUp: true, volume: '28.9M' },
  { symbol: 'NFLX', company: 'Netflix, Inc.', price: '$612.45', change: '-1.15%', isUp: false, volume: '8.4M' },
];

export default function SharesMarketTable() {
  const [search, setSearch] = useState('');

  const filteredShares = sharesData.filter(share => 
    share.symbol.toLowerCase().includes(search.toLowerCase()) || 
    share.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trading Table Card */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          
          {/* Table Header & Search */}
          <div className="p-6 bg-gray-800 border-b border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">Available Shares</h2>
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-400 pr-10" 
                    placeholder="Search shares..." 
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-gray-700 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-200 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {filteredShares.map((share) => (
                  <tr key={share.symbol} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-blue-400">{share.symbol}</td>
                    <td className="px-6 py-4 text-gray-300 font-medium">{share.company}</td>
                    <td className="px-6 py-4 text-white font-semibold">{share.price}</td>
                    <td className={`px-6 py-4 font-medium ${share.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {share.change}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{share.volume}</td>
                    <td className="px-6 py-4 text-right">
                       <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
                         Trade
                       </button>
                    </td>
                  </tr>
                ))}
                {filteredShares.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No matching shares found. Try a different search term.
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