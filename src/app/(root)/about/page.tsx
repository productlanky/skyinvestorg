import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

import AboutHero from '@/components/about/AboutHero';
import OurValues from '@/components/about/OurValues';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutStory from '@/components/about/AboutStory';
import ExpertSupport from '@/components/about/ExpertSupport';

export default function AboutPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <AboutHero />
        <OurValues />
        <WhyChooseUs />
        <AboutStory />
        <ExpertSupport />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}