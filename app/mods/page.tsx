import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StarField } from "@/components/ui/StarField";
import { MODS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mods",
  description: "The best Star Wars game mods — including Galactic Contention for Squad.",
};

const STATUS_CONFIG = {
  active: { label: "Active", color: "#4ADE80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)" },
  beta: { label: "Beta", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  complete: { label: "Complete", color: "#4DACFF", bg: "rgba(77,172,255,0.1)", border: "rgba(77,172,255,0.3)" },
  abandoned: { label: "Abandoned", color: "#6B7280", bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.3)" },
};

const TYPE_CONFIG = {
  "total-conversion": { label: "Total Conversion", color: "#FFE81F" },
  overhaul: { label: "Overhaul", color: "#4DACFF" },
  content: { label: "Content", color: "#00D4AA" },
  visual: { label: "Visual", color: "#8B5CF6" },
};

export default function ModsPage() {
  const featured = MODS.find((m) => m.featured);
  const others = MODS.filter((m) => !m.featured);

  return (
    <div className="min-h-screen bg-space pt-20">
      {/* Hero */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <StarField numStars={200} speed={0.08} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space" />
          <div className="nebula absolute w-[500px] h-[300px] bg-gold/[0.04] top-0 left-0 pointer-events-none rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
            Community Creations
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black text-gold text-glow-gold uppercase tracking-wide mb-4">
            Mods
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            The best Star Wars modifications — bringing the galaxy to life in games you already love.
          </p>
        </div>
      </div>

      <div className="px-4 pb-24 max-w-7xl mx-auto">

        {/* Featured Mod — Galactic Contention */}
        {featured && (
          <div className="mb-16">
            <h2 className="font-display text-xs tracking-[0.3em] text-gold/60 uppercase mb-5 flex items-center gap-2">
              <Star size={12} className="text-gold" fill="currentColor" />
              Featured Mod
            </h2>
            <Link href="/mods/galactic-contention">
              <GlassCard className="relative overflow-hidden p-0 group" glow="gold" animate>
                <div className="absolute inset-0 bg-gradient-to-br from-era-republic/8 via-transparent to-sith/8 pointer-events-none" />
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,232,31,0.4), transparent)" }}
                />
                <div className="relative p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-display tracking-widest uppercase px-3 py-1 bg-gold/15 text-gold border border-gold/30 rounded-full">
                          Total Conversion
                        </span>
                        <span
                          className="text-xs font-display tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1"
                          style={STATUS_CONFIG.active}
                        >
                          <Zap size={10} />
                          Active
                        </span>
                        <span className="text-xs text-slate-500 px-3 py-1 glass rounded-full border border-white/10">
                          {featured.baseGame}
                        </span>
                      </div>

                      <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-gold/60 font-display text-sm tracking-widest uppercase mb-5">
                        A Total Conversion Mod
                      </p>
                      <p className="text-slate-300 leading-relaxed max-w-2xl mb-6 text-base">
                        {featured.longDescription}
                      </p>

                      {/* Factions */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featured.factions.map((f) => (
                          <span key={f} className="text-xs px-3 py-1.5 glass border border-white/10 text-slate-300 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all duration-300">
                        View Full Details
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 w-full lg:w-60 flex-shrink-0">
                      {[
                        { label: "Base Game", value: featured.baseGame },
                        { label: "Players", value: featured.playerCount ?? "50v50" },
                        { label: "Factions", value: String(featured.factions.length) },
                        { label: "Status", value: "Active" },
                      ].map((s) => (
                        <div key={s.label} className="glass-gold rounded-xl p-4 text-center">
                          <div className="font-display text-sm font-bold text-gold">{s.value}</div>
                          <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        )}

        {/* Other Mods */}
        {others.length > 0 && (
          <div>
            <SectionHeader eyebrow="More Mods" title="Also Worth Playing" align="left" />
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((mod, i) => {
                const status = STATUS_CONFIG[mod.status];
                const type = TYPE_CONFIG[mod.type];
                return (
                  <GlassCard key={mod.id} delay={i * 0.1} className="p-6 group" glow="gold">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ color: type.color, background: `${type.color}15` }}>
                            {type.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded border" style={{ color: status.color, background: status.bg, borderColor: status.border }}>
                            {status.label}
                          </span>
                        </div>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-gold transition-colors">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{mod.baseGame}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{mod.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {mod.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 glass border border-white/10 text-slate-500 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
