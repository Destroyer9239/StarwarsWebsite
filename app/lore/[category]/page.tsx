import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ERAS, LORE_CATEGORIES } from "@/lib/data";

type Props = {
  params: { category: string };
};

function getCategory(id: string) {
  return LORE_CATEGORIES.find((category) => category.id === id);
}

export function generateStaticParams() {
  return LORE_CATEGORIES.map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.category);

  if (!category) {
    return { title: "Lore Category Not Found" };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default function LoreCategoryPage({ params }: Props) {
  const category = getCategory(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-space pt-20">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Link
          href="/lore"
          className="mb-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Back to lore
        </Link>

        <div className="bento-panel p-8 md:p-10">
          <p className="mb-4 text-5xl">{category.icon}</p>
          <p className="hud-label mb-4" style={{ color: category.color }}>
            Lore Category
          </p>
          <h1 className="font-display text-4xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {category.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
              <p className="hud-label text-slate-500">Archive Count</p>
              <p className="mt-3 font-display text-4xl font-black" style={{ color: category.color }}>
                {category.count}
              </p>
            </div>
            <Link
              href="/lore/timeline"
              className="button-glow rounded-[24px] border border-white/10 bg-black/25 p-5"
            >
              <p className="flex items-center gap-2 text-slate-400">
                <Clock size={16} />
                <span className="hud-label text-slate-500">Timeline</span>
              </p>
              <p className="mt-3 text-lg text-white">View the full chronology</p>
            </Link>
            <Link
              href="/lore"
              className="button-glow rounded-[24px] border border-white/10 bg-black/25 p-5"
            >
              <p className="hud-label text-slate-500">Explore More</p>
              <p className="mt-3 flex items-center justify-between text-lg text-white">
                Return to lore hub
                <ArrowRight size={16} />
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-white">
            Explore the Eras
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ERAS.map((era) => (
              <Link
                key={era.id}
                href={`/lore/timeline#${era.id}`}
                className="button-glow rounded-[24px] border border-white/10 bg-black/25 p-5"
              >
                <p className="hud-label mb-3" style={{ color: era.color }}>
                  {era.shortName}
                </p>
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white">
                  {era.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{era.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
