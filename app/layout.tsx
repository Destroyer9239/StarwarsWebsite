import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/ui/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Galactic Archives",
    default: "Galactic Archives — Star Wars Lore, Battles & Games",
  },
  description:
    "The most comprehensive Star Wars encyclopedia — lore, battles, history, games, and mods including Galactic Contention.",
  keywords: [
    "Star Wars",
    "lore",
    "battles",
    "Galactic Contention",
    "Squad mod",
    "games",
    "wiki",
    "timeline",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} dark`}>
      <body className="font-body bg-space text-slate-200 antialiased overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
