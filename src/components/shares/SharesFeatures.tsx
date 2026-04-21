import { ArrowRight, Network, Activity, Globe, Cpu, Terminal } from 'lucide-react';
import Link from 'next/link';

// Pre-calculated heatmap data to avoid Next.js hydration mismatches
const heatmapData = [
  { up: true, val: 90 }, { up: true, val: 40 }, { up: false, val: 60 }, { up: true, val: 80 }, { up: true, val: 20 }, { up: false, val: 90 },
  { up: false, val: 30 }, { up: true, val: 100 }, { up: true, val: 50 }, { up: false, val: 70 }, { up: true, val: 60 }, { up: true, val: 30 },
  { up: true, val: 70 }, { up: false, val: 80 }, { up: false, val: 40 }, { up: true, val: 90 }, { up: true, val: 50 }, { up: false, val: 20 },
  { up: true, val: 60 }, { up: true, val: 80 }, { up: false, val: 90 }, { up: false, val: 50 }, { up: true, val: 100 }, { up: true, val: 40 }
];

export default function SharesFeatures() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Pure CSS Market Heatmap Visualizer */}
          <div className="relative group perspective-[1500px]">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative bg-[#0D1117] border border-white/10 p-6 backdrop-blur-xl shadow-2xl transform rotate-y-6 rotate-x-2 transition-transform duration-700"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Visualizer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Global_Heatmap_Scan</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>

              {/* The Heatmap Grid */}
              <div className="grid grid-cols-6 gap-2 mb-6">
                {heatmapData.map((cell, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square rounded-sm relative overflow-hidden group/cell"
                    style={{ 
                      backgroundColor: cell.up 
                        ? `rgba(16, 185, 129, ${cell.val / 100})` 
                        : `rgba(239, 68, 68, ${cell.val / 100})` 
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/cell:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>

              {/* Aggregation Overlay Tag */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950/90 border border-emerald-500/50 p-4 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)] text-center w-3/4"
                   style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">Deep Liquidity</p>
                <p className="text-lg font-black text-white uppercase tracking-tighter">Aggregating 25+ Exchanges</p>
              </div>

              {/* Footer Stats */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Routing: DMA</span>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Latency: &lt;15ms</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content & Capability Nodes */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <Network className="w-5 h-5 text-emerald-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-emerald-400">Institutional Infrastructure</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
                Tier-1 Corporate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 italic">Liquidity Access.</span>
              </h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                SkyInvestOrg bypasses retail limitations. Our direct relationships with global prime brokers mean deep order book visibility, absolute minimum slippage, and razor-tight spreads for high-volume equity traders.
              </p>
            </div>

            {/* Capability Matrix (Replaces bullet points) */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Cross-Asset Integration', icon: Network, desc: 'Trade Equities, Forex, and Crypto from one terminal.' },
                { title: '24/5 Connectivity', icon: Activity, desc: 'Continuous market access during global trading hours.' },
                { title: 'Algorithmic Ready', icon: Cpu, desc: 'Deploy automated strategies via C# and Python APIs.' },
                { title: 'Global Support', icon: Globe, desc: 'Dedicated multilingual desk for institutional clients.' }
              ].map((node, i) => (
                <div key={i} className="p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-colors group">
                  <node.icon className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1 tracking-wide">{node.title}</h3>
                  <p className="text-[10px] font-mono text-gray-500 leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link 
                href="/trading-conditions" 
                className="group relative inline-flex items-center justify-center h-14 px-8 bg-white/[0.02] border border-white/10 hover:border-emerald-500 transition-colors overflow-hidden"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
              >
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 text-xs font-bold text-white uppercase tracking-widest flex items-center">
                  Review Commission Schedule <ArrowRight className="ml-3 w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}