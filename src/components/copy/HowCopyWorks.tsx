import { Search, Sliders, CheckCircle2, Terminal } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    title: 'Identify Alpha',
    desc: 'Query our performance database to filter master accounts by ROI, maximum drawdown, asset class preference, and execution style (Manual vs. EA).',
    icon: Search
  },
  {
    step: '02',
    title: 'Configure Parameters',
    desc: 'Allocate a specific percentage of your sovereign capital. Define hard risk caps, volume multipliers, and loss thresholds to strictly govern the replication logic.',
    icon: Sliders
  },
  {
    step: '03',
    title: 'Initialize Synchronization',
    desc: 'Execute the binding protocol. Your terminal will instantly begin replicating the master&apos;s market entries, modifications, and exits in real-time.',
    icon: CheckCircle2
  }
];

export default function HowCopyWorks() {
  return (
    <section className="py-24 bg-[#0D1117] relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-20 text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Terminal className="w-5 h-5 text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Deployment Logic</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Timeline.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Data Line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[1px] bg-white/10 md:-translate-x-1/2"></div>
          {/* Scanning Beam */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-brand-500/50 md:-translate-x-1/2 shadow-[0_0_15px_#1f95c9] animate-[shimmer_3s_infinite]"></div>

          <div className="space-y-16">
            {processSteps.map((event, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node Indicator */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-[#0D1117] border-2 border-brand-500 transform -translate-x-1/2 mt-1 md:mt-0 z-10 shadow-[0_0_10px_rgba(31,149,201,0.5)]"></div>

                {/* Content Panel */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 group">
                  <div className="p-6 bg-[#020305] border border-white/5 backdrop-blur-sm transition-all hover:border-brand-500/30"
                       style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-mono font-black text-brand-400 tracking-tighter">SEQ_{event.step}</span>
                      <event.icon className="w-5 h-5 text-gray-500 group-hover:text-brand-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{event.desc}</p>
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