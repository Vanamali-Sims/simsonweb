import Link from 'next/link';
import styles from './page.module.css';

const stacks = [
  {
    title: 'AI & Automation',
    items: ['LangChain', 'GPT-4', 'Custom Agents', 'Prompt Engineering'],
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'scikit-learn', 'TensorFlow', 'Pandas', 'R'],
  },
  {
    title: 'Bioinformatics',
    items: ['RNA-Seq', 'BioPython', 'DESeq2', 'BLAST'],
  },
  {
    title: 'Engineering',
    items: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL'],
  },
];

export default function MyStory() {
  return (
    <div className={styles.page}>
      <section className={`${styles.hero} grain`}>
        <p className={styles.wayfinding}>STORY / 01</p>
        <h1 className={styles.title}>
          Built in
          <br />
          daylight.
        </h1>
        <p className={styles.lede}>
          I&apos;m Sai Vanamali — data scientist and full-stack developer in
          Melbourne. I care about work that looks sharp and holds up under
          pressure: models with meaning, products people actually use.
        </p>
      </section>

      <section className={`${styles.body} grain`}>
        <div className={styles.copyCol}>
          <p className={styles.wayfindingDark}>BACKGROUND</p>
          <h2 className={styles.sectionTitle}>The short version</h2>
          <p>
            Master&apos;s in Data Science at Monash University. Technology
            background from JNTU Kakinada. AWS Machine Learning and Cloud
            Foundations certified. I live at the intersection of analysis and
            shipping software.
          </p>
          <p>
            Day to day that means local AI agents at Zelo, ML work that
            survives contact with messy data, and full-stack builds when the
            interface matters as much as the model.
          </p>
          <p>
            Outside the terminal: music, photography instincts, and a soft spot
            for architecture that doesn&apos;t apologize for itself.
          </p>
          <Link href="/contact" className={styles.cta}>
            Work with me
          </Link>
        </div>
        <aside className={styles.aside}>
          <div className={styles.stat}>
            <span className={styles.statNum}>MEL</span>
            <span className={styles.statLabel}>Based</span>
          </div>
          <div className={`${styles.stat} ${styles.statRust}`}>
            <span className={styles.statNum}>MDS</span>
            <span className={styles.statLabel}>Monash</span>
          </div>
          <div className={`${styles.stat} ${styles.statSky}`}>
            <span className={styles.statNum}>AI</span>
            <span className={styles.statLabel}>Focus</span>
          </div>
        </aside>
      </section>

      <section className={`${styles.skills} grain`}>
        <p className={styles.wayfinding}>TOOLKIT</p>
        <h2 className={styles.sectionTitleLight}>Materials I work with</h2>
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
    </div>
  );
}
