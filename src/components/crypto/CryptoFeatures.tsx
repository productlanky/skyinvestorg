import { Check } from 'lucide-react';

export default function CryptoFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
            Trading Flexibility
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Trade what you want,</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              When you want
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform provides you with the tools and access you need for successful trading
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 h-64 md:h-96 flex items-center justify-center">
              {/* Fallback box if the image path is broken */}
              <p className="text-gray-500">[ Platform Interface Image Placeholder ]</p>
              {/* <img src="/temp/custom/img/commission-scheme-crypt1t1.png" alt="Trading Platform" className="w-full h-full object-cover" /> */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-400 opacity-10"></div>
            </div>
            {/* Blurs */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl -z-10"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-500/20 rounded-full filter blur-2xl -z-10"></div>
          </div>

          {/* Text Side */}
          <div className="space-y-8 order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
              One of the primary goals of SkyInvestOrg is to provide the best product in the market. Our relationships with leading tier one financial institutions mean deep liquidity and tighter spreads.
            </h3>
            
            <ul className="space-y-5">
              {[
                'Trade Forex, Indices, Shares & Commodities',
                'Access global markets 24 hours / 7 days',
                'Multilingual customer support',
                'Trade on the go on our mobile apps'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-blue-900/50 p-1 rounded-full">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="ml-4 text-lg text-gray-300">{feature}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a href="/about" className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}