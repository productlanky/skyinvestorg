import Link from 'next/link';
import { Terminal, ChevronRight, TrendingUp, Activity, BarChart4 } from 'lucide-react';

export default function IndicesHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Ambient Glow - Amethyst/Purple for Indices */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY & MODULES (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Path */}
            <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Terminal className="w-4 h-4 text-purple-500" />
              <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-purple-400 transition-colors">SYS_ROOT</Link>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="opacity-70">Trading</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-purple-400 font-bold shadow-purple-500">Macro_Indices</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[6rem] md:text-[10rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(168, 85, 247, 0.5)' }}>
                MACRO
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Global Sector <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-600 italic">
                  Benchmarks.
                </span>
              </h2>
            </div>

            {/* Definition Data Module */}
            <div className="relative p-6 border-l-2 border-purple-500 bg-purple-500/5 backdrop-blur-sm max-w-2xl"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 px-2 py-1 bg-purple-500/20 text-purple-400 text-[8px] font-mono uppercase tracking-widest">Asset_Class_Def</div>
              <p className="text-lg text-gray-300 font-light leading-relaxed mt-2">
                Indices act as barometers for global economic health, tracking the performance of the largest publicly traded companies across distinct geopolitical regions and industry sectors.
              </p>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-purple-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:bg-purple-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Trade Global Indices <TrendingUp className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: INDICES HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            <div className="relative bg-[#0D1117]/80 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart4 className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Aggregate_Index_Feed</span>
                </div>
                <Activity className="w-4 h-4 text-purple-500 animate-pulse" />
              </div>

              {/* Advanced Chart Representation */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">S&P 500 (US500)</span>
                    <p className="text-3xl font-black text-white tracking-tighter">5,142.80</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">24H Delta</span>
                    <span className="text-sm font-bold text-success-400 bg-success-500/10 px-2 py-1 rounded">+0.85%</span>
                  </div>
                </div>

                {/* Simulated SVG Graph */}
                <div className="h-32 w-full border border-white/5 bg-white/[0.01] relative overflow-hidden group">
                   <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/5"></div>
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
                   <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path d="M0,80 Q50,70 100,50 T200,60 T300,30 T400,20" fill="none" stroke="#A855F7" strokeWidth="2" />
                      <path d="M0,80 Q50,70 100,50 T200,60 T300,30 T400,20 L400,100 L0,100 Z" fill="url(#purpleGrad)" />
                      <defs>
                        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3"></stop>
                          <stop offset="100%" stopColor="#A855F7" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                   </svg>
                   {/* Scanning Crosshair */}
                   <div className="absolute top-0 bottom-0 w-[1px] bg-purple-500/50 shadow-[0_0_10px_#A855F7] animate-[ping_3s_ease-in-out_infinite] pointer-events-none left-3/4"></div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Day High</p>
                  <p className="text-sm font-bold text-white mt-1">5,150.25</p>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Day Low</p>
                  <p className="text-sm font-bold text-white mt-1">5,098.10</p>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5">
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Liquidity</p>
                  <p className="text-sm font-bold text-white mt-1">Deep (L1)</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}