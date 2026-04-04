# 🐳 Panduan Deployment Docker

Panduan ini membahas cara deploy Smart Crypto menggunakan Docker untuk produksi.

## 📋 Prasyarat

- Docker terinstal di sistem Anda
- Docker Compose (biasanya sudah termasuk dalam Docker Desktop)
- RAM minimal 2GB tersedia

## 🚀 Memulai Cepat

### 1. Setup Variabel Lingkungan

```bash
# Untuk Linux/Mac
cp .env.production .env

# Untuk Windows
copy .env.production .env
```

Edit `.env` dan perbarui hal-hal berikut:

**Wajib:**
- `NEXTAUTH_SECRET` - Buat dengan: `openssl rand -base64 32`
- `NEXTAUTH_URL` - URL produksi Anda (mis. `http://localhost:3000` atau `https://domainanda.com`)

**Opsional:**
- `POSTGRES_PASSWORD` - Ubah ke kata sandi yang aman
- `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` - Untuk login Google OAuth

### 2. Mulai Aplikasi

```bash
docker compose up -d
```

Perintah ini akan:
- Membangun aplikasi Next.js
- Menjalankan database PostgreSQL
- Menjalankan migrasi database secara otomatis
- Menjalankan aplikasi di port 3000

### 3. Verifikasi Deployment

```bash
# Periksa apakah layanan berjalan
docker compose ps

# Lihat log aplikasi
docker compose logs -f app

# Lihat log database
docker compose logs -f postgres
```

### 4. Akses Aplikasi

Buka browser Anda dan navigasikan ke:
- **Lokal**: http://localhost:3000
- **Produksi**: https://domainanda.com

### 5. Isi Database (Opsional)

Untuk mengisi database dengan data sampel:

```bash
docker compose exec app npx tsx prisma/seed.ts
```

## 🔧 Perintah Umum

### Lihat Log
```bash
# Semua layanan
docker compose logs -f

# Layanan tertentu
docker compose logs -f app
docker compose logs -f postgres
```

### Hentikan Layanan
```bash
docker compose down
```

### Hentikan dan Hapus Volume (⚠️ menghapus semua data)
```bash
docker compose down -v
```

### Restart Layanan
```bash
docker compose restart
```

### Build Ulang Aplikasi
```bash
docker compose up -d --build
```

### Akses Database
```bash
docker compose exec postgres psql -U smartcrypto -d smart_crypto
```

### Jalankan Prisma Studio (GUI Database)
```bash
# Pertama, buka port 5555
docker compose exec app npx prisma studio --hostname 0.0.0.0
```

## 📦 Deployment Produksi

### Menggunakan Domain Kustom

1. Perbarui `.env`:
```bash
NEXTAUTH_URL=https://domainanda.com
```

2. Gunakan reverse proxy (Nginx, Traefik, dll.) untuk menangani SSL dan routing

### Contoh Nginx

Buat `nginx.conf`:
```nginx
server {
    listen 80;
    server_name domainanda.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 Praktik Terbaik Keamanan

1. **Ubah Kata Sandi Default**
   - Perbarui `POSTGRES_PASSWORD` dengan kata sandi yang kuat
   - Buat `NEXTAUTH_SECRET` yang baru

2. **Gunakan File Environment**
   - Jangan pernah commit file `.env` ke version control
   - Gunakan `.env.production` untuk nilai produksi

3. **Aktifkan HTTPS**
   - Gunakan Let's Encrypt atau sejenisnya untuk sertifikat SSL
   - Perbarui `NEXTAUTH_URL` untuk menggunakan HTTPS

4. **Batasi Port Database**
   - Hapus pemetaan `ports` untuk postgres di produksi
   - Hanya buka port aplikasi (3000)

5. **Gunakan Docker Secrets**
   - Untuk data sensitif, pertimbangkan Docker secrets sebagai pengganti env vars

## 🐛 Troubleshooting

### Masalah Koneksi Database
```bash
# Periksa apakah postgres sehat
docker compose ps

# Lihat log database
docker compose logs postgres

# Restart database
docker compose restart postgres
```

### Aplikasi Tidak Mulai
```bash
# Periksa log aplikasi
docker compose logs app

# Build ulang dari awal
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Error Migrasi
```bash
# Reset database (⚠️ menghapus semua data)
docker compose down -v
docker compose up -d
```

## 📊 Penggunaan Resource

Penggunaan resource tipikal:
- **Container Aplikasi**: ~300-500MB RAM
- **PostgreSQL**: ~100-200MB RAM
- **Total**: ~500-700MB RAM

## 🔄 Pembaruan

Untuk memperbarui aplikasi:

```bash
# Pull kode terbaru
git pull

# Build ulang dan restart
docker compose up -d --build
```

## 💾 Backup & Restore

### Backup Database
```bash
docker compose exec postgres pg_dump -U smartcrypto smart_crypto > backup.sql
```

### Restore Database
```bash
cat backup.sql | docker compose exec -T postgres psql -U smartcrypto smart_crypto
```

## 📝 Catatan

- Migrasi database berjalan otomatis saat startup melalui `docker-entrypoint.sh`
- Semua data disimpan dalam volume Docker (`postgres_data`)
- Aplikasi menggunakan mode standalone Next.js untuk performa optimal
- Health check memastikan database siap sebelum aplikasi dimulai
