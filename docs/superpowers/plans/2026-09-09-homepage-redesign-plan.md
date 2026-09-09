# Rencana update homepage motekreatif.com

## 1. Diagnosis: halaman ini tidak pernah memperlihatkan kerjanya

Masalah utamanya isi, baru gaya. Sepanjang 7.970px halaman ini hanya bicara tentang Mote dengan suara Mote: klaim angka tanpa periode, tiga alasan "kenapa Mote" tanpa bukti, diagram Paid/Owned/Earned yang bisa dipasang agensi mana pun, 20 logo abu-abu. Tidak ada satu pun benda yang cuma Mote yang punya: screenshot Ads Manager klien, satu kalimat dari owner hotel, wajah orang yang bakal jawab WhatsApp. Foto tali menggantikan semua itu. Owner bilang "biasa saja" karena memang tidak ada yang bisa dia pegang; setiap section bisa dipindah ke website agensi lain tanpa ganti satu kata. Ritme yang seragam (eyebrow, H2, paragraf abu, grid, sepuluh kali) memperparah: mata tidak dapat alasan berhenti setelah hero. Ini mustahil diselesaikan dengan tipografi atau warna saja. 60% rencana di bawah soal bukti dan pemangkasan, 40% soal visual.

Soal keberatan "terlalu hard selling": saya sependapat dengan reviewer. Yang ditolak owner adalah foto produk gaya iklan (kamar hotel dipoles, piring makanan). Screenshot dashboard, konten klien yang sudah tayang, dan foto tim di lokasi klien adalah bukti kerja, dan bukti kerja tidak pernah terbaca hard sell. Catatan penting: repo sudah menyimpan tiga foto manusia asli (`public/img/img1-3.webp`, acara Karya Kultur Kreatif di The HOP) yang cuma dipakai di halaman About, dan `public/img/page-about.webp` adalah foto kedua motif tali (benang lepas menyatu jadi tali). Dua keluhan reviewer (nol manusia, satu ide visual tanpa gema) bisa mulai dijawab dengan aset yang sudah ada.

## 2. Arah desain: lima section, tiap warna muncul sekali, nol ikon, tiap angka bawa sumber

Halaman dipangkas dari 10 section ke 5: Hero → strip logo → Bukti (navy) → Cara kerja (krem) → Mulai (lime). Setiap section punya format sendiri, sehingga pola selang-seling krem/navy hilang dengan sendirinya. Satu section diberi skala ekstrem (angka 9rem di Bukti), sisanya normal. Kartu putih di atas krem dihapus semua; pemisah cukup garis 1px. Ikon lucide hanya hidup di dalam tombol. Target tinggi desktop sekitar 4.500px (dari 7.970), mobile sekitar 6.500px (dari 10.861).

Aturan tipografi (`app/globals.css`, di luar blok clipper):
- `h1` tetap.
- Tambah `.stat-num-xl { font-size: clamp(4.5rem, 3rem + 7vw, 9rem); line-height: .9; letter-spacing: -0.04em; font-weight: 800; font-variant-numeric: tabular-nums }`. Dipakai persis satu kali di halaman (angka utama section Bukti).
- `.stat-num` hanya di ProofRow hero. `.stat-num-sm` dihapus dari homepage.
- `h2` tetap, tapi jumlah H2 di halaman maksimal 3 (Bukti, Cara kerja, Mulai). Strip logo tanpa H2.
- Tambah `.caption-source { font-size: .8125rem; line-height: 1.4; font-weight: 500 }` untuk baris periode dan sumber di bawah tiap angka. Warna `#3D4F60` di krem, `#F4D23A` di navy.
- Eyebrow maksimal 2 di halaman (Bukti, Cara kerja). Eyebrow hero "Digital Marketing Consultant" dihapus; tidak ada owner yang mencari kata itu.
- Paragraf deskripsi weight 400, `max-width: 52ch`. Lead hero tetap 500.

Aturan warna:
- Kuning `#F4D23A`: hero saja. Band proof hero tetap `#F7DF75`.
- Navy `#06243B`: section Bukti saja. Plate screenshot pakai `#0E2C44` (sudah ada di Trifecta).
- Krem `#F7F4EE`: Cara kerja. Tint baru `--color-cream-deep: #EFEAE0` untuk strip logo, supaya strip terbaca sebagai pita, bukan section.
- Lime `#BDF24A`: tombol primer di seluruh halaman dan latar section Mulai (menggantikan CTASection yang sudah lime).
- Oranye `#FF7E00`: hanya garis eyebrow dan angka urut 01/02/03. Tidak untuk teks link.
- Kartu berlatar putih di atas krem: dilarang di homepage. Highlight lime di h1 tetap.

Ritme spasi:
- Tiga ukuran saja: `band-padding` (strip logo), `section-padding` (Cara kerja, Mulai), `section-padding-lg` baru `clamp(6rem, 10vw, 9rem)` (Bukti).
- Urutan tinggi: hero tinggi, strip tipis ±120px, Bukti paling tinggi, Cara kerja sedang, Mulai sedang. Tidak ada dua section berurutan dengan tinggi mirip.

Aturan ikon:
- Lucide hanya di tombol (`ArrowRight`, `MessageCircle`) dan FloatingWhatsApp. Ikon di kotak berwarna (PainPoints, ServicesObjective, Trifecta) dihapus tanpa pengganti; nomor urut 01/02/03 gaya WhyMote jadi penanda baris.
- Chip tag (Meta Ads, CPAS Shopee) tetap, teks saja.

Aturan foto:
- Hanya tiga jenis: (a) orang Mote atau klien, (b) screenshot dashboard atau konten klien yang tayang, (c) motif tali. Stok, ilustrasi AI, foto produk gaya iklan: dilarang.
- Tali maksimal dua kali: hero (video yang sudah ada) dan `page-about.webp` sebagai gema di Cara kerja. Tidak ada yang ketiga.
- Setiap foto orang wajib caption nama dan peran. Setiap screenshot wajib caption klien, metrik, periode. Spend boleh diblur.
- Bobot: foto orang 3:4 maksimal 80KB webp (angka PageHero di `docs/superpowers/perf/2026-09-09-hasil.md`: 41 sampai 81KB, terbukti tidak menggeser LCP). Screenshot maksimal 120KB, `loading="lazy"` karena di bawah lipatan.

## 3. Rencana per section

| # | Section | File | Perubahan konkret | Kenapa | Risiko |
|---|---|---|---|---|---|
| 1 | Hero | `components/home/HeroSection.tsx`, `lib/constants.ts` | (a) Eyebrow dihapus. (b) Headline diganti; dua opsi untuk owner: "Omset naik dulu, baru kami bilang berhasil." atau "Iklan yang bikin omset hotel dan toko kamu naik, diukur tiap minggu." Kata "balik modal" hilang. (c) Baris "Gratis & tanpa komitmen" diganti qualifier yang dipindah dari StartHere: "Untuk brand dengan budget iklan mulai Rp 10 juta/bulan. Konsultasi awal gratis." (d) Link "Lihat Bukti: ROAS 20,8x & +77% Omset" dihapus, angkanya sudah ada 200px di bawah. (e) Grid 7/5 dan HeroMedia tetap. (f) Label ProofRow ditambah klien dan periode: `20,8x` / `ROAS CPAS Shopee · Hanoon · [periode]`. Periode wajib dari owner; sebelum ada, label cukup klien. | Qualifier di posisi 7.000px tidak menyaring siapa pun. Janji "balik modal" menjual titik impas. Angka tanpa sumber terbaca ngarang. | Rendah. Struktur DOM sama, LCP tetap poster. |
| 2 | Strip logo (ClientsSection dipindah ke bawah hero) | `components/home/ClientsSection.tsx`, `app/page.tsx` | Eyebrow, H2, paragraf dihapus. Satu baris teks kiri: "Dipercaya 20+ brand hotel, F&B, dan seller marketplace sejak 2023" (angka dari STATS). Logo 20 → 12 yang paling dikenal target (hotel, resort, F&B, Hanoon), 6 kolom desktop 2 baris, 3 kolom mobile 4 baris. Logo dirender navy penuh (filter, opacity 1), bukan abu 55%. Latar `cream-deep`, `band-padding`. | Logo abu-abu 55% terbaca "belum dapat izin". Judul "brand yang tumbuh bersama kami" tidak menambah informasi. | Rendah. |
| 3 | Bukti (CaseStudiesFeatured ditulis ulang) | `components/home/CaseStudiesFeatured.tsx`, `lib/data.ts` | Latar navy, `section-padding-lg`, satu-satunya section navy. Layout desktop 12 kolom: kiri 7 kolom = satu studi kasus utama (Hanoon): angka `stat-num-xl` "20,8x", caption "ROAS CPAS Shopee · [periode]", satu kalimat kutipan owner dengan nama dan jabatan, di bawahnya screenshot Ads Manager di plate `#0E2C44` radius `--radius-md`. Kanan 5 kolom = dua studi kasus lain (Rancabango +77% omset dan occupancy 61% low season; Popondok +300% leads WA) sebagai dua baris teks dengan angka `stat-num`, caption periode, link. Mobile: utama dulu, dua lainnya bersusun. Di `lib/data.ts`: Restorasa `featured:false`, Karya Kultur Kreatif `featured:false`; `result` keduanya diganti metrik yang bisa dihitung atau baris `result` dihapus dari kartu daftar sampai angkanya ada. Eyebrow "Hasil, bukan janji" dan H2 yang mengulang kata yang sama dihapus; H2 baru: "Tiga klien, tiga angka, tiap angka ada periodenya." | Ini section yang memberi alasan chat. Satu angka besar + satu screenshot + satu nama lebih meyakinkan daripada enam kartu. "+100% awareness" dan "+90% community-driven" meracuni tiga angka yang kredibel. | Sedang. Layout bisa dibangun sekarang dengan angka yang ada; slot screenshot dan kutipan dirender hanya jika data ada (conditional), tidak pernah placeholder. |
| 4 | Cara kerja (Trifecta + ServicesObjective + WhyMote DIGABUNG) | Baru `components/home/CaraKerja.tsx`; hapus `TrifectaMarketing.tsx`, `ServicesObjective.tsx`, `WhyMote.tsx` dari homepage | Latar krem, `section-padding`. Layout 2 kolom gaya WhyMote: kiri sticky (eyebrow "Cara kerja", H2 "Satu tim pegang iklan, konten, dan marketplace.", `page-about.webp` 3:2 di bawah H2 sebagai gema motif tali, `loading="lazy"`). Kanan: 4 baris dipisah garis 1px, tiap baris = nomor oranye 01 sampai 04, judul h3, satu kalimat apa yang dikerjakan, chip tag, link ke halaman service. Baris: Iklan berbayar (Meta, CPAS Shopee, Google, TikTok Ads), Marketplace & konten (Shopee, TikTok Shop, website, sosial), Review & KOL (ulasan Google, UGC, KOL), Bangun tim internal (TDMO, chip "Program 6 bulan"). Diagram segitiga dihapus. Tiga alasan WhyMote dihapus. Ikon dihapus. | Tiga section ini menjelaskan hal yang sama dari tiga sudut, memakan ±2.400px. Segitiga di desktop cuma dekorasi, di mobile jadi pita lime. Klaim "data-driven" tanpa data tidak menambah kepercayaan. | Sedang. Diff terbesar, tapi semuanya teks dan grid, tanpa dependensi baru. |
| 5 | Mulai (StartHere + CTASection DIGABUNG) | Baru `components/home/Mulai.tsx`; hapus `StartHere.tsx`, `CTASection.tsx` dari homepage | Latar lime, `section-padding`. Desktop 2 kolom: kiri = H2 "Chat dulu. Kalau cocok, proposal. Kalau tidak, kami bilang." plus tiga langkah sebagai daftar bernomor tanpa kartu (WhatsApp, audit 30 menit, proposal + fee). Kanan = foto orang yang menjawab WhatsApp 3:4 dengan caption nama dan peran, tombol `btn-dark` "Chat via WhatsApp" di bawah foto, tombol email sebagai link teks. Bar navy "Cocok untuk … Rp 10 juta/bulan" dihapus (pindah ke hero). Sebelum foto ada: kolom kanan hanya tombol, bukan foto pengganti. | Dua section CTA berurutan mengulang tombol yang sama. Wajah orang yang akan membalas adalah bukti manusia paling murah dan paling relevan tepat sebelum tombol. | Rendah. |
| 6 | PainPoints | `components/home/PainPoints.tsx`, `app/page.tsx` | DIHAPUS dari homepage. Satu baris terkuat ("ROAS di bawah 3x, budget habis") masuk ke lead hero menggantikan kalimat "Satu tim urus iklan…". | Empat keluhan generik dengan ikon; halaman dipangkas 530px. | Rendah. |
| 7 | StatsSection | `components/home/StatsSection.tsx`, `app/page.tsx` | DIHAPUS. "20+ klien" pindah ke teks strip logo. "50+ project, 3+ tahun, 4 produk digital" tidak dipakai. | Angka tanpa konteks. | Rendah. |
| 8 | FloatingWhatsApp | `components/layout/FloatingWhatsApp.tsx` | Di mobile tombol menutupi foto hero dan angka Restorasa (lihat `mobile-00.png`, `mobile-02.png`). Ubah: sembunyi selama hero terlihat (IntersectionObserver ke `#hero`), tampil setelahnya; di <640px ikon saja 56×56 tanpa label. | Tombol mengambang menutupi konten yang justru mau dibaca. | Rendah. |
| 9 | Header | `components/layout/Header.tsx` | 9 item + dropdown Products untuk halaman yang tujuannya satu tombol WA. Usul ke owner: 5 item (Services, Case Studies, Blog, About, Contact) + tombol. Products dan Community masuk footer. | Pilihan terlalu banyak sebelum keputusan pertama. | Rendah secara kode, tapi keputusan owner karena berlaku di semua halaman. |

Urutan `app/page.tsx` setelah perubahan: `HeroSection` → `ClientsSection` (strip) → `CaseStudiesFeatured` (Bukti) → `CaraKerja` → `Mulai`.

## 4. Urutan eksekusi

Bisa dikerjakan sekarang tanpa aset baru:
1. `lib/data.ts`: `featured:false` untuk Restorasa dan Karya Kultur Kreatif; `result` keduanya dikosongkan sampai ada angka. Dampak paling besar per baris kode.
2. `app/page.tsx`: hapus PainPoints, StatsSection; pindah ClientsSection ke bawah hero.
3. `app/globals.css`: tambah `.stat-num-xl`, `.caption-source`, `.section-padding-lg`, `--color-cream-deep`. Semua di luar blok `body:has([data-skin="clipper"])`.
4. `ClientsSection.tsx` jadi strip (12 logo, navy penuh, satu baris teks).
5. `HeroSection.tsx`: eyebrow dihapus, link "Lihat Bukti" dihapus, qualifier naik, label ProofRow ditambah nama klien. Headline menunggu pilihan owner (butir 5, 2 opsi disiapkan).
6. `CaraKerja.tsx` baru menggantikan tiga section, dengan `page-about.webp` sebagai gema tali.
7. `Mulai.tsx` baru menggantikan StartHere + CTASection, kolom foto dirender kondisional.
8. `CaseStudiesFeatured.tsx` layout Bukti 7/5 dengan angka yang sudah ada; slot screenshot dan kutipan kondisional.
9. `FloatingWhatsApp.tsx` sembunyi saat hero terlihat, ikon saja di mobile.
10. Ukur ulang: LCP mobile Slow 4G lewat harness Playwright yang sama dengan `2026-09-09-hasil.md`, plus tinggi halaman 1440 dan 390. Target LCP tetap ≤1.000 ms, tinggi ≤4.800px desktop.
11. Buka GA4 dan Meta Pixel sebelum minta approve: device split, scroll depth per section, klik WA per tombol. Kalau 80% pengunjung mobile, urutan Bukti dan Cara kerja diuji ulang di 390px sebelum owner lihat.

Menunggu aset atau keputusan owner:
12. Periode tiap angka masuk ke caption hero dan Bukti.
13. Screenshot Ads Manager Hanoon masuk ke plate Bukti.
14. Kutipan owner klien masuk ke Bukti.
15. Foto orang yang menjawab WA masuk ke Mulai.
16. Foto tim di lokasi klien 3:4 menggantikan video tali di hero. Video tali tetap fallback sampai foto lolos gate 80KB dan LCP tidak naik.
17. Headline hero final.
18. Header 9 → 5 item.

## 5. Yang harus datang dari owner

Angka dan periode:
- Hanoon ROAS 20,8x: bulan/tahun awal dan akhir periode; ROAS pembanding sebelum Mote (angka 116,89% naik dari berapa).
- Rancabango +77% omset: periode pembanding (bulan vs bulan tahun lalu?), dan periode low season occupancy 61%.
- Popondok +300% leads WhatsApp: jumlah leads sebelum dan sesudah per bulan, periode.
- Restorasa "+100% awareness": metrik apa (reach? follower? profile visit?) dan periode. Kalau tidak ada, klaim dibuang.
- Karya Kultur Kreatif "+90% community-driven brand": sama. Kalau tidak ada, dibuang.

Screenshot (spend boleh diblur, tanggal wajib terlihat):
- Meta Ads Manager Hanoon, kolom ROAS dan purchase value, rentang tanggal terlihat.
- Rancabango: laporan occupancy atau Google Business Profile insight yang menunjukkan periode low season.

Kutipan (dengan izin tertulis, boleh via WA):
- Satu kalimat dari owner atau GM Hanoon, nama dan jabatan.
- Satu kalimat dari owner atau GM Rancabango, nama dan jabatan.

Foto (JPG asli dari kamera atau HP, cahaya alami, tanpa studio, tanpa pose iklan):
- Satu foto orang yang menjawab WhatsApp Mote, setengah badan, 3:4.
- Dua sampai tiga foto tim Mote sedang kerja di lokasi klien (lobby hotel, dapur restoran, gudang seller), 3:4 dan 3:2.

Keputusan:
- Headline hero: opsi A "Omset naik dulu, baru kami bilang berhasil." atau opsi B "Iklan yang bikin omset hotel dan toko kamu naik, diukur tiap minggu."
- Qualifier Rp 10 juta/bulan tampil di hero: ya/tidak.
- 12 logo mana yang masuk strip.
- Header dipangkas ke 5 item: ya/tidak.

## 6. Yang jangan disentuh

- Palet, font, stack, static export. Tidak ada dependensi baru di rencana ini.
- `components/shared/HeroMedia.tsx` dan strategi muat video (idle callback, desktop saja, `preload="none"`). Ini yang menurunkan LCP dari 3.008 ke 924 ms.
- `components/shared/AnimatedSection.tsx`: dipakai 18 file di luar homepage, di luar scope.
- Blok `body:has([data-skin="clipper"])` di `app/globals.css`. Token baru ditambah di `@theme` dan `@layer` biasa, bukan di dalam blok itu.
- `scroll-padding-top`, prefilled WA di `lib/constants.ts`, penulisan angka statis di markup. Sudah benar.
- Halaman detail `app/case-studies/[slug]/page.tsx` dan `lib/data.ts` selain field `featured` dan `result` dua klien. Narasi challenge/approach dipakai halaman detail.
- `ProofRow` API: dipakai hero, jangan diubah signature-nya; label tambahan lewat prop `label` yang sudah ada.
- Kebijakan tanpa harga. Qualifier budget iklan bukan harga jasa Mote, jadi boleh tampil.
