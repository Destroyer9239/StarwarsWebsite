"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ExternalLink,
  Users,
  Map,
  Swords,
  Download,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Shield,
  Crosshair,
  Zap,
} from "lucide-react";
import { StarField } from "@/components/ui/StarField";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ===== DATA =====
const FACTIONS = [
  {
    id: "republic",
    name: "Galactic Republic",
    shortName: "GAR",
    era: "Clone Wars",
    description:
      "The democratic government of the galaxy, defended by the Grand Army of the Republic. Clone troopers fight alongside their Jedi generals against the Separatist droid armies.",
    units: ["Clone Trooper", "ARF Trooper", "ARC Trooper", "Jedi Commander", "AT-RT Driver", "Clone Pilot"],
    vehicles: ["AT-RT Walker", "LAAT Gunship", "TX-130 Fighter Tank", "BARC Speeder"],
    color: "#4DACFF",
    accentColor: "#1A3A8F",
    side: "light" as const,
  },
  {
    id: "cis",
    name: "Separatist Alliance",
    shortName: "CIS",
    era: "Clone Wars",
    description:
      "The Confederacy of Independent Systems, backed by Count Dooku and the dark forces of the Sith. Their endless droid armies overwhelm through sheer numbers.",
    units: ["B1 Battle Droid", "B2 Super Battle Droid", "BX Commando Droid", "Droideka", "MagnaGuard", "Geonosian Warrior"],
    vehicles: ["AAT Battle Tank", "Hailfire Droid", "Droid Gunship", "STAP"],
    color: "#EF4444",
    accentColor: "#6B0000",
    side: "dark" as const,
  },
  {
    id: "empire",
    name: "Galactic Empire",
    shortName: "ISF",
    era: "Galactic Civil War",
    description:
      "The authoritarian regime that replaced the Republic. Imperial stormtroopers enforce the Emperor's will across the galaxy with iron-fisted military might.",
    units: ["Stormtrooper", "Scout Trooper", "Snowtrooper", "Death Trooper", "Imperial Officer", "TIE Pilot"],
    vehicles: ["AT-AT Walker", "AT-ST Walker", "TIE Fighter", "TIE Interceptor", "Imperial Speeder Bike"],
    color: "#9CA3AF",
    accentColor: "#1F2937",
    side: "dark" as const,
  },
  {
    id: "rebels",
    name: "Rebel Alliance",
    shortName: "DERA",
    era: "Galactic Civil War",
    description:
      "Freedom fighters united against the tyranny of the Empire. The Alliance fights with guerrilla tactics, X-Wings, and the unshakeable belief that freedom is worth dying for.",
    units: ["Rebel Trooper", "Pathfinder", "Sharpshooter", "Vanguard", "A-Wing Pilot", "Bothan Spy"],
    vehicles: ["T-47 Airspeeder", "X-34 Landspeeder", "X-Wing", "Y-Wing", "Rebel Speeder Bike"],
    color: "#F59E0B",
    accentColor: "#7C2D12",
    side: "light" as const,
  },
];

const MAPS = [
  {
    name: "Geonosis",
    description: "Rocky desert world with ancient ruins, CIS droid foundries and clone landing zones. The site of the first battle of the Clone Wars.",
    era: "Clone Wars",
    eraColor: "#F59E0B",
    size: "Large",
    modes: ["AAS", "RAAS", "Invasion"],
  },
  {
    name: "Kamino",
    description: "The ocean world where clone troopers were born. Battle across the cloning facility platforms above endless stormy seas.",
    era: "Clone Wars",
    eraColor: "#F59E0B",
    size: "Medium",
    modes: ["AAS", "RAAS"],
  },
  {
    name: "Utapau",
    description: "Sinkhole planet with massive vertical fighting across canyon cities and cave systems. Obi-Wan defeated Grievous here.",
    era: "Clone Wars",
    eraColor: "#F59E0B",
    size: "Large",
    modes: ["AAS", "RAAS", "Invasion"],
  },
  {
    name: "Tatooine",
    description: "Twin-sunned desert world with canyon battles, Mos Eisley streets and Jabba's palace approaches.",
    era: "Civil War",
    eraColor: "#EF4444",
    size: "Large",
    modes: ["AAS", "RAAS"],
  },
  {
    name: "Hoth",
    description: "Frozen tundra battles around Echo Base. Imperial AT-AT assaults vs Rebel ion cannon defenses. Pure chaos.",
    era: "Civil War",
    eraColor: "#EF4444",
    size: "Large",
    modes: ["Invasion", "RAAS"],
  },
  {
    name: "Scarif",
    description: "Tropical paradise turned warzone. Rebels fight desperately to transmit the Death Star plans from the Imperial data vault.",
    era: "Civil War",
    eraColor: "#EF4444",
    size: "Large",
    modes: ["Invasion", "AAS"],
  },
];

const GAME_MODES = [
  {
    name: "AAS",
    fullName: "Advance and Secure",
    description: "Teams fight to capture and hold a series of objectives in sequence. Classic tactical push.",
    icon: Swords,
    color: "#4DACFF",
  },
  {
    name: "RAAS",
    fullName: "Random Advance and Secure",
    description: "Like AAS but objective layouts are randomized. Requires adaptability and real-time scouting.",
    icon: Map,
    color: "#FFE81F",
  },
  {
    name: "Invasion",
    fullName: "Invasion",
    description: "One faction attacks, one defends. Attackers push through layered defensive positions. Maximum chaos.",
    icon: Crosshair,
    color: "#EF4444",
  },
];

const INSTALL_STEPS = [
  {
    step: 1,
    title: "Own Squad",
    description: "Purchase Squad on Steam. Galactic Contention is a free total conversion mod that requires Squad to play.",
    action: "Buy on Steam",
  },
  {
    step: 2,
    title: "Subscribe on Workshop",
    description: "Head to the Steam Workshop page for Galactic Contention and click Subscribe. Steam will automatically download the mod.",
    action: "Open Workshop",
  },
  {
    step: 3,
    title: "Launch Squad",
    description: "Start Squad and navigate to the Mod menu. Select Galactic Contention and click 'Play Mod'.",
    action: null,
  },
  {
    step: 4,
    title: "Find a Server",
    description: "In the server browser, filter by Galactic Contention. Join a server, pick your faction and squad, and may the Force be with you.",
    action: "Join Discord",
  },
];

// ===== SECTION COMPONENTS =====
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <StarField numStars={400} speed={0.1} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="nebula w-[800px] h-[500px] bg-era-republic/[0.08] top-[-200px] left-[-300px] rounded-full blur-[100px]" />
        <div className="nebula w-[600px] h-[400px] bg-sith/[0.07] bottom-[-100px] right-[-200px] rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-16 bg-gold/30" />
          <span className="font-display text-xs tracking-[0.4em] text-gold/60 uppercase">
            Total Conversion for Squad
          </span>
          <span className="h-px w-16 bg-gold/30" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="font-display font-black text-6xl md:text-8xl uppercase tracking-[0.08em] leading-none mb-6"
        >
          <span className="block text-gold-shimmer text-glow-gold">Galactic</span>
          <span className="block text-white">Contention</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fight the Clone Wars and Galactic Civil War in the hyper-realistic Squad engine.
          Authentic Star Wars units, vehicles, and maps — tactical squad gameplay redefined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://discord.gg/galactic-contention"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold-dim transition-all duration-200 text-sm font-display tracking-wide"
          >
            <MessageCircle size={16} />
            Join Discord
          </a>
          <a
            href="#install"
            className="flex items-center gap-2 px-6 py-3 glass border border-white/20 text-white rounded-xl hover:border-white/40 transition-all duration-200 text-sm font-medium"
          >
            <Download size={16} />
            Installation Guide
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "4", label: "Factions" },
            { value: "2", label: "Eras" },
            { value: "50v50", label: "Players" },
            { value: "Free", label: "Price" },
          ].map((s) => (
            <div key={s.label} className="glass-gold rounded-xl p-4 text-center">
              <div className="font-display text-2xl font-black text-gold">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} className="text-gold/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FactionsSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Choose Your Side" title="Factions" description="Four factions across two eras of Star Wars history." />

        <div className="grid md:grid-cols-2 gap-5">
          {FACTIONS.map((faction, i) => {
            const isOpen = selected === faction.id;
            return (
              <motion.div
                key={faction.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 transition-all duration-300"
                style={{ borderColor: isOpen ? `${faction.color}30` : undefined }}
              >
                {/* Header */}
                <button
                  className="w-full p-6 text-left"
                  onClick={() => setSelected(isOpen ? null : faction.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm"
                        style={{ background: `${faction.color}20`, color: faction.color, border: `1px solid ${faction.color}30` }}
                      >
                        {faction.shortName}
                      </div>
                      <div>
                        <h3
                          className="font-display text-base font-bold uppercase tracking-wide"
                          style={{ color: faction.color }}
                        >
                          {faction.name}
                        </h3>
                        <p className="text-xs text-slate-500">{faction.era}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          color: faction.side === "light" ? "#4DACFF" : "#EF4444",
                          background: faction.side === "light" ? "rgba(77,172,255,0.1)" : "rgba(239,68,68,0.1)",
                        }}
                      >
                        {faction.side === "light" ? "Light Side" : "Dark Side"}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-slate-500" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-500" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/5 pt-4">
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {faction.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-widest text-slate-500 mb-2">
                          Infantry Units
                        </h4>
                        <div className="space-y-1">
                          {faction.units.map((u) => (
                            <div key={u} className="flex items-center gap-2 text-xs text-slate-400">
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: faction.color }} />
                              {u}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-widest text-slate-500 mb-2">
                          Vehicles
                        </h4>
                        <div className="space-y-1">
                          {faction.vehicles.map((v) => (
                            <div key={v} className="flex items-center gap-2 text-xs text-slate-400">
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: faction.color }} />
                              {v}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MapsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-space-lighter/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Battlefields" title="Maps" description="Fight across iconic Star Wars locations — from frozen tundra to sun-baked desert canyons." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MAPS.map((map, i) => (
            <GlassCard key={map.name} delay={i * 0.07} className="p-5 group" glow="gold">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide group-hover:text-gold transition-colors">
                  {map.name}
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded flex-shrink-0 ml-2"
                  style={{ color: map.eraColor, background: `${map.eraColor}15` }}
                >
                  {map.era}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{map.description}</p>
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex gap-1">
                  {map.modes.map((mode) => (
                    <span key={mode} className="text-xs px-2 py-0.5 glass border border-white/10 text-slate-500 rounded">
                      {mode}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-slate-600">{map.size}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameModesSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="How to Play" title="Game Modes" />
        <div className="grid md:grid-cols-3 gap-5">
          {GAME_MODES.map((mode, i) => (
            <GlassCard key={mode.name} delay={i * 0.1} className="p-6 text-center">
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${mode.color}15`, border: `1px solid ${mode.color}30` }}
              >
                <mode.icon size={24} style={{ color: mode.color }} />
              </div>
              <h3
                className="font-display text-xl font-black uppercase tracking-wider mb-1"
                style={{ color: mode.color }}
              >
                {mode.name}
              </h3>
              <p className="text-xs text-slate-500 mb-3 font-display tracking-wide">
                {mode.fullName}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">{mode.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallSection() {
  return (
    <section id="install" className="py-24 px-4 relative overflow-hidden bg-space-lighter/40">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Get Started"
          title="Installation Guide"
          description="Get into battle in four simple steps."
        />
        <div className="space-y-4">
          {INSTALL_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-6 glass rounded-2xl border border-white/5 hover:border-gold/15 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center font-display font-black text-gold">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-1 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
              {step.action && (
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xs text-gold/60 font-medium px-3 py-1.5 glass border border-gold/20 rounded-lg group-hover:border-gold/40 transition-colors">
                    {step.action}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="https://discord.gg/galactic-contention"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold-dim transition-all duration-200 text-sm font-display tracking-wide"
          >
            <MessageCircle size={16} />
            Join Discord Community
          </a>
          <a
            href="https://store.steampowered.com/app/393380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass border border-white/20 text-white rounded-xl hover:border-white/40 transition-all duration-200 text-sm font-medium"
          >
            <ExternalLink size={16} />
            Steam Workshop
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== PAGE =====
export default function GalacticContentionPage() {
  return (
    <div className="min-h-screen bg-space">
      <HeroSection />
      <div className="divider-gold" />
      <FactionsSection />
      <div className="divider-gold" />
      <MapsSection />
      <div className="divider-gold" />
      <GameModesSection />
      <div className="divider-gold" />
      <InstallSection />

      {/* Back to mods */}
      <div className="py-12 px-4 text-center border-t border-white/[0.05]">
        <Link
          href="/mods"
          className="text-sm text-slate-500 hover:text-gold transition-colors"
        >
          ← Back to all mods
        </Link>
      </div>
    </div>
  );
}
