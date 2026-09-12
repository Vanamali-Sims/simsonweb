export const CV_PATH = '/Vanamali_Resume.pdf';

export const positioning =
  'Data scientist and software developer in Melbourne. I build AI products, analysis pipelines, and tools meant to ship.';

export const proofChips = [
  'MSc Data Science, Monash',
  'Co-founder and AI Lead, Zelo',
  'TODO — third proof point',
] as const;

export const roles = [
  {
    role: 'Co-Founder & AI Lead',
    org: 'Zelo',
    when: '2025 — Now',
    text: 'Affordable local AI agents. Custom automation, scraping, and intelligent workflows for people who refuse enterprise price tags.',
  },
  {
    // "Meta / Meta Expert" reads as employment at Meta the company.
    // Replace both fields with the actual relationship wording when supplied.
    role: 'TODO — Meta relationship label',
    org: 'TODO',
    when: '2025 — Now',
    text: 'Retail + technical consultation on Meta platforms — turning product questions into clear next steps.',
  },
  {
    role: 'Machine Learning Intern',
    org: 'Silveroakapps',
    when: '2025',
    text: 'Shipped ML solutions for real datasets — processing pipelines, predictive models, and evaluation loops.',
  },
];

export const stacks = [
  {
    title: 'AI & Automation',
    items: ['LangChain', 'GPT-4', 'Custom Agents', 'Prompt Engineering'],
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'scikit-learn', 'TensorFlow', 'Pandas', 'R'],
  },
  {
    title: 'Bioinformatics',
    items: ['RNA-Seq', 'BioPython', 'DESeq2', 'BLAST'],
  },
  {
    title: 'Engineering',
    items: ['TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL'],
  },
];

export const aboutShort = [
  'Master\'s in Data Science at Monash, technology background from JNTU Kakinada, and AWS Machine Learning and Cloud Foundations certified.',
  'Day to day that means local AI agents at Zelo, ML work that survives messy data, and full-stack builds when the interface matters as much as the model.',
  'Outside the terminal: music, photography instincts, and a soft spot for architecture that doesn\'t apologize for itself.',
];

export const social = {
  github: 'https://github.com/Vanamali-Sims',
  linkedin: 'https://www.linkedin.com/in/van-sims',
  location: 'Melbourne, Australia',
} as const;
