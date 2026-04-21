import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import IndicesHero from '@/components/indices/IndicesHero';
import IndicesMarketTable from '@/components/indices/IndicesMarketTable';
import IndicesFeatures from '@/components/indices/IndicesFeatures';
import IndicesCTA from '@/components/indices/IndicesCTA';

export default function IndicesPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <IndicesHero />
        <IndicesMarketTable />
        <IndicesFeatures />
        <IndicesCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}