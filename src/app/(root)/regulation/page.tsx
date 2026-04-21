import RegulationHero from '@/components/regulation/RegulationHero';
import RegulationContent from '@/components/regulation/RegulationContent';
import RegulatoryFramework from '@/components/regulation/RegulatoryFramework';
import RegulationCTA from '@/components/regulation/RegulationCTA';

export default function RegulationPage() {
  return (
    <main id="main-content" className="flex-grow">
      <RegulationHero />
      <RegulationContent />
      <RegulatoryFramework />
      <RegulationCTA />
    </main>
  );
}