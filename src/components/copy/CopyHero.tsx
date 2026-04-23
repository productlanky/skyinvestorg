import Link from 'next/link';
import { Terminal, ChevronRight, Activity, Network, Users } from 'lucide-react';

export default function CopyHero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BRAND BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-400/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY & MODULES (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Path */}
            <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Terminal className="w-4 h-4 text-brand-500" />
              <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-brand-400 transition-colors">SYS_ROOT</Link>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="opacity-70">Technology</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-brand-400 font-bold shadow-brand-500">Alpha_Replication</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[5rem] md:text-[10rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
                MIRROR
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Algorithmic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">
                  Trade Replication.
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mt-2 border-l-2 border-brand-500 pl-6 max-w-2xl">
              Automate your capital deployment. The SkyInvestOrg Copy Protocol allows you to mirror the exact executions of elite quantitative strategists and proven portfolio managers in real-time with sub-millisecond synchronization.
            </p>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-brand-600 w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(31,149,201,0.2)] hover:bg-brand-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                  Create Account <Network className="ml-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: REPLICATION HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            <div className="relative bg-[#0D1117]/90 border border-white/10 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Node_Synchronization</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
              </div>

              {/* Pure CSS Sync Visualizer */}
              <div className="relative h-48 w-full border border-white/5 bg-white/[0.01] flex items-center justify-center overflow-hidden mb-6">
                 {/* Master Node */}
                 <div className="absolute top-1/2 left-10 -translate-y-1/2 w-12 h-12 bg-brand-500/20 border border-brand-500 flex items-center justify-center rounded z-20 shadow-[0_0_20px_#1f95c9]">
                   <Terminal className="w-5 h-5 text-brand-400" />
                   <span className="absolute -top-6 text-[8px] font-mono text-brand-400 uppercase tracking-widest">Master</span>
                 </div>
                 
                 {/* Connection Lines & Data Packets */}
                 <div className="absolute top-1/2 left-22 right-16 -translate-y-1/2 h-[1px] bg-white/10">
                    <div className="absolute top-0 left-0 h-[2px] w-8 bg-brand-400 shadow-[0_0_8px_#1f95c9] animate-[shimmer_1s_infinite]"></div>
                    <div className="absolute top-[-40px] left-0 h-[1px] w-full bg-white/5 -rotate-6"></div>
                    <div className="absolute top-[40px] left-0 h-[1px] w-full bg-white/5 rotate-6"></div>
                 </div>

                 {/* Slave Nodes */}
                 <div className="absolute top-1/4 right-10 -translate-y-1/2 w-8 h-8 bg-white/5 border border-white/20 flex items-center justify-center rounded z-20">
                   <Users className="w-3 h-3 text-gray-400" />
                 </div>
                 <div className="absolute top-1/2 right-10 -translate-y-1/2 w-8 h-8 bg-brand-500/10 border border-brand-500/50 flex items-center justify-center rounded z-20">
                   <Users className="w-3 h-3 text-brand-400" />
                   <span className="absolute -right-10 text-[8px] font-mono text-success-400 uppercase">SYNC</span>
                 </div>
                 <div className="absolute top-3/4 right-10 -translate-y-1/2 w-8 h-8 bg-white/5 border border-white/20 flex items-center justify-center rounded z-20">
                   <Users className="w-3 h-3 text-gray-400" />
                 </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/[0.02] border border-white/5 p-3">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Latency Delta</span>
                  <span className="block text-lg font-mono font-bold text-white">&lt; 2ms</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-3">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Volume Copied</span>
                  <span className="block text-lg font-mono font-bold text-white">$1.2B<span className="text-xs text-gray-500">/mo</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}