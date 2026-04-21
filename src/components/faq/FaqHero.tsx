import Link from 'next/link';
import { Terminal, ChevronRight, Database, Search } from 'lucide-react';

export default function FaqHero() {
  return (
    <section className="relative w-full min-h-[60vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] left-1/4 w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          
          {/* System Path */}
          <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md mb-10">
            <Terminal className="w-4 h-4 text-brand-500" />
            <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <Link href="/" className="hover:text-brand-400 transition-colors">SYS_ROOT</Link>
              <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
              <span className="opacity-70">Support</span>
              <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
              <span className="text-brand-400 font-bold shadow-brand-500">Knowledge_Base</span>
            </div>
          </nav>

          {/* Massive Typography */}
          <div className="relative mb-8">
            <h1 className="absolute -top-12 -left-4 text-[5rem] md:text-[8rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(31, 149, 201, 0.5)' }}>
              DATABASE
            </h1>
            
            <h2 className="relative text-5xl md:text-7xl font-extrabold text-white leading-[0.95] tracking-tighter">
              Institutional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">
                Data Retrieval.
              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10 border-l-2 border-brand-500/50 pl-6">
            Access secure documentation regarding account verification, execution protocols, algorithmic routing, and Tier-1 liquidity mechanics.
          </p>

          {/* System Status Tag */}
          <div className="inline-flex items-center space-x-3 px-4 py-2 border border-brand-500/30 bg-brand-500/10">
            <Database className="w-4 h-4 text-brand-400" />
            <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-[0.3em] animate-pulse">Index Ready</span>
          </div>

        </div>
      </div>
    </section>
  );
}