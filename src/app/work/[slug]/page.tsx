import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectArt from '@/components/ProjectArt';
import { caseStudies } from '@/data/cases';
import { getProject, projects } from '@/data/projects';
import styles from './page.module.css';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return { title: 'Work' };
  return { title: project.title, description: project.blurb };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  const study = project ? caseStudies[project.slug] : undefined;
  if (!project || !study) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const pad = (n: number) => String(n).padStart(2, '0');

  const blocks = [
    { label: 'Problem', text: study.problem },
    { label: 'Approach', text: study.approach },
    { label: 'Result', text: study.result },
    { label: 'What didn’t work', text: study.didNotWork },
  ];

  return (
    <article className={`container ${styles.page}`} aria-labelledby="case-title">
      <Link href="/#projects" className={styles.back}>
        ← All projects
      </Link>

      <header className={styles.hero}>
        <span className="label">
          Case study · {pad(index + 1)} / {pad(projects.length)}
        </span>
        <h1 id="case-title" className={styles.title}>
          {project.title}
        </h1>
        {project.metric ? <p className={styles.metric}>{project.metric}</p> : null}
        <p className={styles.lede}>{project.blurb}</p>
        {study.team ? <p className={styles.team}>{study.team}</p> : null}
        <div className={styles.actions}>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.primary}>
              {project.liveLabel ?? 'Open live site'} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
            View the code ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </header>

      <div className={styles.cover}>
        <ProjectArt slug={project.slug} />
      </div>

      <div className={styles.body}>
        {blocks.map((b, i) => (
          <section key={b.label} className={styles.block}>
            <h2 className={styles.blockLabel}>
              <span className={styles.blockIndex}>{pad(i + 1)}</span> {b.label}
            </h2>
            <p className={styles.blockText}>{b.text}</p>
          </section>
        ))}
        <section className={styles.block}>
          <h2 className={styles.blockLabel}>
            <span className={styles.blockIndex}>{pad(blocks.length + 1)}</span> Stack
          </h2>
          <ul className={styles.tags}>
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </div>

      <Link href={`/work/${next.slug}`} className={styles.next}>
        <span className="label">Next project</span>
        <span className={styles.nextTitle}>
          {next.title} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
