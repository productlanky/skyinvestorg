import { Globe, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

const jurisdictions = [
  { region: 'United Kingdom', regulator: 'Financial Conduct Authority (FCA)', license: 'FRN: 827461', type: 'Tier 1' },
  { region: 'European Union', regulator: 'Cyprus Securities and Exchange Commission (CySEC)', license: 'CIF: 342/17', type: 'Tier 1' },
  { region: 'Australia', regulator: 'Australian Securities & Investments Commission (ASIC)', license: 'AFSL: 491139', type: 'Tier 1' },
  { region: 'Global / Offshore', regulator: 'Financial Services Authority (FSA)', license: 'SD046', type: 'Tier 3' }
];

export default function RegulatoryFramework() {
  return (
    <section className="py-24 bg-[#0D1117] relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-amber-400">Jurisdiction Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 italic">Licenses.</span>
            </h2>
          </div>
        </div>

        {/* The License Ledger */}
        <div className="bg-[#020305] border border-white/5 backdrop-blur-xl relative overflow-hidden"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
             <div className="flex items-center space-x-2">
                <Terminal className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Registry_Query_Success</span>
             </div>
             <div className="flex items-center space-x-2">
                <Activity className="w-3 h-3 text-success-500 animate-pulse" />
                <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Status: Compliant</span>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#05070a]">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Region</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Regulatory Body</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">License No.</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">Classification</th>
                  <th className="px-6 py-5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jurisdictions.map((gov, i) => (
                  <tr key={i} className="group hover:bg-white/[0.03] transition-colors duration-200">
                    <td className="px-6 py-6 font-bold text-white tracking-wide">{gov.region}</td>
                    <td className="px-6 py-6 text-sm text-gray-300">{gov.regulator}</td>
                    <td className="px-6 py-6 font-mono font-bold text-amber-400">{gov.license}</td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        {gov.type}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <Link 
                        href="/contact" 
                        className="inline-flex px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-[#05070a] font-mono text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Verify PDF
                      </Link>
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