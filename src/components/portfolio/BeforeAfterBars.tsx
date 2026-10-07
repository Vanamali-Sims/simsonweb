'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: number;
  afterValue: number;
  color: 'data' | 'frontend';
  format?: 'default' | 'seconds' | 'decimal3';
  className?: string;
};

const afterFill = {
  data: 'var(--data)',
  frontend: 'var(--frontend)',
} as const;

const BEFORE_FILL = '#9a9a9a';
const BAR_HEIGHT = 10;
const MIN_BAR_PX = 3;

function defaultFormat(n: number) {
  if (n < 1 && n > 0) return n.toString();
  if (n >= 1000)
    return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`.replace('.0k', 'k');
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

function barWidth(animate: boolean, value: number, max: number) {
  if (!animate) return '0px';
  const pct = (value / max) * 100;
  return `max(${MIN_BAR_PX}px, ${pct}%)`;
}

export default function BeforeAfterBars({
  beforeLabel,
  afterLabel,
  beforeValue,
  afterValue,
  color,
  format = 'default',
  className = '',
}: Props) {
  const formatValue =
    format === 'seconds'
      ? (n: number) => `${n}s`
      : format === 'decimal3'
        ? (n: number) => n.toFixed(3)
        : defaultFormat;
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const max = Math.max(beforeValue, afterValue, 0.0001);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setAnimate(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`space-y-3 ${className}`}
      role="img"
      aria-label={`${beforeLabel} ${formatValue(beforeValue)} versus ${afterLabel} ${formatValue(afterValue)}`}
    >
      <div className="space-y-1.5">
        <div className="flex justify-between font-mono text-xs text-ink">
          <span>{beforeLabel}</span>
          <span>{formatValue(beforeValue)}</span>
        </div>
        <div className="w-full" style={{ height: BAR_HEIGHT }}>
          <div
            className="h-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{
              width: barWidth(animate, beforeValue, max),
              backgroundColor: BEFORE_FILL,
            }}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between font-mono text-xs text-ink">
          <span>{afterLabel}</span>
          <span>{formatValue(afterValue)}</span>
        </div>
        <div className="w-full" style={{ height: BAR_HEIGHT }}>
          <div
            className="h-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{
              width: barWidth(animate, afterValue, max),
              backgroundColor: afterFill[color],
            }}
          />
        </div>
      </div>
    </div>
  );
}
