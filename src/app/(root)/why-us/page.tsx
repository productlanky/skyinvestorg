import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import WhyUsHero from '@/components/why-us/WhyUsHero';
import WhyUsFeatures from '@/components/why-us/WhyUsFeatures';
import TrustIndicators from '@/components/why-us/TrustIndicators';
import WhyUsAbout from '@/components/why-us/WhyUsAbout';
import WhyUsExpertSupport from '@/components/why-us/WhyUsExpertSupport';

export default function WhyUsPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <WhyUsHero />
        <WhyUsFeatures />
        <TrustIndicators />
        <WhyUsAbout />
        <WhyUsExpertSupport />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}