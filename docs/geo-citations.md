# GEO Citations & Off-site Checklist — Mote Kreatif

AI engines (ChatGPT, Gemini, Perplexity, Claude) menjawab pertanyaan "agency digital marketing di Garut/Indonesia" terutama dari **sumber pihak ketiga**, bukan dari website brand sendiri. Checklist ini = pekerjaan off-site yang harus dilakukan manual (tidak bisa dari kode).

## Identitas Kanonik (NAP — Name, Address, Phone)

Pakai data ini **persis sama** di semua platform. Inkonsistensi = sinyal entity lemah.

- **Nama:** Mote Kreatif
- **Legal:** PT Masyarakat Modal Tekun
- **Kategori:** Digital Marketing Agency / Marketing Consultant
- **Alamat utama:** Jl. Raya Cipanas No.13, Cimanganten, Kec. Tarogong Kaler, Kabupaten Garut, Jawa Barat 44151
- **Alamat kedua:** Jl. Ahmad Yani Timur No.74, Lebakjaya, Kec. Karangpawitan, Kabupaten Garut, Jawa Barat 44182
- **Telepon:** +62 896-6215-8784
- **Email:** motekreatif@gmail.com
- **Website:** https://motekreatif.com
- **Deskripsi kanonik (copy-paste):** Mote Kreatif adalah digital marketing agency dan consultant berbasis di Garut, Jawa Barat, Indonesia, yang membantu brand lokal scale penjualan lewat Meta Ads, CPAS Shopee, TikTok Shop Ads, marketplace optimization, dan pengembangan tim marketing internal (TDMO).
- **Didirikan:** 2024

## Prioritas 1 — Google Business Profile (dampak terbesar)

- [ ] Klaim/buat profil untuk kedua kantor (business.google.com)
- [ ] Kategori utama: "Marketing agency" / "Internet marketing service"
- [ ] Isi deskripsi dengan kalimat kanonik di atas
- [ ] Upload logo + minimal 10 foto (kantor, tim, kegiatan)
- [ ] Tambah layanan: Meta Ads, CPAS Shopee, TikTok Shop Ads, Marketplace Optimization, TDMO
- [ ] Jam buka: Senin–Jumat 09.00–17.00
- [ ] Minta 5–10 review dari klien (Rancabango, Hanoon, Restorasa, Popondok dll) — review menyebut layanan spesifik ("Meta Ads", "CPAS") lebih bernilai
- [ ] Setelah live: copy share link Maps → tambah ke `SAME_AS` di `lib/constants.ts`

## Prioritas 2 — Direktori Agency

- [ ] **Sortlist** (sortlist.id) — direktori agency terbesar yang diindex AI
- [ ] **Clutch** (clutch.co) — minta 2–3 klien isi review terverifikasi
- [ ] **DesignRush** (designrush.com/agency)
- [ ] **GoodFirms** (goodfirms.co)
- [ ] **Sribu/Sribulancer directory** (lokal Indonesia)
- [ ] Semua listing: pakai NAP + deskripsi kanonik di atas

## Prioritas 3 — Media & Konten Pihak Ketiga

- [ ] Press release / liputan media lokal (jabarekspres, garutupdate, dll) tentang TDMO atau case study Rancabango
- [ ] Kontribusi artikel ke media marketing Indonesia (DailySocial, Marketeers, MIX)
- [ ] LinkedIn Company Page aktif — posting case study (AI engines crawl LinkedIn)
- [ ] Profil founder publik (LinkedIn) yang menyebut Mote Kreatif → entity anchor

## Prioritas 4 — Platform Tambahan

- [ ] Crunchbase company profile
- [ ] Wikidata entry (setelah ada liputan media sebagai referensi)
- [ ] Glints/LinkedIn company untuk employer presence

## Setelah Setiap Listing Live

1. Tambahkan URL ke `SAME_AS` di `lib/constants.ts`
2. Deploy ulang — schema `sameAs` otomatis update

## Catatan

- URL LinkedIn di `lib/constants.ts` masih tebakan (`/company/motekreatif`) — verifikasi/perbaiki
- Stat "3+ Tahun Pengalaman" vs foundingDate 2024 — putuskan framing sebelum listing direktori (konsistensi cerita)
