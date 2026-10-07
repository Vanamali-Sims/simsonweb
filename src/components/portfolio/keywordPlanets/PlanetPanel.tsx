'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  categoryColors,
  getSkillsWithUsage,
  getWork,
  planets,
  projectLabelAria,
  type PlanetDef,
} from '@content/keywordPlanets';
import {
  buildAllGridPaths,
  buildGridCurves,
  clampPitch,
  fibonacciPoint,
  projectPoint,
  type Vec3,
} from '@/lib/globeProjection';
import LabelHoverCard, { hoverCardElementId } from './LabelHoverCard';
import PlanetaryPopup, { type PopupTarget } from './PlanetaryPopup';
import styles from './KeywordPlanets.module.css';

const DESKTOP_GLOBE = 540;
const MOBILE_GLOBE = 330;
const SPIN = 1;
const CARD_WIDTH = 280;
const SHOW_DELAY = 120;
const HIDE_DELAY = 80;

type LabelMeta = {
  id: string;
  unitPoint: Vec3;
  color: string;
  baseSize: number;
  isSkill: boolean;
  name: string;
  metric?: string;
  timesUsed?: number;
  href?: string;
};

function useGlobeSize() {
  const [size, setSize] = useState(DESKTOP_GLOBE);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setSize(mq.matches ? DESKTOP_GLOBE : MOBILE_GLOBE);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return size;
}

function buildLabelMeta(planet: PlanetDef, globeSize: number): LabelMeta[] {
  const n = planet.itemIds.length;
  const skillsMap = new Map(getSkillsWithUsage().map((s) => [s.id, s]));
  const isSkills = planet.key === 'skills';
  const mobile = globeSize < 400;

  return planet.itemIds.map((id, i) => {
    const unitPoint = fibonacciPoint(i, n);
    if (isSkills) {
      const skill = skillsMap.get(id)!;
      const baseSize = 13 + 4 * Math.sqrt(skill.timesUsed);
      return {
        id,
        unitPoint,
        color: categoryColors[skill.category],
        baseSize,
        isSkill: true,
        name: skill.name,
        timesUsed: skill.timesUsed,
      };
    }
    const work = getWork(id)!;
    const baseSize = mobile ? 18 : 24;
    const href =
      planet.key === 'projects'
        ? work.live ?? work.github
        : undefined;
    return {
      id,
      unitPoint,
      color: planet.color,
      baseSize,
      isSkill: false,
      name: work.name,
      metric: work.metric,
      href,
    };
  });
}

export default function PlanetPanel() {
  const globeSize = useGlobeSize();
  const R = globeSize * 0.4;
  const RL = globeSize * 0.43;
  const k = R / (globeSize / 2);

  const [planetIndex, setPlanetIndex] = useState(0);
  const [popup, setPopup] = useState<PopupTarget | null>(null);
  const [interactionId, setInteractionId] = useState<string | null>(null);
  const [cardVisibleId, setCardVisibleId] = useState<string | null>(null);
  const [touchPinnedId, setTouchPinnedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [switchPhase, setSwitchPhase] = useState<'in' | 'out' | 'idle'>('idle');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  const planet = planets[planetIndex];
  const gridCurves = useMemo(() => buildGridCurves(), []);

  const ryRef = useRef(0.4);
  const rxRef = useRef(-0.32);
  const labelElsRef = useRef<Map<string, HTMLElement>>(new Map());
  const frontPathRef = useRef<SVGPathElement>(null);
  const backPathRef = useRef<SVGPathElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hoverCardWrapRef = useRef<HTMLDivElement>(null);
  const cardVisibleIdRef = useRef<string | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRy: 0,
    startRx: 0,
    moved: false,
  });
  const lastOpenLabelRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(0);
  const pauseSpinRef = useRef(false);
  const showTimerRef = useRef<number>(0);
  const hideTimerRef = useRef<number>(0);

  const labelMeta = useMemo(
    () => buildLabelMeta(planet, globeSize),
    [planet, globeSize]
  );

  cardVisibleIdRef.current = cardVisibleId;

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const setCoarse = () => setCoarsePointer(mq.matches);
    setCoarse();
    mq.addEventListener('change', setCoarse);
    return () => mq.removeEventListener('change', setCoarse);
  }, []);

  const clearCardTimers = () => {
    window.clearTimeout(showTimerRef.current);
    window.clearTimeout(hideTimerRef.current);
  };

  const dismissTouchCard = useCallback(() => {
    setTouchPinnedId(null);
    setInteractionId(null);
    setCardVisibleId(null);
    clearCardTimers();
  }, []);

  const scheduleCardFor = useCallback(
    (id: string | null) => {
      clearCardTimers();
      if (!id) {
        if (reducedMotion) {
          setCardVisibleId(null);
          return;
        }
        hideTimerRef.current = window.setTimeout(() => {
          setCardVisibleId(null);
        }, HIDE_DELAY);
        return;
      }
      if (reducedMotion) {
        setCardVisibleId(id);
        return;
      }
      showTimerRef.current = window.setTimeout(() => {
        setCardVisibleId(id);
      }, SHOW_DELAY);
    },
    [reducedMotion]
  );

  useEffect(() => {
    scheduleCardFor(interactionId);
    return () => clearCardTimers();
  }, [interactionId, scheduleCardFor]);

  const pauseSpin =
    isDragging ||
    interactionId !== null ||
    popup !== null ||
    switchPhase !== 'idle';

  useEffect(() => {
    pauseSpinRef.current = pauseSpin;
  }, [pauseSpin]);

  const positionHoverCard = useCallback(() => {
    const wrap = hoverCardWrapRef.current;
    const showId = cardVisibleIdRef.current;
    const stage = stageRef.current;
    const globe = globeRef.current;
    if (!wrap || !showId || !stage || !globe) {
      if (wrap) {
        wrap.classList.remove(styles.hoverCardWrapVisible);
      }
      return;
    }

    const labelEl = labelElsRef.current.get(showId);
    if (!labelEl) return;

    const stageW = stage.clientWidth;
    const cardW = Math.min(CARD_WIDTH, stageW - 16);
    wrap.style.width = `${cardW}px`;

    const labelLeft = parseFloat(labelEl.style.left);
    const labelTop = parseFloat(labelEl.style.top);
    const globeRect = globe.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const cx = globeRect.left - stageRect.left + labelLeft;
    const cy = globeRect.top - stageRect.top + labelTop;

    wrap.classList.add(styles.hoverCardWrapVisible);
    const ch = wrap.offsetHeight || 160;

    let left = cx + 14;
    if (left + cardW > stageW - 8) {
      left = cx - 14 - cardW;
    }
    left = Math.max(8, Math.min(left, stageW - cardW - 8));
    let top = cy - ch / 2;
    const stageH = stage.clientHeight;
    top = Math.max(8, Math.min(top, stageH - ch - 8));

    wrap.style.left = `${left}px`;
    wrap.style.top = `${top}px`;
  }, []);

  const updateFrame = useCallback(
    (ry: number, rx: number) => {
      const mobile = globeSize < 400;
      const paths = buildAllGridPaths(gridCurves, ry, rx, k);
      if (frontPathRef.current) frontPathRef.current.setAttribute('d', paths.front);
      if (backPathRef.current) backPathRef.current.setAttribute('d', paths.back);

      for (const meta of labelMeta) {
        const el = labelElsRef.current.get(meta.id);
        if (!el) continue;
        const { x, y, z } = projectPoint(
          meta.unitPoint.x,
          meta.unitPoint.y,
          meta.unitPoint.z,
          ry,
          rx
        );
        const depth = (z + 1) / 2;
        const sizeScale = mobile ? 0.82 : 1;
        const fontSize = meta.baseSize * (0.62 + 0.5 * depth) * sizeScale;
        const weight = z > 0.2 ? '700' : '500';
        let opacity: number;
        if (z < -0.15) opacity = 0.16 + 0.3 * depth;
        else opacity = 0.55 + 0.45 * depth;

        el.style.left = `${globeSize / 2 + x * RL}px`;
        el.style.top = `${globeSize / 2 + y * RL}px`;
        el.style.fontSize = `${fontSize}px`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.fontWeight = weight;
        el.style.pointerEvents = z < -0.2 ? 'none' : 'auto';
        el.classList.toggle(styles.labelBtnActive, z >= -0.2);

        const metricEl = el.querySelector('[data-metric]') as HTMLElement | null;
        if (metricEl) {
          metricEl.style.fontSize = `${Math.max(10, fontSize * 0.5)}px`;
        }
      }

      if (
        cardVisibleIdRef.current &&
        !popup &&
        switchPhase === 'idle' &&
        !isDragging
      ) {
        positionHoverCard();
      }
    },
    [
      globeSize,
      k,
      labelMeta,
      gridCurves,
      positionHoverCard,
      popup,
      switchPhase,
      isDragging,
    ]
  );

  useLayoutEffect(() => {
    updateFrame(ryRef.current, rxRef.current);
  }, [updateFrame, labelMeta, cardVisibleId]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = (now: number) => {
      const dt = Math.min(50, now - (lastFrameRef.current || now));
      lastFrameRef.current = now;

      if (
        !pauseSpinRef.current &&
        !document.hidden &&
        switchPhase === 'idle'
      ) {
        ryRef.current += 0.00022 * dt * SPIN;
      }
      updateFrame(ryRef.current, rxRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, updateFrame, switchPhase]);

  useEffect(() => {
    if (reducedMotion) {
      updateFrame(ryRef.current, rxRef.current);
    }
  }, [reducedMotion, updateFrame, pauseSpin, switchPhase]);

  const performLabelAction = (id: string, el: HTMLElement) => {
    lastOpenLabelRef.current = el;
    if (planet.key === 'skills') {
      setPopup({ type: 'skill', id });
      return;
    }
    if (planet.key === 'experience') {
      setPopup({ type: 'work', id });
      return;
    }
    const work = getWork(id);
    if (!work) return;
    if (work.live) {
      window.open(work.live, '_blank', 'noopener,noreferrer');
    } else if (work.github) {
      window.open(work.github, '_blank', 'noopener,noreferrer');
    } else {
      setPopup({ type: 'work', id });
    }
  };

  const isTouchLike = (e?: { nativeEvent: Event }) =>
    coarsePointer ||
    (e?.nativeEvent instanceof PointerEvent &&
      e.nativeEvent.pointerType === 'touch');

  const handleLabelActivate = (
    id: string,
    el: HTMLElement,
    e?: React.MouseEvent,
    hasHref?: boolean
  ) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      e?.preventDefault();
      return;
    }

    const useTouchFlow = isTouchLike(e);

    if (hasHref && !useTouchFlow) {
      return;
    }

    if (useTouchFlow) {
      e?.preventDefault();
      if (touchPinnedId !== id) {
        setTouchPinnedId(id);
        setInteractionId(id);
        return;
      }
      setTouchPinnedId(null);
      performLabelAction(id, el);
      dismissTouchCard();
      return;
    }

    performLabelAction(id, el);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (popup) return;
    const onLabel = (e.target as HTMLElement).closest('[data-globe-label]');
    if (!onLabel && coarsePointer) {
      dismissTouchCard();
    }

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRy: ryRef.current,
      startRx: rxRef.current,
      moved: false,
    };
    setIsDragging(true);
    dismissTouchCard();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.hypot(dx, dy) > 4) {
      dragRef.current.moved = true;
      dismissTouchCard();
    }
    ryRef.current = dragRef.current.startRy + dx * 0.008;
    rxRef.current = clampPitch(dragRef.current.startRx + dy * 0.006);
    updateFrame(ryRef.current, rxRef.current);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onGlobeKeyDown = (e: React.KeyboardEvent) => {
    const step = 0.2;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      ryRef.current -= step;
      updateFrame(ryRef.current, rxRef.current);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      ryRef.current += step;
      updateFrame(ryRef.current, rxRef.current);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      rxRef.current = clampPitch(rxRef.current - step);
      updateFrame(ryRef.current, rxRef.current);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      rxRef.current = clampPitch(rxRef.current + step);
      updateFrame(ryRef.current, rxRef.current);
    }
  };

  const switchPlanet = (next: number) => {
    if (next === planetIndex || switchPhase !== 'idle') return;
    setPopup(null);
    dismissTouchCard();

    if (reducedMotion) {
      setPlanetIndex(next);
      ryRef.current += 1.2;
      updateFrame(ryRef.current, rxRef.current);
      return;
    }

    setSwitchPhase('out');
    window.setTimeout(() => {
      setPlanetIndex(next);
      ryRef.current += 1.2;
      setSwitchPhase('in');
      window.setTimeout(() => setSwitchPhase('idle'), 260);
    }, 260);
  };

  const prevPlanet = () =>
    switchPlanet((planetIndex - 1 + planets.length) % planets.length);
  const nextPlanet = () => switchPlanet((planetIndex + 1) % planets.length);

  const closePopup = () => {
    setPopup(null);
    lastOpenLabelRef.current?.focus();
  };

  const sphereGradient = `radial-gradient(circle at 34% 28%, ${planet.sphereTint[0]} 0%, ${planet.sphereTint[1]} 48%, ${planet.sphereTint[2]} 100%)`;

  const globeClass = [
    styles.globeOuter,
    isDragging ? styles.globeOuterDragging : '',
    styles.globeAnimated,
    switchPhase === 'out' ? styles.globeSwitchOut : styles.globeSwitchIn,
  ]
    .filter(Boolean)
    .join(' ');

  const showHoverCard =
    cardVisibleId &&
    !popup &&
    switchPhase === 'idle' &&
    !isDragging;

  const renderLabel = (meta: LabelMeta) => {
    const work = meta.isSkill ? null : getWork(meta.id);
    const ariaLabel = meta.isSkill
      ? `${meta.name}, used ${meta.timesUsed} times. Open details`
      : work
        ? projectLabelAria(work)
        : `${meta.name}. Open details`;

    const inner = (
      <>
        {meta.name}
        {!meta.isSkill && meta.metric && (
          <span className={styles.labelMetric} data-metric>
            {meta.metric}
          </span>
        )}
      </>
    );

    const sharedProps = {
      className: `${styles.labelBtn} ${meta.href ? styles.labelLink : ''}`,
      style: {
        '--label-color': meta.color,
        color: meta.color,
        transform: 'translate(-50%, -50%)',
      } as React.CSSProperties,
      'data-globe-label': true,
      'aria-describedby':
        cardVisibleId === meta.id && showHoverCard
          ? hoverCardElementId()
          : undefined,
      onMouseEnter: () => {
        if (!coarsePointer) setInteractionId(meta.id);
      },
      onMouseLeave: () => {
        if (!coarsePointer) {
          setInteractionId((h) => (h === meta.id ? null : h));
        }
      },
      onFocus: () => setInteractionId(meta.id),
      onBlur: () => setInteractionId((h) => (h === meta.id ? null : h)),
      onPointerDown: (e: React.PointerEvent) => {
        if (coarsePointer || e.pointerType === 'touch') {
          e.stopPropagation();
        }
      },
      ref: (node: HTMLElement | null) => {
        if (node) labelElsRef.current.set(meta.id, node);
        else labelElsRef.current.delete(meta.id);
      },
    };

    if (meta.href) {
      return (
        <a
          key={meta.id}
          href={meta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          {...sharedProps}
          onClick={(e) =>
            handleLabelActivate(meta.id, e.currentTarget, e, true)
          }
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        key={meta.id}
        type="button"
        aria-label={ariaLabel}
        {...sharedProps}
        onClick={(e) => handleLabelActivate(meta.id, e.currentTarget, e, false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLabelActivate(meta.id, e.currentTarget);
          }
        }}
      >
        {inner}
      </button>
    );
  };

  return (
    <div
      className={styles.panel}
      style={
        {
          '--globe-size': `${globeSize}px`,
          '--sphere-r': `${R}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.panelHeader}>
        <span>
          <span
            className={styles.planetDot}
            style={{ background: planet.color }}
            aria-hidden
          />
          planet {planetIndex + 1} / 3
        </span>
        <span>{planet.caption}</span>
      </div>

      <div className={styles.stage} ref={stageRef}>
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          aria-label="Previous planet"
          onClick={prevPlanet}
        >
          &lt;
        </button>
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          aria-label="Next planet"
          onClick={nextPlanet}
        >
          &gt;
        </button>

        <div
          ref={globeRef}
          className={globeClass}
          tabIndex={0}
          role="application"
          aria-label={`${planet.name} globe. Drag to rotate. Use arrow keys when focused.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={onGlobeKeyDown}
        >
          <div className={styles.groundShadow} aria-hidden />
          <div
            className={styles.sphere}
            style={{ background: sphereGradient }}
            aria-hidden
          />
          <svg className={styles.gridSvg} viewBox="-1 -1 2 2" aria-hidden>
            <path
              ref={backPathRef}
              fill="none"
              stroke={planet.color}
              strokeWidth={0.004}
              strokeOpacity={0.18}
              strokeDasharray="0.012 0.012"
            />
            <path
              ref={frontPathRef}
              fill="none"
              stroke={planet.color}
              strokeWidth={0.005}
              strokeOpacity={0.45}
            />
          </svg>

          {labelMeta.map((meta) => renderLabel(meta))}
        </div>

        {showHoverCard && (
          <div
            ref={hoverCardWrapRef}
            className={`${styles.hoverCardWrap} ${styles.hoverCardWrapVisible} ${
              coarsePointer ? styles.hoverCardWrapTouch : ''
            }`}
          >
            <LabelHoverCard
              planet={planet}
              itemId={cardVisibleId}
              touchMode={coarsePointer}
              onTouchAction={() => {
                const el = labelElsRef.current.get(cardVisibleId);
                if (el) performLabelAction(cardVisibleId, el);
                dismissTouchCard();
              }}
            />
          </div>
        )}

        {popup && (
          <PlanetaryPopup
            target={popup}
            onClose={closePopup}
            onNavigate={setPopup}
            reducedMotion={reducedMotion}
          />
        )}
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Planets">
        {planets.map((p, i) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            className={`${styles.tab} ${i === planetIndex ? styles.tabActive : ''}`}
            aria-pressed={i === planetIndex}
            aria-selected={i === planetIndex}
            onClick={() => switchPlanet(i)}
          >
            <span
              className={styles.tabDot}
              style={{ background: p.color }}
              aria-hidden
            />
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
