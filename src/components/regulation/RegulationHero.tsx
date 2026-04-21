import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function RegulationHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="regulation-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V0h40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5"></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#regulation-grid)"></rect>
            </svg>
          </div>
        </div>
        {/* Glowing Accents */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          
          {/* Tag */}
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 border border-emerald-800/30 rounded-full mb-6">
            Company Information
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Regulation and Licensing
          </h1>
          
          {/* Breadcrumb */}
          <nav className="flex" aria-label="Breadcrumb">
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
                  <span className="text-gray-400 ml-1 md:ml-2">Company</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-200 font-medium ml-1 md:ml-2">Regulation</span>
                </div>
              </li>
            </ol>
          </nav>

        </div>
      </div>
    </section>
  );
}