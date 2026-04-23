"use client";

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Menu, X, ChevronDown, Lock, Activity, Cpu, Zap, ArrowRight } from 'lucide-react';

const navDropdowns = [
  {
    title: 'Markets & Assets',
    items: [
      { name: 'Cryptocurrencies', href: '/cryptocurrencies', desc: 'Digital assets & tokens' },
      { name: 'Forex Pairs', href: '/forex', desc: 'Global currency exchange' },
      { name: 'Global Shares', href: '/share', desc: 'Blue-chip equities' },
      { name: 'Market Indices', href: '/indices', desc: 'Sector benchmarks' },
      { name: 'Thematic ETFs', href: '/etfs', desc: 'Diversified baskets' },
    ],
  },
  {
    title: 'Trading Systems',
    items: [
      { name: 'Web Terminal', href: '/trade', desc: 'Execute orders live' },
      { name: 'Copy Trading', href: '/copy', desc: 'Mirror elite alpha' },
      { name: 'Automated Trading', href: '/automate', desc: 'C# Algorithmic engine' },
    ],
  },
  {
    title: 'Institutional',
    items: [
      { name: 'About the Firm', href: '/about', desc: 'Our liquidity & story' },
      { name: 'The Advantage', href: '/why-us', desc: 'Why traders choose us' },
      { name: 'Global Regulation', href: '/regulation', desc: 'Legal & compliance' },
      { name: 'Knowledge Base', href: '/faq', desc: 'Support & assistance' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          scrolled 
          ? 'py-3 bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-[0_0_20px_rgba(31,149,201,0.4)] group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tighter uppercase leading-none">
                SkyInvest<span className="text-brand-500">Org</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase mt-1">Sovereign_Trading</span>
            </div>
          </Link>

          {/* DESKTOP NAV (Hidden on Mobile) */}
          <nav className="hidden xl:flex items-center space-x-2" ref={dropdownRef}>
            {navDropdowns.map((d) => (
              <div key={d.title} className="relative">
                <button 
                  onMouseEnter={() => setActiveDropdown(d.title)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-1 ${
                    activeDropdown === d.title ? 'text-brand-400 bg-white/5' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{d.title.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>

                {activeDropdown === d.title && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 mt-4 w-[280px] rounded-2xl bg-gray-900 border border-white/10 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                  >
                    {d.items.map((item) => (
                      <Link key={item.name} href={item.href} className="flex flex-col p-4 rounded-xl hover:bg-white/5 group/item">
                        <span className="text-sm font-bold text-white group-hover/item:text-brand-400 uppercase tracking-wide">{item.name}</span>
                        <span className="text-[11px] text-gray-500 mt-1">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* STATUS & AUTH */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 border-r border-white/10 pr-6">
              <Activity className="w-4 h-4 text-success-500" />
              <Cpu className="w-4 h-4 text-brand-400" />
              <Zap className="w-4 h-4 text-warning-400" />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white tracking-[0.2em] uppercase flex items-center">
                <Lock className="w-3 h-3 mr-2 text-brand-500" /> Login
              </Link>
              <Link href="/register" className="px-6 py-2.5 bg-brand-600 rounded-full text-xs font-black text-white uppercase tracking-widest hover:bg-brand-500 transition-all">
                Join Now
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN PORTAL */}
      {mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[10000] xl:hidden flex flex-col bg-[#05070a] overflow-hidden">
          
          {/* Portal Header */}
          <div className="p-6 flex items-center justify-between border-b border-white/5 relative z-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-black italic">S</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Sovereign_Navigation</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="p-3 rounded-xl bg-white/5 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Content */}
          <div className="flex-1 overflow-y-auto relative px-8 py-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <nav className="relative z-10 space-y-16">
              {navDropdowns.map((section, sIdx) => (
                <div 
                  key={section.title} 
                  className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                  style={{ animationDelay: `${sIdx * 150}ms` }}
                >
                  <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.5em] flex items-center">
                    <span className="w-4 h-[1px] bg-brand-500 mr-3"></span>
                    {section.title}
                  </h3>
                  
                  <div className="grid gap-8">
                    {section.items.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        className="group flex flex-col"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-extrabold text-white tracking-tighter group-active:text-brand-400 transition-colors">
                            {item.name}
                          </span>
                          <ArrowRight className="w-5 h-5 text-brand-500 opacity-30 group-active:opacity-100" />
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 font-light tracking-wide uppercase italic">
                          {item.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Static Links */}
              <div className="pt-8 border-t border-white/5 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: '600ms' }}>
                 <Link href="/education" className="block text-3xl font-extrabold text-white tracking-tighter" onClick={() => setMobileMenuOpen(false)}>Academy</Link>
                 <Link href="/contact" className="block text-3xl font-extrabold text-white tracking-tighter" onClick={() => setMobileMenuOpen(false)}>Contact Support</Link>
              </div>
            </nav>
          </div>

          {/* Action Footer */}
          <div className="p-8 bg-gray-900 border-t border-white/5 grid grid-cols-2 gap-4 relative z-20">
            <Link 
              href="/login" 
              className="flex items-center justify-center py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="flex items-center justify-center py-5 bg-brand-600 rounded-2xl text-white font-black uppercase tracking-widest text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Account
            </Link>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}