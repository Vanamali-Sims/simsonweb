import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceCenter,
  type SimulationNodeDatum,
} from 'd3-force';
import { edges, skills, work, type SkillCategory } from '@content/portfolio';

export type GraphNode = SimulationNodeDatum & {
  id: string;
  kind: 'skill' | 'work';
  label: string;
  category: SkillCategory | 'data' | 'frontend' | 'bridge';
  degree: number;
  radius: number;
};

export type GraphLink = {
  source: string;
  target: string;
};

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

export function buildGraphNodes(width: number, height: number): {
  nodes: GraphNode[];
  links: { source: GraphNode; target: GraphNode }[];
} {
  const maxDegree = Math.max(...skills.map((s) => skillDegree(s.id)), 1);
  const rScale = (d: number) => 6 + Math.sqrt(d / maxDegree) * 14;

  const nodes: GraphNode[] = [
    ...skills.map((s) => ({
      id: `skill:${s.id}`,
      kind: 'skill' as const,
      label: s.label,
      category: s.category,
      degree: skillDegree(s.id),
      radius: rScale(skillDegree(s.id)),
      x: width / 2,
      y: height / 2,
    })),
    ...work.map((w) => ({
      id: `work:${w.id}`,
      kind: 'work' as const,
      label: w.name.split(',')[0],
      category: workDominantCategory(w.id),
      degree: edges.filter((e) => e.workId === w.id).length,
      radius: 0,
      x: width / 2,
      y: height / 2,
    })),
  ];

  type SimLink = { source: string | GraphNode; target: string | GraphNode };
  const simLinks: SimLink[] = edges.map((e) => ({
    source: `work:${e.workId}`,
    target: `skill:${e.skillId}`,
  }));

  const simulation = forceSimulation(nodes)
    .force(
      'link',
      forceLink(simLinks)
        .id((d) => (d as GraphNode).id)
        .distance(72)
        .strength(0.35)
    )
    .force('charge', forceManyBody().strength(-280))
    .force('center', forceCenter(width / 2, height / 2))
    .force(
      'collide',
      forceCollide<GraphNode>().radius((d) =>
        d.kind === 'skill' ? d.radius + 10 : 28
      )
    )
    .force(
      'x',
      forceX<GraphNode>()
        .strength(0.12)
        .x((d) => {
          if (d.kind === 'work') return width / 2;
          if (d.category === 'data') return width * 0.28;
          if (d.category === 'frontend') return width * 0.72;
          return width / 2;
        })
    )
    .stop();

  for (let i = 0; i < 400; i++) simulation.tick();

  // forceLink replaces string ids with node references in place
  const links = simLinks.map((l) => ({
    source: l.source as GraphNode,
    target: l.target as GraphNode,
  })).filter((l) => l.source?.id && l.target?.id);

  return { nodes, links };
}
