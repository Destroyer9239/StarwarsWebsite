import { notFound } from "next/navigation";
import Link from "next/link";
import { GAMES } from "@/lib/data";
import { ArrowLeft, Star, Monitor, Calendar, Building2 } from "lucide-react";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = GAMES.find((g) => g.slug === slug);
  if (!game) notFound();

  const mcColor =
    game.metacritic
      ? game.metacritic >= 80
        ? "#22c55e"
        : game.metacritic >= 60
        ? "#eab308"
        : "#ef4444"
      : "#64748b";

  return (
    <main className="min-h-screen bg-space pt-20 pb-20">
      {/* Hero */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(0,212,170,0.08) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(0,212,170,0.1)",
        }}
      >
        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-gold transition-colors mb-6 font-display uppercase tracking-wider"
          >
            <ArrowLeft size={12} />
            All Games
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {game.featured && (
              <span className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold text-gold bg-gold/15 border border-gold/30 flex items-center gap-1">
                <Star size={9} fill="currentColor" />
                Featured
              </span>
            )}
            <span className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold text-force bg-force/15 border border-force/30">
              {game.era}
            </span>
            <span className="text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full font-bold text-slate-400 bg-white/[0.05] border border-white/10">
              {game.releaseYear}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide leading-tight mb-4 text-white">
            {game.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{game.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Building2, label: "Developer", value: game.developer },
            { icon: Calendar, label: "Released", value: game.releaseYear.toString() },
            { icon: Monitor, label: "Platforms", value: game.platforms.slice(0, 2).join(" · ") },
            {
              icon: Star,
              label: "Metacritic",
              value: game.metacritic ? `${game.metacritic}/100` : "N/A",
              color: mcColor,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,212,170,0.15)",
                }}
              >
                <Icon size={18} className="mx-auto mb-2 text-force" />
                <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-sm font-medium leading-tight" style={{ color: stat.color ?? "white" }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Genres */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">Genre</h2>
          <div className="flex flex-wrap gap-2">
            {game.genre.map((g) => (
              <span
                key={g}
                className="text-sm px-3 py-1.5 rounded-lg text-force bg-force/10 border border-force/20"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {game.platforms.map((p) => (
              <span key={p} className="text-sm px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-500">
              {tag}
            </span>
          ))}
        </div>

        {/* Steam link */}
        {game.steamUrl && (
          <div className="rounded-2xl p-5 flex items-center justify-between"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div className="font-display text-sm font-bold text-white mb-0.5">Available on Steam</div>
              <div className="text-xs text-slate-500">Purchase or wishlist on the Steam store</div>
            </div>
            <span className="text-xs text-slate-500 italic">(visit Steam)</span>
          </div>
        )}

        {/* Related games */}
        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-slate-400 mb-4">More Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GAMES.filter((g) => g.id !== game.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/games/${related.slug}`}
                  className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group block"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(0,212,170,0.15)",
                  }}
                >
                  <div className="text-[9px] font-display uppercase tracking-widest mb-1 text-force">{related.era}</div>
                  <div className="text-sm text-white group-hover:text-force transition-colors font-medium">{related.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{related.developer} · {related.releaseYear}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
