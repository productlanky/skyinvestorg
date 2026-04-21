import WhyUsHero from '@/components/why-us/WhyUsHero';
import WhyUsFeatures from '@/components/why-us/WhyUsFeatures';
import TrustIndicators from '@/components/why-us/TrustIndicators';
import WhyUsAbout from '@/components/why-us/WhyUsAbout';
import WhyUsExpertSupport from '@/components/why-us/WhyUsExpertSupport';

export default function WhyUsPage() {
  return (
    <main id="main-content" className="flex-grow">
      <WhyUsHero />
      <WhyUsFeatures />
      <TrustIndicators />
      <WhyUsAbout />
      <WhyUsExpertSupport />
    </main>
  );
}