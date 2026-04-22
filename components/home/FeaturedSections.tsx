"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Star, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BATTLES, GAMES, MODS, LORE_CATEGORIES, ERAS } from "@/lib/data";

// ===== LORE OVERVIEW =====
function LoreSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="nebula w-[400px] h-[300px] bg-jedi/[0.05] top-0 right-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Star Wars Universe"
          title="Explore the Lore"
          description="Dive deep into every era of the galaxy far, far away — from the dawn of the Jedi to the rise of the First Order."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LORE_CATEGORIES.map((cat, i) => (
            <GlassCard
              key={cat.id}
              delay={i * 0.08}
              glow="gold"
              className="p-6 group"
            >
              <Link href={`/lore/${cat.id}`} className="block">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{cat.count} articles</span>
                  <ArrowRight
                    size={14}
                    className="text-gold/0 group-hover:text-gold/80 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/lore/timeline"
            className="inline-flex items-center gap-2 px-6 py-3 border border-jedi/40 text-jedi rounded-xl hover:bg-jedi/10 transition-all duration-300 text-sm font-medium"
          >
            <Clock size={16} />
            View Interactive Timeline
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== FEATURED BATTLES =====
function BattlesSection() {
  const featured = BATTLES.filter((b) => b.significance === "critical").slice(0, 4);

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-space-lighter/50">
      <div className="nebula w-[500px] h-[300px] bg-sith/[0.04] bottom-0 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Hall of Conflict"
          title="Greatest Battles"
          description="The defining clashes that shaped the destiny of the galaxy."
          titleClass="text-sith"
        />
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((battle, i) => (
            <GlassCard
              key={battle.id}
              delay={i * 0.1}
              className="p-5 group border-white/5 hover:border-sith/20"
              glow="sith"
            >
              <Link href={`/battles/${battle.slug}`} className="block">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div
                      className="text-xs font-display tracking-widest uppercase mb-1 px-2 py-0.5 rounded inline-block"
                      style={{ color: battle.eraColor, background: `${battle.eraColor}15` }}
                    >
                      {battle.yearLabel}
                    </div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-sith/90 transition-colors">
                      {battle.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      battle.significance === "critical"
                        ? "bg-sith/10 text-sith border border-sith/20"
                        : "bg-gold/10 text-gold border border-gold/20"
                    }`}
                  >
                    {battle.significance}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {battle.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-2">
                    {battle.factions.map((f) => (
                      <span
                        key={f.name}
                        className={`px-2 py-0.5 rounded border ${
                          f.side === "light"
                            ? "text-jedi border-jedi/20 bg-jedi/5"
                            : "text-sith border-sith/20 bg-sith/5"
                        }`}
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span>{battle.location}</span>
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/battles"
            className="inline-flex items-center gap-2 px-6 py-3 border border-sith/40 text-sith rounded-xl hover:bg-sith/10 transition-all duration-300 text-sm font-medium"
          >
            View All Battles
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== GAMES SECTION =====
function GamesSection() {
  const featured = GAMES.filter((g) => g.featured).slice(0, 3);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="nebula w-[400px] h-[250px] bg-force/[0.05] top-0 left-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The Gaming Galaxy"
          title="Star Wars Games"
          description="From massive MMOs to tight singleplayer adventures — every Star Wars game worth playing."
          titleClass="text-force"
        />
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((game, i) => (
            <GlassCard
              key={game.id}
              delay={i * 0.1}
              className="overflow-hidden group"
              glow="none"
            >
              <Link href={`/games/${game.slug}`}>
                <div
                  className="h-32 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i === 0 ? "#1a1a2e, #16213e" : i === 1 ? "#0d0d0d, #1a0a0a" : "#0a0a1a, #0d1a0a"
                    })`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl font-black text-white/5 uppercase tracking-widest">
                      {game.title.split(" ").pop()}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {game.featured && (
                      <span className="flex items-center gap-1 text-xs bg-gold/20 text-gold border border-gold/30 rounded px-2 py-0.5">
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {game.platforms.slice(0, 2).map((p) => (
                      <span key={p} className="text-xs bg-black/50 text-slate-400 rounded px-1.5 py-0.5">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-force transition-colors leading-tight">
                      {game.title}
                    </h3>
                    {game.metacritic && (
                      <span
                        className={`text-xs font-bold rounded px-1.5 py-0.5 ml-2 flex-shrink-0 ${
                          game.metacritic >= 80
                            ? "bg-green-900/50 text-green-400"
                            : game.metacritic >= 60
                            ? "bg-yellow-900/50 text-yellow-400"
                            : "bg-red-900/50 text-red-400"
                        }`}
                      >
                        {game.metacritic}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    {game.developer} · {game.releaseYear}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {game.description}
                  </p>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {game.genre.slice(0, 2).map((g) => (
                      <span key={g} className="text-xs text-slate-500 border border-white/10 rounded px-2 py-0.5">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 border border-force/40 text-force rounded-xl hover:bg-force/10 transition-all duration-300 text-sm font-medium"
          >
            Browse All Games
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== MODS SPOTLIGHT =====
function ModsSection() {
  const gc = MODS[0];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-space-lighter/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Community Creations"
          title="Featured Mods"
          titleClass="text-gold"
        />
        {/* GC Feature Card */}
        <GlassCard
          className="relative overflow-hidden mb-5 p-0"
          glow="gold"
          animate={true}
        >
          <div className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-space via-space-lighter to-space-lighter" />
            <div className="absolute inset-0 bg-gradient-to-tr from-era-republic/10 via-transparent to-sith/10" />

            {/* Animated scan line */}
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
              style={{ animation: "scanline 4s linear infinite" }}
            />

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-display tracking-widest uppercase px-3 py-1 bg-gold/15 text-gold border border-gold/30 rounded-full">
                      Featured Mod
                    </span>
                    <span className="text-xs font-display tracking-widest uppercase px-3 py-1 bg-green-500/15 text-green-400 border border-green-500/30 rounded-full flex items-center gap-1">
                      <Zap size={10} />
                      Active Development
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-black text-white text-glow-gold mb-2 uppercase tracking-wide">
                    {gc.title}
                  </h3>
                  <p className="text-gold/70 font-display text-sm tracking-widest uppercase mb-4">
                    A Total Conversion for {gc.baseGame}
                  </p>
                  <p className="text-slate-300 text-base leading-relaxed max-w-xl mb-6">
                    {gc.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {gc.factions.map((f) => (
                      <span key={f} className="text-xs px-3 py-1 glass border border-white/10 text-slate-300 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/mods/galactic-contention"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-bold text-sm rounded-xl hover:bg-gold-dim transition-all duration-200 font-display tracking-wide"
                    >
                      Learn More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full md:w-64">
                  {[
                    { label: "Base Game", value: gc.baseGame },
                    { label: "Type", value: "Total Conversion" },
                    { label: "Factions", value: gc.factions.length.toString() },
                    { label: "Players", value: gc.playerCount || "50v50" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-gold rounded-xl p-3 text-center">
                      <div className="font-display text-sm font-bold text-gold">{stat.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6 text-center">
          <Link
            href="/mods"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 text-sm font-medium"
          >
            Browse All Mods
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== ERA PREVIEW =====
function ErasPreview() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ERAS.map((era, i) => (
            <motion.div
              key={era.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/lore/timeline#${era.id}`}
                className="block p-4 glass rounded-xl border border-white/5 hover:border-opacity-50 transition-all duration-300 group"
                style={{ borderColor: `${era.color}20` }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3 group-hover:scale-150 transition-transform duration-300"
                  style={{ background: era.color, boxShadow: `0 0 8px ${era.color}` }}
                />
                <div className="font-display text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors mb-1">
                  {era.shortName}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {era.description}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedSections() {
  return (
    <>
      <ErasPreview />
      <div className="divider-gold" />
      <LoreSection />
      <div className="divider-gold" />
      <BattlesSection />
      <div className="divider-gold" />
      <GamesSection />
      <div className="divider-gold" />
      <ModsSection />
    </>
  );
}
