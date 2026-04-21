import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ExpertSupport() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          
          {/* Left side: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-400 opacity-20 rounded-full blur-xl"></div>

              {/* Image Container */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-2xl h-64 md:h-96 flex items-center justify-center">
                 <p className="text-gray-500">[ Support / Expert Image Placeholder ]</p>
              </div>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">STAY UP TO DATE WITH OUR EXPERTS!</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Our local and international teams are here to support you on a 24/5 basis in more than 20 languages, while our wide range of payment methods gives you greater flexibility when it comes to deposits and withdrawals.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Experience More Than Trading</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Our success is centred around a number of core values. They include providing competitive brokerage fees through tight spreads, ensuring lightning-fast execution, access to advanced trading platforms with a wide range of products, and exceptional customer service.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/register" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-150">
                Start Trading Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}