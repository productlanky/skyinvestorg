import { CheckCircle, TrendingUp, Shield, Sliders, Copy } from 'lucide-react';
import Link from 'next/link';

export default function CopyTradingAndFeatures() {
  return (
    <section className="bg-[#0B0E14]">
      {/* Superior Trading Experience - Image Left, Text Right */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transform -rotate-12 translate-x-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" 
              alt="Trading Charts" 
              className="relative rounded-3xl border border-white/10 shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <span className="text-blue-500 font-bold tracking-wider uppercase text-sm">Superior Trading Experience</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">Tighter Spreads.<br/>Faster Execution.</h2>
              <p className="mt-4 text-xl text-gray-400">Experience institutional-grade trading conditions designed for professional traders.</p>
            </div>

            <ul className="space-y-6">
              {[
                'Ultra-low spreads from 0.0 pips on major pairs', 
                'Lightning-fast execution from NY4 server facility', 
                'Top-tier liquidity and market-leading pricing 24/5'
              ].map((text, i) => (
                <li key={i} className="flex items-center bg-white/5 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-gray-200 font-medium">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social Trading - Text Left, Image Right */}
      <div className="py-24 bg-gray-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">Social Trading</span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">Copy Professional Traders</h2>
                <p className="mt-4 text-xl text-gray-400">Let experienced traders do the heavy lifting with our advanced copy trading system.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: '400+ Strategies', icon: Copy, desc: 'Access hundreds of verified strategies.' },
                  { title: 'Top Performers', icon: TrendingUp, desc: 'Rank and follow the most profitable traders.' },
                  { title: 'Stay Protected', icon: Shield, desc: 'Optimal exposure management for your capital.' },
                  { title: 'Combine Methods', icon: Sliders, desc: 'Mix copy trading with manual execution.' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800/50 border border-white/5 rounded-2xl p-6 hover:bg-gray-800 transition-colors">
                    <item.icon className="text-emerald-400 w-8 h-8 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full transform rotate-12 -translate-x-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Data Analysis" 
                className="relative rounded-3xl border border-white/10 shadow-2xl object-cover h-[500px] w-full"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}