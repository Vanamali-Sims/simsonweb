'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { lenses, type Lens, type LensId } from '@/data/site';
import { SET_LENS_EVENT } from './CommandPalette';

type LensState = { lens: Lens; setLens: (id: LensId) => void };

const LensCtx = createContext<LensState | null>(null);

const isLensId = (v: string | null): v is LensId =>
  !!v && lenses.some((l) => l.id === v);

/**
 * Which recruiter lens is active. Kept in the URL (?for=data-eng) so a
 * tailored link can be shared, e.g. in a job application.
 */
export function LensProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<LensId>('all');

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('for');
    if (isLensId(fromUrl)) setId(fromUrl);
  }, []);

  const setLens = useCallback((next: LensId) => {
    setId(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('for');
    else url.searchParams.set('for', next);
    window.history.replaceState(null, '', url);
  }, []);

  // The command palette can switch lenses too.
  useEffect(() => {
    const onSet = (e: Event) => {
      const next = (e as CustomEvent<string>).detail;
      if (isLensId(next)) setLens(next);
    };
    window.addEventListener(SET_LENS_EVENT, onSet);
    return () => window.removeEventListener(SET_LENS_EVENT, onSet);
  }, [setLens]);

  const value = useMemo(
    () => ({ lens: lenses.find((l) => l.id === id) ?? lenses[0], setLens }),
    [id, setLens],
  );

  return <LensCtx.Provider value={value}>{children}</LensCtx.Provider>;
}

export function useLens() {
  const ctx = useContext(LensCtx);
  if (!ctx) throw new Error('useLens must be used inside <LensProvider>');
  return ctx;
}
