"use client";

import type React from "react";
import { useEffect, useRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Logic to check if click is outside the dropdown AND not on the toggle button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`
        absolute z-[100] right-0 mt-3 
        bg-white dark:bg-[#0D1117] 
        border border-slate-200 dark:border-white/10 
        shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
        animate-in fade-in slide-in-from-top-2 duration-200
        ${className}
      `}
    >
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-500/20" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Terminal Corner Detail */}
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-brand-500/10" />
    </div>
  );
};