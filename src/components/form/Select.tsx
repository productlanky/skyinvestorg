"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  onValueChange?: (value: string) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "SELECT_OPTION",
  onChange,
  onValueChange,
  className = "",
  name,
  value = "",
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onValueChange?.(selectedValue);
    onChange?.({
      target: {
        name: name || "",
        value: selectedValue,
      },
    });
  };

  return (
    <div className="relative group w-full">
      {/* Terminal Prefix Indicator */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <span className="text-brand-500 font-mono font-bold text-xs animate-pulse">
          {">"}
        </span>
      </div>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`
          h-11 w-full appearance-none px-10 py-2.5 text-sm font-mono tracking-tight
          transition-all duration-200 outline-none
          bg-slate-50 dark:bg-[#0D1117] 
          border border-slate-200 dark:border-white/10 
          text-slate-900 dark:text-white
          focus:border-brand-500 dark:focus:border-brand-500
          focus:bg-white dark:focus:bg-brand-500/5
          disabled:opacity-50 disabled:cursor-not-allowed
          ${!value ? "text-slate-400 dark:text-gray-600" : ""}
          ${className}
        `}
        style={{
          // Optional: matching the clipPath of your buttons for a very sharp look
          // clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
        }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white font-mono"
          >
            {option.label.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Custom Chevron Icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400 group-hover:text-brand-500 transition-colors">
        <ChevronDown size={16} />
      </div>

      {/* Decorative Terminal Corner Detail */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/30 dark:border-brand-500/50 pointer-events-none"></div>
    </div>
  );
};

export default Select;