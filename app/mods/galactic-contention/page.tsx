"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Crosshair,
  Download,
  ExternalLink,
  MapPinned,
  MessageCircle,
  Shield,
  Swords,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarField } from "@/components/ui/StarField";

const FACTIONS = [
  {
    id: "republic",
    name: "Galactic Republic",
    shortName: "GAR",
    era: "Clone Wars",
    side: "Light Side",
    color: "#4DACFF",
    accent: "#14365C",
    description:
      "The Republic deploys disciplined clone battalions, Jedi leadership, and fast armored support to hold key objectives with coordinated pushes.",
    units: ["Clone Trooper", "ARF Trooper", "ARC Trooper", "Jedi Commander", "AT-RT Driver", "Clone Pilot"],
    specialties: [
      { label: "Armor", value: 82 },
      { label: "Mobility", value: 72 },
      { label: "Command", value: 91 },
    ],
  },
  {
    id: "cis",
    name: "Separatist Alliance",
    shortName: "CIS",
    era: "Clone Wars",
    side: "Dark Side",
    color: "#E60000",
    accent: "#4A0505",
    description:
      "Massed droid infantry, ruthless pressure, and unrelenting numbers let the Confederacy overwhelm lanes and punish fragmented squads.",
    units: ["B1 Battle Droid", "B2 Super Battle Droid", "BX Droid", "Droideka", "MagnaGuard", "STAP Rider"],
    specialties: [
      { label: "Armor", value: 70 },
      { label: "Mobility", value: 68 },
      { label: "Pressure", value: 94 },
    ],
  },
  {
    id: "empire",
    name: "Galactic Empire",
    shortName: "ISF",
    era: "Galactic Civil War",
    side: "Dark Side",
    color: "#D1D5DB",
    accent: "#2B313A",
    description:
      "Imperial doctrine relies on disciplined ranged pressure, oppressive walkers, and a battlefield presence built to lock down open terrain.",
    units: ["Stormtrooper", "Scout Trooper", "Snowtrooper", "Death Trooper", "Imperial Officer", "TIE Pilot"],
    specialties: [
      { label: "Armor", value: 90 },
      { label: "Mobility", value: 58 },
      { label: "Suppression", value: 88 },
    ],
  },
  {
    id: "rebels",
    name: "Rebel Alliance",
    shortName: "DERA",
    era: "Galactic Civil War",
    side: "Light Side",
    color: "#FFD700",
    accent: "#7A4B00",
    description:
      "Rebel forces trade brute force for speed, improvisation, and surgical strikes that keep heavier factions constantly reacting.",
    units: ["Rebel Trooper", "Pathfinder", "Sharpshooter", "Vanguard", "A-Wing Pilot", "Bothan Spy"],
    specialties: [
      { label: "Armor", value: 55 },
      { label: "Mobility", value: 92 },
      { label: "Disruption", value: 84 },
    ],
  },
] as const;

const MAPS = [
  {
    id: "geonosis",
    name: "Geonosis",
    era: "Clone Wars",
    size: "Large",
    marker: { left: "26%", top: "58%" },
    color: "#FFD700",
    description:
      "Dust-choked valleys, foundry complexes, and long sightlines make Geonosis a brutal test of armor control and squad coordination.",
    features: ["Foundry lanes", "Open armor pushes", "Vertical rock cover"],
  },
  {
    id: "kamino",
    name: "Kamino",
    era: "Clone Wars",
    size: "Medium",
    marker: { left: "43%", top: "31%" },
    color: "#4DACFF",
    description:
      "Storm-lashed cloning platforms force close teamwork and punishing transitions across exposed bridges over deep ocean.",
    features: ["Platform choke points", "Storm visibility", "Close support focus"],
  },
  {
    id: "hoth",
    name: "Hoth",
    era: "Galactic Civil War",
    size: "Large",
    marker: { left: "61%", top: "24%" },
    color: "#D8F3FF",
    description:
      "Snow fields, trench lines, and walker assaults create one of the most cinematic combined-arms battles in the mod.",
    features: ["Walker lanes", "Frozen cover", "Base siege phase"],
  },
  {
    id: "scarif",
    name: "Scarif",
    era: "Galactic Civil War",
    size: "Large",
    marker: { left: "77%", top: "62%" },
    color: "#00D4AA",
    description:
      "Tropical beaches hide a lethal invasion map where defenders must protect the data vault while attackers crack layered positions.",
    features: ["Beach landing", "Vault assault", "Mixed terrain fights"],
  },
] as const;

const GAME_MODES = [
  {
    name: "AAS",
    icon: Swords,
    color: "#4DACFF",
    description: "Sequential objective captures for teams that thrive on disciplined tactical pushes.",
  },
  {
    name: "RAAS",
    icon: MapPinned,
    color: "#FFD700",
    description: "Randomized objective flow that rewards adaptation, recon, and reactive leadership.",
  },
  {
    name: "Invasion",
    icon: Crosshair,
    color: "#E60000",
    description: "Layered attack-versus-defense battles built for desperate holds and cinematic breakthroughs.",
  },
] as const;

const INSTALL_STEPS = [
  {
    step: "01",
    title: "Own Squad",
    description: "Galactic Contention runs on Squad, so you need the base game installed through Steam first.",
  },
  {
    step: "02",
    title: "Subscribe to the Mod",
    description: "Open the Workshop page and subscribe. Steam handles the download and updates automatically.",
  },
  {
    step: "03",
    title: "Activate in Squad",
    description: "Launch Squad, open the Mods menu, and switch to Galactic Contention from the available list.",
  },
  {
    step: "04",
    title: "Join a Server",
    description: "Filter for Galactic Contention servers, pick a faction, join a squad, and start coordinating.",
  },
] as const;

function TacticalMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="scanlines h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.9))`,
            boxShadow: `0 0 18px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

export default function GalacticContentionPage() {
  const [selectedFactionId, setSelectedFactionId] = useState<(typeof FACTIONS)[number]["id"]>(
    FACTIONS[0].id
  );
  const [selectedMapId, setSelectedMapId] = useState<(typeof MAPS)[number]["id"]>(
    MAPS[0].id
  );

  const selectedFaction = FACTIONS.find((item) => item.id === selectedFactionId) ?? FACTIONS[0];
  const selectedMap = MAPS.find((item) => item.id === selectedMapId) ?? MAPS[0];

  return (
    <div className="min-h-screen bg-space pt-20">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 md:pb-24 md:pt-12">
        <StarField numStars={320} speed={0.08} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(77,172,255,0.12),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(230,0,0,0.18),transparent_28%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="hud-label rounded-full border border-gold/25 bg-gold/10 px-3 py-2 text-gold">
              Tactical Mod Spotlight
            </span>
            <span className="hud-label rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-300">
              50v50 Combined Arms
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="bento-panel p-8 lg:col-span-7">
              <p className="hud-label mb-4 text-gold/70">Galactic Contention</p>
              <h1 className="font-display text-5xl font-black uppercase tracking-[0.14em] text-white md:text-7xl">
                Military-grade Star Wars combat in Squad
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                This page now leans into a tactical console aesthetic instead of generic card layouts:
                glass surfaces, command metrics, glowing map markers, and faction panels that feel like they belong on a battlefield briefing table.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://discord.gg/galactic-contention"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-glow flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 font-display text-sm uppercase tracking-[0.18em] text-black"
                >
                  <MessageCircle size={16} />
                  Join Discord
                </a>
                <a
                  href="#install"
                  className="button-glow flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-display text-sm uppercase tracking-[0.18em] text-white"
                >
                  <Download size={16} />
                  Install Brief
                </a>
              </div>
            </div>

            <div className="bento-panel p-6 lg:col-span-5">
              <p className="hud-label mb-4 text-slate-500">Field Metrics</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Factions", value: "4", icon: Shield, color: "#FFD700" },
                  { label: "Maps", value: "4+", icon: MapPinned, color: "#4DACFF" },
                  { label: "Modes", value: "3", icon: Crosshair, color: "#E60000" },
                  { label: "Players", value: "50v50", icon: Users, color: "#00D4AA" },
                ].map((item) => (
                  <div key={item.label} className="scanlines rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <item.icon size={18} style={{ color: item.color }} />
                      <span className="hud-label text-slate-500">{item.label}</span>
                    </div>
                    <div className="font-display text-3xl font-black uppercase tracking-[0.1em] text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-panel p-6 lg:col-span-8">
              <SectionHeader
                eyebrow="Faction Console"
                title="Select a battlefield doctrine"
                description="Each faction card uses a tactical-console treatment with tilt-style motion, scanline panels, and live capability bars."
                align="left"
              />

              <div className="grid gap-4 md:grid-cols-2">
                {FACTIONS.map((faction, index) => {
                  const active = faction.id === selectedFactionId;
                  return (
                    <motion.button
                      key={faction.id}
                      type="button"
                      onClick={() => setSelectedFactionId(faction.id)}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -5 : 5, scale: 1.01 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="scanlines rounded-[24px] border p-5 text-left [transform-style:preserve-3d]"
                      style={{
                        background: `linear-gradient(145deg, ${faction.accent}88, rgba(255,255,255,0.04))`,
                        borderColor: active ? `${faction.color}66` : "rgba(255,255,255,0.1)",
                        boxShadow: active ? `0 0 34px ${faction.color}1f` : "none",
                      }}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="rounded-2xl border px-3 py-2 font-display text-sm uppercase tracking-[0.2em]"
                          style={{ color: faction.color, borderColor: `${faction.color}55`, background: `${faction.color}12` }}
                        >
                          {faction.shortName}
                        </div>
                        <span className="hud-label text-slate-400">{faction.era}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-white">
                        {faction.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{faction.side}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{faction.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="bento-panel p-6 lg:col-span-4">
              <p className="hud-label mb-4" style={{ color: selectedFaction.color }}>
                {selectedFaction.shortName} capability scan
              </p>
              <div className="scanlines rounded-[24px] border border-white/10 bg-black/30 p-5">
                <h3 className="font-display text-2xl font-black uppercase tracking-[0.12em] text-white">
                  {selectedFaction.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{selectedFaction.description}</p>

                <div className="mt-6 space-y-4">
                  {selectedFaction.specialties.map((metric) => (
                    <TacticalMetric
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      color={selectedFaction.color}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <p className="hud-label mb-3 text-slate-500">Unit Roster</p>
                  <div className="grid gap-2">
                    {selectedFaction.units.map((unit) => (
                      <div
                        key={unit}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                      >
                        {unit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-panel p-6 lg:col-span-7">
              <SectionHeader
                eyebrow="Galaxy Map"
                title="Interactive theater markers"
                description="Select a map marker to inspect its battle role. The glass-textured map is intentionally stylized to feel like a command overlay rather than a generic thumbnail."
                align="left"
              />

              <div className="grid gap-4 lg:grid-cols-[1.25fr,0.75fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(77,172,255,0.22),transparent_18%),radial-gradient(circle_at_80%_70%,rgba(230,0,0,0.16),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent),linear-gradient(90deg,rgba(255,255,255,0.04),transparent)] bg-[length:100%_100%,80px_80px] opacity-40" />
                  <div className="absolute left-[12%] top-[14%] h-[22%] w-[24%] rounded-full border border-white/10 bg-white/5 blur-[1px]" />
                  <div className="absolute left-[35%] top-[28%] h-[18%] w-[30%] rounded-full border border-white/10 bg-white/5 blur-[1px]" />
                  <div className="absolute left-[58%] top-[18%] h-[22%] w-[20%] rounded-full border border-white/10 bg-white/5 blur-[1px]" />
                  <div className="absolute left-[64%] top-[52%] h-[17%] w-[22%] rounded-full border border-white/10 bg-white/5 blur-[1px]" />

                  {MAPS.map((map, index) => {
                    const active = map.id === selectedMapId;
                    return (
                      <motion.button
                        key={map.id}
                        type="button"
                        onClick={() => setSelectedMapId(map.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={map.marker}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.25, delay: index * 0.08 }}
                      >
                        <span
                          className="absolute inset-0 rounded-full blur-xl"
                          style={{ background: map.color, opacity: active ? 0.36 : 0.18 }}
                        />
                        <span
                          className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 bg-black/70"
                          style={{ borderColor: map.color, boxShadow: active ? `0 0 18px ${map.color}` : "none" }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: map.color }} />
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
                  <p className="hud-label mb-3" style={{ color: selectedMap.color }}>
                    {selectedMap.era}
                  </p>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-white">
                    {selectedMap.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{selectedMap.size} Theater</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{selectedMap.description}</p>

                  <div className="mt-6">
                    <p className="hud-label mb-3 text-slate-500">Battle Features</p>
                    <div className="space-y-2">
                      {selectedMap.features.map((feature) => (
                        <div key={feature} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-panel p-6 lg:col-span-5">
              <SectionHeader
                eyebrow="Combat Modes"
                title="Battleflow"
                description="Mode cards use concise command-language copy and stronger visual identity than the old generic grid."
                align="left"
              />
              <div className="space-y-4">
                {GAME_MODES.map((mode) => (
                  <div key={mode.name} className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                        style={{ borderColor: `${mode.color}55`, background: `${mode.color}14` }}
                      >
                        <mode.icon size={20} style={{ color: mode.color }} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-white">
                          {mode.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{mode.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="install" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="bento-panel p-6 md:p-8">
          <SectionHeader
            eyebrow="Deployment"
            title="Install and deploy"
            description="A tighter, more deliberate install flow with command-center styling instead of a plain list."
            align="left"
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {INSTALL_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="scanlines rounded-[24px] border border-white/10 bg-black/25 p-5"
              >
                <div className="font-display text-4xl font-black uppercase tracking-[0.12em] text-gold">
                  {step.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-[0.12em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://discord.gg/galactic-contention"
              target="_blank"
              rel="noopener noreferrer"
              className="button-glow flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 font-display text-sm uppercase tracking-[0.18em] text-black"
            >
              <MessageCircle size={16} />
              Community Hub
            </a>
            <a
              href="https://store.steampowered.com/app/393380"
              target="_blank"
              rel="noopener noreferrer"
              className="button-glow flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-display text-sm uppercase tracking-[0.18em] text-white"
            >
              <ExternalLink size={16} />
              Steam Page
            </a>
          </div>
        </div>

        <div className="py-12 text-center">
          <Link href="/mods" className="font-display text-sm uppercase tracking-[0.24em] text-slate-500 transition-colors hover:text-gold">
            Back to all mods
          </Link>
        </div>
      </section>
    </div>
  );
}
