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

// ===== CHARACTERS =====
export interface Character {
  id: string;
  name: string;
  slug: string;
  side: "light" | "dark" | "neutral" | "both";
  forceSensitive: boolean;
  species: string;
  homeworld: string;
  affiliation: string[];
  eras: string[];
  role: string;
  description: string;
  color: string;
  lightsaberColor?: "blue" | "green" | "red" | "purple" | "white" | "yellow" | "none";
  initials: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "luke-skywalker",
    name: "Luke Skywalker",
    slug: "luke-skywalker",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Tatooine",
    affiliation: ["Rebel Alliance", "New Jedi Order", "Rogue Squadron"],
    eras: ["age-of-empire", "new-republic"],
    role: "Jedi Knight · Rebel Hero",
    description:
      "Farm boy turned Jedi Knight who destroyed the Death Star, faced his own father, and ultimately redeemed Darth Vader — bringing balance to the Force.",
    color: "#1a3a6b",
    lightsaberColor: "blue",
    initials: "LS",
  },
  {
    id: "darth-vader",
    name: "Darth Vader",
    slug: "darth-vader",
    side: "both",
    forceSensitive: true,
    species: "Human (Cyborg)",
    homeworld: "Tatooine",
    affiliation: ["Galactic Empire", "Sith Order", "formerly Jedi Order"],
    eras: ["fall-of-jedi", "age-of-empire"],
    role: "Sith Lord · Dark Lord",
    description:
      "Once Anakin Skywalker, the Chosen One, seduced by Palpatine's promises. Servant of the Empire for decades, until his son's love drew him back to the light.",
    color: "#1a0000",
    lightsaberColor: "red",
    initials: "DV",
  },
  {
    id: "obi-wan-kenobi",
    name: "Obi-Wan Kenobi",
    slug: "obi-wan-kenobi",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Stewjon",
    affiliation: ["Jedi Order", "Rebel Alliance (spirit)"],
    eras: ["fall-of-jedi", "age-of-empire"],
    role: "Jedi Master",
    description:
      "Wise, measured, and deeply principled. Trained Anakin Skywalker and later Luke, guiding the Skywalker family from the shadows of Tatooine's twin suns.",
    color: "#1a2a4a",
    lightsaberColor: "blue",
    initials: "OWK",
  },
  {
    id: "yoda",
    name: "Yoda",
    slug: "yoda",
    side: "light",
    forceSensitive: true,
    species: "Unknown",
    homeworld: "Unknown",
    affiliation: ["Jedi Order", "Jedi High Council"],
    eras: ["old-republic", "high-republic", "fall-of-jedi", "age-of-empire"],
    role: "Grand Jedi Master",
    description:
      "For 800 years he trained Jedi, serving as the Grand Master of the Order. Even in exile on Dagobah, the Force spoke through him — and he through it.",
    color: "#0a2a0a",
    lightsaberColor: "green",
    initials: "YO",
  },
  {
    id: "emperor-palpatine",
    name: "Emperor Palpatine",
    slug: "emperor-palpatine",
    side: "dark",
    forceSensitive: true,
    species: "Human",
    homeworld: "Naboo",
    affiliation: ["Sith Order", "Galactic Republic (secretly)", "Galactic Empire", "First Order (posthumously)"],
    eras: ["fall-of-jedi", "age-of-empire", "first-order"],
    role: "Sith Emperor · Darth Sidious",
    description:
      "The most dangerous being in the galaxy. Manipulated the Clone Wars from both sides, dismantled democracy, and ruled as Emperor — only to return from death itself.",
    color: "#1a0a00",
    lightsaberColor: "red",
    initials: "EP",
  },
  {
    id: "leia-organa",
    name: "Leia Organa",
    slug: "leia-organa",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Alderaan",
    affiliation: ["Rebel Alliance", "New Republic", "Resistance"],
    eras: ["age-of-empire", "new-republic", "first-order"],
    role: "General · Princess · Senator",
    description:
      "Princess of Alderaan, senator, spy, general. One of the most tenacious fighters for freedom in the galaxy — and unknowingly a Jedi in her own right.",
    color: "#2a1a3a",
    lightsaberColor: "none",
    initials: "LO",
  },
  {
    id: "han-solo",
    name: "Han Solo",
    slug: "han-solo",
    side: "neutral",
    forceSensitive: false,
    species: "Human",
    homeworld: "Corellia",
    affiliation: ["Rebel Alliance", "New Republic", "Galactic Empire (formerly)"],
    eras: ["age-of-empire", "new-republic"],
    role: "General · Smuggler · Pilot",
    description:
      "Smuggler. Scoundrel. Hero. Han Solo flew the Millennium Falcon from the Outer Rim slums to the heart of the Rebellion — never quite believing in the Force, but somehow always proving its point.",
    color: "#2a1a08",
    lightsaberColor: "none",
    initials: "HS",
  },
  {
    id: "ahsoka-tano",
    name: "Ahsoka Tano",
    slug: "ahsoka-tano",
    side: "light",
    forceSensitive: true,
    species: "Togruta",
    homeworld: "Shili",
    affiliation: ["Jedi Order (formerly)", "Rebel Alliance", "The Ahsoka"],
    eras: ["fall-of-jedi", "age-of-empire", "new-republic"],
    role: "Former Jedi · Force-wielder",
    description:
      "Anakin Skywalker's Padawan who left the Jedi Order, fought through the Clone Wars, and spent decades as a lone Force-wielder hunting darkness across the galaxy.",
    color: "#1a2a2a",
    lightsaberColor: "white",
    initials: "AT",
  },
  {
    id: "mace-windu",
    name: "Mace Windu",
    slug: "mace-windu",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Haruun Kal",
    affiliation: ["Jedi Order", "Jedi High Council"],
    eras: ["fall-of-jedi"],
    role: "Jedi Master · Council Member",
    description:
      "The only Jedi to ever nearly defeat Palpatine in single combat. Wielded a violet blade with Vaapad — a form that walks the edge of the dark side.",
    color: "#2a1a3a",
    lightsaberColor: "purple",
    initials: "MW",
  },
  {
    id: "count-dooku",
    name: "Count Dooku",
    slug: "count-dooku",
    side: "dark",
    forceSensitive: true,
    species: "Human",
    homeworld: "Serenno",
    affiliation: ["Sith Order", "Separatist Alliance", "formerly Jedi Order"],
    eras: ["fall-of-jedi"],
    role: "Sith Lord · Darth Tyranus",
    description:
      "Once a noble Jedi Master who left the Order in disillusionment. Manipulated by Palpatine into leading the Separatists as Darth Tyranus — and ultimately betrayed by him.",
    color: "#0a1a0a",
    lightsaberColor: "red",
    initials: "CD",
  },
  {
    id: "darth-maul",
    name: "Darth Maul",
    slug: "darth-maul",
    side: "dark",
    forceSensitive: true,
    species: "Zabrak",
    homeworld: "Dathomir",
    affiliation: ["Sith Order", "Shadow Collective", "Crimson Dawn"],
    eras: ["fall-of-jedi", "age-of-empire"],
    role: "Sith Assassin · Crime Lord",
    description:
      "The first Sith the Jedi had faced in a millennium. Cut in half by Obi-Wan, but hatred kept him alive — surviving through sheer will to become a dangerous crime lord.",
    color: "#2a0000",
    lightsaberColor: "red",
    initials: "DM",
  },
  {
    id: "rey",
    name: "Rey",
    slug: "rey",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Jakku",
    affiliation: ["Resistance", "New Jedi Order"],
    eras: ["first-order"],
    role: "Jedi · Scavenger",
    description:
      "A scavenger from Jakku who discovered extraordinary Force ability. The granddaughter of Emperor Palpatine — who chose to end his bloodline by taking the Skywalker name.",
    color: "#1a2a1a",
    lightsaberColor: "yellow",
    initials: "RE",
  },
  {
    id: "kylo-ren",
    name: "Kylo Ren",
    slug: "kylo-ren",
    side: "both",
    forceSensitive: true,
    species: "Human",
    homeworld: "Chandrila",
    affiliation: ["First Order", "Knights of Ren", "formerly Jedi"],
    eras: ["first-order"],
    role: "Supreme Leader · Redeemed",
    description:
      "Ben Solo, son of Han and Leia, turned to darkness under Snoke's influence. Became Supreme Leader of the First Order — then sacrificed himself to save Rey.",
    color: "#1a0a1a",
    lightsaberColor: "red",
    initials: "KR",
  },
  {
    id: "qui-gon-jinn",
    name: "Qui-Gon Jinn",
    slug: "qui-gon-jinn",
    side: "light",
    forceSensitive: true,
    species: "Human",
    homeworld: "Coruscant",
    affiliation: ["Jedi Order"],
    eras: ["fall-of-jedi"],
    role: "Jedi Master",
    description:
      "A maverick Jedi who followed the Living Force above the Jedi Council's decrees. Discovered Anakin Skywalker and believed him to be the Chosen One — dying before he could train him.",
    color: "#1a1a2a",
    lightsaberColor: "green",
    initials: "QGJ",
  },
  {
    id: "general-grievous",
    name: "General Grievous",
    slug: "general-grievous",
    side: "dark",
    forceSensitive: false,
    species: "Kaleesh (Cyborg)",
    homeworld: "Kalee",
    affiliation: ["Separatist Alliance"],
    eras: ["fall-of-jedi"],
    role: "Supreme Commander · Jedi Hunter",
    description:
      "A brilliant Kaleesh warlord rebuilt as a cybernetic weapon. Collected Jedi lightsabers as trophies — and hunted their masters across the galaxy.",
    color: "#1a1a1a",
    lightsaberColor: "none",
    initials: "GG",
  },
];

// ===== PLANETS =====
export interface Planet {
  id: string;
  name: string;
  slug: string;
  region: string;
  climate: string;
  terrain: string;
  description: string;
  significance: string;
  notableResidents: string[];
  gradient: string;
  accentColor: string;
  population?: string;
  moons?: string;
}

export const PLANETS: Planet[] = [
  {
    id: "tatooine",
    name: "Tatooine",
    slug: "tatooine",
    region: "Outer Rim",
    climate: "Arid / Desert",
    terrain: "Dunes, Canyons, Salt Flats",
    description:
      "A remote desert world orbiting twin suns in the Outer Rim. Home to moisture farmers, Jawas, Tusken Raiders — and the birthplace of both Anakin and Luke Skywalker.",
    significance: "Birthplace of Anakin Skywalker and Luke Skywalker",
    notableResidents: ["Anakin Skywalker", "Luke Skywalker", "Obi-Wan Kenobi", "Jabba the Hutt"],
    gradient: "radial-gradient(ellipse at 40% 35%, #f5c842 0%, #c87b2a 40%, #8a4a10 70%, #3a1500 100%)",
    accentColor: "#f5c842",
    population: "~200,000",
    moons: "3",
  },
  {
    id: "coruscant",
    name: "Coruscant",
    slug: "coruscant",
    region: "Core Worlds",
    climate: "Temperate (artificial)",
    terrain: "City-wide (Ecumenopolis)",
    description:
      "The shining capital of the galaxy — an entire planet consumed by a single sprawling metropolis. Seat of the Galactic Republic, the Jedi Temple, and later the Empire.",
    significance: "Galactic capital, seat of the Republic and Empire",
    notableResidents: ["Emperor Palpatine", "Yoda", "Mace Windu", "Anakin Skywalker"],
    gradient: "radial-gradient(ellipse at 50% 40%, #4a6fa5 0%, #2a3f6b 35%, #1a2040 60%, #050a1a 100%)",
    accentColor: "#4a6fa5",
    population: "~1 trillion",
  },
  {
    id: "naboo",
    name: "Naboo",
    slug: "naboo",
    region: "Mid Rim",
    climate: "Temperate",
    terrain: "Plains, Swamps, Underwater Cities",
    description:
      "A serene world of rolling meadows and gleaming cities. Home of Queen Padmé Amidala and the birthplace of Sheev Palpatine — beauty concealing dark origins.",
    significance: "Birthplace of Palpatine, home of Padmé Amidala",
    notableResidents: ["Padmé Amidala", "Emperor Palpatine", "Jar Jar Binks"],
    gradient: "radial-gradient(ellipse at 40% 40%, #3a8abf 0%, #1a5a8f 30%, #2a6a3a 55%, #1a3a1a 80%, #081008 100%)",
    accentColor: "#3a8abf",
    population: "~4.5 billion",
    moons: "2",
  },
  {
    id: "hoth",
    name: "Hoth",
    slug: "hoth",
    region: "Outer Rim",
    climate: "Frozen / Tundra",
    terrain: "Ice Plains, Mountains, Tundra",
    description:
      "A barren ice world at the edge of the Outer Rim. Remote enough to hide the Rebel Alliance's Echo Base — until the Empire tracked them down and launched its devastating AT-AT assault.",
    significance: "Site of Echo Base and the Empire's crushing victory",
    notableResidents: ["Luke Skywalker", "Han Solo", "Leia Organa"],
    gradient: "radial-gradient(ellipse at 50% 40%, #e8f4f8 0%, #a8d4e8 30%, #5a9ab5 60%, #1a4a6b 100%)",
    accentColor: "#a8d4e8",
    moons: "3",
  },
  {
    id: "dagobah",
    name: "Dagobah",
    slug: "dagobah",
    region: "Outer Rim",
    climate: "Murky / Swamp",
    terrain: "Swamps, Bogs, Jungle",
    description:
      "A remote, fog-shrouded swamp world saturated with the Force. Yoda chose it for exile specifically because the Living Force here masked his presence from the Emperor.",
    significance: "Yoda's exile and Luke's training ground",
    notableResidents: ["Yoda"],
    gradient: "radial-gradient(ellipse at 40% 60%, #1a4a1a 0%, #0a2a0a 40%, #051505 100%)",
    accentColor: "#2a6a2a",
  },
  {
    id: "endor",
    name: "Endor",
    slug: "endor",
    region: "Outer Rim",
    climate: "Temperate / Forest",
    terrain: "Forests, Mountains, Meadows",
    description:
      "The forest moon of Endor — home to the Ewoks and site of the galaxy's most unlikely battle. The second Death Star hung in orbit here until the Rebel Alliance destroyed it.",
    significance: "Site of the Battle of Endor and Death Star II's destruction",
    notableResidents: ["Ewoks", "Han Solo", "Luke Skywalker"],
    gradient: "radial-gradient(ellipse at 30% 40%, #4a8a2a 0%, #2a5a10 40%, #1a3a08 70%, #080f03 100%)",
    accentColor: "#4a8a2a",
  },
  {
    id: "kamino",
    name: "Kamino",
    slug: "kamino",
    region: "Outer Rim",
    climate: "Stormy / Aquatic",
    terrain: "Ocean (entirely covered)",
    description:
      "An ocean world battered by endless storms. Home of the Kaminoans — master cloners who secretly engineered the Grand Army of the Republic from Jango Fett's DNA.",
    significance: "Birthplace of the Clone Army",
    notableResidents: ["Jango Fett", "Boba Fett"],
    gradient: "radial-gradient(ellipse at 50% 30%, #a8d4e8 0%, #2a6a8f 30%, #1a3a5f 60%, #050a1a 100%)",
    accentColor: "#2a8abf",
  },
  {
    id: "mustafar",
    name: "Mustafar",
    slug: "mustafar",
    region: "Outer Rim",
    climate: "Scorching / Volcanic",
    terrain: "Lava Rivers, Volcanic Rock, Mining Facilities",
    description:
      "A tortured volcanic world of rivers of fire. Where Anakin Skywalker fought Obi-Wan Kenobi, lost three limbs, and was consumed by flame — emerging as Darth Vader.",
    significance: "Site of Anakin's fall and transformation into Vader",
    notableResidents: ["Darth Vader (castle)"],
    gradient: "radial-gradient(ellipse at 50% 50%, #ff4500 0%, #cc2200 30%, #8a1000 60%, #2a0000 100%)",
    accentColor: "#ff4500",
  },
  {
    id: "mandalore",
    name: "Mandalore",
    slug: "mandalore",
    region: "Outer Rim",
    climate: "Harsh (post-war)",
    terrain: "Deserts, Domed Cities",
    description:
      "Homeworld of the legendary Mandalorian warriors. Once a lush world, centuries of war reduced it to a barren wasteland — its people retreating into domed cities above the sand.",
    significance: "Homeworld of Mandalorian culture and warriors",
    notableResidents: ["Duchess Satine", "Bo-Katan", "Pre Vizsla"],
    gradient: "radial-gradient(ellipse at 40% 40%, #8a7a6a 0%, #5a4a3a 40%, #3a2a1a 70%, #1a1000 100%)",
    accentColor: "#8a7a6a",
  },
  {
    id: "scarif",
    name: "Scarif",
    slug: "scarif",
    region: "Outer Rim",
    climate: "Tropical",
    terrain: "Beaches, Jungle, Imperial Citadel",
    description:
      "A paradise planet turned military fortress. The Empire built its most secure data vault here — and Rogue One gave their lives to steal the Death Star plans from its shores.",
    significance: "Site of Rogue One's sacrifice and Death Star plan theft",
    notableResidents: ["Jyn Erso", "Cassian Andor"],
    gradient: "radial-gradient(ellipse at 40% 30%, #2a8a6a 0%, #1a5a4a 40%, #0a3a2a 70%, #031510 100%)",
    accentColor: "#2a8a6a",
  },
  {
    id: "jedha",
    name: "Jedha",
    slug: "jedha",
    region: "Mid Rim",
    climate: "Cold / Desert",
    terrain: "Canyons, Holy City, Ancient Temples",
    description:
      "A holy moon ancient in Force tradition. Pilgrims from across the galaxy traveled to its Holy City — until the Empire mined its kyber crystals and tested the Death Star on it.",
    significance: "Ancient Force pilgrimage site, destroyed by the Death Star",
    notableResidents: ["Chirrut Îmwe", "Baze Malbus", "Saw Gerrera"],
    gradient: "radial-gradient(ellipse at 50% 40%, #8a8a6a 0%, #5a5a3a 40%, #3a3a1a 70%, #141400 100%)",
    accentColor: "#c8b86a",
  },
  {
    id: "jakku",
    name: "Jakku",
    slug: "jakku",
    region: "Outer Rim",
    climate: "Arid / Desert",
    terrain: "Dunes, Starship Graveyard",
    description:
      "A desolate desert world littered with the wreckage of the Battle of Jakku — downed Star Destroyers and Imperial walkers half-buried in the sand. Home to scavenger Rey.",
    significance: "Home of Rey; site of the final battle of the Civil War",
    notableResidents: ["Rey", "Unkar Plutt"],
    gradient: "radial-gradient(ellipse at 50% 40%, #c8a060 0%, #8a6030 40%, #4a3010 70%, #1a0f00 100%)",
    accentColor: "#c8a060",
  },
];

// ===== FACTIONS =====
export interface Faction {
  id: string;
  name: string;
  slug: string;
  side: "light" | "dark" | "neutral";
  eras: string[];
  eraColor: string;
  description: string;
  color: string;
  emblem: string;
  leaders: string[];
  military: string[];
  founded: string;
  dissolved?: string;
  capital: string;
}

export const FACTIONS: Faction[] = [
  {
    id: "jedi-order",
    name: "Jedi Order",
    slug: "jedi-order",
    side: "light",
    eras: ["old-republic", "high-republic", "fall-of-jedi"],
    eraColor: "#0EA5E9",
    description:
      "Guardians of peace and justice in the Galactic Republic for thousands of years. The Jedi wielded the light side of the Force, bound by a code of compassion, serenity, and selflessness.",
    color: "#4DACFF",
    emblem: "✦",
    leaders: ["Yoda", "Mace Windu", "Qui-Gon Jinn", "Obi-Wan Kenobi"],
    military: ["Jedi Knights", "Jedi Masters", "Clone Army (Clone Wars)", "Padawans"],
    founded: "c. 25,000 BBY",
    dissolved: "19 BBY (Order 66)",
    capital: "Coruscant (Jedi Temple)",
  },
  {
    id: "sith-order",
    name: "Sith Order",
    slug: "sith-order",
    side: "dark",
    eras: ["old-republic", "fall-of-jedi", "age-of-empire"],
    eraColor: "#6D28D9",
    description:
      "Ancient enemies of the Jedi who draw power from the dark side — passion, strength, power, victory, freedom. After the Rule of Two, only ever two: a master and an apprentice.",
    color: "#EF4444",
    emblem: "◈",
    leaders: ["Darth Bane", "Darth Plagueis", "Darth Sidious", "Darth Vader"],
    military: ["Sith Assassins", "Inquisitorius", "Imperial forces"],
    founded: "c. 6,900 BBY (old order) / 1,000 BBY (Rule of Two)",
    capital: "Exegol (hidden)",
  },
  {
    id: "galactic-republic",
    name: "Galactic Republic",
    slug: "galactic-republic",
    side: "light",
    eras: ["old-republic", "high-republic", "fall-of-jedi"],
    eraColor: "#0EA5E9",
    description:
      "The democratic government that united countless star systems for over 25,000 years. Defended by the Jedi Order and, in its final decades, the Grand Army of the Republic.",
    color: "#4DACFF",
    emblem: "◉",
    leaders: ["Supreme Chancellor Palpatine", "Padmé Amidala", "Mon Mothma"],
    military: ["Grand Army of the Republic", "Clone Troopers", "Republic Navy"],
    founded: "c. 25,053 BBY",
    dissolved: "19 BBY (transformed into the Empire)",
    capital: "Coruscant",
  },
  {
    id: "separatist-alliance",
    name: "Separatist Alliance",
    slug: "separatist-alliance",
    side: "dark",
    eras: ["fall-of-jedi"],
    eraColor: "#F59E0B",
    description:
      "The Confederacy of Independent Systems — thousands of star systems that seceded from the Republic. Secretly orchestrated by Darth Sidious to justify a galactic war and seize power.",
    color: "#F59E0B",
    emblem: "⬡",
    leaders: ["Count Dooku", "General Grievous", "Nute Gunray", "Wat Tambor"],
    military: ["Droid Army", "B1 Battle Droids", "B2 Super Battle Droids", "Droid Starfighter Corps"],
    founded: "24 BBY",
    dissolved: "19 BBY (Order 66)",
    capital: "Raxus Secundus",
  },
  {
    id: "galactic-empire",
    name: "Galactic Empire",
    slug: "galactic-empire",
    side: "dark",
    eras: ["age-of-empire"],
    eraColor: "#EF4444",
    description:
      "The authoritarian regime born from the ashes of the Republic. Ruling through fear, the Death Star, and an iron-fisted military, the Empire dominated the galaxy for over two decades.",
    color: "#9CA3AF",
    emblem: "⬛",
    leaders: ["Emperor Palpatine", "Darth Vader", "Grand Moff Tarkin", "Director Krennic"],
    military: ["Imperial Stormtroopers", "Imperial Navy", "Death Star", "TIE Fighters", "AT-AT Walkers"],
    founded: "19 BBY",
    dissolved: "5 ABY (Battle of Jakku)",
    capital: "Coruscant",
  },
  {
    id: "rebel-alliance",
    name: "Rebel Alliance",
    slug: "rebel-alliance",
    side: "light",
    eras: ["age-of-empire"],
    eraColor: "#EF4444",
    description:
      "The Alliance to Restore the Republic — a coalition of freedom fighters from every corner of the galaxy. They destroyed two Death Stars and ended the Empire's reign of terror.",
    color: "#EF4444",
    emblem: "✪",
    leaders: ["Mon Mothma", "Princess Leia", "Admiral Ackbar", "General Dodonna"],
    military: ["X-Wing Squadrons", "Y-Wing Bombers", "Mon Calamari Cruisers", "Rebel Troopers"],
    founded: "2 BBY (formally)",
    dissolved: "5 ABY (reformed as New Republic)",
    capital: "Rebel Base (various) / Home One",
  },
  {
    id: "new-republic",
    name: "New Republic",
    slug: "new-republic",
    side: "light",
    eras: ["new-republic"],
    eraColor: "#3B82F6",
    description:
      "The democratic government established after the Empire's fall. Sought to demilitarize and restore freedom — but its complacency allowed the First Order to rise from the shadows.",
    color: "#3B82F6",
    emblem: "◎",
    leaders: ["Mon Mothma", "Chancellor Villecham", "Leia Organa"],
    military: ["New Republic Defense Fleet", "Starfighter Corps"],
    founded: "4 ABY",
    dissolved: "34 ABY (Hosnian Cataclysm)",
    capital: "Chandrila, then Hosnian Prime",
  },
  {
    id: "first-order",
    name: "First Order",
    slug: "first-order",
    side: "dark",
    eras: ["first-order"],
    eraColor: "#6B7280",
    description:
      "The successor to the Galactic Empire — a military junta that arose from Imperial remnants hiding in the Unknown Regions. Built Starkiller Base and shattered the New Republic in an instant.",
    color: "#6B7280",
    emblem: "✖",
    leaders: ["Supreme Leader Snoke", "Kylo Ren", "General Hux"],
    military: ["Stormtroopers", "First Order Navy", "TIE Silencers", "AT-M6 Walkers", "Starkiller Base"],
    founded: "c. 28 ABY",
    dissolved: "35 ABY (Rise of Skywalker)",
    capital: "Starkiller Base / Steadfast",
  },
];
