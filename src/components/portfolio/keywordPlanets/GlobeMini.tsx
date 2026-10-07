'use client';

import { useEffect, useMemo, useRef } from 'react';
import { planets, type PlanetDef } from '@content/keywordPlanets';
import { buildAllGridPaths, buildGridCurves } from '@/lib/globeProjection';
import styles from './KeywordPlanets.module.css';

const SPIN = 1;

type Props = {
  size: number;
  planet: PlanetDef;
  animateIn: boolean;
  reducedMotion: boolean;
  paused: boolean;
};

export default function GlobeMini({
  size,
  planet,
  animateIn,
  reducedMotion,
  paused,
}: Props) {
  const R = size * 0.4;
  const k = R / (size / 2);
  const gridCurves = useMemo(() => buildGridCurves(), []);
  const ryRef = useRef(0.4);
  const rxRef = useRef(-0.32);
  const frontPathRef = useRef<SVGPathElement>(null);
  const backPathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const pauseRef = useRef(paused);
  pauseRef.current = paused;

  const sphereGradient = `radial-gradient(circle at 34% 28%, ${planet.sphereTint[0]} 0%, ${planet.sphereTint[1]} 48%, ${planet.sphereTint[2]} 100%)`;

  useEffect(() => {
    if (reducedMotion) return;

    const tick = (now: number) => {
      const dt = Math.min(50, now - (lastFrameRef.current || now));
      lastFrameRef.current = now;
      if (!pauseRef.current && !document.hidden && animateIn) {
        ryRef.current += 0.00022 * dt * SPIN;
      }
      const paths = buildAllGridPaths(
        gridCurves,
        ryRef.current,
        rxRef.current,
        k
      );
      if (frontPathRef.current) frontPathRef.current.setAttribute('d', paths.front);
      if (backPathRef.current) backPathRef.current.setAttribute('d', paths.back);
      rafRef.current = requestAnimationFrame(tick);
    };
    const paths = buildAllGridPaths(gridCurves, ryRef.current, rxRef.current, k);
    if (frontPathRef.current) frontPathRef.current.setAttribute('d', paths.front);
    if (backPathRef.current) backPathRef.current.setAttribute('d', paths.back);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gridCurves, k, reducedMotion, animateIn]);

  useEffect(() => {
    if (!reducedMotion) return;
    const paths = buildAllGridPaths(gridCurves, ryRef.current, rxRef.current, k);
    if (frontPathRef.current) frontPathRef.current.setAttribute('d', paths.front);
    if (backPathRef.current) backPathRef.current.setAttribute('d', paths.back);
  }, [gridCurves, k, reducedMotion, planet]);

  const globeClass = [
    styles.globeOuter,
    styles.globeAnimated,
    animateIn ? styles.globeSwitchIn : styles.globeSwitchOut,
  ].join(' ');

  return (
    <div
      className={globeClass}
      style={
        {
          '--globe-size': `${size}px`,
          '--sphere-r': `${R}px`,
          cursor: 'pointer',
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className={styles.groundShadow} />
      <div className={styles.sphere} style={{ background: sphereGradient }} />
      <svg className={styles.gridSvg} viewBox="-1 -1 2 2">
        <path
          ref={backPathRef}
          fill="none"
          stroke={planet.color}
          strokeWidth={0.004}
          strokeOpacity={0.18}
          strokeDasharray="0.012 0.012"
          style={{ transition: 'stroke 400ms ease' }}
        />
        <path
          ref={frontPathRef}
          fill="none"
          stroke={planet.color}
          strokeWidth={0.005}
          strokeOpacity={0.45}
          style={{ transition: 'stroke 400ms ease' }}
        />
      </svg>
    </div>
  );
}
