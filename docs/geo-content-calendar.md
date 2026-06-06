# GEO Content Calendar & Freshness Plan — Mote Kreatif

AI engines memprioritaskan konten yang segar dan konsisten di-update. Plan ini menjaga sinyal freshness tanpa membebani tim.

## Status Konten (Juni 2026)

**Live — 7 artikel:**
| Artikel | Tipe | Target query AI |
|---|---|---|
| Biaya jasa digital marketing Indonesia | Pillar | "berapa biaya digital marketing" |
| Apa itu CPAS Shopee | Pillar | "apa itu CPAS", "cara iklan Shopee di Facebook" |
| Cara memilih digital marketing agency | Pillar | "cara memilih agency", "agency terbaik" |
| Agency vs tim in-house | Pillar | "agency atau hire sendiri" |
| Rancabango: strategi low season | Studi kasus | "strategi marketing hotel" |
| Balong Aja: market wisata lewat bercerita | Studi kasus | "strategi marketing cafe/wisata" |
| Photography storytelling F&B | Insight | "konten F&B", "food photography" |

## Cadence: 2 artikel/bulan + 1 update kuartalan

### Backlog Artikel (urutan prioritas, target query AI)

**Juli 2026:**
1. "Strategi TikTok Shop untuk UMKM 2026" — query: "cara jualan di TikTok Shop"
2. "Digital marketing untuk hotel & resort: panduan lengkap" — perkuat cluster hospitality (sudah ada bukti Rancabango)

**Agustus 2026:**
3. "Meta Ads vs TikTok Ads: mana yang cocok untuk produk kamu" — query perbandingan, AI suka kutip
4. "Cara membuat KPI marketing yang terhubung ke revenue" — funnel ke TDMO

**September 2026:**
5. "Panduan marketing untuk bisnis F&B di kota kecil" — cluster F&B (bukti: Balong Aja, Restorasa, Home of BEN)
6. "Apa itu ROAS dan berapa angka yang sehat" — query definisi + MOTE punya bukti 20.8x

**Oktober–Desember 2026:**
7. "Biaya iklan Shopee & CPAS: panduan budget"
8. "Cara audit kinerja digital marketing sendiri (checklist gratis)"
9. "AI untuk marketing UMKM: yang berguna vs yang hype" — kredibilitas AI CRM
10. Studi kasus baru (klien TDMO graduation berikutnya)

### Update Kuartalan (freshness signal)

Setiap awal kuartal (Jan/Apr/Jul/Okt):
- [ ] Update angka di artikel biaya (cek masih relevan dengan pasar)
- [ ] Update STATS di homepage (`lib/data.ts`): jumlah klien, project
- [ ] Tambah hasil baru ke case studies bila ada
- [ ] Update `public/llms.txt` bila ada layanan/produk/hasil baru
- [ ] Cek `datePublished`/tambah `dateModified` di artikel yang di-update

### Aturan Penulisan (GEO-friendly)

1. **Jawaban dulu** — H2 pertama selalu "Jawaban Singkat" yang menjawab query dalam 2–4 kalimat. AI mengutip bagian ini.
2. **Angka spesifik** — "ROAS 20.8x" lebih dikutip daripada "ROAS tinggi".
3. **Tabel & list** — format terstruktur paling mudah diekstrak AI.
4. **FAQ di akhir + FAQPage schema** — pakai pola yang sudah ada (`buildFaqJsonLd`).
5. **Kalimat entity** — sebut "Mote Kreatif" + lokasi minimal 1× per artikel secara natural.
6. **Tidak mengarang angka** — semua klaim harus dari data klien nyata atau sumber pasar yang wajar.

### Distribusi per Artikel

Setiap artikel baru:
- [ ] Posting ringkasan di LinkedIn Company Page (300–500 kata + link)
- [ ] Carousel Instagram dari poin utama
- [ ] Tambah ke sitemap otomatis (sudah jalan via `lib/blog.ts`)
- [ ] Internal link dari/ke artikel terkait

## Pengukuran (setelah GA4 live)

Cek bulanan:
- Traffic referral dari: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai
- Test manual: tanya ChatGPT/Perplexity/Gemini "digital marketing agency di Garut" dan "jasa CPAS Shopee" — catat apakah Mote Kreatif disebut (screenshot, simpan tanggal)
- Google Search Console: impresi query brand "mote kreatif"
