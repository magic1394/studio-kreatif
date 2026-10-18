# AGENTS.md — Panduan Arsitektur untuk Hermes Agent (v2 — Bright & Positive Vibes)

Proyek ini adalah website portofolio & pemesanan layanan kreatif (**Studio Kreatif**) berbasis **Vite + Vanilla ES6 Modules + Modular CSS + JSON Data Layer**.
Versi 2.0 ini menggunakan tema **Bright, Energetic & Positive Creative Studio** (latar cerah hangat, kartu bersih, aksen gradien cerah).

---

## 1. Peta File & Tanggung Jawab (Kemana Harus Mengedit?)

| Tugas / Permintaan User | File yang Harus Diedit oleh Hermes Agent | Jangan Sentuh File Ini |
| :--- | :--- | :--- |
| Mengubah Nomor WhatsApp, Nama Brand, Tagline, Statistik Hero, atau Sosial Media | `src/data/siteConfig.json` | `src/modules/*.js`, `index.html` |
| Mengubah Harga Paket, Menambah/Menghapus Layanan, atau Mengubah Fitur Paket | `src/data/services.json` | `src/modules/renderPricing.js` |
| Menambah/Mengganti Video Portofolio (Link YouTube) atau Kategori | `src/data/portfolio.json` | `src/modules/renderPortfolio.js` |
| Mengubah Alur Pemesanan, Syarat & Ketentuan (T&C), atau FAQ | `src/data/workflow.json` | `src/modules/renderWorkflow.js` |
| Mengubah Warna Tema (Background, Aksen Cerah, Bayangan) | `src/styles/tokens.css` | `src/styles/components.css` |
| Mengubah Format Teks Chat WhatsApp Otomatis | `src/modules/waCalculator.js` & `src/modules/utils.js` | `src/data/*.json` |

---

## 2. Skema Data JSON (`src/data/`)

### A. `src/data/siteConfig.json`
Berisi pengaturan global studio:
- `whatsappNumber`: Gunakan format internasional tanpa tanda `+` atau `0` di depan (contoh: `"6281234567890"`).
- `domain`: Domain aktif (contoh: `"studiokreatif.biz.id"`).

### B. `src/data/services.json`
Setiap item di dalam array `packages` wajib memiliki struktur berikut:
```json
{
  "id": "string-unik",
  "category": "clipper | editing | ai-motion | custom",
  "categoryLabel": "Label Kategori",
  "name": "Nama Paket",
  "badge": "Populer / Best Value / null",
  "price": 175000,
  "unit": "Menit",
  "minOrder": 1,
  "shortDesc": "Deskripsi singkat 1 kalimat",
  "features": ["Fitur 1", "Fitur 2"],
  "limitations": "Catatan batasan paket (misal: maks revisi 2x)"
}
```
> **PENTING UNTUK HERMES AGENT:** Properti `price` harus berupa **Angka (Number/Integer)** murni dalam Rupiah (contoh: `175000`, bukan `"175rb"`), karena nilai ini digunakan langsung oleh kalkulator estimasi harga di `src/modules/waCalculator.js`.

---

## 3. Perintah Terminal (Development & Deployment)

- **Menjalankan Server Lokal (HMR aktif):**
  ```bash
  npm install
  npm run dev
  ```
- **Membuat Build Produksi (Output ke folder `dist/`):**
  ```bash
  npm run build
  ```
