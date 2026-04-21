import Link from 'next/link';
import { Terminal, ChevronRight, Activity, ShieldCheck } from 'lucide-react';

export default function WhyUsHero() {
  return (
    <section className="relative w-full min-h-[75vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BRAND BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-400/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY & MODULES (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Path */}
            <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Terminal className="w-4 h-4 text-brand-500" />
              <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-brand-400 transition-colors">SYS_ROOT</Link>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="opacity-70">Corporate</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-brand-400 font-bold shadow-brand-500">The_Advantage</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[5rem] md:text-[9rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
                EDGE
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                The Sovereign <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">
                  Advantage.
                </span>
              </h2>
            </div>

            <p className="text-lg text-gray-400 font-light leading-relaxed mt-2 border-l-2 border-brand-500 pl-6 max-w-2xl">
              Retail platforms are designed to profit from your losses. SkyInvestOrg was engineered as a pure-agency infrastructure. We provide direct market access, raw liquidity, and latency-optimized routing. When you win, we win.
            </p>
          </div>

          {/* RIGHT: INFRASTRUCTURE HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            <div className="relative bg-[#0D1117]/80 border border-white/10 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Telemetry_Feed</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_#1f95c9]"></div>
              </div>

              {/* Data Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 hover:border-brand-500/30 transition-colors">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Avg. Execution Latency</span>
                  <span className="text-lg font-bold text-white tracking-wide text-brand-400 font-mono">&lt; 12ms</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 hover:border-brand-500/30 transition-colors">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Liquidity Providers (LPs)</span>
                  <span className="text-lg font-bold text-white tracking-wide font-mono">25+ Tier-1</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 hover:border-brand-500/30 transition-colors">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Uptime (YTD)</span>
                  <span className="text-lg font-bold text-white tracking-wide text-success-400 font-mono">99.999%</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                 <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Execution Model</span>
                 <span className="text-[9px] font-mono text-brand-400 uppercase tracking-widest flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    PURE STP / A-BOOK
                 </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}