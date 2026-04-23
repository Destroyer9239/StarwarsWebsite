"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Minus } from "lucide-react";
import { FACTIONS, ERAS, type Faction } from "@/lib/data";

function SideLabel({ side }: { side: Faction["side"] }) {
  if (side === "light") return <span className="text-jedi flex items-center gap-1"><Shield size={10} /> Light Side</span>;
  if (side === "dark") return <span className="text-sith flex items-center gap-1"><Sparkles size={10} /> Dark Side</span>;
  return <span className="text-slate-500 flex items-center gap-1"><Minus size={10} /> Neutral</span>;
}

function FactionCard({ faction, index }: { faction: Faction; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const factionEras = ERAS.filter((e) => faction.eras.includes(e.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${faction.color}30`,
      }}
    >
      {/* Header band */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${faction.color}, transparent)` }}
      />

      {/* Radial glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${faction.color}08 0%, transparent 60%)` }}
      />

      <div className="p-6 relative">
        {/* Emblem + name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${faction.color}15`, border: `2px solid ${faction.color}30` }}
          >
            {faction.emblem}
          </div>
          <div>
            <h3 className="font-display text-base font-black text-white uppercase tracking-wide leading-tight mb-0.5">
              {faction.name}
            </h3>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
              <SideLabel side={faction.side} />
            </div>
            <div className="text-[10px] text-slate-600">
              Founded: {faction.founded}
              {faction.dissolved && <span className="ml-2">· Dissolved: {faction.dissolved}</span>}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {faction.description}
        </p>

        {/* Eras */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {factionEras.map((era) => (
            <span
              key={era.id}
              className="text-[10px] font-display uppercase tracking-widest px-2 py-0.5 rounded-full font-bold"
              style={{ color: era.color, background: `${era.color}15`, border: `1px solid ${era.color}25` }}
            >
              {era.shortName}
            </span>
          ))}
        </div>

        {/* Capital */}
        <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
          <span>Capital: <span className="text-slate-400">{faction.capital}</span></span>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-display uppercase tracking-widest transition-colors duration-200"
          style={{ color: expanded ? faction.color : "#64748b" }}
        >
          {expanded ? "Hide Details ▲" : "Show Details ▼"}
        </button>

        {/* Expanded details */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t space-y-4"
            style={{ borderColor: `${faction.color}20` }}
          >
            <div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Notable Leaders</div>
              <div className="flex flex-wrap gap-1.5">
                {faction.leaders.map((l) => (
                  <span
                    key={l}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{ color: faction.color, background: `${faction.color}10`, border: `1px solid ${faction.color}20` }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Military Forces</div>
              <div className="flex flex-wrap gap-1.5">
                {faction.military.map((m) => (
                  <span key={m} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function FactionsPage() {
  const [sideFilter, setSideFilter] = useState<"all" | "light" | "dark" | "neutral">("all");
  const [eraFilter, setEraFilter] = useState("all");

  const filtered = FACTIONS.filter((f) => {
    const matchSide = sideFilter === "all" || f.side === sideFilter;
    const matchEra = eraFilter === "all" || f.eras.includes(eraFilter);
    return matchSide && matchEra;
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
            Lore / Factions
            <span className="h-px w-8 bg-gold/30" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Galactic
            <span className="text-gold-shimmer block">Factions</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every power, empire, and order that has shaped the fate of the galaxy far, far away.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-8 items-center"
        >
          {/* Side */}
          <div className="flex gap-1.5">
            {(["all", "light", "dark", "neutral"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSideFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 border"
                style={
                  sideFilter === s
                    ? {
                        color: s === "all" ? "#FFE81F" : s === "light" ? "#4DACFF" : s === "dark" ? "#EF4444" : "#94A3B8",
                        background: `${s === "all" ? "#FFE81F" : s === "light" ? "#4DACFF" : s === "dark" ? "#EF4444" : "#94A3B8"}15`,
                        borderColor: `${s === "all" ? "#FFE81F" : s === "light" ? "#4DACFF" : s === "dark" ? "#EF4444" : "#94A3B8"}40`,
                      }
                    : { color: "#64748b", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }
                }
              >
                {s === "all" ? "All" : s === "light" ? "Light Side" : s === "dark" ? "Dark Side" : "Neutral"}
              </button>
            ))}
          </div>

          {/* Era filter */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setEraFilter("all")}
              className="px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 border"
              style={
                eraFilter === "all"
                  ? { color: "#FFE81F", background: "#FFE81F15", borderColor: "#FFE81F40" }
                  : { color: "#64748b", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }
              }
            >
              All Eras
            </button>
            {ERAS.map((era) => (
              <button
                key={era.id}
                onClick={() => setEraFilter(era.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 border"
                style={
                  eraFilter === era.id
                    ? { color: era.color, background: `${era.color}15`, borderColor: `${era.color}40` }
                    : { color: "#64748b", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }
                }
              >
                {era.shortName}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-600 ml-auto">
            {filtered.length} faction{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((faction, i) => (
            <FactionCard key={faction.id} faction={faction} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <p className="font-display uppercase tracking-widest text-sm">No factions found</p>
          </div>
        )}
      </div>
    </main>
  );
}
