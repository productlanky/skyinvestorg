import { Mail, MessageCircle, ShieldCheck, ArrowRight, Terminal } from 'lucide-react';

export default function SharesContactCTA() {
  return (
    <section className="py-32 bg-[#020305] relative overflow-hidden">
      
      {/* Background Depth & Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-600/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Outer Glow Wrapper */}
        <div className="relative group perspective-[1500px]">
          
          <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-30 group-hover:opacity-100 transition-opacity duration-1000"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}></div>
          
          {/* Main Comms Panel */}
          <div className="relative bg-[#0D1117]/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col"
               style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
            
            {/* Terminal Status Bar */}
            <div className="w-full flex justify-between items-center px-6 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center space-x-3">
                <Terminal className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">Module_Comms_Link</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Agents Online</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              
              {/* Asynchronous Channel (Email) */}
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="w-12 h-12 rounded bg-white/[0.02] border border-white/10 flex items-center justify-center mb-6">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Client Desk.</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 max-w-sm">
                  Transmit inquiries regarding corporate actions, dividend schedules, or custom equity routing solutions.
                </p>
                <a 
                  href="mailto:info@skyinvestorg.com" 
                  className="group inline-flex items-center space-x-3"
                >
                  <span className="text-xs font-mono font-bold text-gray-300 group-hover:text-emerald-400 transition-colors tracking-widest">info@skyinvestorg.com</span>
                  <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>

              {/* Synchronous Channel (Live Chat) */}
              <div className="p-10 md:p-16 flex flex-col justify-center relative">
                {/* Security Watermark */}
                <ShieldCheck className="absolute top-10 right-10 w-32 h-32 text-emerald-500/5 pointer-events-none" />
                
                <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Direct Link.</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 max-w-sm relative z-10">
                  Establish a secure, real-time connection with our institutional support engineers for immediate execution assistance.
                </p>
                
                <button 
                  className="group relative flex items-center justify-center h-14 px-8 bg-emerald-600 w-full sm:w-max overflow-hidden transition-colors hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  <span className="relative z-10 text-xs font-black text-white uppercase tracking-widest flex items-center">
                    Initialize Protocol <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}