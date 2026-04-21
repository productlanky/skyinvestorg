import Link from 'next/link';

export default function IndicesCTA() {
  return (
    <section className="py-16 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-50 pointer-events-none"></div>
      
      {/* SVG Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#111827" fillOpacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,218.7C560,235,640,245,720,229.3C800,213,880,171,960,165.3C1040,160,1120,192,1200,192C1280,192,1360,160,1400,144L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl">
          
          {/* Dot Patterns */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <svg className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2" width="800" height="800" fill="none" viewBox="0 0 400 400">
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect width="800" height="800" fill="url(#cta-dots)"></rect>
            </svg>
          </div>

          <div className="relative px-6 py-16 sm:py-20 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center">
            
            <div className="md:w-1/2 md:pr-10 text-center md:text-left mb-10 md:mb-0">
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2 block">Start Trading Today</span>
              <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl mb-4">
                Ready to Trade Indices?
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Join thousands of traders worldwide who trade global indices on our platform. Get started with a free demo account or open a real trading account today.
              </p>
            </div>
            
            <div className="md:w-1/2 flex flex-col sm:flex-row justify-center md:justify-end gap-4 w-full">
              <Link href="/register" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-indigo-600 bg-white hover:bg-gray-100 transition-colors whitespace-nowrap">
                Create Account
              </Link>
              <Link href="/register" className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/30 text-base font-bold rounded-lg text-white bg-indigo-800/40 hover:bg-indigo-800/60 shadow-lg transition-colors whitespace-nowrap">
                Try Demo
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}