This document defines the interface between the Frontend (Nuxt), the Database (Cloudflare D1), and the Storage Services (Cloudflare R2).

## 1. Data Models (TypeScript Interfaces)

Located in `packages/shared/src/index.ts`.

### Anime
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `TEXT` | Primary key (UUID string) |
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
| `id` | `TEXT` | Primary key (UUID string) |
| `anime_id` | `TEXT` | Foreign key to Anime |
| `episode_number`| `number` | Support for decimals (e.g., 5.5) |
| `title` | `string?` | Episode title |
| `synopsis` | `text?` | Episode summary |
| `thumbnail_key`| `string?` | R2 object key |
| `aired_at` | `date?` | Original air date |
| `view_count` | `bigint` | View stats |

### VideoSource
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `TEXT` | Primary key (UUID string) |
| `episode_id` | `TEXT` | Foreign key to Episode |
| `quality` | `enum` | `360p`, `480p`, `720p`, `1080p` |
| `format` | `enum` | `hls`, `mp4`, `dash` |
| `r2_key` | `string` | Path in R2: `videos/{anime_id}/{ep_id}/{quality}/master.m3u8` |
| `is_primary` | `boolean` | Default source for player |

### Subtitle
| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `TEXT` | Primary key (UUID string) |
| `episode_id` | `TEXT` | Foreign key to Episode |
| `language` | `string` | ISO code (e.g., `id`, `en`) |
| `label` | `string` | Display label (e.g., `Indonesia`) |
| `r2_key` | `string` | Path in R2: `subtitles/{ep_id}/{lang}.vtt` |

## 2. API Endpoints

### A. Public API (Nuxt Server Routes)
Used for listing, filtering, and detail retrieval.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/anime/trending` | Get trending anime list. |
| `GET` | `/api/anime/:slug` | Get single anime detail by slug. |
| `GET` | `/api/studio/genres` | List all available genres. |

### B. Streaming & Security
Secured operations for content delivery.

#### `GET /api/stream/sign`
Generates a short-lived presigned URL for R2 assets.
- **Headers**: `Cookie: zenith_auth=<user_id>`
- **Query Params**: `path` (R2 object key), `quality` (optional)
- **Response**:
  ```json
  {
    "url": "https://pub-xyz.r2.dev/videos/abc/master.m3u8?X-Amz-Signature=...",
    "expires_at": 1714450000
  }
  ```

### C. Search & Discovery
- `GET /api/anime/search` (Planned)
  - **Query**: `?q=One Piece`

### D. User Engagement (D1 + Session)
- `POST /api/user/history`: Update watch progress.
- `POST /api/user/bookmarks`: Save to watchlist.
- `POST /api/user/comments`: Submit comment.

## 3. Studio/Admin API
Endpoints for managing content (Protected by admin role).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/studio/stats` | Get dashboard overview statistics. |
| `GET` | `/api/studio/anime` | List anime for management. |
| `PUT` | `/api/studio/anime/:id` | Update anime metadata. |
| `POST` | `/api/studio/anime/:id/episodes` | Add new episode to anime. |

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
