import { LineChart, Layers, Monitor, Wallet } from 'lucide-react';

const features = [
  {
    title: 'Precision Tools',
    description: 'Execute with algorithmic precision using our proprietary suite of professional-grade trading instruments.',
    icon: LineChart,
    glow: 'group-hover:shadow-[0_0_30px_rgba(31,149,201,0.4)]',
    iconColor: 'text-brand-400',
    iconBg: 'bg-brand-500/10'
  },
  {
    title: 'Global Markets',
    description: 'Access institutional liquidity across Forex, Equities, Commodities, and Digital Assets from a single margin account.',
    icon: Layers,
    glow: 'group-hover:shadow-[0_0_30px_rgba(50,213,131,0.4)]',
    iconColor: 'text-success-400',
    iconBg: 'bg-success-500/10'
  },
  {
    title: 'Advanced Platforms',
    description: 'Trade seamlessly on our native desktop terminal, web interface, or bespoke mobile applications.',
    icon: Monitor,
    glow: 'group-hover:shadow-[0_0_30px_rgba(31,149,201,0.4)]',
    iconColor: 'text-brand-400',
    iconBg: 'bg-brand-500/10'
  },
  {
    title: 'Secure Funding',
    description: 'Deposit and withdraw instantly using fiat wire transfers or secure, encrypted blockchain rails.',
    icon: Wallet,
    glow: 'group-hover:shadow-[0_0_30px_rgba(253,133,58,0.4)]',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10'
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-[#0B0E14] relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-brand-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-success-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Institutional Advantage
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-success-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            We provide the infrastructure, liquidity, and tools demanded by professional traders, tailored for an uncompromising user experience.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`group relative flex flex-col p-8 rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${feature.glow}`}
            >
              {/* Subtle Top Border Highlight on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex-1">
                <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center border border-white/5 transition-transform duration-500 group-hover:scale-110 ${feature.iconBg}`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}