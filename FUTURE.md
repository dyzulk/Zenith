# Future Implementation Notes & Architecture Decisions

This document serves as a record of architectural decisions, upcoming features, and implementation guidelines discussed during the development of GoxStream.

## 1. Franchise Frontend Architecture (Watch Order / Related Anime)

**Context:** The database schema includes a `Franchise` model with `franchiseId` and `franchiseOrder` fields in the `Anime` model. This allows us to link multiple seasons, movies, and spin-offs (e.g., Solo Leveling Season 1 and Season 2).

**Decision:** We will **NOT** create a dedicated, standalone Franchise page (e.g., `/franchise/solo-leveling`). 

**Implementation Strategy:**
- **Analogy:** It will function similarly to a "Related Posts" section on a blog.
- **Location:** The franchise data will be utilized directly inside the Anime Detail Page (`/anime/[slug]`).
- **Behavior:** When a user views an anime (e.g., Season 1), the system will query the database for all other anime sharing the same `franchiseId` (excluding the current one) and display them in a component (e.g., `<RelatedFranchise />` or `<WatchOrder />`).
- **Ordering:** The list must be sorted using the `franchiseOrder` field (`ORDER BY franchise_order ASC`) to provide users with an accurate chronological "Watch Order".

**Backend Query Example for Nuxt API:**
```typescript
// Example Prisma query to be implemented in the frontend API
const relatedAnimes = await prisma.anime.findMany({
  where: { 
    franchiseId: currentAnime.franchiseId,
    id: { not: currentAnime.id } 
  },
  orderBy: {
    franchiseOrder: 'asc'
  }
})
```

**Benefits:**
- Better User Experience (UX): Users can easily navigate to the next season directly from the anime they just finished.
- Less routing overhead: Eliminates the need for intermediary "Franchise Selection" screens.
- Keeps the frontend architecture flat and fast.
