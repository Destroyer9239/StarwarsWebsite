import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Galactic Archives",
    default: "Galactic Archives — Star Wars Lore, Battles & Games",
  },
  description:
    "The most comprehensive Star Wars encyclopedia covering lore, battles, history, games, and mods including Galactic Contention.",
  keywords: ["Star Wars", "lore", "battles", "Galactic Contention", "Squad mod", "games", "wiki"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body bg-space text-slate-200 antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
