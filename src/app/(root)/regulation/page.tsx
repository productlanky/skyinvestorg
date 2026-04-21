import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import RegulationHero from '@/components/regulation/RegulationHero';
import RegulationContent from '@/components/regulation/RegulationContent';
import RegulatoryFramework from '@/components/regulation/RegulatoryFramework';
import RegulationCTA from '@/components/regulation/RegulationCTA';

export default function RegulationPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <RegulationHero />
        <RegulationContent />
        <RegulatoryFramework />
        <RegulationCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}