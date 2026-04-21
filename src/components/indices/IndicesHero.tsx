import Link from 'next/link';
import { Home, ChevronRight, TrendingUp } from 'lucide-react';

export default function IndicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="indicesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
              <stop stopColor="#EC4899" stopOpacity=".2" offset="50%"></stop>
              <stop stopColor="#6366F1" stopOpacity=".15" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path d="M100,600 L200,550 L300,580 L400,500 L500,520 L600,480 L700,400" stroke="url(#indicesGrad)" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"></path>
          
          <g stroke="currentColor" strokeOpacity="0.1">
            <line x1="0" y1="100" x2="800" y2="100"></line>
            <line x1="0" y1="200" x2="800" y2="200"></line>
            <line x1="0" y1="300" x2="800" y2="300"></line>
            <line x1="0" y1="400" x2="800" y2="400"></line>
            <line x1="0" y1="500" x2="800" y2="500"></line>
            <line x1="0" y1="600" x2="800" y2="600"></line>
            <line x1="0" y1="700" x2="800" y2="700"></line>
            <line x1="100" y1="0" x2="100" y2="800"></line>
            <line x1="200" y1="0" x2="200" y2="800"></line>
            <line x1="300" y1="0" x2="300" y2="800"></line>
            <line x1="400" y1="0" x2="400" y2="800"></line>
            <line x1="500" y1="0" x2="500" y2="800"></line>
            <line x1="600" y1="0" x2="600" y2="800"></line>
            <line x1="700" y1="0" x2="700" y2="800"></line>
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/50 rounded-full">
              Global Markets
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              <span className="block">Global Indices</span>
              <span className="block text-blue-400">Trading</span>
            </h1>
            
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl max-w-xl">
              See the complete list of world stock indexes with points and percentage change, volume, intraday highs and lows, 52 week range, and day charts.
            </p>

            <nav className="flex mt-6 mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    SkyInvestOrg
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
                    <span className="text-gray-200 font-medium ml-1 md:ml-2">Indices</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#indices-table" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300">
                View Markets
              </a>
              <Link href="/about" className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gray-800 transition duration-300 shadow-lg">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side - Chart Mockup */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl">
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-gray-400 text-sm">Major Index</span>
                    <h3 className="text-xl font-bold text-white">US 500</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-xl font-bold">4,568.32</span>
                    <div className="flex items-center justify-end text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+0.23%</span>
                    </div>
                  </div>
                </div>

                {/* SVG Chart */}
                <div className="w-full h-48 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <g stroke="#2D3748" strokeWidth="0.5">
                      <line x1="0" y1="40" x2="400" y2="40"></line>
                      <line x1="0" y1="80" x2="400" y2="80"></line>
                      <line x1="0" y1="120" x2="400" y2="120"></line>
                      <line x1="0" y1="160" x2="400" y2="160"></line>
                    </g>
                    <path d="M0,160 L40,150 L80,155 L120,140 L160,130 L200,120 L240,100 L280,105 L320,80 L360,70 L400,60" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M0,160 L40,150 L80,155 L120,140 L160,130 L200,120 L240,100 L280,105 L320,80 L360,70 L400,60 L400,200 L0,200 Z" fill="url(#chartGradient)"></path>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-700/50">
                    <div className="text-xs text-gray-400">Open</div>
                    <div className="text-sm font-medium text-white">4,552.10</div>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-700/50">
                    <div className="text-xs text-gray-400">High</div>
                    <div className="text-sm font-medium text-white">4,575.28</div>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-700/50">
                    <div className="text-xs text-gray-400">Low</div>
                    <div className="text-sm font-medium text-white">4,545.36</div>
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