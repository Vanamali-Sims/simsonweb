import { categoryColors, getSkill } from '@content/keywordPlanets';
import styles from './belowGlobe.module.css';

export default function SkillDotLine({ skillIds }: { skillIds: string[] }) {
  const items = skillIds
    .map((id) => getSkill(id))
    .filter(Boolean) as { id: string; name: string; category: keyof typeof categoryColors }[];

  return (
    <p className={styles.skillDots}>
      {items.map((s, i) => (
        <span key={s.id} className={styles.skillDotItem}>
          {i > 0 && <span className={styles.skillSep} aria-hidden> · </span>}
          <span
            className={styles.skillDot}
            style={{ background: categoryColors[s.category] }}
            aria-hidden
          />
          {s.name}
        </span>
      ))}
    </p>
  );
}
