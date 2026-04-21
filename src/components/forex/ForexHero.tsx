"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Zap, ArrowUpRight, BarChart4, Network, Terminal } from 'lucide-react';

// Simulated high-frequency order book data
const orderBook = [
  { price: '64,281.90', amount: '1.452', time: '11:29:01', type: 'sell' },
  { price: '64,281.45', amount: '0.890', time: '11:29:00', type: 'sell' },
  { price: '64,280.10', amount: '5.100', time: '11:28:59', type: 'sell' },
  { price: '64,279.80', amount: '2.341', time: '11:28:59', type: 'buy' },
  { price: '64,278.50', amount: '0.120', time: '11:28:58', type: 'buy' },
  { price: '64,275.00', amount: '8.450', time: '11:28:57', type: 'buy' },
];

export default function CommandCenterHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#020305] overflow-hidden flex items-center pt-20">
      
      {/* 1. DEEP SPACE BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-success-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* LEFT: THE SOVEREIGN COPY (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Status Ribbon */}
            <div className="inline-flex items-center space-x-4 p-2 pr-6 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                <Terminal className="w-4 h-4 text-brand-400" />
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">
                System_Status: <span className="text-success-400 font-bold">Optimal</span> // NY4 Connected
              </span>
            </div>

            {/* Massive Typography */}
            <div className="relative">
              {/* Outline ghost text behind */}
              <h1 className="absolute -top-12 -left-4 text-[8rem] md:text-[12rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                LIQUIDITY
              </h1>
              
              <h2 className="relative text-6xl md:text-8xl xl:text-[6.5rem] font-extrabold text-white leading-[0.9] tracking-tighter">
                Institutional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-brand-600">
                  Firepower.
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-2 border-brand-500/50 pl-6">
              Bypass retail bottlenecks. SkyInvestOrg connects you directly to Tier-1 liquidity pools with sub-millisecond algorithmic routing and sovereign-grade asset custody.
            </p>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-16 px-10 bg-brand-600 w-full sm:w-auto overflow-hidden"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }} // Sci-fi angled corners
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center">
                  Deploy Capital <ArrowUpRight className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                href="/about" 
                className="group flex items-center justify-center h-16 px-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] w-full sm:w-auto transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-widest transition-colors">
                  View Infrastructure
                </span>
              </Link>
            </div>

            {/* Data Points */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 max-w-2xl">
              <div>
                <p className="text-3xl font-mono font-bold text-white mb-1">$4.2B</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono">Daily Volume</p>
              </div>
              <div>
                <p className="text-3xl font-mono font-bold text-white mb-1">&lt;12ms</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono">Execution Speed</p>
              </div>
              <div>
                <p className="text-3xl font-mono font-bold text-white mb-1">0.0</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono">Raw Spreads</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE LIVE HUD (5 Columns) */}
          <div className="lg:col-span-5 relative h-full min-h-[600px] hidden lg:block">
            
            {/* HUD Central Glass Panel */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[110%] bg-gray-900/40 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Order_Book</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Order Book Table */}
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-2">
                  <span>Price (USD)</span>
                  <span>Amount</span>
                  <span>Time</span>
                </div>
                {orderBook.map((order, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono group hover:bg-white/5 p-1 transition-colors">
                    <span className={order.type === 'sell' ? 'text-error-400' : 'text-success-400'}>
                      {order.price}
                    </span>
                    <span className="text-white">{order.amount}</span>
                    <span className="text-gray-500">{order.time}</span>
                  </div>
                ))}
              </div>

              {/* Spread Indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Aggregate Spread</span>
                <span className="text-sm font-mono font-bold text-white bg-white/10 px-3 py-1 rounded">0.1 Pips</span>
              </div>
            </div>

            {/* Floating Element 1: Security Shield */}
            <div className="absolute top-10 right-20 bg-gray-950/80 border border-success-500/30 p-4 backdrop-blur-xl z-30 flex items-center space-x-4 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                 style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
              <ShieldCheck className="w-8 h-8 text-success-500" />
              <div>
                <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Custody Status</p>
                <p className="text-xs font-bold text-white uppercase">Multi-Sig Secured</p>
              </div>
            </div>

            {/* Floating Element 2: Execution Chart */}
            <div className="absolute bottom-10 left-[-2rem] bg-brand-900/20 border border-brand-500/30 p-5 backdrop-blur-xl z-30 shadow-[0_0_30px_rgba(31,149,201,0.2)]"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-5 h-5 text-brand-400" />
                <span className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Routing Efficiency</span>
              </div>
              <div className="flex items-end space-x-1 h-12">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="w-3 bg-brand-500/80 hover:bg-white transition-colors" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}