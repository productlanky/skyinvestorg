import Link from 'next/link';
import { Terminal, ChevronRight, Activity, TrendingUp, BarChart3, Globe } from 'lucide-react';

// Simulated top equities data for the HUD
const topEquities = [
  { symbol: 'NVDA', name: 'Nvidia Corp', price: '875.28', change: '+4.12%' },
  { symbol: 'AAPL', name: 'Apple Inc', price: '173.50', change: '+1.05%' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '192.53', change: '-2.15%' },
];

export default function SharesHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Ambient Glow - Emerald for Stocks */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY & MODULES (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Path (Replaces Standard Breadcrumb) */}
            <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-emerald-400 transition-colors">SYS_ROOT</Link>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="opacity-70">Trading</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-emerald-400 font-bold shadow-emerald-500">Equities_Module</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[6rem] md:text-[10rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(16, 185, 129, 0.5)' }}>
                EQUITIES
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Global Corporate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 italic">
                  Ownership.
                </span>
              </h2>
            </div>

            {/* Definition Data Module (Replaces the generic text box) */}
            <div className="relative p-6 border-l-2 border-emerald-500 bg-emerald-500/5 backdrop-blur-sm max-w-2xl"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-mono uppercase tracking-widest">Asset_Class_Def</div>
              <p className="text-lg text-gray-300 font-light leading-relaxed mt-2">
                Shares are units of equity ownership interest in a corporation that exist as a financial asset. They provide an equal distribution in any residual profits in the form of <span className="text-white font-medium">dividends</span>. Shareholders may also enjoy capital gains if the enterprise valuation rises.
              </p>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-emerald-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:bg-emerald-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Create Account <TrendingUp className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: EQUITIES HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            {/* Main Glass Panel */}
            <div className="relative bg-[#0D1117]/80 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Market_Volume_Leaders</span>
                </div>
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>

              {/* Ticker List */}
              <div className="space-y-4">
                {topEquities.map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                        <span className="text-xs font-black text-white">{stock.symbol[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white tracking-wide">{stock.symbol}</p>
                        <p className="text-[10px] font-mono text-gray-500 uppercase">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold text-white">${stock.price}</p>
                      <p className={`text-[10px] font-mono ${stock.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Status Indicators */}
              <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">NYSE: OPEN</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">NASDAQ: OPEN</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">LSE: CLOSED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">HKEX: OPEN</span>
                </div>
              </div>
            </div>

            {/* Floating Element: Leverage Tag */}
            <div className="absolute -bottom-6 -left-10 bg-emerald-950/80 border border-emerald-500/30 p-4 backdrop-blur-xl z-30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center space-x-3"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              <Globe className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Global Access</p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">10,000+ Equities</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}