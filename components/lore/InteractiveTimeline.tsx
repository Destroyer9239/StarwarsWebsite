"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Swords, Globe, User, Cpu, Sparkles, Filter, ExternalLink,
} from "lucide-react";
import { ERAS, TIMELINE_EVENTS, type TimelineEvent } from "@/lib/data";

const CATEGORIES = [
  { id: "all", label: "All Events", icon: Filter, color: "#FFE81F" },
  { id: "battle", label: "Battles", icon: Swords, color: "#EF4444" },
  { id: "political", label: "Political", icon: Globe, color: "#FFE81F" },
  { id: "character", label: "Characters", icon: User, color: "#4DACFF" },
  { id: "technology", label: "Technology", icon: Cpu, color: "#00D4AA" },
  { id: "force", label: "Force", icon: Sparkles, color: "#8B5CF6" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

function formatYear(year: number): string {
  return year <= 0 ? `${Math.abs(year).toLocaleString()} BBY` : `${year} ABY`;
}

// ─── Category pill ───────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat || cat.id === "all") return null;
  const Icon = cat.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-display uppercase tracking-widest px-2 py-0.5 rounded-full font-bold"
      style={{ color: cat.color, background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
    >
      <Icon size={9} />
      {cat.label}
    </span>
  );
}

// ─── Single event card ────────────────────────────────────────────────────────
function EventCard({
  event,
  side,
  index,
}: {
  event: TimelineEvent;
  side: "left" | "right";
  index: number;
}) {
  const importanceMap = {
    critical: { border: "2px", glow: 0.3, labelColor: "#EF4444", label: "Critical" },
    major: { border: "1.5px", glow: 0.15, labelColor: "#FFE81F", label: "Major" },
    minor: { border: "1px", glow: 0.05, labelColor: "#94A3B8", label: "Minor" },
  };
  const imp = importanceMap[event.importance];

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex ${side === "left" ? "justify-end pr-8 md:pr-12" : "justify-start pl-8 md:pl-12"} w-full md:w-1/2 ${
        side === "left" ? "md:self-end md:mr-auto" : "md:self-start md:ml-auto"
      }`}
    >
      {/* Connector dot on the spine */}
      <div
        className="absolute top-5 rounded-full z-10"
        style={{
          width: event.importance === "critical" ? 14 : event.importance === "major" ? 10 : 7,
          height: event.importance === "critical" ? 14 : event.importance === "major" ? 10 : 7,
          background: event.eraColor,
          boxShadow: `0 0 ${event.importance === "critical" ? 16 : 8}px ${event.eraColor}${Math.round(imp.glow * 255).toString(16).padStart(2, "0")}`,
          [side === "left" ? "right" : "left"]: side === "left" ? "-7px" : "-7px",
          transform: "translateX(50%)",
          ...(side === "right" ? { transform: "translateX(-50%)" } : {}),
        }}
      />

      {/* Card */}
      <div
        className="max-w-sm w-full rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 group cursor-default"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          border: `${imp.border} solid ${event.eraColor}25`,
          boxShadow: `0 0 30px ${event.eraColor}${Math.round(imp.glow * 120).toString(16).padStart(2, "0")}`,
        }}
      >
        {/* Top row: category + year */}
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <CategoryBadge category={event.category} />
          <span
            className="text-[10px] font-display tracking-widest uppercase font-bold ml-auto"
            style={{ color: event.eraColor }}
          >
            {event.yearLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-opacity-90 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed">
          {event.description}
        </p>

        {/* Importance */}
        {event.importance === "critical" && (
          <div
            className="mt-3 pt-2.5 border-t flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest"
            style={{ borderColor: `${event.eraColor}20`, color: imp.labelColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Pivotal Moment
          </div>
        )}

        {event.linkedSlug && (
          <Link
            href={`/battles/${event.linkedSlug}`}
            className="mt-2 inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-gold transition-colors"
          >
            <ExternalLink size={9} />
            Full battle report
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Era section ──────────────────────────────────────────────────────────────
function EraSection({
  eraId,
  events,
}: {
  eraId: string;
  events: TimelineEvent[];
}) {
  const era = ERAS.find((e) => e.id === eraId)!;
  if (!era || events.length === 0) return null;

  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div id={eraId} className="relative mb-6">
      {/* Era header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center gap-4 py-5 px-6 mb-8 rounded-2xl overflow-hidden"
        style={{ background: `${era.color}10`, border: `1px solid ${era.color}25` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 0% 50%, ${era.color}15 0%, transparent 70%)`,
          }}
        />
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: era.color, boxShadow: `0 0 12px ${era.color}` }}
        />
        <div className="relative">
          <div
            className="font-display text-lg md:text-xl font-black uppercase tracking-[0.12em]"
            style={{ color: era.color }}
          >
            {era.name}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{era.description}</div>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <div className="font-display text-xs text-slate-600 uppercase tracking-wider">
            {formatYear(era.startYear)} — {formatYear(era.endYear)}
          </div>
          <div className="text-xs text-slate-700 mt-0.5">{events.length} events</div>
        </div>
      </motion.div>

      {/* Vertical spine + cards */}
      <div className="relative">
        {/* Center line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{
            background: `linear-gradient(to bottom, transparent, ${era.color}50 10%, ${era.color}50 90%, transparent)`,
            boxShadow: `0 0 8px ${era.color}30`,
          }}
        />
        {/* Mobile side line */}
        <div
          className="absolute left-3 top-0 bottom-0 w-px md:hidden"
          style={{
            background: `linear-gradient(to bottom, transparent, ${era.color}50 10%, ${era.color}50 90%, transparent)`,
          }}
        />

        {/* Events */}
        <div className="flex flex-col gap-8">
          {sorted.map((evt, i) => {
            const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
            return (
              <div key={evt.id} className="relative flex md:flex-row flex-col items-start">
                {/* Desktop alternating */}
                <div className="hidden md:flex w-full items-start">
                  {side === "left" ? (
                    <>
                      <div className="w-1/2 flex justify-end pr-12">
                        <EventCard event={evt} side="left" index={i} />
                      </div>
                      <div className="w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2" />
                      <div className="w-1/2 flex justify-start pl-12">
                        <EventCard event={evt} side="right" index={i} />
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile: all on right of line */}
                <div className="md:hidden pl-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    className="relative"
                  >
                    {/* Connector dot */}
                    <div
                      className="absolute -left-8 top-5 rounded-full"
                      style={{
                        width: evt.importance === "critical" ? 12 : 8,
                        height: evt.importance === "critical" ? 12 : 8,
                        background: era.color,
                        left: "-1.5rem",
                        boxShadow: `0 0 8px ${era.color}60`,
                      }}
                    />
                    <div
                      className="rounded-2xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(16px)",
                        border: `1px solid ${era.color}25`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                        <CategoryBadge category={evt.category} />
                        <span className="text-[10px] font-display tracking-widest uppercase font-bold ml-auto" style={{ color: era.color }}>
                          {evt.yearLabel}
                        </span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-white leading-snug mb-1.5">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function InteractiveTimeline() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filtered =
    activeCategory === "all"
      ? TIMELINE_EVENTS
      : TIMELINE_EVENTS.filter((e) => e.category === activeCategory);

  const byEra = ERAS.reduce<Record<string, TimelineEvent[]>>((acc, era) => {
    acc[era.id] = filtered.filter((e) => e.era === era.id);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 items-center">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-display uppercase tracking-wider font-bold transition-all duration-200"
              style={
                active
                  ? {
                      color: cat.color,
                      background: `${cat.color}18`,
                      border: `1px solid ${cat.color}40`,
                      boxShadow: `0 0 12px ${cat.color}20`,
                    }
                  : {
                      color: "#64748b",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              <Icon size={11} />
              {cat.label}
            </button>
          );
        })}
        <span className="ml-auto text-xs text-slate-600">
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Era jump links */}
      <div className="flex flex-wrap gap-2">
        {ERAS.map((era) => (
          <a
            key={era.id}
            href={`#${era.id}`}
            className="text-[10px] font-display uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all duration-200 hover:opacity-100"
            style={{
              color: era.color,
              background: `${era.color}10`,
              border: `1px solid ${era.color}20`,
              opacity: byEra[era.id]?.length ? 0.8 : 0.3,
            }}
          >
            {era.shortName}
          </a>
        ))}
      </div>

      {/* Timeline sections */}
      <div className="space-y-16">
        {ERAS.map((era) => (
          <EraSection key={era.id} eraId={era.id} events={byEra[era.id] ?? []} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-600">
          <p className="font-display text-sm uppercase tracking-widest">No events in this category</p>
        </div>
      )}
    </div>
  );
}
