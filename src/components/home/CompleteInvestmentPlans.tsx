import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  { name: 'Pre-Regular Account', return: '10.5%', min: '$500', max: '$5,900' },
  { name: 'Starter Account', return: '5%', min: '$250', max: '$2,900' },
  { name: 'Silver Account', return: '5%', min: '$2,000', max: '$20,900' },
  { name: 'Gold Account', return: '12.3%', min: '$3,000', max: '$31,500' },
  { name: 'Regular Account', return: '15%', min: '$1,000', max: '$10,900' },
  { name: 'Platinum Account', return: '5%', min: '$4,000', max: '$45,650' },
  { name: 'Standing Account', return: '15.8%', min: '$5,000', max: '$60,800' },
  { name: 'Diamond Account', return: '20%', min: '$10,000', max: '$150,000' }
];

export default function CompleteInvestmentPlans() {
  return (
    <section className="py-16 bg-gray-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-400 uppercase bg-blue-900/70 rounded-full shadow-lg">Trading Plans</span>
          <h2 className="mt-3 text-3xl font-bold text-white">Investment Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-600 transition hover:-translate-y-1">
              <div className="h-24 bg-blue-600 flex items-center justify-center">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">{plan.name}</h3>
              </div>
              <div className="p-6 text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-400">{plan.return}</span>
                  <span className="text-gray-300 ml-1">/ Trade</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  {['Principal return on maturity', 'Instant Withdrawal', 'Professional Charts', '24/7 Support'].map((feature, i) => (
                    <li key={i} className="text-gray-300 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> {feature}
                    </li>
                  ))}
                  <li className="text-white font-semibold flex items-center justify-center border-t border-gray-700 pt-3 mt-3">
                    Min: <span className="text-blue-300 ml-1">{plan.min}</span>
                  </li>
                  <li className="text-white font-semibold flex items-center justify-center">
                    Max: <span className="text-blue-300 ml-1">{plan.max}</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full px-4 py-3 font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
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