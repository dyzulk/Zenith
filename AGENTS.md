# AGENTS.md - Zenith Project Blueprint

This document serves as the primary technical guide and instruction set for AI Agents and developers working on the **Zenith** project. It outlines the architecture, technology stack, and coding standards.

**All documentation and comments must be in English.**

## 1. Project Overview

**Zenith** is a modern, full-stack anime streaming platform designed to be high-performance, scalable, and cost-effective. It avoids traditional monolithic CMS (like WordPress) in favor of a modern JavaScript ecosystem and serverless edge computing.

## 2. Technology Stack

- **Frontend Framework**: [Nuxt.js 4](https://nuxt.com/)
- **Deployment Platform**: Cloudflare Pages
- **Database**: [Aiven PostgreSQL](https://aiven.io/) (Migrated from D1 for scalability)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- **Edge Logic**: Nuxt Server (Nitro) + Cloudflare Workers
- **UI Library**: [@nuxt/ui](https://ui.nuxt.com/) (v4)
- **Video Playback**: [HLS.js](https://github.com/video-dev/hls.js/) (Custom Player with Gesture Control)

## 3. Project Structure

```text
zenith/
├── app/                    # Nuxt 4 application (main app layer)
│   ├── components/         # Vue components (PascalCase)
│   │   └── ui/             # Nuxt UI / shadcn components
│   ├── composables/        # Vue composables (camelCase, use* prefix)
│   ├── layouts/            # Page layouts
│   ├── pages/              # File-based routing
│   ├── types/              # TypeScript types
│   ├── utils/              # Client-side utility functions
│   └── lib/                # Shared helpers
├── server/                 # Nitro server (API & Middleware)
│   ├── api/                # API endpoints (method suffix: create.post.ts)
│   ├── middleware/         # Auth & global server logic
│   └── utils/              # Server utilities (auto-imported)
├── shared/                 # Shared code (client + server)
│   ├── schemas/            # Zod validation schemas
│   └── types/              # Shared TypeScript types
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets (images, fonts)
├── migrations/             # Legacy D1 migrations
├── wrangler.toml           # Cloudflare configuration
└── AGENTS.md               # This file
```

## 4. Commands

Use **pnpm** (v9+) with **Node.js 22+**.

```bash
# Development
pnpm dev                  # Start dev server
pnpm build                # Production build
pnpm preview              # Local preview via wrangler
pnpm lint                 # Run ESLint check
pnpm format               # Run Prettier format

# Database (Prisma)
npx prisma generate       # Generate Prisma Client
npx prisma db push        # Push schema changes to DB
npx prisma studio         # Open Prisma Studio
```

## 5. Code Style

### Formatting
- 2-space indent
- Single quotes
- No semicolons
- Trailing commas

### TypeScript
- Use TypeScript everywhere; prefer `interface` for objects, `type` for unions/aliases.
- Avoid `any`; use proper types or `unknown`.
- Use Zod for runtime validation in `shared/schemas/`.
- Export types with `export type` for type-only exports.

### Vue Components
- Use `<script setup lang="ts">` always.
- Files: PascalCase (`VideoPlayer.vue`).
- Use Nuxt UI components where possible.
- Use static English for `aria-label` (no `$t()` translations).

### Imports
- **Prefer Nuxt auto-imports**: `ref`, `computed`, `useFetch`, `useState`, `useRuntimeConfig`, etc.
- **Explicit imports**: External libraries, types (`import type { ... }`), and icons (`import { Play } from 'lucide-vue-next'`).
- **Server utils**: Auto-imported from `server/utils/`.

### Naming Conventions

| Item           | Convention       | Example              |
| -------------- | ---------------- | -------------------- |
| Components     | PascalCase       | `EpisodeCard.vue`    |
| Composables    | `use` prefix     | `useStreamingUrl()`  |
| API routes     | method suffix    | `stream.get.ts`      |
| Directories    | kebab-case       | `anime-management/`  |
| Functions/vars | camelCase        | `fetchAnimeData`     |
| Constants      | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`    |

## 6. Error Handling

```typescript
// Server API - use createError for HTTP errors
export default eventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, AnimeSchema.parse)
  } catch (e) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Invalid Input',
      data: e 
    })
  }
})
```

## 7. Cloudflare Bindings
## 7. Cloudflare Bindings & Environment Variables

Access via destructuring `event.context` in Nitro handlers. Bindings and environment variables are separate entities.

```typescript
// Nitro event handler example
export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  const { R2, KV, AI, VIEWS } = cloudflare.env // Bindings
  const { DATABASE_URL, PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = cloudflare.env // Environment Variables
})
```

### Cloudflare Bindings

| Binding     | Type             | Purpose                                  |
| ----------- | ---------------- | ---------------------------------------- |
| `R2`        | R2 Bucket        | Media assets (video, posters, thumb)     |
| `KV`        | Workers KV       | Persistent key-value storage             |
| `AI`        | Workers AI       | AI-powered features                      |
| `VIEWS`     | Analytics Engine | View count & usage tracking              |
| `DB`        | D1 Database      | Relational data (Legacy/SQLite)          |

### Environment Variables

| Variable                       | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| Variable                       | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `DATABASE_URL`                 | Universal PostgreSQL connection string (Aiven/Supabase/Neon/Self-hosted) |
| `DATABASE_SSL_CA`              | SSL Certificate content for database (Required for Cloudflare Edge) |
| `DATABASE_SSL_CA_PATH`         | Local filesystem path to database SSL certificate (Development)   |
| `NODE_VERSION`                 | Node.js version (22+)                             |
| `ACCOUNT_ID`                   | Cloudflare Account ID (Required for R2 signing)   |
| `R2_ACCOUNT_ID`                | Cloudflare Account ID for R2 storage              |
| `R2_ACCESS_KEY_ID`             | S3-compatible Access Key for R2                   |
| `R2_SECRET_ACCESS_KEY`         | S3-compatible Secret Key for R2                   |
| `R2_BUCKET_NAME`               | Name of the R2 bucket for media storage           |
| `R2_ENDPOINT`                  | S3-compatible API endpoint for R2                 |
| `R2_PUBLIC_DOMAIN`             | Public domain/CDN for R2 objects (Streaming)      |
| `R2_REGION`                    | R2 bucket region (e.g., apac)                     |
| `GOOGLE_CLIENT_ID`             | Google OAuth Client ID (if enabled)               |
| `PUSHER_APP_ID`                | Pusher App ID for real-time events                |
| `PUSHER_KEY`                   | Pusher Public Key                                 |
| `PUSHER_SECRET`                | Pusher Secret Key                                 |
| `PUSHER_CLUSTER`               | Pusher Cluster region (e.g., ap1)                 |



## 8. Server Utils

Server utilities in `server/utils/` are auto-imported and available globally in server code.

- `useDB(event)` - Get Prisma client instance with PostgreSQL/Edge adapter.
- `useR2(event)` - Get Cloudflare R2 bucket binding (includes local mock fallback).
- `getSettings(event)` - Fetch site-wide settings from D1/PostgreSQL.

## 9. API Route Patterns

API routes use method suffix convention to define the HTTP method:

- `create.post.ts` → `POST /api/anime/create`
- `query.get.ts` → `GET /api/anime/query`
- `edit.put.ts` → `PUT /api/anime/edit`
- `delete.delete.ts` → `DELETE /api/anime/delete`

Use `readValidatedBody` for POST/PUT requests and `getQuery` for GET requests.

## 10. Database Schema (PostgreSQL)

The database is structured to support complex filtering and user engagement via Prisma.

### Core Entities
- `Profile`: User information extending Auth.
- `Anime`: Metadata including slug, status, type, and search vectors.
- `Genre`: Many-to-many relationship for classification.
- `Episode`: Episode data linked to anime.
- `VideoSource`: Links to R2 objects for different qualities (1080p, 720p, etc.).
- `Subtitle`: Multilingual subtitle support (.vtt).
- `WatchHistory`: Progress tracking and "watched" status.
- `Bookmark`: User watchlists (Plan to watch, Watching, etc.).
- `Comment`: Nested commenting system with spoiler tags.

## 11. Development Roadmap

### Phase 1: Foundation
- [x] Initialize Nuxt 4 & Cloudflare Pages.
- [x] Setup D1 Database & Initial Migrations (Legacy).
- [x] Configure R2 Bucket & CORS policies.

### Phase 2: Core Backend & Auth
- [x] Implement Auth (Register/Login/Cookie).
- [x] Build CRUD for Anime & Genres.
- [x] Implement R2 Presigned URL logic.

### Phase 3: Frontend Shell
- [x] Studio Dashboard (Overview, Stats, Genre).
- [x] Anime Management UI.
- [x] Episode & Video Source Manager.
- [x] Optimized Video Player (HLS.js).

### Phase 4: User Features
- [x] Search & Filter implementation.
- [x] Watch history & progress tracking.
- [x] Bookmarks/Watchlist functionality.
- [x] Real-time features (Comment System via Pusher).

### Phase 5: Advanced & Content
- [ ] Dynamic SEO (Meta Tags & Open Graph).
- [ ] Subtitle management.
- [ ] Video upload & Transcoding pipeline (FFmpeg).
- [ ] Analytics (View Count & Tracking).

## 10. API Route Patterns

API routes use method suffix convention:
- `create.post.ts` → `POST /api/anime/create`
- `query.get.ts` → `GET /api/anime/query`
- `edit.put.ts` → `PUT /api/anime/edit`

## 11. UI Components

- Use Nuxt UI (v4) - **Never edit** core UI components if they are auto-generated.
- Use Tailwind CSS v4 for styling.
- Icons from `lucide-vue-next`.
- Ensure mobile-optimized layouts for the video player.

## 12. Commits

Follow Conventional Commits:
- `feat:`: New features
- `fix:`: Bug fixes
- `docs:`: Documentation changes
- `refactor:`: Code refactoring
- `chore:`: Maintenance tasks

## 13. Pre-commit

Run `pnpm lint` and `pnpm format` before committing to ensure code quality.

## 14. Critical Guidelines for Agents

- **Rule Preservation**: NEVER remove existing rules while adding new ones. All updates to this document must be additive or clarifying, ensuring no historical context or safety guidelines are lost.
- **API Contract First**: Always define the data structure before building the UI.
- **Edge Compatibility**: Avoid Node.js-specific libraries in Workers/SSR; use Web standard APIs.
- **Video Efficiency**: Use HLS segmentation for all video content to enable adaptive bitrate streaming and low-latency seeking.
- **Security**: Never expose R2 secret keys; always use Workers to sign requests.
- **SEO**: Use Nuxt's `useSeoMeta` for all dynamic pages (Anime detail, Episode player).

### 14.1 Cloudflare Pages & CLI Safety Rules
- **Infrastructure Configuration**:
    - **NO WRANGLER.TOML**: The use of `wrangler.toml` or `wrangler.json` is strictly prohibited. All configurations (Compatibility Flags, Bindings, etc.) MUST be managed directly via the Cloudflare Pages Dashboard.
    - **CLI Prohibition**: Respect strict prohibitions on using `wrangler` CLI for infrastructure inspection, deployment modification, or secret management (e.g., `wrangler pages secret ...`). This is to avoid accidental state changes or configuration corruption.
- **Environment Variable Integrity**: 
    - NEVER use `wrangler pages secret bulk` unless explicitly requested, as it forces all variables into **Secret** (Encrypted) type and overwrites existing dashboard configurations.
    - If a user specifies a variable must be **Plain Text**, only manage it via the Cloudflare Dashboard.
    - All environment variables (Secrets and Plain Text) must be managed via the Cloudflare Dashboard.
- **Deployment & Branch Awareness**:
    - DO NOT rely on `wrangler` CLI for project status.
    - DO NOT rely on `wrangler pages deployment list` or `tail` for projects using **Fork Sync** or complex GitHub workflows without verifying the active branch first.
    - If the user provides build logs or deployment evidence, accept it as the "Source of Truth" over CLI outputs.

---
*Last updated: 2026-05-02*

