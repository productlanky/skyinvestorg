import Link from 'next/link';

export default function AutomateCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl overflow-hidden shadow-xl border border-blue-700/50">
          <div className="relative px-8 py-12 md:p-12 lg:px-16 lg:py-16">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <svg className="absolute right-0 top-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 800">
                <path fill="none" stroke="white" strokeWidth="2" d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764"></path>
                <path fill="none" stroke="white" strokeWidth="2" d="M-4 44L190 190 731 737 520 660 309 538 40 599 295 764"></path>
                <path fill="none" stroke="white" strokeWidth="2" d="M-4 44L190 190 731 737M490 85L309 538 40 599 295 764"></path>
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to Start Automated Trading?
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Join thousands of traders using our platform to automate strategies and maximize profits 24/7.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register" className="px-8 py-4 text-base font-bold text-blue-900 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200">
                  Create Free Account
                </Link>
                <Link href="/login" className="px-8 py-4 text-base font-bold text-white bg-transparent border-2 border-white/50 rounded-lg shadow-lg hover:bg-white/10 hover:border-white transition-all duration-200">
                  Login
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}