import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";

export const metadata: Metadata = {
  title: "Factions",
  description: "Major governments, military powers, and ideological movements across Star Wars history.",
};

export default function FactionsLorePage() {
  return (
    <CategoryPageLayout
      eyebrow="Faction Archive"
      title="Factions"
      description="From ancient Sith empires to modern rebel cells, faction history explains who holds power, how wars begin, and why the galaxy keeps fracturing into new alliances."
      accentColor="#FFD700"
      stats={[
        { label: "Major Powers", value: "06" },
        { label: "Key Eras", value: "All" },
        { label: "Conflict Scale", value: "Galactic" },
      ]}
      sections={[
        {
          title: "The Governments",
          items: [
            {
              title: "Galactic Republic",
              meta: "Democracy | Core Worlds",
              description: "A vast senate-led government that held the galaxy together for millennia before corruption and war allowed Palpatine to hollow it out from within.",
            },
            {
              title: "Galactic Empire",
              meta: "Authoritarian | Imperial Rule",
              description: "The Republic transformed into a militarized dictatorship under Emperor Palpatine, prioritizing order, fear, and overwhelming force.",
            },
            {
              title: "New Republic",
              meta: "Restoration | Post-Endor",
              description: "A renewed democratic project formed after the Empire's collapse, though its decentralization left it vulnerable to emerging threats.",
            },
          ],
        },
        {
          title: "The Warfighting Coalitions",
          eyebrow: "Front Lines",
          items: [
            {
              title: "Separatist Alliance",
              meta: "Clone Wars",
              description: "A coalition of breakaway systems and corporate interests that challenged the Republic with industrialized droid warfare.",
            },
            {
              title: "Rebel Alliance",
              meta: "Galactic Civil War",
              description: "A loose but determined network of soldiers, spies, senators, and pilots united by resistance to Imperial tyranny.",
            },
            {
              title: "First Order",
              meta: "Sequel Era",
              description: "An Imperial successor state forged from the remnants of authoritarian doctrine, military obsession, and secret preparation in the Unknown Regions.",
            },
          ],
        },
      ]}
    />
  );
}
