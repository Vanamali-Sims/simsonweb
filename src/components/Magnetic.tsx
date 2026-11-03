'use client';

import { useRef } from 'react';

/**
 * Wraps one element and lets it drift up to `strength` px toward the
 * cursor. Mouse only, transform only, and skipped under reduced motion.
 */
export default function Magnetic({
  children,
  strength = 8,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2;
    const y = ((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ display: 'inline-flex', transition: 'transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
    >
      {children}
    </span>
  );
}
