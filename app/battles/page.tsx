"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Filter, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StarField } from "@/components/ui/StarField";
import { BATTLES, ERAS } from "@/lib/data";

const SIGNIFICANCE_LABELS = {
  critical: { label: "Critical", color: "#EF4444" },
  major: { label: "Major", color: "#F59E0B" },
  moderate: { label: "Moderate", color: "#6B7280" },
};

export default function BattlesPage() {
  const [eraFilter, setEraFilter] = useState("all");
  const [sigFilter, setSigFilter] = useState("all");

  const filtered = BATTLES.filter((b) => {
    if (eraFilter !== "all" && b.era !== eraFilter) return false;
    if (sigFilter !== "all" && b.significance !== sigFilter) return false;
    return true;
  });

  const usedEras = [...new Set(BATTLES.map((b) => b.era))];

  return (
    <div className="min-h-screen bg-space pt-20">
      {/* Hero */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <StarField numStars={200} speed={0.08} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space" />
          <div className="nebula absolute w-[600px] h-[300px] bg-sith/[0.06] top-0 right-0 pointer-events-none rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.4em] text-sith/60 uppercase mb-4">
            Hall of Conflict
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black text-sith uppercase tracking-wide mb-4"
            style={{ textShadow: "0 0 40px rgba(255,34,34,0.4)" }}>
            Battles &amp; Wars
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every major conflict across all eras — from the Clone Wars to the rise of the First Order.
          </p>
        </div>
      </div>

      <div className="px-4 pb-24 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-4 border border-white/10">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter size={14} />
            <span className="text-sm">Filter:</span>
          </div>

          {/* Era filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setEraFilter("all")}
              className={`text-xs px-3 py-1.5 rounded-lg border font-display uppercase tracking-wider transition-all ${
                eraFilter === "all"
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/10 text-slate-500 hover:text-slate-300"
              }`}
            >
              All Eras
            </button>
            {usedEras.map((era) => {
              const eraData = ERAS.find((e) => e.id === era);
              return (
                <button
                  key={era}
                  onClick={() => setEraFilter(era)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-display uppercase tracking-wider transition-all`}
                  style={
                    eraFilter === era
                      ? {
                          color: eraData?.color,
                          background: `${eraData?.color}15`,
                          borderColor: `${eraData?.color}40`,
                        }
                      : { borderColor: "rgba(255,255,255,0.1)", color: "#6B7280" }
                  }
                >
                  {eraData?.shortName ?? era}
                </button>
              );
            })}
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          {/* Significance filter */}
          <div className="flex gap-2">
            {(["all", "critical", "major"] as const).map((sig) => (
              <button
                key={sig}
                onClick={() => setSigFilter(sig)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-display uppercase tracking-wider transition-all ${
                  sigFilter === sig
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-white/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                {sig === "all" ? "All Scales" : sig}
              </button>
            ))}
          </div>
        </div>

        {/* Battle count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing <span className="text-gold font-bold">{filtered.length}</span> battles
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid md:grid-cols-2 gap-5">
            {filtered.map((battle, i) => {
              const sig = SIGNIFICANCE_LABELS[battle.significance];
              return (
                <GlassCard
                  key={battle.id}
                  delay={i * 0.05}
                  className="p-6 group border-white/5"
                  glow="sith"
                >
                  <Link href={`/battles/${battle.slug}`} className="block">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div
                          className="text-xs font-display tracking-widest uppercase mb-1.5 px-2 py-0.5 rounded inline-block"
                          style={{ color: battle.eraColor, background: `${battle.eraColor}15` }}
                        >
                          {battle.yearLabel} · {battle.location}
                        </div>
                        <h2 className="font-display text-base font-bold text-white group-hover:text-sith/80 transition-colors leading-tight">
                          {battle.name}
                        </h2>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded flex-shrink-0 ml-2"
                        style={{
                          color: sig.color,
                          background: `${sig.color}15`,
                          border: `1px solid ${sig.color}30`,
                        }}
                      >
                        {sig.label}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                      {battle.description}
                    </p>

                    {/* Factions vs */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {battle.factions.map((f, fi) => (
                        <span key={f.name} className="flex items-center gap-1">
                          <span
                            className="text-xs px-2.5 py-1 rounded border font-medium"
                            style={
                              f.side === "light"
                                ? { color: "#4DACFF", borderColor: "#4DACFF30", background: "#4DACFF10" }
                                : { color: "#EF4444", borderColor: "#EF444430", background: "#EF444410" }
                            }
                          >
                            {f.name}
                          </span>
                          {fi < battle.factions.length - 1 && (
                            <span className="text-slate-600 text-xs font-bold">vs</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Outcome + commanders */}
                    <div className="flex items-center justify-between text-xs border-t border-white/5 pt-4">
                      <span className="text-slate-500">
                        Outcome:{" "}
                        <span className="text-slate-300 font-medium">{battle.outcome}</span>
                      </span>
                      <span className="flex items-center gap-1 text-sith/0 group-hover:text-sith/70 transition-colors">
                        Read more <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </GlassCard>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
