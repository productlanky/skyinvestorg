import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import ForexHero from '@/components/forex/ForexHero';
import ForexMarketTable from '@/components/forex/ForexMarketTable';
import ForexInfoBlocks from '@/components/forex/ForexInfoBlocks';
import ForexCTA from '@/components/forex/ForexCTA';

export default function ForexPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <ForexHero />
        <ForexMarketTable />
        <ForexInfoBlocks />
        <ForexCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      
      {/* Note: I'm reusing the existing sticky ticker. The forex-specific 
          URL you provided is functionally identical to the global one */}
      <StickyBottomTicker />
      
    </div>
  );
}