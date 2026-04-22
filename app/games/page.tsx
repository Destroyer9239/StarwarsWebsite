"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, ExternalLink, Filter, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StarField } from "@/components/ui/StarField";
import { GAMES } from "@/lib/data";

const GENRE_COLORS: Record<string, string> = {
  "Third-Person Shooter": "#4DACFF",
  MMORPG: "#8B5CF6",
  RPG: "#8B5CF6",
  "Action Adventure": "#00D4AA",
  "Souls-like": "#EF4444",
  "Space Combat": "#FFE81F",
  Simulation: "#F59E0B",
  "First-Person Shooter": "#EF4444",
  Tactical: "#F59E0B",
};

export default function GamesPage() {
  const [filter, setFilter] = useState("all");

  const genres = Array.from(new Set(GAMES.flatMap((g) => g.genre)));
  const filtered =
    filter === "all"
      ? GAMES
      : GAMES.filter((g) => g.genre.includes(filter));

  return (
    <div className="min-h-screen bg-space pt-20">
      {/* Hero */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <StarField numStars={200} speed={0.08} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space" />
          <div
            className="nebula absolute w-[500px] h-[300px] top-0 left-1/2 pointer-events-none rounded-full blur-[80px]"
            style={{ background: "rgba(0,212,170,0.06)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.4em] text-force/60 uppercase mb-4">
            The Gaming Galaxy
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-wide mb-4"
            style={{ color: "#00D4AA", textShadow: "0 0 40px rgba(0,212,170,0.4)" }}>
            Star Wars Games
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every Star Wars game worth playing — from legendary classics to modern masterpieces.
          </p>
        </div>
      </div>

      <div className="px-4 pb-24 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3 border border-white/10">
          <Filter size={14} className="text-slate-500" />
          <button
            onClick={() => setFilter("all")}
            className={`text-xs px-3 py-1.5 rounded-lg border font-display uppercase tracking-wider transition-all ${
              filter === "all"
                ? "bg-white/10 border-white/20 text-white"
                : "border-white/10 text-slate-500 hover:text-slate-300"
            }`}
          >
            All Games
          </button>
          {genres.map((g) => {
            const color = GENRE_COLORS[g] ?? "#888";
            return (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className="text-xs px-3 py-1.5 rounded-lg border font-display uppercase tracking-wider transition-all"
                style={
                  filter === g
                    ? { color, background: `${color}15`, borderColor: `${color}40` }
                    : { borderColor: "rgba(255,255,255,0.1)", color: "#6B7280" }
                }
              >
                {g}
              </button>
            );
          })}
        </div>

        {/* Featured row */}
        {filter === "all" && (
          <div className="mb-10">
            <h2 className="font-display text-sm font-bold text-gold uppercase tracking-widest mb-4">
              Editor&apos;s Picks
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {GAMES.filter((g) => g.featured).slice(0, 2).map((game, i) => (
                <GlassCard
                  key={game.id}
                  delay={i * 0.1}
                  className="p-0 overflow-hidden group"
                  glow="gold"
                >
                  <Link href={`/games/${game.slug}`} className="block">
                    <div
                      className="h-40 relative flex items-end p-5"
                      style={{
                        background: `linear-gradient(160deg, ${
                          i === 0 ? "#0d1b2a, #1a3a5c" : "#1a0a0a, #3d0000"
                        })`,
                      }}
                    >
                      <div className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 41px)"
                        }}
                      />
                      <div>
                        <span className="flex items-center gap-1 text-xs bg-gold/20 text-gold border border-gold/30 rounded px-2 py-0.5 mb-2 w-fit">
                          <Star size={10} fill="currentColor" />
                          Editor&apos;s Pick
                        </span>
                        <h3 className="font-display text-xl font-black text-white uppercase tracking-wide">
                          {game.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500">
                          {game.developer} · {game.releaseYear}
                        </p>
                        {game.metacritic && (
                          <span
                            className={`text-sm font-bold rounded-lg px-3 py-1 ${
                              game.metacritic >= 80
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}
                          >
                            {game.metacritic}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* All Games Grid */}
        <h2 className="font-display text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          {filter === "all" ? "All Games" : filter} ({filtered.length})
        </h2>
        <AnimatePresence mode="popLayout">
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((game, i) => (
              <GlassCard
                key={game.id}
                delay={(i % 6) * 0.07}
                className="p-0 overflow-hidden group"
              >
                <Link href={`/games/${game.slug}`} className="block">
                  <div
                    className="h-28 relative flex items-end px-4 pb-3"
                    style={{
                      background: "linear-gradient(135deg, #0a0a12, #1a1a2e)",
                    }}
                  >
                    <span className="font-display text-5xl font-black text-white/[0.04] uppercase absolute inset-0 flex items-center justify-center tracking-widest">
                      {game.title.split(" ")[0]}
                    </span>
                    <div className="relative flex items-center justify-between w-full">
                      <div className="flex gap-1 flex-wrap">
                        {game.platforms.slice(0, 2).map((p) => (
                          <span key={p} className="text-xs bg-black/40 text-slate-500 rounded px-1.5 py-0.5">
                            {p}
                          </span>
                        ))}
                      </div>
                      {game.metacritic && (
                        <span
                          className={`text-xs font-bold rounded px-1.5 py-0.5 ${
                            game.metacritic >= 80
                              ? "bg-green-900/60 text-green-400"
                              : game.metacritic >= 60
                              ? "bg-yellow-900/60 text-yellow-400"
                              : "bg-red-900/60 text-red-400"
                          }`}
                        >
                          {game.metacritic}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-force transition-colors mb-1 leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-2">
                      {game.developer} · {game.releaseYear}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {game.description}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {game.genre.slice(0, 2).map((g) => (
                        <span
                          key={g}
                          className="text-xs px-2 py-0.5 rounded border border-white/10 text-slate-500"
                          style={{ borderColor: `${GENRE_COLORS[g] ?? "#888"}20` }}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
