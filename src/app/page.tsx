import IntroOverlay from '@/components/portfolio/IntroOverlay';
import KeywordPlanetsHero from '@/components/portfolio/keywordPlanets/KeywordPlanetsHero';
import StickyTopBar from '@/components/portfolio/StickyTopBar';
import CaseStudies from '@/components/portfolio/CaseStudies';
import OtherProjects from '@/components/portfolio/OtherProjects';
import ExperienceGantt from '@/components/portfolio/ExperienceGantt';
import ContactSection from '@/components/portfolio/ContactSection';
import JsonLd from '@/components/portfolio/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd />
      <IntroOverlay />
      <StickyTopBar />
      <KeywordPlanetsHero />
      <CaseStudies />
      <OtherProjects />
      <ExperienceGantt />
      <ContactSection />
    </>
  );
}
