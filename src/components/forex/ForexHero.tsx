import Link from 'next/link';

export default function ForexHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-full h-full">
          <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 800 800">
            <defs>
              <linearGradient id="forexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%" />
                <stop stopColor="#10B981" stopOpacity=".2" offset="50%" />
                <stop stopColor="#6366F1" stopOpacity=".15" offset="100%" />
              </linearGradient>
            </defs>
            <path d="M120,300 L120,200 L150,200 L150,300 Z" fill="rgba(16, 185, 129, 0.5)" />
            <path d="M120,200 L120,300 L150,300 L150,200 Z" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" fill="none" />
            <path d="M135,150 L135,350" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
            
            <path d="M220,250 L220,400 L250,400 L250,250 Z" fill="rgba(239, 68, 68, 0.5)" />
            <path d="M220,250 L220,400 L250,400 L250,250 Z" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" fill="none" />
            <path d="M235,200 L235,450" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
            
            <path d="M320,320 L320,220 L350,220 L350,320 Z" fill="rgba(16, 185, 129, 0.5)" />
            <path d="M320,220 L320,320 L350,320 L350,220 Z" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" fill="none" />
            <path d="M335,170 L335,370" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-2/3 mb-12 lg:mb-0 space-y-6">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
              Global Markets
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Forex</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-green-400">
                Foreign Exchange Market
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
              The foreign exchange market is a global decentralized or over-the-counter market for the trading of currencies. It includes all aspects of buying, selling and exchanging currencies at current or determined prices.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#forex-markets" className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                Explore Markets
              </a>
              <Link href="/register" className="px-8 py-3 text-lg font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                Start Trading
              </Link>
            </div>
          </div>

          {/* Mini Cards */}
          <div className="w-full lg:w-1/3 relative">
            <div className="grid gap-4">
              
              {/* EUR/USD */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 font-bold mr-3">
                      €/$
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">EUR/USD</h3>
                      <p className="text-sm text-gray-400">Euro / US Dollar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">1.1842</div>
                    <div className="text-xs text-green-400">+0.05%</div>
                  </div>
                </div>
                <div className="mt-3 h-10">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path d="M0,15 L10,13 L20,16 L30,14 L40,17 L50,12 L60,15 L70,10 L80,13 L90,11 L100,8" fill="none" stroke="#10B981" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* GBP/USD */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 font-bold mr-3">
                      £/$
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">GBP/USD</h3>
                      <p className="text-sm text-gray-400">British Pound / US Dollar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-medium">1.3721</div>
                    <div className="text-xs text-red-400">-0.12%</div>
                  </div>
                </div>
                <div className="mt-3 h-10">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path d="M0,10 L10,12 L20,8 L30,14 L40,16 L50,15 L60,18 L70,20 L80,17 L90,19 L100,22" fill="none" stroke="#EF4444" strokeWidth="2" />
                  </svg>
                </div>
              </div>

            </div>
            {/* Blurs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full filter blur-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500/20 rounded-full filter blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}