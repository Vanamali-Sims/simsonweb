import ConceptVisual from './ConceptVisuals';
import type { SectionBeat as Beat } from '@/data/sectionBeats';
import styles from './SectionBeat.module.css';

type Props = {
  beat: Beat;
  tone?: 'light' | 'dark' | 'cream';
};

export default function SectionBeatHeader({ beat, tone = 'light' }: Props) {
  return (
    <header className={`${styles.header} ${styles[tone]}`}>
      <div className={styles.copy}>
        <p className={styles.concept}>{beat.concept}</p>
        <blockquote className={styles.lyric}>
          <p>“{beat.lyric}”</p>
          <cite>— {beat.lyricCredit}</cite>
        </blockquote>
        <p className={styles.gloss}>{beat.gloss}</p>
      </div>
      <ConceptVisual id={beat.visualId} className={styles.visual} />
    </header>
  );
}
