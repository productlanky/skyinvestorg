import { ShieldCheck, Zap, Activity } from 'lucide-react';

export default function CryptoHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#05070a] overflow-hidden">
      {/* Background Depth */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="h-[1px] w-12 bg-brand-500"></div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-400">Digital Asset Class</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8">
              Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Crypto</span> Hub.
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-xl leading-relaxed mb-10">
              Access the most liquid cryptocurrency markets with institutional-grade pricing, sub-millisecond execution, and total regulatory clarity.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-success-500" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Cold Storage Secure</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-warning-400" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">0.01s Execution</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-500/20 to-purple-500/20 blur-2xl rounded-3xl group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative bg-gray-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Live_Terminal_Feed</span>
                <Activity className="w-4 h-4 text-brand-400 animate-pulse" />
              </div>
              <div className="space-y-6">
                {[
                  { pair: 'BTC/USD', price: '64,281.90', change: '+2.41%', up: true },
                  { pair: 'ETH/USD', price: '3,492.12', change: '+1.85%', up: true },
                  { pair: 'SOL/USD', price: '142.05', change: '-0.92%', up: false }
                ].map((token, i) => (
                  <div key={i} className="flex items-center justify-between group/line">
                    <span className="text-lg font-bold text-white tracking-tight group-hover/line:text-brand-400 transition-colors">{token.pair}</span>
                    <div className="text-right">
                      <span className="block text-white font-mono font-bold">{token.price}</span>
                      <span className={`text-[10px] font-mono ${token.up ? 'text-success-400' : 'text-error-400'}`}>{token.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">Aggregating 12 Liquidity Providers...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}