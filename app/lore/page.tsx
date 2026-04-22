import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { StarField } from "@/components/ui/StarField";
import { LORE_CATEGORIES, ERAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lore",
  description: "Explore the complete Star Wars lore — characters, factions, planets, technology, and more.",
};

export default function LorePage() {
  return (
    <div className="min-h-screen bg-space pt-20">
      {/* Hero */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <StarField numStars={200} speed={0.08} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
            Star Wars Universe
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black text-gold text-glow-gold uppercase tracking-wide mb-4">
            The Lore
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            From the first spark of the Jedi Order to the final battle against the First Order — every piece of Star Wars lore, documented.
          </p>
          <Link
            href="/lore/timeline"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/40 text-gold rounded-xl hover:bg-gold/20 transition-all duration-300 font-medium"
          >
            <Clock size={16} />
            Open Interactive Timeline
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-16 max-w-7xl mx-auto">
        <SectionHeader eyebrow="Browse by Category" title="What Will You Explore?" align="left" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LORE_CATEGORIES.map((cat, i) => (
            <GlassCard key={cat.id} delay={i * 0.07} glow="gold" className="p-6">
              <Link href={`/lore/${cat.id}`} className="block group">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{cat.count} articles</span>
                  <ArrowRight
                    size={14}
                    className="text-gold/0 group-hover:text-gold/80 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Eras */}
        <div className="mt-16">
          <SectionHeader eyebrow="Eras of History" title="Explore by Era" align="left" />
          <div className="space-y-3">
            {ERAS.map((era, i) => (
              <Link
                key={era.id}
                href={`/lore/timeline#${era.id}`}
                className="flex items-center gap-5 p-5 glass rounded-2xl border border-white/5 hover:border-opacity-40 transition-all duration-300 group"
                style={{ borderColor: `${era.color}10` }}
              >
                <div
                  className="w-1.5 h-12 rounded-full flex-shrink-0"
                  style={{ background: era.color, boxShadow: `0 0 12px ${era.color}` }}
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display text-sm font-bold uppercase tracking-wide group-hover:brightness-125 transition-all mb-0.5"
                    style={{ color: era.color }}
                  >
                    {era.name}
                  </h3>
                  <p className="text-xs text-slate-500">{era.description}</p>
                </div>
                <div className="text-xs text-slate-600 font-display tracking-widest flex-shrink-0">
                  {era.startYear > 0
                    ? `${era.startYear} ABY`
                    : `${Math.abs(era.startYear).toLocaleString()} BBY`}
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
