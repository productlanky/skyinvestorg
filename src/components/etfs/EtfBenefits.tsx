import { PieChart, ShieldCheck, Zap, Server } from 'lucide-react';

const features = [
  {
    title: 'Instant Diversification',
    metric: 'RISK: MINIMIZED',
    desc: 'Mitigate single-stock exposure. A single ETF execution instantly allocates capital across hundreds of underlying assets within a specific sector or index.',
    icon: PieChart
  },
  {
    title: 'Cost-Effective Thematics',
    desc: 'Bypass the high management fees of mutual funds. ETFs offer identical thematic exposure with exponentially lower expense ratios and zero minimum capital requirements.',
    metric: 'FEES: COMPRESSED',
    icon: Zap
  },
  {
    title: 'High Liquidity Execution',
    desc: 'Trade ETFs with the same agility as individual equities. Enter and exit macro-thematic positions instantaneously during standard market hours without settlement delays.',
    metric: 'LIQUIDITY: L1',
    icon: Server
  }
];

export default function EtfBenefits() {
  return (
    <section className="py-24 bg-[#020305] relative overflow-hidden">
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Content & System Advantages (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-brand-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">System Advantages</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
                Macro Allocation. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Micro Execution.</span>
              </h2>
            </div>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="group relative p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                     style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                  
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:border-brand-500/50 group-hover:shadow-[0_0_20px_rgba(31,149,201,0.2)] transition-all">
                      <feature.icon className="w-6 h-6 text-brand-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h3 className="text-lg font-bold text-white tracking-wide">{feature.title}</h3>
                        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 uppercase tracking-widest border border-white/5">
                          {feature.metric}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Portfolio Distribution Visualizer (5 Cols) */}
          <div className="lg:col-span-5 relative group hidden md:block">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-500/20 to-indigo-500/20 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative bg-[#0D1117] border border-white/10 p-8 backdrop-blur-xl shadow-2xl"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 0)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">ETF_Basket_Composition</span>
                <div className="px-2 py-1 bg-brand-500/20 text-brand-400 text-[8px] font-mono uppercase tracking-widest border border-brand-500/30">
                  SIMULATION
                </div>
              </div>

              {/* CSS Visualizer for ETF Basket */}
              <div className="space-y-4">
                {[
                  { sector: 'Technology', weight: '45%', color: 'bg-brand-500' },
                  { sector: 'Healthcare', weight: '25%', color: 'bg-brand-400' },
                  { sector: 'Financials', weight: '15%', color: 'bg-indigo-500' },
                  { sector: 'Consumer Goods', weight: '10%', color: 'bg-indigo-400' },
                  { sector: 'Energy', weight: '5%', color: 'bg-gray-600' }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                      <span>{item.sector}</span>
                      <span>{item.weight}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                      <div className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`} style={{ width: item.weight }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center">
                  1 Execution = 500+ Underlying Assets
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}