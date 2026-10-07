export type SkillCategory = 'data' | 'frontend' | 'infra';

export type WorkType = 'role' | 'project' | 'education';

export type WorkNode = {
  id: string;
  name: string;
  type: WorkType;
  dates: string | null;
  headline: string;
  category: 'data' | 'frontend' | 'bridge';
  /** Case study block on homepage */
  flagship?: boolean;
  problem?: string;
  approach?: string[];
  resultHeadline?: string;
  resultChart?: {
    beforeLabel: string;
    afterLabel: string;
    beforeValue: number;
    afterValue: number;
    unit?: string;
  };
  stackSkillIds?: string[];
  links?: {
    live?: string;
    code?: string;
    writeUp?: string;
  };
  image?: string;
  imageAlt?: string;
  /** Timeline row */
  timeline?: {
    start: string; // YYYY-MM
    end: string | null; // null = present
    label: string;
    detail?: string;
  };
};

export type SkillNode = {
  id: string;
  label: string;
  category: SkillCategory;
  usedBy: string[];
};

export type ProofTile = {
  id: string;
  headline: string;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  beforeValue: number;
  afterValue: number;
  color: 'data' | 'frontend';
};

export const site = {
  name: 'Sai Vanamali',
  positioning: 'Data scientist who ships the front-end too.',
  targetRoles: [
    'Data Scientist',
    'ML Engineer',
    'Analytics Engineer',
    'Front-end Developer',
  ],
  location: 'Melbourne, VIC',
  availability: 'Available from Dec 2026',
  workRights: 'Full work rights (AU)',
  email: 'simsvanamali@gmail.com',
  linkedin: 'https://www.linkedin.com/in/van-sims',
  github: 'https://github.com/Vanamali-Sims',
  cvPath: '/Vanamali_Resume.pdf',
  year: new Date().getFullYear(),
  referrerPitch:
    'Data scientist + front-end: cut LLM routing 96.7% at SilverOak, rebuilt a gym site to 9,000+ monthly visits.',
  flagships: ['silveroak', 'sea-anchor', 'mypowerplant'] as const,
};

export const proofTiles: ProofTile[] = [
  {
    id: 'silveroak-routing',
    headline: '96.7% faster',
    caption: 'Question routing, SilverOak Apps (production)',
    beforeLabel: 'LLM call',
    afterLabel: 'Semantic router',
    beforeValue: 6.0,
    afterValue: 0.2,
    color: 'data',
  },
  {
    id: 'zelo-traffic',
    headline: '18× traffic',
    caption: 'Gym site rebuild, Zelo (client reported +35% trial bookings)',
    beforeLabel: 'Launch',
    afterLabel: 'Month 8',
    beforeValue: 500,
    afterValue: 9000,
    color: 'frontend',
  },
  {
    id: 'sea-anchor-p10',
    headline: '20× baseline',
    caption: 'Sea Anchor recommender, precision@10',
    beforeLabel: 'Popularity',
    afterLabel: 'ALS',
    beforeValue: 0.004,
    afterValue: 0.081,
    color: 'data',
  },
];

export const skills: SkillNode[] = [
  { id: 'python', label: 'Python', category: 'data', usedBy: ['sea-anchor', 'mypowerplant', 'footfall', 'motion'] },
  { id: 'sql', label: 'SQL', category: 'data', usedBy: ['sea-anchor', 'footfall'] },
  { id: 'dbt', label: 'dbt / data modelling', category: 'data', usedBy: ['footfall'] },
  { id: 'duckdb', label: 'DuckDB', category: 'data', usedBy: ['sea-anchor', 'footfall'] },
  { id: 'ml', label: 'Machine learning', category: 'data', usedBy: ['sea-anchor', 'footfall', 'silveroak'] },
  { id: 'als', label: 'Recommender systems (ALS)', category: 'data', usedBy: ['sea-anchor'] },
  { id: 'lightgbm', label: 'Forecasting (LightGBM)', category: 'data', usedBy: ['footfall'] },
  { id: 'llm', label: 'LLMs / embeddings / semantic routing', category: 'data', usedBy: ['silveroak'] },
  { id: 'opencv', label: 'Computer vision (OpenCV)', category: 'data', usedBy: ['motion'] },
  { id: 'tableau', label: 'Data visualisation (Tableau)', category: 'data', usedBy: ['footfall'] },
  { id: 'go', label: 'Go', category: 'data', usedBy: ['silveroak'] },
  { id: 'fastapi', label: 'FastAPI / REST APIs', category: 'data', usedBy: ['sea-anchor', 'mypowerplant'] },
  { id: 'typescript', label: 'TypeScript', category: 'frontend', usedBy: ['silveroak', 'zelo', 'mypowerplant', 'cloud-map'] },
  { id: 'react', label: 'React', category: 'frontend', usedBy: ['sea-anchor', 'mypowerplant', 'cloud-map'] },
  { id: 'nextjs', label: 'Next.js', category: 'frontend', usedBy: ['zelo'] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', usedBy: ['zelo'] },
  { id: 'deckgl', label: 'deck.gl / MapLibre (geospatial UI)', category: 'frontend', usedBy: ['sea-anchor', 'cloud-map'] },
  { id: 'a11y', label: 'Accessibility (WCAG AA)', category: 'frontend', usedBy: ['mypowerplant'] },
  { id: 'web-delivery', label: 'Web delivery & maintenance', category: 'frontend', usedBy: ['freelance', 'zelo'] },
  { id: 'aws', label: 'AWS', category: 'infra', usedBy: ['silveroak', 'mypowerplant'] },
  { id: 'terraform', label: 'Terraform', category: 'infra', usedBy: ['mypowerplant'] },
  { id: 'docker', label: 'Docker', category: 'infra', usedBy: ['sea-anchor'] },
  { id: 'cicd', label: 'CI/CD (GitHub Actions)', category: 'infra', usedBy: ['mypowerplant'] },
];

export const work: WorkNode[] = [
  {
    id: 'silveroak',
    name: 'SilverOak Apps, ML Intern',
    type: 'role',
    dates: 'Mar 2025 – Dec 2025',
    headline:
      'Routing 6s → 0.2s (96.7%), embedding semantic router replacing a per-request LLM call. Go price API < 50ms in production. TypeScript RSS ingest service on an AWS cron.',
    category: 'bridge',
    flagship: true,
    problem:
      'Every user question triggered a full LLM classification call — about six seconds of latency in production.',
    approach: [
      'Replaced the per-request LLM with an embedding-based semantic router that classifies in ~200ms.',
      'Shipped a Go price-resolution API under 50ms and a TypeScript RSS ingest on AWS cron.',
    ],
    resultHeadline: '96.7% faster question routing',
    resultChart: {
      beforeLabel: 'LLM call',
      afterLabel: 'Semantic router',
      beforeValue: 6.0,
      afterValue: 0.2,
    },
    stackSkillIds: ['llm', 'go', 'typescript', 'aws'],
    timeline: {
      start: '2025-03',
      end: '2025-12',
      label: 'SilverOak Apps — ML Intern',
      detail:
        'Embedding semantic router, Go price API, TypeScript RSS ingest on AWS.',
    },
  },
  {
    id: 'zelo',
    name: 'Zelo Agents, Co-Founder & Developer',
    type: 'role',
    dates: 'Jul 2025 – Mar 2026',
    headline:
      'Gym site rebuilt as a Next.js 15 app; 500 → 9,000+ monthly visits in 8 months; client reported +35% trial bookings.',
    category: 'frontend',
    problem:
      'A multi-page static gym site could not capture sign-ups or reflect the brand after COVID-era traffic collapse.',
    approach: [
      'Rebuilt on Next.js 15, TypeScript, and Tailwind with sign-up and contact flows.',
      'Owned delivery and ongoing maintenance as co-founder.',
    ],
    resultHeadline: '18× monthly traffic in eight months',
    resultChart: {
      beforeLabel: 'Launch',
      afterLabel: 'Month 8',
      beforeValue: 500,
      afterValue: 9000,
    },
    stackSkillIds: ['nextjs', 'typescript', 'tailwind', 'web-delivery'],
    timeline: {
      start: '2025-07',
      end: '2026-03',
      label: 'Zelo Agents — Co-Founder & Developer',
      detail: 'Next.js 15 rebuild; 500 → 9,000+ monthly visits; +35% trial bookings (client reported).',
    },
  },
  {
    id: 'freelance',
    name: 'Freelance Web Developer',
    type: 'role',
    dates: 'Dec 2025 – present',
    headline:
      'Built and maintain drrvcancercare.com for an oncologist with a 300,000+ social following; zero downtime since launch.',
    category: 'frontend',
    stackSkillIds: ['web-delivery'],
    timeline: {
      start: '2025-12',
      end: null,
      label: 'Freelance Web Developer',
      detail: 'drrvcancercare.com — zero downtime since launch.',
    },
  },
  {
    id: 'jbhifi',
    name: 'JB Hi-Fi / Retail Safari, Brand Specialist (Microsoft + Meta)',
    type: 'role',
    dates: 'Jul 2025 – present',
    headline:
      'Three stores, 15–20+ customers per shift; explaining complex tech in plain language.',
    category: 'frontend',
    timeline: {
      start: '2025-07',
      end: null,
      label: 'JB Hi-Fi / Retail Safari — Brand Specialist',
      detail: 'Microsoft + Meta brand specialist across three stores.',
    },
  },
  {
    id: 'monash',
    name: 'Monash University, Master of Data Science',
    type: 'education',
    dates: 'Mar 2025 – Nov 2026',
    headline: '—',
    category: 'data',
    timeline: {
      start: '2025-03',
      end: '2026-11',
      label: 'Monash University — Master of Data Science',
    },
  },
  {
    id: 'sea-anchor',
    name: 'Sea Anchor',
    type: 'project',
    dates: null,
    headline:
      'ALS recommender on sparse implicit feedback from AIS vessel tracks; precision@10 0.081 vs. 0.004 popularity baseline (20×), temporal split with a leak check; 10-endpoint typed REST API.',
    category: 'bridge',
    flagship: true,
    problem:
      'Two years of AIS fishing activity is a recommender with no explicit ratings — only sparse implicit hours per ocean cell.',
    approach: [
      'Implicit ALS with confidence weighting; temporal train/test split and leak check.',
      'DuckDB over Parquet at this scale; FastAPI + React map with deck.gl / MapLibre.',
    ],
    resultHeadline: '20× precision@10 vs. popularity baseline',
    resultChart: {
      beforeLabel: 'Popularity',
      afterLabel: 'ALS',
      beforeValue: 0.004,
      afterValue: 0.081,
    },
    stackSkillIds: ['python', 'sql', 'duckdb', 'ml', 'als', 'fastapi', 'react', 'deckgl', 'docker'],
    links: {
      live: 'https://fishing-grounds-recsys.onrender.com/',
      code: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
    },
    image: '/projects/fishing-grounds.png',
    imageAlt: 'Map of recommended fishing grounds from AIS vessel tracks',
  },
  {
    id: 'mypowerplant',
    name: 'MyPowerPlant',
    type: 'project',
    dates: null,
    headline:
      'Victorian VPP advisor; savings computed in-browser so data never leaves the device; Terraform (CloudFront, private S3, arm64 Lambda, ECR, SSM), GitHub Actions OIDC deploys, SHA-tagged rollback; WCAG AA.',
    category: 'bridge',
    flagship: true,
    problem:
      'Households need VPP savings maths and vendor guidance without sending meter data to a retailer.',
    approach: [
      'Savings model runs entirely in the browser; server only where necessary behind FastAPI.',
      'Terraform for CloudFront, private S3, arm64 Lambda, ECR, SSM; GitHub Actions OIDC deploys.',
    ],
    resultHeadline: 'On-device savings with WCAG AA UI',
    stackSkillIds: ['python', 'fastapi', 'typescript', 'react', 'a11y', 'aws', 'terraform', 'cicd'],
    links: {
      live: 'https://d3rvyrwejm3499.cloudfront.net/',
      code: 'https://github.com/Vanamali-Sims/myPowerPlant',
    },
    image: '/projects/my-power-plant.png',
    imageAlt: 'MyPowerPlant virtual power plant advisor',
  },
  {
    id: 'cloud-map',
    name: 'Cloud Stability Map',
    type: 'project',
    dates: null,
    headline:
      'Stability score for where Melbourne light will hold; live 1/3/6-hour re-scoring; ranked shoot spots.',
    category: 'frontend',
    stackSkillIds: ['typescript', 'react', 'deckgl'],
    links: {
      live: 'https://cloudyornot.pages.dev/',
      code: 'https://github.com/Vanamali-Sims/cloudyorNot',
    },
    image: '/projects/cloud-stability.png',
    imageAlt: 'Melbourne cloud stability map with contour bands',
  },
  {
    id: 'footfall',
    name: 'Melbourne Footfall',
    type: 'project',
    dates: null,
    headline:
      'Hourly CBD pedestrian forecasts by precinct; recovery after lockdowns.',
    category: 'data',
    stackSkillIds: ['python', 'sql', 'dbt', 'duckdb', 'ml', 'lightgbm', 'tableau'],
    links: {
      code: 'https://github.com/Vanamali-Sims/howMelbMoves',
    },
    image: '/projects/melbourne-footfall.png',
    imageAlt: 'Melbourne CBD pedestrian footfall by precinct',
  },
  {
    id: 'motion',
    name: 'Motion Console',
    type: 'project',
    dates: null,
    headline:
      'Optical flow in a gesture band above the keyboard; programmable webcam swipe commands.',
    category: 'data',
    stackSkillIds: ['python', 'opencv'],
    links: {
      code: 'https://github.com/Vanamali-Sims/mdither_console',
    },
    image: '/projects/motion-console.png',
    imageAlt: 'Motion Console webcam gesture interface',
  },
];

export const edges: { workId: string; skillId: string }[] = skills.flatMap((s) =>
  s.usedBy.map((workId) => ({ workId, skillId: s.id }))
);

export function getWork(id: string) {
  return work.find((w) => w.id === id);
}

export function getSkill(id: string) {
  return skills.find((s) => s.id === id);
}

export function workCategory(workId: string): 'data' | 'frontend' | 'bridge' {
  const w = getWork(workId);
  if (w?.category) return w.category;
  const connected = skills.filter((s) => s.usedBy.includes(workId));
  const hasData = connected.some((s) => s.category === 'data');
  const hasFe = connected.some((s) => s.category === 'frontend');
  if (hasData && hasFe) return 'bridge';
  if (hasFe) return 'frontend';
  return 'data';
}

export const flagships = work.filter((w) => w.flagship);

export const otherProjects = work.filter(
  (w) => w.type === 'project' && !w.flagship
);

export const timelineEntries = work.filter((w) => w.timeline);

export const knowsAbout = skills.map((s) => s.label);
