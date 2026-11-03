/**
 * Site content: profile, recruiter lenses, experience and stack.
 * Every number here is evidenced in a repo, the CV or a client report.
 * If a claim has no number, leave it without one.
 */

export const CV_PATH = '/Vanamali_Sims_Resume.pdf';

export const profile = {
  name: 'Vanamali Sims',
  location: 'Melbourne, Australia',
  education: 'Master of Data Science, Monash University',
  graduating: 'Graduating Nov 2026',
  // Split so the address isn't sitting in the HTML for scrapers.
  emailParts: ['simsvanamali', 'gmail.com'] as const,
} as const;

export const social = {
  github: 'https://github.com/Vanamali-Sims',
  linkedin: 'https://www.linkedin.com/in/van-sims',
  location: profile.location,
} as const;

export type LensId = 'all' | 'data-eng' | 'data-sci' | 'ai-eng' | 'full-stack';

export type Proof = { value: string; label: string; source: string };

export type Lens = {
  id: LensId;
  /** Short label for the switch */
  label: string;
  /** Role line under the name */
  role: string;
  /** One sentence, in first person */
  pitch: string;
  proof: [Proof, Proof, Proof];
  /** Stack items to light up for this lens */
  stackFocus: string[];
};

const proof = {
  router: {
    value: '6s → 0.2s',
    label: 'LLM question routing, 96.7% faster',
    source: 'SilverOak',
  },
  recsys: {
    value: '20×',
    label: 'a popularity baseline, P@10 0.081 vs 0.004',
    source: 'Sea Anchor',
  },
  incidents: {
    value: '4,335 → 0',
    label: 'incidents across a simulated year of bookings',
    source: 'unattended',
  },
  traffic: {
    value: '500 → 9k+',
    label: 'monthly visits, +35% trial bookings',
    source: 'Zelo',
  },
  goApi: {
    value: '<50ms',
    label: 'Go price-resolution API in production',
    source: 'SilverOak',
  },
  mase: {
    value: '0.87',
    label: 'MASE vs 0.98 seasonal-naive, 89 rolling folds',
    source: 'Melbourne Footfall',
  },
  parquet: {
    value: '2 yrs AIS',
    label: 'streamed into DuckDB over partitioned Parquet',
    source: 'Sea Anchor',
  },
  daily: {
    value: 'Daily',
    label: 'ingest → dbt → model → export, on GitHub Actions',
    source: 'Melbourne Footfall',
  },
  evals: {
    value: '38 cases',
    label: 'labelled agent evals, prompt injection included',
    source: 'Tab Debt',
  },
  handsOff: {
    value: '38% → 87%',
    label: 'bookings that needed no human',
    source: 'unattended',
  },
} satisfies Record<string, Proof>;

export const lenses: Lens[] = [
  {
    id: 'all',
    label: 'Everything',
    role: 'Data · AI · Full-stack Engineer',
    pitch:
      'I build data and AI systems end to end, from raw pipelines and models to the product people actually use.',
    proof: [proof.router, proof.recsys, proof.incidents],
    stackFocus: [],
  },
  {
    id: 'data-eng',
    label: 'Data Eng',
    role: 'Data Engineer',
    pitch:
      'I build pipelines that rerun from a clean checkout: immutable Parquet, dbt on DuckDB, daily CI, and numbers you can trace.',
    proof: [proof.parquet, proof.daily, proof.mase],
    stackFocus: ['Python', 'SQL', 'dbt', 'DuckDB', 'Parquet', 'GitHub Actions', 'Terraform', 'AWS'],
  },
  {
    id: 'data-sci',
    label: 'Data Science',
    role: 'Data Scientist',
    pitch:
      'I model with a real holdout: baseline first, temporal splits, leak checks, and a write-up of what didn’t work.',
    proof: [proof.recsys, proof.mase, proof.router],
    stackFocus: ['Python', 'SQL', 'Pandas', 'scikit-learn', 'LightGBM', 'Implicit ALS', 'DuckDB'],
  },
  {
    id: 'ai-eng',
    label: 'AI Eng',
    role: 'AI Engineer',
    pitch:
      'I ship LLM features that are fast, bounded and tested: embedding routers, tool-using agents with evals, and guardrails against prompt injection.',
    proof: [proof.router, proof.evals, proof.goApi],
    stackFocus: ['Python', 'TypeScript', 'LLM agents', 'Embeddings', 'Evals', 'OpenCV', 'FastAPI'],
  },
  {
    id: 'full-stack',
    label: 'Full-stack',
    role: 'Full-stack Developer',
    pitch:
      'I ship whole products: TypeScript front ends, Go and FastAPI back ends, and the infra and tests that keep them up.',
    proof: [proof.traffic, proof.incidents, proof.handsOff],
    stackFocus: ['TypeScript', 'React', 'Next.js', 'Go', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
  },
];

export type Role = {
  role: string;
  org: string;
  when: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    role: 'Machine Learning Intern',
    org: 'SilverOak Apps',
    when: 'Mar 2025 — Dec 2025',
    points: [
      'Cut question-classification latency 96.7% (6s → 0.2s) by replacing a per-request LLM call with an embedding-based semantic router.',
      'Built a Go price-resolution API serving under 50ms in production, with a 7-tier interval fallback, forex conversion and token auth.',
      'Replaced manual feed collection with a TypeScript RSS ingest service on an AWS cron schedule, plus a scraping module into the same pipeline.',
    ],
    stack: ['Python', 'Embeddings', 'Go', 'TypeScript', 'AWS'],
  },
  {
    role: 'Co-Founder & Developer',
    org: 'Zelo Agents',
    when: 'Jul 2025 — Mar 2026',
    points: [
      'Rebuilt a Melbourne martial-arts gym’s static site as a paid Next.js 15 app with sign-up and contact flows.',
      'Monthly visits grew from 500 at launch to 9,000+ over eight months; the client reported a 35% increase in trial bookings.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    role: 'Freelance Web Developer',
    org: 'drrvcancercare.com',
    when: 'Dec 2025 — now',
    current: true,
    points: [
      'Sole developer and client contact for the patient-facing site of a surgical oncologist (two hospitals, 200,000+ Instagram audience); zero downtime since launch.',
      'Next.js 15 and React 19, schema.org structured data for search, validated enquiry forms, branch-based Vercel releases.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Vercel'],
  },
  {
    role: 'Brand Specialist & IT Sales',
    org: 'JB Hi-Fi · Retail Safari (Microsoft + Meta)',
    when: 'Jul 2025 — now',
    current: true,
    points: [
      'Represent Microsoft and Meta as Product Specialist and Brand Ambassador across three JB Hi-Fi stores, selling tech and smart-home automation to 15–20+ customers a shift.',
      'IT and networking sales at JB Hi-Fi Doncaster and Brighton: turning technical product questions into plain-language decisions and handling objections in real time.',
    ],
    stack: ['Customer-facing', 'Smart home', 'Networking'],
  },
];

export const stacks = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'SQL', 'Go', 'JavaScript'],
  },
  {
    title: 'Data & ML',
    items: [
      'Pandas',
      'scikit-learn',
      'LightGBM',
      'Implicit ALS',
      'DuckDB',
      'dbt',
      'Parquet',
      'OpenCV',
    ],
  },
  {
    title: 'AI',
    items: ['LLM agents', 'Embeddings', 'Evals', 'Prompt-injection guards'],
  },
  {
    title: 'Web & APIs',
    items: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'deck.gl'],
  },
  {
    title: 'Cloud & Ops',
    items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Vercel'],
  },
];

export const about = [
  'I’m finishing a Master of Data Science at Monash, and I like living at the join between analysis and product: models with an honest holdout, and interfaces people actually use.',
  'Most of what I build starts with a question someone can act on: which fishing grounds a vessel will try next, how Melbourne’s streets are really recovering, which of your 60 tabs you’re done with. Then I build whatever it takes to answer it properly, from the ingest job to the UI.',
  'Every project page here says what didn’t work, too. That part is usually the most interesting.',
];
