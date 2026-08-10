'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LearningRateBar.module.css';

const MIN_LR = 0.001;
const MAX_LR = 1.0;

function formatLr(value: number) {
  if (value >= 0.1) return value.toFixed(2);
  if (value >= 0.01) return value.toFixed(3);
  return value.toFixed(3);
}

/** Industrial scroll-linked learning-rate gauge */
export default function LearningRateBar() {
  const [progress, setProgress] = useState(0);
  const [converged, setConverged] = useState(false);
  const raf = useRef<number | null>(null);
  const sparkRef = useRef<SVGPolylineElement | null>(null);
  const pointsRef = useRef<number[]>(Array.from({ length: 24 }, () => 0.55));

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      setConverged(p > 0.92);

      const pts = pointsRef.current;
      const settle = Math.min(1, Math.max(0, (p - 0.55) / 0.45));
      const noise = (1 - settle) * 0.22;
      const target = 0.72 - p * 0.45;
      for (let i = 0; i < pts.length - 1; i++) {
        pts[i] = pts[i + 1];
      }
      pts[pts.length - 1] = Math.min(
        0.95,
        Math.max(0.05, target + (Math.random() - 0.5) * noise)
      );

      if (sparkRef.current) {
        const w = 72;
        const h = 18;
        const step = w / (pts.length - 1);
        sparkRef.current.setAttribute(
          'points',
          pts.map((v, i) => `${i * step},${h - v * h}`).join(' ')
        );
      }

      raf.current = null;
    };

    const onScroll = () => {
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const lr = MIN_LR + progress * (MAX_LR - MIN_LR);
  const unfilled = `${((1 - progress) * 100).toFixed(2)}%`;

  return (
    <div
      className={`${styles.gauge} ${converged ? styles.converged : ''}`}
      role="progressbar"
      aria-label="Learning rate"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className={styles.meta}>
        <span className={styles.label}>η</span>
        <span className={styles.value}>{formatLr(lr)}</span>
        <svg className={styles.spark} viewBox="0 0 72 18" aria-hidden="true">
          <polyline
            ref={sparkRef}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
        {converged && <span className={styles.done}>converged</span>}
      </div>

      <div className={styles.track}>
        <div className={styles.palette} aria-hidden="true" />
        <div className={styles.cover} style={{ width: unfilled }} />
        <div className={styles.ticks} aria-hidden="true">
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className={`${styles.tick} ${i % 5 === 0 ? styles.tickMajor : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
