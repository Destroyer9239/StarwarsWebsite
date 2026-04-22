"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, Swords, Gamepad2, Wrench } from "lucide-react";
import { StarField } from "@/components/ui/StarField";

const QUICK_LINKS = [
  { label: "Lore & History", href: "/lore", icon: BookOpen, color: "text-jedi" },
  { label: "Battles", href: "/battles", icon: Swords, color: "text-sith" },
  { label: "Games", href: "/games", icon: Gamepad2, color: "text-force" },
  { label: "Mods", href: "/mods", icon: Wrench, color: "text-gold" },
];

const CRAWL_WORDS = [
  "Explore the Lore",
  "Relive the Battles",
  "Play the Games",
  "Join the Community",
];

export function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CRAWL_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Starfield */}
      <StarField numStars={350} speed={0.15} />

      {/* Nebula overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="nebula w-[600px] h-[400px] bg-jedi/[0.06] top-[-100px] left-[-200px]" />
        <div className="nebula w-[500px] h-[300px] bg-era-republic/[0.08] bottom-0 right-[-100px]" />
        <div className="nebula w-[300px] h-[300px] bg-gold/[0.04] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-gold/40" />
          <span className="font-display text-xs tracking-[0.4em] text-gold/70 uppercase">
            The Complete Star Wars Encyclopedia
          </span>
          <span className="h-px w-12 bg-gold/40" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] uppercase leading-none mb-4"
        >
          <span className="block text-gold-shimmer text-glow-gold">
            Galactic
          </span>
          <span className="block text-white" style={{ textShadow: "0 0 60px rgba(255,255,255,0.1)" }}>
            Archives
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-slate-400 text-lg md:text-xl mb-10 font-light tracking-wide"
        >
          A long time ago in a galaxy far, far away&hellip;
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-colors duration-300 focus-within:border-gold/40 focus-within:shadow-gold">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search the archives — battles, characters, planets..."
              className="w-full bg-transparent pl-12 pr-32 py-4 text-white placeholder-slate-500 outline-none text-base"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gold/90 hover:bg-gold text-black font-bold text-sm rounded-xl transition-all duration-200 font-display tracking-wide">
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {QUICK_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                className="group flex items-center gap-2 px-5 py-2.5 glass rounded-xl border border-white/10 hover:border-white/20 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <link.icon size={15} className={`${link.color} group-hover:scale-110 transition-transform duration-200`} />
                {link.label}
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex items-center justify-center gap-8 md:gap-16 text-center"
        >
          {[
            { value: "800+", label: "Lore Articles" },
            { value: "143", label: "Battles" },
            { value: "20+", label: "Games" },
            { value: "Live", label: "Mods Coverage" },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold group-hover:text-glow-gold transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
