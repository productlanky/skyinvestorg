import AboutHero from '@/components/about/AboutHero';
import OurValues from '@/components/about/OurValues';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutStory from '@/components/about/AboutStory';
import ExpertSupport from '@/components/about/ExpertSupport';

export default function AboutPage() {
  return (
      <main id="main-content" className="flex-grow">
        <AboutHero />
        <OurValues />
        <WhyChooseUs />
        <AboutStory />
        <ExpertSupport />
      </main>
  );
}