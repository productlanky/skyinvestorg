import { Search } from 'lucide-react';
import Link from 'next/link';

// Mock data to replace the old jQuery DataTable
const cryptoData = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$69,814.00', change: '+2.45%', isUp: true, cap: '$1.3T', spread: '0.1' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,420.15', change: '-0.85%', isUp: false, cap: '$410B', spread: '0.2' },
  { symbol: 'USDT', name: 'Tether', price: '$1.00', change: '0.00%', isUp: true, cap: '$103B', spread: '0.01' },
  { symbol: 'BNB', name: 'BNB', price: '$590.30', change: '+5.20%', isUp: true, cap: '$88B', spread: '0.5' },
  { symbol: 'SOL', name: 'Solana', price: '$145.20', change: '-1.20%', isUp: false, cap: '$65B', spread: '0.3' },
  { symbol: 'XRP', name: 'Ripple', price: '$0.62', change: '+1.15%', isUp: true, cap: '$34B', spread: '0.05' },
];

export default function CryptoMarketsTable() {
  return (
    <section id="crypto-table" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 rounded-full border border-blue-800/50">
            Live Markets
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Cryptocurrency Markets</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Trade CFDs on the world's most popular cryptocurrencies with competitive spreads and advanced tools
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search cryptos..." 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <select className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow">
                <option>All Cryptocurrencies</option>
                <option>Major Cryptocurrencies</option>
                <option>Altcoins</option>
                <option>DeFi Tokens</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left text-gray-300 whitespace-nowrap">
              <thead className="text-xs uppercase bg-gray-900 text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">24h Change</th>
                  <th className="px-6 py-4 font-semibold">Market Cap</th>
                  <th className="px-6 py-4 font-semibold">Spread</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cryptoData.map((coin) => (
                  <tr key={coin.symbol} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{coin.symbol}</td>
                    <td className="px-6 py-4">{coin.name}</td>
                    <td className="px-6 py-4 font-medium text-white">{coin.price}</td>
                    <td className={`px-6 py-4 font-medium ${coin.isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change}
                    </td>
                    <td className="px-6 py-4">{coin.cap}</td>
                    <td className="px-6 py-4">{coin.spread}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Trade</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}