'use client';

import {
  categoryColors,
  getSkill,
  getWork,
  getWorkForSkill,
  projectLinkHint,
  projectTouchButtonLabel,
  skillCategoryShort,
  type PlanetDef,
} from '@content/keywordPlanets';
import {
  formatExperienceDurationLine,
  roleTitleFromSub,
} from '@/lib/experienceDuration';
import styles from './KeywordPlanets.module.css';

const CARD_ID = 'globe-label-hover-card';

type Props = {
  planet: PlanetDef;
  itemId: string;
  touchMode: boolean;
  onTouchAction: () => void;
};

function SkillChips({ skillIds, max = 6 }: { skillIds: string[]; max?: number }) {
  const shown = skillIds.slice(0, max);
  const extra = skillIds.length - shown.length;
  return (
    <div className={styles.hoverChips}>
      {shown.map((sid) => {
        const sk = getSkill(sid);
        if (!sk) return null;
        return (
          <span key={sid} className={styles.hoverChip}>
            <span
              className={styles.hoverChipDot}
              style={{ background: categoryColors[sk.category] }}
              aria-hidden
            />
            {sk.name}
          </span>
        );
      })}
      {extra > 0 && <span className={styles.hoverChipMore}>+{extra}</span>}
    </div>
  );
}

export function hoverCardElementId() {
  return CARD_ID;
}

export default function LabelHoverCard({
  planet,
  itemId,
  touchMode,
  onTouchAction,
}: Props) {
  if (planet.key === 'projects') {
    const work = getWork(itemId);
    if (!work) return null;
    return (
      <div
        id={CARD_ID}
        className={`${styles.hoverCard} ${touchMode ? styles.hoverCardTouch : ''}`}
        role="tooltip"
      >
        <div className={styles.hoverCardRow}>
          <span className={styles.hoverCardTitle}>{work.name}</span>
          <span className={styles.hoverCardMetric}>{work.metric}</span>
        </div>
        {work.desc && <p className={styles.hoverCardDesc}>{work.desc}</p>}
        <SkillChips skillIds={work.skillIds} />
        <p className={styles.hoverCardHint}>{projectLinkHint(work)}</p>
        {touchMode && (
          <button
            type="button"
            className={styles.hoverCardAction}
            onClick={onTouchAction}
          >
            {projectTouchButtonLabel(work)}
          </button>
        )}
      </div>
    );
  }

  if (planet.key === 'skills') {
    const skill = getSkill(itemId);
    if (!skill) return null;
    const works = getWorkForSkill(skill.id);
    const projects = works.filter((w) => w.kind === 'proj');
    const experience = works.filter((w) => w.kind === 'exp');
    const placeWord = works.length === 1 ? 'place' : 'places';

    return (
      <div
        id={CARD_ID}
        className={`${styles.hoverCard} ${touchMode ? styles.hoverCardTouch : ''}`}
        role="tooltip"
      >
        <div className={styles.hoverCardRow}>
          <span className={styles.hoverCardTitle}>{skill.name}</span>
          <span className={styles.hoverCardCategory}>
            <span
              className={styles.hoverChipDot}
              style={{ background: categoryColors[skill.category] }}
              aria-hidden
            />
            {skillCategoryShort(skill.category)}
          </span>
        </div>
        <p className={styles.hoverCardUsed}>
          Used in {works.length} {placeWord}
        </p>
        {projects.length > 0 && (
          <div className={styles.hoverCardGroup}>
            <p className={styles.hoverCardGroupLabel}>PROJECTS</p>
            <ul className={styles.hoverCardList}>
              {projects.map((w) => (
                <li key={w.id}>
                  <span
                    className={styles.hoverListDot}
                    style={{ background: '#E8541A' }}
                    aria-hidden
                  />
                  {w.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {experience.length > 0 && (
          <div className={styles.hoverCardGroup}>
            <p className={styles.hoverCardGroupLabel}>EXPERIENCE</p>
            <ul className={styles.hoverCardList}>
              {experience.map((w) => (
                <li key={w.id}>
                  <span
                    className={styles.hoverListDot}
                    style={{ background: '#0A0A0A' }}
                    aria-hidden
                  />
                  {w.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className={styles.hoverCardHint}>Click for details</p>
        {touchMode && (
          <button
            type="button"
            className={styles.hoverCardAction}
            onClick={onTouchAction}
          >
            Details
          </button>
        )}
      </div>
    );
  }

  const work = getWork(itemId);
  if (!work || !work.start) return null;
  const duration = formatExperienceDurationLine(work.start, work.end ?? null);
  const role = roleTitleFromSub(work.sub);

  return (
    <div
      id={CARD_ID}
      className={`${styles.hoverCard} ${touchMode ? styles.hoverCardTouch : ''}`}
      role="tooltip"
    >
      <span className={styles.hoverCardTitle}>{work.name}</span>
      <p className={styles.hoverCardRole}>{role}</p>
      <p className={styles.hoverCardDuration}>{duration}</p>
      {work.skillIds.length > 0 ? (
        <SkillChips skillIds={work.skillIds} />
      ) : (
        <p className={styles.hoverCardMuted}>Customer-facing role</p>
      )}
      <p className={styles.hoverCardHint}>Click for details</p>
      {touchMode && (
        <button
          type="button"
          className={styles.hoverCardAction}
          onClick={onTouchAction}
        >
          Details
        </button>
      )}
    </div>
  );
}
