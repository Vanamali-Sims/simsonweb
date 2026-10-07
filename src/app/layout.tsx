import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@content/portfolio';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simsdoesdata.me'
  ),
  title: 'Sai Vanamali — Data Scientist & Front-end Developer, Melbourne',
  description:
    'Data scientist and front-end developer in Melbourne — SQL, dbt, Python, machine learning, React, and TypeScript. Ships ML systems and the interfaces around them.',
  keywords: [
    'Sai Vanamali',
    'Data Scientist',
    'ML Engineer',
    'Analytics Engineer',
    'Front-end Developer',
    'SQL',
    'dbt',
    'Python',
    'machine learning',
    'React',
    'TypeScript',
    'Melbourne',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: 'Sai Vanamali — Data Scientist & Front-end Developer',
    description: site.positioning,
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Vanamali — Data Scientist & Front-end Developer',
    description:
      '96.7% faster routing · 18× traffic · 20× recommender baseline. Data + front-end in Melbourne.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <a href="#hero" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
