import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import EducationHero from '@/components/education/EducationHero';
import EducationMarkets from '@/components/education/EducationMarkets';
import EducationExplore from '@/components/education/EducationExplore';
import EducationCTA from '@/components/education/EducationCTA';

export default function EducationPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <EducationHero />
        <EducationMarkets />
        <EducationExplore />
        <EducationCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}