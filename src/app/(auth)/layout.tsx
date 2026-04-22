"use client";

import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";  
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity, ShieldCheck, Cpu, BarChart4 } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-white dark:bg-[#020305] h-screen" />;

  return (
    <ThemeProvider>
      <div className="relative bg-white dark:bg-[#020305] text-slate-900 dark:text-white h-screen overflow-hidden transition-colors duration-300">
        
        <div className="relative flex flex-col lg:flex-row w-full h-full justify-center">
          
          {/* LEFT: Auth Form Container (Independent Scroll) */}
          <div className="w-full lg:w-1/2 h-full overflow-y-auto overscroll-behavior-y-none relative z-20 no-scrollbar">
             <div className="w-full max-w-md mx-auto py-20 px-6 relative z-10 min-h-full flex flex-col justify-center">
               {children}
             </div>
          </div>

          {/* RIGHT: Institutional Branding Area */}
          <div className="hidden lg:flex w-1/2 h-full relative flex-col justify-center items-center p-12 border-l border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0D1117] z-10">
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute opacity-10 dark:opacity-20 pointer-events-none"><GridShape /></div>

            <div className="w-full max-w-lg relative z-20">
              
              {/* --- RESTORED LANDING PAGE LOGO --- */}
              <Link href="/" className="flex items-center space-x-3 group mb-12">
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-[0_0_20px_rgba(31,149,201,0.4)] group-hover:scale-110 transition-transform">
                  <span className="text-white font-black text-xl italic">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                    SkyInvest<span className="text-brand-500">Org</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 tracking-[0.3em] uppercase mt-1">
                    Sovereign_Trading
                  </span>
                </div>
              </Link>
              {/* ---------------------------------- */}

              <div className="space-y-8">
                 <div className="inline-flex items-center space-x-3 px-4 py-2 border border-brand-500/20 dark:border-brand-500/30 bg-white dark:bg-brand-500/10">
                    <Activity className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em] animate-pulse">Gateway_Node_Active</span>
                 </div>

                 <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter mb-4 leading-[1.1]">
                       Initialize Institutional <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600 dark:from-brand-400 dark:to-indigo-500 italic">Capital Routing.</span>
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-light leading-relaxed border-l-2 border-brand-500/50 pl-5">
                       SkyInvestOrg provides sovereign traders with direct market access, raw spreads, and institutional-grade algorithmic execution.
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-5 group hover:border-brand-500/30 hover:shadow-md dark:hover:shadow-none transition-all">
                       <Cpu className="w-5 h-5 text-brand-600 dark:text-gray-600 mb-3 group-hover:text-brand-500 transition-colors" />
                       <p className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Execution Speed</p>
                       <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-1">&lt; 12ms</p>
                    </div>
                    
                    <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-5 group hover:border-brand-500/30 hover:shadow-md dark:hover:shadow-none transition-all">
                       <BarChart4 className="w-5 h-5 text-brand-600 dark:text-gray-600 mb-3 group-hover:text-brand-500 transition-colors" />
                       <p className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Liquidity Depth</p>
                       <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-1">25+ LPs</p>
                    </div>
                 </div>

                 <div className="bg-slate-100 dark:bg-[#020305] border-l-2 border-brand-500 p-5 relative mt-4 shadow-inner dark:shadow-none">
                    <div className="absolute top-0 right-0 px-2 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[8px] font-mono uppercase tracking-widest border-b border-l border-brand-500/20 dark:border-brand-500/30">
                      Compliance_Log
                    </div>
                    <div className="flex items-start space-x-3 mt-2">
                       <ShieldCheck className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                       <p className="text-xs text-slate-600 dark:text-gray-400 font-mono leading-relaxed">
                         <span className="font-bold text-slate-900 dark:text-white">Security Verified:</span> Multi-signature vault storage and Tier-1 bank segregation active.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}