import Link from 'next/link';
import { Terminal, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function WhyUsExpertSupport() {
  return (
    <section className="py-32 bg-[#020305] relative overflow-hidden">
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-600/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Support Console */}
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0 opacity-30 group-hover:opacity-100 transition-opacity duration-1000"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}></div>
          
          <div className="relative bg-[#0D1117]/90 backdrop-blur-2xl p-8 md:p-16 flex flex-col items-center text-center shadow-2xl"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
            
            {/* Top HUD Bar */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-8 py-3 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center space-x-2">
                <Cpu className="w-3 h-3 text-brand-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">Module_Client_Engineering</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-1 bg-brand-500/30"></div>
                <div className="w-4 h-1 bg-brand-500/60"></div>
                <div className="w-4 h-1 bg-brand-500"></div>
              </div>
            </div>

            <div className="mt-8 relative w-full max-w-3xl">
              <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 border border-brand-500/30 bg-brand-500/10">
                <Terminal className="w-4 h-4 text-brand-400" />
                <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-[0.3em] animate-pulse">Engineers Online</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-6">
                Institutional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 italic">Support Desk.</span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                When you trade at this level, standard customer service is insufficient. Connect directly with our network engineers and trading specialists for immediate resolution.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/contact" 
                  className="group relative flex items-center justify-center h-16 px-10 bg-brand-600 w-full sm:w-auto overflow-hidden hover:bg-brand-500 transition-colors shadow-[0_0_40px_rgba(31,149,201,0.3)]"
                  style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                >
                  <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center">
                    Initialize Comms Link <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center space-x-2 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                <ShieldAlert className="w-3 h-3 text-brand-500/50" />
                <span>Encrypted Channel // Global Response Time: &lt; 5 Mins</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}