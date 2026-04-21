import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react';

const directives = [
  {
    title: 'Absolute Alignment',
    id: 'DIR_01',
    desc: 'We operate a pure Straight Through Processing (STP) model. We do not run a B-Book, and we do not trade against our clients. Your profitability is the only metric that scales our operations.',
    icon: ShieldCheck
  },
  {
    title: 'Latency Eradication',
    id: 'DIR_02',
    desc: 'In algorithmic trading, milliseconds dictate alpha. We continually reinvest in Equinix NY4 and LD4 co-location servers to maintain sub-12ms execution speeds globally.',
    icon: Zap
  },
  {
    title: 'Cryptographic Security',
    id: 'DIR_03',
    desc: 'Client sovereignty requires absolute asset protection. All capital is segregated in Tier-1 banking institutions, and digital assets are vaulted in multi-signature cold storage.',
    icon: Lock
  },
  {
    title: 'Borderless Liquidity',
    id: 'DIR_04',
    desc: 'Capital should flow without friction. We aggregate pricing from 25+ prime brokers to deliver raw, un-manipulated spreads across Forex, Equities, Crypto, and Indices.',
    icon: Globe
  }
];

export default function OurValues() {
  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Directives.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {directives.map((dir, i) => (
            <div key={i} className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Neon Top Border on Hover */}
              <div className="absolute left-0 top-0 right-0 h-[2px] bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(31,149,201,0.2)] transition-all">
                  <dir.icon className="w-6 h-6 text-brand-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{dir.id}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{dir.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{dir.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}