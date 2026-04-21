import Link from 'next/link';
import { Terminal, ChevronRight, Activity, Crosshair } from 'lucide-react';

export default function TradeHero() {
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
                <span className="opacity-70">Platforms</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-brand-400 font-bold shadow-brand-500">Web_Terminal</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[6rem] md:text-[10rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
                EXECUTE
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Institutional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 italic">
                  Execution Interface.
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mt-2 border-l-2 border-brand-500 pl-6 max-w-2xl">
              Abandon retail software. The SkyInvestOrg Web Terminal provides browser-based access to Tier-1 liquidity, advanced charting heuristics, and sub-millisecond order routing without requiring localized installation.
            </p>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/login" 
                className="group relative flex items-center justify-center h-14 px-8 bg-brand-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(31,149,201,0.2)] hover:bg-brand-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Launch Web Terminal <Crosshair className="ml-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: TERMINAL HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            {/* Main Glass Panel */}
            <div className="relative bg-[#0D1117]/90 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Chart_Instance</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
              </div>

              {/* Ticker Info */}
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter">EUR/USD</h3>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Euro / US Dollar</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-white">1.0842<span className="text-lg text-gray-500">5</span></span>
                  <p className="text-[10px] font-mono text-success-400">+0.0012 (+0.11%)</p>
                </div>
              </div>

              {/* CSS Candlestick Chart Simulation */}
              <div className="h-40 w-full border border-white/5 bg-white/[0.01] relative flex items-end justify-between px-2 pt-4 pb-2 group">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 border-b border-dashed border-white/10"></div>
                {/* Simulated Candles */}
                {[
                  { h: '60%', c: 'bg-success-500', t: '10%', b: '15%' },
                  { h: '40%', c: 'bg-error-500', t: '5%', b: '20%' },
                  { h: '50%', c: 'bg-success-500', t: '15%', b: '5%' },
                  { h: '70%', c: 'bg-success-500', t: '5%', b: '10%' },
                  { h: '30%', c: 'bg-error-500', t: '20%', b: '10%' },
                  { h: '80%', c: 'bg-success-500', t: '10%', b: '5%' },
                  { h: '65%', c: 'bg-error-500', t: '5%', b: '15%' },
                ].map((candle, i) => (
                  <div key={i} className="relative w-4 flex flex-col items-center justify-end h-full">
                    <div className="absolute w-[1px] bg-white/20 h-full" style={{ top: candle.t, bottom: candle.b }}></div>
                    <div className={`relative w-full rounded-sm ${candle.c} z-10 shadow-[0_0_10px_currentColor]`} style={{ height: candle.h, opacity: 0.8 }}></div>
                  </div>
                ))}
                {/* Active Price Line */}
                <div className="absolute top-[35%] left-0 w-full h-[1px] bg-brand-500 shadow-[0_0_10px_#1f95c9] z-20 pointer-events-none">
                  <div className="absolute right-0 -top-2 bg-brand-500 text-white text-[9px] font-mono px-1 rounded">1.08425</div>
                </div>
              </div>

              {/* One-Click Order Simulation */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-error-500/10 border border-error-500/30 p-3 text-center cursor-pointer hover:bg-error-500/20 transition-colors">
                  <span className="block text-[9px] font-mono text-error-400 uppercase tracking-widest mb-1">SELL</span>
                  <span className="block text-lg font-mono font-bold text-white">1.0842<span className="text-gray-400 text-sm">3</span></span>
                </div>
                <div className="bg-success-500/10 border border-success-500/30 p-3 text-center cursor-pointer hover:bg-success-500/20 transition-colors">
                  <span className="block text-[9px] font-mono text-success-400 uppercase tracking-widest mb-1">BUY</span>
                  <span className="block text-lg font-mono font-bold text-white">1.0842<span className="text-gray-400 text-sm">5</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}