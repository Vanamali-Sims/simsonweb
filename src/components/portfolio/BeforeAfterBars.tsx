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

const colorClass = {
  data: 'bg-data',
  frontend: 'bg-frontend',
} as const;

function defaultFormat(n: number) {
  if (n < 1 && n > 0) return n.toString();
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`.replace('.0k', 'k');
  return n % 1 === 0 ? String(n) : n.toFixed(1);
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

  const beforePct = (beforeValue / max) * 100;
  const afterPct = (afterValue / max) * 100;

  return (
    <div ref={ref} className={`space-y-3 ${className}`} role="img" aria-label={`${beforeLabel} ${formatValue(beforeValue)} versus ${afterLabel} ${formatValue(afterValue)}`}>
      <div className="space-y-1">
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>{beforeLabel}</span>
          <span>{formatValue(beforeValue)}</span>
        </div>
        <div className="h-2 w-full bg-grid">
          <div
            className="h-full bg-muted/40 transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{ width: animate ? `${beforePct}%` : '0%' }}
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>{afterLabel}</span>
          <span>{formatValue(afterValue)}</span>
        </div>
        <div className="h-2 w-full bg-grid">
          <div
            className={`h-full ${colorClass[color]} transition-[width] duration-700 ease-out motion-reduce:transition-none`}
            style={{ width: animate ? `${afterPct}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
