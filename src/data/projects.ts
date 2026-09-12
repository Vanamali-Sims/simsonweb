export type ProjectCategory = 'product' | 'science';

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  repo: string;
  cat: ProjectCategory;
  image: string;
  imageAlt: string;
  /** Prominence metric. Null means no evidenced number — do not invent. */
  metric: string | null;
  problem: string;
  approach: string;
  result: string;
  didNotWork: string;
};

export const projects: Project[] = [
  {
    slug: 'fishing-grounds',
    title: 'Fishing Grounds Recsys',
    blurb:
      'Implicit ALS on AIS tracks: vessels × ocean cells, fishing hours as confidence — not ratings.',
    tags: ['Implicit ALS', 'DuckDB', 'FastAPI', 'React'],
    repo: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
    cat: 'science',
    image: '/projects/fishing-grounds.png',
    imageAlt:
      'Map of recommended fishing grounds generated from AIS vessel tracks',
    metric: '~20× a popularity baseline',
    problem:
      'Two years of Global Fishing Watch AIS (~190k vessels) is a recommender with the wrong nouns: vessel as user, 0.1° ocean cell as item, fishing hours as the signal. There are no negatives. Zero hours in a cell might mean out of range, wrong season, a protected area, or simply never tried — so treating absence as dislike would poison the model. Presence hours and fishing hours are logged separately: a cell with long presence and almost no fishing is a transit corridor, not a ground.',
    approach:
      'I treated hours as a confidence weight on a binary preference (Hu, Koren & Volinsky), filtered transit noise out of the interaction matrix, and trained implicit ALS (32 factors, α=10) against popularity and popularity-by-gear baselines. Evaluation was a temporal split — train through Q3 2024, test Q4 — plus a leak check; a random split would have inflated every number. The same factors feed three products: MPA-legal ground recommendation, IUU-like anomaly flags, and seasonal effort climatology. Serving is FastAPI with typed contracts and a React map. At ~750 MB compressed per year I used DuckDB over partitioned Parquet, not Spark.',
    result:
      'On 177 warm vessels with Q4 2024 new grounds in the Australian EEZ, ALS hit Precision@10 0.0814 against 0.0040 for popularity-by-gear — about 20× on the same protocol (resume: 0.081 vs 0.004). Recall@10 was 0.1149 vs 0.0043. Cold-start vessels (first seen in Q4) cannot be served by collaborative filtering alone; content fold-in reached P@10 0.0556 where gear-popularity was 0.000. Hybrid serving uses ALS for warm vessels and fold-in for unseen ones.',
    didNotWork:
      'Content fold-in (gear, flag, size → user factors) was weaker for warm vessels — P@10 0.0192 versus 0.0814 for ALS — so it is a fallback, not the main model. That was expected: co-occurrence beats metadata when history exists. Spark would have been cargo-culting at this scale; there is no Spark branch. The zips are never extracted — streaming ingest keeps peak memory bounded — because a 10 GB CSV dump on disk was the first thing that did not work.',
  },
  {
    slug: 'cloud-stability',
    title: 'Cloud Stability Map',
    blurb:
      'A stability score for where Melbourne light will hold still, with live 1/3/6-hour windows and ranked shoot spots.',
    tags: ['TypeScript', 'deck.gl', 'MapLibre', 'React'],
    repo: 'https://github.com/Vanamali-Sims/cloudyorNot',
    cat: 'product',
    image: '/projects/cloud-stability.png',
    imageAlt:
      'Melbourne cloud-stability map with contour bands over the city',
    metric: 'Live 1 / 3 / 6-hour re-score',
    problem:
      'Most weather apps answer cloudy-or-sunny. Filmmakers and photographers need a different question: where in Melbourne will the light stay steady as clouds drift across the sun. A citywide icon hides the streets that will flicker and the ones that will hold.',
    approach:
      'For each grid point I compute mean cloud cover, its standard deviation, and sun/shade transitions (hysteresis at 30% / 70%). Variability is 0.6·norm(stdev) + 0.4·norm(transitions); the stability score is 100 × (1 − variability). Shoot ranking also uses brightness from cloud cover and shortwave radiation. The map is deck.gl on MapLibre. The UI only ever calls our own GET /api/forecast contract — today that wraps Open-Meteo; tomorrow it can wrap a model of ours without touching the front end. The same handler runs as a Cloudflare Pages Function in production and as Vite middleware in local dev.',
    result:
      'A contour stability map over Greater Melbourne, a time-window slider that re-scores 1-, 3-, and 6-hour windows live, and best / average / worst shoot cards with a four-zone summary. That is the shipped MVP. I do not have a published accuracy number against a holdout forecast — the product metric is the live windowing and the ranked spots, not a model score.',
    didNotWork:
      'Night / astro mode is stubbed. An in-house forecasting model is still behind the provider seam, not in production. Himawari-8/9 motion overlay and short-term nowcasting are on the roadmap, not in the tree. The first design — painting raw cloud cover — answered the wrong question; intermittency is the signal, not mean sunniness.',
  },
  {
    slug: 'melbourne-footfall',
    title: 'Melbourne Footfall',
    blurb:
      'Hourly CBD pedestrian forecasts by precinct — how each street recovered after lockdowns.',
    tags: ['LightGBM', 'dbt-duckdb', 'Python', 'Tableau'],
    repo: 'https://github.com/Vanamali-Sims/howMelbMoves',
    cat: 'science',
    image: '/projects/melbourne-footfall.png',
    imageAlt:
      'Melbourne CBD pedestrian footfall forecast broken out by precinct',
    metric: 'Hourly precinct forecasts',
    problem:
      'Pedestrian sensors are one of the few high-frequency public signals of how Melbourne is used. After lockdowns, recovery was uneven by precinct and by hour. A single citywide average hides the streets that returned to weekday peaks and the ones that did not. The question: for each CBD precinct and hour, what footfall should we expect, and how does recent volume compare with a pre-lockdown baseline?',
    approach:
      'City of Melbourne open data joined to weather, calendar, and land use. Ingest writes immutable Parquet; dbt-duckdb owns joins and grains; Python fits models only after a seasonal-naive baseline, evaluated with MASE on a rolling-origin split. A hiring manager can rerun the pipeline; a non-technical stakeholder is the Tableau Public audience. Sources were verified against live APIs on 2026-09-06.',
    result:
      'The decision the output is meant to support is precinct-level: where street activation still makes sense, where evening versus lunchtime patterns have shifted, and whether a short-term dip is weather and calendar or an outlier. Published model scores are not in this checkout yet — I will not invent a MASE. What is evidenced is the protocol (baseline first, then LightGBM) and the grain (precinct × hour).',
    didNotWork:
      'The current repo is tooling and skeleton: no extracts, no warehouse tables, no unpublished figures. The hourly pedestrian table currently starts at 2024-09-06, not 2009 — so a long pre-lockdown baseline is thinner than the original plan. Treating any stub output as a result would be the failure mode this project is designed to avoid.',
  },
  {
    slug: 'motion-console',
    title: 'Motion Console',
    blurb:
      'Webcam swipe console: optical flow in a gesture band above the keyboard. Swipes are programmable — each gesture maps to a command.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    repo: 'https://github.com/Vanamali-Sims/mdither_console',
    cat: 'product',
    image: '/projects/motion-console.png',
    imageAlt: 'Motion Console interface — an armed webcam swipe launcher',
    metric: 'Programmable swipe actions',
    problem:
      'I wanted desk gestures to drive the machine without leaving the keyboard. A webcam pointed at a desk also sees typing, face motion, and people walking behind the chair. A detector that fires on any movement is unusable.',
    approach:
      'Each frame runs dense Farnebäck flow, summarized as global direction, coherence, and active area inside a horizontal gesture band (normalized rows 0.25–0.85). The bottom 15% and the face/head region above the band are ignored. An always-on spotter opens a burst on motion, then fires only when impulse, horizontal dominance, and coherence all clear. Swipes are programmable: a gesture maps to a command, so the same detector can launch an app, run a script, or trigger whatever I bind next. A clip harness records supported gestures and distractors (typing, raise/lower) and replays them for precision, recall, false-positive rate, and latency.',
    result:
      'While armed, a mapped swipe fires its command. The current shell is a small arming control; the work is the binding — left, right, and further gestures as I add them. I have an evaluation harness; I do not have a published precision/recall number, so I am not putting one on this page.',
    didNotWork:
      'Using the full frame as the detector was the first failure — typing and head motion look like swipes. Ignoring the keyboard band and the face region was the fix. Preview mode exists because the detector is easy to fool without seeing phase, L/R balance, and the last rejection.',
  },
  {
    slug: 'my-power-plant',
    title: 'MyPowerPlant',
    blurb:
      'Victorian VPP advisor: on-device savings, vendor recommendations, a chatbot, and personalised alerts. Built to WCAG AA.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Terraform'],
    repo: 'https://github.com/Vanamali-Sims/myPowerPlant',
    cat: 'product',
    image: '/projects/my-power-plant.png',
    imageAlt:
      'MyPowerPlant household virtual-power-plant advisor with savings, vendors, and alerts',
    metric: 'On-device savings, vendor recs',
    problem:
      'Victorian households deciding whether to join a Virtual Power Plant should see the savings maths, who to buy from, and when to act — without handing a retailer their meter data.',
    approach:
      'The savings model still runs in the browser. Around it I added a vendor recommendation path, a chatbot for the join-or-not questions, and personalised alerts. The UI is built to WCAG AA. Server pieces sit behind FastAPI (Mangum-wrapped) only where they are needed. Terraform provisions CloudFront over private S3, arm64 Lambda, ECR, and SSM. Deploys go through GitHub Actions OIDC — no long-lived AWS keys — with SHA-tagged rollback.',
    result:
      'An advisory tool that computes savings on-device, recommends a vendor, answers follow-ups in the chatbot, and can nudge a household with personalised alerts. Infra is provisioned as code. I do not have a published conversion metric for this tool.',
    didNotWork:
      'Keeping the savings maths on-device still rules out scoring every household input on the server. The chatbot and alerts sit beside that constraint rather than replacing it.',
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
