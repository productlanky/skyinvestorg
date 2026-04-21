import Link from 'next/link';
import { CheckCircle2, Crown, Star, Gem, Zap, ShieldCheck, ArrowRight, Fingerprint, Lock } from 'lucide-react';

const plans = [
  { name: 'Starter Tier', return: '5%', min: '250', max: '2,900', icon: Zap, tag: 'Standard' },
  { name: 'Regular Tier', return: '15%', min: '1,000', max: '10,900', icon: Star, tag: 'High-Growth', highlight: true },
  { name: 'Gold Tier', return: '12.3%', min: '3,000', max: '31,500', icon: Crown, tag: 'Balanced' },
  { name: 'Diamond Tier', return: '20%', min: '10,000', max: '150,000', icon: Gem, tag: 'Elite', highlight: true }
];

export default function CompleteInvestmentPlans() {
  return (
    <section className="py-32 bg-[#05070a] relative overflow-hidden" id="pricing">
      {/* Background Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0zNiAzNGhLTJWMjRoMnpNNDAgMjRoLTJ2MTBoMnpNNDQgMjRoLTJ2MTBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        
        {/* Header Block: Left Aligned, Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <Fingerprint className="text-brand-500 w-8 h-8" />
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-brand-400">Yield Configuration</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none mb-6">
              Sovereign <br /> <span className="text-brand-500 italic">Investment</span> Tiers.
            </h2>
          </div>
          <div className="md:text-right mt-8 md:mt-0">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-2">Total Verified AUM</p>
            <p className="text-4xl font-mono font-bold text-white">$482,901,200.00</p>
          </div>
        </div>

        {/* The Ledger List */}
        <div className="space-y-6">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`group relative overflow-hidden transition-all duration-500 border-l-4 ${
                plan.highlight ? 'border-brand-500 bg-white/[0.03]' : 'border-white/10 bg-transparent hover:bg-white/[0.01]'
              }`}
            >
              {/* Animated Scan Line on Hover */}
              <div className="absolute inset-0 w-full h-[1px] bg-brand-500/20 -translate-y-full group-hover:translate-y-[500px] transition-all duration-[2s] pointer-events-none"></div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 md:p-12">
                
                {/* 01. Tier Identifier */}
                <div className="md:col-span-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                      plan.highlight ? 'border-brand-500 bg-brand-500/20 text-brand-400' : 'border-white/10 text-gray-500'
                    }`}>
                      <plan.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{plan.tag} // SECURED</span>
                    </div>
                  </div>
                </div>

                {/* 02. Performance Metrics */}
                <div className="md:col-span-2 text-center md:text-left border-l border-white/5 md:pl-8">
                  <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Target_Yield</p>
                  <p className="text-4xl font-mono font-bold text-success-400">{plan.return}</p>
                </div>

                {/* 03. Entry Requirements */}
                <div className="md:col-span-4 flex justify-around items-center border-x border-white/5 px-8">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Min_Entry</p>
                    <p className="text-xl font-mono text-white">${plan.min}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Max_Exposure</p>
                    <p className="text-xl font-mono text-white">${plan.max}</p>
                  </div>
                </div>

                {/* 04. Status & Action */}
                <div className="md:col-span-3 flex items-center justify-end space-x-6">
                  <div className="hidden lg:block text-right">
                    <div className="flex items-center text-xs text-brand-400 font-mono mb-1">
                      <Lock className="w-3 h-3 mr-1" /> ENCRYPTED
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-4 h-1 bg-brand-500/30 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 animate-pulse" style={{ width: `${s * 20}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href="/login"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-brand-600 hover:border-brand-500 transition-all duration-300 group/btn"
                  >
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Footer Notes */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5">
          <div className="flex items-center space-x-4 opacity-40">
            <Fingerprint className="w-5 h-5 text-white" />
            <p className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Institutional_Verification_Active</p>
          </div>
          <p className="text-[10px] font-mono text-gray-600 max-w-xl md:text-right uppercase tracking-widest leading-loose">
            Yield percentages are net of commission and representative of 2025 performance data. Principal protection is active for all accounts above the Tier-2 threshold.
          </p>
        </div>

      </div>
    </section>
  );
}