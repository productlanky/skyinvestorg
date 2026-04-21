export function TopTicker() {
  return (
    <div className="bg-[#05070a] border-b border-white/5 relative z-[60]">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-2">
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 border-r border-white/10 pr-4">
            <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global_Index</span>
          </div>
          
          <div className="flex-1 h-[36px] overflow-hidden rounded-lg opacity-80 hover:opacity-100 transition-opacity">
            <iframe 
              src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no" 
              width="100%" 
              height="36px" 
              scrolling="no" 
              frameBorder="0" 
              /* Lowercase to satisfy React's custom attribute rule without TypeScript yelling */
              // @ts-ignore
              allowtransparency="true"
              className="w-full grayscale brightness-125 contrast-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StickyBottomTicker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#05070a]/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Brand Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600"></div>
      
      <div className="h-[46px] w-full flex items-center overflow-hidden">
        {/* Terminal Label */}
        <div className="hidden md:flex px-6 h-full items-center bg-brand-600 text-white border-r border-white/10 z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Live_Tape</span>
        </div>

        <div className="flex-1 h-full">
          <iframe 
            scrolling="no" 
            frameBorder="0" 
            src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22BTC%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22ETH%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ASOLUSD%22%2C%22title%22%3A%22SOL%2FUSD%22%7D%2C%7B%22proName%22%3A%22FX%3AGBPUSD%22%2C%22title%22%3A%22GBP%2FUSD%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A46%7D" 
            className="w-full h-full block mix-blend-screen"
          />
        </div>
        
        {/* Connection Status */}
        <div className="hidden lg:flex px-6 h-full items-center border-l border-white/10 space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success-500 shadow-[0_0_8px_#10b981]"></div>
          <span className="text-[10px] font-mono text-gray-500 uppercase">Secure</span>
        </div>
      </div>
    </div>
  );
}