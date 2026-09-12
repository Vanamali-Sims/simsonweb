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
  /** Prominence metric. Null means a TODO placeholder — do not invent numbers. */
  metric: string | null;
  problem: string;
  approach: string;
  result: string;
  didNotWork: string;
};

const TODO = 'TODO — I will write this.';

export const projects: Project[] = [
  {
    slug: 'fishing-grounds',
    title: 'Fishing Grounds Recsys',
    blurb:
      'Implicit ALS on AIS tracks: vessels × ocean cells, fishing hours as confidence — not ratings.',
    tags: ['Implicit ALS', 'Geospatial', 'FastAPI', 'React'],
    repo: 'https://github.com/Vanamali-Sims/fishing-grounds-recsys',
    cat: 'science',
    image: '/projects/fishing-grounds.png',
    imageAlt:
      'Map of recommended fishing grounds generated from AIS vessel tracks',
    metric: '~20× popularity baseline',
    problem: TODO,
    approach: TODO,
    result: TODO,
    didNotWork: TODO,
  },
  {
    slug: 'cloud-stability',
    title: 'Cloud Stability Map',
    blurb:
      'A stability score for where Melbourne light will hold still, with live 1/3/6-hour windows and ranked shoot spots.',
    tags: ['deck.gl', 'MapLibre', 'Open-Meteo', 'React'],
    repo: 'https://github.com/Vanamali-Sims/cloudyorNot',
    cat: 'product',
    image: '/projects/cloud-stability.png',
    imageAlt:
      'Melbourne cloud-stability map with contour bands over the city',
    metric: null,
    problem: TODO,
    approach: TODO,
    result: TODO,
    didNotWork: TODO,
  },
  {
    slug: 'melbourne-footfall',
    title: 'Melbourne Footfall',
    blurb:
      'Hourly CBD pedestrian forecasts by precinct — how each street recovered after lockdowns, not a citywide average.',
    tags: ['LightGBM', 'Time series', 'dbt', 'Tableau'],
    repo: 'https://github.com/Vanamali-Sims/howMelbMoves',
    cat: 'science',
    image: '/projects/melbourne-footfall.png',
    imageAlt:
      'Melbourne CBD pedestrian footfall forecast broken out by precinct',
    metric: null,
    problem: TODO,
    approach: TODO,
    result: TODO,
    didNotWork: TODO,
  },
  {
    slug: 'motion-console',
    title: 'Motion Console',
    blurb:
      'Webcam swipe launcher: optical flow watches a gesture band above the keyboard; a horizontal swipe opens an app.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    repo: 'https://github.com/Vanamali-Sims/mdither_console',
    cat: 'product',
    image: '/projects/motion-console.png',
    imageAlt: 'Motion Console interface — an armed webcam swipe launcher',
    metric: null,
    problem: TODO,
    approach: TODO,
    result: TODO,
    didNotWork: TODO,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
