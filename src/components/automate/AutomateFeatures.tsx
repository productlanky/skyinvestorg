import { Cpu, Network, Zap, ShieldCheck, Activity, Code } from 'lucide-react';

const autoNodes = [
  { title: 'FIX API Direct Link', id: 'API_01', desc: 'Bypass intermediary software. Connect your proprietary algorithms directly to our liquidity pool using the industry-standard FIX 4.4 protocol.', icon: Network },
  { title: 'Free VPS Co-location', id: 'API_02', desc: 'Qualifying algorithmic traders receive complimentary Virtual Private Servers hosted in Equinix NY4, adjacent to our matching engines.', icon: Server }, // Used Server instead of non-existent icon if needed, or Cpu. Assuming Cpu is imported
  { title: 'Unrestricted Rate Limits', id: 'API_03', desc: 'Execute aggressive HFT and scalping strategies without fear of API throttling. Our infrastructure is built to process massive order flow.', icon: Zap },
  { title: 'C# & Python Support', id: 'API_04', desc: 'Extensive documentation and SDKs provided for major quantitative programming languages, ensuring rapid deployment of your logic.', icon: Code },
  { title: 'Zero Intervention', id: 'API_05', desc: 'A pure STP/A-Book model guarantees no dealing desk intervention. Your algorithms execute exactly as programmed with raw interbank spreads.', icon: ShieldCheck },
  { title: 'Backtesting Sandbox', id: 'API_06', desc: 'Stress-test your models against years of high-fidelity tick data within our secure, simulated terminal environment before risking live capital.', icon: Activity }
];

// Fallback for missing icon import in the above mapping
import { Server } from 'lucide-react';

export default function AutomateFeatures() {
  autoNodes[1].icon = Server; // Fixing the icon mapping for VPS
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Cpu className="w-5 h-5 text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Algorithmic Parameters</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Infrastructure <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Specifications.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {autoNodes.map((node, i) => (
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