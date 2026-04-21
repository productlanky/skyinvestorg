"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Lock, Monitor, Laptop, Smartphone } from 'lucide-react';

// Centralized navigation data makes it easy to update links later
const navDropdowns = [
  {
    title: 'Trading',
    items: [
      { name: 'Cryptocurrencies', href: '/cryptocurrencies' },
      { name: 'Forex', href: '/forex' },
      { name: 'Shares', href: '/share' },
      { name: 'Indices', href: '/indices' },
      { name: 'ETFs', href: '/etfs' },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Trade', href: '/trade' },
      { name: 'Copy Trading', href: '/copy' },
      { name: 'Automated Trading', href: '/automate' },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Why Us', href: '/why-us' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Legal & Regulation', href: '/regulation' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 relative z-50">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center text-xl font-bold text-white tracking-wider">
              SKY<span className="text-blue-500">INVEST</span>ORG
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8" ref={dropdownRef}>
            {navDropdowns.map((dropdown) => (
              <div key={dropdown.title} className="relative">
                <button 
                  onClick={() => toggleDropdown(dropdown.title)}
                  className="group inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-200 hover:text-white focus:outline-none"
                >
                  <span>{dropdown.title}</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === dropdown.title ? 'rotate-180 text-white' : 'text-gray-400 group-hover:text-gray-300'}`} />
                </button>
                
                {/* Desktop Dropdown Menu */}
                {activeDropdown === dropdown.title && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {dropdown.items.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/education" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-200 hover:text-white">
              Education
            </Link>
            <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-200 hover:text-white">
              Contact
            </Link>
          </nav>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center">
            
            {/* Platform Icons */}
            <div className="flex space-x-1 mr-6 border-r border-gray-700 pr-6">
              <button className="text-gray-400 hover:text-gray-200 p-1" aria-label="Desktop Version">
                <Monitor className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-200 p-1" aria-label="Windows App">
                <Laptop className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-200 p-1" aria-label="Mobile Apps">
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-200 hover:text-white flex items-center text-sm font-medium">
                <Lock className="w-4 h-4 mr-1.5" />
                <span>Log in</span>
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            
            {/* Mobile Dropdowns */}
            {navDropdowns.map((dropdown) => (
              <div key={dropdown.title} className="py-1">
                <button 
                  onClick={() => toggleMobileDropdown(dropdown.title)} 
                  className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-200 hover:bg-gray-800 rounded-md"
                >
                  <span>{dropdown.title}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${activeMobileDropdown === dropdown.title ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mobile Sub-items */}
                {activeMobileDropdown === dropdown.title && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-800/50 rounded-md mt-1">
                    {dropdown.items.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Static Links */}
            <Link href="/education" className="block px-4 py-3 text-base font-medium text-gray-200 hover:bg-gray-800 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Education
            </Link>
            <Link href="/contact" className="block px-4 py-3 text-base font-medium text-gray-200 hover:bg-gray-800 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {/* Mobile Auth Bottom Section */}
            <div className="pt-4 pb-3 mt-4 border-t border-gray-800">
              <div className="flex items-center justify-between px-4 space-x-3">
                <Link href="/login" className="flex-1 flex justify-center items-center text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2.5 rounded-md text-sm font-medium border border-gray-700" onClick={() => setMobileMenuOpen(false)}>
                  <Lock className="w-4 h-4 mr-2" /> Log in
                </Link>
                <Link href="/register" className="flex-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
}