import SharesHero from '@/components/shares/SharesHero';
import SharesMarketTable from '@/components/shares/SharesMarketTable';
import SharesFeatures from '@/components/shares/SharesFeatures';
import SharesContactCTA from '@/components/shares/SharesContactCTA';

export default function SharesPage() {
  return (
    <main id="main-content" className="flex-grow">
      <SharesHero />
      <SharesMarketTable />
      <SharesFeatures />
      <SharesContactCTA />
    </main>
  );
}