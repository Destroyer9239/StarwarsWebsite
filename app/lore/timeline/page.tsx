import type { Metadata } from "next";
import { InteractiveTimeline } from "@/components/lore/InteractiveTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarField } from "@/components/ui/StarField";
import { ERAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Interactive Timeline",
  description: "Explore every era of Star Wars history on an interactive scrollable timeline.",
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-space pt-20">
      <section className="relative overflow-hidden px-4 py-16 md:py-20">
        <div className="absolute inset-0">
          <StarField numStars={220} speed={0.04} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(77,172,255,0.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(230,0,0,0.12),transparent_20%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Galactic History"
            title="Interactive Timeline"
            description="A drag-scroll chronicle of the Star Wars galaxy with parallax starfields, a connected Force Thread, and era context that updates as you move."
          />

          <div className="mb-8 grid gap-4 lg:grid-cols-[1.3fr,0.9fr,0.9fr]">
            <div className="bento-panel p-6 lg:col-span-2">
              <p className="hud-label mb-3 text-gold/70">Mission Brief</p>
              <h2 className="font-display text-2xl font-black uppercase tracking-[0.14em] text-white md:text-3xl">
                Navigate 25,000 years of Jedi, Sith, war, and rebirth
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                This rework turns the timeline into the centerpiece instead of a static list.
                Use drag-scroll to move across eras, filter events by category, and open individual nodes
                for deeper context without losing your place.
              </p>
            </div>

            <div className="bento-panel flex flex-col justify-between p-6">
              <div>
                <p className="hud-label mb-3 text-slate-500">Timeline Signal</p>
                <div className="font-display text-5xl font-black uppercase tracking-[0.12em] text-gold">
                  {ERAS.length}
                </div>
                <p className="mt-2 text-sm text-slate-400">Major eras currently mapped in the chronology.</p>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="hud-label text-slate-500">Interface Notes</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Sticky era headers stay readable while the timeline canvas keeps the large-scale history in motion.
                </p>
              </div>
            </div>
          </div>

          <InteractiveTimeline />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-24 lg:grid-cols-12">
        {ERAS.map((era, index) => {
          const spanClass =
            index === 0
              ? "lg:col-span-5"
              : index === 3
                ? "lg:col-span-4"
                : index === 4
                  ? "lg:col-span-4"
                  : "lg:col-span-3";

          return (
            <article
              key={era.id}
              id={era.id}
              className={`bento-panel p-6 ${spanClass}`}
              style={{ borderColor: `${era.color}33` }}
            >
              <div
                className="mb-4 h-1.5 w-20 rounded-full"
                style={{ background: `linear-gradient(90deg, ${era.color}, transparent)` }}
              />
              <p className="hud-label mb-3" style={{ color: era.color }}>
                {era.shortName}
              </p>
              <h3 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-white">
                {era.name}
              </h3>
              <p className="mt-2 font-display text-xs uppercase tracking-[0.28em] text-slate-500">
                {era.startYear <= 0 ? `${Math.abs(era.startYear).toLocaleString()} BBY` : `${era.startYear} ABY`}
                {" "}to{" "}
                {era.endYear <= 0 ? `${Math.abs(era.endYear).toLocaleString()} BBY` : `${era.endYear} ABY`}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{era.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
