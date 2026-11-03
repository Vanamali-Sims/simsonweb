'use client';

import Image from 'next/image';
import { useRef, useState, type PointerEvent } from 'react';
import styles from './Sections.module.css';

/**
 * The About portrait that sidesteps the cursor: approach it from one side
 * and it hops to the other, as far as the viewport allows. Mouse only and
 * off under reduced motion, so touch users just see the photo.
 */
export default function DodgingPortrait() {
  const sideRef = useRef(0);
  const [shift, setShift] = useState(0);

  const flee = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const mid = rect.width / 2;
    const margin = rect.width * 0.14;
    const side = x < mid ? 1 : -1;

    if (Math.abs(x - mid) < margin && sideRef.current !== 0) return;
    if (side === sideRef.current) return;
    sideRef.current = side;

    const want = rect.width * 0.86;
    const roomRight = window.innerWidth - rect.right - 16;
    const roomLeft = rect.left - 16;
    let dir = side;
    if ((dir === 1 ? roomRight : roomLeft) < want * 0.45) dir *= -1;
    const room = dir === 1 ? roomRight : roomLeft;
    setShift(dir * Math.max(72, Math.min(want, room)));
  };

  const reset = () => {
    sideRef.current = 0;
    setShift(0);
  };

  return (
    <div className={styles.photoDodge} onPointerEnter={flee} onPointerMove={flee} onPointerLeave={reset}>
      <div className={styles.photoSlot} style={{ transform: `translateX(${shift}px)` }}>
        <Image
          src="/portrait.jpg"
          alt="Vanamali Sims"
          width={400}
          height={400}
          sizes="(max-width: 760px) 100vw, 40vw"
          className={styles.photo}
        />
      </div>
    </div>
  );
}
