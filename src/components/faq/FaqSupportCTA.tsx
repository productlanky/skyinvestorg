import Link from 'next/link';
import { HelpCircle, ChevronRight } from 'lucide-react';

export default function FaqSupportCTA() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Support Info */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Still have questions?</h2>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Our support team is available 24/7 to help you with any questions or concerns you may have about our platform.
            </p>
            <div className="flex space-x-4">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-150">
                Contact Support
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Registration CTA */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden p-8 relative">
            <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-blue-500 to-teal-400"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to start trading?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Create an account now and start earning with our innovative trading platform. It only takes a few minutes to get started!
              </p>
              <div>
                <Link href="/register" className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-gray-900 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 transition duration-150 transform hover:-translate-y-1">
                  Create Account
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