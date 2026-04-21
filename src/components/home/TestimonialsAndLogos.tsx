"use client";

import { useState } from 'react';
import { Star, PlayCircle, Quote, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  { name: 'Malcom47', role: 'Verified Trader', text: 'Since I started using SkyInvestOrg, I have been earning like never before. You guys have the best signals.', initial: 'M' },
  { name: 'Christy', role: 'Elite Investor', text: 'I already got more than $200,000 within a month investing with SkyInvestOrg. Will again invest soon.', initial: 'C' },
  { name: 'Linday8', role: 'Professional Trader', text: 'I was able to earn additional $30,000 to my profit. It\'s amazing, you guys are the best, keep it up.', initial: 'L' },
  { name: 'Crian', role: 'Active Trader', text: 'This was a very easy process and I received my funds quickly as I needed them! Highly recommend SkyInvestOrg.', initial: 'C' },
  { name: 'Claudia', role: 'Satisfied Investor', text: 'I rate SkyInvestOrg five stars because of the service, you register online, upload ID and you deposit and withdraw after trades.', initial: 'C' },
  { name: 'Jenny', role: 'Premium Member', text: 'I am very pleased with the customer service. Also online service is great and easy thank you SkyInvestOrg team.', initial: 'J' },
  { name: 'Mike', role: 'Regular Investor', text: 'I\'m happy, that in difficult times there are people that will support you and help you make more money, thank you.', initial: 'M' },
  { name: 'Kathy', role: 'Long-term Client', text: 'I\'ve invested with SkyInvestOrg several times, always paid back on time. Very impressed and satisfied.', initial: 'K' }
];

const currencies = [
  { code: 'BTC', name: 'Bitcoin' },
  { code: 'ETH', name: 'Ethereum' },
  { code: 'USDT', name: 'Tether' },
  { code: 'BNB', name: 'Binance' },
  { code: 'SOL', name: 'Solana' },
  { code: 'XRP', name: 'Ripple' },
  { code: 'LTC', name: 'Litecoin' }
];

export default function TestimonialsAndLogos() {
  const [showAll, setShowAll] = useState(false);
  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 4);

  return (
    <div className="bg-[#05070a]">
      {/* SECTION 1: THE HUB (Education & Identity) */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Education: Video Terminal */}
            <div className="group">
              <div className="inline-flex items-center space-x-2 text-brand-400 mb-6">
                <div className="h-[1px] w-8 bg-brand-500"></div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Knowledge Base</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tighter">
                Master the <span className="text-brand-500">Markets.</span>
              </h2>
              
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video bg-gray-900 group shadow-2xl">
                <iframe 
                  src="https://www.youtube.com/embed/Gc2en3nHxA4?controls=0&modestbranding=1" 
                  className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" 
                  allowFullScreen 
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                  <div className="w-20 h-20 rounded-full bg-brand-600/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <PlayCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-gray-500 font-light leading-relaxed max-w-md">
                Access institutional-grade technical analysis and market theory. Our education hub is designed to turn retail sentiment into professional execution.
              </p>
            </div>

            {/* About Us: Identity Panel */}
            <div className="lg:pl-12">
              <div className="inline-flex items-center space-x-2 text-success-400 mb-6">
                <div className="h-[1px] w-8 bg-success-500"></div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Our Identity</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tighter">
                The Standard of <span className="text-success-400">Trust.</span>
              </h2>
              
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl relative group hover:border-brand-500/30 transition-all">
                  <Globe className="w-10 h-10 text-brand-500 mb-6" />
                  <p className="text-xl text-gray-300 font-light leading-relaxed">
                    SkyInvestOrg has evolved into a global powerhouse, providing deep liquidity and seamless connectivity across <span className="text-white font-medium">72+ international markets</span>.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-2xl font-mono font-bold text-white mb-1">24/5</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Expert Support</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-2xl font-mono font-bold text-white mb-1">Raw</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Spreads Access</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TESTIMONIAL MOSAIC */}
      <section className="py-32 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">Success Mirror.</h2>
               <p className="text-gray-500 font-light">Join the global network of traders executing high-yield strategies daily.</p>
            </div>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-600 transition-all font-bold uppercase text-xs tracking-widest"
            >
              <span>{showAll ? 'Collapse' : 'View All Stories'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-[#0D1117] border border-white/5 hover:border-brand-500/50 transition-all duration-500 flex flex-col justify-between">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-brand-500/20 transition-colors" />
                
                <div>
                  <div className="flex text-brand-400 mb-6 space-x-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-light italic mb-8">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                <div className="flex items-center pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-mono font-bold text-xs uppercase">
                    {t.initial}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-sm tracking-tight">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VAULT TICKER (Crypto Logos) */}
      <section className="py-12 border-y border-white/5 bg-[#05070a]">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <div className="flex items-center space-x-12 animate-scroll whitespace-nowrap">
            {[...currencies, ...currencies].map((coin, i) => (
              <div key={i} className="flex items-center space-x-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-500/50">
                  <span className="text-white font-mono font-bold text-sm">{coin.code}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xs tracking-widest uppercase">{coin.name}</span>
                  <span className="text-[10px] text-brand-500 font-mono">SECURE_NODE_ONLINE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}