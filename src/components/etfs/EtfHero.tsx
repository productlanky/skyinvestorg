import Link from 'next/link';
import { Terminal, ChevronRight, Layers, Activity } from 'lucide-react';

export default function EtfHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BRAND BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Ambient Glow - STRICTLY BRAND BLUE */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-400/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
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
                <span className="opacity-70">Trading</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-brand-400 font-bold shadow-brand-500">ETF_Modules</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[6rem] md:text-[10rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
                BASKETS
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Thematic Asset <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-indigo-600 italic">
                  Allocation.
                </span>
              </h2>
            </div>

            {/* Definition Data Module */}
            <div className="relative p-6 border-l-2 border-brand-500 bg-brand-500/5 backdrop-blur-sm max-w-2xl"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 px-2 py-1 bg-brand-500/20 text-brand-400 text-[8px] font-mono uppercase tracking-widest">Asset_Class_Def</div>
              <p className="text-lg text-gray-300 font-light leading-relaxed mt-2">
                Exchange Traded Funds (ETFs) grant immediate, fractional exposure to broad market sectors, commodities, or specialized indices. Execute diversified macro-strategies through a single, highly liquid instrument.
              </p>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-brand-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(31,149,201,0.2)] hover:bg-brand-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Deploy Capital <Layers className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: ETF HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            {/* Main Glass Panel */}
            <div className="relative bg-[#0D1117]/80 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Basket_Metrics</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"></div>
              </div>

              {/* Ticker List */}
              <div className="space-y-4">
                {[
                  { symbol: 'SPY', name: 'S&P 500 Trust', price: '512.30', change: '+0.85%', aum: '$480B' },
                  { symbol: 'QQQ', name: 'Invesco Trust Series 1', price: '438.15', change: '+1.12%', aum: '$235B' },
                  { symbol: 'GLD', name: 'SPDR Gold Shares', price: '202.40', change: '-0.45%', aum: '$58B' }
                ].map((etf, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-500/30 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-500/50 transition-colors">
                        <Layers className="w-4 h-4 text-brand-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white tracking-wide">{etf.symbol}</p>
                        <p className="text-[10px] font-mono text-gray-500 uppercase">{etf.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold text-white">${etf.price}</p>
                      <p className={`text-[10px] font-mono ${etf.change.startsWith('+') ? 'text-success-400' : 'text-error-400'}`}>
                        {etf.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Composition Tag */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Routing: Aggregated</span>
                <span className="text-[9px] font-mono text-brand-400 uppercase tracking-widest bg-brand-500/10 px-2 py-1 rounded">
                  Fractional Allocation Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}