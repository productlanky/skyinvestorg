import { Cpu, Network, Zap, Lock, BarChart4, Target } from 'lucide-react';

const coreNodes = [
  { title: 'STP Execution', id: 'NODE_01', desc: 'Straight Through Processing ensures your orders are routed directly to the market. Zero dealing desk intervention. Zero conflict of interest.', icon: Network },
  { title: 'Raw Spreads', id: 'NODE_02', desc: 'Access interbank pricing directly from our liquidity pool. Trade EUR/USD from 0.0 pips during peak market overlap sessions.', icon: Target },
  { title: 'NY4 Co-location', id: 'NODE_03', desc: 'Our trading servers are physically co-located in the Equinix NY4 data center, placing your algorithms microseconds away from major financial hubs.', icon: Cpu },
  { title: 'Absolute Security', id: 'NODE_04', desc: 'Client capital is vaulted in strictly segregated Tier-1 accounts, protected by multi-signature protocols and routine external audits.', icon: Lock },
  { title: 'No Trading Restrictions', id: 'NODE_05', desc: 'Scalp, hedge, and deploy high-frequency EAs without limitation. Our infrastructure is built to handle intensive algorithmic order flow.', icon: Zap },
  { title: 'Deep Market Depth', id: 'NODE_06', desc: 'View Level-2 pricing and execute massive block orders with minimal slippage thanks to aggregated institutional liquidity.', icon: BarChart4 }
];

export default function WhyUsFeatures() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Cpu className="w-5 h-5 text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Infrastructure Nodes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Architected for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Alpha.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreNodes.map((node, i) => (
            <div key={i} className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                 style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
              
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:border-brand-400 group-hover:shadow-[0_0_15px_rgba(31,149,201,0.3)] transition-all">
                  <node.icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-[10px] font-mono text-brand-500/50 uppercase tracking-widest">{node.id}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-brand-400 transition-colors">{node.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}