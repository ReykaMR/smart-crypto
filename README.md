# 🚀 Smart Crypto - Platform Edukasi Cryptocurrency

Platform edukasi cryptocurrency yang komprehensif dibangun dengan Next.js, dirancang untuk pemula untuk mempelajari konsep crypto melalui kursus interaktif, kuis, lencana, sertifikat, dan simulasi portofolio tanpa risiko.

## ✨ Fitur

### 📚 Sistem Pembelajaran
- **Kursus Terstruktur**: Kursus langkah demi langkah dengan modul dan pelajaran
- **Konten Markdown**: Konten pelajaran kaya dengan dukungan Markdown
- **Progres Berurutan**: Selesaikan pelajaran secara berurutan dengan sistem pembukaan
- **Dukungan Video**: Pelajaran video tersemat di mana berlaku
- **Pratinjau Gratis**: Akses pelajaran tertentu tanpa pendaftaran
- **Glosarium Interaktif**: 50+ istilah crypto dengan definisi dan contoh

### 🎯 Kuis & Penilaian
- **Kuis Per Pelajaran**: Pertanyaan pilihan ganda untuk setiap pelajaran
- **Nilai Kelulus Konfigurasi**: Nilai kelulusan default 70%
- **Umpan Balik Instan**: Tampilan skor real-time dan hasil lulus/gagal
- **Sistem Coba Ulang**: Coba ulang kuis yang gagal tanpa batas
- **Pelacakan Upaya**: Riwayat dan analitik kuis lengkap

### 🏆 Gamifikasi & Hadiah
- **Sistem Lencana**: 8 lencana pencapaian di berbagai kategori:
  - Pembelajaran: Langkah Pertama, Pembelajar Cepat, Siswa Berdedikasi, Sarjana
  - Kuis: Master Kuis, Skor Sempurna
  - Sertifikat: Lulusan, Pencapaian Berlebih
- **Pelacakan Progres**: Persentase penyelesaian visual dan statistik
- **Sertifikat**: Sertifikat PDF yang dapat diunduh untuk kursus yang diselesaikan
- **Analitik Pencapaian**: Lacak lencana, sertifikat, dan kinerja kuis

### 💰 Simulasi Portofolio
- **Trading Tanpa Risiko**: Portofolio virtual dengan saldo awal $10.000
- **10 Cryptocurrency**: BTC, ETH, BNB, SOL, ADA, XRP, DOT, DOGE, AVAX, LINK
- **Beli & Jual**: Simulasi trading real-time dengan harga mock
- **Pelacakan L/R**: Pemantauan laba/rugi terhadap investasi awal
- **Riwayat Transaksi**: Riwayat trading lengkap dan analitik
- **Penilaian Portofolio**: Pelacakan saldo dan kepemilikan real-time

### 🌐 Internasionalisasi
- **Dukungan Dwiguna**: Bahasa Indonesia dan Inggris
- **Terjemahan Klien & Server**: Cakupan i18n penuh di semua halaman
- **Pengalih Bahasa**: Tombol bahasa yang mudah di navigasi
- **Preferensi Persisten**: Pemilihan bahasa disimpan per pengguna

### 🔐 Autentikasi & Keamanan
- **Email/Kata Sandi**: Autentikasi berbasis kredensial yang aman
- **Google OAuth**: Masuk satu klik dengan Google
- **Akses Berbasis Peran**: Pemisahan peran Pengguna dan Admin
- **Hash Kata Sandi**: Bcrypt dengan 12 putaran garam
- **Pembatasan Laju**: Pembatalan permintaan yang dapat dikonfigurasi pada endpoint auth
- **Manajemen Sesi**: Sesi berbasis JWT dengan cookie aman

### 👨‍💼 Panel Admin
- **Statistik Platform**: Total pengguna, kursus, penyelesaian, sertifikat
- **Manajemen Pengguna**: Lihat dan kelola semua pengguna dengan metrik aktivitas
- **Manajemen Kursus**: Buat, edit, dan hapus kursus/modul/pelajaran
- **Pemantauan Aktivitas**: Aktivitas pengguna terbaru dan pelacakan keterlibatan
- **Tindakan Cepat**: Pintasan untuk tugas administratif umum

### 🎨 Desain & UX
- **UI Modern**: Antarmuka bersih dan profesional dengan Tailwind CSS
- **Desain Responsif**: Mobile-first dengan dukungan perangkat penuh
- **Animasi**: Transisi halus ditenagai oleh Framer Motion
- **Aksesibilitas**: Label ARIA, navigasi keyboard, dan dukungan pembaca layar
- **Kinerja**: Dioptimalkan dengan impor dinamis dan komponen server

## 🛠️ Tumpukan Teknologi

- **Framework**: Next.js 16.2.1 (App Router, Komponen Server React)
- **Bahasa**: TypeScript 5 (mode strict)
- **Styling**: Tailwind CSS 4 dengan PostCSS
- **Database**: Prisma ORM dengan dukungan multi-database
  - SQLite (pengembangan)
  - PostgreSQL (produksi)
  - MySQL (opsional)
- **Autentikasi**: NextAuth.js v5 (Auth.js)
- **Animasi**: Framer Motion 12
- **Validasi**: Validasi skema Zod
- **Pembuatan PDF**: pdf-lib untuk sertifikat
- **Pengujian**: Vitest dengan Testing Library
- **Keamanan**: DOMPurify untuk perlindungan XSS
- **Deployment**: Docker dengan build multi-tahap

## 📋 Prasyarat

- Node.js 20+
- npm, yarn, pnpm, atau bun
- (Opsional) PostgreSQL untuk produksi
- (Opsional) Docker untuk deployment terkontainerisasi

## 🚀 Memulai

### 1. Kloning Repositori

```bash
git clone <url-repositori>
cd smart-crypto
```

### 2. Instal Dependensi

```bash
npm install
```

### 3. Pengaturan Lingkungan

Salin file lingkungan contoh dan konfigurasikan:

```bash
cp .env.example .env
```

**Variabel Lingkungan Wajib:**

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `DATABASE_URL` | String koneksi database | `file:./dev.db` (SQLite) |
| `NEXTAUTH_SECRET` | Rahasia penandatanganan JWT | Buat dengan `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL dasar aplikasi | `http://localhost:3000` |

**Variabel Lingkungan Opsional:**

| Variabel | Deskripsi | Default |
|----------|-----------|---------|
| `GOOGLE_CLIENT_ID` | ID klien Google OAuth | - |
| `GOOGLE_CLIENT_SECRET` | Rahasia klien Google OAuth | - |
| `RATE_LIMIT_MAX_REQUESTS` | Maksimal permintaan auth per jendela | `10` |
| `RATE_LIMIT_WINDOW_MS` | Jendela pembatasan laju (milidetik) | `60000` |
| `EMAIL_SERVER_HOST` | Host SMTP untuk formulir kontak | - |
| `EMAIL_SERVER_PORT` | Port SMTP | - |
| `EMAIL_SERVER_USER` | Nama pengguna SMTP | - |
| `EMAIL_SERVER_PASSWORD` | Kata sandi SMTP | - |
| `EMAIL_FROM` | Alamat email pengirim | - |

### 4. Pengaturan Database

Dorong skema dan isi database dengan data sampel:

```bash
npm run db:setup
```

Perintah ini akan:
- Membuat tabel database dari skema Prisma
- Mengisi pengguna admin (`admin@smartcrypto.com` / `admin123`)
- Mengisi pengguna demo (`user1@smartcrypto.com` / `user1_123`)
- Membuat kursus pemula dengan 2 modul dan 3 pelajaran
- Menambahkan 10 istilah glosarium (Bitcoin, Blockchain, Wallet, dll.)
- Menyiapkan 8 lencana pencapaian
- Membuat portofolio simulasi sampel

### 5. Mulai Server Pengembangan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasi.

## 📖 Skrip yang Tersedia

| Perintah | Deskripsi |
|----------|-----------|
| `npm run dev` | Mulai server pengembangan |
| `npm run build` | Build untuk produksi |
| `npm run start` | Mulai server produksi |
| `npm run lint` | Jalankan ESLint |
| `npm run test` | Jalankan rangkaian pengujian |
| `npm run test:ui` | Jalankan pengujian dengan UI interaktif |
| `npm run db:generate` | Buat klien Prisma |
| `npm run db:push` | Dorong skema ke database |
| `npm run db:seed` | Isi database dengan data awal |
| `npm run db:setup` | Dorong skema dan isi (gabungan) |

## 🗂️ Struktur Proyek

```
smart-crypto/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rute autentikasi
│   │   ├── login/                # Halaman login
│   │   └── register/             # Halaman registrasi
│   ├── actions/                  # Aksi Server
│   ├── admin/                    # Panel admin
│   ├── api/auth/                 # Rute API NextAuth
│   ├── learn/                    # Pelajaran kursus
│   ├── about/                    # Halaman tentang & kontak
│   ├── certificates/             # Manajemen sertifikat
│   ├── dashboard/                # Dashboard pengguna
│   ├── glossary/                 # Glosarium crypto
│   ├── profile/                  # Profil pengguna
│   ├── simulation/               # Simulator portofolio
│   ├── layout.tsx                # Layout root
│   └── page.tsx                  # Halaman beranda
├── components/                   # Komponen React yang dapat digunakan kembali
├── lib/                          # Utilitas dan konfigurasi
├── prisma/                       # Skema database dan seed
├── __tests__/                    # File pengujian
├── public/                       # Aset statis
└── Dockerfile                    # Konfigurasi Docker
```

## 🐳 Deployment Docker

Untuk panduan lengkap deployment dengan Docker, lihat [DOCKER.md](DOCKER.md).

### Quick Start

1. Salin file environment:
```bash
cp .env.production .env
```

2. Edit `.env` dan perbarui variabel yang diperlukan (terutama `NEXTAUTH_SECRET`)

3. Jalankan dengan Docker Compose:
```bash
docker compose up -d
```

Ini akan:
- Membangun aplikasi Next.js
- Memulai database PostgreSQL
- Menjalankan migrasi database secara otomatis
- Memulai aplikasi di port 3000

### Build Docker Manual

```bash
docker build -t smart-crypto .
docker run -p 3000:3000 --env-file .env smart-crypto
```

## 🌍 Deployment Produksi

### Vercel (Direkomendasikan)

Cara termudah untuk deploy adalah menggunakan [Platform Vercel](https://vercel.com/new):

1. Dorong kode Anda ke GitHub
2. Impor repositori Anda ke Vercel
3. Tambahkan variabel lingkungan di dashboard Vercel
4. Deploy!

### Server Kustom

```bash
npm run build
npm run start
```

Pastikan Anda memiliki:
- Database PostgreSQL yang dikonfigurasi
- `DATABASE_URL` menunjuk ke database produksi
- `NEXTAUTH_SECRET` diatur ke nilai acak yang aman
- `NEXTAUTH_URL` diatur ke URL produksi Anda

## 🧪 Pengujian

Jalankan rangkaian pengujian:

```bash
npm run test
```

Jalankan pengujian dengan UI interaktif:

```bash
npm run test:ui
```

## 📊 Manajemen Database

### Lihat Skema Database

```bash
npx prisma studio
```

Ini membuka Prisma Studio, browser database visual.

### Reset Database

```bash
npx prisma migrate reset
```

⚠️ **Peringatan**: Ini akan menghapus semua data!

### Perbarui Skema Database

Setelah memodifikasi `prisma/schema.prisma`:

```bash
npm run db:push
npm run db:generate
```

## 🔒 Fitur Keamanan

- **Hash Kata Sandi**: Bcrypt dengan 12 putaran garam
- **Pembatasan Laju**: Pembatalan yang dapat dikonfigurasi pada endpoint auth
- **Validasi Input**: Skema Zod untuk semua formulir
- **Perlindungan XSS**: Sanitasi DOMPurify
- **Akses Berbasis Peran**: Pemisahan Pengguna/Admin
- **Sesi JWT**: Cookie aman dan httpOnly
- **Aksi Server**: Semua mutasi berjalan di sisi server

## 🌟 Ikhtisar Fitur Utama

### Sistem Kursus
- Hierarki multi-level: Kursus → Modul → Pelajaran
- Pembukaan pelajaran berurutan
- Pelacakan progres dengan stempel waktu
- Pelajaran pratinjau gratis
- Dukungan konten video

### Sistem Sertifikat
- Pembuatan PDF dengan tata letak profesional
- ID sertifikat unik
- Border dekoratif dan tanda tangan
- Dukungan unduh dan cetak
- Persyaratan penyelesaian kursus

### Sistem Lencana
- 8 pencapaian di 3 kategori
- Pelacakan progres (mis., "3 dari 5 pelajaran")
 - Pendapatan lencana otomatis melalui aksi server
- Tampilan di profil pengguna

### Fitur Simulasi
- Saldo virtual awal $10.000
- Harga mock 10 cryptocurrency
- Beli/jual dengan pelacakan harga rata-rata
- Penilaian portofolio real-time
- Perhitungan laba/rugi
- Riwayat transaksi

## 🤝 Kontribusi

Kontribusi diterima! Jangan ragu untuk mengajukan Pull Request.

1. Fork repositori
2. Buat cabang fitur Anda (`git checkout -b fitur/FiturMenarik`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan FiturMenarik'`)
4. Dorong ke cabang (`git push origin fitur/FiturMenarik`)
5. Buka Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detailnya.

## ⚠️ Penafian

Aplikasi ini hanya untuk **tujuan edukasi**. Simulasi portofolio menggunakan harga mock dan tidak mewakili trading nyata. Tidak ada dalam aplikasi ini yang merupakan saran keuangan. Selalu lakukan riset Anda sendiri sebelum membuat keputusan investasi.

## 📧 Kontak

Untuk pertanyaan atau dukungan, silakan gunakan formulir kontak di aplikasi atau buka issue di GitHub.

## 🙏 Ucapan Terima Kasih

- Tim Next.js untuk framework yang luar biasa
- Prisma untuk ORM yang sangat baik
- NextAuth.js untuk autentikasi

---

Dibangun dengan ❤️ menggunakan Next.js dan TypeScript
