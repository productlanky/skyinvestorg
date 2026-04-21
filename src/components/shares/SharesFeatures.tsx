import { CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SharesFeatures() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trade What You Want, When You Want</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-400/20 rounded-xl filter blur-xl"></div>
            {/* Fallback background in case image is missing */}
            <div className="relative z-10 w-full h-[300px] sm:h-[400px] bg-gray-800 border border-gray-700 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
               <p className="text-gray-500">[ Platform Interface Image Placeholder ]</p>
               {/* Uncomment below if image exists */}
               {/* <img src="/temp/custom/img/commission-scheme-crypt1t1.png" alt="commission-scheme" className="absolute inset-0 w-full h-full object-cover" /> */}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-filter backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-lg">
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                One of the primary goals of SkyInvestOrg is to provide the best product in the market. Our relationships with leading tier one financial institutions mean deep liquidity and tighter spreads for Share traders.
              </p>

              <ul className="space-y-4">
                {[
                  'Trade Forex, Indices, Shares & Commodities',
                  'Access global markets 24 hours / 7 days',
                  'Multilingual customer support',
                  'Trade on the go on our mobile apps'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-emerald-400" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/trading-conditions" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Learn More About Our Commissions
                  <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}