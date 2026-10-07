import dynamic from 'next/dynamic';
import Hero from '@/components/portfolio/Hero';
import IntroOverlay from '@/components/portfolio/IntroOverlay';
import ProofNumbers from '@/components/portfolio/ProofNumbers';
import StickyTopBar from '@/components/portfolio/StickyTopBar';
import CaseStudies from '@/components/portfolio/CaseStudies';
import OtherProjects from '@/components/portfolio/OtherProjects';
import ExperienceGantt from '@/components/portfolio/ExperienceGantt';
import ContactSection from '@/components/portfolio/ContactSection';
import JsonLd from '@/components/portfolio/JsonLd';

const SkillsNetwork = dynamic(() => import('@/components/portfolio/SkillsNetwork'), {
  loading: () => (
    <section
      id="skills"
      className="border-b border-grid px-5 py-16 md:px-8"
      aria-label="Skills network loading"
    >
      <div className="mx-auto grid max-w-[1360px] min-h-[280px] grid-cols-2 gap-4 font-mono text-sm text-muted">
        <p>Data &amp; ML</p>
        <p className="text-right">Front-end</p>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <>
      <JsonLd />
      <IntroOverlay />
      <StickyTopBar />
      <Hero />
      <ProofNumbers />
      <SkillsNetwork />
      <CaseStudies />
      <OtherProjects />
      <ExperienceGantt />
      <ContactSection />
    </>
  );
}
