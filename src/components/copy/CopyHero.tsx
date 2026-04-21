import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function CopyHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 800">
            <defs>
              <linearGradient id="copyGrad" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
                <stop stopColor="#10B981" stopOpacity=".2" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#copyGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(0 -50)"></path>
            <path fill="url(#copyGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(350 150)"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 800 800">
            <g fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.15">
              <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764"></path>
              <path d="M-4 44L190 190 731 737 520 660 309 538 40 599 295 764"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-full md:w-2/3 space-y-6">
            
            <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/50 rounded-full">
              Advanced Trading Platform
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">cTRADER COPY</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Smart Strategy Replication
              </span>
            </h1>
            
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Replicate successful trading strategies from top-performing traders. Diversify your portfolio and maximize profits with our intelligent copy-trading platform.
            </p>

            {/* Breadcrumb */}
            <nav className="flex justify-center mt-6 mb-8" aria-label="Breadcrumb">
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
                    <span className="text-gray-400 ml-1 md:ml-2">System</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-200 font-medium ml-1 md:ml-2">Copy Trading</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/register" className="px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                Get Started
              </Link>
              <a href="#features" className="px-8 py-3 text-base font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                Learn More
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}