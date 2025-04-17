import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseEffect from "@/components/MouseEffect";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: "Simon | Developer & Artist",
  description: "Data Science student, Developer, and Music Producer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0b] text-gray-300 font-mono">
        <MouseEffect />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
