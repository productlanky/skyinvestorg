import { Mail, MessageCircle } from 'lucide-react';

export default function SharesContactCTA() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          
          <div className="relative px-8 py-12 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/30 to-emerald-400/30 blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Connect Section */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Connect With Us</h3>
                <p className="text-gray-300 mb-6 text-lg">Get in touch with our expert team for personalized support</p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <a href="mailto:info@skyinvestorg.com" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>

              {/* Live Chat Section */}
              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gray-700 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help?</h3>
                <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center">
                  <MessageCircle className="mr-3 w-6 h-6" />
                  Start Live Chat
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}