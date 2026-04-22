"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Phone } from "lucide-react";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange?: (phoneNumber: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "000 000 0000",
  onChange,
}) => {
  // SET DEFAULT TO +1
  const [selectedCountry, setSelectedCountry] = useState<string>("+1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Sync state if the parent provides a new specific country code
  useEffect(() => {
    if (countries.length > 0 && countries[0].code !== "" && countries[0].code !== selectedCountry) {
      setSelectedCountry(countries[0].code);
    }
  }, [countries]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setSelectedCountry(newCountryCode);
    if (onChange) onChange(`${newCountryCode}${phoneNumber}`);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhoneNumber(val);
    if (onChange) onChange(`${selectedCountry}${val}`);
  };

  return (
    <div className="relative group w-full">
      {/* Terminal Prefix Indicator */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <span className="text-brand-500 font-mono font-bold text-xs animate-pulse">
          {">"}
        </span>
      </div>

      <div className="flex items-center h-11 w-full bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 transition-all duration-200 group-within:border-brand-500 dark:group-within:bg-brand-500/5">
        
        {/* Country Selector Segment */}
        <div className="relative flex items-center h-full border-r border-slate-200 dark:border-white/10 px-2 ml-8">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none bg-transparent h-full pl-2 pr-6 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 outline-none cursor-pointer z-10"
          >
            {/* If no countries are loaded yet, show the default +1 */}
            {countries.length === 0 || (countries.length === 1 && countries[0].code === "") ? (
              <option value="+1" className="bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white">+1</option>
            ) : (
              countries.map((country) => (
                <option key={country.code} value={country.code} className="bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white">
                  {country.code}
                </option>
              ))
            )}
          </select>
          <ChevronDown size={12} className="absolute right-2 text-slate-400 pointer-events-none" />
        </div>

        {/* Number Input Segment */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className="flex-1 h-full bg-transparent px-4 text-sm font-mono text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 outline-none"
        />

        <div className="pr-4 text-slate-300 dark:text-gray-700 group-within:text-brand-500/50 transition-colors">
          <Phone size={14} />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/30 dark:border-brand-500/50 pointer-events-none"></div>
    </div>
  );
};

export default PhoneInput;