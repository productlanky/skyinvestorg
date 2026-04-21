import AutomateHero from '@/components/automate/AutomateHero';
import AutomateFeatures from '@/components/automate/AutomateFeatures';
import AutomateFAQ from '@/components/automate/AutomateFAQ';
import AutomateExpertSupport from '@/components/automate/AutomateExpertSupport';
import AutomateCTA from '@/components/automate/AutomateCTA';

export default function AutomatePage() {
  return (
      <main id="main-content" className="flex-grow">
        <AutomateHero />
        <AutomateFeatures />
        <AutomateFAQ />
        <AutomateExpertSupport />
        <AutomateCTA />
      </main>
  );
}