# Mimo Canvas ??

Mimo Canvas adalah aplikasi visual workflow AI berbasis node untuk membuat gambar dan video dengan cepat, rapi, dan terstruktur.

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

## ?? Tampilan

### Beranda
![Beranda](./doc/home.png)

### Kanvas
![Kanvas](./doc/canvas.png)

### Pengaturan API
![Pengaturan API](./doc/api-config.png)

## ? Fitur Utama

- ?? **Editor node visual**: susun alur kerja AI dengan drag-and-drop.
- ??? **Teks ke gambar**: atur model, ukuran, kualitas, dan prompt.
- ?? **Gambar/teks ke video**: dukung workflow pembuatan video berbasis prompt.
- ?? **Optimasi prompt AI**: bantu merapikan prompt sebelum generasi.
- ?? **Tema gelap/terang**: nyaman dipakai siang atau malam.
- ?? **Simpan proyek lokal**: progres tidak hilang saat browser ditutup.
- ?? **Undo/redo**: aman eksplorasi karena bisa kembali ke langkah sebelumnya.
- ?? **Multi-provider API**: dukung provider kompatibel OpenAI, termasuk Runpod/Sumopod (sesuai konfigurasi endpoint).

## ?? Jenis Node

| Node | Fungsi |
|------|--------|
| `Text Node` | Menulis prompt/instruksi |
| `Image Config Node` | Mengatur parameter generasi gambar |
| `Image Node` | Menampilkan hasil gambar / referensi |
| `Video Config Node` | Mengatur parameter generasi video |
| `Video Node` | Menampilkan hasil video |

## ?? Quick Start

### Prasyarat

- Node.js 18+
- npm atau pnpm

### Instalasi & Jalankan

```bash
git clone https://github.com/manyar-su/MimoCanvas.git
cd MimoCanvas
npm install
npm run dev
```

Aplikasi akan berjalan di localhost (umumnya `http://localhost:5173` atau `http://localhost:5174/mimo-canvas/`).

### Build Produksi

```bash
npm run build
```

## ?? Konfigurasi API

1. Buka tombol pengaturan API di aplikasi.
2. Pilih provider yang ingin dipakai.
3. Isi `Base URL` dan `API Key`.
4. Pilih model default untuk chat, image, dan video.

## ??? Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Flow](https://vueflow.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)

## ?? Struktur Proyek

```text
src/
+-- api/            # Integrasi API
+-- components/     # Komponen UI + node/edge
+-- config/         # Konfigurasi model/provider/workflow
+-- hooks/          # Composables utama
+-- stores/         # State management
+-- utils/          # Helper utilities
+-- views/          # Halaman utama
```

## ?? Kontribusi

Kontribusi sangat terbuka.

1. Fork repo ini
2. Buat branch baru (`feature/nama-fitur`)
3. Commit perubahan
4. Push branch
5. Buka Pull Request

## ?? Lisensi

Proyek ini menggunakan lisensi [MIT](./LICENSE).
