import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceCenter,
} from 'd3-force';
import { edges, skills, work, type SkillCategory } from '@content/portfolio';

export const GRAPH_WIDTH = 1000;
export const GRAPH_HEIGHT = 640;
export const GRAPH_MARGIN = 40;
export const GRAPH_CENTER_X = GRAPH_WIDTH / 2;
export const GRAPH_CENTER_Y = GRAPH_HEIGHT / 2;

export const EXPECTED_SKILL_NODES = skills.length;
export const EXPECTED_WORK_NODES = work.length;
export const EXPECTED_NODE_COUNT = EXPECTED_SKILL_NODES + EXPECTED_WORK_NODES;

export type LayoutNode = {
  id: string;
  kind: 'skill' | 'work';
  label: string;
  category: SkillCategory | 'data' | 'frontend' | 'bridge';
  radius: number;
  x: number;
  y: number;
};

export type LayoutLink = {
  workId: string;
  skillId: string;
};

function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function skillDegree(skillId: string) {
  return edges.filter((e) => e.skillId === skillId).length;
}

function workDominantCategory(workId: string): 'data' | 'frontend' | 'bridge' {
  const w = work.find((x) => x.id === workId);
  if (w?.category) return w.category;
  const connected = skills.filter((s) => s.usedBy.includes(workId));
  const hasData = connected.some((s) => s.category === 'data');
  const hasFe = connected.some((s) => s.category === 'frontend');
  if (hasData && hasFe) return 'bridge';
  if (hasFe) return 'frontend';
  return 'data';
}

function labelAllowance(node: LayoutNode): number {
  if (node.kind === 'work') return 36;
  return node.radius + 8 + node.label.length * 5.5;
}

function clampNode(node: LayoutNode) {
  const padX = node.kind === 'skill' ? labelAllowance(node) : 32;
  const padY = node.kind === 'skill' ? node.radius + 12 : 18;
  node.x = Math.min(
    GRAPH_WIDTH - GRAPH_MARGIN - padX,
    Math.max(GRAPH_MARGIN + node.radius, node.x)
  );
  node.y = Math.min(
    GRAPH_HEIGHT - GRAPH_MARGIN - padY,
    Math.max(GRAPH_MARGIN + padY, node.y)
  );
}

type SimNode = LayoutNode & { vx?: number; vy?: number; fx?: number | null; fy?: number | null };

export function computePortfolioGraphLayout(): {
  nodes: LayoutNode[];
  links: LayoutLink[];
} {
  const random = mulberry32(0x534149);
  const maxDegree = Math.max(...skills.map((s) => skillDegree(s.id)), 1);
  const rScale = (d: number) => 6 + Math.sqrt(d / maxDegree) * 14;

  const nodes: SimNode[] = [
    ...skills.map((s) => ({
      id: `skill:${s.id}`,
      kind: 'skill' as const,
      label: s.label,
      category: s.category,
      radius: rScale(skillDegree(s.id)),
      x: GRAPH_CENTER_X + (random() - 0.5) * 24,
      y: GRAPH_CENTER_Y + (random() - 0.5) * 24,
    })),
    ...work.map((w) => ({
      id: `work:${w.id}`,
      kind: 'work' as const,
      label: w.name.split(',')[0],
      category: workDominantCategory(w.id),
      radius: 0,
      x: GRAPH_CENTER_X + (random() - 0.5) * 16,
      y: GRAPH_CENTER_Y + (random() - 0.5) * 16,
    })),
  ];

  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const linkSpecs = edges.map((e) => ({
    workId: e.workId,
    skillId: e.skillId,
    source: `work:${e.workId}`,
    target: `skill:${e.skillId}`,
  }));

  const simLinks = linkSpecs.map((l) => ({
    source: l.source,
    target: l.target,
  }));

  const simulation = forceSimulation(nodes)
    .force(
      'link',
      forceLink(simLinks)
        .id((d) => (d as SimNode).id)
        .distance(70)
        .strength(0.4)
    )
    .force('charge', forceManyBody().strength(-220))
    .force('center', forceCenter(GRAPH_CENTER_X, GRAPH_CENTER_Y).strength(0.05))
    .force(
      'collide',
      forceCollide<SimNode>().radius((d) => {
        if (d.kind === 'work') return 34;
        return d.radius + 10 + d.label.length * 3.2;
      })
    )
    .force(
      'x',
      forceX<SimNode>()
        .strength((d) => (d.kind === 'work' ? 0 : 0.25))
        .x((d) => {
          if (d.kind === 'work') return GRAPH_CENTER_X;
          if (d.category === 'data') return 250;
          if (d.category === 'frontend') return 750;
          if (d.category === 'infra') return 500;
          return GRAPH_CENTER_X;
        })
    )
    .stop();

  simulation.tick(300);

  nodes.forEach((n) => clampNode(n));

  const finalNodes: LayoutNode[] = nodes.map((n) => ({
    id: n.id,
    kind: n.kind,
    label: n.label,
    category: n.category,
    radius: n.radius,
    x: n.x,
    y: n.y,
  }));

  const finalLinks: LayoutLink[] = linkSpecs.map((l) => ({
    workId: l.workId,
    skillId: l.skillId,
  }));

  if (process.env.NODE_ENV === 'development') {
    if (finalNodes.length !== EXPECTED_NODE_COUNT) {
      console.error(
        `[SkillsNetwork] Expected ${EXPECTED_NODE_COUNT} nodes, got ${finalNodes.length}`
      );
    }
    for (const n of finalNodes) {
      if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) {
        console.error(`[SkillsNetwork] Node ${n.id} has invalid position`, n);
      }
      const maxX =
        GRAPH_WIDTH -
        GRAPH_MARGIN -
        (n.kind === 'skill' ? labelAllowance(n) : 32);
      const minY = GRAPH_MARGIN + (n.kind === 'skill' ? n.radius + 12 : 18);
      const maxY = GRAPH_HEIGHT - GRAPH_MARGIN - minY;
      if (n.x < GRAPH_MARGIN || n.x > maxX || n.y < minY || n.y > maxY) {
        console.error(
          `[SkillsNetwork] Node ${n.id} outside viewBox margin`,
          n
        );
      }
    }
  }

  return { nodes: finalNodes, links: finalLinks };
}
