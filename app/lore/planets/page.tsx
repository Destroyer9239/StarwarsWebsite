"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Cloud, Search } from "lucide-react";
import { PLANETS } from "@/lib/data";

function PlanetCard({ planet, index }: { planet: typeof PLANETS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ border: `1px solid ${planet.accentColor}25` }}
    >
      {/* Planet sphere */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(3,7,18,0.8)" }}
      >
        {/* Space bg stars */}
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px, 120px 120px, 60px 60px",
          }}
        />

        {/* Planet globe */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-32 h-32 rounded-full shadow-2xl"
          style={{
            background: planet.gradient,
            boxShadow: `0 0 40px ${planet.accentColor}40, 0 0 80px ${planet.accentColor}15`,
          }}
        >
          {/* Atmosphere glow */}
          <div
            className="absolute -inset-2 rounded-full opacity-30"
            style={{ background: `radial-gradient(ellipse, transparent 55%, ${planet.accentColor}40 100%)` }}
          />
        </motion.div>

        {/* Region badge */}
        <div
          className="absolute top-3 left-3 text-[10px] font-display uppercase tracking-widest px-2 py-0.5 rounded-full font-bold"
          style={{ color: planet.accentColor, background: `${planet.accentColor}18`, border: `1px solid ${planet.accentColor}30` }}
        >
          {planet.region}
        </div>
      </div>

      {/* Info */}
      <div className="p-5" style={{ background: "rgba(3,7,18,0.95)" }}>
        <h3 className="font-display text-lg font-black text-white uppercase tracking-wide mb-1">
          {planet.name}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {planet.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-start gap-1.5">
            <Cloud size={10} className="mt-0.5 flex-shrink-0" style={{ color: planet.accentColor }} />
            <div>
              <div className="text-[9px] text-slate-600 uppercase tracking-widest">Climate</div>
              <div className="text-xs text-slate-400">{planet.climate}</div>
            </div>
          </div>
          {planet.population && (
            <div className="flex items-start gap-1.5">
              <Users size={10} className="mt-0.5 flex-shrink-0" style={{ color: planet.accentColor }} />
              <div>
                <div className="text-[9px] text-slate-600 uppercase tracking-widest">Population</div>
                <div className="text-xs text-slate-400">{planet.population}</div>
              </div>
            </div>
          )}
        </div>

        {/* Notable residents */}
        {planet.notableResidents.length > 0 && (
          <div className="pt-3 border-t border-white/[0.06]">
            <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <MapPin size={9} />
              Notable Residents
            </div>
            <div className="flex flex-wrap gap-1">
              {planet.notableResidents.slice(0, 3).map((r) => (
                <span
                  key={r}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ color: planet.accentColor, background: `${planet.accentColor}10`, border: `1px solid ${planet.accentColor}20` }}
                >
                  {r}
                </span>
              ))}
              {planet.notableResidents.length > 3 && (
                <span className="text-[10px] text-slate-600 py-0.5">+{planet.notableResidents.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PlanetsPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

  const regions = ["all", ...Array.from(new Set(PLANETS.map((p) => p.region)))];

  const filtered = PLANETS.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.terrain.toLowerCase().includes(search.toLowerCase()) ||
      p.climate.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "all" || p.region === regionFilter;
    return matchSearch && matchRegion;
  });

  return (
    <main className="min-h-screen bg-space pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-display tracking-[0.3em] text-gold/60 uppercase mb-4">
            <span className="h-px w-8 bg-gold/30" />
            Lore / Planets
            <span className="h-px w-8 bg-gold/30" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Planetary
            <span className="text-gold-shimmer block">Atlas</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Worlds of ice and fire, jungle and desert — every planet that shaped galactic history.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-8 items-center"
        >
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search planets…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-gold/40 transition-colors"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className="px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 border"
                style={
                  regionFilter === r
                    ? { color: "#00D4AA", background: "#00D4AA15", borderColor: "#00D4AA40" }
                    : { color: "#64748b", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }
                }
              >
                {r === "all" ? "All Regions" : r}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-600 ml-auto">{filtered.length} planets</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((planet, i) => (
            <PlanetCard key={planet.id} planet={planet} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <p className="font-display uppercase tracking-widest text-sm">No planets found</p>
          </div>
        )}
      </div>
    </main>
  );
}
