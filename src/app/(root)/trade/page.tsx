import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import TradeHero from '@/components/trade/TradeHero';
import TradeFeatures from '@/components/trade/TradeFeatures';
import TradeExpertSupport from '@/components/trade/TradeExpertSupport';

export default function TradePage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <TradeHero />
        <TradeFeatures />
        <TradeExpertSupport />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}