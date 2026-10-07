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

function parseYm(ym: string): { y: number; m: number } {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
}

/** Inclusive month count; end null means through current month. */
export function countMonthsInclusive(start: string, end: string | null): number {
  const s = parseYm(start);
  const e = end ? parseYm(end) : (() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() + 1 };
  })();
  return (e.y - s.y) * 12 + (e.m - s.m) + 1;
}

function formatMonthCount(months: number): string {
  if (months < 12) return `${months} mo`;
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${yrs} yr`;
  return `${yrs} yr ${rem} mo`;
}

export function formatYmLabel(ym: string): string {
  const { y, m } = parseYm(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatExperienceDurationLine(
  start: string,
  end: string | null
): string {
  const startLabel = formatYmLabel(start);
  const endLabel = end ? formatYmLabel(end) : 'now';
  const months = countMonthsInclusive(start, end);
  return `${startLabel} – ${endLabel} · ${formatMonthCount(months)}`;
}

export function roleTitleFromSub(sub: string): string {
  const parts = sub.split(' · ');
  return parts[0] ?? sub;
}
