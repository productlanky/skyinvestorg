"use client";

import { useState } from 'react';
import { Search, ChevronDown, FolderTree, Terminal } from 'lucide-react';

const faqData = [
  {
    category: "Account Protocols",
    items: [
      { q: "What documentation is required for Level-3 Verification?", a: "To achieve Level-3 verification and unlock unlimited capital routing, you must provide government-issued ID, proof of residential address (within 90 days), and a source of wealth declaration. Corporate entities require incorporation certificates and UBO registries." },
      { q: "How are client funds safeguarded?", a: "All client capital is held in strictly segregated accounts with Tier-1 global banking institutions. We utilize multi-signature cold storage for digital assets, ensuring absolute isolation from operational liquidity." },
      { q: "Can I open multiple trading sub-accounts?", a: "Yes. Sovereign accounts can generate up to 10 distinct sub-accounts via the terminal dashboard to compartmentalize algorithmic and manual trading strategies." }
    ]
  },
  {
    category: "Execution & Routing",
    items: [
      { q: "What is your average order execution latency?", a: "Our proprietary matching engine, co-located in Equinix NY4 and LD4 data centers, executes at an average latency of <12 milliseconds, bypassing standard retail bottlenecks." },
      { q: "Do you operate an A-Book or B-Book model?", a: "SkyInvestOrg operates a pure STP (Straight Through Processing) A-Book model. Trades are routed directly to our aggregated pool of 25+ liquidity providers. We do not take the opposite side of client trades." },
      { q: "Are algorithmic strategies (EAs/Bots) permitted?", a: "Unrestricted. We welcome all HFT (High-Frequency Trading), scalping, and algorithmic protocols. Our FIX API supports seamless integration for C# and Python deployments." }
    ]
  },
  {
    category: "Funding & Withdrawals",
    items: [
      { q: "What are the supported base currencies?", a: "Terminals can be denominated in USD, EUR, GBP, CHF, and JPY. Digital asset base currencies (BTC, ETH, USDT) are also fully supported." },
      { q: "How long do withdrawal requests take to process?", a: "Standard fiat wires are processed within 24 hours. Digital asset withdrawals via the blockchain are processed dynamically via our hot-wallet infrastructure within 15 minutes." }
    ]
  }
];

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const activeData = faqData.find(c => c.category === activeCategory)?.items || [];
  
  // Filter by search if input exists, otherwise show category
  const displayedItems = searchQuery 
    ? faqData.flatMap(c => c.items).filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeData;

  return (
    <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-3 mb-4">
              <FolderTree className="w-5 h-5 text-brand-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Data_Directory</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tighter">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Ledger.</span>
            </h2>
          </div>
          
          {/* Command Line Search */}
          <div className="mt-8 md:mt-0 w-full md:w-96 relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenItems([]); // Reset accordions on search
              }}
              className="w-full bg-white/[0.02] border border-white/10 text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-brand-500 focus:bg-brand-500/5 transition-all placeholder:text-gray-600" 
              placeholder="QUERY_DATABASE..." 
              spellCheck="false"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-500/50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Category Nodes (3 Cols) */}
          <div className="xl:col-span-3 space-y-2">
            {!searchQuery && faqData.map(cat => (
              <button 
                key={cat.category} 
                onClick={() => setActiveCategory(cat.category)}
                className={`w-full flex items-center justify-between p-4 border-l-2 transition-all ${
                  activeCategory === cat.category 
                  ? 'border-brand-500 bg-gradient-to-r from-brand-500/10 to-transparent' 
                  : 'border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <span className={`font-bold tracking-widest uppercase text-xs ${activeCategory === cat.category ? 'text-white' : 'text-gray-400'}`}>
                  {cat.category}
                </span>
                <span className="text-[10px] font-mono text-gray-600">{cat.items.length}</span>
              </button>
            ))}
            {searchQuery && (
              <div className="p-4 border-l-2 border-brand-500 bg-brand-500/10">
                 <span className="font-bold tracking-widest uppercase text-xs text-brand-400">Search Results</span>
              </div>
            )}
          </div>

          {/* RIGHT: Query Results Ledger (9 Cols) */}
          <div className="xl:col-span-9">
            <div className="bg-[#0D1117]/80 border border-white/5 backdrop-blur-xl relative"
                 style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                 <div className="flex items-center space-x-2">
                    <Terminal className="w-3 h-3 text-brand-500" />
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                      {searchQuery ? `QUERY: ${searchQuery}` : `DIR: ${activeCategory}`}
                    </span>
                 </div>
                 <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Records: {displayedItems.length}</span>
              </div>

              <div className="divide-y divide-white/5">
                {displayedItems.map((item, idx) => (
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
                    
                    {/* Expandable Answer */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(idx) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 pt-0 pl-14 border-l-2 border-brand-500/30 ml-6 mb-6">
                        <p className="text-gray-400 font-light leading-relaxed text-sm">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {displayedItems.length === 0 && (
                  <div className="p-16 text-center">
                    <p className="text-gray-600 font-mono text-sm uppercase tracking-widest">ERR: 404 // NO_RECORDS_FOUND</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}