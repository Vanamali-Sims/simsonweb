import { site } from '@content/portfolio';
import VisuallyHidden from '@/components/VisuallyHidden';

export default function Hero() {
  const mailto = `mailto:${site.email}`;

  return (
    <section
      id="hero"
      className="border-b border-grid px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16"
      aria-labelledby="hero-name"
    >
      <div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-2 md:items-end md:gap-16">
        <div className="space-y-8">
          <h1
            id="hero-name"
            className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            {site.name}
          </h1>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-ink px-6 text-paper font-medium transition-opacity hover:opacity-90"
            >
              LinkedIn
              <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
            </a>
            <a
              href={mailto}
              className="inline-flex min-h-12 items-center justify-center bg-ink px-6 text-paper font-medium transition-opacity hover:opacity-90"
            >
              Email
            </a>
            <a
              href={site.cvPath}
              download
              className="inline-flex min-h-12 items-center justify-center border-2 border-ink px-6 font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              CV ↓
            </a>
          </div>
        </div>
        <div className="space-y-6 md:pb-2">
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
            {site.positioning}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Target roles">
            {site.targetRoles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-grid px-3 py-1.5 text-sm font-medium"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="font-mono text-sm text-muted">
            {site.location} · {site.availability} · {site.workRights}
          </p>
        </div>
      </div>
    </section>
  );
}
