export type SkillCategory = 'data' | 'front' | 'infra';

export type WorkKind = 'exp' | 'proj';

export type WorkChart = {
  beforeLabel: string;
  before: number;
  afterLabel: string;
  after: number;
  beforePct: number;
  afterPct: number;
  colour: 'blue' | 'orange';
};

export type WorkItem = {
  id: string;
  kind: WorkKind;
  name: string;
  sub: string;
  metric: string;
  skillIds: string[];
  result: string;
  chart?: WorkChart;
  lines: string[];
  /** Project hover card copy */
  desc?: string;
  /** Experience duration (YYYY-MM); end null = now */
  start?: string;
  end?: string | null;
  live?: string;
  github?: string;
};

export type SkillDef = {
  id: string;
  name: string;
  category: SkillCategory;
};

export type PlanetDef = {
  key: 'skills' | 'projects' | 'experience';
  name: string;
  color: string;
  sphereTint: [string, string, string];
  itemIds: string[];
  caption: string;
};

export const LINKEDIN_URL = 'https://www.linkedin.com/in/van-sims';
export const CV_PDF_PATH = '/Vanamali_Resume.pdf';
export const EMAIL = 'simsvanamali@gmail.com';

const skillDefs: SkillDef[] = [
  { id: 'python', name: 'Python', category: 'data' },
  { id: 'sql', name: 'SQL', category: 'data' },
  { id: 'dbt', name: 'dbt', category: 'data' },
  { id: 'model', name: 'Data modelling', category: 'data' },
  { id: 'duckdb', name: 'DuckDB', category: 'data' },
  { id: 'ml', name: 'Machine learning', category: 'data' },
  { id: 'recsys', name: 'RecSys', category: 'data' },
  { id: 'forecast', name: 'Forecasting', category: 'data' },
  { id: 'llm', name: 'LLMs', category: 'data' },
  { id: 'emb', name: 'Embeddings', category: 'data' },
  { id: 'cv', name: 'OpenCV', category: 'data' },
  { id: 'viz', name: 'Tableau', category: 'data' },
  { id: 'go', name: 'Go', category: 'data' },
  { id: 'api', name: 'FastAPI', category: 'data' },
  { id: 'ts', name: 'TypeScript', category: 'front' },
  { id: 'react', name: 'React', category: 'front' },
  { id: 'next', name: 'Next.js', category: 'front' },
  { id: 'tw', name: 'Tailwind', category: 'front' },
  { id: 'geo', name: 'deck.gl', category: 'front' },
  { id: 'a11y', name: 'WCAG AA', category: 'front' },
  { id: 'aws', name: 'AWS', category: 'infra' },
  { id: 'tf', name: 'Terraform', category: 'infra' },
  { id: 'docker', name: 'Docker', category: 'infra' },
  { id: 'ci', name: 'CI/CD', category: 'infra' },
];

const workItems: WorkItem[] = [
  {
    id: 'silveroak',
    kind: 'exp',
    name: 'SilverOak Apps',
    sub: 'ML Intern · Mar – Dec 2025',
    metric: '6s → 0.2s',
    skillIds: ['ml', 'llm', 'emb', 'go', 'ts', 'aws'],
    result: '96.7% faster question routing',
    chart: {
      beforeLabel: 'LLM call',
      before: 6.0,
      afterLabel: 'Semantic router',
      after: 0.2,
      beforePct: 100,
      afterPct: 3.3,
      colour: 'blue',
    },
    lines: [
      'Replaced a per-request LLM call with an embedding-based semantic router.',
      'Go price-resolution API under 50ms in production; TypeScript RSS ingest on an AWS cron.',
    ],
    start: '2025-03',
    end: '2025-12',
  },
  {
    id: 'zelo',
    kind: 'exp',
    name: 'Zelo Agents',
    sub: 'Co-Founder & Developer · Jul 2025 – Mar 2026',
    metric: '18× traffic',
    skillIds: ['ts', 'next', 'tw'],
    result: '500 → 9,000+ monthly visits; client reported +35% trial bookings',
    chart: {
      beforeLabel: 'Launch',
      before: 500,
      afterLabel: 'Month 8',
      after: 9000,
      beforePct: 5.6,
      afterPct: 100,
      colour: 'orange',
    },
    lines: [
      'Rebuilt a Melbourne martial-arts gym as a paid Next.js 15 / TypeScript / Tailwind app with sign-up and contact flows.',
    ],
    start: '2025-07',
    end: '2026-03',
  },
  {
    id: 'freelance',
    kind: 'exp',
    name: 'Freelance',
    sub: 'Web Developer · Dec 2025 – now',
    metric: '0 downtime',
    skillIds: ['ts'],
    result: 'Zero downtime since launch',
    lines: [
      'Built and maintain drrvcancercare.com for an oncologist with a 300,000+ social following.',
    ],
    start: '2025-12',
    end: null,
  },
  {
    id: 'jb',
    kind: 'exp',
    name: 'JB Hi-Fi',
    sub: 'Brand Specialist, Microsoft + Meta · Jul 2025 – now',
    metric: '3 stores',
    skillIds: [],
    result: '15–20+ customers a shift',
    lines: [
      'Explaining complex tech in plain language, with objections coming back in real time.',
    ],
    start: '2025-07',
    end: null,
  },
  {
    id: 'monash',
    kind: 'exp',
    name: 'Monash',
    sub: 'Master of Data Science · Mar 2025 – Nov 2026',
    metric: 'MDS 2026',
    skillIds: ['python', 'sql', 'ml'],
    result: 'Graduating November 2026',
    lines: ['Postgraduate data science, studied alongside the work on this page.'],
    start: '2025-03',
    end: '2026-11',
  },
  {
    id: 'sea',
    kind: 'proj',
    name: 'Sea Anchor',
    sub: 'Fishing-ground recommender',
    metric: '20× baseline',
    skillIds: ['python', 'sql', 'duckdb', 'ml', 'recsys', 'api', 'react', 'geo', 'docker'],
    result: '20× a popularity baseline on precision@10',
    chart: {
      beforeLabel: 'Popularity',
      before: 0.004,
      afterLabel: 'Implicit ALS',
      after: 0.081,
      beforePct: 4.9,
      afterPct: 100,
      colour: 'blue',
    },
    desc:
      'Recommends where fishing vessels should operate, using collaborative filtering on sparse implicit feedback from AIS tracks.',
    lines: [
      'Implicit ALS on AIS vessel tracks; temporal split with a leak check.',
      '10-endpoint typed REST API, so the front-end was built before the model existed.',
    ],
    live: 'https://fishing-grounds-recsys.onrender.com/',
    github: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
  },
  {
    id: 'mpp',
    kind: 'proj',
    name: 'MyPowerPlant',
    sub: 'Virtual Power Plant advisor',
    metric: 'On-device',
    skillIds: ['python', 'api', 'ts', 'react', 'a11y', 'aws', 'tf', 'ci'],
    result: 'Savings computed in the browser; data never leaves the device',
    desc:
      'Helps Victorian households decide whether to join a Virtual Power Plant, with savings computed privately in the browser.',
    lines: [
      'Terraform: CloudFront, private S3, arm64 Lambda, ECR, SSM. OIDC deploys, SHA-tagged rollback.',
      'Built to WCAG AA.',
    ],
    live: 'https://d3rvyrwejm3499.cloudfront.net/',
    github: 'https://github.com/Vanamali-Sims/myPowerPlant',
  },
  {
    id: 'cloud',
    kind: 'proj',
    name: 'Cloud Stability',
    sub: 'Melbourne light forecasting',
    metric: '1·3·6h live',
    skillIds: ['ts', 'react', 'geo'],
    result: 'Live re-scoring over 1, 3 and 6-hour windows',
    desc:
      'Scores where Melbourne light will hold still and ranks shoot spots, re-scored live over 1, 3 and 6-hour windows.',
    lines: [
      'Stability score per area with ranked shoot spots on a deck.gl / MapLibre map.',
    ],
    live: 'https://cloudyornot.pages.dev/',
    github: 'https://github.com/Vanamali-Sims/cloudyorNot',
  },
  {
    id: 'footfall',
    kind: 'proj',
    name: 'Footfall',
    sub: 'CBD pedestrian forecasts',
    metric: 'Hourly',
    skillIds: ['python', 'sql', 'dbt', 'model', 'duckdb', 'ml', 'forecast', 'viz'],
    result: 'Hourly forecasts for every CBD precinct',
    desc:
      'Hourly pedestrian forecasts for every CBD precinct, and how each street recovered after lockdowns.',
    lines: [
      'dbt-duckdb models over pedestrian sensor counts; LightGBM forecasts; told in Tableau.',
    ],
    github: 'https://github.com/Vanamali-Sims/howMelbMoves',
  },
  {
    id: 'motion',
    kind: 'proj',
    name: 'Motion Console',
    sub: 'Gesture shortcuts',
    metric: 'Swipe → cmd',
    skillIds: ['python', 'cv'],
    result: 'Programmable swipe actions from a webcam',
    desc:
      'Webcam gesture console: swipes above the keyboard trigger commands you program.',
    lines: ['Optical flow in a gesture band above the keyboard.'],
    github: 'https://github.com/Vanamali-Sims/mdither_console',
  },
];

export const planets: PlanetDef[] = [
  {
    key: 'skills',
    name: 'Skills',
    color: '#3D4BFF',
    sphereTint: ['#FFFFFF', '#E6E8FF', '#B7BCF7'],
    itemIds: skillDefs.map((s) => s.id),
    caption: 'size = times used · drag to turn · click a word',
  },
  {
    key: 'projects',
    name: 'Projects',
    color: '#E8541A',
    sphereTint: ['#FFFFFF', '#FFE9DE', '#F6B796'],
    itemIds: ['sea', 'mpp', 'cloud', 'footfall', 'motion'],
    caption: 'drag to turn · click a project',
  },
  {
    key: 'experience',
    name: 'Experience',
    color: '#0A0A0A',
    sphereTint: ['#FFFFFF', '#EDEDED', '#C2C2C2'],
    itemIds: ['silveroak', 'zelo', 'freelance', 'jb', 'monash'],
    caption: 'drag to turn · click a role',
  },
];

export const categoryColors: Record<SkillCategory, string> = {
  data: '#3D4BFF',
  front: '#E8541A',
  infra: '#0A0A0A',
};

export function getSkill(id: string): SkillDef | undefined {
  return skillDefs.find((s) => s.id === id);
}

export function getWork(id: string): WorkItem | undefined {
  return workItems.find((w) => w.id === id);
}

export type SkillWithUsage = SkillDef & { timesUsed: number };

export function getSkillsWithUsage(): SkillWithUsage[] {
  return skillDefs.map((skill) => ({
    ...skill,
    timesUsed: workItems.filter((w) => w.skillIds.includes(skill.id)).length,
  }));
}

export function getWorkForSkill(skillId: string): WorkItem[] {
  return workItems.filter((w) => w.skillIds.includes(skillId));
}

export function skillKicker(category: SkillCategory): string {
  if (category === 'data') return 'Data & ML skill';
  if (category === 'front') return 'Front-end skill';
  return 'Infra skill';
}

export function skillCategoryShort(category: SkillCategory): string {
  if (category === 'data') return 'Data & ML';
  if (category === 'front') return 'Front-end';
  return 'Infra';
}

export function projectLinkHint(work: WorkItem): string {
  if (work.live) return 'Click to open live site ↗';
  if (work.github) return 'Click to open GitHub ↗';
  return 'Click for details';
}

export function projectLabelAria(work: WorkItem): string {
  if (work.live) {
    return `${work.name}, ${work.metric}. Opens live site in a new tab`;
  }
  if (work.github) {
    return `${work.name}, ${work.metric}. Opens GitHub in a new tab`;
  }
  return `${work.name}, ${work.metric}. Open details`;
}

export function projectTouchButtonLabel(work: WorkItem): string {
  if (work.live) return 'Open live site ↗';
  if (work.github) return 'Open GitHub ↗';
  return 'Details';
}

export { skillDefs, workItems };
