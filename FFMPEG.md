# Zenith Video Conversion Rules (FFMPEG)

Dokumen ini berisi standar prosedur konversi video untuk proyek Zenith guna memastikan pemutaran streaming yang optimal di web.

## 1. Standar Format
- **Format Container**: MP4 (`.mp4`)
- **Video Codec**: H.264 (`libx264`)
- **Audio Codec**: AAC (`aac`)
- **MIME Type**: `video/mp4`

## 2. Optimasi Web (WAJIB)
Setiap konversi **HARUS** menyertakan flag berikut:
- `-movflags +faststart`: Memindahkan metadata (moov atom) ke depan file agar video bisa diputar instan tanpa menunggu download selesai.

## 3. Daftar Perintah Konversi

Gunakan perintah di bawah ini (sesuaikan path input/output):

### 1080p (Original/High)
```bash
ffmpeg -i input.ts -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart 1080p.mp4
```

### 720p (HD)
```bash
ffmpeg -i input.ts -vf scale=-1:720 -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart 720p.mp4
```

### 480p (SD)
```bash
ffmpeg -i input.ts -vf scale=-1:480 -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart 480p.mp4
```

### 360p (Mobile)
```bash
ffmpeg -i input.ts -vf scale=-1:360 -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k -movflags +faststart 360p.mp4
```

## 4. Penjelasan Parameter
- `-preset veryfast`: Menyeimbangkan antara kecepatan konversi dan ukuran file.
- `-crf 23`: Kualitas visual standar (angka lebih kecil = kualitas lebih tinggi, file lebih besar).
- `-vf scale=-1:HEIGHT`: Mengubah resolusi sambil menjaga aspek rasio.

---
*Terakhir diperbarui: 30 April 2026*
