import { Activity } from 'lucide-react';

const timeline = [
  { year: '2020', title: 'System Initialization', desc: 'SkyInvestOrg was established by a consortium of quantitative analysts. The core matching engine was built from scratch to eliminate third-party dependencies.' },
  { year: '2022', title: 'Equinix NY4 Co-location', desc: 'Physical servers were deployed in the NY4 data center, reducing execution latency from 45ms down to <12ms for institutional clients.' },
  { year: '2024', title: 'Liquidity Aggregator V2', desc: 'Integration of 15 new Tier-1 banking partners, allowing the terminal to offer true 0.0 pip raw spreads on major Forex and Equities pairs.' },
  { year: '2026', title: 'Global Sovereign Access', desc: 'Opening the institutional infrastructure to individual retail traders globally, completely democratizing access to high-frequency trading conditions.' }
];

export default function AboutStory() {
  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Evolution.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Vertical Axis Line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[1px] bg-white/10 md:-translate-x-1/2"></div>
          {/* Scanning Beam Effect */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-brand-500/50 md:-translate-x-1/2 shadow-[0_0_15px_#1f95c9] animate-[shimmer_3s_infinite]"></div>

          <div className="space-y-16">
            {timeline.map((event, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node Indicator */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-[#05070a] border-2 border-brand-500 transform -translate-x-1/2 mt-1 md:mt-0 z-10 shadow-[0_0_10px_rgba(31,149,201,0.5)]"></div>

                {/* Content Panel */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 group">
                  <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.05] hover:border-brand-500/30"
                       style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-brand-400 tracking-tighter">{event.year}</span>
                      <Activity className="w-4 h-4 text-gray-600 group-hover:text-brand-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{event.desc}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}