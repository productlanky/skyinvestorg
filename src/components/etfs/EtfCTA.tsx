import Link from 'next/link';

export default function EtfCTA() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl">
          
          {/* Background Patterns */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <svg className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="etf-cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect width="800" height="800" fill="url(#etf-cta-dots)"></rect>
            </svg>
            <svg className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 400 400">
              <rect width="800" height="800" fill="url(#etf-cta-dots)"></rect>
            </svg>
          </div>

          <div className="relative px-6 py-12 sm:py-16 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center">
            
            <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0">
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2 block">Start Trading Today</span>
              <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl mb-4">
                Ready to Start Trading ETFs?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl">
                Join thousands of traders using our platform to access global ETF markets with competitive spreads.
              </p>
            </div>
            
            <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-center md:justify-end w-full">
              <Link href="/register" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-indigo-600 bg-white hover:bg-gray-100 transition-colors whitespace-nowrap">
                Create Account
              </Link>
              <Link href="/login" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/30 text-base font-bold rounded-lg text-white bg-indigo-800/40 hover:bg-indigo-800/60 shadow-lg transition-colors whitespace-nowrap">
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}