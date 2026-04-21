import Link from 'next/link';
import { Terminal, Twitter, Linkedin, Mail, Monitor, Smartphone, ShieldAlert, Network } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020305] relative overflow-hidden pt-20 pb-10 border-t border-white/5">
      
      {/* Abstract Grid & Top Scan Line */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
      
      {/* Ambient Core Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Footer: System Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: System Info (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-brand-500" />
              <Link href="/" className="text-2xl font-black text-white tracking-tighter uppercase">
                SkyInvest<span className="text-brand-500 italic">Org.</span>
              </Link>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 pr-4">
              Institutional infrastructure for the sovereign trader. Providing Direct Market Access (DMA), zero-latency routing, and raw liquidity across global asset classes.
            </p>
            
            {/* Comms Links */}
            <div className="flex space-x-4">
              <a href="#" className="group flex items-center justify-center w-10 h-10 bg-white/[0.02] border border-white/10 hover:border-brand-500/50 transition-all"
                 style={{ clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}>
                <span className="sr-only">Twitter</span>
                <Twitter className="w-4 h-4 text-gray-500 group-hover:text-brand-400 transition-colors" />
              </a>
              <a href="#" className="group flex items-center justify-center w-10 h-10 bg-white/[0.02] border border-white/10 hover:border-brand-500/50 transition-all"
                 style={{ clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}>
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-4 h-4 text-gray-500 group-hover:text-brand-400 transition-colors" />
              </a>
              <a href="mailto:info@skyinvestorg.com" className="group flex items-center justify-center w-10 h-10 bg-brand-500/10 border border-brand-500/30 hover:bg-brand-500 hover:text-[#020305] transition-all shadow-[0_0_15px_rgba(31,149,201,0.2)] group-hover:shadow-[0_0_20px_rgba(31,149,201,0.5)]"
                 style={{ clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}>
                <span className="sr-only">Email Protocol</span>
                <Mail className="w-4 h-4 text-brand-400 group-hover:text-[#020305] transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Directory (2 Cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Core_Directory</h3>
            <ul className="space-y-4">
              {['About Us', 'Why Choose Us', 'Education', 'Contact'].map((link, i) => (
                <li key={i}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    <span className="font-mono text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-2 transition-all">{'>'}</span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Asset Classes (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Asset_Classes</h3>
            <ul className="space-y-4">
              {['Cryptocurrencies', 'Forex', 'Shares', 'Indices'].map((link, i) => (
                <li key={i}>
                  <Link href={`/${link.toLowerCase()}`} className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    <span className="font-mono text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-2 transition-all">{'>'}</span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Client Access (3 Cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Client_Access</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/login" className="group flex items-center text-sm font-medium text-gray-400 hover:text-brand-400 transition-colors">
                  <span className="font-mono text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-2 transition-all">{'>'}</span>
                  Terminal Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="group flex items-center text-sm font-medium text-gray-400 hover:text-brand-400 transition-colors">
                  <span className="font-mono text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-2 transition-all">{'>'}</span>
                  Initialize Account
                </Link>
              </li>
              <li>
                <Link href="/help" className="group flex items-center text-sm font-medium text-gray-400 hover:text-brand-400 transition-colors">
                  <span className="font-mono text-brand-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-2 transition-all">{'>'}</span>
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Execution Environments HUD */}
        <div className="py-6 border-t border-white/5 bg-white/[0.01]">
          <div className="flex flex-col md:flex-row items-center justify-between px-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Network className="w-4 h-4 text-brand-500" />
              <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Supported Environments</h4>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 border border-white/5 bg-white/[0.02]">
                <Monitor className="w-3 h-3 text-brand-400" />
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Web / Desktop</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 border border-white/5 bg-white/[0.02]">
                <Smartphone className="w-3 h-3 text-brand-400" />
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Mobile Protocol</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Directive & Copyright */}
        <div className="pt-10 pb-6 border-t border-white/5 mt-6">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Risk Warning Block */}
            <div className="md:col-span-8 p-6 bg-[#0D1117] border-l-2 border-brand-500 relative"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
              <div className="absolute top-0 right-0 px-2 py-1 bg-brand-500/10 text-brand-400 text-[8px] font-mono uppercase tracking-widest border-b border-l border-brand-500/30">
                Legal_Directive
              </div>
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed font-mono">
                  <span className="font-bold text-gray-300">RISK WARNING:</span> The Financial Products offered by this infrastructure include Contracts for Difference (&apos;CFDs&apos;) and margin-based derivatives. Executing these protocols carries a severe level of risk due to leverage magnification. Capital deployed may be entirely forfeited. Do not deploy operational capital you cannot afford to lose.
                </p>
              </div>
            </div>

            {/* Copyright & Legal Links */}
            <div className="md:col-span-4 flex flex-col justify-between h-full text-right">
              <div className="flex flex-col space-y-2 mb-4">
                <Link href="/terms" className="text-[10px] font-mono text-gray-500 hover:text-brand-400 uppercase tracking-widest transition-colors">Terms of Execution</Link>
                <Link href="/privacy" className="text-[10px] font-mono text-gray-500 hover:text-brand-400 uppercase tracking-widest transition-colors">Data Privacy Protocol</Link>
              </div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                SYS_COPYRIGHT &copy; {currentYear} <br/> SkyInvestOrg. All Systems Go.
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}