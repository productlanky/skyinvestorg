import CopyHero from '@/components/copy/CopyHero';
import CopyFeatures from '@/components/copy/CopyFeatures';
import HowCopyWorks from '@/components/copy/HowCopyWorks';
import CopyExpertSupport from '@/components/copy/CopyExpertSupport';
import CopyCTA from '@/components/copy/CopyCTA';

export default function CopyTradingPage() {
  return (
      <main id="main-content" className="flex-grow">
        <CopyHero />
        <CopyFeatures />
        <HowCopyWorks />
        <CopyExpertSupport />
        <CopyCTA />
      </main>
  );
}