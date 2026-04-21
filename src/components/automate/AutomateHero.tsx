import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function AutomateHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 z-20 md:z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-60 md:opacity-20">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 800">
            <defs>
              <linearGradient id="autoGrad1" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
                <stop stopColor="#10B981" stopOpacity=".2" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#autoGrad1)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(0 -50)"></path>
            <path fill="url(#autoGrad1)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(350 150)"></path>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
          
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
              Advanced Trading Platform
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="block">cTrader Automate</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Trading Algorithms Made Simple
              </span>
            </h1>
            
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Create, customize, and deploy algorithmic trading strategies with ease. Take advantage of market opportunities 24/7 with smart automation.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/register" className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                Get Started
              </Link>
              <a href="#features" className="px-6 py-3 text-base font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                Explore Features
              </a>
            </div>
          </div>

          {/* Right Column - Chart Animation */}
          <div className="w-full md:w-1/2">
            <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl shadow-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full p-6">
                  <div className="relative w-full h-full flex flex-col">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-300">BTC/USD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-400">$38,245.75</span>
                        <span className="text-xs text-green-400">+2.4%</span>
                      </div>
                    </div>

                    {/* SVG Trading Chart Animation */}
                    <div className="flex-1 overflow-hidden relative">
                      <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        <line x1="0" y1="40" x2="400" y2="40" stroke="#374151" strokeWidth="0.5"></line>
                        <line x1="0" y1="80" x2="400" y2="80" stroke="#374151" strokeWidth="0.5"></line>
                        <line x1="0" y1="120" x2="400" y2="120" stroke="#374151" strokeWidth="0.5"></line>
                        <line x1="0" y1="160" x2="400" y2="160" stroke="#374151" strokeWidth="0.5"></line>

                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6"></stop>
                            <stop offset="100%" stopColor="#10B981"></stop>
                          </linearGradient>
                        </defs>

                        {/* Animated Chart Path */}
                        <path stroke="url(#chartGradient)" strokeWidth="2" fill="none" strokeLinecap="round" d="M0,150 C20,140 40,100 60,110 C80,120 100,80 120,70 C140,60 160,90 180,80 C200,70 220,30 240,40 C260,50 280,70 300,60 C320,50 340,30 360,40 C380,50 400,30 400,20">
                          <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
                            M0,150 C20,140 40,100 60,110 C80,120 100,80 120,70 C140,60 160,90 180,80 C200,70 220,30 240,40 C260,50 280,70 300,60 C320,50 340,30 360,40 C380,50 400,30 400,20;
                            M0,140 C20,130 40,110 60,100 C80,90 100,70 120,80 C140,90 160,100 180,90 C200,80 220,40 240,50 C260,60 280,80 300,70 C320,60 340,40 360,50 C380,60 400,40 400,30;
                            M0,130 C20,140 40,120 60,130 C80,140 100,100 120,90 C140,80 160,70 180,60 C200,50 220,60 240,70 C260,80 280,90 300,80 C320,70 340,50 360,60 C380,70 400,50 400,40;
                            M0,150 C20,140 40,100 60,110 C80,120 100,80 120,70 C140,60 160,90 180,80 C200,70 220,30 240,40 C260,50 280,70 300,60 C320,50 340,30 360,40 C380,50 400,30 400,20" 
                          />
                        </path>
                      </svg>

                      {/* Algorithm Markers */}
                      <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-blue-500/30 rounded-full animate-ping">
                        <div className="absolute inset-0 w-2 h-2 m-1 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-green-500/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}>
                        <div className="absolute inset-0 w-2 h-2 m-1 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Algo Bot Elements */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 bg-blue-600/30 rounded-full border border-blue-500/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-blue-300">Algo Bot Running</span>
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