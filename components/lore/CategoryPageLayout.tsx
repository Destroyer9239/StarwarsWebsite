import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Stat = {
  label: string;
  value: string;
};

type SectionItem = {
  title: string;
  description: string;
  meta?: string;
};

type Section = {
  title: string;
  eyebrow?: string;
  items: SectionItem[];
};

export function CategoryPageLayout({
  backHref = "/lore",
  backLabel = "Back to lore",
  eyebrow,
  title,
  description,
  accentColor,
  stats,
  sections,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
  stats: Stat[];
  sections: Section[];
}) {
  return (
    <div className="min-h-screen bg-space pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>

        <div className="bento-panel p-8 md:p-10">
          <p className="hud-label mb-4" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-black uppercase tracking-[0.12em] text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300">
            {description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
                <p className="hud-label text-slate-500">{stat.label}</p>
                <p className="mt-3 font-display text-3xl font-black uppercase tracking-[0.1em]" style={{ color: accentColor }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="bento-panel p-6 md:p-8">
              {section.eyebrow ? (
                <p className="hud-label mb-3" style={{ color: accentColor }}>
                  {section.eyebrow}
                </p>
              ) : null}
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-white">
                {section.title}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-black/25 p-5"
                  >
                    <h3 className="font-display text-lg font-bold uppercase tracking-[0.1em] text-white">
                      {item.title}
                    </h3>
                    {item.meta ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                        {item.meta}
                      </p>
                    ) : null}
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
