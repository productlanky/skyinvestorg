import { Copy, TrendingUp, ShieldCheck, Combine } from 'lucide-react';

const features = [
  {
    title: 'Copy 400+ Strategies',
    desc: 'Access hundreds of strategies for more than 1000 instruments across 7 asset classes, providing diverse opportunities for every trading style.',
    icon: Copy
  },
  {
    title: 'Select Top Performers',
    desc: 'Use our advanced reporting tools to rank strategies according to performance and select the most suitable ones for your unique circumstances.',
    icon: TrendingUp
  },
  {
    title: 'Stay Protected',
    desc: 'Our system employs sophisticated calculations to maintain your exposure at an optimal level for your account, protecting your investments.',
    icon: ShieldCheck
  },
  {
    title: 'Combine With Other Methods',
    desc: 'Our integrated platform allows you to combine copying with manual and automated trading, tailoring your approach to your preferences.',
    icon: Combine
  }
];

export default function CopyFeatures() {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Key Features
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Amplify Your Trading Potential
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Our copy trading platform delivers innovative features to help you optimize your investment strategy and maximize returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/50">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}