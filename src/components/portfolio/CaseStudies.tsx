import { flagships, getSkill, type WorkNode } from '@content/portfolio';
import BeforeAfterBars from './BeforeAfterBars';
import ProjectImage from '@/components/ProjectImage';
import VisuallyHidden from '@/components/VisuallyHidden';

function stackChips(work: WorkNode) {
  return (work.stackSkillIds ?? []).map((id) => {
    const s = getSkill(id);
    if (!s) return null;
    const color =
      s.category === 'frontend'
        ? 'border-frontend text-ink'
        : s.category === 'infra'
          ? 'border-ink'
          : 'border-data text-ink';
    return (
      <li
        key={id}
        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}
      >
        {s.label}
      </li>
    );
  });
}

function CaseBlock({ work, flip }: { work: WorkNode; flip?: boolean }) {
  const chartColor = work.resultChart
    ? work.category === 'frontend'
      ? 'frontend'
      : 'data'
    : 'data';

  return (
    <article
      id={`case-${work.id}`}
      className="case-study border-b border-grid py-16 transition-transform duration-500 motion-reduce:transition-none"
    >
      <div
        className={`mx-auto grid max-w-[1360px] gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="space-y-5">
          <p className="font-mono text-sm text-muted">
            {work.name}
            {work.dates ? ` · ${work.dates}` : ''}
          </p>
          <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {work.name.split(',')[0]}
          </h3>
          {work.problem ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Problem</h4>
              <p className="mt-2 text-lg">{work.problem}</p>
            </div>
          ) : null}
          {work.approach?.length ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Approach</h4>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {work.approach.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {stackChips(work)}
          </ul>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            {work.links?.live ? (
              <a href={work.links.live} target="_blank" rel="noopener noreferrer">
                Live ↗
                <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
              </a>
            ) : null}
            {work.links?.code ? (
              <a href={work.links.code} target="_blank" rel="noopener noreferrer">
                Code ↗
                <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
              </a>
            ) : null}
            {work.links?.writeUp ? (
              <a href={work.links.writeUp}>Write-up →</a>
            ) : null}
          </div>
        </div>
        <div className="space-y-6">
          {work.resultHeadline ? (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Result</h4>
              <p className="mt-2 font-display text-2xl font-bold">{work.resultHeadline}</p>
            </div>
          ) : null}
          {work.resultChart ? (
            <BeforeAfterBars
              beforeLabel={work.resultChart.beforeLabel}
              afterLabel={work.resultChart.afterLabel}
              beforeValue={work.resultChart.beforeValue}
              afterValue={work.resultChart.afterValue}
              color={chartColor}
              format={
                work.resultChart.beforeValue < 1
                  ? 'decimal3'
                  : work.resultChart.beforeValue < 10
                    ? 'seconds'
                    : 'default'
              }
            />
          ) : null}
          {work.image ? (
            <ProjectImage
              src={work.image}
              alt={work.imageAlt ?? work.name}
              compact
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-heading">
      <div className="border-b border-grid px-5 pt-16 md:px-8">
        <div className="mx-auto max-w-[1360px]">
          <h2 id="case-studies-heading" className="font-display text-4xl font-bold tracking-tight">
            Case studies
          </h2>
        </div>
      </div>
      {flagships.map((w, i) => (
        <CaseBlock key={w.id} work={w} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
