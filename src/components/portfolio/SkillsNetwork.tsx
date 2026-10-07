'use client';

import { edges, skills, work, getWork } from '@content/portfolio';
import {
  computePortfolioGraphLayout,
  GRAPH_CENTER_X,
  GRAPH_CENTER_Y,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  type LayoutNode,
} from '@/lib/graphLayout';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
} from 'react';
import SkillsNetworkMobile from './SkillsNetworkMobile';

type FocusState =
  | { type: 'none' }
  | { type: 'skill'; skillId: string }
  | { type: 'work'; workId: string };

function nodeFill(node: LayoutNode) {
  if (node.kind === 'work') {
    if (node.category === 'bridge') return 'var(--ink)';
    if (node.category === 'frontend') return 'var(--frontend)';
    return 'var(--data)';
  }
  if (node.category === 'infra') return 'var(--paper)';
  if (node.category === 'frontend') return 'var(--frontend)';
  return 'var(--data)';
}

function nodeStroke(node: LayoutNode) {
  if (node.kind === 'skill' && node.category === 'infra') return 'var(--ink)';
  return 'transparent';
}

function nodeMotionStyle(
  node: LayoutNode,
  entered: boolean,
  reducedMotion: boolean
): CSSProperties {
  const x = entered || reducedMotion ? node.x : GRAPH_CENTER_X;
  const y = entered || reducedMotion ? node.y : GRAPH_CENTER_Y;
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: reducedMotion ? undefined : 'transform 800ms ease-out',
  };
}

export default function SkillsNetwork() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [focus, setFocus] = useState<FocusState>({ type: 'none' });
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const descId = useId();

  const layout = useMemo(() => computePortfolioGraphLayout(), []);
  const nodeById = useMemo(
    () => new Map(layout.nodes.map((n) => [n.id, n])),
    [layout.nodes]
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setEntered(true);
      return;
    }
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocus({ type: 'none' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isHighlighted = useCallback(
    (node: LayoutNode) => {
      if (focus.type === 'none') return true;
      if (focus.type === 'skill') {
        const sid = focus.skillId;
        if (node.kind === 'skill' && node.id === `skill:${sid}`) return true;
        if (node.kind === 'work') {
          return edges.some(
            (e) => e.skillId === sid && e.workId === node.id.slice(5)
          );
        }
        return false;
      }
      const wid = focus.workId;
      if (node.kind === 'work' && node.id === `work:${wid}`) return true;
      if (node.kind === 'skill') {
        return edges.some(
          (e) => e.workId === wid && e.skillId === node.id.slice(6)
        );
      }
      return false;
    },
    [focus]
  );

  const linkHighlighted = useCallback(
    (workId: string, skillId: string) => {
      if (focus.type === 'none') return true;
      if (focus.type === 'skill') return focus.skillId === skillId;
      return focus.workId === workId;
    },
    [focus]
  );

  const activateWork = (workId: string) => {
    const w = getWork(workId);
    const target = w?.flagship ? `case-${workId}` : `project-${workId}`;
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (w?.flagship) {
      el.classList.add('case-study-zoom');
      window.setTimeout(() => el.classList.remove('case-study-zoom'), 500);
    }
  };

  if (mobile === null) {
    return (
      <div className="mx-auto max-w-[1360px] px-5 py-8 md:px-8">
        <div className="grid min-h-[320px] grid-cols-2 gap-4 font-mono text-sm text-muted">
          <p>Data &amp; ML</p>
          <p className="text-right">Front-end</p>
        </div>
      </div>
    );
  }

  if (mobile) return <SkillsNetworkMobile />;

  return (
    <section
      id="skills"
      className="border-b border-grid px-5 py-16 md:px-8 md:py-20"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-[1360px]">
        <h2 id="skills-heading" className="sr-only">Skills and work</h2>
        <div className="relative">
          <p className="pointer-events-none font-mono text-xs uppercase tracking-widest text-muted">
            Data &amp; ML
          </p>
          <p className="pointer-events-none absolute right-0 top-0 font-mono text-xs uppercase tracking-widest text-muted">
            Front-end
          </p>
          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            width="100%"
            height="auto"
            preserveAspectRatio="xMidYMid meet"
            className="mt-6 block"
            role="img"
            aria-describedby={descId}
          >
            <desc id={descId}>
              Network of skills connected to projects and roles. Node size reflects how often a skill was used.
            </desc>
            {layout.links.map((link, i) => {
              const source = nodeById.get(`work:${link.workId}`);
              const target = nodeById.get(`skill:${link.skillId}`);
              if (!source || !target) return null;
              const hi = linkHighlighted(link.workId, link.skillId);
              const opacity = focus.type === 'none' ? 0.35 : hi ? 0.6 : 0.08;
              const sx = entered || reducedMotion ? source.x : GRAPH_CENTER_X;
              const sy = entered || reducedMotion ? source.y : GRAPH_CENTER_Y;
              const tx = entered || reducedMotion ? target.x : GRAPH_CENTER_X;
              const ty = entered || reducedMotion ? target.y : GRAPH_CENTER_Y;
              return (
                <line
                  key={`${link.workId}-${link.skillId}-${i}`}
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke="var(--grid)"
                  strokeWidth={1}
                  opacity={opacity}
                />
              );
            })}
            {layout.nodes.map((node) => {
              const hi = isHighlighted(node);
              const opacity = focus.type === 'none' ? 1 : hi ? 1 : 0.15;
              const isSkill = node.kind === 'skill';
              const skillId = isSkill ? node.id.slice(6) : '';
              const workId = !isSkill ? node.id.slice(5) : '';

              const onFocusSkill = () => {
                const s = skills.find((sk) => sk.id === skillId);
                if (!s) return;
                setFocus({ type: 'skill', skillId });
                const names = s.usedBy
                  .map((id) => work.find((w) => w.id === id)?.name.split(',')[0])
                  .filter(Boolean)
                  .join(', ');
                setTooltip(`${s.label} · used in ${names}`);
              };

              const onFocusWork = () => {
                setFocus({ type: 'work', workId });
                setTooltip(node.label);
              };

              if (isSkill) {
                return (
                  <g
                    key={node.id}
                    opacity={opacity}
                    className="transition-opacity duration-200"
                    style={nodeMotionStyle(node, entered, reducedMotion)}
                  >
                    <circle
                      cx={0}
                      cy={0}
                      r={node.radius}
                      fill={nodeFill(node)}
                      stroke={nodeStroke(node)}
                      strokeWidth={node.category === 'infra' ? 1.5 : 0}
                    />
                    <text
                      x={node.radius + 6}
                      y={4}
                      className="fill-ink text-[11px] font-medium"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {node.label}
                    </text>
                    <circle
                      cx={0}
                      cy={0}
                      r={node.radius + 8}
                      fill="transparent"
                      tabIndex={0}
                      role="button"
                      aria-label={`${node.label}, skill`}
                      onMouseEnter={onFocusSkill}
                      onMouseLeave={() => {
                        setFocus({ type: 'none' });
                        setTooltip(null);
                      }}
                      onFocus={onFocusSkill}
                      onBlur={() => {
                        setFocus({ type: 'none' });
                        setTooltip(null);
                      }}
                    />
                  </g>
                );
              }

              const w = 56;
              const h = 28;
              return (
                <g
                  key={node.id}
                  opacity={opacity}
                  className="transition-opacity duration-200"
                  style={nodeMotionStyle(node, entered, reducedMotion)}
                >
                  <rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    rx={4}
                    fill={nodeFill(node)}
                  />
                  <text
                    x={0}
                    y={4}
                    textAnchor="middle"
                    className="fill-paper text-[9px] font-bold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {node.label.length > 12 ? `${node.label.slice(0, 11)}…` : node.label}
                  </text>
                  <rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}, work`}
                    onMouseEnter={onFocusWork}
                    onMouseLeave={() => {
                      setFocus({ type: 'none' });
                      setTooltip(null);
                    }}
                    onFocus={onFocusWork}
                    onBlur={() => {
                      setFocus({ type: 'none' });
                      setTooltip(null);
                    }}
                    onClick={() => activateWork(workId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') activateWork(workId);
                    }}
                  />
                </g>
              );
            })}
          </svg>
          {tooltip ? (
            <p
              className="pointer-events-none absolute bottom-2 left-1/2 max-w-md -translate-x-1/2 rounded border border-grid bg-paper px-3 py-2 font-mono text-xs shadow-sm"
              role="status"
            >
              {tooltip}
            </p>
          ) : null}
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Each line is a real project or role using that skill. Node size = times used.
        </p>
        <ul className="sr-only">
          {skills.map((s) => (
            <li key={s.id}>
              {s.label}:{' '}
              {s.usedBy
                .map((id) => work.find((w) => w.id === id)?.name)
                .filter(Boolean)
                .join('; ')}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
