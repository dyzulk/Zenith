# Zenith API Contract

This document defines the interface between the Frontend (Nuxt), the Database (Supabase), and the Edge Services (Cloudflare Workers).

## 1. Data Models (TypeScript Interfaces)

Located in `packages/shared/src/index.ts`.

### Anime
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key |
| `slug` | `string` | Unique URL identifier |
| `title` | `string` | Main title |
| `title_romaji`| `string?` | Optional romaji title |
| `title_english`| `string?` | Optional english title |
| `synopsis` | `text?` | Plot summary |
| `status` | `enum` | `ongoing`, `completed`, `upcoming`, `hiatus` |
| `type` | `enum` | `TV`, `Movie`, `OVA`, `ONA`, `Special` |
| `rating` | `string?` | e.g., `PG-13`, `R` |
| `score` | `number` | 0.0 - 10.0 |
| `year` | `integer?` | Release year |
| `season` | `enum?` | `winter`, `spring`, `summer`, `fall` |
| `poster_key` | `string?` | R2 object key for poster |
| `banner_key` | `string?` | R2 object key for banner |
| `total_episodes`| `integer?` | Expected total episodes |
| `studio` | `string?` | Animation studio |
| `source` | `string?` | `manga`, `light_novel`, `original`, etc. |

### Episode
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key |
| `anime_id` | `UUID` | Foreign key to Anime |
| `episode_number`| `number` | Support for decimals (e.g., 5.5) |
| `title` | `string?` | Episode title |
| `synopsis` | `text?` | Episode summary |
| `thumbnail_key`| `string?` | R2 object key |
| `aired_at` | `date?` | Original air date |
| `view_count` | `bigint` | View stats |

### VideoSource
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key |
| `episode_id` | `UUID` | Foreign key to Episode |
| `quality` | `enum` | `360p`, `480p`, `720p`, `1080p` |
| `format` | `enum` | `hls`, `mp4`, `dash` |
| `r2_key` | `string` | Path in R2: `videos/{anime_id}/{ep_id}/{quality}/master.m3u8` |
| `is_primary` | `boolean` | Default source for player |

### Subtitle
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key |
| `episode_id` | `UUID` | Foreign key to Episode |
| `language` | `string` | ISO code (e.g., `id`, `en`) |
| `label` | `string` | Display label (e.g., `Indonesia`) |
| `r2_key` | `string` | Path in R2: `subtitles/{ep_id}/{lang}.vtt` |

## 2. API Endpoints

### A. Anime Discovery (Supabase)
Used for listing, filtering, and detail retrieval.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/rest/v1/anime` | Paginated list of anime. Supports `select`, `order`, `filter`. |
| `GET` | `/rest/v1/anime?slug=eq.{slug}` | Get single anime by slug. |
| `GET` | `/rest/v1/genres` | List all available genres. |
| `GET` | `/rest/v1/anime_genres?select=anime(*),genres(*)` | Genre-based filtering. |

### B. Streaming & Security (Cloudflare Worker)
High-security operations that cannot be handled client-side.

#### `GET /api/stream/:episodeId`
Generates a short-lived presigned URL for R2 assets.
- **Headers**: `Authorization: Bearer <Supabase_JWT>`
- **Query Params**: `quality` (optional, defaults to `720p`)
- **Response**:
  ```json
  {
    "url": "https://pub-xyz.r2.dev/videos/abc/master.m3u8?X-Amz-Signature=...",
    "expires_at": 1714450000,
    "quality": "720p"
  }
  ```

### C. Search (Advanced)
Supabase RPC for fuzzy/full-text search.
- `POST /rest/v1/rpc/search_anime`
  - **Body**: `{ "query": "One Piece" }`

### D. User Engagement (Supabase + RLS)
- `POST /rest/v1/watch_history`: Upsert progress (anime_id, episode_id, progress_seconds).
- `POST /rest/v1/bookmarks`: Save to watchlist (status: `plan`, `watching`, `completed`).
- `POST /rest/v1/comments`: Submit comment (body, is_spoiler, parent_id).

## 3. Real-time Subscription
Using Supabase Realtime for interactive features.
- **Channel**: `comments:episode_id=eq.{id}`
- **Payload**:
  ```json
  {
    "new": { "id": "...", "body": "...", "user_id": "...", "profiles": { "username": "..." } }
  }
  ```

## 4. Error Standards
```json
{
  "code": "ERROR_CODE",
  "message": "Human readable message",
  "details": null
}
```
Common codes: `UNAUTHORIZED`, `NOT_FOUND`, `RATE_LIMITED`, `STREAM_EXPIRED`.

---
*Maintained as part of the Zenith Project Infrastructure.*
