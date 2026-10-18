# 🛡️ SECURLENS - Interactive User Access Demo & Interaction Tracker
> **Demo Interaktif Akses Pengguna & Pencatatan Telemetri ke Google Sheets**  
> Mata Kuliah: **Keamanan Jaringan dan Komputer** (UTS Semester 7)

Aplikasi web demonstrasi interaktif sederhana yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Fokus utama proyek ini terdiri dari dua halaman: **Halaman Login** dan **Halaman Setelah Login (Konfirmasi)**, dengan pencatatan peristiwa interaksi non-sensitif ke **Google Sheets** menggunakan **Google Apps Script**.

---

## 🌟 Fitur Utama & Prinsip Keamanan

1. **Halaman Login (`/`):**
   - Desain modern, bersih, responsif, dan profesional dengan identitas visual orisinal *SECURLENS*.
   - Input username/alias dan password simulasi (dengan toggle intip kata sandi).
   - Validasi input di sisi klien.
   - **Zero-Credential Guarantee:** Kata sandi atau data autentikasi **tidak pernah disimpan atau dikirim ke Google Sheets**. Tombol login berfungsi sebagai demonstrasi interaksi pengguna.

2. **Halaman Setelah Login (`/result`):**
   - Halaman konfirmasi dengan desain konsisten setelah tombol login ditekan.
   - Menampilkan tanda terima sesi interaksi: ID Sesi Acak, Waktu Interaksi, Jenis Peristiwa (`LOGIN_BUTTON_CLICKED`), Status (`SUCCESS`), dan Tipe Perangkat.
   - Dilengkapi tombol kembali ke halaman login.

3. **Pencatatan Interaksi ke Google Sheets:**
   - Menghubungkan aplikasi web dengan Google Sheets melalui Google Apps Script Web App.
   - Data yang dicatat hanya berupa parameter non-sensitif:
     1. `Session ID` (ID acak unik)
     2. `Waktu Interaksi` (Timestamp)
     3. `Jenis Interaksi` (`LOGIN_BUTTON_CLICKED`)
     4. `Status` (`SUCCESS`)
     5. `Kategori Perangkat` (`Desktop Workstation` / `Mobile Device`)
   - **Resilient & Anti-Duplikasi:** Mencegah pencatatan berulang untuk interaksi yang sama dan tidak mengganggu navigasi pengguna bila koneksi Google Apps Script mengalami kendala.
   - **Tanpa Database Eksternal:** Tidak memerlukan Supabase, PostgreSQL, atau MySQL.

---

## 📁 Struktur Proyek

```text
UTS new/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── log/
│   │   │       └── route.ts         # Endpoint server-side pengirim data ke Google Apps Script
│   │   ├── result/
│   │   │   └── page.tsx             # Halaman 2: Setelah Login (Konfirmasi Interaksi)
│   │   ├── globals.css              # Tema warna gelap, grid background, dan utilitas
│   │   ├── layout.tsx               # Root layout, Google Fonts (Space Grotesk & Inter), Navbar, Footer
│   │   └── page.tsx                 # Halaman 1: Login Demo
│   ├── components/
│   │   └── LoginForm.tsx            # Komponen formulir login simulasi & validasi
│   └── lib/
│       ├── tracking.ts              # Logika pencatatan interaksi, Session ID generator, & deduplikasi
│       └── types.ts                 # Definisi tipe data TypeScript
├── .env.example                     # Contoh template variabel lingkungan
├── .env.local                       # File konfigurasi lokal
├── google-apps-script.js            # Kode Apps Script siap pakai untuk Google Sheets
├── next.config.mjs                  # Konfigurasi Next.js
├── package.json                     # Konfigurasi dependensi proyek
├── postcss.config.js                # Konfigurasi PostCSS
├── tailwind.config.js               # Konfigurasi tema warna Tailwind CSS
├── tsconfig.json                    # Konfigurasi TypeScript ketat
└── README.md                        # Dokumentasi dan panduan lengkap
```

---

## 📋 Langkah 1: Persiapan Google Sheets & Google Apps Script

Untuk mencatat interaksi ke Google Sheets:

1. Buka [Google Sheets](https://sheets.new) di peramban Anda.
2. Beri judul spreadsheet Anda, misalnya: `Log Interaksi Demo UTS`.
3. Pada baris pertama (**Header**), buat 5 kolom berikut:
   - **Kolom A:** `Session ID`
   - **Kolom B:** `Waktu Interaksi`
   - **Kolom C:** `Jenis Interaksi`
   - **Kolom D:** `Status`
   - **Kolom E:** `Kategori Perangkat`
4. Di Google Sheets, buka menu **Ekstensi (Extensions)** > **Apps Script**.
5. Hapus semua teks default di editor Apps Script, lalu salin dan tempelkan seluruh isi file [`google-apps-script.js`](./google-apps-script.js).
6. Simpan project (ikon disket atau `Ctrl + S`).
7. Klik tombol biru **Deploy** (Terapkan) di kanan atas > pilih **New deployment** (Penerapan baru).
8. Klik ikon roda gigi pada *Select type* dan pilih **Web app** (Aplikasi web).
9. Atur konfigurasi berikut:
   - **Description:** `Tracker Demo UTS`
   - **Execute as:** `Me (email-anda@gmail.com)`
   - **Who has access:** `Anyone` *(PENTING: Pilih Anyone agar Next.js di Vercel dapat mengirimkan data)*.
10. Klik tombol **Deploy**.
11. Jika muncul jendela otorisasi, klik **Authorize access** > pilih akun Google Anda > klik **Advanced** > klik **Go to Untitled project (unsafe)** > klik **Allow**.
12. Salin **Web App URL** yang dihasilkan (formatnya: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 💻 Langkah 2: Menjalankan Secara Lokal

1. **Buka file [`.env.local`](./.env.local)** dan tempelkan URL Apps Script yang Anda peroleh:
   ```env
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
2. **Jalankan development server:**
   ```bash
   npm run dev
   ```
3. Buka peramban di `http://localhost:3000`.
4. Masukkan username dan password sembarang pada halaman login, lalu klik **Masuk & Catat Interaksi**.
5. Anda akan langsung diarahkan ke halaman konfirmasi `/result`, dan baris baru akan otomatis tercatat di Google Sheets Anda.

---

## ☁️ Langkah 3: Deployment ke Vercel

### 1. Unggah Proyek ke GitHub
Buka terminal di folder proyek ini:
```bash
git init
git add .
git commit -m "feat: complete interactive demo with google sheets tracking"
git branch -M main
git remote add origin https://github.com/<username-github>/<nama-repo>.git
git push -u origin main
```

### 2. Hubungkan ke Vercel
1. Masuk ke [Dashboard Vercel](https://vercel.com) menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** > pilih **"Project"**.
3. Cari repository yang baru Anda buat, lalu klik **"Import"**.
4. Vercel akan otomatis mengenali framework **Next.js**.

### 3. Tambahkan Environment Variable di Vercel
Pada bagian konfigurasi import Vercel, buka menu **Environment Variables**:
- **Key:** `GOOGLE_SCRIPT_URL`
- **Value:** `https://script.google.com/macros/s/AKfycb.../exec` *(URL Web App Google Apps Script Anda)*
- Klik **Add**.

### 4. Deploy & Uji Coba
1. Klik tombol **"Deploy"**.
2. Tunggu proses build selesai (sekitar 1 menit).
3. Setelah deployment berstatus *Ready*, kunjungi tautan publik Vercel Anda.
4. Bagikan tautan tersebut melalui email kepada teman Anda untuk demonstrasi.
5. Setiap kali teman Anda menekan tombol pada halaman login, data interaksi non-sensitif akan langsung masuk ke spreadsheet Google Sheets Anda secara real-time.

---

## 🔒 Kebijakan Keamanan & Kepatuhan Etika

- **No Credential Storage:** Tidak ada kata sandi, token, cookie, atau data sensitif yang disimpan ke disk server maupun Google Sheets.
- **Server-Side URL Isolation:** URL endpoint Google Apps Script diproses melalui API Route Next.js (`/api/log`) sehingga tidak terpapar langsung di kode frontend.
- **Deduplication:** Sesi browser mencegah pengiriman log ganda untuk satu kali klik tombol yang sama.
