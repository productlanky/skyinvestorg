"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean;
  error?: boolean;
  hint?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", id, name, placeholder, className = "", success, error, hint, disabled, readOnly, ...props }, ref) => {
    
    // Base Terminal Styles
    const baseClasses = `
      h-11 w-full px-10 py-2.5 text-sm font-mono transition-all duration-200 outline-none
      bg-slate-50 dark:bg-[#0D1117] 
      border transition-colors
      placeholder:text-slate-300 dark:placeholder:text-gray-700
      disabled:opacity-50 disabled:cursor-not-allowed
      
      /* Autofill Hack: Forces background to match our terminal theme */
      autofill:shadow-[inset_0_0_0px_1000px_#f8fafc] 
      dark:autofill:shadow-[inset_0_0_0px_1000px_#0D1117]
      autofill:text-fill-slate-900
      dark:autofill:text-fill-white
    `;

    // Dynamic State Styles
    const stateClasses = error
      ? "border-red-500 text-red-600 dark:text-red-400 focus:border-red-600"
      : success
      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 focus:border-emerald-600"
      : "border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-brand-500/5";

    return (
      <div className="w-full space-y-1.5 group relative">
        
        {/* Terminal Prefix Indicator */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
          <span className={`font-mono font-bold text-xs animate-pulse ${
            error ? "text-red-500" : success ? "text-emerald-500" : "text-brand-500"
          }`}>
            {">"}
          </span>
        </div>

        <div className="relative">
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder?.toUpperCase() || "ENTRY_NODE"}
            className={`${baseClasses} ${stateClasses} ${className}`}
            {...props}
          />

          {/* Decorative Terminal Corner Detail */}
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 pointer-events-none transition-colors ${
            error ? "border-red-500/50" : success ? "border-emerald-500/50" : "border-brand-500/30 dark:border-brand-500/50"
          }`}></div>
        </div>

        {/* Feedback / Hint Text */}
        {hint && (
          <p className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${
            error ? "text-red-500" : success ? "text-emerald-500" : "text-slate-400 dark:text-gray-500"
          }`}>
            {error ? `[!] ERROR: ${hint}` : success ? `[*] SUCCESS: ${hint}` : `// ${hint}`}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;