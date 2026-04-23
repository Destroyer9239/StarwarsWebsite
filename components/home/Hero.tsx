"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Swords, Gamepad2, Wrench, Search, ArrowRight, Sparkles } from "lucide-react";

// ─── Warp-star canvas ───────────────────────────────────────────────────────
function WarpCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, cx = 0, cy = 0;
    let raf = 0;
    let phase: "warp" | "settle" = "warp";
    let phaseT = 0;

    interface Star { x: number; y: number; z: number; pz: number }
    const NUM = 500;
    const stars: Star[] = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W / 2; cy = H / 2;
    };

    const init = () => {
      for (let i = 0; i < NUM; i++) {
        stars[i] = { x: (Math.random() - 0.5) * W, y: (Math.random() - 0.5) * H, z: Math.random() * W, pz: 0 };
      }
    };

    const draw = () => {
      phaseT++;
      if (phaseT > 120) phase = "settle";

      ctx.fillStyle = "rgba(3,7,18,0.4)";
      ctx.fillRect(0, 0, W, H);

      const speed = phase === "warp" ? Math.max(2, 30 - phaseT * 0.22) : 1.2;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * W;
          s.y = (Math.random() - 0.5) * H;
          s.z = W;
          s.pz = W;
        }
        const sx = (s.x / s.z) * W + cx;
        const sy = (s.y / s.z) * H + cy;
        const px = (s.x / s.pz) * W + cx;
        const py = (s.y / s.pz) * H + cy;

        const r  = Math.max(0.3, (1 - s.z / W) * 2.5);
        const op = Math.min(1, (1 - s.z / W) * 1.5);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = phase === "warp"
          ? `rgba(200,220,255,${op})`
          : `rgba(255,255,255,${op * 0.7})`;
        ctx.lineWidth = r;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    init();
    draw();

    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Section cards ──────────────────────────────────────────────────────────
const CARDS = [
  {
    label: "Lore",
    sub: "Timeline · Characters · Planets",
    href: "/lore",
    icon: BookOpen,
    color: "#4DACFF",
    stat: "800+",
    statLabel: "Articles",
  },
  {
    label: "Battles",
    sub: "Every conflict across all eras",
    href: "/battles",
    icon: Swords,
    color: "#EF4444",
    stat: "143",
    statLabel: "Battles",
  },
  {
    label: "Games",
    sub: "Classic to modern titles",
    href: "/games",
    icon: Gamepad2,
    color: "#00D4AA",
    stat: "20+",
    statLabel: "Titles",
  },
  {
    label: "Mods",
    sub: "Galactic Contention & more",
    href: "/mods",
    icon: Wrench,
    color: "#FFE81F",
    stat: "Live",
    statLabel: "Updates",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-space">
      <WarpCanvas />

      {/* Dark vignette over canvas */}
      <div className="absolute inset-0 bg-radial-dark pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-gold/40" />
          <span className="flex items-center gap-1.5 text-xs font-display tracking-[0.4em] text-gold/70 uppercase">
            <Sparkles size={10} className="text-gold" />
            The Complete Star Wars Encyclopedia
            <Sparkles size={10} className="text-gold" />
          </span>
          <span className="h-px w-10 bg-gold/40" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-black leading-[0.88] tracking-[0.06em] uppercase select-none"
            style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
          >
            <span
              className="block text-gold-shimmer"
              style={{ textShadow: "0 0 80px rgba(255,232,31,0.4), 0 0 160px rgba(255,232,31,0.15)" }}
            >
              Galactic
            </span>
            <span
              className="block text-white"
              style={{ textShadow: "0 0 60px rgba(255,255,255,0.08)" }}
            >
              Archives
            </span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="my-8 w-64 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="text-slate-400 text-lg md:text-xl font-light tracking-wider mb-10 italic"
        >
          A long time ago in a galaxy far, far away&hellip;
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="w-full max-w-2xl mb-14"
        >
          <div className="relative glass rounded-2xl border border-white/10 hover:border-gold/30 focus-within:border-gold/50 focus-within:shadow-gold transition-all duration-300">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search battles, characters, planets, games…"
              className="w-full bg-transparent pl-13 pr-36 py-4 text-white placeholder-slate-600 outline-none text-base"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-gold hover:bg-gold-dim text-black font-bold text-sm rounded-xl transition-colors duration-200 font-display tracking-wide">
              Search
            </button>
          </div>
        </motion.div>

        {/* Nav cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.1 }}
            >
              <Link href={card.href} className="group block">
                <div
                  className="relative glass rounded-2xl p-5 border border-white/[0.07] h-full transition-all duration-300 group-hover:-translate-y-2 overflow-hidden"
                  style={{ "--card-color": card.color } as React.CSSProperties}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                  />
                  {/* Hover glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}0a 0%, transparent 70%)` }}
                  />
                  <div className="relative">
                    <card.icon size={22} className="mb-3 transition-transform duration-300 group-hover:scale-110" style={{ color: card.color }} />
                    <div className="font-display text-base font-bold text-white uppercase tracking-wider mb-1 group-hover:text-white transition-colors">
                      {card.label}
                    </div>
                    <div className="text-xs text-slate-500 mb-4 leading-relaxed">{card.sub}</div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-display text-2xl font-black" style={{ color: card.color }}>{card.stat}</div>
                        <div className="text-xs text-slate-600 uppercase tracking-widest">{card.statLabel}</div>
                      </div>
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="flex items-center gap-8 md:gap-16 text-center"
        >
          {[
            { v: "36,000+", l: "Years of History" },
            { v: "7", l: "Eras Covered" },
            { v: "143", l: "Battles" },
            { v: "Free", l: "Always" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-display text-xl md:text-2xl font-black text-gold">{s.v}</div>
              <div className="text-xs text-slate-600 uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
