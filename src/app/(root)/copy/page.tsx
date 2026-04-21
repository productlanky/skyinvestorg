import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import CopyHero from '@/components/copy/CopyHero';
import CopyFeatures from '@/components/copy/CopyFeatures';
import HowCopyWorks from '@/components/copy/HowCopyWorks';
import CopyExpertSupport from '@/components/copy/CopyExpertSupport';
import CopyCTA from '@/components/copy/CopyCTA';

export default function CopyTradingPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <CopyHero />
        <CopyFeatures />
        <HowCopyWorks />
        <CopyExpertSupport />
        <CopyCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}