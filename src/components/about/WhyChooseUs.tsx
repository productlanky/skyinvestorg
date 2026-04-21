import { Check, X, Terminal } from 'lucide-react';

const comparison = [
  { feature: 'Execution Model', retail: 'Market Maker (B-Book)', us: 'Pure STP (A-Book)' },
  { feature: 'Pricing Source', retail: 'Internal Dealing Desk', us: '25+ Aggregated Prime LPs' },
  { feature: 'Average Latency', retail: '150ms - 300ms', us: '< 12ms (NY4 Co-location)' },
  { feature: 'Conflict of Interest', retail: 'High (Profit from losses)', us: 'Zero (Volume-based revenue)' },
  { feature: 'Algo Restrictions', retail: 'Scalping/HFT Banned', us: 'All Strategies Encouraged' },
  { feature: 'Fund Security', retail: 'Commingled Accounts', us: 'Tier-1 Segregated / Cold Vaults' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#0D1117] relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Terminal className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">The Infrastructure Gap</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Retail vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Sovereign.</span>
            </h2>
          </div>
        </div>

        {/* The Comparison Ledger */}
        <div className="bg-[#020305] border border-white/5 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/[0.02]">
                <tr className="border-b border-white/10">
                  <th className="px-6 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest w-1/3">Infrastructure Metric</th>
                  <th className="px-6 py-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest w-1/3 border-l border-white/5">Standard Retail Broker</th>
                  <th className="px-6 py-6 text-sm font-black text-brand-400 uppercase tracking-widest w-1/3 border-l border-white/5 bg-brand-500/5">SkyInvestOrg Terminal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-6 text-sm font-bold text-white tracking-wide">{row.feature}</td>
                    
                    {/* Retail Column */}
                    <td className="px-6 py-6 border-l border-white/5">
                      <div className="flex items-center space-x-3 text-gray-500">
                        <X className="w-4 h-4" />
                        <span className="font-mono text-xs uppercase">{row.retail}</span>
                      </div>
                    </td>
                    
                    {/* Sovereign Column */}
                    <td className="px-6 py-6 border-l border-white/5 bg-brand-500/[0.02]">
                      <div className="flex items-center space-x-3 text-brand-400">
                        <Check className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold uppercase">{row.us}</span>
                      </div>
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