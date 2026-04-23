import Link from 'next/link';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950 pt-20 pb-16">
      {/* Background Effects: 
        Using the Deep Indigo/Cyber-Luxe aesthetic with subtle electric blue and emerald glows 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950 opacity-60"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-success-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDBWMHptMjAgMjB2MjBoMjBWMjBIMjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-md">
              <span className="flex h-2 w-2 relative mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide text-brand-300 uppercase">
                Institutional Grade Trading
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-success-400">
                Absolute Precision
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-2xl text-xl text-gray-400 leading-relaxed font-light">
              Execute strategies across Forex, Crypto, and Equities with zero-pip spreads, deep liquidity, and state-of-the-art algorithmic tools.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Link href="/register" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-brand-600 rounded-xl hover:bg-brand-500 hover:shadow-[0_0_40px_rgba(31,149,201,0.4)] hover:-translate-y-1">
                Open Live Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white backdrop-blur-md">
                Login
              </Link>
            </div>

            {/* Quick Stats/Trust beneath CTAs */}
            <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-white/10 w-full">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-success-400" />
                <span className="text-sm font-medium text-gray-400">FSA Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-warning-400" />
                <span className="text-sm font-medium text-gray-400">&lt;12ms Execution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphism Bento Grid Mockup */}
          <div className="lg:col-span-5 relative w-full perspective-[1000px]">
            <div className="relative w-full max-w-lg mx-auto transition-transform duration-1000 ease-out transform hover:rotate-y-[-5deg] hover:rotate-x-[2deg] rotate-y-[-12deg] rotate-x-[4deg]">
              
              {/* Decorative Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-success-600 rounded-3xl blur-[80px] opacity-30"></div>
              
              {/* Main Bento Card */}
              <div className="relative rounded-3xl border border-white/10 bg-gray-900/60 backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-4">
                
                {/* Top Row: Mini Chart & Balance */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Balance Card */}
                  <div className="bg-gray-800/80 rounded-2xl p-5 border border-white/5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Equity</p>
                    <p className="text-2xl font-bold text-white">$124,592.80</p>
                    <div className="flex items-center mt-2 text-success-400 text-sm font-medium">
                      <Activity className="w-4 h-4 mr-1" />
                      +2.4%
                    </div>
                  </div>
                  {/* Asset Card */}
                  <div className="bg-gray-800/80 rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-white">EUR/USD</p>
                          <p className="text-xs text-gray-400">Forex</p>
                        </div>
                        <span className="px-2 py-1 bg-success-500/20 text-success-400 text-xs rounded-md font-bold">BUY</span>
                     </div>
                     <p className="text-xl font-mono font-medium text-white mt-3">1.08425</p>
                  </div>
                </div>

                {/* Bottom Row: Large Chart Area */}
                <div className="bg-gray-800/80 rounded-2xl p-5 border border-white/5 h-48 relative overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <p className="text-sm font-bold text-white">BTC/USD Performance</p>
                    <span className="text-xs text-gray-400">Live</span>
                  </div>
                  
                  {/* Abstract SVG Chart Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-32">
                    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--color-brand-500)" />
                          <stop offset="100%" stopColor="var(--color-success-400)" />
                        </linearGradient>
                        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,80 Q40,60 80,70 T160,40 T240,50 T320,20 T400,30" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M0,80 Q40,60 80,70 T160,40 T240,50 T320,20 T400,30 L400,100 L0,100 Z" fill="url(#areaGrad)" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}