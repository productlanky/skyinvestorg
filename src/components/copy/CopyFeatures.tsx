import { Cpu, Network, Zap, ShieldCheck, Activity, BarChart4 } from 'lucide-react';

const copyNodes = [
  { title: 'Sub-Millisecond Sync', id: 'SYNC_01', desc: 'Our replication engine is hardcoded into the NY4 matching servers, ensuring your account mirrors the master execution with virtually zero latency delta.', icon: Zap },
  { title: 'Proportional Scaling', id: 'SYNC_02', desc: 'Trade sizes are dynamically calculated based on your account equity relative to the master portfolio, ensuring perfectly balanced risk distribution.', icon: BarChart4 },
  { title: 'Autonomous Risk Capping', id: 'SYNC_03', desc: 'Set hard stops, max drawdown limits, and individual asset exclusions. You retain absolute sovereign control over your capital at all times.', icon: ShieldCheck },
  { title: 'Vetted Alpha Providers', id: 'SYNC_04', desc: 'Access a curated leaderboard of quantitative strategists. Every master account is verified for real capital, live execution history, and strict drawdown metrics.', icon: Network },
  { title: 'Instant Detachment', id: 'SYNC_05', desc: 'Unbind your capital from any strategy instantaneously. Close mirrored positions or take manual control of the execution with a single click.', icon: Activity },
  { title: 'Algorithmic Compatibility', id: 'SYNC_06', desc: 'The replication engine supports complex EA logic, including partial closes, trailing stops, and grid management executed by the master node.', icon: Cpu }
];

export default function CopyFeatures() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Cpu className="w-5 h-5 text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Replication Parameters</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Specifications.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {copyNodes.map((node, i) => (
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