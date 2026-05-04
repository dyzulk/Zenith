# Deployment Guide: GoxStream on Cloudflare Pages (D1)

This guide outlines the steps to deploy GoxStream to Cloudflare Pages using Cloudflare D1 and Drizzle ORM.

## 1. Cloudflare Pages Settings

| Setting | Value |
|---------|-------|
| **Project Name** | `your-project-name` |
| **Production Branch** | `your-production-branch` |
| **Framework Preset** | `Nuxt.js` |
| **Build Command** | `pnpm run build` |
| **Build Output Directory** | `.output/public` |
| **Compatibility Date** | `2025-05-08` |
| **Node.js Version** | `22` or higher |

## 2. Environment Variables & Secrets

Configure these in the Cloudflare Dashboard under **Settings -> Functions -> Variables and Secrets**.

| Variable | Purpose | Example / Value |
|----------|---------|-----------------|
| `DATABASE_URL` | Local D1 DB path (Dev only) | `./server/database/d1.sqlite` |
| `NODE_VERSION` | Build runtime version | `22` |
| `FILESYSTEM_DISK` | Storage driver | `auto`, `r2-binding`, or `s3` |
| `S3_KEY` | S3 API Access Key | `your-s3-access-key` |
| `S3_SECRET` | S3 API Secret Key | `your-s3-secret-key` |
| `S3_BUCKET` | S3 Bucket name | `your-media-bucket` |
| `S3_REGION` | S3 Region | `auto` |
| `S3_ENDPOINT` | S3 API Endpoint | `https://<id>.r2.cloudflarestorage.com` |
| `S3_PUBLIC_URL` | Public CDN URL | `https://media.yourdomain.com` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID | `your-google-client-id` |
| `PUSHER_APP_ID` | Pusher App ID | `your-pusher-app-id` |
| `PUSHER_KEY` | Pusher Public Key | `your-pusher-key` |
| `PUSHER_SECRET` | Pusher Secret Key | `your-pusher-secret` |
| `PUSHER_CLUSTER` | Pusher Cluster | `ap1` |

> [!IMPORTANT]
> **Why S3_PUBLIC_URL?**: Even if you use `r2-binding`, you MUST provide a `S3_PUBLIC_URL`. This URL is used by the frontend to fetch images and stream video directly from the storage provider's CDN, bypassing the serverless function for better performance.

## 3. Cloudflare Bindings (Step-by-Step)

Configure these in **Settings -> Functions**.

### R2 Bucket Binding
`R2 Bucket Bindings -> Add binding -> Variable name: R2 -> R2 bucket: your-media-bucket`

> [!TIP]
> **Recommended for Cloudflare Users**: If you are deploying to Cloudflare Pages, set `FILESYSTEM_DISK=r2-binding`. This utilizes native Cloudflare R2 bindings which are faster and more cost-effective for server-side operations (upload/delete).

### KV Namespace Binding
`KV Namespace Bindings -> Add binding -> Variable name: KV -> KV namespace: your-kv-namespace`

### AI Binding
`AI Bindings -> Add binding -> Variable name: AI`

### D1 Database Binding
`D1 Database Bindings -> Add binding -> Variable name: DB -> D1 database: your-d1-database`

### Real-time Comments (Pusher)
Real-time features are handled via Pusher. No additional Cloudflare bindings are required for this. Ensure the environment variables above are set.

## 4. Compatibility Flags

Set these for both **Production** and **Preview** environments:
`Settings -> Functions -> Compatibility Flags -> Add flag -> nodejs_compat`

Ensure your database schema is pushed to D1 before the first deployment:

```bash
# Apply migrations to your D1 database (Production)
npx wrangler d1 migrations apply your-database-name --remote
```

## 6. S3 Storage CORS Configuration (R2/AWS/B2)

Configure the CORS policy in your storage provider settings (e.g., **R2 -> Bucket -> Settings -> CORS Policy**). **Using wildcards (*) for AllowedOrigins is allowed, but strongly not recommended for production security.**

```json
[
  {
    "AllowedOrigins": [
      "https://your-app.pages.dev",
      "https://your-custom-domain.com"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

> [!NOTE]
> `OPTIONS` (preflight) requests are handled automatically by most S3 providers like Cloudflare R2 and do not need to be explicitly listed in `AllowedMethods`.

---

> [!IMPORTANT]
> Since GoxStream uses a monolithic architecture, separate `WEB_URL` or `ADMIN_URL` environment variables are no longer required. Hostname detection is handled dynamically.

## 7. Vercel Deployment

GoxStream can be deployed to Vercel using the Nitro auto-detection.

1.  **Import Project**: Connect your GitHub repository to Vercel.
2.  **Framework Preset**: Select **Nuxt.js**.
3.  **Environment Variables**: Add the required variables (DATABASE_URL, S3_*, PUSHER_*, etc.).
4.  **Nitro Preset**: **DO NOT** set `NITRO_PRESET` in the Dashboard unless you specifically want to override the default. Nitro will auto-detect Vercel.
5.  **Output Directory**: **LEAVE AS DEFAULT**. The `vercel.json` file in the root will handle this.

> [!NOTE]
> We have added `vercel.json` and `netlify.toml` to the project root. These files automatically configure the build commands and output directories for you.

> [!TIP]
> Ensure your `DATABASE_URL` includes `?sslmode=require` to guarantee compatibility with Aiven/Supabase across all platforms.

## 8. Netlify Deployment

GoxStream can be deployed to Netlify using the Nitro auto-detection.

1.  **Import Project**: Connect your GitHub repository to Netlify.
2.  **Build Settings**:
    - **Build Command**: `pnpm run build`
    - **Publish Directory**: `.output/public` (Nitro will manage this)
3.  **Environment Variables**: Add the required variables in the Netlify Dashboard.
4.  **Nitro Preset**: Let Nitro auto-detect the platform.

> [!NOTE]
> Like Vercel, Netlify deployment does not support Cloudflare-native bindings.
