import Link from 'next/link';
import { ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';

export default function TradeExpertSupport() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image (If it exists, otherwise styled fallback) */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -inset-4">
              <div className="w-full h-full mx-auto opacity-30 blur-lg filter">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl"></div>
              </div>
            </div>
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700 h-64 md:h-96 flex items-center justify-center">
               <p className="text-gray-500">[ Trading Interface Image Placeholder ]</p>
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-400/10"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-10">
            
            {/* Expert Support Block */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-400 mr-3" />
                STAY UP TO DATE WITH OUR EXPERTS!
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our local and international teams are here to support you on a 24/5 basis in more than 20 languages, while our wide range of payment methods gives you greater flexibility when it comes to deposits and withdrawals.
              </p>
            </div>

            {/* Trading Experience Block */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mr-3" />
                Experience More Than Trading
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our success is centred around a number of core values. They include providing competitive brokerage fees through tight spreads, ensuring lightning-fast execution, access to advanced trading platforms with a wide range of products, and exceptional customer service.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="/about" className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More About Our Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}