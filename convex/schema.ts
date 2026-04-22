import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.union(
      v.literal("lore"),
      v.literal("battle"),
      v.literal("character"),
      v.literal("planet"),
      v.literal("faction"),
      v.literal("technology"),
      v.literal("game"),
      v.literal("mod")
    ),
    era: v.optional(v.string()),
    content: v.string(),
    excerpt: v.string(),
    coverImage: v.optional(v.string()),
    tags: v.array(v.string()),
    authorId: v.optional(v.string()),
    views: v.number(),
    featured: v.boolean(),
    publishedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_era", ["era"])
    .index("by_featured", ["featured"]),

  battles: defineTable({
    name: v.string(),
    slug: v.string(),
    era: v.string(),
    year: v.number(),
    yearLabel: v.string(),
    location: v.string(),
    participants: v.array(
      v.object({
        faction: v.string(),
        side: v.union(v.literal("light"), v.literal("dark"), v.literal("neutral")),
        commanders: v.array(v.string()),
      })
    ),
    outcome: v.string(),
    winningSide: v.optional(v.string()),
    casualties: v.optional(v.string()),
    significance: v.union(v.literal("critical"), v.literal("major"), v.literal("moderate")),
    description: v.string(),
    coverImage: v.optional(v.string()),
    tags: v.array(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_era", ["era"])
    .index("by_year", ["year"]),

  timelineEvents: defineTable({
    title: v.string(),
    year: v.number(),
    yearLabel: v.string(),
    era: v.string(),
    eraColor: v.string(),
    category: v.union(
      v.literal("battle"),
      v.literal("political"),
      v.literal("character"),
      v.literal("technology"),
      v.literal("force")
    ),
    importance: v.union(v.literal("critical"), v.literal("major"), v.literal("minor")),
    description: v.string(),
    linkedArticleSlug: v.optional(v.string()),
  })
    .index("by_era", ["era"])
    .index("by_year", ["year"]),

  games: defineTable({
    title: v.string(),
    slug: v.string(),
    developer: v.string(),
    publisher: v.string(),
    releaseYear: v.number(),
    genre: v.array(v.string()),
    platforms: v.array(v.string()),
    era: v.string(),
    description: v.string(),
    coverImage: v.optional(v.string()),
    rating: v.optional(v.number()),
    featured: v.boolean(),
    steamUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["featured"]),

  mods: defineTable({
    title: v.string(),
    slug: v.string(),
    baseGame: v.string(),
    type: v.union(v.literal("total-conversion"), v.literal("overhaul"), v.literal("content"), v.literal("visual")),
    developer: v.string(),
    status: v.union(v.literal("active"), v.literal("beta"), v.literal("complete"), v.literal("abandoned")),
    description: v.string(),
    longDescription: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    steamWorkshopUrl: v.optional(v.string()),
    discordUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    era: v.string(),
    factions: v.array(v.string()),
    featured: v.boolean(),
    playerCount: v.optional(v.string()),
    lastUpdated: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_base_game", ["baseGame"])
    .index("by_featured", ["featured"]),

  comments: defineTable({
    articleSlug: v.string(),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
    createdAt: v.number(),
    likes: v.number(),
  }).index("by_article", ["articleSlug"]),

  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    displayName: v.string(),
    avatar: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("contributor"), v.literal("admin")),
    joinedAt: v.number(),
    contributionCount: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});
