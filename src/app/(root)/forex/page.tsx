import ForexHero from '@/components/forex/ForexHero';
import ForexMarketTable from '@/components/forex/ForexMarketTable';
import ForexInfoBlocks from '@/components/forex/ForexInfoBlocks';
import ForexCTA from '@/components/forex/ForexCTA';

export default function ForexPage() {
  return (
    <main id="main-content" className="flex-grow">
      <ForexHero />
      <ForexMarketTable />
      <ForexInfoBlocks />
      <ForexCTA />
    </main>
  );
}