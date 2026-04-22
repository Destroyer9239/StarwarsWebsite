import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/lore/CategoryPageLayout";

export const metadata: Metadata = {
  title: "The Force",
  description: "The spiritual, mystical, and philosophical energy field at the heart of Star Wars.",
};

export default function ForceLorePage() {
  return (
    <CategoryPageLayout
      eyebrow="Mystic Archive"
      title="The Force"
      description="The Force is not just a power system. It is the saga's moral and spiritual language, shaping destiny, temptation, discipline, and the struggle between fear and compassion."
      accentColor="#7C3AED"
      stats={[
        { label: "Traditions", value: "Many" },
        { label: "Core Tension", value: "Light vs Dark" },
        { label: "Narrative Role", value: "Central" },
      ]}
      sections={[
        {
          title: "Light and Dark",
          items: [
            {
              title: "The Light Side",
              meta: "Discipline and Service",
              description: "Associated with patience, protection, and selflessness, the light side requires restraint and responsibility.",
            },
            {
              title: "The Dark Side",
              meta: "Power and Corruption",
              description: "Fueled by fear, anger, and domination, the dark side offers fast power while distorting judgment and identity.",
            },
            {
              title: "Balance",
              meta: "Endless Debate",
              description: "Balance in Star Wars is intentionally debated, making it one of the saga's richest philosophical questions.",
            },
          ],
        },
        {
          title: "Practices and Phenomena",
          eyebrow: "Mysticism",
          items: [
            {
              title: "Force Visions",
              meta: "Premonition",
              description: "Visions can guide or mislead, often revealing emotional truth more than literal certainty.",
            },
            {
              title: "Ghosts and Presence",
              meta: "Transcendence",
              description: "Certain Jedi learn how to remain present after death, turning the Force into a bridge across generations.",
            },
            {
              title: "Artifacts and Temples",
              meta: "Sacred Sites",
              description: "Ancient objects and locations often concentrate history, danger, and spiritual meaning in one place.",
            },
          ],
        },
      ]}
    />
  );
}
