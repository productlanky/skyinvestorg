"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Zap } from "lucide-react";

export const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="relative group">
      {/* Institutional Metadata Tag */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-brand-500/10 border border-brand-500/20 text-[7px] font-mono font-bold text-brand-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap pointer-events-none">
        THEME_ENGINE_V1
      </div>

      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center h-10 w-10 shrink-0 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 transition-all hover:border-brand-500 hover:text-brand-500 group/btn"
        aria-label="Toggle System Theme"
      >
        {/* --- SUN ICON (Visible in Dark Mode) --- */}
        <div className="hidden dark:block">
           <Sun size={18} className="group-hover/btn:rotate-45 transition-transform duration-500" />
        </div>

        {/* --- MOON ICON (Visible in Light Mode) --- */}
        <div className="block dark:hidden text-slate-500">
           <Moon size={18} className="group-hover/btn:-rotate-12 transition-transform duration-500" />
        </div>

        {/* Bottom Corner Accent */}
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-brand-500/20 group-hover/btn:bg-brand-500 transition-colors" />
      </button>
    </div>
  );
};