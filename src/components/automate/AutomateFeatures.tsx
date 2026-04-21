import { Zap, SlidersHorizontal, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast Execution',
    desc: 'Our algorithmic trading system executes trades in milliseconds, capitalizing on market opportunities without human delay.',
    icon: Zap
  },
  {
    title: 'Backtesting & Optimization',
    desc: 'Test your strategies against historical data to fine-tune parameters and optimize performance before risking real capital.',
    icon: SlidersHorizontal
  },
  {
    title: 'Advanced Risk Management',
    desc: 'Implement sophisticated risk management rules including stop-loss, take-profit, and position sizing to protect your capital.',
    icon: ShieldCheck
  }
];

export default function AutomateFeatures() {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Advanced Trading Automation
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Unlock the Power of Algorithmic Trading
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Our automation platform enables traders of all experience levels to implement sophisticated trading strategies without extensive programming knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/50 group">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}