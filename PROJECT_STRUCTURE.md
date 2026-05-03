# Struktur Proyek ZenithStream

Dokumen ini menjelaskan struktur folder dan file dalam proyek **ZenithStream**, sebuah platform streaming modern yang dibangun menggunakan Nuxt 4, Prisma, dan PostgreSQL.

## 🌳 Struktur Tree Proyek

```text
zenithstream/
├── .nuxt/                  # File yang dihasilkan secara otomatis oleh Nuxt (diabaikan)
├── app/                    # Kode sumber Frontend (Nuxt 4 Layer)
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── episode/
│   │   │   ├── CommentSection.vue
│   │   │   ├── Info.vue
│   │   │   ├── Player.vue
│   │   │   └── Sidebar.vue
│   │   └── studio/
│   │       ├── anime/
│   │       │   └── AnimeList.vue
│   │       ├── customers/
│   │       │   ├── AddModal.vue
│   │       │   └── DeleteModal.vue
│   │       ├── genres/
│   │       │   ├── GenreList.vue
│   │       │   └── GenreModal.vue
│   │       ├── home/
│   │       │   ├── HomeChart.client.vue
│   │       │   ├── HomeChart.server.vue
│   │       │   ├── HomeDateRangePicker.vue
│   │       │   ├── HomePeriodSelect.vue
│   │       │   ├── HomeSales.vue
│   │       │   └── HomeStats.vue
│   │       ├── inbox/
│   │       │   ├── InboxList.vue
│   │       │   └── InboxMail.vue
│   │       ├── settings/
│   │       │   └── MembersList.vue
│   │       ├── EpisodeManager.vue
│   │       ├── ImageUpload.vue
│   │       ├── NotificationsSlideover.vue
│   │       ├── SubtitleManager.vue
│   │       ├── TeamsMenu.vue
│   │       ├── UserMenu.vue
│   │       ├── VideoSourceManager.vue
│   │       └── VideoTranscoder.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   └── useStudioData.ts
│   ├── layouts/
│   │   ├── default.vue
│   │   └── studio.vue
│   ├── middleware/
│   │   └── studio-auth.ts
│   ├── pages/
│   │   ├── anime/
│   │   │   ├── [slug]/
│   │   │   │   ├── episode/
│   │   │   │   │   └── [ep].vue
│   │   │   │   └── index.vue
│   │   │   └── index.vue
│   │   ├── auth/
│   │   │   ├── callback.vue
│   │   │   ├── login.vue
│   │   │   └── register.vue
│   │   ├── studio/
│   │   │   ├── anime/
│   │   │   │   ├── [id].vue
│   │   │   │   ├── create.vue
│   │   │   │   └── index.vue
│   │   │   ├── genres/
│   │   │   │   └── index.vue
│   │   │   ├── settings/
│   │   │   │   ├── index.vue
│   │   │   │   ├── members.vue
│   │   │   │   ├── notifications.vue
│   │   │   │   ├── security.vue
│   │   │   │   └── site.vue
│   │   │   ├── customers.vue
│   │   │   ├── inbox.vue
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── types/
│   │   └── studio.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── helper.ts
│   └── app.vue
├── server/                 # Kode sumber Backend (Nitro Engine)
│   ├── api/
│   │   ├── anime/
│   │   │   ├── [slug]/
│   │   │   │   └── episode/
│   │   │   │       └── [number].get.ts
│   │   │   ├── episode/
│   │   │   │   └── [id]/
│   │   │   │       ├── comments.get.ts
│   │   │   │       └── comments.post.ts
│   │   │   ├── search.get.ts
│   │   │   ├── trending.get.ts
│   │   │   └── [slug].get.ts
│   │   ├── auth/
│   │   │   ├── login.post.ts
│   │   │   ├── logout.post.ts
│   │   │   ├── me.get.ts
│   │   │   └── register.post.ts
│   │   ├── data/
│   │   │   └── process.post.ts
│   │   ├── episode/
│   │   │   └── [id]/
│   │   │       └── view.post.ts
│   │   ├── r2/
│   │   │   ├── sign-upload.post.ts
│   │   │   └── [...path].get.ts
│   │   ├── settings/
│   │   │   └── public.get.ts
│   │   ├── stream/
│   │   │   └── sign.get.ts
│   │   ├── studio/
│   │   │   ├── anime/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── episodes.get.ts
│   │   │   │   │   ├── episodes.post.ts
│   │   │   │   │   └── seo-generate.post.ts
│   │   │   │   ├── create.post.ts
│   │   │   │   ├── index.get.ts
│   │   │   │   ├── [id].get.ts
│   │   │   │   └── [id].put.ts
│   │   │   ├── episode/
│   │   │   │   └── [id]/
│   │   │   │       ├── sources.get.ts
│   │   │   │       ├── sources.post.ts
│   │   │   │       └── subtitles.ts
│   │   │   ├── genres/
│   │   │   │   ├── index.get.ts
│   │   │   │   ├── index.post.ts
│   │   │   │   ├── [id].delete.ts
│   │   │   │   └── [id].put.ts
│   │   │   ├── profile.put.ts
│   │   │   ├── settings.ts
│   │   │   └── stats.get.ts
│   │   ├── thumbnail/
│   │   │   ├── [slug]/
│   │   │   │   └── [ep].get.ts
│   │   │   └── save.post.ts
│   │   ├── user/
│   │   │   ├── bookmarks.post.ts
│   │   │   ├── history.post.ts
│   │   │   └── recent.get.ts
│   │   ├── health.get.ts
│   │   └── notifications.get.ts
│   ├── lib/
│   │   └── prisma-client/  # Prisma WASM client for Edge
│   ├── middleware/
│   │   └── 0.auth.ts
│   ├── plugins/
│   │   ├── db-init.ts      # Plugin untuk memuat CA Cert dari assets (Startup)
│   │   └── error.ts
│   ├── assets/             # Aset internal server (Bundled)
│   │   └── certs/          # Junction ke folder /certs di root
│   │       └── aiven-ca.pem
│   └── utils/
│       ├── auth.ts
│       ├── broadcast.ts
│       ├── config.ts
│       ├── crypto.ts
│       ├── db.ts
│       ├── logger.ts
│       ├── pg-mock.ts
│       ├── request.ts
│       ├── resources.ts
│       ├── settings.ts
│       ├── ssl.ts
│       └── storage.ts
├── prisma/                 # Database management (ORM)
│   ├── migrations/
│   │   └── 20260502023038_init/
│   │       └── migration.sql
│   ├── schema.prisma
│   └── seed.ts
├── shared/                 # Kode shared (index.ts)
├── public/                 # File statis
│   ├── favicon.ico
│   ├── hero-banner.png
│   └── robots.txt
├── certs/                  # Sertifikat SSL
│   └── aiven-ca.pem
├── history/                # Log teknis dan riwayat pengembangan proyek
│   └── DATABASE_CONNECTION_LOG.md
├── AGENTS.md               # Instruksi dan blueprint untuk asisten AI
├── API_CONTRACT.md         # Dokumentasi kontrak API
├── CROSS_ENV_VALIDATION_PLAN.md # Rencana validasi antar environment
├── DEPLOYMENT.md           # Panduan deployment
├── FFMPEG.md               # Panduan penggunaan FFMPEG
├── LICENSE                 # Lisensi proyek
├── .dev.vars               # Variabel lingkungan untuk pengembangan (Cloudflare)
├── .env                    # Variabel lingkungan (lokal)
├── .env.example            # Contoh variabel lingkungan
├── .gitignore              # Daftar file yang diabaikan oleh Git
├── nuxt.config.ts          # Konfigurasi utama Nuxt
├── package.json            # Dependensi dan script pnpm
├── pnpm-lock.yaml          # Lockfile pnpm
├── prisma.config.ts        # Konfigurasi tambahan Prisma
├── tailwind.config.ts      # Konfigurasi Tailwind CSS
├── tsconfig.json           # Konfigurasi TypeScript
└── wrangler.toml.inactive  # Konfigurasi Wrangler (tidak aktif/cadangan)
```

---

## 📂 Penjelasan Detail Folder & File Utama

### 1. `app/`
Folder ini berisi seluruh logika antarmuka pengguna (UI). ZenithStream menggunakan struktur Nuxt 4 di mana komponen, halaman, dan composables dipisahkan untuk modularitas.
### 1. `app/`
Folder ini berisi seluruh logika antarmuka pengguna (UI). ZenithStream menggunakan struktur Nuxt 4 di mana komponen, halaman, dan composables dipisahkan untuk modularitas.
- **`pages/`**: Setiap file `.vue` di sini secara otomatis menjadi rute URL.
- **`components/`**: Berisi komponen UI seperti tombol, kartu anime, dan player video.

### 2. `server/`
Sisi backend yang berjalan di atas Nitro.
- **`api/`**: Tempat pembuatan endpoint RESTful. Contoh: `api/anime/trending.ts`.
- **`utils/`**: Berisi utilitas penting seperti `useDB` untuk koneksi database Prisma yang dioptimalkan untuk Cloudflare Edge.

### 3. `prisma/`
Menggunakan Prisma ORM untuk interaksi dengan PostgreSQL.
- **`schema.prisma`**: Jantung dari struktur data aplikasi. Mendefinisikan tabel seperti `User`, `Anime`, `Episode`, dan `History`.

### 4. `history/`
Berisi dokumentasi kronologis mengenai tantangan teknis yang dihadapi selama pengembangan, terutama terkait migrasi infrastruktur dan optimasi koneksi database.

### 5. File Konfigurasi Root
- **`nuxt.config.ts`**: Mengatur modul Nuxt, runtime config, dan integrasi UI.
- **`wrangler.toml`**: Sangat penting untuk integrasi dengan ekosistem Cloudflare, mengatur environment variables, D1 bindings (jika ada), dan R2 buckets.
- **`package.json`**: Menentukan versi library seperti `@nuxt/ui`, `prisma`, dan `tailwindcss`.

---

## 🛠️ Teknologi yang Digunakan
- **Framework**: Nuxt 4 (Vue.js)
- **Runtime**: Cloudflare Pages / Nitro
- **ORM**: Prisma
- **Database**: PostgreSQL (Aiven)
- **Styling**: Tailwind CSS / Nuxt UI
- **Storage**: Cloudflare R2
