/* eslint-disable @next/next/no-img-element */
import { Zap, ShieldCheck, Cpu, Globe, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function CopyTradingAndFeatures() {
  return (
    <section className="bg-[#05070a] py-32 relative overflow-hidden">
      {/* 1. LAYERED BACKGROUND: Cyber-Luxe Textures */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Gradient Orb */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
        {/* Subtle Horizontal Rule Accent */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        {/* Base64 Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: THE TERMINAL (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative group">
              {/* Terminal Frame */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-3xl blur opacity-20"></div>
              <div className="relative bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Custom Terminal Header */}
                <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-error-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-warning-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-success-500/40"></div>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Institutional_Engine_v4.0</div>
                </div>

                {/* Main Content Area: Overlapping Elements */}
                <div className="relative h-[500px] bg-gray-950 overflow-hidden p-8">
                  <img 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200" 
                    alt="Institutional Trading" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

                  {/* Floating Data Card 1 */}
                  <div className="absolute top-12 left-8 bg-gray-900/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl w-48 animate-float">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-4 h-4 text-brand-400" />
                      <span className="text-[10px] text-brand-400 font-bold uppercase font-mono">Execute</span>
                    </div>
                    <p className="text-xl font-mono text-white">$4.2M</p>
                    <p className="text-[10px] text-gray-500">Order Vol. Pending</p>
                  </div>

                  {/* Floating Data Card 2 */}
                  <div className="absolute bottom-12 right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl w-64 transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    <BarChart3 className="w-8 h-8 text-success-400 mb-4" />
                    <h4 className="text-white font-bold text-lg mb-1">Live Alpha</h4>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-success-500 animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3 font-mono">SIGNAL_STRENGTH: HIGH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE SOVEREIGN COPY (6 Cols) */}
          <div className="lg:col-span-6 lg:pl-12 pt-10">
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="h-[2px] w-12 bg-brand-500"></div>
                  <span className="text-sm font-bold uppercase tracking-[0.4em] text-brand-400">The Infrastructure</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1] mb-8 tracking-tighter">
                  Evolve Beyond <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">Retail Trading.</span>
                </h2>
                <p className="text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                  Retail platforms are built for the masses. <span className="text-white font-medium">SkyInvestOrg</span> is built for the elite. Low latency, raw spreads, and institutional-tier liquidity are no longer exclusive to the big banks.
                </p>
              </div>

              {/* Unique Vertical Feature Blocks */}
              <div className="space-y-0 relative border-l border-white/10">
                {[
                  { 
                    t: 'Direct Market Access (DMA)', 
                    d: 'Your orders enter the exchange book via ultra-low latency fiber cross-connects.', 
                    icon: Globe 
                  },
                  { 
                    t: 'Sovereign Custody', 
                    d: 'Institutional asset segregation ensures your capital is protected at all times.', 
                    icon: ShieldCheck 
                  },
                  { 
                    t: 'Algorithmic Routing', 
                    d: 'Our Smart Order Router finds the deepest liquidity to minimize slippage.', 
                    icon: Cpu 
                  }
                ].map((f, i) => (
                  <div key={i} className="group relative pl-12 pb-12 last:pb-0">
                    {/* Connection Point */}
                    <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-gray-950 border-2 border-brand-500 z-20 group-hover:scale-150 transition-transform"></div>
                    
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                      {f.t}
                    </h4>
                    <p className="text-gray-500 font-light leading-relaxed max-w-md">
                      {f.d}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link href="/register" className="inline-flex items-center space-x-4 px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full transition-all group shadow-[0_20px_50px_rgba(31,149,201,0.2)]">
                  <span className="text-lg font-bold uppercase tracking-widest">Connect to NY4</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}