import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; 
  desc?: string; 
  tag?: string; // Added optional top-right terminal tag
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  tag = "",
}) => {
  return (
    <div
      className={`relative bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 overflow-hidden group ${className}`}
    >
      {/* Decorative Terminal Accent Tag */}
      {tag && (
        <div className="absolute top-0 right-0 p-1.5 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest z-10">
          {tag}
        </div>
      )}

      {/* Card Header */}
      <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white pr-20">
          {title}
        </h3>
        {desc && (
          <p className="mt-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-tighter max-w-[90%]">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="space-y-6">{children}</div>
      </div>
      
      {/* Terminal Corner Detail */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/50 pointer-events-none transition-colors group-hover:border-brand-500"></div>
    </div>
  );
};

export default ComponentCard;