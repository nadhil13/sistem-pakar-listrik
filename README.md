<div align="center">
  <img src="public/vite.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Sistem Pakar Audit Listrik (Fuzzy Sugeno)</h1>
  <p align="center">
    Aplikasi web cerdas untuk mengaudit, menganalisis, dan memonitor konsumsi daya listrik rumah tangga menggunakan algoritma <strong>Fuzzy Sugeno</strong>. Dibangun dengan desain UI/UX bergaya <em>High-End Vanguard / Cyberpunk</em>.
    <br />
    <br />
    <a href="#fitur-unggulan"><strong>Jelajahi Fitur »</strong></a>
    ·
    <a href="#instalasi"><strong>Cara Instalasi »</strong></a>
  </p>
</div>

---

## ⚡ Tentang Proyek Ini

Aplikasi ini merupakan implementasi nyata dari Sistem Pakar (*Expert System*) yang bertujuan untuk memberikan rekomendasi penghematan listrik berdasarkan pola penggunaan perangkat elektronik. Berbeda dengan aplikasi kalkulator biasa, sistem ini ditenagai oleh algoritma **Logika Fuzzy (Metode Sugeno)** yang divalidasi secara matematis untuk memberikan skor pemborosan dan saran presisi.

Sangat cocok digunakan sebagai **Proyek Tugas Akhir / Skripsi** karena memiliki fitur transparansi algoritma secara *real-time*.

## ✨ Fitur Unggulan

- 🧠 **Mesin Logika Fuzzy (Sugeno)**: Menggunakan himpunan fuzzy (Ruspini Partition) yang valid secara matematis untuk menghitung derajat keanggotaan dan bobot aturan secara akurat.
- 🔍 **Transparansi Algoritma (Debug Mode)**: Fitur "PROSES ALGORITMA" yang membongkar isi perhitungan mesin dari Tahap 1 (Normalisasi) hingga Tahap 5 (Defuzzifikasi) di dalam *Pop-up Modal* interaktif.
- 🎨 **Premium UI/UX**: Antarmuka bergaya *Dark-Tech Vanguard* dengan efek *glassmorphism*, *double-bezel*, dan *hover-glow* layaknya *dashboard sci-fi*.
- 🌓 **Tema Terang & Gelap**: Mendukung *Light Mode* dan *Dark Mode* dengan rasio kontras dinamis.
- 📊 **Visualisasi Data Interaktif**: Grafik pai (*Pie Chart*) interaktif menggunakan *Recharts*.
- 📱 **100% Responsif**: Tata letak akan otomatis beradaptasi dari layar *desktop* lebar hingga perangkat *mobile* berukuran kecil.
- 💰 **Simulasi Tarik PLN**: Mendukung pemilihan berbagai golongan tarif dasar listrik PLN.

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan tumpukan teknologi modern:
- **[React.js](https://reactjs.org/)** (Vite)
- **[Framer Motion](https://www.framer.com/motion/)** (Animasi tingkat lanjut & mikro-interaksi)
- **[Lucide React](https://lucide.dev/)** (Ikon cantik dan konsisten)
- **[Recharts](https://recharts.org/)** (Visualisasi data analitik)
- **Vanilla CSS** (Sistem desain kustom tanpa beban *framework* berlebih)
- **Fuzzy Logic Engine** (Algoritma Sugeno kustom bawaan)

## 🚀 Instalasi & Menjalankan di Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di komputer Anda:

### Prasyarat
Pastikan Anda telah menginstal **[Node.js](https://nodejs.org/)** di komputer Anda.

### Langkah-langkah
1. **Clone repositori ini** (jika sudah di-push ke GitHub):
   ```bash
   git clone https://github.com/username-anda/nama-repo.git
   cd nama-repo
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```
   *atau jika menggunakan yarn:*
   ```bash
   yarn install
   ```

3. **Jalankan peladen pengembangan (*development server*)**:
   ```bash
   npm run dev
   ```

4. **Buka di Browser**:
   Aplikasi akan berjalan di `http://localhost:5173`.

## 🧬 Arsitektur Sistem Pakar (Fuzzy Sugeno)

Aplikasi ini memproses input melalui 5 tahap utama:
1. **Normalisasi (Crisp Input)**: Menerima input Daya (Watt) dan Selisih Waktu Aktual vs Ideal.
2. **Fuzzifikasi**: Memetakan input ke dalam derajat keanggotaan *Fuzzy* (Kecil, Sedang, Besar & Normal, Sedikit, Berlebih).
3. **Mesin Inferensi**: Mengevaluasi 9 basis aturan (*Knowledge Base*) menggunakan operator AND (*Math.min*).
4. **Defuzzifikasi**: Menghitung rata-rata berbobot (*Weighted Average*) untuk menentukan nilai akhir *Z\**.
5. **Kesimpulan**: Menghasilkan klasifikasi status (SANGAT HEMAT hingga KRITIS) beserta rekomendasi perbaikan.

## 🤝 Kontribusi

Proyek ini sangat terbuka untuk dikembangkan! Jika Anda ingin berkontribusi:
1. Lakukan *Fork* pada proyek ini
2. Buat *branch* fitur Anda (`git checkout -b fitur/FiturKeren`)
3. Lakukan *Commit* perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`)
4. Lakukan *Push* ke branch (`git push origin fitur/FiturKeren`)
5. Buka sebuah *Pull Request*

## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan akademis maupun komersial.

---
<p align="center">
  Dibuat dengan ❤️ untuk presentasi Dosen yang memukau!
</p>
