# AGENTS.md - Zenith Project Blueprint

This document serves as the primary technical guide and instruction set for AI Agents and developers working on the **Zenith** project. It outlines the architecture, technology stack, and development roadmap based on the initial strategic planning.

## 1. Project Overview
**Zenith** is a modern, full-stack anime streaming platform designed to be high-performance, scalable, and cost-effective. It avoids traditional monolithic CMS (like WordPress) in favor of a modern JavaScript ecosystem and serverless edge computing.

## 2. Technology Stack
- **Frontend Framework**: [Nuxt.js 4](https://nuxt.com/)
- **Deployment Platform**: Cloudflare Pages
- **Database & Auth**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (Native SQLite on the Edge)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- **Edge Logic**: Nuxt Server (Nitro) + Cloudflare Workers
- **Video Playback**: [HLS.js](https://github.com/video-dev/hls.js/) (Custom Player with Gesture Control)

## 3. Project Structure (Monorepo)
A monorepo structure using **Turborepo** or **pnpm workspaces** is recommended to manage the frontend and edge functions in one place.

```text
zenith/
├── app/                    # Nuxt 4 Frontend (Vue.js)
│   ├── components/         # UI Components (Shadcn/UI / Nuxt UI)
│   ├── composables/        # Shared Logic
│   ├── layouts/            # Page Layouts
│   └── pages/              # App Routes
├── server/                 # Nitro Server Engine (API & Middleware)
│   ├── api/                # API Endpoints (D1/R2 Logic)
│   ├── middleware/         # Auth & Global Logic
│   └── utils/              # DB & R2 Helpers
├── public/                 # Static Assets
├── migrations/             # D1 SQL Migrations
├── shared/                 # Shared TS types/utils
├── wrangler.jsonc          # Cloudflare configuration
└── AGENTS.md               # This file
```

**Final Recommendation**: Use the **Full Cloudflare Native Stack**. By using D1 for Database and Auth alongside R2, we minimize cross-platform latency, simplify deployment via Cloudflare Pages, and reduce vendor spread.

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


## 3. System Architecture (Cloudflare Native)
The platform uses a unified architecture for maximum performance at the edge:
- **Cloudflare D1** handles all relational data, user profiles, and session metadata.
- **Cloudflare R2** stores all media assets (videos, posters, thumbnails).
- **Nuxt Server (Nitro)** provides the API layer, interacting directly with D1 and R2 via Cloudflare Bindings.

### High-Level Flow
1. **Client** requests data from **Nuxt API** (running on Cloudflare Pages).
2. **API** queries **D1** for metadata or generates presigned **R2** URLs for streaming.
3. **Client Video Player** fetches HLS segments (.ts) directly from **R2** via the signed URL.

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

### Phase 1: Foundation
- [x] Initialize Nuxt 4 & Cloudflare Pages.
- [x] Setup D1 Database & Initial Migrations.
- [x] Configure R2 Bucket & CORS policies.

### Phase 2: Core Backend & Auth
- [x] Implement D1-based Auth (Register/Login/Cookie).
- [x] Build CRUD for Anime & Genres.
- [x] Implement R2 Presigned URL logic.

### Phase 3: Frontend Shell
- [x] Studio Dashboard (Overview, Stats, Genre).
- [x] Anime Management UI.
- [/] Episode & Video Source Manager.
- [x] Optimized Video Player (HLS.js).

### Phase 4: User Features
- [ ] Search & Filter implementation (D1 Query).
- [ ] Watch history & progress tracking.
- [ ] Bookmarks/Watchlist functionality.
- [ ] Real-time features (Polling or Durable Objects).

### Phase 5: Advanced & Content
- [ ] Video upload & Transcoding pipeline (FFmpeg).
- [ ] Subtitle management.
- [ ] SEO & Analytics.

## 6. Critical Guidelines for Agents
- **API Contract First**: Always define the data structure before building the UI.
- **Edge Compatibility**: Avoid Node.js-specific libraries in Workers/SSR; use Web Crypto API for security.
- **Video Efficiency**: Use HLS segmentation for all video content to enable adaptive bitrate streaming and low-latency seeking.
- **Security**: Never expose R2 secret keys; always use Workers to sign requests.
- **SEO**: Use Nuxt's `useSeoMeta` for all dynamic pages (Anime detail, Episode player).

---
*Created from initial planning conversation 2026-04-29.*
