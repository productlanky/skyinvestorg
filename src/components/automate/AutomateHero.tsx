import Link from 'next/link';
import { Terminal, ChevronRight, Activity, Code, Zap } from 'lucide-react';

export default function AutomateHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
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
                <span className="opacity-70">Technology</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-brand-400 font-bold shadow-brand-500">Algorithmic_Engine</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[5rem] md:text-[9rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
                SYSTEMS
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Systematic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">
                  Execution.
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mt-2 border-l-2 border-brand-500 pl-6 max-w-2xl">
              Eliminate human latency. Deploy your C#, Python, or FIX protocol algorithms directly into our NY4 co-located matching engine. Engineered for High-Frequency Trading (HFT) with unrestricted rate limits.
            </p>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-brand-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(31,149,201,0.2)] hover:bg-brand-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Generate API Keys <Code className="ml-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: COMPILER HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            <div className="relative bg-[#0D1117]/90 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Compiler_Instance_01</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_#1f95c9]"></div>
              </div>

              {/* Code Terminal Simulation */}
              <div className="bg-[#020305] border border-white/5 p-4 rounded-sm font-mono text-xs overflow-hidden h-[240px] relative">
                <div className="text-gray-500 mb-2">{"//"} INITIALIZING FIX API PROTOCOL</div>
                <div className="text-brand-400 mb-1">import <span className="text-white">SkyInvestOrg.Core.Execution;</span></div>
                <div className="text-brand-400 mb-4">import <span className="text-white">SkyInvestOrg.MarketData;</span></div>
                
                <div className="text-gray-300 mb-1">public async Task ExecuteOrder() {'{'}</div>
                <div className="pl-4 text-gray-300 mb-1">var order = new Order()</div>
                <div className="pl-4 text-gray-300 mb-1">Symbol = <span className="text-success-400">&quot;EURUSD&quot;</span>,</div>
                <div className="pl-4 text-gray-300 mb-1">Type = OrderType.<span className="text-brand-400">Market</span>,</div>
                <div className="pl-4 text-gray-300 mb-1">Volume = <span className="text-purple-400">100.0</span></div>
                <div className="pl-4 text-gray-300 mb-1">;</div>
                <div className="pl-4 text-gray-300 mt-2">await Engine.<span className="text-brand-400">SubmitAsync</span>(order);</div>
                <div className="text-gray-300 mb-2">{'}'}</div>

                {/* Animated Typing Cursor */}
                <div className="w-2 h-4 bg-brand-500 animate-pulse inline-block"></div>

                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#020305] to-transparent"></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/[0.02] border border-white/5 p-3">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">REST Latency</span>
                  <span className="block text-lg font-mono font-bold text-white">&lt; 8ms</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-3">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">FIX Protocol</span>
                  <span className="block text-lg font-mono font-bold text-white">Active (v4.4)</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}