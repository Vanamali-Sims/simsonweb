'use client';

import { useEffect, useRef, useState } from 'react';
import type { WorkItem } from '@content/keywordPlanets';
import VisuallyHidden from '@/components/VisuallyHidden';
import MissionMedia from './MissionMedia';
import MissionResultVisual from './MissionResultVisual';
import PipelineDiagram from './PipelineDiagram';
import SkillDotLine from './SkillDotLine';
import styles from './belowGlobe.module.css';

function MissionLinks({ work }: { work: WorkItem }) {
  return (
    <div className={styles.missionLinks}>
      {work.live && (
        <a href={work.live} target="_blank" rel="noopener noreferrer">
          Live site ↗
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
      )}
      {work.github && (
        <a href={work.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
      )}
      {work.writeup && (
        <a href={work.writeup} target="_blank" rel="noopener noreferrer">
          Write-up →
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
      )}
    </div>
  );
}

export default function MissionBlock({ work }: { work: WorkItem }) {
  const [activeStep, setActiveStep] = useState(0);
  const [stacked, setStacked] = useState(false);
  const step0 = useRef<HTMLDivElement>(null);
  const step1 = useRef<HTMLDivElement>(null);
  const step2 = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setStacked(mq.matches || reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduced]);

  useEffect(() => {
    if (stacked) return;
    const steps = [step0, step1, step2];
    const obs = new IntersectionObserver(
      (entries) => {
        let best = 0;
        let bestDist = Infinity;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.step);
          const rect = entry.boundingClientRect;
          const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (dist < bestDist) {
            bestDist = dist;
            best = idx;
          }
        });
        setActiveStep((prev) => (prev === best ? prev : best));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    steps.forEach((r, i) => {
      if (r.current) {
        r.current.dataset.step = String(i);
        obs.observe(r.current);
      }
    });
    return () => obs.disconnect();
  }, [stacked]);

  const accent = work.missionAccent ?? 'blue';
  const approachLines = work.lines.slice(0, 2);
  const pipeline = work.pipeline ?? [];

  const visual = (step: number, className?: string) => (
    <div
      className={`${styles.visualLayer} ${
        stacked || activeStep === step ? styles.visualLayerActive : ''
      } ${className ?? ''}`}
      aria-hidden={!stacked && activeStep !== step}
    >
      {step === 0 && <MissionMedia work={work} />}
      {step === 1 && (
        <PipelineDiagram steps={pipeline} accent={accent} vertical={stacked} />
      )}
      {step === 2 && <MissionResultVisual work={work} />}
    </div>
  );

  return (
    <article className={styles.missionBlock}>
      <p className={styles.missionHeaderKicker}>{work.missionKicker}</p>
      <h3 className={styles.itemTitle}>{work.missionTitle}</h3>

      <div className={stacked ? undefined : styles.missionScroll}>
        <div className={styles.missionGrid}>
          <div>
            <div ref={step0} className={styles.stepBlock}>
              <p className={styles.stepKicker}>Problem</p>
              <p className={styles.problemText}>{work.problem}</p>
              {stacked && visual(0)}
            </div>
            <div ref={step1} className={styles.stepBlock}>
              <p className={styles.stepKicker}>Approach</p>
              {approachLines.map((line) => (
                <p key={line} className={styles.approachText}>{line}</p>
              ))}
              <SkillDotLine skillIds={work.skillIds} />
              {stacked && visual(1)}
            </div>
            <div ref={step2} className={styles.stepBlock}>
              <p className={styles.stepKicker}>Result</p>
              <p className={styles.resultText}>{work.result}</p>
              <MissionLinks work={work} />
              {stacked && visual(2)}
            </div>
          </div>

          {!stacked && (
            <div className={styles.stickyVisual}>
              <VisuallyHidden>
                {work.result}. Pipeline: {pipeline.join(', ')}
              </VisuallyHidden>
              {visual(0)}
              {visual(1)}
              {visual(2)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
