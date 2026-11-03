'use client';

import { stacks } from '@/data/site';
import { useLens } from './LensContext';
import styles from './Sections.module.css';

/** Stack chips; the ones that matter for the active lens light up. */
export default function Stack() {
  const { lens } = useLens();
  const focus = new Set(lens.stackFocus);

  return (
    <section id="stack" className={`container ${styles.section}`} aria-labelledby="stack-title">
      <header className={styles.head}>
        <span className="label">Stack</span>
        <h2 id="stack-title" className={styles.title}>
          Tools I reach for
        </h2>
      </header>
      <div className={styles.stackGrid}>
        {stacks.map((group) => (
          <div key={group.title} className={styles.stackGroup}>
            <h3 className="label">{group.title}</h3>
            <ul className={styles.chips}>
              {group.items.map((item) => (
                <li key={item} className={focus.has(item) ? `${styles.chip} ${styles.chipOn}` : styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
