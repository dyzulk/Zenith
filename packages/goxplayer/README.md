# GoxPlayer 🚀

GoxPlayer adalah komponen video player Vue 3 yang powerful, ringan, dan modular. Dirancang khusus untuk ekosistem GoxStream namun cukup fleksibel untuk digunakan di project apa pun yang membutuhkan video player premium dengan fitur lengkap.

## ✨ Fitur Utama
- **Modular & Stateless**: Logika dan UI terpisah untuk performa optimal.
- **HLS Support**: Mendukung streaming HLS (.m3u8) menggunakan `hls.js`.
- **Gesture Pintar**:
  - Double-tap untuk skip forward/backward (10 detik).
  - Long-press untuk playback speed 2x.
- **Kustomisasi Lengkap**: Kontrol kualitas, kecepatan putar, dan subtitle.
- **Auto-Extract Thumbnail**: Menghasilkan thumbnail secara otomatis saat video diputar.
- **Dynamic CSS**: Menggunakan Tailwind CSS untuk tampilan premium dan responsif.

## 📦 Instalasi

```bash
pnpm add goxplayer
```

## 🚀 Cara Penggunaan

### 1. Registrasi Komponen
Import komponen dan filestyle CSS-nya di aplikasi Vue kamu:

```vue
<script setup>
import { GoxPlayer } from 'goxplayer'
import 'goxplayer/style.css'

const sources = [
  { quality: '1080p', url: 'https://example.com/1080.m3u8', format: 'hls' },
  { quality: '720p', url: 'https://example.com/720.mp4', format: 'mp4' }
]

const subtitles = [
  { id: 'en', label: 'English', language: 'en', url: '/subs/en.vtt' }
]
</script>

<template>
  <div class="aspect-video w-full">
    <GoxPlayer 
      :sources="sources"
      :subtitles="subtitles"
      title="Nama Video"
      sub-title="Deskripsi atau Episode"
    />
  </div>
</template>
```

## 🛠 API (Props & Events)

### Props
| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| `sources` | `VideoSource[]` | (Wajib) | Daftar URL video dengan kualitas berbeda. |
| `subtitles` | `Subtitle[]` | `[]` | Daftar subtitle (.vtt). |
| `initialQuality`| `string` | `'360p'` | Kualitas default saat pertama dimuat. |
| `title` | `string` | `''` | Judul video yang muncul di overlay atas. |
| `subTitle` | `string` | `''` | Sub-judul/keterangan tambahan. |
| `autoPlay` | `boolean` | `false` | Putar video otomatis saat siap. |
| `subtitleUrlPrefix`| `string` | `''` | Prefix URL jika menggunakan storage internal. |

### Events
| Event | Payload | Deskripsi |
|-------|---------|-----------|
| `@play` | - | Dipicu saat video mulai diputar. |
| `@pause` | - | Dipicu saat video di-pause. |
| `@progress-update`| `{ currentTime, duration, percent }` | Berguna untuk menyimpan watch history. |
| `@view-logged` | - | Dipicu setelah video ditonton selama 30 detik (analytics). |
| `@quality-change` | `string` | Dipicu saat user mengganti kualitas video. |
| `@thumbnail-generated` | `string` (DataURL) | Mengirimkan gambar thumbnail JPEG hasil extract. |

## 🛠 Pengembangan (Development)

Jika ingin melakukan modifikasi pada package ini:

```bash
# Install dependensi
pnpm install

# Jalankan mode development
pnpm dev

# Build untuk produksi
pnpm build
```

## 📄 Lisensi
[MIT](./LICENSE)
