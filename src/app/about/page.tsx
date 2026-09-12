import ConceptVisual from '@/components/ConceptVisuals';
import { aboutShort, stacks } from '@/data/site';
import { heroBeat, sectionBeats } from '@/data/sectionBeats';
import Link from 'next/link';
import styles from './page.module.css';

const lyricBlocks = [
  {
    concept: heroBeat.concept,
    lyric: heroBeat.primaryLyric,
    credit: heroBeat.primaryCredit,
    gloss: heroBeat.gloss,
    visualId: 'occam' as const,
  },
  {
    concept: 'Learning a name',
    lyric: heroBeat.softLyric,
    credit: heroBeat.softCredit,
    gloss: 'Start from the person, then the work.',
    visualId: 'signal' as const,
  },
  ...sectionBeats.map((beat) => ({
    concept: beat.concept,
    lyric: beat.lyric,
    credit: beat.lyricCredit,
    gloss: beat.gloss,
    visualId: beat.visualId,
  })),
];

export const metadata = {
  title: 'About — Vanamali Sims',
  description: aboutShort.join(' '),
};

export default function About() {
  return (
    <div className={styles.page}>
      <section className={`${styles.hero} grain`}>
        <p className={styles.wayfindingOnInk}>ABOUT / 01</p>
        <h1 className={styles.title}>
          Built in
          <br />
          daylight.
        </h1>
        <div className={styles.lede}>
          {aboutShort.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>
      </section>

      <section className={`${styles.materials} grain`}>
        <p className={styles.wayfinding}>TOOLKIT</p>
        <h2 className={styles.sectionTitle}>Materials I work with</h2>
        <div className={styles.skillGrid}>
          {stacks.map((stack, i) => (
            <article
              key={stack.title}
              className={`${styles.skillBlock} ${
                i % 2 === 1 ? styles.skillShift : ''
              }`}
            >
              <h3>{stack.title}</h3>
              <ul>
                {stack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.lyrics} grain`}>
        <p className={styles.wayfinding}>NOTES</p>
        <h2 className={styles.sectionTitle}>How the metaphors land</h2>
        <p className={styles.notesLede}>
          The homepage keeps the labels. This is where the songs live.
        </p>
        <div className={styles.lyricList}>
          {lyricBlocks.map((block) => (
            <article key={block.concept} className={styles.lyricCard}>
              <div className={styles.lyricCopy}>
                <p className={styles.concept}>{block.concept}</p>
                <blockquote>
                  <p>“{block.lyric}”</p>
                  <cite>— {block.credit}</cite>
                </blockquote>
                <p className={styles.gloss}>{block.gloss}</p>
              </div>
              <ConceptVisual id={block.visualId} className={styles.visual} />
            </article>
          ))}
        </div>
        <Link href="/#contact" className={styles.cta}>
          Work with me
        </Link>
      </section>
    </div>
  );
}
