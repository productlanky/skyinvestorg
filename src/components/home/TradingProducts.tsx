import Link from 'next/link';
import { Globe, LineChart, Flame, Landmark, ArrowRight, Bitcoin } from 'lucide-react';

const products = [
  { title: 'Forex', desc: 'Trade 70+ major, minor & exotic currency pairs with competitive spreads.', icon: Globe, link: '/forex', color: 'blue' },
  { title: 'Shares', desc: 'Access hundreds of public companies from the US, UK, Germany and more.', icon: LineChart, link: '/shares', color: 'emerald' },
  { title: 'Energies', desc: 'Discover opportunities on Crude Oil & Natural Gas with tight spreads.', icon: Flame, link: '/commodities', color: 'orange' },
  { title: 'Indices', desc: 'Trade major and minor Index CFDs from around the globe.', icon: Landmark, link: '/indices', color: 'indigo' },
];

export default function TradingProducts() {
  return (
    <section className="py-24 bg-[#0B0E14] relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Diverse Trading Products</h2>
          <p className="text-xl text-gray-400">Access global markets with institutional-grade conditions</p>
        </div>

        {/* Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.title} className="group relative rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-lg hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${p.color}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="p-8">
                <div className={`w-14 h-14 bg-${p.color}-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <p.icon className={`text-${p.color}-400 w-7 h-7`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed h-20">{p.desc}</p>
                <Link href={p.link} className={`inline-flex items-center text-${p.color}-400 hover:text-${p.color}-300 font-semibold group/link`}>
                  Explore {p.title} 
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Crypto Banner */}
        <div className="mt-12 relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/20">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2000&auto=format&fit=crop" alt="Bitcoin Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          </div>
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between z-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <Bitcoin className="w-8 h-8 text-yellow-500" />
                <span className="text-yellow-500 font-bold tracking-wider uppercase">Popular Asset Class</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Cryptocurrency Trading</h3>
              <p className="text-blue-200 text-lg max-w-xl">Trade the world's most popular digital assets with deep liquidity, tight spreads, and advanced charting tools.</p>
            </div>
            <Link href="/cryptocurrencies" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 whitespace-nowrap">
              View All Cryptos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}