"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { ERAS, TIMELINE_EVENTS, type TimelineEvent } from "@/lib/data";

// ===== LAYOUT CONSTANTS =====
const PX_PER_YEAR = 8;
const TRACK_HEIGHT = 180;
const ERA_BAND_HEIGHT = 28;
const EVENT_ROW_HEIGHT = 70;
const ROWS = 3;

const CATEGORIES = ["all", "battle", "political", "character", "technology", "force"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

function yearToX(year: number): number {
  const MIN_YEAR = -25100;
  return (year - MIN_YEAR) * PX_PER_YEAR;
}

function formatYear(year: number): string {
  return year <= 0
    ? `${Math.abs(year).toLocaleString()} BBY`
    : `${year} ABY`;
}

// Assign events to rows to prevent overlap
function assignRows(events: TimelineEvent[]): (TimelineEvent & { row: number })[] {
  const sorted = [...events].sort((a, b) => a.year - b.year);
  const rowEnds: number[] = Array(ROWS).fill(-Infinity);
  const MIN_SPACING = 150;

  return sorted.map((evt) => {
    const x = yearToX(evt.year);
    let chosenRow = 0;
    let minEnd = Infinity;
    for (let r = 0; r < ROWS; r++) {
      if (rowEnds[r] < x - MIN_SPACING && rowEnds[r] < minEnd) {
        minEnd = rowEnds[r];
        chosenRow = r;
      }
    }
    rowEnds[chosenRow] = x + MIN_SPACING;
    return { ...evt, row: chosenRow };
  });
}

// ===== EVENT NODE =====
function EventNode({
  event,
  isSelected,
  onClick,
}: {
  event: TimelineEvent & { row: number };
  isSelected: boolean;
  onClick: () => void;
}) {
  const x = yearToX(event.year);
  const y = ERA_BAND_HEIGHT + 20 + event.row * EVENT_ROW_HEIGHT;

  const sizeMap = { critical: 14, major: 10, minor: 7 };
  const size = sizeMap[event.importance];

  const categoryColors: Record<string, string> = {
    battle: "#EF4444",
    political: "#FFE81F",
    character: "#4DACFF",
    technology: "#00D4AA",
    force: "#8B5CF6",
  };
  const color = categoryColors[event.category] ?? "#888";

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: Math.random() * 0.3 }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Connector line to timeline axis */}
      <line
        x1={x}
        y1={ERA_BAND_HEIGHT + 4}
        x2={x}
        y2={y - size - 4}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="3,3"
      />
      {/* Outer glow ring when selected */}
      {isSelected && (
        <circle cx={x} cy={y} r={size + 8} fill={color} fillOpacity={0.15} />
      )}
      {/* Main node */}
      <circle
        cx={x}
        cy={y}
        r={size}
        fill={isSelected ? color : `${color}33`}
        stroke={color}
        strokeWidth={isSelected ? 2 : 1.5}
        filter={isSelected ? `drop-shadow(0 0 6px ${color})` : undefined}
      />
      {/* Inner dot */}
      <circle cx={x} cy={y} r={size * 0.35} fill={color} />

      {/* Year label */}
      <text
        x={x}
        y={ERA_BAND_HEIGHT - 6}
        textAnchor="middle"
        fill={color}
        fontSize={9}
        fontFamily="Orbitron, monospace"
        fillOpacity={0.8}
      >
        {formatYear(event.year)}
      </text>
    </motion.g>
  );
}

// ===== DETAIL POPUP =====
function EventDetail({ event, onClose }: { event: TimelineEvent; onClose: () => void }) {
  const categoryColors: Record<string, string> = {
    battle: "#EF4444",
    political: "#FFE81F",
    character: "#4DACFF",
    technology: "#00D4AA",
    force: "#8B5CF6",
  };
  const color = categoryColors[event.category] ?? "#888";

  const era = ERAS.find((e) => e.id === event.era);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md"
      >
        <div
          className="glass rounded-2xl p-5 shadow-2xl border"
          style={{ borderColor: `${color}30` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-display tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ color, background: `${color}15` }}
                >
                  {event.category}
                </span>
                <span
                  className="text-xs font-display tracking-wider uppercase px-2 py-0.5 rounded"
                  style={{ color: era?.color, background: `${era?.color}15` }}
                >
                  {event.yearLabel}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white">{event.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{event.description}</p>
          {era && (
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-500">
              Era: <span style={{ color: era.color }}>{era.name}</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ===== MAIN COMPONENT =====
export function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const allEvents = assignRows(TIMELINE_EVENTS);
  const filteredEvents =
    filter === "all" ? allEvents : allEvents.filter((e) => e.category === filter);

  const totalWidth = yearToX(40) + 200; // rightmost point + padding
  const svgHeight = ERA_BAND_HEIGHT + 20 + ROWS * EVENT_ROW_HEIGHT + 20;

  // Drag scroll
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    scrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const delta = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - delta;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Scroll to present (0 ABY/BBY)
  useEffect(() => {
    if (containerRef.current) {
      const centerX = yearToX(0);
      containerRef.current.scrollLeft =
        centerX - containerRef.current.clientWidth / 2;
    }
  }, []);

  const scroll = (dir: -1 | 1) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += dir * 400;
    }
  };

  const categoryColors: Record<string, string> = {
    all: "#FFE81F",
    battle: "#EF4444",
    political: "#FFE81F",
    character: "#4DACFF",
    technology: "#00D4AA",
    force: "#8B5CF6",
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-500" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-display uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                filter === cat
                  ? "border-current font-bold"
                  : "border-white/10 text-slate-500 hover:text-slate-300"
              }`}
              style={
                filter === cat
                  ? {
                      color: categoryColors[cat],
                      background: `${categoryColors[cat]}15`,
                      borderColor: `${categoryColors[cat]}40`,
                    }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="p-2 glass rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 glass rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Era legend */}
      <div className="flex flex-wrap gap-3">
        {ERAS.map((era) => (
          <div key={era.id} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span
              className="w-2 h-2 rounded-sm flex-shrink-0"
              style={{ background: era.color }}
            />
            {era.shortName}
          </div>
        ))}
      </div>

      {/* Timeline canvas */}
      <div className="relative glass rounded-2xl border border-white/10 overflow-hidden">
        <div
          ref={containerRef}
          className="timeline-container overflow-x-scroll select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{ height: svgHeight + 8 }}
        >
          <svg
            width={totalWidth}
            height={svgHeight}
            style={{ display: "block", minWidth: totalWidth }}
          >
            {/* Era bands */}
            {ERAS.map((era) => {
              const x1 = yearToX(era.startYear);
              const x2 = yearToX(era.endYear);
              return (
                <g key={era.id}>
                  <rect
                    x={x1}
                    y={0}
                    width={x2 - x1}
                    height={ERA_BAND_HEIGHT}
                    fill={era.color}
                    fillOpacity={0.15}
                  />
                  <rect
                    x={x1}
                    y={0}
                    width={x2 - x1}
                    height={ERA_BAND_HEIGHT}
                    fill="none"
                    stroke={era.color}
                    strokeWidth={1}
                    strokeOpacity={0.3}
                  />
                  <text
                    x={x1 + (x2 - x1) / 2}
                    y={ERA_BAND_HEIGHT / 2 + 4}
                    textAnchor="middle"
                    fill={era.color}
                    fontSize={9}
                    fontFamily="Orbitron, monospace"
                    fillOpacity={0.9}
                  >
                    {era.shortName.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Timeline axis */}
            <line
              x1={0}
              y1={ERA_BAND_HEIGHT + 4}
              x2={totalWidth}
              y2={ERA_BAND_HEIGHT + 4}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />

            {/* Year tick marks every 5 years in modern era, 1000 in ancient */}
            {Array.from({ length: 80 }, (_, i) => i - 35).map((yr) => {
              const x = yearToX(yr);
              return (
                <g key={yr}>
                  <line
                    x1={x}
                    y1={ERA_BAND_HEIGHT + 1}
                    x2={x}
                    y2={ERA_BAND_HEIGHT + 8}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                  />
                  {yr % 10 === 0 && (
                    <text
                      x={x}
                      y={svgHeight - 4}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.2)"
                      fontSize={8}
                      fontFamily="monospace"
                    >
                      {formatYear(yr)}
                    </text>
                  )}
                </g>
              );
            })}

            {/* "Now" line at 0 ABY */}
            <line
              x1={yearToX(0)}
              y1={ERA_BAND_HEIGHT}
              x2={yearToX(0)}
              y2={svgHeight - 20}
              stroke="rgba(255,232,31,0.4)"
              strokeWidth={1}
              strokeDasharray="4,3"
            />
            <text
              x={yearToX(0) + 4}
              y={ERA_BAND_HEIGHT + 14}
              fill="rgba(255,232,31,0.6)"
              fontSize={8}
              fontFamily="Orbitron, monospace"
            >
              Battle of Yavin
            </text>

            {/* Events */}
            {filteredEvents.map((evt) => (
              <EventNode
                key={evt.id}
                event={evt}
                isSelected={selectedEvent?.id === evt.id}
                onClick={() =>
                  setSelectedEvent(selectedEvent?.id === evt.id ? null : evt)
                }
              />
            ))}
          </svg>
        </div>

        {/* Detail popup */}
        <div className="relative px-4 pb-2 min-h-0">
          <AnimatePresence mode="wait">
            {selectedEvent && (
              <EventDetail
                key={selectedEvent.id}
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </AnimatePresence>
          {!selectedEvent && (
            <p className="text-center text-xs text-slate-600 py-3 italic">
              Click any event node to learn more · Drag to scroll
            </p>
          )}
        </div>
      </div>

      {/* Event count */}
      <p className="text-xs text-slate-600 text-right">
        Showing {filteredEvents.length} of {TIMELINE_EVENTS.length} events
      </p>
    </div>
  );
}
