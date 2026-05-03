# Deployment Guide: Zenith on Cloudflare Pages (PostgreSQL)

This guide outlines the steps to deploy Zenith to Cloudflare Pages using PostgreSQL and Prisma.

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
| `DATABASE_URL` | Prisma connection string | `postgres://user:pass@host:5432/db?sslmode=require` |
| `DATABASE_SSL_CA` | SSL Certificate (Raw Content) | `-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----` |
| `NODE_VERSION` | Build runtime version | `22` |
| `ACCOUNT_ID` | Cloudflare Account ID | `your-cloudflare-account-id` |
| `R2_ACCOUNT_ID` | Cloudflare Account ID | `your-cloudflare-account-id` |
| `R2_ACCESS_KEY_ID` | R2 API Access Key | `your-r2-access-key` |
| `R2_SECRET_ACCESS_KEY` | R2 API Secret Key | `your-r2-secret-key` |
| `R2_ENDPOINT` | R2 S3 Endpoint | `https://<account_id>.r2.cloudflarestorage.com` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID | `your-google-client-id` |
| `PUSHER_APP_ID` | Pusher App ID | `your-pusher-app-id` |
| `PUSHER_KEY` | Pusher Public Key | `your-pusher-key` |
| `PUSHER_SECRET` | Pusher Secret Key | `your-pusher-secret` |
| `PUSHER_CLUSTER` | Pusher Cluster | `ap1` |

## 3. Cloudflare Bindings (Step-by-Step)

Configure these in **Settings -> Functions**.

### R2 Bucket Binding
`R2 Bucket Bindings -> Add binding -> Variable name: R2 -> R2 bucket: your-media-bucket`

### KV Namespace Binding
`KV Namespace Bindings -> Add binding -> Variable name: KV -> KV namespace: your-kv-namespace`

### AI Binding
`AI Bindings -> Add binding -> Variable name: AI`

### Analytics Engine Binding
`Analytics Engine Bindings -> Add binding -> Variable name: VIEWS -> Dataset: your_dataset_name`

### Real-time Comments (Pusher)
Real-time features are handled via Pusher. No additional Cloudflare bindings are required for this. Ensure the environment variables above are set.

## 4. Compatibility Flags

Set these for both **Production** and **Preview** environments:
`Settings -> Functions -> Compatibility Flags -> Add flag -> nodejs_compat`

## 5. Initial Database Setup

Ensure your database schema is pushed before the first deployment:

```bash
# Push schema changes to your remote database
npx prisma db push
```

## 6. Cloudflare R2 CORS Configuration

Configure the CORS policy in **R2 -> Bucket -> Settings -> CORS Policy**. **Using wildcards (*) for AllowedOrigins is allowed, but strongly not recommended for production security.**

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
> `OPTIONS` (preflight) requests are handled automatically by Cloudflare R2 and do not need to be explicitly listed in `AllowedMethods`.

---

> [!IMPORTANT]
> Since Zenith uses a monolithic architecture, separate `WEB_URL` or `ADMIN_URL` environment variables are no longer required. Hostname detection is handled dynamically.

## 7. Vercel Deployment

Zenith can be deployed to Vercel using the Nitro `vercel` preset.

1.  **Import Project**: Connect your GitHub repository to Vercel.
2.  **Framework Preset**: Select **Nuxt.js**.
3.  **Environment Variables**: Add the same variables as in the Cloudflare section (DATABASE_URL, R2_*, PUSHER_*, etc.).
4.  **Build Command**: `pnpm run build:vercel` or set `NITRO_PRESET=vercel` in environment variables.

> [!NOTE]
> Cloudflare-specific bindings (KV, AI, VIEWS) are **not** available on Vercel. Features relying on these will fallback to local/mock implementations or fail if not handled.

## 8. Netlify Deployment

Zenith can be deployed to Netlify using the Nitro `netlify` preset.

1.  **Import Project**: Connect your GitHub repository to Netlify.
2.  **Build Settings**:
    - **Build Command**: `pnpm run build:netlify`
    - **Publish Directory**: `.netlify/functions-internal` (Managed by Nitro)
3.  **Environment Variables**: Add the required variables in the Netlify Dashboard under **Site settings -> Build & deploy -> Environment**.

> [!NOTE]
> Like Vercel, Netlify deployment does not support Cloudflare-native bindings.
