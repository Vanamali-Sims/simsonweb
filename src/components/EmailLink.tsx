'use client';

import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

function address() {
  const local = ['sims', 'vanamali'].join('');
  const host = ['gmail', 'com'].join('.');
  return `${local}@${host}`;
}

export function EmailAddress({ className }: { className?: string }) {
  const [text, setText] = useState('Email');

  useEffect(() => {
    setText(address());
  }, []);

  return <span className={className}>{text}</span>;
}

export default function EmailLink({ className, children }: Props) {
  const [href, setHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHref(`mailto:${address()}`);
  }, []);

  const open = () => {
    window.location.href = `mailto:${address()}`;
  };

  if (!href) {
    return (
      <button type="button" className={className} onClick={open}>
        {children}
      </button>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
