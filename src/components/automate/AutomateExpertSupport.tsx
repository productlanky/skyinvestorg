import Link from 'next/link';
import { Terminal, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function AutomateExpertSupport() {
  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative group perspective-[1500px]">
          
          <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0 opacity-30 group-hover:opacity-100 transition-opacity duration-1000"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}></div>
          
          <div className="relative bg-[#0D1117]/90 backdrop-blur-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-8"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Cpu className="w-4 h-4 text-brand-400" />
                <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-[0.3em] animate-pulse">Quant Engineers Online</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase mb-4">
                API Integration <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 italic">Support.</span>
              </h2>
              <p className="text-sm text-gray-400 font-light max-w-xl leading-relaxed">
                Require direct assistance configuring your FIX API endpoints or structuring C# execution logic? Establish a secure link with our infrastructure team.
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center">
              <Link 
                href="/contact" 
                className="group relative flex items-center justify-center h-14 px-8 bg-brand-600 w-full overflow-hidden hover:bg-brand-500 transition-colors shadow-[0_0_40px_rgba(31,149,201,0.3)] mb-4"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Open Comm Channel <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <div className="flex items-center space-x-2 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                <ShieldAlert className="w-3 h-3 text-brand-500/50" />
                <span>SLA: &lt; 2 Hours</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}