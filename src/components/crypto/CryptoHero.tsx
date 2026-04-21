import Link from 'next/link';

const miniTickers = [
  { pair: 'BTC/USD', price: '$48,795.20', color: 'text-green-400', logo: 'BTC', bg: 'bg-orange-500' },
  { pair: 'ETH/USD', price: '$2,873.50', color: 'text-green-400', logo: 'ETH', bg: 'bg-blue-500' },
  { pair: 'USDT/USD', price: '$1.00', color: 'text-gray-300', logo: 'USDT', bg: 'bg-teal-500' },
  { pair: 'XRP/USD', price: '$0.72', color: 'text-red-400', logo: 'XRP', bg: 'bg-blue-600' },
];

export default function CryptoHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cryptoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#F7931A" stopOpacity=".25" offset="0%"></stop>
              <stop stopColor="#627EEA" stopOpacity=".2" offset="50%"></stop>
              <stop stopColor="#11A97D" stopOpacity=".15" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#cryptoGrad1)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z"></path>
        </svg>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-2/3 mb-12 lg:mb-0 space-y-6">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
              Digital Assets
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Cryptocurrency</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                CFDs on Bitcoin, Ethereum & more
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
              Cryptocurrency is a digital currency, created and held electronically. It is an internet-based medium of exchange which uses cryptographic functions to conduct financial transactions securely.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#crypto-table" className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                View Markets
              </a>
              <Link href="/register" className="px-8 py-3 text-lg font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200">
                Start Trading
              </Link>
            </div>
          </div>

          {/* Mini Ticker Grid */}
          <div className="w-full lg:w-1/3 relative">
            <div className="grid grid-cols-2 gap-4">
              {miniTickers.map((ticker) => (
                <div key={ticker.pair} className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 ${ticker.bg} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                      {ticker.logo}
                    </div>
                    <h3 className="text-lg font-bold text-white">{ticker.pair}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Price</span>
                    <span className={`font-medium ${ticker.color}`}>{ticker.price}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Decorative Blurs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full filter blur-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full filter blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}