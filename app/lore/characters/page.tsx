"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Minus, Search } from "lucide-react";
import { CHARACTERS, type Character } from "@/lib/data";

const SABER_COLORS: Record<string, string> = {
  blue: "#4DACFF",
  green: "#00D4AA",
  red: "#EF4444",
  purple: "#8B5CF6",
  white: "#F8FAFC",
  yellow: "#FFE81F",
  none: "#64748B",
};

function SaberDot({ color }: { color?: string }) {
  const hex = SABER_COLORS[color ?? "none"];
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: hex, boxShadow: `0 0 6px ${hex}` }}
    />
  );
}

function SideIcon({ side }: { side: Character["side"] }) {
  if (side === "light")
    return <Shield size={11} className="text-jedi" />;
  if (side === "dark")
    return <Sparkles size={11} className="text-sith" />;
  if (side === "both")
    return (
      <span className="flex gap-0.5">
        <Sparkles size={10} className="text-jedi" />
        <Sparkles size={10} className="text-sith" />
      </span>
    );
  return <Minus size={11} className="text-slate-500" />;
}

function CharacterCard({ char, index }: { char: Character; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, ${char.color}cc 0%, rgba(3,7,18,0.95) 100%)`,
        border: `1px solid ${char.color}40`,
        boxShadow: `0 0 0 0 ${char.color}00`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${char.color}20` }}
      />

      <div className="p-5 relative">
        {/* Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-black text-lg flex-shrink-0 relative"
            style={{ background: `${char.color}60`, border: `2px solid ${char.color}50` }}
          >
            {char.initials}
            {char.lightsaberColor && char.lightsaberColor !== "none" && (
              <div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-space"
                style={{
                  background: SABER_COLORS[char.lightsaberColor],
                  boxShadow: `0 0 8px ${SABER_COLORS[char.lightsaberColor]}`,
                }}
              />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm font-bold text-white leading-tight mb-0.5">
              {char.name}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">{char.role}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {char.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[10px] text-slate-600 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <SideIcon side={char.side} />
            <span className="capitalize">{char.side === "both" ? "Light & Dark" : char.side}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {char.lightsaberColor && char.lightsaberColor !== "none" && (
              <>
                <SaberDot color={char.lightsaberColor} />
                <span className="capitalize">{char.lightsaberColor} blade</span>
              </>
            )}
            {(!char.lightsaberColor || char.lightsaberColor === "none") && (
              <span className="italic">{char.species}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<"all" | "light" | "dark" | "neutral">("all");
  const [forceFilter, setForceFilter] = useState<"all" | "yes" | "no">("all");

  const filtered = CHARACTERS.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.species.toLowerCase().includes(search.toLowerCase());
    const matchSide =
      sideFilter === "all" ||
      c.side === sideFilter ||
      (sideFilter === "light" && c.side === "both") ||
      (sideFilter === "dark" && c.side === "both");
    const matchForce =
      forceFilter === "all" ||
      (forceFilter === "yes" && c.forceSensitive) ||
      (forceFilter === "no" && !c.forceSensitive);
    return matchSearch && matchSide && matchForce;
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
            Lore / Characters
            <span className="h-px w-8 bg-gold/30" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Character
            <span className="text-gold-shimmer block">Database</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Heroes, villains, Jedi, Sith — the souls who shaped the fate of the galaxy.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-8 items-center"
        >
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search characters…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Side filter */}
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

          {/* Force filter */}
          <div className="flex gap-1.5">
            {(["all", "yes", "no"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setForceFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 border"
                style={
                  forceFilter === f
                    ? { color: "#8B5CF6", background: "#8B5CF615", borderColor: "#8B5CF640" }
                    : { color: "#64748b", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }
                }
              >
                {f === "all" ? "All" : f === "yes" ? "Force-sensitive" : "Non-Force"}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-600 ml-auto">
            {filtered.length} character{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((char, i) => (
            <CharacterCard key={char.id} char={char} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <p className="font-display uppercase tracking-widest text-sm">No characters found</p>
          </div>
        )}
      </div>
    </main>
  );
}
