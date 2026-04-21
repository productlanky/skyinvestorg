import { Zap, BrainCircuit, Eye, MousePointer2 } from 'lucide-react';

const features = [
  {
    title: 'Reliable',
    desc: "Featuring the market's sharpest execution, Shield Gold Signal Trade cTrader fills your orders in milliseconds without any requotes or price manipulation.",
    icon: Zap,
    gradient: 'from-blue-500/5 to-emerald-400/5',
    hoverBorder: 'hover:border-blue-500/50',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10'
  },
  {
    title: 'Intelligent',
    desc: "Make informed decisions with smart market analysis tools, Live Sentiment data and in-platform market insights from Trading Central.",
    icon: BrainCircuit,
    gradient: 'from-emerald-500/5 to-blue-400/5',
    hoverBorder: 'hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10'
  },
  {
    title: 'Transparent',
    desc: "Access transaction statistics, equity charts and detailed history of your deals for a crystal clear understanding of your performance.",
    icon: Eye,
    gradient: 'from-blue-500/5 to-emerald-400/5',
    hoverBorder: 'hover:border-blue-500/50',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10'
  },
  {
    title: 'Intuitive',
    desc: "Easy to use and navigate, Shield Gold Signal Trade cTrader was built with real traders' needs in mind. Trade with cTrader and experience its distinct advantage.",
    icon: MousePointer2,
    gradient: 'from-emerald-500/5 to-blue-400/5',
    hoverBorder: 'hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10'
  }
];

export default function TradeFeatures() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative h-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl transition-all duration-300 group-hover:scale-105`}></div>
              <div className={`relative h-full p-6 bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 ${feature.hoverBorder}`}>
                <div className={`w-16 h-16 mx-auto mb-4 ${feature.iconBg} rounded-xl flex items-center justify-center`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}