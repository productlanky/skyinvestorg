import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import EtfHero from '@/components/etfs/EtfHero';
import EtfMarketTable from '@/components/etfs/EtfMarketTable';
import EtfBenefits from '@/components/etfs/EtfBenefits';
import EtfCTA from '@/components/etfs/EtfCTA';

export default function EtfsPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <EtfHero />
        <EtfMarketTable />
        <EtfBenefits />
        <EtfCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}