import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Shield, Star } from "lucide-react";
import { BATTLES } from "@/lib/data";

type Props = {
  params: { slug: string };
};

function getBattle(slug: string) {
  return BATTLES.find((battle) => battle.slug === slug);
}

export function generateStaticParams() {
  return BATTLES.map((battle) => ({ slug: battle.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const battle = getBattle(params.slug);

  if (!battle) {
    return {
      title: "Battle Not Found",
    };
  }

  return {
    title: battle.name,
    description: battle.description,
  };
}

export default function BattleDetailPage({ params }: Props) {
  const battle = getBattle(params.slug);

  if (!battle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-space pt-20">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Link
          href="/battles"
          className="mb-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Back to battles
        </Link>

        <div className="bento-panel p-8 md:p-10">
          <p
            className="hud-label mb-4"
            style={{ color: battle.eraColor }}
          >
            {battle.yearLabel} | {battle.location}
          </p>

          <h1 className="font-display text-4xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            {battle.name}
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-300">
            {battle.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <MapPin size={16} />
                <span className="hud-label text-slate-500">Location</span>
              </div>
              <p className="text-lg text-white">{battle.location}</p>
            </div>

            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <Star size={16} />
                <span className="hud-label text-slate-500">Outcome</span>
              </div>
              <p className="text-lg text-white">{battle.outcome}</p>
            </div>

            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <Shield size={16} />
                <span className="hud-label text-slate-500">Significance</span>
              </div>
              <p className="text-lg capitalize text-white">{battle.significance}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-6">
              <p className="hud-label mb-4 text-slate-500">Factions</p>
              <div className="flex flex-wrap gap-3">
                {battle.factions.map((faction) => (
                  <span
                    key={faction.name}
                    className="rounded-full border px-4 py-2 text-sm"
                    style={
                      faction.side === "light"
                        ? { color: "#4DACFF", borderColor: "#4DACFF33", background: "#4DACFF14" }
                        : faction.side === "dark"
                          ? { color: "#E60000", borderColor: "#E6000033", background: "#E6000014" }
                          : { color: "#D1D5DB", borderColor: "rgba(209,213,219,0.2)", background: "rgba(209,213,219,0.08)" }
                    }
                  >
                    {faction.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/25 p-6">
              <p className="hud-label mb-4 text-slate-500">Commanders</p>
              <div className="space-y-2">
                {battle.commanders.map((commander) => (
                  <div
                    key={commander}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    {commander}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/25 p-6">
            <p className="hud-label mb-4 text-slate-500">Battle Tags</p>
            <div className="flex flex-wrap gap-2">
              {battle.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
