'use client';

import { useRef } from 'react';
import {
  missionAccentHex,
  type MissionAccent,
  type WorkChart,
  type WorkItem,
} from '@content/keywordPlanets';
import { useInViewOnce } from './useInViewOnce';
import styles from './belowGlobe.module.css';

function BigChart({
  chart,
  resultBig,
  accent,
  active,
}: {
  chart: WorkChart;
  resultBig: string;
  accent: MissionAccent;
  active: boolean;
}) {
  const max = Math.max(chart.before, chart.after, 0.0001);
  const beforeW = (chart.before / max) * 100;
  const afterW = (chart.after / max) * 100;
  const afterColor = missionAccentHex(accent);

  return (
    <div
      className={styles.chartPanel}
      role="img"
      aria-label={`${chart.beforeLabel} ${chart.before} versus ${chart.afterLabel} ${chart.after}`}
    >
      <p className={styles.chartBig} style={{ color: afterColor }}>
        {resultBig}
      </p>
      <div className={styles.chartRow}>
        <div className={styles.chartLabelRow}>
          <span>{chart.beforeLabel}</span>
          <span>{chart.before}</span>
        </div>
        <div
          className={styles.chartBar}
          style={
            {
              background: '#9A9A9A',
              width: active ? `${beforeW}%` : '0',
              '--bar-target': `${beforeW}%`,
            } as React.CSSProperties
          }
        />
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartLabelRow}>
          <span>{chart.afterLabel}</span>
          <span>{chart.after}</span>
        </div>
        <div
          className={`${styles.chartBar} ${styles.chartBarAfter}`}
          style={
            {
              background: afterColor,
              width: active ? `${afterW}%` : '0',
              '--bar-target': `${afterW}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

function FactsVisual({
  resultBig,
  facts,
  accent,
}: {
  resultBig: string;
  facts: string[];
  accent: MissionAccent;
}) {
  const color = missionAccentHex(accent);
  return (
    <div className={styles.chartPanel}>
      <p className={styles.chartBig} style={{ color }}>
        {resultBig}
      </p>
      <ul className={styles.factsList}>
        {facts.map((f) => (
          <li key={f}>
            <span className={styles.factCheck} style={{ color }} aria-hidden>
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MissionResultVisual({ work }: { work: WorkItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewOnce(ref);
  const accent = work.missionAccent ?? 'blue';

  return (
    <div ref={ref}>
      {work.chart && work.resultBig ? (
        <BigChart
          chart={work.chart}
          resultBig={work.resultBig}
          accent={accent}
          active={active}
        />
      ) : work.missionFacts && work.resultBig ? (
        <FactsVisual
          resultBig={work.resultBig}
          facts={work.missionFacts}
          accent={accent}
        />
      ) : null}
    </div>
  );
}
