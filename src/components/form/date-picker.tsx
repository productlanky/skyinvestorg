"use client";

import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Label from './Label';
import { Calendar } from 'lucide-react'; // Using Lucide to match the rest of the app
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id?: string; // Made optional
  name?: string; // Added to capture RHF field name
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: (date: string) => void;
  defaultDate?: DateOption;
  value?: string;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  name,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
  value,
}: PropsType) {
  // Fallback to name if id is missing
  const inputId = id || name || "date-picker-node";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const flatPickr = flatpickr(inputRef.current, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate: value || defaultDate,
      // Handle the "light/dark" calendar theme automatically
      onOpen: (selectedDates, dateStr, instance) => {
        const isDark = document.documentElement.classList.contains('dark');
        instance.calendarContainer.classList.toggle('dark-calendar', isDark);
      },
      onChange: (selectedDates) => {
        if (onChange) {
          const dateStr = selectedDates?.[0] ? selectedDates[0].toISOString().split("T")[0] : "";
          onChange(dateStr);
        }
      },
    });

    return () => {
      flatPickr?.destroy();
    };
  }, [mode, onChange, defaultDate, value]);

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label htmlFor={inputId} className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest">
          {label}
        </Label>
      )}
      <div className="relative group">
        {/* Terminal Input Styling */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
        </div>
        
        <input
          id={inputId}
          ref={inputRef}
          name={name}
          placeholder={placeholder || "YYYY-MM-DD"}
          defaultValue={value}
          readOnly // Flatpickr prefers controlled inputs via its UI
          className="w-full bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm py-3 pl-10 pr-10 focus:outline-none focus:border-brand-500 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-700"
        />
        
        {/* Decorative Terminal Corner */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/30 dark:border-brand-500/50"></div>

        <span className="absolute text-slate-400 dark:text-gray-500 right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-brand-500 transition-colors">
          <Calendar size={18} />
        </span>
      </div>
    </div>
  );
}