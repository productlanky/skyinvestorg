import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function WhyUsHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="why-us-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V0h40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  <circle cx="20" cy="20" r="1" fill="currentColor"></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#why-us-grid)"></rect>
            </svg>
          </div>
        </div>
        {/* Glowing Accents */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full filter blur-3xl pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="space-y-6">
            
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">Choose Excellence</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">SkyInvestOrg</span>
            </h1>

            {/* Breadcrumb */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 ml-1 md:ml-2">Company</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-200 font-medium ml-1 md:ml-2">Why Us</span>
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