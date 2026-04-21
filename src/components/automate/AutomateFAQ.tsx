"use client";

import { useState } from 'react';
import { Terminal, ChevronDown, FolderTree } from 'lucide-react';

const automateFaqData = [
  { q: "How do I request FIX API credentials?", a: "FIX API access is available for institutional and high-volume sovereign accounts. Once your account is fully verified and funded with the minimum required capital, you can request credentials directly via the Terminal Dashboard under 'API Integrations'." },
  { q: "What are the requirements for free VPS hosting?", a: "To qualify for a complimentary Equinix NY4 VPS, traders must maintain a minimum account balance of $5,000 and execute a minimum of 20 standard lots per calendar month. If requirements are not met, a $30/month fee applies." },
  { q: "Are there any restrictions on trading strategies?", a: "None. SkyInvestOrg operates a pure STP execution model. We welcome all algorithmic strategies, including High-Frequency Trading (HFT), aggressive scalping, news trading, and arbitrage models." },
  { q: "Can I run multiple algorithms simultaneously?", a: "Yes. You can deploy multiple Expert Advisors (EAs) or custom scripts across different sub-accounts, allowing you to compartmentalize and track the performance of individual algorithms without cross-interference." }
];

export default function AutomateFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-[#0D1117] relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <FolderTree className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Technical Data_Directory</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tighter">
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Ledger.</span>
            </h2>
          </div>
        </div>

        <div className="bg-[#020305] border border-white/5 backdrop-blur-xl relative"
             style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
             <div className="flex items-center space-x-2">
                <Terminal className="w-3 h-3 text-brand-500" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">DIR: Algorithmic_Ops</span>
             </div>
          </div>

          <div className="divide-y divide-white/5">
            {automateFaqData.map((item, idx) => (
              <div key={idx} className="group">
                <button 
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className={`font-mono text-[10px] ${openItems.includes(idx) ? 'text-brand-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`font-bold tracking-wide transition-colors ${openItems.includes(idx) ? 'text-brand-400' : 'text-white group-hover:text-gray-200'}`}>
                      {item.q}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openItems.includes(idx) ? 'rotate-180 text-brand-500' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(idx) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 pl-14 border-l-2 border-brand-500/30 ml-6 mb-6">
                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}