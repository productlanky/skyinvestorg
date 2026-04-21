import { PieChart, TrendingDown, RefreshCcw } from 'lucide-react';

const benefits = [
  {
    title: 'Instant Diversification',
    desc: 'ETFs provide exposure to a basket of securities in a single trade, reducing risk through diversification across companies, sectors, or even countries.',
    icon: PieChart
  },
  {
    title: 'Cost-Effective',
    desc: 'ETFs typically have lower expense ratios compared to mutual funds, making them a cost-effective way to gain exposure to various markets and sectors.',
    icon: TrendingDown
  },
  {
    title: 'Liquidity & Transparency',
    desc: 'ETFs trade like stocks throughout the day, offering high liquidity and real-time pricing transparency not available with mutual funds.',
    icon: RefreshCcw
  }
];

export default function EtfBenefits() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Why Trade ETFs
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Benefits of ETF Trading
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the advantages of incorporating ETFs into your trading strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group hover:border-blue-500/50">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}