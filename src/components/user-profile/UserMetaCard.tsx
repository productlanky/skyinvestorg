"use client";

import React from "react";
import Image from "next/image";
import { ProfileType } from "./ProfilePage";
import { MapPin, Mail, ShieldCheck, Zap } from "lucide-react";

export default function UserMetaCard({ 
  first_name, 
  last_name, 
  email, 
  state, 
  country, 
  photo_url,
  tier_level 
}: ProfileType) {

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative group overflow-hidden">
      {/* Institutional Decoration */}
      <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">
          NODE_IDENTITY_V1
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
        
        {/* --- SHARP AVATAR FRAME --- */}
        <div className="relative group/avatar">
          <div className="w-24 h-24 border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-center overflow-hidden relative">
            {photo_url ? (
              <Image
                width={96}
                height={96}
                src={photo_url}
                alt="user_node"
                className="object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-500"
              />
            ) : (
              <span className="text-3xl font-black text-slate-300 dark:text-white/10 font-mono uppercase">
                {first_name?.charAt(0)}{last_name?.charAt(0)}
              </span>
            )}
            
            {/* Scanning Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none" />
          </div>
          
          {/* Active Status Badge */}
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest border-2 border-white dark:border-[#0D1117]">
            Active
          </div>
        </div>

        {/* --- IDENTITY DATA --- */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              {first_name} <span className="text-brand-500">{last_name}</span>
            </h1>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                LVL_{tier_level || 1}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group/link cursor-pointer">
              <Mail size={12} className="group-hover/link:text-brand-500 transition-colors" />
              <span className="text-[11px] font-mono font-medium lowercase tracking-tight group-hover/link:text-slate-900 dark:group-hover/link:text-white transition-colors">
                {email}
              </span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <MapPin size={12} />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                {state}, {country}
              </span>
            </div>
          </div>

          {/* Quick System Tags */}
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
             <SystemTag icon={<ShieldCheck size={10}/>} text="AUTH_VERIFIED" />
             <SystemTag icon={<Zap size={10}/>} text="FAST_WITHDRAWAL_ENABLED" color="text-amber-500" />
          </div>
        </div>
      </div>

      {/* Decorative Bottom Corner */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-t border-r border-slate-200 dark:border-white/10"></div>
    </div>
  );
}

// --- LOCAL SUB-COMPONENT ---
function SystemTag({ icon, text, color = "text-brand-500" }: { icon: React.ReactNode, text: string, color?: string }) {
    return (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
            <span className={color}>{icon}</span>
            <span className="text-[8px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{text}</span>
        </div>
    )
}