import IntroOverlay from '@/components/portfolio/IntroOverlay';
import KeywordPlanetsHero from '@/components/portfolio/keywordPlanets/KeywordPlanetsHero';
import DockedGlobe from '@/components/portfolio/belowGlobe/DockedGlobe';
import ProjectsSection from '@/components/portfolio/belowGlobe/ProjectsSection';
import FlightPathSection from '@/components/portfolio/belowGlobe/FlightPathSection';
import ClosingSection from '@/components/portfolio/belowGlobe/ClosingSection';
import StickyTopBar from '@/components/portfolio/StickyTopBar';
import JsonLd from '@/components/portfolio/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd />
      <IntroOverlay />
      <StickyTopBar />
      <KeywordPlanetsHero />
      <DockedGlobe />
      <ProjectsSection />
      <FlightPathSection />
      <ClosingSection />
    </>
  );
}
