import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";
import { BATTLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lore Battles",
  description: "A lore-focused view of the major conflicts that shaped the Star Wars galaxy.",
};

export default function LoreBattlesPage() {
  return (
    <CategoryPageLayout
      eyebrow="Conflict Archive"
      title="Battles"
      description="Large-scale conflict is where Star Wars politics, character arcs, technology, and ideology collide. These battles matter not just because armies fought, but because each one changed what the galaxy believed was possible."
      accentColor="#E60000"
      stats={[
        { label: "Archive Entries", value: String(BATTLES.length).padStart(2, "0") },
        { label: "Critical Conflicts", value: String(BATTLES.filter((battle) => battle.significance === "critical").length) },
        { label: "Eras Covered", value: "04" },
      ]}
      sections={[
        {
          title: "Turning Points",
          items: BATTLES.slice(0, 6).map((battle) => ({
            title: battle.name,
            meta: `${battle.yearLabel} | ${battle.location}`,
            description: battle.description,
          })),
        },
      ]}
    />
  );
}
