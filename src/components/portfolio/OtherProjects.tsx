import { otherProjects, getSkill } from '@content/portfolio';
import VisuallyHidden from '@/components/VisuallyHidden';

export default function OtherProjects() {
  if (!otherProjects.length) return null;

  return (
    <section
      id="projects"
      className="border-b border-grid px-5 py-16 md:px-8 md:py-20"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[1360px]">
        <h2 id="projects-heading" className="font-display text-4xl font-bold tracking-tight">
          Other projects
        </h2>
        <ul className="mt-10 divide-y divide-grid">
          {otherProjects.map((p) => (
            <li
              key={p.id}
              id={`project-${p.id}`}
              className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-start"
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="text-muted">{p.headline}</p>
                <ul className="flex flex-wrap gap-2">
                  {(p.stackSkillIds ?? []).map((sid) => {
                    const s = getSkill(sid);
                    if (!s) return null;
                    return (
                      <li
                        key={sid}
                        className="rounded-full border border-grid px-2 py-0.5 text-xs"
                      >
                        {s.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-medium md:justify-end">
                {p.links?.live ? (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                    Live ↗
                    <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
                  </a>
                ) : null}
                {p.links?.code ? (
                  <a href={p.links.code} target="_blank" rel="noopener noreferrer">
                    Code ↗
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
