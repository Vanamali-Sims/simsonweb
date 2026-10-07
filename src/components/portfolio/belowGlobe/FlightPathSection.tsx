'use client';

import { useMemo, useRef, useState } from 'react';
import { experienceBarFill, getExperienceRows, type WorkItem } from '@content/keywordPlanets';
import { formatExperienceDurationLine, roleTitleFromSub } from '@/lib/experienceDuration';
import {
  formatQuarterLabel,
  todayLabel,
  todayYmIndex,
  ymToIndex,
} from '@/lib/timelineScale';
import { useInViewOnce } from './useInViewOnce';
import SkillDotLine from './SkillDotLine';
import styles from './belowGlobe.module.css';

function MiniChart({ work }: { work: WorkItem }) {
  if (!work.chart) return null;
  const max = Math.max(work.chart.before, work.chart.after, 0.0001);
  const accent = work.chart.colour === 'orange' ? '#E8541A' : '#3D4BFF';
  return (
    <div className="mt-4" role="img" aria-label={`${work.chart.beforeLabel} ${work.chart.before} versus ${work.chart.afterLabel} ${work.chart.after}`}>
      <div className="flex justify-between font-mono text-[13px] mb-1">
        <span>{work.chart.beforeLabel}</span>
        <span>{work.chart.before}</span>
      </div>
      <div className={styles.miniChartBar} style={{ width: `${(work.chart.before / max) * 100}%`, background: '#9A9A9A' }} />
      <div className="flex justify-between font-mono text-[13px] mb-1 mt-2">
        <span>{work.chart.afterLabel}</span>
        <span>{work.chart.after}</span>
      </div>
      <div className={styles.miniChartBar} style={{ width: `${(work.chart.after / max) * 100}%`, background: accent }} />
    </div>
  );
}

export default function FlightPathSection() {
  const rows = getExperienceRows();
  const [openId, setOpenId] = useState<string | null>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const animate = useInViewOnce(animRef);

  const { minIdx, maxIdx, todayPct, quarters, span } = useMemo(() => {
    const starts = rows.map((r) => ymToIndex(r.start!));
    const ends = rows.map((r) =>
      r.end ? ymToIndex(r.end) : todayYmIndex()
    );
    const min = Math.min(...starts);
    const max = Math.max(...ends, todayYmIndex());
    const range = max - min || 1;
    const todayPct = ((todayYmIndex() - min) / range) * 100;
    const quarters: number[] = [];
    for (let i = min; i <= max; i++) {
      const m = (i % 12) + 1;
      if (m === 3 || m === 6 || m === 9 || m === 12) quarters.push(i);
    }
    return { minIdx: min, maxIdx: max, todayPct, quarters, span: range };
  }, [rows]);

  return (
    <section
      id="experience"
      className={`${styles.section} ${styles.sectionSpacing}`}
      aria-labelledby="experience-title"
    >
      <p className={styles.kicker}>03 / Experience</p>
      <h2 id="experience-title" className={styles.sectionTitle}>Flight path</h2>
      <p className={styles.sectionLead}>
        The roles overlap: study, engineering and client work ran in parallel.
      </p>

      <div ref={animRef} className={styles.flightWrap}>
        <div className={styles.flightGrid}>
          <div className={styles.flightAxis} aria-hidden>
            {quarters.map((q) => {
              const left = ((q - minIdx) / span) * 100;
              return (
                <span
                  key={q}
                  className={styles.todayLabel}
                  style={{ left: `${left}%` }}
                >
                  {formatQuarterLabel(q)}
                </span>
              );
            })}
            <div
              className={styles.todayLine}
              style={{ left: `${todayPct}%` }}
            />
            <span
              className={styles.todayLabel}
              style={{ left: `${todayPct}%` }}
            >
              {todayLabel()}
            </span>
          </div>

          {rows.map((work, rowIndex) => {
            const start = ymToIndex(work.start!);
            const end = work.end ? ymToIndex(work.end) : todayYmIndex();
            const left = ((start - minIdx) / span) * 100;
            const width = ((end - start + 1) / span) * 100;
            const fill = experienceBarFill(work);
            const open = openId === work.id;
            const duration =
              work.start &&
              formatExperienceDurationLine(work.start, work.end ?? null);

            return (
              <div key={work.id}>
                <button
                  type="button"
                  className={`${styles.flightRow} ${open ? styles.flightRowExpanded : ''}`}
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : work.id)}
                >
                  <div>
                    <p className={styles.flightOrg}>{work.name}</p>
                    <p className={styles.flightRole}>{roleTitleFromSub(work.sub)}</p>
                    {duration && (
                      <p className={styles.flightDur}>
                        {duration.split(' · ')[1] ?? duration}
                      </p>
                    )}
                  </div>
                  <div className={styles.flightTrack}>
                    <div
                      className={`${styles.flightBar} ${
                        work.isEducation ? styles.flightBarEducation : ''
                      } ${work.end == null ? styles.flightBarOpenEnd : ''}`}
                      style={{
                        left: `${left}%`,
                        width: animate ? `${width}%` : '0',
                        background: fill,
                        transitionDelay: animate ? `${rowIndex * 80}ms` : undefined,
                      }}
                    />
                  </div>
                </button>
                <div
                  className={`${styles.flightExpand} ${open ? styles.flightExpandOpen : ''}`}
                >
                  <p className={styles.body}>{work.result}</p>
                  <SkillDotLine skillIds={work.skillIds} />
                  <MiniChart work={work} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
