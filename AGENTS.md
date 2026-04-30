# AGENTS.md - Zenith Project Blueprint

This document serves as the primary technical guide and instruction set for AI Agents and developers working on the **Zenith** project. It outlines the architecture, technology stack, and development roadmap based on the initial strategic planning.

## 1. Project Overview
**Zenith** is a modern, full-stack anime streaming platform designed to be high-performance, scalable, and cost-effective. It avoids traditional monolithic CMS (like WordPress) in favor of a modern JavaScript ecosystem and serverless edge computing.

## 2. Technology Stack
- **Frontend Framework**: [Nuxt.js](https://nuxt.com/) (Vue.js ecosystem)
- **Deployment Platform**: Cloudflare Pages (with Nitro preset for Edge compatibility)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + GoTrue Auth)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/) (Zero egress fees for video streaming)
- **Edge Logic**: Cloudflare Workers (for presigned URL generation and rate limiting)
- **Video Playback**: [HLS.js](https://github.com/video-dev/hls.js/) or [PlayerJS](https://playerjs.com/) (Customizable HTML5 Player)

## 3. Project Structure (Monorepo)
A monorepo structure using **Turborepo** or **pnpm workspaces** is recommended to manage the frontend and edge functions in one place.

```text
zenith/
├── apps/
│   └── web/                # Nuxt.js Frontend (Cloudflare Pages)
│       ├── components/     # UI Components (Shadcn/UI)
│       ├── composables/    # Logic (useAuth, useStream, etc.)
│       ├── pages/          # Routes (Anime detail, Player, etc.)
│       ├── server/         # Nitro Server Engine (API Routes)
│       └── public/         # Static Assets
├── packages/
│   ├── database/           # Supabase Migrations & Types
│   └── shared/             # Shared TS types/utils
├── workers/
│   └── stream-signer/      # Cloudflare Worker for R2 Presigned URLs
├── wrangler.toml           # Cloudflare configuration
└── AGENTS.md               # This file
```

## 4. Stack Comparison: Cloudflare Native vs. Supabase Hybrid
Based on the architectural analysis in `conversations.json`, here is the breakdown:

| Feature | Full Cloudflare (Native) | Supabase + R2 (Hybrid) |
| :--- | :--- | :--- |
| **Database** | D1 (SQLite based) | PostgreSQL (Full-featured) |
| **Auth** | Manual (JWT + KV) | Built-in (Supabase Auth) |
| **Search** | Limited (Basic SQL) | Advanced (Full-text Search, pgvector) |
| **Real-time** | Durable Objects (Complex) | Supabase Realtime (Seamless) |
| **Development** | Higher complexity (Edge limits) | High velocity (Rapid development) |
| **Scaling** | Extreme (300+ Edge locations) | Regional (Postgres core) |

**Final Recommendation**: Use the **Hybrid Stack** (Supabase for DB/Auth, R2 for Storage) for maximum development speed and feature richness without sacrificing streaming performance.

## 5. Frontend & Video Player Logic
The platform can utilize either a bare-bones **HLS.js** implementation or a more feature-rich player like **PlayerJS**.

### Using PlayerJS in Nuxt
PlayerJS is compatible with Nuxt, but must be initialized strictly on the client-side to avoid SSR errors.

**Implementation Strategy:**
1.  **Script Injection**: Load the PlayerJS script via `useHead` or `nuxt.config`.
2.  **Lifecycle Hook**: Initialize inside `onMounted()`.
3.  **HLS Integration**: Ensure the PlayerJS build supports HLS if streaming from R2.

```vue
<!-- Example Component -->
<script setup>
onMounted(() => {
  if (process.client && typeof Playerjs !== 'undefined') {
    new Playerjs({
      id: "player",
      file: streamingUrl.value, // Presigned R2 URL
      poster: posterUrl.value
    });
  }
});
</script>
```


## 3. System Architecture (Hybrid Approach)
The platform uses a hybrid architecture to balance developer velocity and performance:
- **Supabase** handles the "heavy lifting" of relational data, authentication, and real-time features (comments/notifications).
- **Cloudflare R2** stores all media assets (videos, posters, thumbnails).
- **Cloudflare Workers** act as a security/optimization layer for streaming and edge-side caching.

### High-Level Flow
1. **Client** requests video metadata from **Supabase**.
2. **Client** requests a presigned streaming URL from **Cloudflare Workers**.
3. **Worker** validates the user's session and generates a temporary R2 access URL.
4. **Client Video Player** fetches HLS segments (.ts) directly from **R2 edge**.

## 4. Database Schema (PostgreSQL)
The database is structured to support complex filtering (genre, season, rating) and user engagement.

### Core Tables
- `profiles`: User information extending Supabase Auth.
- `anime`: Metadata including slug, status, type, and search vectors.
- `genres` & `anime_genres`: Many-to-many relationship for classification.
- `episodes`: Episode data linked to anime.
- `video_sources`: Links to R2 objects for different qualities (1080p, 720p, etc.).
- `subtitles`: Multilingual subtitle support (.vtt).
- `watch_history`: Progress tracking and "watched" status.
- `bookmarks`: User watchlists (Plan to watch, Watching, etc.).
- `comments`: Nested commenting system with spoiler tags.

## 5. Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Setup monorepo (Turborepo).
- [ ] Initialize Supabase project & migrations.
- [ ] Configure R2 buckets & CORS policies.
- [ ] Setup base Nuxt.js app with Tailwind/Shadcn.

### Phase 2: Core Backend (Weeks 3-4)
- [ ] Implement Auth flow (Register/Login).
- [ ] Define Supabase RLS (Row Level Security) policies.
- [ ] Build basic CRUD for Anime & Episodes.
- [ ] Implement Worker for R2 Presigned URLs.

### Phase 3: Frontend Shell (Weeks 5-6)
- [ ] Design System & Layout (Navbar, Hero).
- [ ] Anime Listing & Detail pages.
- [ ] Video Player integration (HLS.js).

### Phase 4: User Features (Weeks 7-8)
- [ ] Watch history & progress autosave.
- [ ] Bookmarks/Watchlist functionality.
- [ ] Real-time comments via Supabase.
- [ ] Search & Filter implementation.

### Phase 5: Admin & Content (Weeks 9-10)
- [ ] Admin dashboard for anime management.
- [ ] Video upload & Transcoding pipeline (FFmpeg/CF Stream).
- [ ] Subtitle management.

## 6. Critical Guidelines for Agents
- **API Contract First**: Always define the data structure before building the UI.
- **Edge Compatibility**: Avoid Node.js-specific libraries in Workers/SSR; use Web Crypto API for security.
- **Video Efficiency**: Use HLS segmentation for all video content to enable adaptive bitrate streaming and low-latency seeking.
- **Security**: Never expose R2 secret keys; always use Workers to sign requests.
- **SEO**: Use Nuxt's `useSeoMeta` for all dynamic pages (Anime detail, Episode player).

---
*Created from initial planning conversation 2026-04-29.*
