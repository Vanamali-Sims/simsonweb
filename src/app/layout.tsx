import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import CursorTrail from '@/components/CursorTrail';

// Display face for the name and section titles only, self-hosted (latin,
// variable weight, ~40KB) so the build never depends on Google Fonts.
// Geist sans + mono ship with the `geist` package.
const bricolage = localFont({
  src: './fonts/BricolageGrotesque-wght.woff2',
  weight: '200 800',
  variable: '--font-bricolage',
  display: 'swap',
});

// Set NEXT_PUBLIC_SITE_URL to the production domain; Vercel previews fall
// back to their own deployment URL.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');
const DESCRIPTION =
  'Vanamali Sims — data and AI engineer in Melbourne. I build data pipelines, ML models, LLM agents and full-stack products end to end.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f4f1' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vanamali Sims — Data, AI & Full-stack Engineer',
    template: '%s — Vanamali Sims',
  },
  description: DESCRIPTION,
  keywords: [
    'Vanamali Sims',
    'Data Engineer',
    'Data Scientist',
    'AI Engineer',
    'Full-stack Developer',
    'Melbourne',
  ],
  authors: [{ name: 'Vanamali Sims' }],
  openGraph: {
    type: 'website',
    title: 'Vanamali Sims — Data, AI & Full-stack Engineer',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Vanamali Sims',
    locale: 'en_AU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CommandPalette />
        <CursorTrail />
      </body>
    </html>
  );
}
