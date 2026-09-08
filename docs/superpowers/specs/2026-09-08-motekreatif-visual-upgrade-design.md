# Spesifikasi Desain — Upgrade Visual motekreatif.com

Tanggal: 8 September 2026 (revisi 2, sore)
Scope: `app/page.tsx` (homepage, 10 section) + `components/shared/PageHero.tsx` (dipakai 12 halaman + `SetupHero`). Blog dan halaman detail case study tidak disentuh.
Stack: Next.js 15.1 App Router, React 19, Tailwind v4, framer-motion 11, lucide-react. Static export ke Cloudflare Pages.
Dokumen pasangan: `2026-09-08-asset-prompts.md` (produksi aset) dan `../plans/2026-09-08-motekreatif-visual-upgrade-plan.md` (urutan kerja).

Yang sudah dikunci pemilik dan tidak dibahas ulang: palette cream/navy/lime/kuning; headline hero persis "Bikin iklan & toko online kamu balik modal — bukan cuma rame dilihat."; harga tidak pernah tampil; aset visual digenerate AI tanpa wajah, tanpa merek, tanpa teks; arah kreatif aset = dunia utas/tali/simpul (lihat dokumen aset §0); mobile adalah desain tersendiri (§5); SEO dan kecepatan adalah kriteria lulus, bukan saran (§11).

Perubahan dari revisi 1: proof point hero pakai label final pemilik (§4.4); format angka koma desimal diseragamkan sampai `lib/data.ts` (§3.1); mobile dipisah jadi section sendiri (§5) dengan keputusan poster, tipografi, sentuh, dan ProofRow; anggaran performa dan kunci SEO jadi section sendiri (§11); teks yang boleh berubah dibatasi ke daftar §11.4 — dua usulan ganti teks di revisi 1 (eyebrow CaseStudies, badge Trifecta) dibatalkan.

---

## 1. Diagnosa singkat (kondisi live)

Lima penanda template yang harus hilang dari scope:

| # | Penanda | Lokasi di kode |
|---|---|---|
| 1 | Gradient kuning 135° + dua bola `rounded-full blur-3xl` + ribbon SVG | `HeroSection.tsx:52-125`, `PageHero.tsx:44-84`, `TrifectaMarketing.tsx:32-62`, `CTASection.tsx:11-55`, `WhyMote.tsx:44-60` |
| 2 | `FlowDiagram`: kartu putih `rounded-2xl`, shadow `0_14px_30px_-20px`, ikon dalam kotak rounded, eyebrow uppercase 10px | `HeroSection.tsx:232-307` |
| 3 | Ikon `Sparkles` sebagai dekorasi eyebrow | `HeroSection.tsx:9,143` |
| 4 | Radius seragam 16–24px, shadow lembut seragam, rangka section identik (eyebrow pill → h2 → subjudul → grid 3 kolom) | `globals.css:308-390`, semua `components/home/*` |
| 5 | Fade-up stagger framer-motion di tiap elemen, `duration 0.5–0.6`, easing `[0.22,1,0.36,1]` di mana-mana | `HeroSection.tsx:17-32`, `PageHero.tsx:7-14`, `CaseStudiesFeatured.tsx:10-23`, `TrifectaMarketing.tsx` |

Temuan tambahan: proof point hero menampilkan `+157% Revenue growth` dan `0.44% MER efisien` (`HeroSection.tsx:34-38`). Keduanya diganti dengan tiga angka final pemilik (§4.4). Format angka di `lib/data.ts` masih titik desimal (`20.8x`, `116.89%`, `0.44%`) dan ikut diseragamkan (§3.1).

---

## 2. Prinsip desain yang mengikat

Tiap butir ditulis sebagai aturan yang bisa dicek lulus/gagal saat review PR.

### 2.1 Radius
- Hanya tiga nilai boleh muncul di scope: `0` (frame media, band, section), `4px` (chip, badge, kotak ikon, tombol kecil), `12px` (kartu, panel).
- Tombol utama (`.btn`) tetap pill `9999px`. Ini satu-satunya pengecualian dan hanya untuk elemen ber-class `.btn`.
- Class Tailwind `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[20px]`, `rounded-[24px]` dilarang di `components/home/*` dan `PageHero.tsx`. `rounded-full` hanya boleh pada `.btn`.
- Frame media (video/gambar) radius `0`, dengan garis 1px. Sudut tajam pada media adalah pembeda paling murah dari template blob.

### 2.2 Shadow
- `box-shadow` dilarang untuk elemen non-interaktif. Kedalaman diberikan oleh garis 1px.
- Elemen interaktif (kartu ber-link, tombol) mendapat perubahan hover berupa garis menggelap ke `#06243B` + `translateY(-2px)`; shadow tetap dilarang di state hover.
- Shadow berwarna (`rgba(189,242,74,…)`, `rgba(255,126,0,…)`) dan `drop-shadow` glow pada SVG dilarang total.
- `backdrop-blur-*` dan `blur-*` dilarang total di scope.

### 2.3 Garis
- Token garis: `--line-on-cream: rgba(6,36,59,0.16)`, `--line-on-yellow: rgba(6,36,59,0.22)`, `--line-on-navy: rgba(239,235,221,0.18)`. Semua garis 1px, tanpa dash, tanpa glow.
- Garis adalah alat struktur utama: pemisah kolom di baris angka, batas atas/bawah band, pemisah baris list. Kartu dengan border 1px lebih diutamakan daripada kartu putih di atas cream.
- Eyebrow diawali bar `20px × 2px` warna orange `#FF7E00` (di navy: lime `#BDF24A`). Pill background eyebrow dihapus.

### 2.4 Warna
- Background section hanya solid: `#F7F4EE`, `#06243B`, `#F4D23A`, `#BDF24A`. `linear-gradient` dilarang di scope. Gradient kuning `#F4D23A → #F7DF75` diganti dua band solid berdampingan (§4.1).
- `#F7DF75` hanya dipakai sebagai band proof row di hero. `#FF7E00` hanya untuk bar eyebrow, angka kecil penanda, dan hover link. Tidak pernah sebagai background area >48px tinggi.
- `bg-clip-text` + gradient pada angka (`CaseStudiesFeatured.tsx:84`) dihapus; angka solid `#06243B`.
- Hex apa pun di luar daftar palette + tiga token garis + `#144668` (hover tombol navy) + `#FFFFFF` dilarang. Termasuk `#A6D636` dan `#CDF56A` yang sekarang ada di gradient — keduanya hijau-lime turunan dan dihapus.

### 2.5 Ritme spacing
- Basis 8px. Jarak yang boleh: 8, 16, 24, 40, 64, 96, 128.
- Padding vertikal section dari tiga kelas saja: `.section-padding` = `clamp(4rem, 8vw, 7rem)`, `.section-padding-tight` = `clamp(3rem, 6vw, 5rem)`, band tipis (Stats, proof row) = `clamp(2rem, 4vw, 3rem)`.
- Jarak heading → isi section: `40px` mobile, `64px` desktop. Nilai `mt-12` (48px) yang sekarang seragam diganti ke salah satu dari dua nilai itu.
- Pola rangka section wajib divariasi. Dari 10 section homepage, maksimum 3 boleh memakai rangka "heading kiri + grid kartu". Yang lain wajib salah satu dari: baris angka berhairline (ProofRow), list dua kolom berhairline, heading kiri + isi kanan (split 5/7), atau panel penuh navy/lime dengan satu CTA.

### 2.6 Kapan motion boleh
- Motion hanya boleh kalau (a) merepresentasikan perubahan state yang dipicu pengguna (hover, fokus), atau (b) menampilkan data yang bergerak (angka counter, video loop). Motion "muncul dari bawah saat di-scroll" tidak memenuhi keduanya dan dihapus dari scope.
- Rincian easing dan durasi di §8.

---

## 3. Skala tipografi

Font tetap Plus Jakarta Sans (weight 400–800 dimuat via `next/font` di `app/layout.tsx:13-17`, self-hosted, `font-display: swap` dengan fallback ber-`size-adjust` otomatis). Tidak ada font kedua.

| Peran | `font-size` | `line-height` | `letter-spacing` | Weight | Catatan |
|---|---|---|---|---|---|
| h1 | `clamp(2.25rem, 1.25rem + 3.9vw, 4rem)` (36→64px; 60px di 1024, 64px mulai 1130) | `1.0` | `-0.03em` | 800 | `text-wrap: balance`, `max-width: 18ch`. Floor 36px, bukan 40px: hitungan baris di §5.3 |
| h2 | `clamp(1.875rem, 1.2rem + 2.6vw, 3rem)` (30→48px) | `1.05` | `-0.025em` | 800 | `max-width: 22ch` |
| h3 | `clamp(1.25rem, 1.05rem + 0.8vw, 1.5rem)` (20→24px) | `1.2` | `-0.01em` | 700 | |
| lead (subjudul hero/PageHero) | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` (18→22px) | `1.4` | `0` | 500 | `max-width: 48ch`, warna `#06243B` opacity 0.8 di kuning; `#3D4F60` di cream |
| body | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` (16→18px) | `1.55` | `0` | 400 | |
| small | `0.875rem` (14px) | `1.45` | `0` | 500 | caption, sumber angka |
| eyebrow/label | `0.75rem` (12px) | `1` | `0.08em` | 600 | uppercase; bar 20×2px di depan |
| stat-num | `clamp(2.25rem, 1.5rem + 3vw, 3.75rem)` (36→60px) | `1` | `-0.03em` | 800 | `font-variant-numeric: tabular-nums` |
| stat-num-sm (kartu case study) | `clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)` (28→40px) | `1` | `-0.02em` | 800 | `tabular-nums` |

Aturan kontras ukuran:
- Dua teks yang berdampingan wajib berbeda ≥1.25× atau sama persis. Pasangan 16/18, 18/20, 22/24 dilarang berdampingan.
- Pasangan yang harus kontras keras: h1 : lead ≥ 2× (64/22 = 2,9 desktop; 36/18 = 2,0 mobile). stat-num : label = 5× desktop (60/12), 3× mobile (36/12).
- `letter-spacing: 0.18em` pada `.eyebrow` (globals.css:283) diturunkan ke `0.08em`. Tracking lebar pada 12px uppercase adalah penanda template.

Perubahan di `app/globals.css @layer base`: ganti nilai `h1/h2/h3` (baris 223-225) dengan clamp di atas; tambah class `.lead`, `.stat-num`, `.stat-num-sm`, `.label` di `@layer components`.

### 3.1 Format angka (berlaku di seluruh UI, termasuk `lib/data.ts`)

Aturan: desimal pakai koma (`20,8x`, `0,44%`, `116,89%`), ribuan pakai titik (`Rp10.000`, `Rp 90.467`), tanda `+`/`−` menempel di angka, `tabular-nums` di tiap elemen angka besar. Kalimat prosa yang memuat angka ikut aturan yang sama karena `CaseStudiesFeatured` dan halaman case study merender string dari `lib/data.ts` apa adanya.

Baris yang diubah (hasil `grep -nE '[0-9]\.[0-9]+(x|%)' lib/data.ts components/home`):

| File:baris | Sekarang | Jadi |
|---|---|---|
| `lib/data.ts:263` | `Marketing cost ratio 0.44% (-86%)` | `Marketing cost ratio 0,44% (-86%)` |
| `lib/data.ts:269` | `… marketing cost ratio hanya 0.44%.` | `… marketing cost ratio hanya 0,44%.` |
| `lib/data.ts:285` | `ROAS 20.8x (+116.89%)` | `ROAS 20,8x (+116,89%)` |
| `lib/data.ts:287` | `ROAS 20.8x (+116.89%)` | `ROAS 20,8x (+116,89%)` |
| `lib/data.ts:293` | `… ROAS 20.8x — naik 116.89% …` | `… ROAS 20,8x — naik 116,89% …` |
| `components/home/HeroSection.tsx:37` | `0.44%` | hilang bersama `proofPoints` (§4.4) |
| `components/home/HeroSection.tsx:206` | `Lihat Bukti: ROAS 20x & +77% Omset` | `Lihat Bukti: ROAS 20,8x & +77% Omset` |

`Rp10.000` (`data.ts:334`), `Rp 90.467` (`data.ts:190`), dan `0,03%` (`data.ts:271`) sudah benar. `lib/jsonld.ts` hanya mengimpor `SERVICES`, tidak `CASE_STUDIES`, sehingga JSON-LD tidak berubah oleh langkah ini. Setelah edit: `grep -nE '[0-9]\.[0-9]+(x|%)' lib/data.ts components app` harus 0 baris.

---

## 4. Hero baru (`components/home/HeroSection.tsx`) — desktop

### 4.1 Struktur
Dua band solid, tanpa gradient, tanpa blob, tanpa ribbon:
1. Band atas `#F4D23A`: grid 12 kolom. Teks 7 kolom kiri, media 5 kolom kanan. `min-height` dihapus; tinggi mengikuti konten (`padding-top` 48px, `padding-bottom` 64px).
2. Band bawah `#F7DF75` (ProofRow): tiga angka dipisah garis vertikal 1px `--line-on-yellow`, batas atas 1px.
3. `.grain-overlay` dipertahankan (opacity 0.035). Ini satu-satunya tekstur.

Peralihan hero → PainPoints adalah garis lurus (hard edge), tanpa wave/divider.

### 4.2 Sketsa desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐ #F4D23A
│  container-mote 1200                                                     │
│  ┌── kolom 1–7 ──────────────────────────┐  ┌── kolom 8–12 ───────────┐ │
│  │ ▬ DIGITAL MARKETING CONSULTANT        │  │ ┌─────────────────────┐ │ │
│  │                                        │  │ │                     │ │ │
│  │ Bikin iklan & toko online              │  │ │   HeroMedia 3:4     │ │ │
│  │ kamu ▓balik modal▓ — bukan             │  │ │   frame 1px navy    │ │ │
│  │ cuma rame dilihat.            (h1 64)  │  │ │   simpul navy di    │ │ │
│  │                                        │  │ │   kertas cream      │ │ │
│  │ Khusus brand F&B, hotel, dan seller    │  │ │   video ≥1024       │ │ │
│  │ Shopee/TikTok Shop … (lead 22, 48ch)   │  │ │   poster <1024      │ │ │
│  │                                        │  │ │                     │ │ │
│  │ (● Konsultasi Gratis via WhatsApp)     │  │ │                     │ │ │
│  │  Lihat Bukti: ROAS 20,8x & +77% Omset ↓│  │ └─────────────────────┘ │ │
│  │ Gratis & tanpa komitmen — … (small)    │  │                         │ │
│  └────────────────────────────────────────┘  └─────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤ 1px
│  #F7DF75  ProofRow                                                       │
│   20,8x                 │  +77%                       │  +300%           │
│   ROAS Ads CPAS         │  Revenue dari Digital       │  leads WhatsApp  │
│                         │  Aktivasi                   │                  │
└──────────────────────────────────────────────────────────────────────────┘
```

Media 5 kolom ≈ 440px lebar × 587px tinggi (3:4). Teks 7 kolom ≈ 620px; h1 64px ExtraBold muat ±16 karakter per baris → headline 4 baris (256px). Grid `items-center`.

### 4.3 Sketsa mobile
Dipindah ke §5.1 karena mobile punya keputusan sendiri (poster, urutan, ProofRow).

### 4.4 Isi ProofRow (tiga angka, final dari pemilik)

| Angka | Label (persis) | Link |
|---|---|---|
| `20,8x` | ROAS Ads CPAS | `/case-studies/hanoon-industries` |
| `+77%` | Revenue dari Digital Aktivasi | `/case-studies/rancabango-hotel` |
| `+300%` | leads WhatsApp | `/case-studies/popondok` |

Label ditulis persis, termasuk huruf kecil di "leads". Tidak ada baris sumber/nama klien di bawah label: pemilik hanya memberi dua baris per item, dan menambah teks berarti melanggar kunci teks §11.4. Setiap item adalah `<a>` ke case study terkait (slug dari `CASE_STUDIES` di `lib/data.ts:256,281,327`), dengan `aria-label` "Lihat studi kasus <klien>". Data disimpan sebagai `const HERO_PROOF` di `HeroSection.tsx`; jangan menambah field ke `lib/data.ts`.

Angka `+157%` dan `0,44% MER` dihapus dari hero. `0,44%` tetap ada di data case study Rancabango (`data.ts:263,269`) dan tampil di halaman case study, di luar scope.

### 4.5 Elemen yang dipertahankan
- Eyebrow "Digital Marketing Consultant" (tanpa ikon, dengan bar).
- h1 persis, termasuk `<span class="highlight-text">balik modal</span>`. `.highlight-text` radius `0.18em → 2px`, padding tetap.
- Lead paragraph persis seperti live.
- CTA utama `.btn.btn-dark` + ikon `MessageCircle` + `ArrowRight`.
- Link sekunder tetap "Lihat Bukti: ROAS 20,8x & +77% Omset" + `ArrowDown` (hanya angka yang diformat ulang, §3.1). Usulan revisi 1 memendekkannya ke "Lihat bukti ↓" dibatalkan karena mengubah teks di luar daftar §11.4.
- Kalimat "Gratis & tanpa komitmen — kalau nggak cocok, kami jujur bilang." tetap, `small`.

### 4.6 Nasib `FlowDiagram` dan `RibbonDecoration`
- `FlowDiagram` (`HeroSection.tsx:232-286`) dan `Arrow` (`:288-307`) dihapus beserta import `Store`, `TrendingUp`, `Sparkles`. Fungsinya (menjelaskan "Brand kamu → Mote → Revenue naik") sudah ada di kalimat lead dan di ProofRow. Teks di dalamnya ("Start / Brand Kamu / Mote / Strategy + Activation + Optimization / Funnel terstruktur… / Outcome / Revenue Naik") ikut hilang; ini satu-satunya penghapusan teks di luar tiga label proof point dan dicatat di §11.4 untuk konfirmasi pemilik di gerbang review pertama.
- Link `href="#case-studies"` bertulisan "↳ Hasil nyata dari campaign klien Mote — lihat buktinya" (`HeroSection.tsx:175-180`) dihapus: ProofRow yang tiap itemnya ber-link ke case study menggantikan fungsinya. Juga dicatat di §11.4.
- Slot visual kanan yang ditinggalkan `FlowDiagram` diisi `HeroMedia` (video loop/poster).
- `RibbonDecoration` dihapus dari `HeroSection`, `PageHero`, `TrifectaMarketing`, `CTASection`, `WhyMote`. File `components/shared/RibbonDecoration.tsx` TIDAK dihapus karena masih diimpor `app/about/page.tsx:6`, `app/community/page.tsx:5`, `app/community/bisnis/page.tsx:5`, `app/community/kreatif/page.tsx:6` (di luar scope). Tandai file itu dengan komentar `// deprecated: jangan dipakai di komponen baru`.
- Parallax ribbon (`useScroll`/`useTransform`, `HeroSection.tsx:42-48`) dihapus bersama ribbon-nya.

---

## 5. Mobile (<1024px) sebagai desain tersendiri

Ukuran uji wajib: 320, 360, 390, 430 px lebar (Chrome DevTools atau Playwright). Angka di bawah dihitung untuk 390×844 (iPhone 14/15) dan dicek ulang di 360×800 (Android kelas menengah, mayoritas audiens).

### 5.1 Sketsa hero mobile (390px)

```
y=0    ┌──────────────────────────────┐ header fixed 64px (di luar hero)
y=64   │ #F4D23A  pad-top 40          │
y=104  │ ▬ DIGITAL MARKETING CONSULT. │ eyebrow 12
y=132  │ Bikin iklan &                │ h1 36px, lh 1.0
       │ toko online kamu             │
       │ ▓balik modal▓ —              │
       │ bukan cuma rame              │
y=312  │ dilihat.                     │ 5 baris = 180px
y=336  │ Khusus brand F&B, hotel, dan │ lead 18px, lh 1.4
       │ seller Shopee/TikTok Shop…   │ ±5 baris = 126px
y=486  │ ┌──────────────────────────┐ │
       │ │● Konsultasi Gratis via WA│ │ .btn w-full, 48px
y=534  │ └──────────────────────────┘ │
y=542  │ Lihat Bukti: ROAS 20,8x &    │ link, min-height 44
y=586  │ +77% Omset ↓                 │
y=590  │ Gratis & tanpa komitmen — …  │ small 14, 20px
y=634  │ ┌──────────────────────────┐ │ gap 24
       │ │ poster 3:2, 350×233      │ │ ← 210 dari 233px masih di fold 844
       │ │ frame 1px navy           │ │
y=867  │ └──────────────────────────┘ │
y=907  ├──────────────────────────────┤ pad-bottom 40, garis 1px
       │ #F7DF75  ProofRow bersusun   │
       │ 20,8x   ROAS Ads CPAS        │ baris 64px, link full-row
       │ ──────────────────────────── │ 1px
       │ +77%    Revenue dari Digital │
       │         Aktivasi             │
       │ ──────────────────────────── │
       │ +300%   leads WhatsApp       │
       └──────────────────────────────┘
```

Urutan mobile: eyebrow → h1 → lead → CTA → link → small → poster → ProofRow. Di DOM, media ditulis satu kali dan dipindah posisinya dengan `order` di grid satu kolom (mobile) vs dua kolom (desktop), supaya tidak ada dua `<img>` untuk satu gambar.

### 5.2 Poster di mobile: tampil, 3:2, di bawah CTA

Keputusan: hero mobile MENAMPILKAN poster. Alasan yang bisa dicek:
- Aset hero adalah pembawa metafora brand (simpul); ≥70% trafik situs ini mobile (cek GA4 sebelum mulai, isi angkanya di baseline §11.6). Menyembunyikannya berarti mayoritas pengunjung tidak pernah melihat identitas visual yang dibayar.
- Posisi setelah CTA: hitungan §5.1 menunjukkan CTA selesai di y≈534 dan link sekunder di y≈586, jauh di atas fold 844. Poster mulai di y≈634 dan 210 px dari 233 px tingginya masih terlihat di fold, jadi ia berfungsi sebagai isyarat scroll tanpa mendorong CTA turun.
- Rasio 3:2 (bukan 3:4 seperti desktop): 3:4 di lebar 350 px = 467 px tinggi, memakan setengah layar untuk gambar ambient. 3:2 = 233 px.
- File terpisah `public/img/hero-poster-m.webp`, 720×480 px (2× dari 360), ≤60 KB (61.440 byte). Dicrop dari first-frame yang sama (band tengah 50% tinggi frame 3:4), jadi tidak ada aset generatif tambahan.
- Markup `<picture>`: `<source media="(min-width:1024px)" srcset="/img/hero-poster.webp" width="720" height="960">` lalu `<img src="/img/hero-poster-m.webp" width="720" height="480" alt="…" loading="eager" fetchpriority="high" decoding="async">`. Satu request per viewport. Tanpa `<link rel="preload">`: `<picture>` ada di HTML hasil SSR sehingga preload scanner menemukannya di chunk pertama; preload manual berisiko mengunduh dua file.
- Video tidak pernah di-mount <1024px (§7 `useVideoAllowed`).

### 5.3 Tipografi mobile: h1 36px, ≤5 baris di 390, ≤6 baris di 320

Hitungan: Plus Jakarta Sans ExtraBold rata-rata ±0,55em per karakter pada teks huruf kecil → 36px ≈ 19,8px/karakter. Lebar teks = viewport − 2×20px padding `container-mote`.

| Viewport | Lebar teks | Karakter/baris | Baris (headline 69 karakter, `text-wrap: balance`) | Tinggi h1 |
|---|---|---|---|---|
| 320 | 280 | 14 | 6 ("Bikin iklan & / toko online / kamu balik / modal — bukan / cuma rame / dilihat.") | 216px |
| 360 | 320 | 16 | 5 | 180px |
| 390 | 350 | 17 | 5 | 180px |
| 430 | 390 | 19 | 4–5 | 144–180px |

Dengan 40px (usulan revisi 1) di 360px: 14 karakter/baris → 6 baris = 240px, dan di 320px → 7 baris = 280px; CTA turun ke y≈600 dan poster nyaris tidak masuk fold. Karena itu floor h1 diturunkan ke 36px. Verifikasi setelah implementasi: di 360px, `document.querySelector("h1").getClientRects().length` (atau tinggi h1 ÷ 36) ≤ 5; kalau 6, turunkan floor ke `2.125rem` (34px) tanpa mengubah slope.

Lead mobile 18px lh 1.4 (25,2px/baris) ±5 baris. stat-num mobile 36px. Label ProofRow body 16px. Kontras h1:lead = 2,0×, stat-num:label = 2,25× di mobile (label body, bukan 12px, supaya terbaca sebagai kalimat).

### 5.4 Target sentuh ≥44×44px

| Elemen | Ukuran mobile | Cara |
|---|---|---|
| `.btn` CTA WhatsApp | 350×48 | `min-height:44px` sudah ada (`globals.css:276`); tambah `w-full sm:w-auto` |
| Link "Lihat Bukti: ROAS 20,8x & +77% Omset" | ≥350×44 | `display:inline-flex; min-height:44px; align-items:center` |
| Item ProofRow | 350×64 | `<a>` full-row, `min-height:64px`, padding 12px 0 |
| Item PageHero `actions` | ≥44 tinggi | pemakai sudah memakai `.btn` |
| FloatingWhatsApp | 48×±170 | sudah memenuhi |

### 5.5 Tanpa horizontal scroll di 320/360/390/430

`body { overflow-x: hidden }` (`globals.css:208`) menutupi gejala, bukan penyebab, sehingga pemeriksaan dilakukan per-section: untuk tiap `section`, `el.scrollWidth <= document.documentElement.clientWidth`. Penyebab yang dihilangkan oleh spec ini: dua bola `blur-3xl` berukuran 460–520px dengan offset negatif (sumber overflow di hero dan PageHero sekarang) dan ribbon `inset-x-0`. Aturan baru: tidak ada elemen `absolute` yang lebih lebar dari container; `.stat-num` terpanjang (`+300%`, 36px ≈ 105px) muat di kolom 280px.

### 5.6 ProofRow mobile: bersusun, bukan geser horizontal

Keputusan: tiga baris bersusun, garis 1px di antaranya, tiap baris = angka (`.stat-num` 36px, `min-width: 5.5ch`, tabular) di kiri + label body di kanan, satu `<a>` untuk seluruh baris.

Alasan:
- Geser horizontal menyembunyikan angka ke-2 dan ke-3 tanpa isyarat; pemilik membayar tiga angka supaya terlihat, dan tiap angka adalah link ke case study yang butuh area tap sendiri.
- Tiga kolom berdampingan di 360px = ±107px per kolom; "Revenue dari Digital Aktivasi" jadi 4 baris pada 12px — tidak terbaca.
- Bersusun: 3×64 + 2×1 = 194px, band tetap pendek.

### 5.7 FloatingWhatsApp tidak menabrak

`components/layout/FloatingWhatsApp.tsx` = `fixed bottom-5 right-5`, tinggi ±48px, lebar ±170px → zona tertutup 190×68px di kanan-bawah viewport, pada posisi scroll mana pun.
- Di fold awal 390×844 FAB berada di y 776–824; elemen hero terdekat (poster, y 634–867) tidak interaktif, jadi tidak ada tap yang tertutup.
- Saat ProofRow atau CTA berada di dasar viewport, hanya 170px sisi kanan yang tertutup; angka + label ProofRow mulai dari kiri (lebar tap bersih ≥180px), dan tombol CTA full-width menyisakan ≥180px di kiri. Tidak ada elemen interaktif hero yang seluruhnya berada di zona 190×68 kanan-bawah.
- FAB tetap `z-50`; hero `isolate` dengan z lokal, tidak menumpuk di atasnya.

### 5.8 PageHero mobile

```
┌──────────────────────────────┐ #F4D23A, pad clamp(3rem,6vw,5rem)
│ ▬ EYEBROW                    │
│ Judul halaman (h1 36)        │
│ Deskripsi (lead 18)          │
│ (● aksi)  (aksi 2)           │ .btn, wrap
│ ┌──────────────────────────┐ │ gap 24
│ │ strip 3:1, 350×117       │ │ page-*-m.webp ≤40 KB
│ └──────────────────────────┘ │
├──────────────────────────────┤ 1px --line-on-yellow
```

Keputusan: media PageHero tampil di mobile sebagai strip 3:1 di bawah teks (revisi 1 menyembunyikannya). Alasan: keempat gambar membentuk urutan cerita (tiga utas → tarik kencang → dipilin → ujung terbuka) yang hanya berarti kalau terlihat di mobile juga; biaya ≤40 KB per halaman, dan bentuk tali yang memanjang cocok dengan strip. Ukuran file 780×260 px, `<picture>` dengan `<source media="(min-width:1024px)">` untuk 4:3 desktop. Halaman tanpa `media` tidak berubah. Varian `compact` tidak pernah punya media.

---

## 6. `PageHero` baru (`components/shared/PageHero.tsx`)

### 6.1 Props
```ts
type PageHeroMedia = {
  src: string;        // /img/page-*.webp, 1200×900 (desktop 4:3)
  srcMobile: string;  // /img/page-*-m.webp, 780×260 (mobile 3:1)
  alt: string;        // deskripsi gambar berbahasa Indonesia, dari dokumen aset
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;          // substring title yang dibungkus .highlight-text (perilaku lama tetap)
  description?: string;
  actions?: ReactNode;
  media?: PageHeroMedia;       // opsional; kalau ada → split 7/5 di lg, strip 3:1 di bawah teks di <lg
  variant?: "default" | "compact";  // compact = halaman legal
};
```
Lebar/tinggi tidak jadi prop karena dua ukuran itu tetap untuk semua halaman; ditulis konstan di komponen (`1200×900`, `780×260`).

### 6.2 Varian `default`
- Background solid `#F4D23A`, `.grain-overlay`, batas bawah 1px `--line-on-yellow`. Tanpa blob, tanpa ribbon, tanpa gradient.
- Tanpa `media`: teks `max-width: 44rem`, padding `clamp(3rem, 6vw, 5rem)` atas-bawah.
- Dengan `media`, ≥1024px: grid 12 kolom, teks 7 kolom kiri `items-center`, media 5 kolom kanan. Frame `aspect-ratio: 4/3`, `max-height: 360px`, border 1px `#06243B`, radius 0, `object-fit: cover`.
- Dengan `media`, <1024px: strip `aspect-ratio: 3/1` di bawah teks/aksi, lebar container, border 1px `#06243B`.
- `<picture>` + `<img>` biasa (`next/image` dengan `unoptimized: true` tidak memberi keuntungan di static export), `loading="eager"`, `decoding="async"`, `fetchpriority="high"`, `width`/`height` eksplisit di `<img>` dan `<source>`.
- Tidak ada video di PageHero.

### 6.3 Varian `compact` (privacy-policy, terms, refund-policy)
- Background `#F7F4EE`, tanpa grain, batas bawah 1px `--line-on-cream`.
- Eyebrow tetap dari prop (teks tidak berubah), h1 memakai ukuran h2 (30→48px), description ukuran body warna `#3D4F60`.
- Padding `clamp(2.5rem, 5vw, 4rem)`. `media` dan `highlight` diabaikan kalau dikirim.
- Alasan: tiga halaman legal memakai hero kuning yang sama dengan halaman jualan, sehingga 13 halaman terasa satu template. Legal turun ke cream supaya kuning tetap berarti "halaman utama".

### 6.4 Pemetaan pemakai
| Halaman | Varian | Media |
|---|---|---|
| `app/services/page.tsx` | default | `page-services` |
| `app/case-studies/page.tsx` | default | `page-case-studies` |
| `app/about/page.tsx` | default | `page-about` |
| `app/contact/page.tsx` | default | `page-contact` |
| `app/products/page.tsx`, `app/blog/page.tsx`, `app/blog/100-buku-self-development-bisnis/page.tsx`, `app/community/bisnis/page.tsx`, `app/community/kreatif/page.tsx`, `app/products/clipper/setup/_components/SetupHero.tsx` | default | tanpa media |
| `app/privacy-policy/page.tsx`, `app/terms/page.tsx`, `app/refund-policy/page.tsx` | compact | — |

Perubahan pada file halaman terbatas pada menambah prop `media`/`variant` di pemanggilan `<PageHero>`; teks eyebrow/title/description tidak diubah.

---

## 7. Section homepage yang disentuh

Urutan live tetap: Hero → PainPoints → CaseStudies → Trifecta → Services → WhyMote → Clients → Stats → StartHere → CTA. Kolom "rangka" menunjukkan pola §2.5 supaya tidak ada tiga section berturut-turut dengan rangka sama. Teks di semua section tetap (§11.4).

| # | Section | Rangka baru | Perubahan spesifik |
|---|---|---|---|
| 1 | `HeroSection` | split 7/5 + band angka | §4 dan §5. |
| 2 | `PainPoints` | list dua kolom berhairline | Empat kartu ikon-bulat (`PainPoints.tsx:76-88`) diganti list 2 kolom (1 kolom <768); tiap item: ikon lucide 20px navy tanpa background, teks body. Pemisah baris 1px `--line-on-cream`. Class `rounded-full` + `iconBg` dihapus. `SectionHeading` tetap, `section-padding-tight`. |
| 3 | `CaseStudiesFeatured` | heading kiri + 3 kolom berhairline | `card-soft` diganti kolom dengan border-left 1px (md+), tanpa background putih, tanpa shadow. Angka `cs.result` memakai `.stat-num-sm` solid navy (hapus `bg-gradient-to-br … bg-clip-text`). Badge layanan radius 4px, 12px weight 600, tanpa uppercase. Eyebrow tetap "Hasil, bukan janji" (kunci teks). `motion.article`, `containerVariants`, `cardVariants`, `whileHover` dihapus. Seluruh kolom bisa diklik ke `/case-studies/<slug>`; di mobile kolom bersusun, tinggi tap ≥64px. |
| 4 | `TrifectaMarketing` | diagram (satu-satunya) | Background solid `#06243B`. Hapus blob `blur-3xl`, dua ribbon, gradient. Garis segitiga `stroke="#EFEBDD" strokeOpacity="0.3" strokeWidth="1"` tanpa dash, tanpa `drop-shadow`, tanpa animasi `pathLength`. `PillarNode`/`PillarCard`: border 1px `--line-on-navy`, radius 12px, hapus `backdrop-blur-sm`, hapus `whileHover`. Kotak ikon 40px radius 4px lime. Badge tengah: lime solid radius 4px, tanpa gradient/shadow/spring; teksnya tetap seperti live. Eyebrow tagline 10px → `.label` 12px. |
| 5 | `ServicesObjective` | heading kiri + grid 2 kolom kartu | Kartu radius 12px, border 1px `--line-on-cream`, background `#FFFFFF`, tanpa shadow. Empat gradient ikon (`ServicesObjective.tsx:24-27`) dihapus; kotak ikon 40px radius 4px, background `#06243B`, ikon `#F4D23A`. Badge "Unggulan" lime radius 4px, 12px weight 600. |
| 6 | `WhyMote` | heading kiri + isi kanan (split 5/7) | Background solid `#06243B`, hapus gradient (baris 46) dan ribbon (baris 54). Grid 3 kartu diganti: heading di 5 kolom kiri (sticky di lg), tiga poin di 7 kolom kanan sebagai list berhairline `--line-on-navy` dengan nomor `01/02/03` `.label` orange. Kotak ikon dihapus. |
| 7 | `ClientsSection` | grid logo | Logo `filter: grayscale(1)` + `opacity: 0.55`, hover `opacity: 1` tanpa grayscale, transisi 200ms. Tanpa perubahan lain. |
| 8 | `StatsSection` | band angka (ProofRow tone cream) | Background `#F7F4EE`, batas atas/bawah 1px `--line-on-cream`, padding band tipis. Empat angka memakai `ProofRow` dengan `.stat-num`; di mobile grid 2×2 (bukan bersusun 4, karena label pendek). `Counter` dipertahankan, durasi §8, `min-width: 3ch` supaya angka yang berjalan tidak menggeser label. |
| 9 | `StartHere` | heading kiri + 3 langkah bernomor | Kotak ikon lime `rounded-2xl` diganti nomor `01/02/03` `.stat-num-sm` navy, judul langkah h3, deskripsi body. Panel CTA bawah (baris 89) radius 12px, background `#06243B`, isi tetap. |
| 10 | `CTASection` | panel penuh lime + satu CTA | Background solid `#BDF24A`, hapus gradient, dua blob, dua ribbon. `.grain-overlay` tetap. h2 skala §3, eyebrow bar navy, tombol `.btn-dark`. Isi teks tidak berubah. |

`SectionHeading` (`components/shared/SectionHeading.tsx`): ganti `<span class="eyebrow">` dengan komponen `Eyebrow`; h2 memakai skala §3 (hapus `text-3xl sm:text-4xl md:text-5xl`); description memakai body.

---

## 8. Komponen React baru

| File | Export | Props | Tanggung jawab |
|---|---|---|---|
| `components/shared/HeroMedia.tsx` | `HeroMedia` (client) | `{ poster: string; posterMobile: string; posterAlt: string; webm?: string; mp4?: string; className?: string }` | Selalu render `<picture>` poster (§5.2). Frame luar `aspect-ratio: 3/4` di ≥1024 dan `3/2` di <1024, `position: relative`, border 1px navy. Kalau `useVideoAllowed()` true → setelah event `load` window + `requestIdleCallback` (fallback `setTimeout 200`), mount `<video autoPlay muted loop playsInline preload="none">` `position:absolute; inset:0; object-fit:cover` dengan `<source webm>` lalu `<source mp4>`, panggil `.play()`, dan setelah `canplay` transisikan opacity 0→1 selama 300ms di atas poster. `IntersectionObserver`: `pause()` saat <10% terlihat, `play()` saat kembali. Kalau media query berubah ke <1024 → unmount video. Tidak pernah memuat video di SSR. Kalau `webm`/`mp4` undefined (fase placeholder) → tidak pernah mount video. |
| `lib/useVideoAllowed.ts` | `useVideoAllowed(): boolean` | — | `false` saat SSR dan render pertama (hindari hydration mismatch). `true` hanya jika `matchMedia("(min-width: 1024px)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches && navigator.connection?.saveData !== true`. Subscribe ke perubahan kedua media query. |
| `components/shared/ProofRow.tsx` | `ProofRow` (server) | `{ items: { value: ReactNode; label: string; href?: string; ariaLabel?: string }[]; tone: "yellow" \| "cream" \| "navy"; numSize?: "lg" \| "sm"; mobileLayout?: "stack" \| "grid2" }` | Baris angka berhairline: `repeat(n, 1fr)` di md+ dengan garis vertikal; di mobile `stack` (default, hero) = baris 64px bergaris horizontal, `grid2` (Stats) = 2×2. `value` memakai `.stat-num`, `label` body. Kalau `href` ada, seluruh item adalah `<a>` dengan `aria-label`. Warna garis/teks mengikuti `tone`. Tanpa motion. |
| `components/shared/Eyebrow.tsx` | `Eyebrow` (server) | `{ children: ReactNode; tone: "cream" \| "yellow" \| "navy"; as?: "span" \| "p" }` | Bar 20×2px + teks `.label` uppercase. Warna bar: orange di cream/kuning, lime di navy. Teks navy di cream/kuning, `#EFEBDD` di navy. Menggantikan `.eyebrow*` di scope; class CSS lama dibiarkan untuk halaman di luar scope. |

Komponen yang ditulis ulang, file sudah ada: `HeroSection.tsx`, `PageHero.tsx`, `SectionHeading.tsx`. Komponen yang diedit: sembilan section lain di §7.

`HeroSection` tidak lagi `"use client"`; `"use client"` pindah ke `HeroMedia` supaya teks hero ikut server render tanpa framer-motion di bundle hero. `PageHero` juga jadi server component (tidak ada state).

Placeholder fase refactor (sebelum aset jadi): empat SVG di `public/img/_placeholder/` (`hero-3x4.svg`, `hero-3x2.svg`, `page-4x3.svg`, `page-3x1.svg`), isi persegi cream `#F7F4EE` + garis navy diagonal tipis, <1 KB masing-masing, dimensi `viewBox` sesuai rasio. Dihapus (`git rm`) di langkah penggantian aset; `grep -rn "_placeholder" components app` harus 0 baris saat selesai.

---

## 9. Aturan motion

| Elemen | Jenis | Durasi | Easing | Trigger |
|---|---|---|---|---|
| Video hero | loop | 8 s (aset) | — | mount setelah `load`, hanya ≥1024px, tanpa reduced-motion, tanpa saveData |
| Video fade-in di atas poster | opacity 0→1 | 300 ms | `cubic-bezier(0.2, 0, 0, 1)` | `canplay` |
| `Counter` di Stats | angka naik | 900 ms (sekarang 1200, `StatsSection.tsx:14`) | ease-out kubik yang sudah ada | `useInView once` |
| Hover tombol `.btn` | `translateY(-2px)` + warna | 150 ms | `cubic-bezier(0.2, 0, 0, 1)` | hover/focus-visible |
| Hover kartu ber-link, item ProofRow, logo klien | border/opacity berubah | 200 ms | sama | hover/focus-visible |
| Link teks | warna → `#FF7E00` | 150 ms | sama | hover |

Yang tidak bergerak: teks hero (tanpa entrance), eyebrow, ProofRow, semua kartu dan list saat masuk viewport, garis segitiga Trifecta, badge, PageHero (semua varian). Scroll-linked: tidak ada di scope. Parallax pada video hero tidak dipakai; videonya sendiri sudah bergerak.

Hover `.btn-primary` (lime): background → `#F4D23A`, tanpa gradient, tanpa shadow. Hover `.btn-dark`: background → `#144668`, tanpa shadow.

`prefers-reduced-motion: reduce`: blok di `globals.css:229-238` tetap; tambahan: `useVideoAllowed` mengembalikan `false`, `Counter` langsung menampilkan nilai akhir.

framer-motion tetap terpasang: `Counter` (`useInView`), `components/layout/Header.tsx` (site-wide), `AnimatedSection`, `RibbonDecoration`, `BookGallery`, `CorongCuan` memakainya. Setelah PR ini, tidak ada import `framer-motion` di `HeroSection`, `PageHero`, `CaseStudiesFeatured`, `TrifectaMarketing`, `PainPoints`, `ServicesObjective`, `WhyMote`, `StartHere`, `CTASection`. Peluang penghematan dihitung di §11.7.

---

## 10. Yang HARUS dihapus dari kode (nama persis)

`components/home/HeroSection.tsx`
- Fungsi `FlowDiagram`, fungsi `Arrow`, konstanta `stagger`, `item`, `proofPoints`.
- Import `Sparkles`, `Store`, `TrendingUp` dari `lucide-react`; `motion`, `useScroll`, `useTransform` dari `framer-motion`; `useRef`; `RibbonDecoration`.
- Dua `<div aria-hidden … rounded-full … blur-3xl>`; empat blok `<RibbonDecoration>` beserta `motion.div` pembungkusnya; `style={{ background: "linear-gradient(135deg, #F4D23A …" }}`; class `min-h-[90svh]`.
- Link `href="#case-studies"` bertulisan "↳ Hasil nyata dari campaign klien Mote — lihat buktinya".

`components/shared/PageHero.tsx`
- `"use client"`; konstanta `stagger`, `item`; import `motion`, `RibbonDecoration`; dua div `blur-3xl`; dua blok `<RibbonDecoration>`; inline `linear-gradient`.

`components/home/TrifectaMarketing.tsx`
- Import `RibbonDecoration`; div `blur-3xl` (baris 39-42); dua blok ribbon (44-62); inline gradient (34-37); tiga `style={{ filter: "drop-shadow(…)" }}` dan `strokeDasharray`; `initial/whileInView/transition` pada `motion.path` (jadikan `<path>` biasa); `motion.div` badge tengah dengan `type: "spring"`; class `bg-gradient-to-br from-[#BDF24A] to-[#A6D636]` (tiga tempat); `backdrop-blur-sm`; `whileHover`.

`components/home/CaseStudiesFeatured.tsx`
- Konstanta `containerVariants`, `cardVariants`; import `motion`; `whileHover={{ y: -6 }}`; class `bg-gradient-to-br from-[#06243B] to-[#144668] bg-clip-text text-transparent`; class `card-soft`.

`components/home/CTASection.tsx`
- Import `RibbonDecoration`; inline gradient `#BDF24A → #CDF56A`; dua div `blur-3xl`; dua blok `<RibbonDecoration>`.

`components/home/WhyMote.tsx`
- Inline gradient `linear-gradient(170deg, #06243B …)`; blok `<RibbonDecoration>` dan importnya; class `card-dark`; kotak ikon `rounded-2xl`.

`components/home/ServicesObjective.tsx`
- Empat string `linear-gradient(135deg, …)` (baris 24-27) dan `iconBg` yang memakainya; `rounded-2xl` pada kotak ikon; `shadow-sm`.

`components/home/PainPoints.tsx`
- Objek `iconBg`/`iconColor` per item; class `rounded-full` pada kotak ikon.

`components/home/StartHere.tsx`
- Kotak ikon `rounded-2xl … shadow-sm` (baris 70); `rounded-2xl` pada panel CTA → `rounded-[12px]`.

`components/home/StatsSection.tsx`
- Class `bg-white` dan `border-y border-black/5` pada section; `duration = 1200` → `900`.

`app/globals.css` (hanya class yang dipakai di scope)
- `.card-soft`: `box-shadow` dan `border-radius: 20px`; `.card-soft:hover`: seluruh `box-shadow`, `border-color` lime → `#06243B`.
- `.card-dark:hover`: `box-shadow`.
- `.btn-primary:hover`: `background: linear-gradient(…)` dan `box-shadow`.
- `.btn-dark:hover`: `box-shadow`.
- `.eyebrow`: `background`, `padding`, `border-radius`; `letter-spacing 0.18em → 0.08em`. `.eyebrow-on-dark`, `.eyebrow-light`, `.eyebrow-on-yellow`: `background` (warna teks dipertahankan untuk halaman luar scope).
- `.highlight-text`: `border-radius: 0.18em → 2px`.
- Token `@theme`: tidak ada yang dihapus. Tambahkan `--line-on-cream`, `--line-on-yellow`, `--line-on-navy` di `:root`.

Tidak dihapus walau tidak lagi dipakai di scope: `components/shared/RibbonDecoration.tsx`, `components/shared/BlobDecoration.tsx`, `components/shared/AnimatedSection.tsx`, `components/shared/WaveDivider.tsx` (masih diimpor halaman di luar scope).

---

## 11. Performa dan SEO — kriteria yang dikunci

### 11.1 Target Core Web Vitals (mobile, Lighthouse simulate 4G / Moto G Power)
| Metrik | Batas lulus | Target kerja |
|---|---|---|
| LCP | < 2.500 ms | ≤ 2.000 ms |
| CLS | < 0,10 | ≤ 0,05 |
| INP | < 200 ms | lab proxy: Total Blocking Time ≤ 150 ms; INP nyata dicek di Chrome DevTools Performance panel dengan 5 interaksi (tap CTA, tap ProofRow, buka menu, tap FAB, scroll) — tidak ada yang >200 ms |

Desktop: LCP < 1.800 ms, CLS < 0,05.

### 11.2 Elemen LCP setelah perubahan, dan cara mengoptimalkannya
| Viewport | Elemen LCP | Luas terlihat | Optimasi |
|---|---|---|---|
| Mobile 390 | `<img>` `hero-poster-m.webp` (350×233, 210px terlihat di fold) ≈ 73.500 px², lebih besar dari blok h1 350×180 = 63.000 px² | — | ≤60 KB; `loading="eager"` `fetchpriority="high"` di HTML SSR (ditemukan preload scanner di chunk pertama); tanpa JS yang mengubah `src`; font h1 self-hosted `next/font` sudah di-preload |
| Mobile 360 | sama; kalau h1 jadi 6 baris (216px → 75.600 px²) LCP bisa berpindah ke h1 | — | keduanya cepat: teks bergantung font (preloaded), gambar ≤60 KB |
| Desktop 1280+ | `<img>` `hero-poster.webp` 440×587 ≈ 258.000 px² | — | ≤120 KB, atribut sama; video dimuat setelah `load` sehingga tidak pernah jadi LCP (`<video>` tanpa poster attr tidak dihitung LCP; poster `<img>` yang dihitung) |
| Halaman ber-PageHero, mobile | strip `page-*-m.webp` 350×117 ≈ 41.000 px² vs h1 2–3 baris ≈ 25.000–38.000 px² → strip | — | ≤40 KB, atribut sama |
| Halaman ber-PageHero, desktop | `page-*.webp` 440×330 ≈ 145.000 px² | — | ≤90 KB |

### 11.3 CLS nol
- Semua `<img>` dan `<source>` punya `width`/`height`; frame media punya `aspect-ratio` eksplisit (`3/4`, `3/2`, `4/3`, `3/1`).
- Video di-mount `position:absolute; inset:0` di dalam frame yang sudah punya tinggi → tidak menggeser apa pun.
- `Counter` memakai `tabular-nums` + `min-width: 3ch`.
- Header `fixed` + `main pt-16 md:pt-20` (`app/layout.tsx:92`) tetap.
- Tidak ada elemen yang di-inject di atas fold setelah hydration (entrance animation dihapus; ProofRow dan teks server-rendered).

### 11.4 Yang tidak boleh berubah demi SEO
- Struktur heading: tiap halaman tetap satu `h1`; urutan `h2`/`h3` di 10 section homepage dan di `PageHero` tidak berubah. `SimpulKnot`/`about` tidak disentuh.
- `lib/jsonld.ts`, `lib/metadata.ts`, `app/sitemap.ts`: tidak dibuka.
- Seluruh konten teks tetap, kecuali daftar ini:
  1. Tiga proof point hero (§4.4) menggantikan `20x / ROAS tertinggi`, `+157% / Revenue growth`, `0.44% / MER efisien`.
  2. Format angka (§3.1): `20.8x → 20,8x`, `116.89% → 116,89%`, `0.44% → 0,44%`, `ROAS 20x → ROAS 20,8x` di link sekunder hero.
  3. Teks yang HILANG karena komponennya dihapus, wajib dikonfirmasi pemilik di gerbang review 1: label `FlowDiagram` (`Start`, `Brand Kamu`, `Mote`, `Strategy + Activation + Optimization`, `Funnel terstruktur. Paid Activation efisien. Sales Channel yang optimal.`, `Outcome`, `Revenue Naik`) dan link `↳ Hasil nyata dari campaign klien Mote — lihat buktinya`.
- `alt` deskriptif berbahasa Indonesia untuk tiap aset baru — teks final ada di dokumen aset per aset (A1–A5). Logo klien di `ClientsSection` tetap memakai `alt` dari `PARTNER_LOGOS`.

### 11.5 Anggaran aset
| File | Ukuran maks | Dimensi |
|---|---|---|
| `public/video/hero-loop.webm` (VP9, tanpa audio) | 1.258.291 byte (1,2 MB) | 720×960, 24 fps, 8 s |
| `public/video/hero-loop.mp4` (H.264 main, tanpa audio) | 1.258.291 byte | sama |
| `public/img/hero-poster.webp` | 122.880 byte (120 KB) | 720×960 |
| `public/img/hero-poster-m.webp` | 61.440 byte (60 KB) | 720×480 |
| `public/img/page-{services,case-studies,about,contact}.webp` | 92.160 byte (90 KB) masing-masing | 1200×900 |
| `public/img/page-*-m.webp` | 40.960 byte (40 KB) masing-masing | 780×260 |

Batas 90 KB untuk PageHero (revisi 1: 120 KB) karena subjeknya sekarang tali di atas kertas polos — area datar besar, detail terkonsentrasi; WebP q80 untuk gambar begini biasanya 45–70 KB di 1200×900. Kalau kandidat terpilih lewat batas, turunkan `-quality` ke 72 sebelum menurunkan dimensi.

Video: hanya ≥1024px, `preload="none"`, mount setelah `load`, mati saat `prefers-reduced-motion` dan `saveData`. Total transfer halaman homepage: mobile ≤ 350 KB (HTML + CSS + JS + font + poster-m + logo klien), desktop sebelum video ≤ 450 KB, setelah video ≤ 1,7 MB.

### 11.6 Verifikasi sebelum dan sesudah (perintah persis)
Dijalankan di commit sebelum perubahan pertama (baseline) dan di akhir. Hasil disimpan ke `docs/superpowers/perf/2026-09-08-baseline.md` dan `…-after.md` (tabel angka saja).

```bash
# 1. build statis + serve lokal (tanpa server Next; sama seperti Cloudflare Pages)
pnpm build && (cd out && python3 -m http.server 3000 >/dev/null 2>&1 &)

# 2. Lighthouse mobile ×3, ambil median (lighthouse ada di /usr/local/bin/lighthouse)
for i in 1 2 3; do
  lighthouse http://localhost:3000/ --preset=perf --form-factor=mobile \
    --screenEmulation.mobile --throttling-method=simulate --quiet \
    --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-m-$i.json
done
for i in 1 2 3; do jq -r '[.audits["largest-contentful-paint"].numericValue, .audits["cumulative-layout-shift"].numericValue, .audits["total-blocking-time"].numericValue, .audits["largest-contentful-paint-element"].details.items[0].items[0].node.selector] | @tsv' /tmp/lh-m-$i.json; done

# 3. Lighthouse desktop ×3
for i in 1 2 3; do
  lighthouse http://localhost:3000/ --preset=perf --form-factor=desktop \
    --screenEmulation.disabled --throttling-method=simulate --quiet \
    --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-d-$i.json
done

# 4. ukuran yang dibandingkan
wc -c out/index.html
du -sk out/_next/static/chunks
ls -l out/_next/static/chunks/app/page-*.js out/_next/static/chunks/app/layout-*.js
ls -l out/_next/static/css/*.css
# 5. transfer total homepage mobile (dari Lighthouse)
jq '.audits["total-byte-weight"].numericValue' /tmp/lh-m-1.json
```

Ulangi langkah 2 untuk `/services` dan `/privacy-policy` (satu run masing-masing) karena PageHero berubah.

### 11.7 Peluang menghapus dependensi (tidak wajib)
`framer-motion` 11: `node_modules/framer-motion/dist/framer-motion.js` = 140,5 KB unminified; di bundle Next produksi, import `motion` + `useInView` biasanya menyumbang ±32–38 KB gzip ke chunk bersama. Setelah refactor ini pemakai yang tersisa di homepage hanya `StatsSection` (`useInView`, gantinya 12 baris `IntersectionObserver`), tetapi `components/layout/Header.tsx` (dimuat di semua halaman), `AnimatedSection`, `RibbonDecoration`, `BookGallery`, `CorongCuan` masih memakainya. Menghapus dari `StatsSection` saja tidak menurunkan ukuran chunk bersama sedikit pun. Penghematan ±32–38 KB gzip hanya terjadi kalau `Header.tsx` + `AnimatedSection.tsx` juga dimigrasi ke CSS transition + `IntersectionObserver`; angka pastinya diukur dengan `ls -l out/_next/static/chunks/*.js` sebelum/sesudah. Dicatat sebagai tindak lanjut terpisah, bukan bagian PR ini.

---

## 12. Kriteria selesai (cek satu per satu)

Kode
1. `pnpm build` lulus tanpa warning baru; `pnpm lint` bersih.
2. `grep -rn "blur-3xl\|RibbonDecoration\|Sparkles\|linear-gradient\|bg-clip-text\|backdrop-blur\|drop-shadow" components/home components/shared/PageHero.tsx components/shared/SectionHeading.tsx` → 0 baris.
3. `grep -rn "rounded-xl\|rounded-2xl\|rounded-3xl\|rounded-\[20px\]\|rounded-\[24px\]" components/home components/shared/PageHero.tsx` → 0 baris. `rounded-full` hanya muncul bersama class `btn`.
4. `grep -rn "framer-motion" components/home components/shared/PageHero.tsx` → hanya `StatsSection.tsx`.
5. `grep -rn "shadow-" components/home components/shared/PageHero.tsx` → 0 baris.
6. Hex di file yang diubah hanya dari daftar: `#F7F4EE #06243B #BDF24A #F4D23A #F7DF75 #FF7E00 #3D4F60 #EFEBDD #144668 #FFFFFF` + tiga token garis. Cek: `grep -ohn "#[0-9A-Fa-f]\{6\}" <file yang diubah> | sort -u`.
7. `grep -nE '[0-9]\.[0-9]+(x|%)' lib/data.ts components app` → 0 baris; `grep -n "+157%\|MER" components/home/HeroSection.tsx` → 0 baris.
8. `pnpm build` menghasilkan `out/index.html` yang memuat `<picture>` dengan `<img` ber-`width` dan `height`, dan TIDAK memuat tag `<video`.
9. `grep -rn "_placeholder" components app public/img` → 0 baris (setelah aset asli dipasang).

Aset
10. `stat -f%z` tiap file ≤ batas §11.5.
11. `ffprobe -v error -select_streams a -show_entries stream=codec_type public/video/hero-loop.mp4` → kosong. Sama untuk `.webm`.
12. `ffprobe -v error -show_entries stream=width,height,r_frame_rate,codec_name public/video/hero-loop.webm` → `vp9`, `720`, `960`, `24/1`.

Perilaku browser (Chrome DevTools, `python3 -m http.server 3000` di `out/`)
13. Viewport 390×844, Network filter `video`: 0 request setelah scroll seluruh halaman.
14. Viewport 1280×800, Network: request `hero-loop.webm` muncul SETELAH event `load`. Elemen `<video>` opacity 1 dalam ≤1 s setelah request.
15. Rendering → Emulate `prefers-reduced-motion: reduce`, reload di 1280: `document.querySelector("video")` → `null`.
16. Lighthouse mobile median 3 run: LCP < 2.500 ms, CLS < 0,10, TBT ≤ 150 ms; elemen LCP = `img[src*="hero-poster-m"]` atau `h1`.
17. Lighthouse desktop median: LCP < 1.800 ms; elemen LCP = `img[src*="hero-poster"]`.
18. Performance panel saat video berputar di 1280: ≥55 fps; tidak ada layout shift saat video menggantikan poster.

Mobile
19. Di 320, 360, 390, 430: untuk tiap `section`, `scrollWidth <= clientWidth` dokumen (jalankan dengan `body{overflow-x:visible}` sementara).
20. Di 360: h1 ≤5 baris (tinggi ≤180px); di 320 ≤6 baris.
21. Di 390: CTA WhatsApp sepenuhnya terlihat tanpa scroll (bottom ≤ 844); poster mulai ≤ 660px.
22. Semua elemen interaktif hero + ProofRow + link sekunder: `getBoundingClientRect()` tinggi ≥44 dan lebar ≥44.
23. Tidak ada elemen interaktif hero yang seluruhnya berada di zona 190×68 kanan-bawah viewport saat berada di dasar layar (cek visual dengan FAB tampil).

Visual
24. Di 1440px, `getComputedStyle(h1).fontSize` = `64px`; di 390px = `36px`. Lead 22px / 18px.
25. Hero desktop: headline 4 baris, CTA WhatsApp terlihat tanpa scroll di 1280×800.
26. Dari 10 section homepage, tidak ada tiga berurutan dengan rangka "heading kiri + grid kartu" (tabel §7).
27. Halaman legal tidak lagi berlatar kuning; services/case-studies/about/contact menampilkan 4:3 di ≥1024 dan strip 3:1 di <1024.
28. Screenshot 1440 dan 390 dari homepage + `/services` + `/privacy-policy` diperlihatkan ke pemilik di tiap gerbang review (rencana §"Gerbang"). Tidak ada push/deploy dalam scope pekerjaan ini.
