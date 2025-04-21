import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseEffect from "@/components/MouseEffect";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const metadata: Metadata = {
  title: "Vanamali Sims | Digital Alchemist & Sonic Wizard",
  description: "Data Science student, Developer, and Music Producer who turns coffee into code and beats into bops",
  keywords: ["Data Science", "Developer", "Music Producer", "Web Development", "Portfolio"],
  authors: [{ name: "Vanamali Sims" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0a0a0b",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-emoji.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/favicon-emoji.svg' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-emoji.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/favicon-emoji.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0a0a0b] text-gray-300 font-mono antialiased">
        <MouseEffect />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
