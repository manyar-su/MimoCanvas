# Panduan Deployment Docker mimo-canvas

## Mulai Cepat

### Metode 1: Tarik dari Docker Hub

```bash
docker pull peigen666/mimo-canvas:latest
docker run -d -p 8080:80 --name mimo-canvas peigen666/mimo-canvas:latest
```

Akses: `http://localhost:8080/mimo-canvas/`

### Metode 2: Build Lokal

```bash
# 1. Build frontend
pnpm install
pnpm build

# 2. Build image Docker
docker build -t mimo-canvas .

# 3. Jalankan container
docker run -d -p 8080:80 --name mimo-canvas mimo-canvas
```

## Perintah Umum

```bash
# Hentikan container
docker stop mimo-canvas

# Jalankan container
docker start mimo-canvas

# Hapus container
docker rm mimo-canvas

# Lihat log
docker logs mimo-canvas

# Masuk ke container
docker exec -it mimo-canvas sh
```

## Penjelasan Konfigurasi

### Pemetaan Port

Pemetaan default adalah `8080:80`. Anda bisa mengganti port host:

```bash
docker run -d -p 3000:80 --name mimo-canvas peigen666/mimo-canvas:latest
```

### Konfigurasi Nginx

- Path file statis: `/usr/share/nginx/html/mimo-canvas`
- Proxy API: `/v1` → `https://api.chatfire.site`
- Kompresi Gzip: aktif
- Cache aset statis: 1 tahun

## Push Image

```bash
# Login ke Docker Hub
docker login

# Build dan push
docker build -t peigen666/mimo-canvas:latest .
docker push peigen666/mimo-canvas:latest
```

## Catatan

1. Pastikan direktori `dist/` sudah ada dengan menjalankan `pnpm build` terlebih dahulu.
2. Hindari port yang diblokir browser seperti `6666`, `6667`, dan `6668`.
3. Gunakan path akses `/mimo-canvas` saat deployment.
