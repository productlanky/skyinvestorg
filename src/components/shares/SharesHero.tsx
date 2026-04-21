import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function SharesHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden py-16">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="shares-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V0h40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5"></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#shares-grid)"></rect>
            </svg>
          </div>
        </div>
        {/* Glowing accent elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          
          {/* Title and Breadcrumb */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 rounded-full mb-4 border border-emerald-800/30">
              Investment Products
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Share Trading</h1>
            
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    SkyInvestOrg
                  </Link>
                </li>
                <li>
                  <div className="flex items-center text-gray-400">
                    <ChevronRight className="w-5 h-5" />
                    <span className="ml-1 md:ml-2">Trading</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-gray-200 font-medium">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="ml-1 md:ml-2">Shares</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Main Content Box */}
          <div className="bg-gray-800/50 backdrop-filter backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">
                Shares are units of equity ownership interest in a corporation that exist as a financial asset providing for an equal distribution in any residual profits, if any are declared, in the form of dividends. Shareholders may also enjoy capital gains if the value of the company rises.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}