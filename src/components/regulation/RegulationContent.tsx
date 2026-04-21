import { ShieldAlert, Scale, FileText, CheckCircle2 } from 'lucide-react';

const securityProtocols = [
  {
    title: 'Tier-1 Fund Segregation',
    id: 'SEC_01',
    desc: 'Client funds are entirely segregated from company operational capital. We partner exclusively with Tier-1 global banking institutions to hold client deposits, ensuring they cannot be used to offset corporate liabilities.',
    icon: Scale
  },
  {
    title: 'Negative Balance Protection',
    id: 'SEC_02',
    desc: 'Our risk-management engine automatically liquidates positions before they exceed your account equity. Under no circumstances will you owe the firm more capital than you initially deposited.',
    icon: ShieldAlert
  },
  {
    title: 'Cold Storage Custody',
    id: 'SEC_03',
    desc: 'For digital assets, 98% of client funds are kept offline in air-gapped cold storage. These vaults require multi-signature cryptographic authorization distributed across distinct geographic zones.',
    icon: FileText
  }
];

export default function RegulationContent() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Depth */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Scale className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-amber-400">Core Directives</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 italic">Integrity.</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {securityProtocols.map((protocol, i) => (
            <div key={i} className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Neon Top Border on Hover */}
              <div className="absolute left-0 top-0 right-0 h-[2px] bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
                  <protocol.icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{protocol.id}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{protocol.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">{protocol.desc}</p>
              
              <div className="flex items-center space-x-2 text-[10px] font-mono text-success-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" />
                <span>Protocol Active</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}