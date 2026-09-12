'use client';

import { useEffect, useState } from 'react';
import styles from './ProjectImage.module.css';

type Props = {
  src: string;
  alt: string;
  /** Set when the image sits inside a control that already names the project. */
  decorative?: boolean;
};

export default function ProjectImage({ src, alt, decorative = false }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    probe.onerror = () => {
      if (!cancelled) setLoaded(false);
    };
    setLoaded(false);
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={styles.frame}>
      {loaded ? (
        <img
          src={src}
          alt={decorative ? '' : alt}
          className={styles.img}
        />
      ) : (
        <div
          className={styles.placeholder}
          aria-hidden={decorative || undefined}
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : alt}
        />
      )}
    </div>
  );
}
