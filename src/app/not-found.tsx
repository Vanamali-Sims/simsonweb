import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: '18vh', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <span className="label">404 · not in the training set</span>
      <h1 style={{ fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.9 }}>
        Nothing here<span style={{ color: 'var(--signal)' }}>.</span>
      </h1>
      <p style={{ color: 'var(--ink-muted)', maxWidth: '48ch' }}>
        This page doesn’t exist, or it moved in the v2 rebuild. Press ⌘K to jump anywhere.
      </p>
      <Link
        href="/"
        style={{ display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 20px', borderRadius: 999, background: 'var(--signal)', color: 'var(--signal-ink)', fontWeight: 600 }}
      >
        Back home →
      </Link>
    </section>
  );
}
