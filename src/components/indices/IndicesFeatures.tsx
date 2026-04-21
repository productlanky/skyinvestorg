import { Network, Activity, Timer, ChevronRight, BarChart4 } from 'lucide-react';

const features = [
  {
    title: 'Macro-Sector Exposure',
    metric: 'RISK: DISTRIBUTED',
    desc: 'Bypass single-stock volatility. Execute positions on entire geopolitical market sectors to achieve instant, systematic diversification.',
    icon: Network
  },
  {
    title: 'Low-Latency Spreads',
    metric: 'SPREADS: RAW / STP',
    desc: 'Trade major benchmarks like the US500 and UK100 with zero-markup pricing and institutional-grade liquidity routing.',
    icon: Activity
  },
  {
    title: 'Continuous Connectivity',
    metric: 'UPTIME: 24/5',
    desc: 'Access global markets outside of standard exchange hours. Capitalize on overlapping Asian, European, and American trading sessions.',
    icon: Timer
  }
];

export default function IndicesFeatures() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Depth */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Content & System Advantages (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <BarChart4 className="w-5 h-5 text-purple-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-purple-400">System Advantages</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
                Systematic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 italic">Market Capture.</span>
              </h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
                SkyInvestOrg&apos;s Indices module is engineered for macro traders. Gain frictionless exposure to the world&apos;s leading economies without the micro-management of individual corporate equities.
              </p>
            </div>

            {/* Advantage Nodes (Replaces grid boxes) */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="group relative p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                     style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                  
                  {/* Neon Left Border on Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all">
                      <feature.icon className="w-6 h-6 text-purple-400" />
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

          {/* RIGHT: Pure CSS Global Session Visualizer (5 Cols) */}
          <div className="lg:col-span-5 relative group perspective-[1500px] hidden md:block">
            <div className="absolute -inset-1 bg-gradient-to-bl from-purple-500/20 to-indigo-500/20 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative bg-[#0D1117] border border-white/10 p-8 backdrop-blur-xl shadow-2xl transform -rotate-y-6 rotate-x-2 transition-transform duration-700"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 0)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Global_Session_Overlap</span>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[8px] font-mono uppercase tracking-widest border border-purple-500/30">
                  LIVE: LONDON / NY
                </div>
              </div>

              {/* Timeline Grid */}
              <div className="space-y-6 relative">
                {/* Timeline Axis Markers */}
                <div className="absolute top-0 bottom-0 left-16 right-0 border-l border-r border-white/5 pointer-events-none">
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-l border-dashed border-white/10"></div>
                </div>
                
                {/* Current Time Scanner */}
                <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-purple-500/50 shadow-[0_0_15px_#A855F7] z-10 pointer-events-none">
                  <div className="absolute -top-1 -translate-x-1/2 px-1 bg-purple-500 text-white text-[8px] font-mono rounded">UTC+0</div>
                </div>

                {[
                  { mkt: 'SYDNEY', start: '10%', width: '30%', active: false },
                  { mkt: 'TOKYO', start: '20%', width: '35%', active: false },
                  { mkt: 'LONDON', start: '45%', width: '40%', active: true },
                  { mkt: 'NEW YORK', start: '55%', width: '35%', active: true },
                ].map((session, i) => (
                  <div key={i} className="flex items-center relative z-20">
                    <span className="w-16 text-[10px] font-mono font-bold text-gray-400 tracking-widest">{session.mkt}</span>
                    <div className="flex-1 h-6 bg-white/[0.02] border border-white/5 rounded-sm relative overflow-hidden">
                      <div 
                        className={`absolute top-0 bottom-0 rounded-sm border ${
                          session.active 
                          ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                          : 'bg-white/5 border-white/10'
                        }`}
                        style={{ left: session.start, width: session.width }}
                      >
                        {session.active && (
                           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Routing: Aggregated</span>
                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                  Connectivity: Optimal
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
