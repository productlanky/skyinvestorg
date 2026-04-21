"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

const indicesData = [
  { symbol: 'AUSTRALIA 200', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'EUROPE 50', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'FRANCE 40', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'GERMANY 30', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'HONG KONG 50', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'ITALY 40', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'JAPAN 225', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'NETHERLANDS 25', leverage: '1:200', lotSize: '1 * index price', minLot: '1', comm: '0' },
  { symbol: 'SPAIN 35', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'SWITZERLAND 20', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'UK 100', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'US 30', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'US 500', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' },
  { symbol: 'US TECH 100', leverage: '1:200', lotSize: '1 * index price', minLot: '0.01', comm: '0' }
];

export default function IndicesMarketTable() {
  const [search, setSearch] = useState('');

  const filteredIndices = indicesData.filter(idx => 
    idx.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="indices-table" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g fill="#fff" fillOpacity="0.3">
              <path d="M36 34h-2V24h2v10zm4-10h-2v10h2V24zm4 0h-2v10h2V24z"/>
            </g>
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Market Overview
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Indices - Spreads &amp; Trading Conditions
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Access global index markets with competitive spreads and flexible trading conditions
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg backdrop-blur-sm" 
              placeholder="Search indices..." 
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
            
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-700 text-left whitespace-nowrap">
                <thead className="bg-gray-900 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">Leverage</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">Lot Size</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">Min Lot Size</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-300 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700 text-gray-200">
                  {filteredIndices.map((idx) => (
                    <tr key={idx.symbol} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 font-bold text-blue-400">{idx.symbol}</td>
                      <td className="px-6 py-4 font-medium">{idx.leverage}</td>
                      <td className="px-6 py-4 text-gray-400">{idx.lotSize}</td>
                      <td className="px-6 py-4 font-medium">{idx.minLot}</td>
                      <td className="px-6 py-4 text-gray-400">{idx.comm}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/login" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
                          Trade
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredIndices.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No matching indices found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}