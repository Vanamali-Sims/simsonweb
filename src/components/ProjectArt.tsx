import type { ReactNode } from 'react';
import styles from './ProjectArt.module.css';

/**
 * Hand-drawn (well, code-drawn) cover art for each project, in the Signal
 * palette. Pure SVG rendered on the server: crisp at any size, follows the
 * light/dark theme through CSS variables, and ships no image bytes or JS.
 *
 * Randomness is seeded so every render is identical.
 */

const W = 640;
const H = 400;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function Frame({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={styles.art}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className={styles.dot} />
        </pattern>
      </defs>
      <rect width={W} height={H} className={styles.bg} />
      <rect width={W} height={H} fill={`url(#dots-${id})`} />
      {children}
    </svg>
  );
}

/* ---------- Tab Debt: tabs on the left, the agent's plan on the right ---------- */

function TabDebtArt() {
  const tabs = [
    { w: 150, state: 'done' },
    { w: 120, state: 'keep' },
    { w: 170, state: 'save' },
    { w: 110, state: 'done' },
    { w: 160, state: 'keep' },
    { w: 130, state: 'done' },
    { w: 140, state: 'task' },
  ];
  return (
    <Frame id="tab-debt">
      {tabs.map((t, i) => {
        const y = 48 + i * 44;
        const faded = t.state === 'done';
        return (
          <g key={i} opacity={faded ? 0.38 : 1}>
            <rect x="40" y={y} width="260" height="32" rx="8" className={t.state === 'save' ? styles.softFill : styles.surface} />
            <rect x="40" y={y} width="260" height="32" rx="8" className={t.state === 'save' ? styles.sigStroke : styles.lineStroke} fill="none" />
            <rect x="52" y={y + 10} width="12" height="12" rx="3" className={t.state === 'save' ? styles.sigFill : styles.mutedFill} />
            <rect x="74" y={y + 13} width={t.w} height="6" rx="3" className={styles.mutedFill} />
            {faded ? <line x1="74" y1={y + 16} x2={74 + t.w} y2={y + 16} className={styles.inkStroke} strokeWidth="2" /> : null}
          </g>
        );
      })}
      {/* side panel */}
      <rect x="340" y="40" width="260" height="320" rx="16" className={styles.surface} />
      <rect x="340" y="40" width="260" height="320" rx="16" className={styles.lineStrongStroke} fill="none" />
      <text x="364" y="76" className={styles.mono}>REVIEW · 7 TABS</text>
      {[
        { label: 'close 3 finished', on: true },
        { label: 'save 1 to read', on: true },
        { label: 'turn 1 into a task', on: true },
        { label: 'keep 2 open', on: false },
      ].map((row, i) => {
        const y = 108 + i * 48;
        return (
          <g key={row.label}>
            <rect x="364" y={y} width="18" height="18" rx="5" className={row.on ? styles.sigFill : styles.lineStrongStroke} fill={row.on ? undefined : 'none'} />
            {row.on ? <path d={`M${368} ${y + 9.5} l4 4 l7 -8`} className={styles.checkStroke} fill="none" /> : null}
            <text x="396" y={y + 14} className={styles.monoInk}>{row.label}</text>
          </g>
        );
      })}
      <rect x="364" y="300" width="212" height="40" rx="20" className={styles.sigFill} />
      <text x="470" y="325" textAnchor="middle" className={styles.monoOnSig}>Approve plan</text>
    </Frame>
  );
}

/* ---------- unattended: a year of incidents, then zero ---------- */

function UnattendedArt() {
  const bars = [3915, 244, 141, 19, 12, 4];
  const max = Math.log10(4000);
  return (
    <Frame id="unattended">
      <text x="40" y="60" className={styles.mono}>V0 · INCIDENTS / SIMULATED YEAR</text>
      <line x1="40" y1="300" x2="330" y2="300" className={styles.lineStrongStroke} />
      {bars.map((v, i) => {
        const h = (Math.log10(v + 1) / max) * 200;
        const x = 48 + i * 46;
        return (
          <g key={i}>
            <rect x={x} y={300 - h} width="30" height={h} rx="4" className={styles.mutedFill} opacity={0.35 + 0.1 * (6 - i)} />
            <text x={x + 15} y="322" textAnchor="middle" className={styles.monoSmall}>{v.toLocaleString('en-AU')}</text>
          </g>
        );
      })}
      <path d="M352 200 h44 m-12 -12 l12 12 l-12 12" className={styles.sigStroke} fill="none" strokeWidth="2" />
      <text x="500" y="230" textAnchor="middle" className={styles.bigSig}>0</text>
      <text x="500" y="262" textAnchor="middle" className={styles.mono}>AFTER FIXES · 20 SEEDS</text>
      {/* hands-off meter */}
      <text x="420" y="310" className={styles.monoSmall}>hands-off</text>
      <rect x="420" y="320" width="180" height="8" rx="4" className={styles.surface} />
      <rect x="420" y="320" width={r1(180 * 0.874)} height="8" rx="4" className={styles.sigFill} />
      <rect x="420" y="320" width={r1(180 * 0.383)} height="8" rx="4" className={styles.inkFill} opacity="0.5" />
      <text x="600" y="346" textAnchor="end" className={styles.monoSig}>38% → 87%</text>
    </Frame>
  );
}

/* ---------- Fishing Grounds: ocean cells, a track, the top-10 picks ---------- */

function FishingArt() {
  const rand = rng(7);
  // 32px cells keep the SVG to a few hundred nodes; it is inlined in the HTML.
  const cell = 32;
  const cols = W / cell;
  const rows = H / cell;
  const blobs = [
    { x: 200, y: 140, s: 90 },
    { x: 430, y: 110, s: 70 },
    { x: 520, y: 260, s: 80 },
    { x: 300, y: 300, s: 60 },
  ];
  const coast = (x: number) => 330 + 40 * Math.sin(x / 90) + 20 * Math.sin(x / 31);
  const cells: ReactNode[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * cell + cell / 2;
      const y = r * cell + cell / 2;
      if (y > coast(x) - 6 && x < 260) continue; // land
      let v = 0;
      for (const b of blobs) v += Math.exp(-((x - b.x) ** 2 + (y - b.y) ** 2) / (2 * b.s * b.s));
      v = v * 0.9 + rand() * 0.12;
      if (v < 0.18) continue;
      cells.push(
        <rect key={`${c}-${r}`} x={c * cell + 5} y={r * cell + 5} width={cell - 10} height={cell - 10} rx="5" className={styles.inkFill} opacity={r1(Math.min(0.42, v * 0.38))} />,
      );
    }
  }
  const picks = [
    [6, 4], [6, 5], [13, 3], [14, 3], [16, 8], [16, 7], [9, 9], [7, 4], [17, 8], [13, 4],
  ];
  const landPath = `M0 ${H} L0 ${r1(coast(0))} ${Array.from({ length: 14 }, (_, i) => `L${i * 20} ${r1(coast(i * 20))}`).join(' ')} L260 ${H} Z`;
  return (
    <Frame id="fishing">
      {cells}
      <path d={landPath} className={styles.surface} />
      <path d="M40 60 C 120 90, 160 70, 200 140 S 300 120, 430 110 S 560 200, 520 260" className={styles.inkStroke} fill="none" strokeDasharray="4 6" opacity="0.7" />
      {picks.map(([c, r], i) => (
        <rect key={`f${i}`} x={c * cell + 3} y={r * cell + 3} width={cell - 6} height={cell - 6} rx="7" className={styles.softFill} />
      ))}
      {picks.map(([c, r], i) => (
        <rect key={i} x={c * cell + 3} y={r * cell + 3} width={cell - 6} height={cell - 6} rx="7" className={styles.sigStroke} fill="none" strokeWidth="2" />
      ))}
      <rect x="430" y="330" width="170" height="40" rx="20" className={styles.surface} />
      <rect x="430" y="330" width="170" height="40" rx="20" className={styles.sigStroke} fill="none" />
      <text x="515" y="355" textAnchor="middle" className={styles.monoSig}>P@10 0.081 · 20×</text>
    </Frame>
  );
}

/* ---------- Melbourne Footfall: Hoddle grid + actual vs forecast ---------- */

function FootfallArt() {
  const rand = rng(3);
  const hours = 72;
  const x0 = 40;
  const x1 = 600;
  const base = 330;
  const curve = (h: number) => {
    const t = h % 24;
    const am = Math.exp(-((t - 8.5) ** 2) / 3);
    const lunch = 0.7 * Math.exp(-((t - 12.8) ** 2) / 2.5);
    const pm = 0.9 * Math.exp(-((t - 17.4) ** 2) / 3);
    return 0.06 + am + lunch + pm;
  };
  const pt = (h: number, v: number) => `${r1(x0 + (h / (hours - 1)) * (x1 - x0))} ${r1(base - v * 120)}`;
  const actual: number[] = [];
  const forecast: number[] = [];
  const naive: number[] = [];
  for (let h = 0; h < hours; h++) {
    const v = curve(h) * (h >= 48 ? 0.82 : 1);
    actual.push(v * (0.9 + rand() * 0.2));
    forecast.push(v * (0.95 + rand() * 0.08));
    naive.push(curve(h) * (h >= 48 ? 1 : 0.97));
  }
  const line = (arr: number[]) => `M${arr.map((v, h) => pt(h, v)).join(' L')}`;
  // Hoddle grid, rotated like the real CBD
  const streets: ReactNode[] = [];
  for (let i = 0; i < 6; i++) streets.push(<line key={`h${i}`} x1="300" y1={40 + i * 18} x2="600" y2={40 + i * 18} className={styles.lineStrongStroke} />);
  for (let i = 0; i < 11; i++) streets.push(<line key={`v${i}`} x1={300 + i * 30} y1="40" x2={300 + i * 30} y2="130" className={styles.lineStrongStroke} />);
  return (
    <Frame id="footfall">
      <g transform="rotate(-20 450 85)" opacity="0.8">
        {streets}
        <rect x="390" y="58" width="60" height="36" className={styles.softFill} />
        <rect x="390" y="58" width="60" height="36" className={styles.sigStroke} fill="none" />
      </g>
      <text x="40" y="60" className={styles.mono}>PRECINCT × HOUR</text>
      <line x1={x0} y1={base} x2={x1} y2={base} className={styles.lineStrongStroke} />
      {[0, 24, 48].map((h) => (
        <line key={h} x1={pt(h, 0).split(' ')[0]} y1="170" x2={pt(h, 0).split(' ')[0]} y2={base} className={styles.lineStroke} strokeDasharray="2 4" />
      ))}
      <path d={line(naive)} className={styles.mutedStroke} fill="none" strokeDasharray="5 5" />
      <path d={line(actual)} className={styles.inkStroke} fill="none" strokeWidth="1.5" opacity="0.7" />
      <path d={line(forecast)} className={styles.sigStroke} fill="none" strokeWidth="2.5" />
      <text x="40" y="364" className={styles.monoSmall}>— actual</text>
      <text x="130" y="364" className={styles.monoSig}>— LightGBM</text>
      <text x="240" y="364" className={styles.monoSmall}>- - same hour yesterday</text>
      <text x="600" y="364" textAnchor="end" className={styles.monoSig}>MASE 0.87 vs 0.98</text>
    </Frame>
  );
}

/* ---------- MyPowerPlant: house, panels, battery, flows ---------- */

function PowerPlantArt() {
  return (
    <Frame id="power">
      {/* house */}
      <path d="M90 230 L190 150 L290 230 Z" className={styles.surface} />
      <path d="M90 230 L190 150 L290 230" className={styles.lineStrongStroke} fill="none" strokeWidth="2" />
      <rect x="110" y="230" width="160" height="110" className={styles.surface} />
      <rect x="110" y="230" width="160" height="110" className={styles.lineStrongStroke} fill="none" strokeWidth="2" />
      <rect x="170" y="280" width="40" height="60" rx="4" className={styles.lineStrongStroke} fill="none" />
      {/* panels on roof */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${142 + i * 30} ${r1(208 - i * 24 * 0.8)} l26 -20 l10 8 l-26 20 Z`} className={styles.sigFill} opacity="0.9" />
      ))}
      {/* sun */}
      <circle cx="320" cy="80" r="22" className={styles.sigStroke} fill="none" strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={r1(320 + Math.cos(a) * 30)} y1={r1(80 + Math.sin(a) * 30)} x2={r1(320 + Math.cos(a) * 40)} y2={r1(80 + Math.sin(a) * 40)} className={styles.sigStroke} strokeWidth="2" />;
      })}
      {/* battery */}
      <rect x="350" y="230" width="70" height="110" rx="10" className={styles.surface} />
      <rect x="350" y="230" width="70" height="110" rx="10" className={styles.lineStrongStroke} fill="none" strokeWidth="2" />
      <rect x="372" y="220" width="26" height="10" rx="3" className={styles.lineStrongStroke} fill="none" strokeWidth="2" />
      <rect x="360" y="270" width="50" height="60" rx="5" className={styles.sigFill} />
      {/* grid pylon */}
      <path d="M540 340 L560 170 L580 340 M548 270 h24 M552 230 h16 M530 200 h60" className={styles.lineStrongStroke} fill="none" strokeWidth="2" />
      {/* flows */}
      <path d="M270 300 H350" className={styles.sigStroke} strokeDasharray="6 6" strokeWidth="2" />
      <path d="M420 290 C 470 290, 500 220, 540 210" className={styles.sigStroke} fill="none" strokeDasharray="6 6" strokeWidth="2" />
      <rect x="430" y="80" width="170" height="64" rx="12" className={styles.surface} />
      <rect x="430" y="80" width="170" height="64" rx="12" className={styles.lineStroke} fill="none" />
      <text x="446" y="106" className={styles.monoSmall}>JOIN A VPP?</text>
      <text x="446" y="130" className={styles.monoSig}>savings · on-device</text>
    </Frame>
  );
}

/* ---------- Cloud Stability: contour bands and ranked spots ---------- */

function CloudArt() {
  const rand = rng(11);
  const phases = Array.from({ length: 4 }, () => rand() * Math.PI * 2);
  const ring = (cx: number, cy: number, rad: number, k: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const wob =
        1 + 0.12 * Math.sin(3 * a + phases[0] + k * 0.3) + 0.07 * Math.sin(5 * a + phases[1] - k * 0.2) + 0.05 * Math.sin(7 * a + phases[2]);
      pts.push(`${r1(cx + Math.cos(a) * rad * wob * 1.35)} ${r1(cy + Math.sin(a) * rad * wob)}`);
    }
    return `M${pts.join(' L')} Z`;
  };
  const levels = [210, 170, 132, 96, 62, 32];
  return (
    <Frame id="cloud">
      {levels.map((rad, k) => (
        <path
          key={rad}
          d={ring(300, 210, rad, k)}
          className={k === levels.length - 1 ? styles.softFill : styles.lineStrongStroke}
          fill={k === levels.length - 1 ? undefined : 'none'}
          opacity={k === levels.length - 1 ? 1 : 0.35 + k * 0.1}
        />
      ))}
      <path d={ring(300, 210, 32, 5)} className={styles.sigStroke} fill="none" strokeWidth="2" />
      {[
        { x: 300, y: 205, n: '1' },
        { x: 210, y: 150, n: '2' },
        { x: 420, y: 270, n: '3' },
      ].map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="13" className={p.n === '1' ? styles.sigFill : styles.surface} />
          <circle cx={p.x} cy={p.y} r="13" className={styles.sigStroke} fill="none" strokeWidth="2" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" className={p.n === '1' ? styles.monoOnSig : styles.monoSig}>{p.n}</text>
        </g>
      ))}
      {/* window slider */}
      <rect x="450" y="40" width="150" height="36" rx="18" className={styles.surface} />
      <rect x="450" y="40" width="150" height="36" rx="18" className={styles.lineStroke} fill="none" />
      {['1h', '3h', '6h'].map((t, i) => (
        <g key={t}>
          {i === 1 ? <rect x={454 + i * 48} y="44" width="46" height="28" rx="14" className={styles.sigFill} /> : null}
          <text x={477 + i * 48} y="62" textAnchor="middle" className={i === 1 ? styles.monoOnSig : styles.monoSmall}>{t}</text>
        </g>
      ))}
      <text x="40" y="364" className={styles.mono}>STABILITY = 100 × (1 − VARIABILITY)</text>
    </Frame>
  );
}

/* ---------- Motion Console: optical-flow field with a gesture band ---------- */

function MotionArt() {
  const rand = rng(5);
  const arrows: ReactNode[] = [];
  const bandTop = 94;
  const bandBottom = 266;
  for (let y = 44; y < 290; y += 34) {
    for (let x = 40; x < 610; x += 34) {
      const inBand = y > bandTop && y < bandBottom;
      const ang = inBand ? (rand() - 0.5) * 0.35 : rand() * Math.PI * 2;
      const len = inBand ? 14 + rand() * 6 : 4 + rand() * 5;
      const dx = Math.cos(ang) * len;
      const dy = Math.sin(ang) * len;
      const x2 = x + dx;
      const y2 = y + dy;
      const head = inBand
        ? ` M${r1(x2 - Math.cos(ang - 0.5) * 5)} ${r1(y2 - Math.sin(ang - 0.5) * 5)} L${r1(x2)} ${r1(y2)} L${r1(x2 - Math.cos(ang + 0.5) * 5)} ${r1(y2 - Math.sin(ang + 0.5) * 5)}`
        : '';
      arrows.push(
        <path key={`${x}-${y}`} d={`M${r1(x)} ${r1(y)} L${r1(x2)} ${r1(y2)}${head}`} className={inBand ? styles.sigStroke : styles.mutedStroke} fill="none" strokeWidth={inBand ? 2 : 1.2} opacity={inBand ? 0.9 : 0.5} />,
      );
    }
  }
  const keys: ReactNode[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 14; c++) {
      keys.push(<rect key={`${r}-${c}`} x={46 + c * 40 + r * 10} y={300 + r * 26} width="34" height="20" rx="4" className={styles.lineStroke} fill="none" />);
    }
  }
  return (
    <Frame id="motion">
      <rect x="20" y={bandTop} width="600" height={bandBottom - bandTop} rx="12" className={styles.softFill} opacity="0.6" />
      <rect x="20" y={bandTop} width="600" height={bandBottom - bandTop} rx="12" className={styles.sigStroke} fill="none" strokeDasharray="6 6" />
      {arrows}
      {keys}
      <text x="36" y={bandTop - 12} className={styles.monoSig}>GESTURE BAND · SWIPE → RUN COMMAND</text>
    </Frame>
  );
}

const ART: Record<string, () => JSX.Element> = {
  'tab-debt': TabDebtArt,
  unattended: UnattendedArt,
  'fishing-grounds': FishingArt,
  'melbourne-footfall': FootfallArt,
  'my-power-plant': PowerPlantArt,
  'cloud-stability': CloudArt,
  'motion-console': MotionArt,
};

export default function ProjectArt({ slug }: { slug: string }) {
  const Art = ART[slug];
  return Art ? <Art /> : <Frame id={slug}>{null}</Frame>;
}
