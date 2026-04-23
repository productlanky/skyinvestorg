import { ShieldCheck, Activity, Cpu, Terminal, Network, Zap, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ForexInfoBlocks() {
  return (
    <div className="bg-[#020305] relative">
      
      {/* SECTION 1: EXECUTION PROTOCOLS (Advanced Features) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/5 pb-8">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <Cpu className="w-5 h-5 text-brand-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">System Architecture</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Protocols.</span>
              </h2>
            </div>
            <p className="mt-6 md:mt-0 text-[10px] font-mono text-gray-500 uppercase tracking-widest max-w-sm md:text-right">
              Engineered for high-frequency algorithmic strategies and manual precision execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Raw Spread Aggregation', icon: Network, metric: '0.0 Pips', desc: 'Direct connection to Tier-1 liquidity providers ensuring the tightest possible quotes.' },
              { title: 'Margin Optimization', icon: Activity, metric: '1:500 Lev', desc: 'Dynamic margin allocation allowing maximum capital efficiency on minor price shifts.' },
              { title: 'Risk Shield Engine', icon: ShieldCheck, metric: 'Zero Slip', desc: 'Guaranteed stop-loss execution and negative balance protection hardcoded into the matching engine.' }
            ].map((f, i) => (
              <div key={i} className="group relative p-8 bg-gray-900/30 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gray-900/60 hover:border-brand-500/30"
                   style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-[50px] group-hover:bg-brand-500/20 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-brand-500/50 transition-colors">
                    <f.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <span className="text-2xl font-mono font-bold text-white opacity-80">{f.metric}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light relative z-10">{f.desc}</p>
                
                {/* Cyber Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: TERMINAL CAPABILITIES & SANDBOX */}
      <section className="py-24 bg-[#05070a] border-y border-white/5 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
            
            {/* Left: Tool Modules (7 Cols) */}
            <div className="xl:col-span-7 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">
                Professional <span className="text-brand-400 italic">Instrumentation.</span>
              </h2>
              
              <div className="space-y-6 relative border-l border-white/10 pl-8 ml-4">
                {[
                  { title: 'Level 2 Market Data', desc: 'View complete order book depth to analyze institutional order flow in real-time.' },
                  { title: 'Algorithmic Integration', desc: 'Deploy C# and Python automated strategies directly via our low-latency FIX API.' },
                  { title: 'Advanced Charting', desc: 'Over 80 technical indicators and drawing tools built directly into the web terminal.' }
                ].map((t, i) => (
                  <div key={i} className="relative group">
                    {/* Connection Node */}
                    <div className="absolute -left-[37px] top-2 w-[9px] h-[9px] rounded-full bg-[#05070a] border-2 border-brand-500 group-hover:bg-brand-400 group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(31,149,201,0.5)]"></div>
                    
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-brand-400 transition-colors">{t.title}</h3>
                    <p className="mt-2 text-sm text-gray-500 font-light max-w-md">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Demo Sandbox Console (5 Cols) */}
            <div className="xl:col-span-5 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-500/30 to-success-500/10 blur rounded-[2rem] opacity-50"></div>
              <div className="relative bg-[#0D1117] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden">
                
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-error-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-warning-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-success-500/50"></div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Environment: Sandbox</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white tracking-tighter mb-4">Simulated <br/><span className="text-brand-400 italic">Trading Environment.</span></h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                    Initialize a risk-free terminal environment loaded with <span className="text-white font-mono">$50,000.00</span> in virtual capital. Test routing speeds and UI capabilities before deploying live funds.
                  </p>
                  
                  {/* System Checklist */}
                  <div className="space-y-2 mb-8 border border-white/5 bg-white/[0.02] p-4 rounded-xl">
                    <div className="flex items-center text-xs font-mono text-gray-400"><CheckCircle2 className="w-3 h-3 text-success-500 mr-2" /> DATA_FEED: LIVE_AGGREGATE</div>
                    <div className="flex items-center text-xs font-mono text-gray-400"><CheckCircle2 className="w-3 h-3 text-success-500 mr-2" /> EXECUTION: INSTANT_STP</div>
                  </div>
                </div>

                <Link href="/register" className="group flex items-center justify-center w-full py-4 bg-white text-[#05070a] font-black uppercase tracking-widest text-xs transition-all hover:bg-gray-200"
                      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                  Create Account <Terminal className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: GLOBAL ROUTING (Flexibility) */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 mb-2">
                <Globe className="w-5 h-5 text-brand-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-400">Unrestricted Access</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1]">
                Deploy Capital, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500 italic">Without Borders.</span>
              </h2>
              <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
                SkyInvestOrg&apos;s primary directive is to provide borderless institutional liquidity. Trade the global markets 24/5 with infrastructure designed for the elite.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {['Forex, Indices & Metals', '24/5 Market Connectivity', 'Zero Deposit Fees', 'Instant Withdrawals'].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Zap className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center space-x-2 text-brand-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group">
                  <span>View Infrastructure Blueprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Pure CSS Global Routing Node (Replacing Image) */}
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Core Node */}
              <div className="relative z-20 w-32 h-32 rounded-full bg-gray-900 border border-brand-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(31,149,201,0.3)]">
                <Activity className="w-10 h-10 text-brand-400 animate-pulse" />
                {/* Ping Rings */}
                <div className="absolute inset-0 rounded-full border border-brand-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute inset-0 rounded-full border border-brand-500/10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </div>
              
              {/* Connecting Lines & Satellites */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                {/* Horizontal Line */}
                <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
                {/* Vertical Line */}
                <div className="absolute h-[120%] w-[1px] bg-gradient-to-b from-transparent via-brand-500/50 to-transparent"></div>
                {/* Diagonal Line */}
                <div className="absolute w-[100%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45"></div>
                
                {/* Floating Satellite Nodes */}
                <div className="absolute top-10 left-20 w-16 h-16 bg-gray-950 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md transform -rotate-12 animate-float">
                  <span className="text-[10px] font-mono text-white">NY4</span>
                </div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-gray-950 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md transform rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-[10px] font-mono text-white">LD4</span>
                </div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gray-950 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md animate-float" style={{ animationDelay: '2s' }}>
                  <span className="text-[10px] font-mono text-white">TY3</span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 text-[9px] font-mono text-gray-600 uppercase tracking-widest text-right">
                Global Server Array <br /> Equinix Interconnect
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}