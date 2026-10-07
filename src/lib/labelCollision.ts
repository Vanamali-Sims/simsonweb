export type LabelBox = {
  id: string;
  z: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

function overlaps(a: LabelBox, b: LabelBox): boolean {
  const ax1 = a.left - a.width / 2;
  const ax2 = a.left + a.width / 2;
  const ay1 = a.top - a.height / 2;
  const ay2 = a.top + a.height / 2;
  const bx1 = b.left - b.width / 2;
  const bx2 = b.left + b.width / 2;
  const by1 = b.top - b.height / 2;
  const by2 = b.top + b.height / 2;
  return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
}

/** Fade the label with smaller z when two front-facing boxes overlap. */
export function suppressedLabelIds(boxes: LabelBox[]): Set<string> {
  const front = boxes.filter((b) => b.z > 0);
  const suppressed = new Set<string>();
  for (let i = 0; i < front.length; i++) {
    for (let j = i + 1; j < front.length; j++) {
      const a = front[i];
      const b = front[j];
      if (!overlaps(a, b)) continue;
      if (a.z < b.z) suppressed.add(a.id);
      else if (b.z < a.z) suppressed.add(b.id);
      else suppressed.add(a.id);
    }
  }
  return suppressed;
}
