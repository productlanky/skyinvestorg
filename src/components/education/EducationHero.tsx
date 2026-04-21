import Link from 'next/link';
import { Home, ChevronRight, ArrowDown } from 'lucide-react';

export default function EducationHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        {/* Abstract data pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)"></path>
            <defs>
              <pattern id="grid-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M0 0h4v4H0V0zm2 2h2v2H2V2z" fill="currentColor"></path>
              </pattern>
            </defs>
          </svg>
        </div>
        {/* Glowing accent elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 border border-emerald-800/30 rounded-full mb-6">
            Knowledge is Power
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Education Center</h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Master the financial markets with our comprehensive educational resources designed for traders of all levels.
          </p>

          <nav className="flex justify-center mb-10" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                  <Home className="w-4 h-4 mr-2" />
                  Shield Gold Signal
                </Link>
              </li>
              <li>
                <div className="flex items-center text-gray-200 font-medium">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                  <span className="ml-1 md:ml-2">For Traders</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex justify-center">
            <a href="#markets" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center transition duration-300 shadow-lg hover:shadow-blue-500/25">
              <span>Explore Markets</span>
              <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}