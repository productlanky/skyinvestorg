import Link from 'next/link';

export default function ForexCTA() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl">
          
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="cta-dots-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect width="800" height="800" fill="url(#cta-dots-1)"></rect>
            </svg>
            <svg className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="cta-dots-2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect width="800" height="800" fill="url(#cta-dots-2)"></rect>
            </svg>
          </div>

          {/* Content */}
          <div className="relative px-6 py-12 sm:py-16 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0">
              <span className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-2 block">Ready to trade?</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-4">
                Start Your Forex Trading Journey
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl">
                Join thousands of traders worldwide who trust our platform for their forex trading needs. Get started with a free demo account or open a real trading account today.
              </p>
            </div>
            
            <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-center md:justify-end w-full">
              <Link href="/register" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-indigo-600 bg-white hover:bg-gray-100 shadow-lg transition-colors whitespace-nowrap">
                Create Account
              </Link>
              <Link href="/about" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/30 text-base font-bold rounded-lg text-white bg-indigo-800/40 hover:bg-indigo-800/60 shadow-lg transition-colors whitespace-nowrap">
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}