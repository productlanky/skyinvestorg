import Link from 'next/link';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';

export default function CopyExpertSupport() {
  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 h-64 md:h-96 flex items-center justify-center z-10">
              <p className="text-gray-500">[ Expert Support Image Placeholder ]</p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-400/20"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full filter blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-500/20 rounded-full filter blur-xl"></div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
              Premium Support
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">STAY UP TO DATE</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                WITH OUR EXPERTS!
              </span>
            </h2>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start space-x-4">
              <MessageCircle className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <p className="text-gray-300 text-lg leading-relaxed">
                Our local and international teams are here to support you on a 24/5 basis in more than 20 languages, while our wide range of payment methods gives you greater flexibility when it comes to deposits and withdrawals.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start space-x-4">
              <Star className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Experience More Than Trading</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our success is centred around a number of core values. They include providing competitive brokerage fees through tight spreads, ensuring lightning-fast execution, access to advanced trading platforms, and exceptional customer service.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
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