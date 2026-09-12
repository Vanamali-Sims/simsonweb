import ProjectImage from '@/components/ProjectImage';
import { getProject, projects } from '@/data/projects';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return { title: 'Work' };
  return {
    title: `${project.title} — Vanamali Sims`,
    description: project.blurb,
  };
}

export default function WorkCase({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const blocks = [
    { label: 'Problem', text: project.problem },
    { label: 'Approach', text: project.approach },
    { label: 'Result', text: project.result },
    { label: 'What did not work', text: project.didNotWork },
  ];

  return (
    <article className={styles.page}>
      <header className={`${styles.hero} grain`}>
        <p className={styles.wayfinding}>WORK / CASE</p>
        <p className={styles.metric}>
          {project.metric ?? 'TODO — outcome metric'}
        </p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lede}>{project.blurb}</p>
      </header>

      <div className={styles.media}>
        <ProjectImage src={project.image} alt={project.imageAlt} />
      </div>

      <div className={styles.body}>
        {blocks.map((block) => (
          <section key={block.label} className={styles.block}>
            <h2>{block.label}</h2>
            <p className={block.text.startsWith('TODO') ? styles.todo : undefined}>
              {block.text}
            </p>
          </section>
        ))}

        <section className={styles.block}>
          <h2>Stack</h2>
          <ul className={styles.stack}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>

        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repo}
        >
          View the repository →
        </a>

        <Link href="/#work" className={styles.back}>
          ← All work
        </Link>
      </div>
    </article>
  );
}
