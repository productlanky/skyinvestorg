"use client";

import React from "react";
import { ProfileType } from "./ProfilePage";
import { User, Mail, Phone, Calendar, Users, Shield, Hash } from "lucide-react";

export default function UserInfoCard({ 
  first_name, 
  last_name, 
  email, 
  phone, 
  created_at, 
  dob, 
  gender, 
  tier_level, 
  tiers 
}: ProfileType) {

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative group overflow-hidden">
      {/* Terminal Tag */}
      <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
          BIO_DATA_NODE
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <User size={16} className="text-brand-500" /> Subject Intelligence
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
            
            <InfoNode 
              label="Legal_First_Name" 
              value={first_name} 
              icon={<User size={12} />} 
            />

            <InfoNode 
              label="Legal_Last_Name" 
              value={last_name} 
              icon={<User size={12} />} 
            />

            <InfoNode 
              label="Communication_Proxy" 
              value={email} 
              icon={<Mail size={12} />} 
              isLowercase 
            />

            <InfoNode 
              label="Mobile_Link" 
              value={phone} 
              icon={<Phone size={12} />} 
            />

            <InfoNode 
              label="Biological_Gender" 
              value={gender} 
              icon={<Users size={12} />} 
            />

            <InfoNode 
              label="Date_Of_Genesis" 
              value={formatFullDate(dob)} 
              icon={<Calendar size={12} />} 
            />

            <InfoNode 
              label="Authorization_Tier" 
              value={tiers?.name ?? `LEVEL_${tier_level}`} 
              icon={<Shield size={12} />} 
              isHighlighted
            />

            <InfoNode 
              label="Registry_Timestamp" 
              value={formatFullDate(created_at)} 
              icon={<Hash size={12} />} 
            />

          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT FOR CLEAN DATA MAPPING ---
function InfoNode({ 
    label, 
    value, 
    icon, 
    isLowercase = false,
    isHighlighted = false 
}: { 
    label: string; 
    value: string | number | undefined; 
    icon: React.ReactNode;
    isLowercase?: boolean;
    isHighlighted?: boolean;
}) {
  return (
    <div className="space-y-1 group/node">
      <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover/node:text-brand-500">
        <span className="opacity-50">{icon}</span> {label}
      </p>
      <p className={`text-xs font-black tracking-wide uppercase 
        ${isLowercase ? "lowercase" : "uppercase"}
        ${isHighlighted ? "text-brand-600 dark:text-brand-400" : "text-slate-800 dark:text-slate-100"}
      `}>
        {value || "UNSPECIFIED"}
      </p>
    </div>
  );
}

// --- UTILITIES ---
function formatFullDate(dateString: string | undefined) {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "INVALID_DATE";

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "TH";
    switch (n % 10) {
      case 1: return "ST";
      case 2: return "ND";
      case 3: return "RD";
      default: return "TH";
    }
  };

  return `${day}${getOrdinal(day)} ${month.toUpperCase()} ${year}`;
}