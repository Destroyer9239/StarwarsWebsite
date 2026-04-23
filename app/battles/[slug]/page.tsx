import { notFound } from "next/navigation";
import Link from "next/link";
import { BATTLES, ERAS } from "@/lib/data";
import { ArrowLeft, MapPin, Calendar, Users, Trophy } from "lucide-react";

export function generateStaticParams() {
  return BATTLES.map((b) => ({ slug: b.slug }));
}

export default async function BattlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const battle = BATTLES.find((b) => b.slug === slug);
  if (!battle) notFound();

  const era = ERAS.find((e) => e.id === battle.era);

  const significanceConfig = {
    critical: { label: "Pivotal", color: "#EF4444" },
    major: { label: "Major", color: "#FFE81F" },
    moderate: { label: "Moderate", color: "#94A3B8" },
  };
  const sig = significanceConfig[battle.significance];

  return (
    <main className="min-h-screen bg-space pt-20 pb-20">
      {/* Hero band */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${battle.eraColor}15 0%, transparent 100%)`,
          borderBottom: `1px solid ${battle.eraColor}20`,
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${battle.eraColor}10 0%, transparent 70%)` }}
        />

        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/battles"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-gold transition-colors mb-6 font-display uppercase tracking-wider"
          >
            <ArrowLeft size={12} />
            All Battles
          </Link>

          {/* Era + year badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {era && (
              <span
                className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold"
                style={{ color: era.color, background: `${era.color}18`, border: `1px solid ${era.color}30` }}
              >
                {era.name}
              </span>
            )}
            <span
              className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold"
              style={{ color: battle.eraColor, background: `${battle.eraColor}15`, border: `1px solid ${battle.eraColor}25` }}
            >
              {battle.yearLabel}
            </span>
            <span
              className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold"
              style={{ color: sig.color, background: `${sig.color}15`, border: `1px solid ${sig.color}25` }}
            >
              {sig.label}
            </span>
          </div>

          <h1
            className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide leading-tight mb-6"
            style={{ textShadow: `0 0 60px ${battle.eraColor}30` }}
          >
            {battle.name}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            {battle.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Location", value: battle.location },
            { icon: Calendar, label: "Date", value: battle.yearLabel },
            { icon: Trophy, label: "Outcome", value: battle.outcome },
            { icon: Users, label: "Commanders", value: `${battle.commanders.length} Notable` },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${battle.eraColor}20`,
                }}
              >
                <Icon size={18} className="mx-auto mb-2" style={{ color: battle.eraColor }} />
                <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-sm text-white font-medium leading-tight">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Factions */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">Combatants</h2>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {battle.factions.map((faction, i) => (
              <div key={faction.name} className="flex-1">
                {i === 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-slate-600 text-xs font-bold self-center mx-2 absolute left-1/2 -translate-x-1/2">
                    VS
                  </div>
                )}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: faction.side === "light" ? "rgba(77,172,255,0.06)" : "rgba(239,68,68,0.06)",
                    border: `1px solid ${faction.side === "light" ? "#4DACFF" : "#EF4444"}25`,
                  }}
                >
                  <div
                    className="text-[9px] font-display uppercase tracking-widest mb-1"
                    style={{ color: faction.side === "light" ? "#4DACFF" : "#EF4444" }}
                  >
                    {faction.side === "light" ? "Light Side" : "Dark Side"}
                  </div>
                  <div className="text-sm text-white font-medium">{faction.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commanders */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">Notable Commanders</h2>
          <div className="flex flex-wrap gap-2">
            {battle.commanders.map((c) => (
              <span
                key={c}
                className="text-sm px-3 py-1.5 rounded-lg"
                style={{ color: battle.eraColor, background: `${battle.eraColor}10`, border: `1px solid ${battle.eraColor}20` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {battle.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related battles */}
        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">More Battles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BATTLES.filter((b) => b.id !== battle.id && b.era === battle.era)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/battles/${related.slug}`}
                  className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group block"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${related.eraColor}20`,
                  }}
                >
                  <div className="text-[9px] font-display uppercase tracking-widest mb-1" style={{ color: related.eraColor }}>
                    {related.yearLabel}
                  </div>
                  <div className="text-sm text-white group-hover:text-gold transition-colors font-medium">{related.name}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">{related.location}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
