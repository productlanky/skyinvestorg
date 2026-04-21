import { Terminal, ArrowRight, ShieldCheck, Database, Server } from 'lucide-react';
import Link from 'next/link';

export default function WhyUsAbout() {
  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Pure CSS "Core Architecture" Visual */}
          <div className="relative h-[500px] flex items-center justify-center group perspective-[1500px] hidden md:flex">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/10 to-indigo-600/10 blur-3xl rounded-full"></div>
            
            {/* Central Node */}
            <div className="relative z-20 w-32 h-32 rounded bg-[#0D1117] border border-brand-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(31,149,201,0.2)] transform rotate-y-12 rotate-x-6 transition-transform duration-700"
                 style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
              <Server className="w-8 h-8 text-brand-400 mb-2" />
              <span className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Sky_Engine</span>
            </div>
            
            {/* Connecting Lines & LP Satellites */}
            <div className="absolute inset-0 z-10 flex items-center justify-center transform rotate-y-12 rotate-x-6">
              {/* Pulsing Data Lines */}
              <div className="absolute w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
              <div className="absolute h-[80%] w-[1px] bg-gradient-to-b from-transparent via-brand-500/50 to-transparent"></div>
              
              {/* Floating Nodes */}
              <div className="absolute top-10 left-20 bg-[#0D1117] border border-white/10 px-4 py-2 flex items-center space-x-2 animate-float">
                <Database className="w-3 h-3 text-gray-500" />
                <span className="text-[9px] font-mono text-white">Tier-1 Bank Alpha</span>
              </div>
              <div className="absolute bottom-20 right-10 bg-[#0D1117] border border-white/10 px-4 py-2 flex items-center space-x-2 animate-float" style={{ animationDelay: '1.5s' }}>
                <Database className="w-3 h-3 text-gray-500" />
                <span className="text-[9px] font-mono text-white">Dark Pool Omega</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Corporate Manifesto */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 mb-2">
              <Terminal className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Corporate Directive</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-[1.1]">
              Democratizing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Institutional Flow.</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg border-l-2 border-white/10 pl-6">
              <p>
                The financial markets were built on an asymmetry of information and execution speed. Retail traders operate on B-Book models, fighting hidden markups and manufactured slippage.
              </p>
              <p>
                SkyInvestOrg was founded to shatter this paradigm. We grant individual traders the exact same infrastructure utilized by quantitative hedge funds. Direct routing to Tier-1 liquidity, zero-interference execution, and raw fractional pricing.
              </p>
            </div>

            <div className="pt-6">
              <Link href="/about" className="group inline-flex items-center space-x-2 text-brand-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                <span>Access Full Corporate History</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}