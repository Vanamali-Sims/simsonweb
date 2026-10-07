'use client';

import Image from 'next/image';
import { missionAccentHex, type WorkItem } from '@content/keywordPlanets';
import styles from './belowGlobe.module.css';

export default function MissionMedia({ work }: { work: WorkItem }) {
  if (work.media) {
    return (
      <Image
        src={work.media}
        alt={work.mediaAlt ?? work.missionTitle ?? work.name}
        width={1200}
        height={750}
        className={styles.mediaFrame}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 52vw"
      />
    );
  }
  if (work.resultBig) {
    return (
      <p
        className={styles.bigNumber}
        style={{ color: '#c8c8c8' }}
        aria-hidden
      >
        {work.resultBig}
      </p>
    );
  }
  return null;
}
