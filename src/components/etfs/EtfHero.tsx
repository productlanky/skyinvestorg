import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function EtfHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="etfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
              <stop stopColor="#10B981" stopOpacity=".2" offset="50%"></stop>
              <stop stopColor="#6366F1" stopOpacity=".15" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#etfGrad1)" d="M50,250 L150,200 L250,300 L350,150 L450,250 L550,100 L650,200 L750,150" strokeWidth="3" stroke="rgba(59, 130, 246, 0.5)"></path>
          <path fill="url(#etfGrad1)" d="M50,450 L750,450" strokeWidth="1" stroke="rgba(59, 130, 246, 0.2)"></path>
          <path fill="url(#etfGrad1)" d="M50,350 L750,350" strokeWidth="1" stroke="rgba(59, 130, 246, 0.2)"></path>
          <path fill="url(#etfGrad1)" d="M50,550 L750,550" strokeWidth="1" stroke="rgba(59, 130, 246, 0.2)"></path>
        </svg>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-2/3 mb-12 lg:mb-0 space-y-6">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/50 rounded-full">
              Investment Products
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Exchange-Traded Funds</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Diversified Investment Solutions
              </span>
            </h1>
            
            <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
              An exchange-traded fund is a type of investment fund and exchange-traded product, i.e. they are traded on stock exchanges. ETFs are similar in many ways to mutual funds, except that ETFs are bought and sold throughout the day on stock exchanges while mutual funds are bought and sold based on their price at day's end.
            </p>

            <nav className="flex mt-6 mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    Shield Gold Signal
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 ml-1 md:ml-2">Trading</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-200 font-medium ml-1 md:ml-2">ETFs</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#etf-markets" className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                Explore ETFs
              </a>
              <Link href="/register" className="px-8 py-3 text-lg font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                Start Trading
              </Link>
            </div>
          </div>

          {/* Mini Cards */}
          <div className="w-full lg:w-1/3 relative">
            <div className="grid gap-4">
              
              {/* S&P 500 ETF */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">S&amp;P 500 ETF</h3>
                    <p className="text-sm text-gray-400">Tracks the S&amp;P 500 Index</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">+1.2%</div>
                    <div className="text-xs text-gray-400">Today</div>
                  </div>
                </div>
                <div className="mt-3 h-10">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path d="M0,15 L10,12 L20,18 L30,15 L40,20 L50,14 L60,16 L70,10 L80,15 L90,13 L100,8" fill="none" stroke="#10B981" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Tech ETF */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Tech Sector ETF</h3>
                    <p className="text-sm text-gray-400">Technology companies</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">+2.5%</div>
                    <div className="text-xs text-gray-400">Today</div>
                  </div>
                </div>
                <div className="mt-3 h-10">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path d="M0,20 L10,18 L20,15 L30,16 L40,12 L50,10 L60,8 L70,5 L80,7 L90,3 L100,5" fill="none" stroke="#10B981" strokeWidth="2" />
                  </svg>
                </div>
              </div>

            </div>
            {/* Blurs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full filter blur-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full filter blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}