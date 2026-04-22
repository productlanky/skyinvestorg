"use client";

import React from "react";
import Link from "next/link";
import { 
  Terminal, ShieldAlert, Cpu, Radio, Network, Server, ArrowRight 
} from "lucide-react";

export default function SupportPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER PROTOCOL --- */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-white/5 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-[0.2em] z-10">
          SYSTEM_SUPPORT_NODE
        </div>

        <div className="px-6 py-10 md:py-14 relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-brand-500/10 border border-brand-500/20 shrink-0">
               <Radio className="text-brand-500" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">
                Support Protocol
              </h1>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tight mt-2 max-w-xl">
                Establish direct transmission with terminal administrators regarding capital injection, asset deployment, and node security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- TOP OVERVIEW STRIP --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatusNode 
            icon={<Cpu size={16} />}
            label="Priority_Uplink"
            value="Sub 24h Response"
            status="ACTIVE"
            statusColor="text-emerald-500"
        />
        <StatusNode 
            icon={<Network size={16} />}
            label="Live_Transmission"
            value="Mon-Fri · 0900-1700 UTC"
            status="ACTIVE"
            statusColor="text-emerald-500"
        />
        <div className="bg-brand-500/5 border border-brand-500/20 p-5 flex flex-col justify-between">
            <div>
                <p className="text-[9px] font-mono font-bold text-brand-500 uppercase tracking-widest mb-1">Critical_Error?</p>
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Bypass Queue</p>
            </div>
            <Link 
                href="/support/ticket"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
            >
                Initialize Ticket <ArrowRight size={14} />
            </Link>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CONTACT METHODS (Left - 8/12) */}
        <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Terminal size={14} className="text-brand-500" /> Direct Channels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContactNode 
                    title="Encrypted_Email"
                    desc="System issues, KYC verification, and transaction disputes."
                    data="support@logixinvest.com"
                    meta="Latency: ~24 Hours"
                />
                <ContactNode 
                    title="Voice_Comms"
                    desc="Direct audio link with a terminal administrator."
                    data="+1 (888) 555-2193"
                    meta="Operating Hours: 0900-1700 UTC"
                />
            </div>

            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white">Live_Chat_Relay</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">Initiate real-time text protocol with support nodes.</p>
                </div>
                <button 
                    className="shrink-0 px-8 py-4 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-brand-500 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                >
                    Connect
                </button>
            </div>
        </div>

        {/* KNOWLEDGE BASE (Right - 4/12) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6">
            <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                <Server size={14} className="text-brand-500" /> System Index
            </h2>

            <div className="space-y-4 mb-8">
                <IndexItem title="Identity & Security" desc="KYC Protocol, 2FA, Key Rotation" />
                <IndexItem title="Capital Flow" desc="Deposit Routing, Liquidation limits" />
                <IndexItem title="Asset Execution" desc="Yield formulas, Node timing" />
                <IndexItem title="Logistics" desc="Physical asset tracking parameters" />
            </div>

            <Link 
                href="/dashboard/help" 
                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-brand-500 hover:border-brand-500/30 transition-all"
            >
                Access Full Index <ArrowRight size={14} />
            </Link>
        </div>

      </div>

      {/* --- FOOTER NOTICE --- */}
      <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
          <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[9px] font-mono text-amber-700/80 dark:text-amber-500/80 uppercase leading-relaxed max-w-4xl">
              SECURITY_NOTICE: If you detect unauthorized access or transaction anomalies, initiate a priority ticket immediately. Terminal administrators will never request your exit authentication keys.
          </p>
      </div>

    </section>
  );
}

// --- MICRO COMPONENTS ---

function StatusNode({ icon, label, value, status, statusColor }: any) {
    return (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-400">
                    {icon} <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{label}</span>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${statusColor}`}>[{status}]</span>
            </div>
            <p className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-white">{value}</p>
        </div>
    );
}

function ContactNode({ title, desc, data, meta }: any) {
    return (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 flex flex-col justify-between h-full group hover:border-brand-500/30 transition-colors">
            <div className="mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed">{desc}</p>
            </div>
            <div>
                <p className="text-lg font-black text-brand-500 tracking-tighter">{data}</p>
                <p className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{meta}</p>
            </div>
        </div>
    );
}

function IndexItem({ title, desc }: any) {
    return (
        <div className="pb-4 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0 cursor-pointer group">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 group-hover:text-brand-500 transition-colors mb-1">{title}</h4>
            <p className="text-[9px] font-mono text-slate-500 uppercase">{desc}</p>
        </div>
    );
}