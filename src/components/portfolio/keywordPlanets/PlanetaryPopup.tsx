'use client';

import { useEffect, useRef } from 'react';
import VisuallyHidden from '@/components/VisuallyHidden';
import {
  categoryColors,
  getSkill,
  getWork,
  getWorkForSkill,
  skillKicker,
} from '@content/keywordPlanets';
import { formatExperienceDurationLine } from '@/lib/experienceDuration';
import styles from './KeywordPlanets.module.css';

export type PopupTarget =
  | { type: 'skill'; id: string }
  | { type: 'work'; id: string };

type Props = {
  target: PopupTarget;
  onClose: () => void;
  onNavigate: (target: PopupTarget) => void;
  reducedMotion: boolean;
};

function chartBarColor(colour: 'blue' | 'orange') {
  return colour === 'orange' ? '#E8541A' : '#3D4BFF';
}

function PopupChart({
  beforeLabel,
  before,
  afterLabel,
  after,
  beforePct,
  afterPct,
  colour,
}: {
  beforeLabel: string;
  before: number;
  afterLabel: string;
  after: number;
  beforePct: number;
  afterPct: number;
  colour: 'blue' | 'orange';
}) {
  const afterColor = chartBarColor(colour);
  return (
    <div className={styles.chartRow}>
      <div className={styles.chartLabelRow}>
        <span>{beforeLabel}</span>
        <span>{before}</span>
      </div>
      <div className={styles.chartBarTrack}>
        <div
          className={styles.chartBar}
          style={{ width: `${beforePct}%`, background: '#9A9A9A' }}
        />
      </div>
      <div className={styles.chartLabelRow} style={{ marginTop: 10 }}>
        <span>{afterLabel}</span>
        <span>{after}</span>
      </div>
      <div className={styles.chartBarTrack}>
        <div
          className={styles.chartBar}
          style={{ width: `${afterPct}%`, background: afterColor }}
        />
      </div>
    </div>
  );
}

export default function PlanetaryPopup({
  target,
  onClose,
  onNavigate,
  reducedMotion,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = 'planetary-popup-title';

  useEffect(() => {
    closeRef.current?.focus();
  }, [target]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  let kickerDot = '#3D4BFF';
  let kicker = '';
  let title = '';
  let subtitle = '';
  let durationLine: string | null = null;
  let body: React.ReactNode = null;

  if (target.type === 'skill') {
    const skill = getSkill(target.id);
    if (!skill) return null;
    const works = getWorkForSkill(skill.id);
    kickerDot = categoryColors[skill.category];
    kicker = skillKicker(skill.category);
    title = skill.name;
    subtitle =
      works.length === 1
        ? 'Used in 1 place'
        : `Used in ${works.length} places`;
    body = (
      <>
        <ul className="m-0 list-none space-y-2 p-0">
          {works.map((w) => (
            <li key={w.id} className={styles.popupLine}>
              <span className={styles.popupLineDash}>—</span>
              {w.name}: {w.result}
            </li>
          ))}
        </ul>
        <div>
          <p className={styles.linkGroupTitle}>OPEN THE WORK</p>
          <div className={styles.linkGroup}>
            {works.map((w) => (
              <button
                key={w.id}
                type="button"
                className={styles.linkBtn}
                onClick={() => onNavigate({ type: 'work', id: w.id })}
              >
                <span
                  className={styles.linkBtnDot}
                  style={{
                    background: w.kind === 'proj' ? '#E8541A' : '#0A0A0A',
                  }}
                  aria-hidden
                />
                {w.name} →
              </button>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    const work = getWork(target.id);
    if (!work) return null;
    kickerDot = work.kind === 'proj' ? '#E8541A' : '#0A0A0A';
    kicker = work.kind === 'proj' ? 'Project' : 'Experience';
    title = work.name;
    subtitle = work.sub;
    if (work.kind === 'exp' && work.start) {
      durationLine = formatExperienceDurationLine(work.start, work.end ?? null);
    }
    body = (
      <>
        <div className={styles.resultBlock}>
          <p className={styles.resultHeadline}>{work.result}</p>
          {work.chart && (
            <PopupChart
              beforeLabel={work.chart.beforeLabel}
              before={work.chart.before}
              afterLabel={work.chart.afterLabel}
              after={work.chart.after}
              beforePct={work.chart.beforePct}
              afterPct={work.chart.afterPct}
              colour={work.chart.colour}
            />
          )}
        </div>
        <ul className="m-0 list-none space-y-2 p-0">
          {work.lines.map((line) => (
            <li key={line} className={styles.popupLine}>
              <span className={styles.popupLineDash}>—</span>
              {line}
            </li>
          ))}
        </ul>
        {work.skillIds.length > 0 && (
          <div>
            <p className={styles.linkGroupTitle}>
              STACK · CLICK FOR WHERE ELSE IT WAS USED
            </p>
            <div className={styles.linkGroup}>
              {work.skillIds.map((sid) => {
                const sk = getSkill(sid);
                if (!sk) return null;
                return (
                  <button
                    key={sid}
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => onNavigate({ type: 'skill', id: sid })}
                  >
                    <span
                      className={styles.linkBtnDot}
                      style={{ background: categoryColors[sk.category] }}
                      aria-hidden
                    />
                    {sk.name} →
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {(work.live || work.github) && (
          <div className={styles.externalLinks}>
            {work.live && (
              <a
                href={work.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                Live site ↗
                <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
              </a>
            )}
            {work.github && (
              <a
                href={work.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                GitHub ↗
                <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
              </a>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`${styles.popupOverlay} ${!reducedMotion ? styles.popupOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.popupHeader}>
        <div>
          <p className={styles.popupKicker}>
            <span
              className={styles.popupKickerDot}
              style={{ background: kickerDot }}
              aria-hidden
            />
            {kicker}
          </p>
          <h2 id={titleId} className={styles.popupTitle}>
            {title}
          </h2>
          <p className={styles.popupSubtitle}>{subtitle}</p>
          {durationLine && (
            <p className={styles.popupDuration}>{durationLine}</p>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          className={styles.popupClose}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {body}
    </div>
  );
}
