import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import AutomateHero from '@/components/automate/AutomateHero';
import AutomateFeatures from '@/components/automate/AutomateFeatures';
import AutomateFAQ from '@/components/automate/AutomateFAQ';
import AutomateExpertSupport from '@/components/automate/AutomateExpertSupport';
import AutomateCTA from '@/components/automate/AutomateCTA';

export default function AutomatePage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <AutomateHero />
        <AutomateFeatures />
        <AutomateFAQ />
        <AutomateExpertSupport />
        <AutomateCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}