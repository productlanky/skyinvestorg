import Link from 'next/link';
import { Terminal, ChevronRight, ShieldCheck, Lock } from 'lucide-react';

export default function RegulationHero() {
  return (
    <section className="relative w-full min-h-[75vh] bg-[#020305] overflow-hidden flex items-center pt-24 pb-16">
      
      {/* BACKGROUND & TEXTURES */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Massive Ambient Glow - Amber for Security/Treasury */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-800/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* CSS Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: COPY & MODULES (7 Columns) */}
          <div className="lg:col-span-7 space-y-10 relative">
            
            {/* System Path */}
            <nav className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <Terminal className="w-4 h-4 text-amber-500" />
              <div className="flex items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-amber-400 transition-colors">SYS_ROOT</Link>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="opacity-70">Corporate</span>
                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                <span className="text-amber-400 font-bold shadow-amber-500">Compliance_Node</span>
              </div>
            </nav>

            {/* Massive Typography */}
            <div className="relative">
              <h1 className="absolute -top-10 -left-4 text-[5rem] md:text-[9rem] font-black text-transparent opacity-5 select-none" style={{ WebkitTextStroke: '1px rgba(245, 158, 11, 0.5)' }}>
                SECURITY
              </h1>
              
              <h2 className="relative text-5xl md:text-7xl xl:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter">
                Sovereign <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 italic">
                  Regulatory Vault.
                </span>
              </h2>
            </div>

            {/* Definition Data Module */}
            <div className="relative p-6 border-l-2 border-amber-500 bg-amber-500/5 backdrop-blur-sm max-w-2xl"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 px-2 py-1 bg-amber-500/20 text-amber-400 text-[8px] font-mono uppercase tracking-widest">Legal_Directive</div>
              <p className="text-lg text-gray-300 font-light leading-relaxed mt-2">
                SkyInvestOrg operates under strict multi-jurisdictional oversight. Client capital is safeguarded through mandatory Tier-1 bank segregation, cryptographic reserve proofs, and autonomous external auditing protocols.
              </p>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link 
                href="/register" 
                className="group relative flex items-center justify-center h-14 px-8 bg-amber-600 text-[#05070a] w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:bg-amber-500 transition-colors"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="relative z-10 text-xs font-black uppercase tracking-widest flex items-center">
                  Open Secured Account <ShieldCheck className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: SECURITY HUD (5 Columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            <div className="relative bg-[#0D1117]/80 border border-white/10 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Live_Security_Telemetry</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
              </div>

              {/* Data Grid */}
              <div className="space-y-6">
                <div className="p-4 bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Capital Segregation Status</p>
                  <p className="text-xl font-bold text-white tracking-wide text-success-400">100% ISOLATED</p>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Encryption Protocol</p>
                  <p className="text-xl font-mono font-bold text-white tracking-wide">AES-256 / RSA-4096</p>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Last External Audit</p>
                  <p className="text-xl font-mono font-bold text-white tracking-wide">T-MINUS 14 DAYS</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}