import Link from 'next/link';
import Image from 'next/image';
import { Globe, LineChart, Flame, Landmark, ArrowRight, Bitcoin } from 'lucide-react';

const products = [
  { 
    title: 'Forex', 
    desc: 'Trade 70+ major, minor & exotic currency pairs with institutional liquidity and ultra-tight spreads.', 
    link: '/forex', 
    icon: Globe,
    styles: {
      text: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'group-hover:border-brand-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(31,149,201,0.15)]',
      line: 'from-brand-500'
    }
  },
  { 
    title: 'Shares', 
    desc: 'Access hundreds of public companies from the US, UK, Germany and more from a single margin account.', 
    link: '/shares', 
    icon: LineChart,
    styles: {
      text: 'text-success-400',
      bg: 'bg-success-500/10',
      border: 'group-hover:border-success-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(50,213,131,0.15)]',
      line: 'from-success-500'
    }
  },
  { 
    title: 'Energies', 
    desc: 'Discover volatile opportunities on Crude Oil & Natural Gas with precise algorithmic execution.', 
    link: '/commodities', 
    icon: Flame,
    styles: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'group-hover:border-orange-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(253,133,58,0.15)]',
      line: 'from-orange-500'
    }
  },
  { 
    title: 'Indices', 
    desc: 'Trade major and minor Index CFDs from around the globe, tracking entire market sectors.', 
    link: '/indices', 
    icon: Landmark,
    styles: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'group-hover:border-purple-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(122,90,248,0.15)]',
      line: 'from-purple-500'
    }
  },
];

export default function TradingProducts() {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      
      {/* Cyber-Luxe Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-brand-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Diverse Trading Ecosystem
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-success-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            Access global markets with institutional-grade conditions, deep liquidity, and sub-millisecond execution.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div 
              key={p.title} 
              className={`group relative flex flex-col rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${p.styles.glow} ${p.styles.border} overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${p.styles.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="p-8 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 ${p.styles.bg}`}>
                  <p.icon className={`w-7 h-7 ${p.styles.text}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{p.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-light flex-grow text-sm">
                  {p.desc}
                </p>
                
                <Link href={p.link} className={`inline-flex items-center ${p.styles.text} font-semibold text-sm tracking-wide group/link mt-auto transition-colors hover:brightness-125`}>
                  Explore {p.title} 
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Optimized Crypto Banner */}
        <div className="mt-12 relative rounded-3xl overflow-hidden bg-gray-900 border border-white/10 group hover:border-brand-500/30 transition-colors duration-500 shadow-2xl">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-brand-900/40 z-10"></div>
             <Image 
               src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2000" 
               alt="Bitcoin Analysis" 
               fill
               className="object-cover opacity-30 mix-blend-overlay transform group-hover:scale-105 transition-transform duration-1000" 
             />
          </div>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between z-20">
            <div className="mb-8 md:mb-0 max-w-2xl text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-warning-500/20 flex items-center justify-center border border-warning-500/30">
                  <Bitcoin className="w-5 h-5 text-warning-400" />
                </div>
                <span className="text-warning-400 font-bold tracking-wider uppercase text-sm">Premier Asset Class</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Cryptocurrency Trading
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Trade the world&apos;s most popular digital assets with deep liquidity, ultra-tight spreads, and institutional-grade charting tools. Experience 24/7 market access without compromise.
              </p>
            </div>

            <Link 
              href="/cryptocurrencies" 
              className="w-full md:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center whitespace-nowrap"
            >
              View Available Pairs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}