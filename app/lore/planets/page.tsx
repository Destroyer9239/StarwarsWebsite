import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";

export const metadata: Metadata = {
  title: "Planets",
  description: "Worlds, cities, moons, and battlefields that give Star Wars its sense of scale and atmosphere.",
};

export default function PlanetsLorePage() {
  return (
    <CategoryPageLayout
      eyebrow="Stellar Cartography"
      title="Planets and Locations"
      description="Every era of Star Wars is anchored by places with strong visual identity: deserts, ecumenopolises, swamp worlds, hidden bases, and sacred temples that shape the stories told on them."
      accentColor="#00D4AA"
      stats={[
        { label: "Iconic Worlds", value: "10+" },
        { label: "Biomes", value: "Diverse" },
        { label: "Strategic Value", value: "High" },
      ]}
      sections={[
        {
          title: "Core Worlds and Capitals",
          items: [
            {
              title: "Coruscant",
              meta: "Capital World",
              description: "A planet-sized city that embodies the Republic's scale, bureaucracy, and eventual fragility.",
            },
            {
              title: "Naboo",
              meta: "Culture and Power",
              description: "Elegant surface beauty and hidden underwater civilization make Naboo a symbol of political innocence before the Clone Wars.",
            },
            {
              title: "Kamino",
              meta: "Cloning Facilities",
              description: "Storm-battered platforms over endless ocean created one of the most memorable military-industrial sites in the saga.",
            },
          ],
        },
        {
          title: "Frontier Worlds",
          eyebrow: "Outer Rim",
          items: [
            {
              title: "Tatooine",
              meta: "Desert Frontier",
              description: "A harsh backwater that becomes the starting point for multiple galaxy-changing destinies.",
            },
            {
              title: "Hoth",
              meta: "Frozen Battlefield",
              description: "Its white emptiness turns retreat, survival, and Imperial force projection into unforgettable visual storytelling.",
            },
            {
              title: "Scarif",
              meta: "Data Vault",
              description: "A tropical Imperial installation whose beauty contrasts sharply with the desperation of the mission fought there.",
            },
          ],
        },
      ]}
    />
  );
}
