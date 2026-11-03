'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/site';

const address = () => profile.emailParts.join('@');

/**
 * Copies the email address to the clipboard, falling back to mailto when
 * the Clipboard API is unavailable. The address is assembled on the client
 * so it never appears in the static HTML.
 */
export default function CopyEmail({
  className,
  showAddress = false,
}: {
  className?: string;
  showAddress?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState('Copy email');

  useEffect(() => {
    if (showAddress) setText(address());
  }, [showAddress]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(address());
      setCopied(true);
    } catch {
      window.location.href = `mailto:${address()}`;
    }
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      <span aria-live="polite">{copied ? 'Copied ✓' : text}</span>
      {copied ? null : <span aria-hidden="true">⧉</span>}
    </button>
  );
}

/** A plain mailto link, assembled on the client. */
export function MailtoLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState<string>('#contact');
  useEffect(() => setHref(`mailto:${address()}`), []);
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
