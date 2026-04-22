import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";

export const metadata: Metadata = {
  title: "Technology",
  description: "Ships, weapons, droids, armor, and superweapons that define Star Wars combat and worldbuilding.",
};

export default function TechnologyLorePage() {
  return (
    <CategoryPageLayout
      eyebrow="Systems Archive"
      title="Technology"
      description="Star Wars technology blends mythic simplicity with military spectacle. Its design language matters as much as its function, from the hum of a lightsaber to the silhouette of a Star Destroyer."
      accentColor="#6D28D9"
      stats={[
        { label: "Signature Systems", value: "08+" },
        { label: "Visual Identity", value: "Strong" },
        { label: "War Impact", value: "Massive" },
      ]}
      sections={[
        {
          title: "Weapons and Superweapons",
          items: [
            {
              title: "Lightsabers",
              meta: "Jedi and Sith",
              description: "Equal parts weapon, symbol, and identity marker, lightsabers communicate lineage, discipline, and personal philosophy.",
            },
            {
              title: "Death Star",
              meta: "Terror Doctrine",
              description: "A battle station built not just to destroy planets, but to make rebellion seem psychologically impossible.",
            },
            {
              title: "Starkiller Base",
              meta: "Sequel Era",
              description: "An escalation of superweapon logic that reveals the First Order's obsession with scale, spectacle, and annihilation.",
            },
          ],
        },
        {
          title: "Machines of War",
          eyebrow: "Military Hardware",
          items: [
            {
              title: "X-Wing and TIE Fighter",
              meta: "Aerial Contrast",
              description: "These silhouettes instantly communicate the values of their factions: flexibility and heroism versus control and mass production.",
            },
            {
              title: "AT-AT Walker",
              meta: "Ground Dominance",
              description: "An armored symbol of Imperial intimidation designed to feel unstoppable on open terrain.",
            },
            {
              title: "Droids",
              meta: "Utility and Personality",
              description: "From protocol units to battle droids, Star Wars droids constantly blur the line between machine function and character presence.",
            },
          ],
        },
      ]}
    />
  );
}
