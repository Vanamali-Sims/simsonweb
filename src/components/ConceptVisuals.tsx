import styles from './ConceptVisuals.module.css';
import type { VisualId } from '@/data/sectionBeats';

type Props = {
  id: VisualId;
  className?: string;
};

export default function ConceptVisual({ id, className = '' }: Props) {
  return (
    <div className={`${styles.wrap} ${styles[id]} ${className}`} aria-hidden="true">
      {id === 'occam' && <Occam />}
      {id === 'signal' && <Signal />}
      {id === 'overfit' && <Overfit />}
      {id === 'gradient' && <Gradient />}
      {id === 'bias' && <Bias />}
    </div>
  );
}

function Occam() {
  return (
    <svg viewBox="0 0 320 180" className={styles.svg} fill="none">
      {/* tangled before */}
      <path d="M20 30 C60 10, 40 80, 90 50 S140 20, 160 70" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <path d="M30 50 C80 90, 50 20, 110 40 S170 100, 200 55" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <path d="M15 90 C70 40, 90 120, 130 80 S190 40, 210 95" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M40 120 C90 140, 70 60, 140 100 S200 130, 230 90" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M25 150 C100 110, 80 160, 150 130 S220 100, 240 140" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      {/* converge */}
      <path d="M20 40 L155 95" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M35 130 L155 95" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M60 20 L155 95" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      {/* single stroke */}
      <path d="M155 95 L300 95" stroke="var(--poppy)" strokeWidth="4" />
      <circle cx="155" cy="95" r="5" fill="var(--poppy)" />
    </svg>
  );
}

function Signal() {
  return (
    <div className={styles.signalScene}>
      <div className={styles.noiseField} />
      <div className={styles.signalShape} />
    </div>
  );
}

function Overfit() {
  return (
    <svg viewBox="0 0 320 180" className={styles.svg} fill="none">
      {/* too-perfect curve */}
      <path
        d="M30 140 C70 30, 110 30, 150 140 S230 250, 290 40"
        stroke="var(--cream)"
        strokeWidth="3"
        className={styles.crackPath}
      />
      {/* crack */}
      <path d="M150 90 L165 70 L158 95 L175 85" stroke="var(--poppy)" strokeWidth="2.5" />
      {/* new data points that don't fit */}
      <circle cx="95" cy="55" r="5" fill="var(--mustard)" />
      <circle cx="210" cy="50" r="5" fill="var(--mustard)" />
      <circle cx="260" cy="120" r="5" fill="var(--mustard)" />
      <circle cx="70" cy="110" r="4" fill="var(--sky)" />
      <circle cx="180" cy="130" r="4" fill="var(--sky)" />
    </svg>
  );
}

function Gradient() {
  return (
    <div className={styles.gradientScene}>
      <div className={styles.step} style={{ width: '88%' }} />
      <div className={styles.step} style={{ width: '72%' }} />
      <div className={styles.step} style={{ width: '56%' }} />
      <div className={styles.step} style={{ width: '40%' }} />
      <div className={styles.ball} />
    </div>
  );
}

function Bias() {
  return (
    <div className={styles.biasScene}>
      <div className={styles.shadowSharp} />
      <div className={styles.shadowSoft} />
    </div>
  );
}
