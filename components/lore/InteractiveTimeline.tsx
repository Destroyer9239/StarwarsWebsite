"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { ERAS, TIMELINE_EVENTS, type TimelineEvent } from "@/lib/data";

const PX_PER_YEAR = 8;
const TRACK_HEIGHT = 420;
const ERA_BAND_HEIGHT = 72;
const EVENT_ROW_HEIGHT = 90;
const ROWS = 4;
const MIN_YEAR = -25100;
const MAX_YEAR = 40;
const CATEGORIES = ["all", "battle", "political", "character", "technology", "force"] as const;

type CategoryFilter = (typeof CATEGORIES)[number];
type PositionedEvent = TimelineEvent & { row: number; x: number; y: number };

function yearToX(year: number) {
  return (year - MIN_YEAR) * PX_PER_YEAR;
}

function formatYear(year: number) {
  return year <= 0 ? `${Math.abs(year).toLocaleString()} BBY` : `${year} ABY`;
}

function assignRows(events: TimelineEvent[]): PositionedEvent[] {
  const sorted = [...events].sort((a, b) => a.year - b.year);
  const rowEnds = Array(ROWS).fill(-Infinity);
  const minSpacing = 220;

  return sorted.map((event) => {
    const x = yearToX(event.year);
    let chosenRow = 0;

    for (let row = 0; row < ROWS; row += 1) {
      if (rowEnds[row] < x - minSpacing) {
        chosenRow = row;
        break;
      }
    }

    rowEnds[chosenRow] = x + minSpacing;
    const y = ERA_BAND_HEIGHT + 60 + chosenRow * EVENT_ROW_HEIGHT;

    return { ...event, row: chosenRow, x, y };
  });
}

function buildThreadPath(events: PositionedEvent[]) {
  if (!events.length) {
    return "";
  }

  return events
    .map((event, index) => {
      if (index === 0) {
        return `M ${event.x} ${event.y}`;
      }

      const previous = events[index - 1];
      const controlX = (previous.x + event.x) / 2;
      return `C ${controlX} ${previous.y}, ${controlX} ${event.y}, ${event.x} ${event.y}`;
    })
    .join(" ");
}

function categoryColor(category: CategoryFilter | TimelineEvent["category"]) {
  const colors: Record<string, string> = {
    all: "#FFD700",
    battle: "#E60000",
    political: "#FFD700",
    character: "#4DACFF",
    technology: "#00D4AA",
    force: "#A855F7",
  };

  return colors[category] ?? "#FFD700";
}

function EventDetail({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) {
  const era = ERAS.find((item) => item.id === event.era);
  const color = categoryColor(event.category);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        className="absolute inset-x-4 bottom-4 z-30 md:inset-x-auto md:left-6 md:w-[420px]"
      >
        <div
          className="tactical-panel rounded-[24px] p-5"
          style={{ borderColor: `${color}55`, boxShadow: `0 0 35px ${color}22` }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="hud-label rounded-full px-2 py-1"
                  style={{ color, background: `${color}1f` }}
                >
                  {event.category}
                </span>
                <span className="hud-label rounded-full bg-white/5 px-2 py-1 text-slate-300">
                  {event.yearLabel}
                </span>
                {era ? (
                  <span
                    className="hud-label rounded-full px-2 py-1"
                    style={{ color: era.color, background: `${era.color}1f` }}
                  >
                    {era.name}
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-white">
                {event.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="button-glow rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"
              aria-label="Close event details"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-sm leading-7 text-slate-300">{event.description}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeEraId, setActiveEraId] = useState<(typeof ERAS)[number]["id"]>(
    ERAS[0]?.id ?? "old-republic"
  );
  const scrollX = useMotionValue(0);

  const allEvents = useMemo(() => assignRows(TIMELINE_EVENTS), []);
  const filteredEvents = useMemo(
    () => (filter === "all" ? allEvents : allEvents.filter((event) => event.category === filter)),
    [allEvents, filter]
  );

  const totalWidth = yearToX(MAX_YEAR) + 320;
  const threadPath = useMemo(() => buildThreadPath(filteredEvents), [filteredEvents]);
  const starsFar = useTransform(scrollX, (value) => -value * 0.12);
  const starsNear = useTransform(scrollX, (value) => -value * 0.24);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const target = yearToX(-32) - container.clientWidth * 0.18;
    container.scrollLeft = Math.max(target, 0);
    scrollX.set(container.scrollLeft);

    const updateActiveEra = () => {
      const centerYear = MIN_YEAR + (container.scrollLeft + container.clientWidth * 0.38) / PX_PER_YEAR;
      const activeEra =
        ERAS.find((era) => centerYear >= era.startYear && centerYear <= era.endYear) ??
        ERAS[ERAS.length - 1];

      if (activeEra) {
        setActiveEraId(activeEra.id);
      }

      scrollX.set(container.scrollLeft);
    };

    updateActiveEra();
    container.addEventListener("scroll", updateActiveEra, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveEra);
  }, [scrollX]);

  useEffect(() => {
    if (selectedEvent && filter !== "all" && selectedEvent.category !== filter) {
      setSelectedEvent(null);
    }
  }, [filter, selectedEvent]);

  const activeEra = ERAS.find((era) => era.id === activeEraId) ?? ERAS[0];

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: containerRef.current.scrollLeft,
    };

    containerRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !containerRef.current) {
      return;
    }

    const delta = event.clientX - dragState.current.startX;
    containerRef.current.scrollLeft = dragState.current.startScrollLeft - delta * 1.25;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    dragState.current.active = false;
    if (containerRef.current.hasPointerCapture(event.pointerId)) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const scrollByAmount = (direction: -1 | 1) => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollLeft += direction * 420;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px,minmax(0,1fr)]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="bento-panel p-6">
          <p className="hud-label mb-3 text-gold/70">Active Era</p>
          <h3
            className="font-display text-3xl font-black uppercase tracking-[0.14em]"
            style={{ color: activeEra?.color ?? "#FFD700" }}
          >
            {activeEra?.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {activeEra?.description}
          </p>
          <p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-slate-500">
            {formatYear(activeEra?.startYear ?? 0)} to {formatYear(activeEra?.endYear ?? 0)}
          </p>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Filter size={14} />
              <span className="hud-label text-slate-400">Event Filter</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const isActive = filter === category;
                const color = categoryColor(category);
                return (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className="button-glow rounded-full border px-3 py-2 font-display text-[11px] uppercase tracking-[0.24em]"
                    style={{
                      color: isActive ? color : "#cbd5e1",
                      background: isActive ? `${color}14` : "rgba(255,255,255,0.04)",
                      borderColor: isActive ? `${color}55` : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {ERAS.map((era) => (
              <div
                key={era.id}
                className="rounded-2xl border px-4 py-3 transition-colors"
                style={{
                  borderColor: activeEraId === era.id ? `${era.color}55` : "rgba(255,255,255,0.08)",
                  background: activeEraId === era.id ? `${era.color}12` : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-xs uppercase tracking-[0.26em]" style={{ color: era.color }}>
                    {era.shortName}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {formatYear(era.startYear)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="hud-label text-slate-500">
            Drag-scroll timeline with parallax layers and connected event thread
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-1)}
              className="button-glow glass rounded-xl border border-white/10 p-3 text-slate-400 hover:text-white"
              aria-label="Scroll timeline left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              className="button-glow glass rounded-xl border border-white/10 p-3 text-slate-400 hover:text-white"
              aria-label="Scroll timeline right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(77,172,255,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(230,0,0,0.16),transparent_24%)]" />

          <div
            ref={containerRef}
            className="timeline-container relative overflow-x-auto overflow-y-hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ height: TRACK_HEIGHT }}
          >
            <motion.div className="timeline-parallax" style={{ x: starsFar }}>
              <svg width={totalWidth} height={TRACK_HEIGHT}>
                {Array.from({ length: 170 }).map((_, index) => {
                  const x = (index * 193) % totalWidth;
                  const y = 18 + ((index * 71) % 150);
                  const radius = index % 7 === 0 ? 1.8 : 1;
                  return <circle key={`far-${index}`} cx={x} cy={y} r={radius} fill="rgba(255,255,255,0.42)" />;
                })}
              </svg>
            </motion.div>

            <motion.div className="timeline-parallax" style={{ x: starsNear }}>
              <svg width={totalWidth} height={TRACK_HEIGHT}>
                {Array.from({ length: 60 }).map((_, index) => {
                  const x = (index * 389) % totalWidth;
                  const y = 170 + ((index * 59) % 180);
                  return <circle key={`near-${index}`} cx={x} cy={y} r={1.5} fill="rgba(255,215,0,0.5)" />;
                })}
              </svg>
            </motion.div>

            <svg
              width={totalWidth}
              height={TRACK_HEIGHT}
              style={{ display: "block", minWidth: totalWidth, position: "relative", zIndex: 2 }}
            >
              {ERAS.map((era) => {
                const x = yearToX(era.startYear);
                const width = yearToX(era.endYear) - x;
                return (
                  <g key={era.id}>
                    <rect x={x} y={0} width={width} height={ERA_BAND_HEIGHT} fill={`${era.color}1a`} />
                    <line x1={x} y1={ERA_BAND_HEIGHT} x2={x} y2={TRACK_HEIGHT} stroke={`${era.color}55`} strokeDasharray="5 6" />
                    <text
                      x={x + 24}
                      y={28}
                      fill={era.color}
                      fontSize="14"
                      fontFamily="Orbitron, monospace"
                      letterSpacing="3"
                    >
                      {era.name.toUpperCase()}
                    </text>
                    <text
                      x={x + 24}
                      y={52}
                      fill="rgba(255,255,255,0.45)"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                    >
                      {era.description}
                    </text>
                  </g>
                );
              })}

              <line
                x1={0}
                y1={ERA_BAND_HEIGHT + 24}
                x2={totalWidth}
                y2={ERA_BAND_HEIGHT + 24}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1}
              />

              {threadPath ? (
                <>
                  <path
                    d={threadPath}
                    fill="none"
                    stroke="rgba(255,215,0,0.18)"
                    strokeWidth={12}
                    strokeLinecap="round"
                  />
                  <path
                    d={threadPath}
                    fill="none"
                    stroke="url(#force-thread)"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </>
              ) : null}

              <defs>
                <linearGradient id="force-thread" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4DACFF" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#E60000" />
                </linearGradient>
              </defs>

              {Array.from({ length: 27 }, (_, index) => -25000 + index * 1000).map((year) => {
                const x = yearToX(year);
                return (
                  <g key={year}>
                    <line
                      x1={x}
                      y1={TRACK_HEIGHT - 52}
                      x2={x}
                      y2={TRACK_HEIGHT - 28}
                      stroke="rgba(255,255,255,0.14)"
                    />
                    <text
                      x={x}
                      y={TRACK_HEIGHT - 8}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.36)"
                      fontSize="10"
                      fontFamily="Orbitron, monospace"
                    >
                      {formatYear(year)}
                    </text>
                  </g>
                );
              })}

              {filteredEvents.map((event) => {
                const color = categoryColor(event.category);
                const isSelected = selectedEvent?.id === event.id;
                const size = event.importance === "critical" ? 14 : event.importance === "major" ? 10 : 8;
                return (
                  <g
                    key={event.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                  >
                    <line
                      x1={event.x}
                      y1={ERA_BAND_HEIGHT + 24}
                      x2={event.x}
                      y2={event.y - 18}
                      stroke={`${color}66`}
                      strokeDasharray="4 6"
                    />
                    {isSelected ? <circle cx={event.x} cy={event.y} r={size + 12} fill={`${color}22`} /> : null}
                    <circle
                      cx={event.x}
                      cy={event.y}
                      r={size + 2}
                      fill="rgba(5,5,5,0.95)"
                      stroke={`${color}55`}
                      strokeWidth={1.5}
                    />
                    <circle
                      cx={event.x}
                      cy={event.y}
                      r={size}
                      fill={color}
                      filter={isSelected ? `drop-shadow(0 0 8px ${color})` : undefined}
                    />
                    <text
                      x={event.x + 16}
                      y={event.y - 8}
                      fill="rgba(255,255,255,0.88)"
                      fontSize="11"
                      fontFamily="Orbitron, monospace"
                    >
                      {event.title}
                    </text>
                    <text
                      x={event.x + 16}
                      y={event.y + 10}
                      fill="rgba(255,255,255,0.42)"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                    >
                      {event.yearLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative border-t border-white/10 px-4 py-3 text-center text-xs text-slate-500">
            Drag to travel the eras. The left rail updates with the currently centered era while the Force Thread highlights filtered events.
          </div>

          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <EventDetail key={selectedEvent.id} event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            ) : null}
          </AnimatePresence>
        </div>

        <p className="text-right text-xs text-slate-600">
          Showing {filteredEvents.length} of {TIMELINE_EVENTS.length} events
        </p>
      </div>
    </div>
  );
}
