import IndicesHero from '@/components/indices/IndicesHero';
import IndicesMarketTable from '@/components/indices/IndicesMarketTable';
import IndicesFeatures from '@/components/indices/IndicesFeatures';
import IndicesCTA from '@/components/indices/IndicesCTA';

export default function IndicesPage() {
  return (
    <main id="main-content" className="flex-grow">
      <IndicesHero />
      <IndicesMarketTable />
      <IndicesFeatures />
      <IndicesCTA />
    </main>
  );
}