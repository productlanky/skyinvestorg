import FaqHero from '@/components/faq/FaqHero';
import FaqContent from '@/components/faq/FaqContent';
import FaqSupportCTA from '@/components/faq/FaqSupportCTA';

export default function FaqPage() {
  return (
    <main id="main-content" className="flex-grow">
      <FaqHero />
      <FaqContent />
      <FaqSupportCTA />
    </main>
  );
}