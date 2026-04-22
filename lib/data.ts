// ===== TIMELINE ERAS =====
export const ERAS = [
  {
    id: "old-republic",
    name: "Old Republic",
    shortName: "Old Republic",
    startYear: -25000,
    endYear: -1032,
    color: "#6D28D9",
    glow: "rgba(109,40,217,0.3)",
    description: "Thousands of years of Jedi and Sith conflict",
  },
  {
    id: "high-republic",
    name: "High Republic",
    shortName: "High Republic",
    startYear: -500,
    endYear: -100,
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.3)",
    description: "The golden age of the Jedi Order",
  },
  {
    id: "fall-of-jedi",
    name: "Fall of the Jedi",
    shortName: "Fall of Jedi",
    startYear: -32,
    endYear: -19,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    description: "Rise of Palpatine and the Clone Wars",
  },
  {
    id: "age-of-empire",
    name: "Age of the Empire",
    shortName: "Empire",
    startYear: -19,
    endYear: 5,
    color: "#EF4444",
    glow: "rgba(239,68,68,0.3)",
    description: "Dark times under Galactic Empire rule",
  },
  {
    id: "new-republic",
    name: "New Republic",
    shortName: "New Republic",
    startYear: 5,
    endYear: 34,
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    description: "Rebuilding democracy after the Empire",
  },
  {
    id: "first-order",
    name: "Rise of the First Order",
    shortName: "First Order",
    startYear: 34,
    endYear: 36,
    color: "#6B7280",
    glow: "rgba(107,114,128,0.3)",
    description: "The First Order threatens the galaxy",
  },
] as const;

// ===== TIMELINE EVENTS =====
export interface TimelineEvent {
  id: string;
  title: string;
  year: number;
  yearLabel: string;
  era: string;
  eraColor: string;
  category: "battle" | "political" | "character" | "technology" | "force";
  importance: "critical" | "major" | "minor";
  description: string;
  linkedSlug?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "battle-ruusan",
    title: "Battle of Ruusan",
    year: -1000,
    yearLabel: "1,000 BBY",
    era: "old-republic",
    eraColor: "#6D28D9",
    category: "battle",
    importance: "critical",
    description: "Final battle of the New Sith Wars. Darth Bane survives and creates the Rule of Two, forever changing the Sith.",
  },
  {
    id: "naboo-blockade",
    title: "Invasion of Naboo",
    year: -32,
    yearLabel: "32 BBY",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    category: "political",
    importance: "critical",
    description: "The Trade Federation's blockade of Naboo triggers a chain of events that reveals the Sith still exist. Qui-Gon Jinn discovers Anakin Skywalker.",
  },
  {
    id: "battle-geonosis",
    title: "Battle of Geonosis",
    year: -22,
    yearLabel: "22 BBY",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    category: "battle",
    importance: "critical",
    description: "The first battle of the Clone Wars. The Republic deploys its clone army for the first time, rescuing Obi-Wan, Anakin, and Padmé.",
  },
  {
    id: "siege-mandalore",
    title: "Siege of Mandalore",
    year: -19,
    yearLabel: "19 BBY",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    category: "battle",
    importance: "critical",
    description: "Ahsoka Tano and Commander Rex lead the 332nd Company to capture Maul on Mandalore, concurrent with Order 66.",
  },
  {
    id: "order-66",
    title: "Order 66",
    year: -19,
    yearLabel: "19 BBY",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    category: "force",
    importance: "critical",
    description: "Emperor Palpatine activates Order 66, commanding clone troopers to execute their Jedi generals. The Jedi Order is nearly wiped out.",
  },
  {
    id: "anakin-falls",
    title: "Anakin Becomes Darth Vader",
    year: -19,
    yearLabel: "19 BBY",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    category: "character",
    importance: "critical",
    description: "Anakin Skywalker pledges himself to the dark side and becomes Darth Vader, slaughtering the Jedi at the Temple.",
  },
  {
    id: "empire-proclaimed",
    title: "Galactic Empire Proclaimed",
    year: -19,
    yearLabel: "19 BBY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "political",
    importance: "critical",
    description: "Palpatine transforms the Republic into the Galactic Empire before the Senate, declaring himself Emperor.",
  },
  {
    id: "death-star-construction",
    title: "Death Star Construction Begins",
    year: -19,
    yearLabel: "19 BBY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "technology",
    importance: "major",
    description: "Construction of the first Death Star begins above Geonosis using plans stolen from the Geonosians.",
  },
  {
    id: "battle-scarif",
    title: "Battle of Scarif",
    year: 0,
    yearLabel: "0 BBY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "battle",
    importance: "critical",
    description: "Rogue One's last stand on Scarif. The Death Star plans are stolen at the cost of every Rebel life in the operation.",
  },
  {
    id: "battle-yavin",
    title: "Battle of Yavin",
    year: 0,
    yearLabel: "0 BBY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "battle",
    importance: "critical",
    description: "Luke Skywalker destroys the Death Star using the Force, delivering the Rebellion its first major victory.",
  },
  {
    id: "battle-hoth",
    title: "Battle of Hoth",
    year: 3,
    yearLabel: "3 ABY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "battle",
    importance: "major",
    description: "The Empire discovers Echo Base on Hoth and decimates the Rebel base. The Rebels barely escape with their lives.",
  },
  {
    id: "luke-training",
    title: "Luke Trains with Yoda",
    year: 3,
    yearLabel: "3 ABY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "character",
    importance: "major",
    description: "Luke Skywalker trains under Jedi Grand Master Yoda on Dagobah, learning the ways of the Force.",
  },
  {
    id: "vader-reveal",
    title: "\"I am your father\"",
    year: 3,
    yearLabel: "3 ABY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "character",
    importance: "critical",
    description: "In Cloud City, Darth Vader reveals to Luke that he is his father, forever changing the galaxy's destiny.",
  },
  {
    id: "battle-endor",
    title: "Battle of Endor",
    year: 4,
    yearLabel: "4 ABY",
    era: "age-of-empire",
    eraColor: "#EF4444",
    category: "battle",
    importance: "critical",
    description: "The Rebel Alliance destroys the second Death Star. Vader redeems himself by killing Palpatine. The Empire falls.",
  },
  {
    id: "battle-jakku",
    title: "Battle of Jakku",
    year: 5,
    yearLabel: "5 ABY",
    era: "new-republic",
    eraColor: "#3B82F6",
    category: "battle",
    importance: "critical",
    description: "The decisive final battle of the Galactic Civil War. The New Republic defeats the Imperial remnant.",
  },
  {
    id: "starkiller-base",
    title: "Destruction of Starkiller Base",
    year: 34,
    yearLabel: "34 ABY",
    era: "first-order",
    eraColor: "#6B7280",
    category: "battle",
    importance: "critical",
    description: "The Resistance destroys the First Order's superweapon Starkiller Base, but the First Order survives.",
  },
];

// ===== BATTLES =====
export interface Battle {
  id: string;
  name: string;
  slug: string;
  era: string;
  eraColor: string;
  year: number;
  yearLabel: string;
  location: string;
  factions: { name: string; side: "light" | "dark" | "neutral" }[];
  outcome: string;
  significance: "critical" | "major" | "moderate";
  description: string;
  commanders: string[];
  tags: string[];
}

export const BATTLES: Battle[] = [
  {
    id: "battle-geonosis",
    name: "Battle of Geonosis",
    slug: "battle-of-geonosis",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    year: -22,
    yearLabel: "22 BBY",
    location: "Geonosis",
    factions: [
      { name: "Galactic Republic", side: "light" },
      { name: "Confederacy of Independent Systems", side: "dark" },
    ],
    outcome: "Republic Victory",
    significance: "critical",
    description: "The first battle of the Clone Wars, triggered when Obi-Wan, Anakin, and Padmé were captured by Count Dooku on Geonosis. Yoda arrived with the clone army and the Jedi Order, beginning a galaxy-wide war.",
    commanders: ["Mace Windu", "Yoda", "Count Dooku", "Jango Fett"],
    tags: ["Clone Wars", "Geonosis", "Jedi", "CIS"],
  },
  {
    id: "battle-coruscant",
    name: "Battle of Coruscant",
    slug: "battle-of-coruscant",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    year: -19,
    yearLabel: "19 BBY",
    location: "Coruscant",
    factions: [
      { name: "Galactic Republic", side: "light" },
      { name: "Separatist Alliance", side: "dark" },
    ],
    outcome: "Republic Victory / Pyrrhic",
    significance: "critical",
    description: "General Grievous launched a massive attack on Coruscant, kidnapping Chancellor Palpatine. Anakin and Obi-Wan led the rescue mission above the planet's surface in a spectacular space battle.",
    commanders: ["Anakin Skywalker", "Obi-Wan Kenobi", "General Grievous"],
    tags: ["Clone Wars", "Space Battle", "Coruscant", "Grievous"],
  },
  {
    id: "siege-mandalore",
    name: "Siege of Mandalore",
    slug: "siege-of-mandalore",
    era: "fall-of-jedi",
    eraColor: "#F59E0B",
    year: -19,
    yearLabel: "19 BBY",
    location: "Mandalore",
    factions: [
      { name: "Republic / 332nd Company", side: "light" },
      { name: "Maul's Shadow Collective", side: "dark" },
    ],
    outcome: "Republic Victory",
    significance: "critical",
    description: "Ahsoka Tano and Rex led the 332nd Company to capture Maul. The battle was interrupted by Order 66, forcing Ahsoka to flee her own clone brothers.",
    commanders: ["Ahsoka Tano", "Rex", "Maul"],
    tags: ["Clone Wars", "Mandalore", "Ahsoka", "Order 66"],
  },
  {
    id: "battle-scarif",
    name: "Battle of Scarif",
    slug: "battle-of-scarif",
    era: "age-of-empire",
    eraColor: "#EF4444",
    year: 0,
    yearLabel: "0 BBY",
    location: "Scarif",
    factions: [
      { name: "Rebel Alliance / Rogue One", side: "light" },
      { name: "Galactic Empire", side: "dark" },
    ],
    outcome: "Rebel Pyrrhic Victory",
    significance: "critical",
    description: "Jyn Erso's Rogue One team infiltrated the Imperial data vault on Scarif. All Rebel ground forces perished, but they transmitted the Death Star plans, giving hope to the galaxy.",
    commanders: ["Jyn Erso", "Cassian Andor", "Director Krennic", "Darth Vader"],
    tags: ["Rogue One", "Death Star", "Scarif", "Rebels"],
  },
  {
    id: "battle-yavin",
    name: "Battle of Yavin",
    slug: "battle-of-yavin",
    era: "age-of-empire",
    eraColor: "#EF4444",
    year: 0,
    yearLabel: "0 BBY",
    location: "Yavin system",
    factions: [
      { name: "Rebel Alliance", side: "light" },
      { name: "Galactic Empire", side: "dark" },
    ],
    outcome: "Rebel Victory",
    significance: "critical",
    description: "Luke Skywalker, guided by Obi-Wan's Force ghost, fired the proton torpedoes that destroyed the Death Star. The galaxy's first real hope was born.",
    commanders: ["Luke Skywalker", "Red Leader", "Grand Moff Tarkin", "Darth Vader"],
    tags: ["Death Star", "Yavin", "X-Wing", "Luke Skywalker"],
  },
  {
    id: "battle-hoth",
    name: "Battle of Hoth",
    slug: "battle-of-hoth",
    era: "age-of-empire",
    eraColor: "#EF4444",
    year: 3,
    yearLabel: "3 ABY",
    location: "Hoth",
    factions: [
      { name: "Rebel Alliance", side: "light" },
      { name: "Galactic Empire", side: "dark" },
    ],
    outcome: "Imperial Victory",
    significance: "major",
    description: "Imperial AT-ATs crushed Echo Base. The Rebels evacuated under heavy fire, sacrificing their base but preserving the fleet. A crushing defeat but the Alliance survived.",
    commanders: ["General Rieekan", "Wedge Antilles", "Darth Vader", "General Veers"],
    tags: ["Hoth", "AT-AT", "Echo Base", "Empire"],
  },
  {
    id: "battle-endor",
    name: "Battle of Endor",
    slug: "battle-of-endor",
    era: "age-of-empire",
    eraColor: "#EF4444",
    year: 4,
    yearLabel: "4 ABY",
    location: "Endor",
    factions: [
      { name: "Rebel Alliance + Ewoks", side: "light" },
      { name: "Galactic Empire", side: "dark" },
    ],
    outcome: "Rebel Victory",
    significance: "critical",
    description: "The Rebels destroyed the second Death Star while Luke confronted Vader and the Emperor. Vader redeemed himself, killing Palpatine. The Empire effectively collapsed.",
    commanders: ["Admiral Ackbar", "Han Solo", "Luke Skywalker", "Emperor Palpatine", "Darth Vader"],
    tags: ["Endor", "Death Star II", "Ewoks", "Redemption"],
  },
  {
    id: "battle-jakku",
    name: "Battle of Jakku",
    slug: "battle-of-jakku",
    era: "new-republic",
    eraColor: "#3B82F6",
    year: 5,
    yearLabel: "5 ABY",
    location: "Jakku",
    factions: [
      { name: "New Republic", side: "light" },
      { name: "Galactic Empire", side: "dark" },
    ],
    outcome: "New Republic Victory",
    significance: "critical",
    description: "The final major battle of the Galactic Civil War. Imperial forces were crushed, with many Star Destroyers crashing onto Jakku's surface, leaving the iconic graveyard.",
    commanders: ["Admiral Sloane", "Gallius Rax"],
    tags: ["Jakku", "Civil War End", "Star Destroyers", "Graveyard"],
  },
];

// ===== GAMES =====
export interface Game {
  id: string;
  title: string;
  slug: string;
  developer: string;
  publisher: string;
  releaseYear: number;
  genre: string[];
  platforms: string[];
  era: string;
  description: string;
  rating?: number;
  featured: boolean;
  steamUrl?: string;
  metacritic?: number;
  tags: string[];
}

export const GAMES: Game[] = [
  {
    id: "battlefront-2",
    title: "Star Wars Battlefront II",
    slug: "battlefront-2",
    developer: "DICE / Criterion",
    publisher: "Electronic Arts",
    releaseYear: 2017,
    genre: ["Third-Person Shooter", "Action"],
    platforms: ["PC", "PS4", "Xbox One"],
    era: "Multiple Eras",
    description: "Epic large-scale battles across iconic Star Wars locations from the prequel trilogy through the sequel trilogy. Features an original story campaign following Imperial soldier Iden Versio.",
    rating: 7.5,
    featured: true,
    steamUrl: "https://store.steampowered.com/app/1237950",
    metacritic: 68,
    tags: ["Multiplayer", "Heroes", "Space Battles", "Large Scale"],
  },
  {
    id: "swtor",
    title: "Star Wars: The Old Republic",
    slug: "star-wars-the-old-republic",
    developer: "BioWare",
    publisher: "Electronic Arts",
    releaseYear: 2011,
    genre: ["MMORPG", "RPG"],
    platforms: ["PC"],
    era: "Old Republic",
    description: "A massive online RPG set 3,600 years before the Galactic Civil War. Choose your path as Sith or Jedi across eight fully voiced class stories with thousands of hours of content.",
    rating: 9.0,
    featured: true,
    metacritic: 85,
    tags: ["MMO", "Old Republic", "Story Rich", "Free to Play"],
  },
  {
    id: "jedi-fallen-order",
    title: "Star Wars Jedi: Fallen Order",
    slug: "jedi-fallen-order",
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    releaseYear: 2019,
    genre: ["Action Adventure", "Souls-like"],
    platforms: ["PC", "PS4", "PS5", "Xbox"],
    era: "Age of the Empire",
    description: "Follow Cal Kestis, a young Jedi Padawan who survived Order 66, as he fights to rebuild the Jedi Order. Features stunning lightsaber combat and a compelling narrative.",
    rating: 9.0,
    featured: true,
    steamUrl: "https://store.steampowered.com/app/1172380",
    metacritic: 79,
    tags: ["Singleplayer", "Souls-like", "Story", "Lightsaber Combat"],
  },
  {
    id: "jedi-survivor",
    title: "Star Wars Jedi: Survivor",
    slug: "jedi-survivor",
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    releaseYear: 2023,
    genre: ["Action Adventure", "Souls-like"],
    platforms: ["PC", "PS5", "Xbox Series X"],
    era: "Age of the Empire",
    description: "Cal Kestis returns in a sequel with expanded Force powers, more lightsaber stances, and a larger galaxy to explore. A darker, more mature story.",
    rating: 8.5,
    featured: true,
    metacritic: 85,
    tags: ["Singleplayer", "Sequel", "Expanded Combat", "Story"],
  },
  {
    id: "squadrons",
    title: "Star Wars: Squadrons",
    slug: "squadrons",
    developer: "Motive Studio",
    publisher: "Electronic Arts",
    releaseYear: 2020,
    genre: ["Space Combat", "Simulation"],
    platforms: ["PC", "PS4", "Xbox One"],
    era: "Age of the Empire",
    description: "Intense starfighter combat from inside the cockpit. Fly for the New Republic or the Empire in an original story and competitive multiplayer modes.",
    rating: 8.0,
    featured: false,
    steamUrl: "https://store.steampowered.com/app/1222730",
    metacritic: 79,
    tags: ["Space Combat", "VR Support", "Cockpit View", "Competitive"],
  },
  {
    id: "republic-commando",
    title: "Star Wars: Republic Commando",
    slug: "republic-commando",
    developer: "LucasArts",
    publisher: "LucasArts",
    releaseYear: 2005,
    genre: ["First-Person Shooter", "Tactical"],
    platforms: ["PC", "Xbox", "PS4", "Switch"],
    era: "Clone Wars",
    description: "Command an elite squad of clone commandos through the Clone Wars. Tactical squad-based FPS with a gritty tone and memorable Delta Squad characters.",
    rating: 8.5,
    featured: false,
    metacritic: 81,
    tags: ["Tactical", "Clone Wars", "Squad", "Classic"],
  },
];

// ===== MODS =====
export interface Mod {
  id: string;
  title: string;
  slug: string;
  baseGame: string;
  type: "total-conversion" | "overhaul" | "content" | "visual";
  developer: string;
  status: "active" | "beta" | "complete" | "abandoned";
  description: string;
  longDescription?: string;
  steamWorkshopUrl?: string;
  discordUrl?: string;
  websiteUrl?: string;
  era: string;
  factions: string[];
  featured: boolean;
  playerCount?: string;
  tags: string[];
}

export const MODS: Mod[] = [
  {
    id: "galactic-contention",
    title: "Galactic Contention",
    slug: "galactic-contention",
    baseGame: "Squad",
    type: "total-conversion",
    developer: "Galactic Contention Team",
    status: "active",
    description: "A total conversion mod for Squad, transforming the tactical shooter into an authentic Star Wars battlefield experience.",
    longDescription: "Galactic Contention transforms Squad into a full Star Wars tactical shooter. Fight as the Galactic Republic against the Separatist Alliance in the Clone Wars, or join the Galactic Empire against the Rebel Alliance in the Galactic Civil War. Features authentic Star Wars weapons, vehicles, and maps.",
    steamWorkshopUrl: "https://store.steampowered.com/app/393380",
    discordUrl: "https://discord.gg/galactic-contention",
    era: "Clone Wars / Galactic Civil War",
    factions: ["Galactic Republic", "CIS", "Galactic Empire", "Rebel Alliance"],
    featured: true,
    playerCount: "50v50",
    tags: ["Total Conversion", "Tactical", "Clone Wars", "Civil War", "Vehicles", "Infantry"],
  },
  {
    id: "battlefront-commander",
    title: "Battlefront Commander",
    slug: "battlefront-commander",
    baseGame: "Star Wars Battlefront II (2017)",
    type: "overhaul",
    developer: "BC Modding Team",
    status: "active",
    description: "A massive gameplay overhaul mod for Battlefront II that adds new heroes, maps, balance changes, and gameplay improvements.",
    era: "Multiple",
    factions: ["Republic", "CIS", "Empire", "Rebels", "First Order", "Resistance"],
    featured: false,
    tags: ["Overhaul", "New Content", "Balance", "Heroes"],
  },
  {
    id: "star-wars-resistance-reborn",
    title: "Resistance Reborn",
    slug: "resistance-reborn",
    baseGame: "Star Wars Battlefront II (2017)",
    type: "content",
    developer: "Community Modders",
    status: "beta",
    description: "Adds new sequel trilogy content including additional Resistance and First Order units, maps, and story missions.",
    era: "First Order Era",
    factions: ["First Order", "Resistance"],
    featured: false,
    tags: ["Content Pack", "Sequel Trilogy", "First Order"],
  },
];

// ===== LORE CATEGORIES =====
export const LORE_CATEGORIES = [
  {
    id: "factions",
    name: "Factions",
    icon: "⚔️",
    description: "Galactic Republic, Sith Empire, Rebel Alliance, and more",
    count: 24,
    color: "#FFE81F",
  },
  {
    id: "characters",
    name: "Characters",
    icon: "👤",
    description: "Heroes, villains, Jedi, Sith, and everyone in between",
    count: 312,
    color: "#4DACFF",
  },
  {
    id: "planets",
    name: "Planets & Locations",
    icon: "🪐",
    description: "Worlds, space stations, and iconic locations",
    count: 186,
    color: "#00D4AA",
  },
  {
    id: "technology",
    name: "Technology",
    icon: "⚙️",
    description: "Ships, weapons, droids, and the Death Star",
    count: 94,
    color: "#6D28D9",
  },
  {
    id: "force",
    name: "The Force",
    icon: "✨",
    description: "Force powers, artifacts, and midi-chlorians",
    count: 57,
    color: "#00D4AA",
  },
  {
    id: "battles",
    name: "Battles",
    icon: "💥",
    description: "Every major conflict across all eras",
    count: 143,
    color: "#EF4444",
  },
];
