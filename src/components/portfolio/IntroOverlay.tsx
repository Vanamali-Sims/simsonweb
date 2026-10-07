'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sai-portfolio-intro-seen';

export default function IntroOverlay() {
  const [phase, setPhase] = useState<'hidden' | 'show' | 'exit'>('hidden');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || localStorage.getItem(STORAGE_KEY)) return;

    setPhase('show');
    const exitTimer = window.setTimeout(() => setPhase('exit'), 900);
    const hideTimer = window.setTimeout(() => {
      setPhase('hidden');
      localStorage.setItem(STORAGE_KEY, '1');
    }, 1200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink text-paper transition-transform duration-300 ease-out motion-reduce:hidden ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden="true"
    >
      <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Sai welcomes you. Let&apos;s meet.
      </p>
    </div>
  );
}
