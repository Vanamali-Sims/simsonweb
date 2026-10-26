'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorTrail.module.css';

const COUNT = 12;

export default function CursorTrail() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-dot]'));
    const pts = dots.map(() => ({ x: 0, y: 0 }));

    let mx = 0;
    let my = 0;
    let seen = false;
    let raf = 0;
    let running = false;
    let armed = false;

    const place = () => {
      let x = mx;
      let y = my;
      let moving = false;

      for (let i = 0; i < dots.length; i++) {
        const p = pts[i];
        const ease = Math.max(0.16, 0.48 - i * 0.025);
        const dx = x - p.x;
        const dy = y - p.y;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) moving = true;
        p.x += dx * ease;
        p.y += dy * ease;
        dots[i].style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${i * 16}deg)`;
        x = p.x;
        y = p.y;
      }

      return moving;
    };

    const tick = () => {
      if (place()) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      if (!seen) {
        seen = true;
        for (const p of pts) {
          p.x = mx;
          p.y = my;
        }
        place();
        root.dataset.active = 'true';
      }
      start();
    };

    const onLeave = () => {
      seen = false;
      root.dataset.active = 'false';
    };

    const onVisibility = () => {
      if (!document.hidden) return;
      cancelAnimationFrame(raf);
      running = false;
    };

    const disarm = () => {
      if (!armed) return;
      armed = false;
      seen = false;
      running = false;
      root.dataset.active = 'false';
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };

    const arm = () => {
      if (!fine.matches || reduce.matches) {
        disarm();
        return;
      }
      if (armed) return;
      armed = true;
      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
    };

    arm();
    fine.addEventListener('change', arm);
    reduce.addEventListener('change', arm);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disarm();
      document.removeEventListener('visibilitychange', onVisibility);
      fine.removeEventListener('change', arm);
      reduce.removeEventListener('change', arm);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.trail} aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        <span
          key={i}
          data-dot=""
          className={styles.dot}
          style={{ '--i': i } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
