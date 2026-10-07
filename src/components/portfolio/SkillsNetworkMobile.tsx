'use client';

import { skills, work, edges } from '@content/portfolio';
import { useState } from 'react';

function degree(skillId: string) {
  return edges.filter((e) => e.skillId === skillId).length;
}

export default function SkillsNetworkMobile() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const dataSkills = skills.filter((s) => s.category === 'data');
  const feSkills = skills.filter((s) => s.category === 'frontend');
  const infraSkills = skills.filter((s) => s.category === 'infra');
  const bridgeWork = work.filter((w) => w.category === 'bridge');

  const maxDeg = Math.max(...skills.map((s) => degree(s.id)), 1);

  return (
    <section
      id="skills"
      className="border-b border-grid px-5 py-16 md:px-8"
      aria-labelledby="skills-heading-mobile"
    >
      <div className="mx-auto max-w-[1360px] space-y-8">
        <h2 id="skills-heading-mobile" className="sr-only">Skills and work</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Data &amp; ML</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {dataSkills.map((s) => (
                <SkillChip
                  key={s.id}
                  skill={s}
                  weight={degree(s.id) / maxDeg}
                  active={activeSkill === s.id}
                  onTap={() => setActiveSkill(activeSkill === s.id ? null : s.id)}
                />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Front-end</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {feSkills.map((s) => (
                <SkillChip
                  key={s.id}
                  skill={s}
                  weight={degree(s.id) / maxDeg}
                  active={activeSkill === s.id}
                  onTap={() => setActiveSkill(activeSkill === s.id ? null : s.id)}
                  variant="frontend"
                />
              ))}
            </ul>
          </div>
        </div>
        {infraSkills.length > 0 ? (
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Infra</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {infraSkills.map((s) => (
                <SkillChip
                  key={s.id}
                  skill={s}
                  weight={degree(s.id) / maxDeg}
                  active={activeSkill === s.id}
                  onTap={() => setActiveSkill(activeSkill === s.id ? null : s.id)}
                  variant="infra"
                />
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Bridging work</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {bridgeWork.map((w) => {
              const dim =
                activeSkill &&
                !edges.some(
                  (e) => e.workId === w.id && e.skillId === activeSkill
                );
              return (
                <li key={w.id}>
                  <span
                    className={`inline-block rounded border border-ink px-2 py-1 text-xs font-semibold ${
                      dim ? 'opacity-20' : ''
                    }`}
                  >
                    {w.name.split(',')[0]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="font-mono text-xs text-muted">
          Each chip is a skill used on real projects. Tap to highlight connected work.
        </p>
      </div>
    </section>
  );
}

function SkillChip({
  skill,
  weight,
  active,
  onTap,
  variant = 'data',
}: {
  skill: { id: string; label: string };
  weight: number;
  active: boolean;
  onTap: () => void;
  variant?: 'data' | 'frontend' | 'infra';
}) {
  const bg =
    variant === 'frontend'
      ? 'bg-frontend text-paper'
      : variant === 'infra'
        ? 'border border-ink bg-paper'
        : 'bg-data text-paper';
  const scale = 0.85 + weight * 0.35;
  return (
    <li>
      <button
        type="button"
        onClick={onTap}
        className={`w-full rounded px-2 py-1.5 text-left text-xs font-medium transition-transform ${bg} ${
          active ? 'ring-2 ring-ink ring-offset-2' : ''
        }`}
        style={{ fontSize: `${scale}rem` }}
        aria-pressed={active}
      >
        {skill.label}
      </button>
    </li>
  );
}
