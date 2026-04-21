import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function TradeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-20 md:z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-60 md:opacity-20">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 800">
            <defs>
              <linearGradient id="tradeGrad" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
                <stop stopColor="#10B981" stopOpacity=".2" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#tradeGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(0 -50)"></path>
            <path fill="url(#tradeGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(350 150)"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-50 md:opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 800">
            <g fill="none" stroke="#6366F1" strokeWidth="2">
              <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764"></path>
              <path d="M-4 44L190 190 731 737 520 660 309 538 40 599 295 764"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="space-y-6">
            
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">Professional Trading Platform</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              cTRADER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">TRADE</span>
            </h1>

            {/* Breadcrumb */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Shield Gold Signal
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 ml-1 md:ml-2">cTrader</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-200 font-medium ml-1 md:ml-2">Trade</span>
                  </div>
                </li>
              </ol>
            </nav>

          </div>
        </div>
      </div>
    </section>
  );
}