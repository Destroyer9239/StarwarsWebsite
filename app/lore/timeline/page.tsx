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
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <StarField numStars={150} speed={0.05} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Galactic History"
            title="Interactive Timeline"
            description="25,000 years of Star Wars history. Drag to explore, click events to learn more."
          />
          <InteractiveTimeline />
        </div>
      </div>

      {/* Era deep-dives */}
      <div className="px-4 pb-24 max-w-7xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide mb-8 mt-12">
          Eras of the Galaxy
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ERAS.map((era, i) => (
            <div
              key={era.id}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-opacity-30 transition-all duration-300 group"
              style={{ borderColor: `${era.color}15` }}
              id={era.id}
            >
              <div
                className="w-3 h-3 rounded-full mb-4 group-hover:scale-125 transition-transform duration-300"
                style={{ background: era.color, boxShadow: `0 0 12px ${era.color}` }}
              />
              <h3
                className="font-display text-base font-bold uppercase tracking-wider mb-1"
                style={{ color: era.color }}
              >
                {era.name}
              </h3>
              <p className="text-xs text-slate-500 mb-3 font-display tracking-widest">
                {era.startYear > 0
                  ? `${era.startYear} ABY`
                  : `${Math.abs(era.startYear).toLocaleString()} BBY`}{" "}
                —{" "}
                {era.endYear > 0
                  ? `${era.endYear} ABY`
                  : `${Math.abs(era.endYear).toLocaleString()} BBY`}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">{era.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
