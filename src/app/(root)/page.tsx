import Hero from '@/components/home/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import TradingWidgets from '@/components/home/TradingWidgets';
import TradingProducts from '@/components/home/TradingProducts';
import CopyTradingAndFeatures from '@/components/home/CopyTradingAndFeatures';
import CompleteInvestmentPlans from '@/components/home/CompleteInvestmentPlans';
import TestimonialsAndLogos from '@/components/home/TestimonialsAndLogos';
import { TopTicker } from '@/components/home/Tickers';

export default function Home() {
  return (
    <main id="main-content" className="flex-grow">
      <Hero />
      <TopTicker />
      <FeaturesGrid />
      <TradingWidgets />
      <TradingProducts />
      <CopyTradingAndFeatures />
      <CompleteInvestmentPlans />
      <TestimonialsAndLogos />
    </main>
  );
}