import TradeHero from '@/components/trade/TradeHero';
import TradeFeatures from '@/components/trade/TradeFeatures';
import TradeExpertSupport from '@/components/trade/TradeExpertSupport';

export default function TradePage() {
  return (
      <main id="main-content" className="flex-grow">
        <TradeHero />
        <TradeFeatures />
        <TradeExpertSupport />
      </main>
  );
}