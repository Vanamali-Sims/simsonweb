export const CV_PATH = '/Vanamali_Resume.pdf';

export const positioning =
  'Data scientist and software developer in Melbourne. I build analysis pipelines, AI products, and front-end tools meant to ship.';

export const proofChips = [
  'MSc Data Science, Monash',
  'Co-founder, Zelo',
  '96.7% faster routing, SilverOak',
] as const;

export const roles = [
  {
    role: 'Co-Founder & Developer',
    org: 'Zelo',
    when: 'Jul 2025 — Mar 2026',
    text: 'Rebuilt a Melbourne martial-arts gym from a multi-page static site into a paid Next.js 15 / TypeScript / Tailwind app with sign-up and contact. Monthly visits went from 500 at launch to 9,000+ over eight months; the client reported a 35% increase in trial bookings.',
  },
  {
    role: 'Machine Learning Intern',
    org: 'SilverOak Apps',
    when: 'Mar 2025 — Dec 2025',
    text: 'Cut question-classification latency 96.7% (6s to 0.2s) by replacing a per-request LLM call with an embedding-based semantic router. Shipped a Go price-resolution API under 50ms in production, and a TypeScript RSS ingest service on AWS cron.',
  },
  {
    // Retail brand work via Retail Safari — not employment at Meta the company.
    role: 'Brand Specialist',
    org: 'JB Hi-Fi / Retail Safari (Microsoft + Meta)',
    when: 'Jul 2025 — Jul 2026',
    text: 'Represented Microsoft and Meta as Product Specialist and Brand Ambassador — selling tech and smart-home automation, and turning product questions into a clear next step.',
  },
  {
    role: 'IT and Networking Sales',
    org: 'JB Hi-Fi',
    when: 'Sep 2025 — Present',
    text: 'IT and networking sales at JB Hi-Fi Doncaster (Sep 2025 — Feb 2026) and JB Hi-Fi Brighton (Jul 2026 — present).',
  },
];

export const stacks = [
  {
    title: 'Data science',
    items: [
      'Python',
      'SQL',
      'Pandas',
      'LightGBM',
      'Implicit ALS',
      'scikit-learn',
      'DuckDB',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'TypeScript',
      'React 19',
      'Next.js',
      'Tailwind CSS',
      'deck.gl',
      'MapLibre',
    ],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Go', 'REST', 'Pydantic', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Cloud',
    items: [
      'AWS Lambda',
      'S3',
      'CloudFront',
      'Terraform',
      'Docker',
      'GitHub Actions',
    ],
  },
];

export const aboutShort = [
  'Master\'s in Data Science at Monash (2025–2026). I live at the join of analysis and interface: models with a real holdout, and front ends people actually use.',
  'At SilverOak I cut question-routing latency 96.7% with an embedding router. At Zelo I shipped a Next.js rebuild that went from 500 to 9,000+ monthly visits. Freelance, I built and still run drrvcancercare.com for an oncologist with 300,000+ social following — zero downtime since launch.',
  'Outside the terminal: music, photography instincts, and a soft spot for architecture that doesn\'t apologize for itself.',
];

export const social = {
  github: 'https://github.com/Vanamali-Sims',
  linkedin: 'https://www.linkedin.com/in/van-sims',
  location: 'Melbourne, Australia',
} as const;
