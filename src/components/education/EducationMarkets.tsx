import { Globe2, Layers, Bitcoin, Sliders, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const marketTypes = [
  {
    title: 'Forex',
    desc: 'Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. The basis of the forex market is the fluctuations of exchange rates. Forex traders speculate on the price fluctuations of currency pairs, making money on the difference between buying and selling prices.',
    icon: Globe2,
    color: 'blue',
    link: '/forex'
  },
  {
    title: 'CFD',
    desc: 'A CFD, or Contract for Difference, is a type of financial instrument that allows you to trade on the price movements of stocks, regardless of whether prices are rising or falling. The key advantage of a CFD is the opportunity to speculate on the price movements of an asset (upwards or downwards) without actually owning the underlying asset.',
    icon: Layers,
    color: 'emerald',
    link: '/shares'
  },
  {
    title: 'Cryptocurrency',
    desc: 'A cryptocurrency, crypto currency or crypto is a digital asset designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger existing in a form of computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership.',
    icon: Bitcoin,
    color: 'purple',
    link: '/cryptocurrencies'
  },
  {
    title: 'Digital Options',
    desc: 'Digital Options is a trading instrument that allows you to speculate on the extent of the price change, rather than just on the general price direction. If the price of the underlying asset is to reach the threshold selected by the trader (known as the \'strike price\'), the payout may get as high as 900%. However, an unsuccessful trade will result in loss of the investment.',
    icon: Sliders,
    color: 'indigo',
    link: '/trade'
  }
];

export default function EducationMarkets() {
  return (
    <section id="markets" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full mb-4">
            Trading Education
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Build Your Trading Skills</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Educate yourself and strengthen your trading strategies with our comprehensive resources and robust trading tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketTypes.map((market) => (
            <div key={market.title} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-${market.color}-600 to-${market.color}-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300`}></div>
              
              <div className={`relative bg-gray-800/80 backdrop-filter backdrop-blur-sm p-6 rounded-xl border border-gray-700 group-hover:border-${market.color}-500 transition duration-300 h-full flex flex-col`}>
                
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-${market.color}-900/50 flex items-center justify-center mr-4`}>
                    <market.icon className={`w-6 h-6 text-${market.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{market.title}</h3>
                </div>

                <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                  {market.desc}
                </p>

                <div className="mt-auto flex justify-end pt-4 border-t border-gray-700/50">
                  <Link href={market.link} className={`text-${market.color}-400 group-hover:text-${market.color}-300 transition duration-300 flex items-center font-medium`}>
                    Learn more
                    <ArrowRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition duration-300" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}