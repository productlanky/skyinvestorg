"use client";

import { useState } from 'react';
import { Search, Globe, Flame, Navigation } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Major', desc: 'EUR/USD, GBP/USD, USD/JPY, USD/CHF', icon: Globe },
  { name: 'Minor', desc: 'EUR/GBP, EUR/CHF, GBP/JPY, EUR/JPY', icon: Navigation },
  { name: 'Exotic', desc: 'USD/TRY, USD/ZAR, EUR/HUF, USD/MXN', icon: Flame },
  { name: 'Australasian', desc: 'AUD/USD, NZD/USD, AUD/NZD', icon: Globe },
  { name: 'Scandinavian', desc: 'EUR/NOK, EUR/SEK, USD/NOK', icon: Navigation },
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
    <section id="forex-markets" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full">
            Major Currency Pairs
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Market Overview</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Track performance across major currency pairs with real-time data and live spreads
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {categories.map(cat => (
            <div 
              key={cat.name} 
              onClick={() => setActiveCategory(cat.name)}
              className={`rounded-xl p-4 border transition-all duration-300 cursor-pointer ${activeCategory === cat.name ? 'bg-gray-800 border-blue-500 shadow-lg' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-400'}`}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                  <cat.icon className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white">{cat.name}</h3>
              </div>
              <p className="text-gray-400 text-xs">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 w-full md:w-64 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>

            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search pairs..." 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="overflow-x-auto w-full max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-300 whitespace-nowrap">
              <thead className="text-xs uppercase bg-gray-900 text-gray-400 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Leverage</th>
                  <th className="px-6 py-4 font-semibold">Lot Size</th>
                  <th className="px-6 py-4 font-semibold">Min Lot Size</th>
                  <th className="px-6 py-4 font-semibold">Commission</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900">
                {filteredPairs.map((pair) => (
                  <tr key={pair.symbol} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-400">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center mr-3 text-xs text-blue-400 font-medium">
                          {pair.symbol.split('/')[0]}
                        </div>
                        {pair.symbol}
                      </div>
                    </td>
                    <td className="px-6 py-4">{pair.category}</td>
                    <td className="px-6 py-4">1:500</td>
                    <td className="px-6 py-4">100,000 {pair.symbol.split('/')[0]}</td>
                    <td className="px-6 py-4">0.01</td>
                    <td className="px-6 py-4">$2.5 per $100K</td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">Trade</Link>
                    </td>
                  </tr>
                ))}
                {filteredPairs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No matching records found</td>
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