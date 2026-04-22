import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2, Star, Trophy } from "lucide-react";
import { GAMES } from "@/lib/data";

type Props = {
  params: { slug: string };
};

function getGame(slug: string) {
  return GAMES.find((game) => game.slug === slug);
}

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const game = getGame(params.slug);

  if (!game) {
    return { title: "Game Not Found" };
  }

  return {
    title: game.title,
    description: game.description,
  };
}

export default function GameDetailPage({ params }: Props) {
  const game = getGame(params.slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-space pt-20">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Link
          href="/games"
          className="mb-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Back to games
        </Link>

        <div className="bento-panel p-8 md:p-10">
          <p className="hud-label mb-4 text-force/70">Star Wars Gaming Archive</p>
          <h1 className="font-display text-4xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            {game.title}
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-300">{game.description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <Gamepad2 size={16} />
                <span className="hud-label text-slate-500">Developer</span>
              </div>
              <p className="text-lg text-white">{game.developer}</p>
            </div>
            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <Star size={16} />
                <span className="hud-label text-slate-500">Release</span>
              </div>
              <p className="text-lg text-white">{game.releaseYear}</p>
            </div>
            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="mb-3 flex items-center gap-2 text-slate-400">
                <Trophy size={16} />
                <span className="hud-label text-slate-500">Era</span>
              </div>
              <p className="text-lg text-white">{game.era}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-6">
              <p className="hud-label mb-4 text-slate-500">Genres</p>
              <div className="flex flex-wrap gap-2">
                {game.genre.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/25 p-6">
              <p className="hud-label mb-4 text-slate-500">Platforms</p>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/25 p-6">
            <p className="hud-label mb-4 text-slate-500">Quick Facts</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Publisher</p>
                <p className="mt-2 text-slate-200">{game.publisher}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Metacritic</p>
                <p className="mt-2 text-slate-200">{game.metacritic ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Featured</p>
                <p className="mt-2 text-slate-200">{game.featured ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
