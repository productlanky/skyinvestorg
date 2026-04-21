import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  { name: 'Starter', return: '5%', min: '$250', max: '$2,900' },
  { name: 'Silver', return: '5%', min: '$2,000', max: '$20,900' },
  { name: 'Gold', return: '12.3%', min: '$3,000', max: '$31,500' },
  { name: 'Diamond', return: '20%', min: '$10,000', max: '$150,000' }
];

export default function InvestmentPlans() {
  return (
    <section className="py-20 bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full">
            Trading Plans
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Investment Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-xl transform transition-all duration-300 opacity-50 group-hover:scale-105"></div>
              
              <div className="relative bg-gray-800/90 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-300 z-10">
                <div className="text-center mb-6 border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{plan.return}</span>
                    <span className="text-gray-400 ml-2">/ Trade</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 text-gray-300 text-sm">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> Principal return on maturity</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> Instant Withdrawal</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> Professional Charts</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /> 24/7 Support</li>
                </ul>

                <div className="space-y-2 mb-8 bg-gray-900/50 p-4 rounded-lg text-sm">
                  <div className="flex justify-between text-gray-300"><span>Min Deposit:</span> <span className="font-semibold text-white">{plan.min}</span></div>
                  <div className="flex justify-between text-gray-300"><span>Max Deposit:</span> <span className="font-semibold text-white">{plan.max}</span></div>
                </div>

                <Link href="/register" className="block w-full py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  Select Plan
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}