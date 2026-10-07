'use client';

import { useRef } from 'react';
import { missionAccentHex, type MissionAccent } from '@content/keywordPlanets';
import { useInViewOnce } from './useInViewOnce';
import styles from './belowGlobe.module.css';

export default function PipelineDiagram({
  steps,
  accent,
  vertical,
}: {
  steps: string[];
  accent: MissionAccent;
  vertical?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewOnce(ref);
  const color = missionAccentHex(accent);

  return (
    <div
      ref={ref}
      className={`${styles.pipeline} ${vertical ? styles.pipelineVertical : ''}`}
      style={{ '--pipe-accent': color } as React.CSSProperties}
      aria-label={`Pipeline: ${steps.join(', ')}`}
    >
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {steps.map((step, i) => (
        <div key={step} style={{ display: 'contents' }}>
          <div
            className={`${styles.pipeBox} ${
              active ? styles.pipeBoxActive : ''
            } ${i === steps.length - 1 ? styles.pipeBoxFilled : ''}`}
            style={{
              transitionDelay: active ? `${i * 90}ms` : undefined,
            }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <svg
              className={styles.pipeArrow}
              width={vertical ? 24 : 32}
              height={vertical ? 32 : 24}
              viewBox="0 0 32 24"
              aria-hidden
            >
              {vertical ? (
                <path
                  d="M16 4 L16 20 M10 14 L16 20 L22 14"
                  fill="none"
                  stroke="#0A0A0A"
                  strokeWidth={1.5}
                />
              ) : (
                <path
                  d="M4 12 L24 12 M18 6 L24 12 L18 18"
                  fill="none"
                  stroke="#0A0A0A"
                  strokeWidth={1.5}
                />
              )}
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
