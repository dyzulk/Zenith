# Deployment Guide: Zenith on Cloudflare Pages

This guide outlines the steps to deploy Zenith to Cloudflare Pages based on the `cf-eco` branch configuration.

## 1. Cloudflare Pages Settings

Based on the project configuration, use the following settings in the Cloudflare Dashboard:

| Setting | Value |
|---------|-------|
| **Project Name** | `zenithstream` |
| **Production Branch** | `cf-eco` |
| **Framework Preset** | `Nuxt.js` |
| **Build Command** | `pnpm run build` |
| **Build Output Directory** | `.output/public` |
| **Root Directory** | `/` |

## 2. Cloudflare Bindings (Crucial)

After creating the project in Cloudflare Pages, you **must** configure the following bindings in **Settings > Functions > Compatibility Flags / Bindings**:

### D1 Database
- **Variable Name**: `DB`
- **Database**: Create a new D1 database (e.g., `zenith-db`) and bind it here.

### R2 Bucket
- **Variable Name**: `R2`
- **Bucket**: Create a new R2 bucket (e.g., `zenith-media`) and bind it here.

### KV Namespace
- **Variable Name**: `KV`
- **Namespace**: Create a new KV namespace and bind it here.

## 3. Compatibility Flags

Ensure you have the following compatibility flags set in **Settings > Functions > Compatibility flags**:
- `nodejs_compat` (Required for many Nuxt/Nitro features)

## 4. Initial Database Setup

Once the D1 database is created and bound, you need to run the initial migration to create the tables:

```bash
# Using wrangler locally (ensure you have the database_id in wrangler.jsonc)
npx wrangler d1 execute zenith-db --remote --file=./migrations/0000_init.sql
```

## 5. Deployment Workflow

1. Push your changes to the `cf-eco` branch.
2. Cloudflare Pages will automatically trigger a build.
3. Once the build is complete, your site will be live at `https://zenithstream.pages.dev` (or your custom domain).

---

> [!IMPORTANT]
> Since we migrated away from Supabase, ensure all environment variables related to Supabase are removed from the Cloudflare Dashboard to avoid confusion.
