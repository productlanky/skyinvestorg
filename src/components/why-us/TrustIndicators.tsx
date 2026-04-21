import { CheckCircle2 } from 'lucide-react';

const indicators = [
  { value: 'Tier-1', label: 'Liquidity Providers' },
  { value: '100%', label: 'Capital Segregation' },
  { value: '24/7', label: 'Network Monitoring' },
  { value: '0.0', label: 'Dealing Interventions' }
];

export default function TrustIndicators() {
  return (
    <section className="py-12 bg-[#020305] border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">System_Trust_Verification</span>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-6 md:gap-12">
            {indicators.map((ind, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/[0.02] border border-white/5 px-6 py-3"
                   style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <div>
                  <span className="block text-lg font-mono font-bold text-white leading-none">{ind.value}</span>
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">{ind.label}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}