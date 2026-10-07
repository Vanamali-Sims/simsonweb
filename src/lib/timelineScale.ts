export function ymToIndex(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

export function indexToYm(i: number): { y: number; m: number } {
  const y = Math.floor(i / 12);
  const m = (i % 12) + 1;
  return { y, m };
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export function formatQuarterLabel(ymIndex: number): string {
  const { y, m } = indexToYm(ymIndex);
  const mon = MONTHS[m - 1];
  return `${mon} ${String(y).slice(-2)}`;
}

export function todayYmIndex(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

export function todayLabel(): string {
  const now = new Date();
  return `TODAY · ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
}
