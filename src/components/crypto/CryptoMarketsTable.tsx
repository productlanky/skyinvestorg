import { ArrowUpRight } from 'lucide-react';

const marketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$64,120.00', change: '+1.2%', vol: '$32.1B', mkt: '$1.2T' },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,480.50', change: '+0.8%', vol: '$15.4B', mkt: '$418B' },
  { name: 'Solana', symbol: 'SOL', price: '$141.20', change: '-1.4%', vol: '$4.2B', mkt: '$62B' },
  { name: 'Ripple', symbol: 'XRP', price: '$0.62', change: '+0.1%', vol: '$1.2B', mkt: '$34B' },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+2.5%', vol: '$0.8B', mkt: '$16B' },
];

export default function CryptoMarketsTable() {
  return (
    <section className="py-24 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Live Price Ledger</h2>
            <p className="text-gray-500 font-light italic uppercase text-[10px] tracking-widest">Real-time aggregate data feed // Updated every 500ms</p>
          </div>
          <button className="text-brand-400 font-bold text-xs uppercase tracking-widest flex items-center hover:brightness-125 transition-all">
            Filter Assets <ArrowUpRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Asset Name</th>
                <th className="pb-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Last Price</th>
                <th className="pb-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">24H Change</th>
                <th className="pb-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Volume (24H)</th>
                <th className="pb-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {marketData.map((coin, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs text-white">
                        {coin.symbol[0]}
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-tight">{coin.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 font-mono text-white font-bold">{coin.price}</td>
                  <td className={`py-8 font-mono font-bold ${coin.change.startsWith('+') ? 'text-success-400' : 'text-error-400'}`}>
                    {coin.change}
                  </td>
                  <td className="py-8 font-mono text-gray-400">{coin.vol}</td>
                  <td className="py-8 font-mono text-white text-right font-bold">{coin.mkt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}