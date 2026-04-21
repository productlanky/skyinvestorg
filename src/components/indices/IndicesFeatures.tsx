import { PieChart, Zap, Clock } from 'lucide-react';

const features = [
  {
    title: 'Diversified Exposure',
    desc: 'Trade indices to gain exposure to entire market sectors rather than individual stocks, allowing for diversified risk and greater market opportunities.',
    icon: PieChart
  },
  {
    title: 'Competitive Spreads',
    desc: 'Trade major global indices with tight spreads and low costs, maximizing your potential returns on both long and short positions.',
    icon: Zap
  },
  {
    title: 'Extended Trading Hours',
    desc: 'Access global indices markets with extended hours, allowing you to capitalize on opportunities around the clock across different time zones.',
    icon: Clock
  }
];

export default function IndicesFeatures() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Key Benefits
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Why Trade Indices
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the advantages of trading global indices on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-blue-500/50 group">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}