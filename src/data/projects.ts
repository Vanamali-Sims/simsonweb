import type { LensId } from './site';

/**
 * Projects, most impressive first. `lenses` decides where a project ranks
 * when a recruiter picks a lens; `metric` is null when there is no
 * evidenced number — never invent one.
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
  /** Shown on the case study when the work was not solo */
  team?: string;
  status?: string;
  problem: string;
  approach: string;
  result: string;
  didNotWork: string;
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
    metric: '38-case agent eval, injection included',
    problem:
      'Tabs pile up because closing them feels like losing something. A tool that closes tabs for you has to be right about intent — finished, to read later, a task, part of a project — and it must never close the wrong thing, even when a web page tries to talk the model into it.',
    approach:
      'Free rules run first: protected tabs, duplicates, followed-up searches, confirmation and error pages. Only unclear tabs reach a short, bounded agent loop with three tools (read_page, find_related, submit_plan). The agent can only propose; a separate executor is the only code that closes or saves, and it re-checks every tab itself. It runs free on Chrome’s built-in on-device model, or on the user’s own key (OpenRouter, Anthropic, OpenAI, Gemini). Page text reaches the model only inside a marked untrusted block and is checked for injected instructions. A once-a-day “Finishing up?” nudge learns your usual finish time from tab events.',
    result:
      'A working MV3 extension with a side-panel review, a morning “here’s where you left off” brief, undo for every review, and Chrome Web Store assets ready. An eval suite of 38 labelled tabs — two of them prompt-injection pages — fails the run on any injection leak, too many unsafe closes, or low accuracy. Unit tests cover rules, tracker, agent and executor, and end-to-end tests drive a real Chromium.',
    didNotWork:
      'Only the OpenAI-compatible provider path is tested end to end so far; Anthropic, OpenAI and Gemini are wired through the AI SDK but still need a real-key check. Search is keyword-based, and Chrome may refuse to open the side panel straight from a notification, so the review waits for the next icon click.',
  },
  {
    slug: 'unattended',
    title: 'unattended',
    blurb:
      'A booking engine for rentals with nobody on site, and a harness that plays 10,000 customers through a year to find what breaks.',
    tags: ['TypeScript', 'Node', 'Simulation', 'Vitest', 'GitHub Actions'],
    repo: 'https://github.com/Vanamali-Sims/unattended-',
    lenses: ['full-stack', 'data-eng'],
    metric: '4,335 → 0 incidents',
    problem:
      'Self-service hire (trailers, kayaks, tools) means a customer books online, verifies ID, gets a time-limited smart-lock PIN and collects the item alone. The happy path is easy. The trailer that comes back three hours late, the lock with no reception, the hire that crosses a daylight-saving change, the bond that quietly expired — with nobody on site, each one is a stranded customer at 2am.',
    approach:
      'Instead of hand-testing a few cases, a seeded harness simulates a whole year: customers who act only on the local times and SMS they were told, locks that drop offline for up to 18 hours, card holds that lapse after 7 days. After every event it checks seven invariants the business promises — no double booking, nobody stranded, no unverified pickup, no zombie PINs, a live bond at return, fair billing, and that what the engine acts on matches what the customer was told. One rule holds the time model together: customer-facing times are stored as wall-clock text, machine actions as instants, converted in one module.',
    result:
      'The first, obvious version produced 4,335 incidents in a simulated year and only 38.3% of bookings needed no human. Each finding was fixed on its own branch with a regression test that fails on the old code. After the fixes: zero incidents and 87.4% hands-off, clean across 20 seeds — 200,000 year bookings plus 60,000 aimed at clock-change weekends — checked by CI on every push. A full year runs in about 3.6 seconds.',
    didNotWork:
      'The harness caught a bug in one of the fixes: the first late-return fix moved bookings out of the list it was iterating, silently skipping the next booking. Payments and locks are still fakes modelled on documented behaviour, and the customer model is a reasoned guess — driving it from a real booking export is the next step.',
  },
  {
    slug: 'fishing-grounds',
    title: 'Fishing Grounds Recsys',
    blurb:
      'Implicit ALS on two years of AIS tracks: vessels × ocean cells, fishing hours as confidence, not ratings.',
    tags: ['Implicit ALS', 'DuckDB', 'Parquet', 'FastAPI', 'React', 'deck.gl'],
    repo: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
    live: 'https://fishing-grounds-recsys.onrender.com/',
    lenses: ['data-sci', 'data-eng'],
    metric: '~20× a popularity baseline',
    problem:
      'Two years of Global Fishing Watch AIS (~190k vessels) is a recommender with the wrong nouns: vessel as user, 0.1° ocean cell as item, fishing hours as the signal. There are no negatives. Zero hours in a cell might mean out of range, wrong season, a protected area, or simply never tried — so treating absence as dislike would poison the model. A cell with long presence and almost no fishing is a transit corridor, not a ground.',
    approach:
      'Hours became a confidence weight on a binary preference (Hu, Koren & Volinsky), transit noise was filtered out of the interaction matrix, and implicit ALS (32 factors, α=10) was trained against popularity and popularity-by-gear baselines. Evaluation used a temporal split — train through Q3 2024, test Q4 — plus a leak check; a random split would have inflated every number. At ~750 MB compressed per year, DuckDB over partitioned Parquet with streaming ingest beat reaching for Spark. Serving is a 10-endpoint FastAPI with typed Pydantic contracts and a React map.',
    result:
      'On 177 warm vessels with new Q4 2024 grounds in the Australian EEZ, ALS hit Precision@10 0.0814 against 0.0040 for popularity-by-gear — about 20× on the same protocol — and Recall@10 0.1149 vs 0.0043. For cold-start vessels, content fold-in reached P@10 0.0556 where gear popularity scored 0. Hybrid serving uses ALS for warm vessels and fold-in for unseen ones. The same factors feed MPA-legal recommendations, IUU-like anomaly flags and seasonal effort climatology.',
    didNotWork:
      'Content fold-in was weaker for warm vessels (P@10 0.0192 vs 0.0814), so it is a fallback, not the main model. A 10 GB CSV dump on disk was the first thing that broke; the zips are now streamed and never extracted, keeping peak memory bounded.',
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
    metric: 'MASE 0.87 vs 0.98 baseline',
    problem:
      'Pedestrian sensors are one of the few high-frequency public signals of how Melbourne is used. After lockdowns, recovery was uneven by precinct and by hour; a citywide average hides the streets that came back and the ones that didn’t. The question: for each CBD precinct and hour, what footfall should we expect, and how far is recent volume from it?',
    approach:
      'City of Melbourne sensor counts, weather, calendar and CLUE land use land as immutable Parquet. dbt on DuckDB owns staging, joins and grain, ending in a precinct × hour mart. Python adds features, fits a 24-hour seasonal-naive baseline first, then LightGBM, scored with MASE on rolling-origin folds, and exports a Tableau-ready table. Everything reruns from a clean checkout with make targets, decisions are recorded as ADRs, and a scheduled GitHub Actions workflow runs the pipeline every morning.',
    result:
      'On 2026-06-04 to 2026-09-01 — 18,901 precinct-hour rows across 9 CLUE areas and 89 rolling-origin folds — LightGBM scored a pooled MASE of 0.87 against 0.98 for the seasonal-naive baseline (lower is better). The output is published as a Tableau Public dashboard for non-technical readers.',
    didNotWork:
      'The pre-lockdown comparison that motivated the project isn’t in yet: the live hourly API only starts at 2024-09-06, so there is no verified older series to compare against. Sensors are mapped to precincts by nearest block, which a published sensor-to-area table would replace.',
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
    team: 'Team project. I led the frontend and product flows — dashboard, onboarding, goals and the KPI maths — and worked on the FastAPI backend.',
    problem:
      'Victorian households deciding whether to join a Virtual Power Plant should see the savings maths, who to buy from, and when to act — without handing a retailer their meter data.',
    approach:
      'The savings model runs in the browser, so answers never leave the device. Around it sit a vendor recommendation path, a chatbot for the join-or-not questions and personalised alerts, with the UI built to WCAG AA. Server pieces run on FastAPI (wrapped with Mangum for Lambda) only where they are needed, backed by PostgreSQL with Alembic migrations. The stack is provisioned with Terraform — CloudFront over private S3, arm64 Lambda, ECR and SSM — and deployed through GitHub Actions OIDC with no long-lived AWS keys.',
    result:
      'A live advisory tool that computes savings on-device, recommends a vendor, answers follow-ups in the chatbot and can nudge a household with alerts, shipped across 100+ pull requests. There is no published conversion metric for it yet.',
    didNotWork:
      'Keeping the savings maths on-device rules out scoring every household input on the server; the chatbot and alerts work beside that constraint rather than replacing it.',
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
    problem:
      'Weather apps answer cloudy or sunny. Filmmakers and photographers need a different question: where in Melbourne will the light stay steady as clouds drift across the sun? A citywide icon hides the streets that will flicker and the ones that will hold.',
    approach:
      'For each grid point: mean cloud cover, its standard deviation, and sun/shade transitions with hysteresis at 30% / 70%. Variability is 0.6·norm(stdev) + 0.4·norm(transitions); stability is 100 × (1 − variability). Shoot ranking adds brightness from cloud cover and shortwave radiation. The map is deck.gl on MapLibre, and the UI only calls its own /api/forecast contract — today it wraps Open-Meteo, tomorrow it can wrap an in-house model without touching the front end. The same handler runs as a Cloudflare Pages Function and as Vite middleware locally.',
    result:
      'A contour stability map over Greater Melbourne, a time-window slider that re-scores 1-, 3- and 6-hour windows live, and best / average / worst shoot cards. The product metric is the live windowing and ranked spots; there is no published accuracy against a holdout forecast.',
    didNotWork:
      'The first design painted raw cloud cover and answered the wrong question — intermittency is the signal, not mean sunniness. Night/astro mode is stubbed and an in-house forecasting model is still behind the provider seam.',
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
    problem:
      'Desk gestures should drive the machine without leaving the keyboard. But a webcam pointed at a desk also sees typing, head motion and people walking behind the chair; a detector that fires on any movement is unusable.',
    approach:
      'Each frame runs dense Farnebäck optical flow, summarised as direction, coherence and active area inside a horizontal gesture band. The keyboard strip and the face region are ignored. An always-on spotter opens a burst on motion and fires only when impulse, horizontal dominance and coherence all clear. Swipes are programmable — launch an app, run a script — and a clip harness records gestures and distractors (typing, raise/lower) and replays them for precision, recall, false-positive rate and latency.',
    result:
      'While armed, a mapped swipe fires its command. The evaluation harness exists; there is no published precision/recall number yet, so none is shown here.',
    didNotWork:
      'Using the full frame was the first failure: typing and head motion look like swipes. Ignoring the keyboard band and face region fixed it, and a preview mode exists because the detector is easy to fool without seeing its phase and last rejection.',
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
