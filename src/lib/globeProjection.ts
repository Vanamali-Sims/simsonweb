export type Vec3 = { x: number; y: number; z: number };

export function projectPoint(
  x: number,
  y: number,
  z: number,
  ry: number,
  rx: number
): { x: number; y: number; z: number } {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return { x: x1, y: y2, z: z2 };
}

export function fibonacciPoint(i: number, n: number): Vec3 {
  const yy = 1 - ((i + 0.5) / n) * 2;
  const rr = Math.sqrt(1 - yy * yy);
  const th = i * 2.399963;
  return {
    x: Math.cos(th) * rr,
    y: yy * 0.92,
    z: Math.sin(th) * rr,
  };
}

export function clampPitch(rx: number): number {
  return Math.max(-1.1, Math.min(1.1, rx));
}

type GridCurve = { points: Vec3[] };

function meridianPoints(lon: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    pts.push({
      x: Math.cos(t) * Math.cos(lon),
      y: Math.sin(t),
      z: Math.cos(t) * Math.sin(lon),
    });
  }
  return pts;
}

function parallelPoints(lat: number): Vec3[] {
  const r = Math.cos(Math.asin(lat));
  const pts: Vec3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    pts.push({
      x: Math.cos(t) * r,
      y: lat,
      z: Math.sin(t) * r,
    });
  }
  return pts;
}

export function buildGridCurves(): GridCurve[] {
  const curves: GridCurve[] = [];
  for (let m = 0; m < 8; m++) {
    curves.push({ points: meridianPoints((m / 8) * Math.PI) });
  }
  const lats = [-0.66, -0.33, 0, 0.33, 0.66];
  for (const lat of lats) {
    curves.push({ points: parallelPoints(lat) });
  }
  return curves;
}

export function curveToPaths(
  points: Vec3[],
  ry: number,
  rx: number,
  k: number
): { front: string; back: string } {
  let front = '';
  let back = '';
  let mode: 'front' | 'back' | null = null;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const { x, y, z } = projectPoint(p.x, p.y, p.z, ry, rx);
    const sx = x * k;
    const sy = y * k;
    const frontSide = z >= 0;
    const side: 'front' | 'back' = frontSide ? 'front' : 'back';

    if (side !== mode) {
      if (side === 'front') {
        front += `${front ? ' ' : ''}M ${sx} ${sy}`;
      } else {
        back += `${back ? ' ' : ''}M ${sx} ${sy}`;
      }
      mode = side;
    } else {
      if (side === 'front') front += ` L ${sx} ${sy}`;
      else back += ` L ${sx} ${sy}`;
    }
  }
  return { front, back };
}

export function buildAllGridPaths(
  curves: GridCurve[],
  ry: number,
  rx: number,
  k: number
): { front: string; back: string } {
  let front = '';
  let back = '';
  for (const curve of curves) {
    const paths = curveToPaths(curve.points, ry, rx, k);
    if (paths.front) front += (front ? ' ' : '') + paths.front;
    if (paths.back) back += (back ? ' ' : '') + paths.back;
  }
  return { front, back };
}
