import EtfHero from '@/components/etfs/EtfHero';
import EtfMarketTable from '@/components/etfs/EtfMarketTable';
import EtfBenefits from '@/components/etfs/EtfBenefits';
import EtfCTA from '@/components/etfs/EtfCTA';

export default function EtfsPage() {
  return (
      <main id="main-content" className="flex-grow">
        <EtfHero />
        <EtfMarketTable />
        <EtfBenefits />
        <EtfCTA />
      </main>
  );
}