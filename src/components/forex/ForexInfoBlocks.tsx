import { Target, TrendingUp, Shield, BarChart2, Calendar, LineChart, CheckCircle2, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function ForexInfoBlocks() {
  return (
    <>
      {/* Why Trade Forex */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Advanced Forex Trading Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Competitive Spreads', icon: Target, desc: 'Trade with some of the tightest spreads in the industry across major, minor, and exotic currency pairs.' },
              { title: 'Powerful Leverage', icon: TrendingUp, desc: 'Access up to 1:500 leverage to maximize your trading potential and capitalize on even the smallest price movements.' },
              { title: 'Advanced Risk Management', icon: Shield, desc: 'Utilize stop loss, take profit, and guaranteed stop loss orders to protect your positions.' }
            ].map((f, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-blue-500/50">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Demo Account */}
      <section className="py-16 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Tools List */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white">Professional Forex Trading Tools</h2>
              </div>
              {[
                { title: 'Real-time Market Analysis', icon: BarChart2, desc: 'Access in-depth market analysis with real-time data feeds, economic calendars, and market news.' },
                { title: 'Economic Calendar', icon: Calendar, desc: 'Stay updated with upcoming economic events and announcements that impact currency markets.' },
                { title: 'Advanced Charts', icon: LineChart, desc: 'Utilize our sophisticated charting tools with over 50 technical indicators and drawing tools.' }
              ].map((t, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">{t.title}</h3>
                    <p className="mt-2 text-gray-300">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Account Box */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 transform rotate-3"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-6">
                  <Monitor className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Try Our Demo Account</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Practice forex trading with our risk-free demo account loaded with $50,000 in virtual funds. Test strategies, explore platform features, and gain confidence.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
                    Open Demo Account
                  </Link>
                  <div className="flex space-x-4 mt-4 sm:mt-0">
                    <span className="flex items-center text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-400 mr-1" /> Real-time data</span>
                    <span className="flex items-center text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-400 mr-1" /> All features</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trade What You Want (Flexibility) */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trade What You Want, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">When You Want</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                One of the primary goals of SkyInvestOrg is to provide the best product in the market. Our relationships with leading tier one financial institutions mean deep liquidity and tighter spreads for Forex traders.
              </p>
              <ul className="space-y-4">
                {['Trade Forex, Indices, Shares & Commodities', 'Access global markets 24 hours / 7 days', 'Multilingual customer support', 'Trade on the go on our mobile apps'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-flex items-center px-8 py-3 font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 shadow-lg transition">
                Learn More About Our Services
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl opacity-20 filter blur-xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 h-64 md:h-96 flex items-center justify-center">
                <p className="text-gray-500">[ Platform Image Placeholder ]</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}