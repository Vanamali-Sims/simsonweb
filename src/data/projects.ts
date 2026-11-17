import type { LensId } from './site';

/**
 * Projects, most impressive first. `lenses` decides where a project ranks
 * when a recruiter picks a lens; `metric` is null when there is no
 * evidenced number — never invent one. Case-study text lives in cases.ts.
 */
export type Project = {
  slug: string;
  title: string;
  /** One line for cards */
  blurb: string;
  tags: string[];
  repo: string;
  live?: string;
  liveLabel?: string;
  /** Lenses this project is evidence for, strongest first */
  lenses: Exclude<LensId, 'all'>[];
  metric: string | null;
};

export const projects: Project[] = [
  {
    slug: 'tab-debt',
    title: 'Tab Debt',
    blurb:
      'A browser extension with an agent inside: once a day it reads your open tabs, works out why you opened each one, and proposes a plan you approve.',
    tags: ['TypeScript', 'React', 'Vercel AI SDK', 'Chrome on-device AI', 'Vitest', 'WXT'],
    repo: 'https://github.com/Vanamali-Sims/tabDebt',
    lenses: ['ai-eng', 'full-stack'],
    metric: '38 tests, incl. prompt-injection attacks',
  },
  {
    slug: 'unattended',
    title: 'unattended',
    blurb:
      'A booking engine for rentals with nobody on site, and a harness that plays 10,000 customers through a year to find what breaks.',
    tags: ['TypeScript', 'Node', 'Simulation', 'Vitest', 'GitHub Actions'],
    repo: 'https://github.com/Vanamali-Sims/unattended-',
    lenses: ['full-stack', 'data-eng'],
    metric: '4,335 → 0 failures (simulated year)',
  },
  {
    slug: 'fishing-grounds',
    title: 'Sea Anchor',
    blurb:
      'Predicts where fishing boats will head next: 7 GB of ship-tracking (AIS) data through a bronze → silver → gold medallion pipeline, then an implicit-ALS recommender.',
    tags: ['Medallion', 'DuckDB', 'Parquet', 'Implicit ALS', 'FastAPI', 'React', 'deck.gl'],
    repo: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
    live: 'https://fishing-grounds-recsys.onrender.com/',
    lenses: ['data-eng', 'data-sci'],
    metric: '20× better than a popularity guess',
  },
  {
    slug: 'melbourne-footfall',
    title: 'Melbourne Footfall',
    blurb:
      'Hourly CBD pedestrian forecasts by precinct: a daily pipeline from open data to dbt to LightGBM to a public dashboard.',
    tags: ['Python', 'dbt', 'DuckDB', 'LightGBM', 'GitHub Actions', 'Tableau'],
    repo: 'https://github.com/Vanamali-Sims/howMelbMoves',
    live: 'https://public.tableau.com/app/profile/sai.vanamali.simhambhatla4623/viz/MelbourneFootfall/Dashboard3',
    liveLabel: 'Open dashboard',
    lenses: ['data-eng', 'data-sci'],
    metric: '11% lower error than baseline',
  },
  {
    slug: 'my-power-plant',
    title: 'MyPowerPlant',
    blurb:
      'A Virtual Power Plant advisor for Victorian households: savings computed on-device, vendor recommendations, a chatbot and alerts.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS'],
    repo: 'https://github.com/Vanamali-Sims/myPowerPlant',
    live: 'https://mypowerplant.tech',
    lenses: ['full-stack'],
    metric: 'Savings computed on-device',
  },
  {
    slug: 'cloud-stability',
    title: 'Cloud Stability Map',
    blurb:
      'Where Melbourne’s light will hold still: a stability score with live 1/3/6-hour windows and ranked shoot spots.',
    tags: ['TypeScript', 'React', 'deck.gl', 'MapLibre', 'Cloudflare'],
    repo: 'https://github.com/Vanamali-Sims/cloudyorNot',
    live: 'https://cloudyornot.pages.dev/',
    lenses: ['full-stack', 'data-sci'],
    metric: 'Live 1 / 3 / 6-hour re-score',
  },
  {
    slug: 'motion-console',
    title: 'Motion Console',
    blurb:
      'A webcam swipe console: optical flow in a gesture band above the keyboard, with each swipe bound to a command.',
    tags: ['Python', 'OpenCV', 'Computer vision'],
    repo: 'https://github.com/Vanamali-Sims/mdither_console',
    lenses: ['ai-eng'],
    metric: null,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Projects ordered for a lens: matching projects first (by strength), then the rest. */
export function projectsForLens(lens: LensId): Project[] {
  if (lens === 'all') return projects;
  const rank = (p: Project) => {
    const i = p.lenses.indexOf(lens);
    return i === -1 ? 99 : i;
  };
  return projects
    .map((p, order) => ({ p, order }))
    .sort((a, b) => rank(a.p) - rank(b.p) || a.order - b.order)
    .map(({ p }) => p);
}
