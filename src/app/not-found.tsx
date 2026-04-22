'use client';
import Link from 'next/link';
import { Terminal, AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#020305] overflow-hidden p-6 z-1">

      {/* Abstract Grid & Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Core Glow (Strictly Brand Blue) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="w-full max-w-4xl relative z-10">

        {/* The Error Console */}
        <div className="relative group perspective-[1500px]">

          {/* Animated Border Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0 opacity-50 transition-opacity duration-1000"
            style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}></div>

          <div className="relative bg-[#0D1117]/90 backdrop-blur-2xl p-8 md:p-16 flex flex-col items-center text-center shadow-2xl"
            style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>

            {/* Top HUD Bar */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-8 py-3 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3 h-3 text-brand-500 animate-pulse" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">Fatal_Exception_404</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-1 bg-brand-500/30"></div>
                <div className="w-4 h-1 bg-brand-500/60"></div>
                <div className="w-4 h-1 bg-brand-500"></div>
              </div>
            </div>

            <div className="mt-8 relative w-full flex flex-col items-center">

              {/* Massive 404 Typography */}
              <div className="relative mb-8 flex justify-center w-full">
                <h1 className="text-[8rem] md:text-[12rem] font-black text-transparent opacity-10 select-none leading-none"
                  style={{ WebkitTextStroke: '2px rgba(31, 149, 201, 0.8)' }}>
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex items-center space-x-3 px-4 py-2 border border-brand-500/30 bg-[#020305]">
                    <Terminal className="w-4 h-4 text-brand-400" />
                    <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-[0.3em] animate-pulse">Orphaned Protocol</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-6">
                Directory <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 italic">Unreachable.</span>
              </h2>

              <p className="text-sm md:text-base text-gray-400 font-mono max-w-xl mx-auto mb-10 leading-relaxed border-l-2 border-brand-500/50 pl-4 text-left bg-white/[0.02] p-4">
                <span className="text-brand-400">ERR_NO_ROUTE:</span> The requested execution path does not exist within the current server environment. The targeted asset or page may have been deprecated, relocated, or purged from the database.
              </p>

              {/* Action Buttons Matrix */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => router.back()}
                  className="group relative flex items-center justify-center h-14 px-10 bg-brand-600 w-full sm:w-auto overflow-hidden hover:bg-brand-500 transition-colors shadow-[0_0_30px_rgba(31,149,201,0.2)]"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  <ArrowLeft className="mr-3 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                    Return to SYS_ROOT
                  </span>
                </button>
              </div>

              {/* Security Warning Footer */}
              <div className="mt-12 pt-6 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between text-[9px] font-mono text-gray-600 uppercase tracking-widest gap-4">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-3 h-3 text-brand-500/50" />
                  <span>Connection Terminated</span>
                </div>
                <div>
                  &copy; {currentYear} SkyInvestOrg.
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}