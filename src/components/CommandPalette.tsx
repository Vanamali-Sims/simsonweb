'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { CV_PATH, lenses, profile, social, type LensId } from '@/data/site';
import styles from './CommandPalette.module.css';

/** Fired by the navbar button (and anything else) to open the palette. */
export const OPEN_COMMAND_EVENT = 'command:open';
/** Fired when a lens is picked from the palette; LensProvider listens. */
export const SET_LENS_EVENT = 'lens:set';

type Command = {
  id: string;
  group: 'Go to' | 'Projects' | 'Hiring for' | 'Actions';
  label: string;
  hint?: string;
  run: () => void | Promise<void>;
};

/**
 * ⌘K / Ctrl+K command palette: jump to a section or project, switch the
 * recruiter lens, copy the email or grab the CV. On phones it doubles as
 * the menu. Every command also exists as a visible link elsewhere.
 */
export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (hash: string) => {
      if (pathname === '/') {
        document.querySelector<HTMLElement>(hash)?.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', `${window.location.search}${hash}`);
      } else {
        router.push(`/${hash}`);
      }
    },
    [pathname, router],
  );

  const setLens = useCallback(
    (id: LensId) => {
      if (pathname === '/') {
        window.dispatchEvent(new CustomEvent<LensId>(SET_LENS_EVENT, { detail: id }));
        document.querySelector('#main-content')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(id === 'all' ? '/' : `/?for=${id}`);
      }
    },
    [pathname, router],
  );

  const commands = useMemo<Command[]>(
    () => [
      { id: 'go-exp', group: 'Go to', label: 'Experience', run: () => go('#experience') },
      { id: 'go-proj', group: 'Go to', label: 'Projects', run: () => go('#projects') },
      { id: 'go-stack', group: 'Go to', label: 'Stack', run: () => go('#stack') },
      { id: 'go-about', group: 'Go to', label: 'About', run: () => go('#about') },
      { id: 'go-contact', group: 'Go to', label: 'Contact', run: () => go('#contact') },
      ...projects.map<Command>((p) => ({
        id: `p-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: p.metric ?? undefined,
        run: () => router.push(`/work/${p.slug}`),
      })),
      ...lenses.map<Command>((l) => ({
        id: `lens-${l.id}`,
        group: 'Hiring for',
        label: l.id === 'all' ? 'Show everything' : `${l.role}`,
        run: () => setLens(l.id),
      })),
      {
        id: 'copy',
        group: 'Actions',
        label: 'Copy email',
        hint: 'E',
        run: async () => {
          const address = profile.emailParts.join('@');
          try {
            await navigator.clipboard.writeText(address);
            setToast('Email copied');
          } catch {
            window.location.href = `mailto:${address}`;
          }
        },
      },
      {
        id: 'cv',
        group: 'Actions',
        label: 'Download CV',
        hint: 'D',
        run: () => {
          const a = document.createElement('a');
          a.href = CV_PATH;
          a.download = '';
          a.click();
        },
      },
      { id: 'gh', group: 'Actions', label: 'Open GitHub', hint: 'G', run: () => void window.open(social.github, '_blank', 'noopener') },
      { id: 'li', group: 'Actions', label: 'Open LinkedIn', hint: 'L', run: () => void window.open(social.linkedin, '_blank', 'noopener') },
    ],
    [go, router, setLens],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Global shortcut + open event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => setActive(0), [query]);

  // Keep the active row in view
  useEffect(() => {
    document.getElementById(`cmd-${filtered[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, filtered]);

  const run = (c: Command | undefined) => {
    if (!c) return;
    close();
    void c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // focus stays in the dialog; arrows move the selection
    }
  };

  return (
    <>
      {open ? (
        <div className={styles.backdrop} onMouseDown={close}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <label className={styles.inputRow}>
              <span className={styles.prompt} aria-hidden="true">
                ›
              </span>
              <span className="sr-only">Type a command</span>
              <input
                ref={input}
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="kbd" onClick={close} aria-label="Close command menu">
                esc
              </button>
            </label>

            <ul id="cmd-list" role="listbox" className={styles.list} aria-label="Commands">
              {filtered.length === 0 ? <li className={styles.empty}>No matches. Try “contact” or “cv”.</li> : null}
              {filtered.map((c, i) => {
                const showGroup = i === 0 || filtered[i - 1].group !== c.group;
                return (
                  <li key={c.id} role="presentation">
                    {showGroup ? (
                      <p className={styles.group} aria-hidden="true">
                        {c.group}
                      </p>
                    ) : null}
                    <div
                      id={`cmd-${c.id}`}
                      role="option"
                      aria-selected={i === active}
                      className={styles.item}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(c)}
                    >
                      <span>{c.label}</span>
                      {c.hint ? <span className={styles.hint}>{c.hint}</span> : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={styles.footer} aria-hidden="true">
              <span>↑↓ move · ↵ open</span>
              <span>~/vanamali</span>
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.toast} role="status" aria-live="polite" data-show={toast ? 'true' : 'false'}>
        {toast}
      </div>
    </>
  );
}
