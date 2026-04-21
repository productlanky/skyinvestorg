export function TopTicker() {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <iframe 
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no" 
          width="100%" height="36px" scrolling="auto" frameBorder="0" className="w-full"
        />
      </div>
    </div>
  );
}

export function StickyBottomTicker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900 border-t border-gray-800">
      <div className="h-[46px] w-full">
        <iframe 
          scrolling="no" allowTransparency={true} frameBorder="0" 
          src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22BTC%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22ETH%2FUSD%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A46%7D" 
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}