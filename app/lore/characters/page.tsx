import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";

export const metadata: Metadata = {
  title: "Characters",
  description: "Heroes, villains, Jedi, smugglers, senators, and soldiers who shaped Star Wars history.",
};

export default function CharactersLorePage() {
  return (
    <CategoryPageLayout
      eyebrow="Character Archive"
      title="Characters"
      description="Star Wars history turns on a handful of deeply personal choices. This archive focuses on the figures who pushed the galaxy toward hope, fear, revolution, and balance."
      accentColor="#4DACFF"
      stats={[
        { label: "Legendary Figures", value: "12+" },
        { label: "Moral Arcs", value: "Complex" },
        { label: "Force Users", value: "Many" },
      ]}
      sections={[
        {
          title: "Jedi and Their Allies",
          items: [
            {
              title: "Luke Skywalker",
              meta: "Rebel Hero",
              description: "Farm boy, ace pilot, and last-hope Jedi whose growth from idealistic youth to redemptive teacher defines the original trilogy.",
            },
            {
              title: "Ahsoka Tano",
              meta: "Wandering Light",
              description: "Once Anakin's apprentice, later an independent force for good who survives the fall of the Jedi without surrendering her principles.",
            },
            {
              title: "Leia Organa",
              meta: "Leadership",
              description: "Princess, senator, general, and strategist whose courage links the political and military struggle against tyranny.",
            },
          ],
        },
        {
          title: "Fallen and Fearsome",
          eyebrow: "Dark Side",
          items: [
            {
              title: "Darth Vader",
              meta: "Tragedy",
              description: "The most iconic enforcer in the galaxy, shaped by fear, manipulation, and grief before ultimately choosing redemption.",
            },
            {
              title: "Emperor Palpatine",
              meta: "Master Manipulator",
              description: "A Sith strategist who engineers systemic collapse, then fills the void with absolute control.",
            },
            {
              title: "Kylo Ren",
              meta: "Conflict",
              description: "A heir to legacy and expectation, pulled between inherited darkness and a persistent call toward the light.",
            },
          ],
        },
      ]}
    />
  );
}
