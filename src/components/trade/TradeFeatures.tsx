import { BarChart4, Crosshair, Zap, Layers, Network, Monitor } from 'lucide-react';

const features = [
  {
    title: 'Advanced Charting Heuristics',
    id: 'FEAT_01',
    desc: 'Access over 80 pre-installed technical indicators, custom drawing tools, and multi-timeframe analysis directly within the browser environment.',
    icon: BarChart4
  },
  {
    title: 'One-Click Execution',
    id: 'FEAT_02',
    desc: 'Bypass confirmation modals. Execute market orders, set limit parameters, and close positions instantly with a single click to capitalize on volatility.',
    icon: Crosshair
  },
  {
    title: 'Level II Market Depth',
    id: 'FEAT_03',
    desc: 'View real-time order book data and aggregated institutional liquidity pools to gauge market sentiment and pinpoint optimal entry blocks.',
    icon: Layers
  },
  {
    title: 'Direct Market Access (DMA)',
    id: 'FEAT_04',
    desc: 'Orders are routed straight to our Tier-1 liquidity providers via Equinix NY4 servers, ensuring raw spreads and absolute minimum slippage.',
    icon: Network
  },
  {
    title: 'Cross-Device Synchronization',
    id: 'FEAT_05',
    desc: 'Chart templates, watchlists, and active orders are synced instantly across your desktop browser, tablet, and mobile trading environments.',
    icon: Monitor
  },
  {
    title: 'Zero-Installation Framework',
    id: 'FEAT_06',
    desc: 'Deploy the full power of a sovereign trading terminal from any modern web browser without downloading heavy executable files or plugins.',
    icon: Zap
  }
];

export default function TradeFeatures() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Depth */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Zap className="w-5 h-5 text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Terminal Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 italic">Specifications.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                 style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
              
              {/* Neon Left Border on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:border-brand-400 group-hover:shadow-[0_0_15px_rgba(31,149,201,0.3)] transition-all">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{feature.id}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-brand-400 transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}