# Prompt Produksi Aset — Upgrade Visual motekreatif.com

Tanggal: 8 September 2026 (revisi 2 — arah kreatif diganti total)
Pasangan dari: `2026-09-08-motekreatif-visual-upgrade-design.md` (§5 mobile, §8 komponen, §11 anggaran)
Pipeline: gambar first-frame via `google/gemini-3-pro-image` → video via `bytedance/seedance-2.0-mini`, keduanya lewat OpenRouter dengan key di `~/.config/openrouter/browseruse-key`. Kredit tersisa $15,54 (cukup; estimasi pakai ≈ $3,80, §6). Text-to-video polos tidak dipakai.

Arah lama (meja packing toko, dapur restoran, kolam resort, lanskap Garut, meja kafe) ditolak pemilik: menggambarkan bisnis pembaca di homepage terbaca jualan, dan scene interior fotorealistis dari model AI sering cacat geometri benda. Tidak ada satu pun prompt lama yang dipakai ulang.

---

## 0. Arah kreatif: satu dunia, utas dan simpul

Sumber metafora sudah ada di kode:
- `app/about/page.tsx:269` — MOTE dari kata Sunda *motekar*; "Sebuah simpul yang lagi diiket, satu utas setiap hari."
- `app/about/page.tsx:104,117` — "Tiga utas, satu simpul" / "MOTE simpul yang nautin ketiganya."
- `components/about/SimpulKnot.tsx` — logogram simpul dibagi tiga warna: lime `#BDF24A`, orange `#FF7E00`, putih; tiga makna: Mempertemukan, Mengikat kuat, Punya nilai seni ("Simpul yang bener itu rapi & indah, bukan kusut").

Semua aset hidup di satu set: **tali/benang nyata, makro, di atas kertas cream `#F7F4EE`, satu sumber cahaya keras dari samping.** Tanpa manusia, tanpa toko, tanpa dapur, tanpa lanskap, tanpa benda yang mewakili bisnis klien. Yang berbeda antar halaman hanya babak ceritanya:

| Aset | Halaman | Babak | Warna tali |
|---|---|---|---|
| A1 (video) | homepage hero | simpul SUDAH terikat, rapi, diam | navy |
| A2 | `/services` | tiga utas terpisah, sejajar, belum bertemu | lime, orange, navy |
| A3 | `/case-studies` | satu simpul ditarik kencang, serat tegang | navy |
| A4 | `/about` | banyak benang halus dipilin jadi satu tali | navy + sedikit lime/orange |
| A5 | `/contact` | ujung tali terbuka, satu lingkaran belum diikat | navy |

Alasan teknis yang membuat arah ini lebih aman dari arah lama: tali adalah objek deformable tanpa geometri "benar" yang bisa salah (tidak ada sudut meja yang harus 90°, tidak ada perspektif ruangan); kertas polos = area datar besar → file WebP/VP9 kecil; palette terkendali karena hanya ada dua material.

Batasan keras di semua prompt (sudah ditanam, jangan dihapus saat menyalin): tanpa wajah, manusia, tangan; tanpa merek/produk nyata; tanpa teks, huruf, angka, logo, layar, UI; tanpa tanaman/dedaunan; palette jatuh ke cream `#F7F4EE`, navy `#06243B`, kuning `#F4D23A`, lime `#BDF24A`, orange `#FF7E00`. Hijau selain lime UI dilarang total — kandidat dengan hijau rumput/daun/teal ditolak (§3 butir 3). Lime di prompt selalu disebut "yellow-green lime #BDF24A, not grass green" supaya model tidak menggeser ke hijau.

Aturan gerak video hero: simpul TIDAK dianimasikan sedang terbentuk (tali mengikat diri sendiri = topologi rumit, hasil model video hampir pasti salah dan langsung terbaca palsu). Kamera diam total, simpul diam. Yang bergerak hanya ambient: ujung tali yang menggantung bergoyang sangat pelan, serat halus bergerak, intensitas cahaya menyapu perlahan. `first_frame` = `last_frame`.

---

## 1. Jumlah aset

Total 5 aset generatif: 1 video (A1) + 4 gambar (A2–A5). Dari lima itu dihasilkan 10 file produksi: 2 video + 2 poster (desktop 3:4, mobile 3:2) + 4 gambar desktop 4:3 + 4 strip mobile 3:1. Poster dan strip mobile adalah crop dari aset yang sama, bukan generate ulang.

Alasan tetap 5, bukan lebih sedikit:
- Empat halaman ber-PageHero masing-masing adalah satu babak cerita (§0); menggabungkan dua babak ke satu gambar mematahkan urutannya, dan memakai satu gambar untuk semua halaman mengulangi masalah "13 halaman satu template" yang jadi alasan pekerjaan ini.
- Biaya per gambar ±$0,13 — perbedaan 3 vs 4 gambar adalah $0,40, tidak sebanding dengan hilangnya satu babak.

Alasan tetap 1 video, bukan lebih:
- Hanya hero yang punya waktu tayang cukup (pengunjung berhenti ±5–10 detik) untuk membayar decode video. Section lain di-scroll dalam <2 detik.
- Tiap loop tambahan = +1,0–1,2 MB dan satu decoder aktif lagi; di laptop 8 GB dua video autoplay menjatuhkan frame rate scroll di bawah 50 fps.
- Mobile tidak pernah memuat video (spec §5.2), jadi video kedua hanya dilihat pengguna desktop, minoritas trafik.

Halaman yang sengaja tanpa media: blog, products, community, clipper setup, tiga halaman legal.

---

## 2. Spesifikasi per aset

Konvensi file:
- Video: `public/video/hero-loop.webm`, `public/video/hero-loop.mp4`; poster `public/img/hero-poster.webp` (720×960) dan `public/img/hero-poster-m.webp` (720×480).
- Gambar PageHero: `public/img/page-{services,case-studies,about,contact}.webp` (1200×900) + `page-*-m.webp` (780×260).
- File mentah (PNG Gemini, MP4 Seedance) di `assets-src/` (di luar `public/`, tambahkan ke `.gitignore`) dengan nama `A1-frame-v1.png`, `A1-take-a.mp4`, dst.

Parameter Gemini semua gambar: `image_config.aspect_ratio` sesuai tabel, `image_size: "2K"` (A2–A5 butuh ≥1200 px lebar setelah crop 4:3; 1K ≈ 1248×832 untuk 3:2 dan akan di-upscale 1,08× — hindari). Generate 3 kandidat per gambar (A1: 5 kandidat, karena simpul adalah objek paling berisiko salah bentuk), pilih satu dengan checklist §3.

Komposisi wajib untuk semua gambar: subjek di band tengah frame, karena tiap gambar dicrop dua kali (desktop memotong sisi, mobile memotong atas-bawah). Kalimat "safe zone" ada di tiap prompt.

---

### A1 — Hero loop (video)

| Field | Nilai | Alasan |
|---|---|---|
| File | `hero-loop.webm`, `hero-loop.mp4`, `hero-poster.webp`, `hero-poster-m.webp` | — |
| Penempatan | `HeroSection` → `HeroMedia`, kolom 8–12 desktop (3:4); poster 3:2 di bawah CTA di mobile | spec §4.2, §5.1 |
| `aspect_ratio` | `3:4` | Kolom media hero ±440×587 px; 3:4 dicrop ≤2% oleh `object-fit: cover`. Poster mobile 3:2 = band tengah 50% tinggi frame ini, jadi simpul harus berada di sepertiga tengah. |
| `resolution` | `720p` (≈720×960) | Ditampilkan ≤440 px CSS → 880 px di Retina; 480p pecah. |
| `duration` | `8` detik | Cukup panjang untuk ambient yang tidak terasa berulang; 8 s gerak lambat di VP9 CRF 34 masih ≤1,2 MB. |
| `generate_audio` | `false` | Tanpa audio track. |
| `frame_images` | `first_frame` = gambar Gemini A1 terpilih; `last_frame` = gambar yang SAMA | Loop menyambung. |
| Poster | frame `00:00.000` dari `hero-loop.mp4` (identik dengan first-frame → fade-in tanpa lompatan) | — |
| Alt | `Simpul tali navy yang sudah terikat rapi di atas kertas cream, difoto dari dekat dengan cahaya dari samping` | — |
| Biaya | 5 gambar Gemini ≈ $0,65; test 480p 4 s ≈ $0,06; 2 take 720p × 8 s × ±$0,03/s ≈ $0,48 → ±$1,20 | Harga 720p diperkirakan 2,25× dari $0,01345/s (rasio piksel); cek `usage` di respons pertama. |

Subjek: satu simpul figure-eight dari tali katun navy ±8 mm, sudah terikat rapat dan rapi, di tengah selembar kertas cream bertekstur halus. Satu ekor tali keluar ke kiri-atas frame, ekor lainnya menggantung lurus ke bawah melewati tepi bawah frame — ekor inilah satu-satunya yang bergerak di video. Cahaya keras dari kiri, bayangan panjang ke kanan.

Prompt first-frame (Gemini):

```
Macro still-life photograph, vertical 3:4 composition. A single figure-eight knot tied neatly and pulled snug in a thick deep-navy cotton rope, about 8 mm in diameter, lying on a sheet of plain cream paper with a fine, barely visible fiber texture. The knot sits exactly in the middle third of the frame, centered horizontally, with empty cream paper above and below it (safe zone for cropping). One tail of the rope leaves the knot toward the upper-left corner and exits the frame; the other tail hangs straight down from the knot and exits the bottom edge. The rope's twisted strands and individual cotton fibers are sharp and visible. Lighting: one hard, low, directional light from the left, like late-afternoon sun through a window, casting a long, crisp navy-grey shadow of the rope to the right; soft cream bounce fill from the right so the shadow is not black. Colour palette strictly: cream paper #F7F4EE, deep navy rope #06243B, shadow a muted blue-grey; no other colours. No green anywhere. Camera: 100 mm macro, about 30 degrees off vertical looking down, shallow depth of field with the knot sharp and the far tail softening slightly. No people, no hands, no faces, no objects other than the rope and the paper. No text, letters, numbers, logos, labels, screens or patterns on the paper. Calm, quiet, premium, tactile, photographic realism, not illustrated.
```

Prompt video (Seedance, `first_frame` dan `last_frame` = gambar di atas):

```
Locked-off static camera, no camera movement, no zoom, no pan, no handheld shake, no focus change. The knot stays exactly as in the reference image from the first frame to the last frame: it does not tighten, loosen, rotate, form, or untie. Ambient motion only, very slow and subtle: the tail of rope hanging down from the knot sways almost imperceptibly, as if touched by a faint draft, moving no more than a few millimetres; a few loose cotton fibres on the rope's surface stir gently; the intensity of the hard sidelight from the left breathes very slightly over the eight seconds, as if a thin cloud drifts past a window, and the shadow softens and sharpens with it while keeping its exact shape and position. The paper, the knot and the upper-left tail remain completely still. Speed: real time, unhurried, nothing fast. The last frame must match the first frame so the clip loops seamlessly. No people, no hands. No text, letters, numbers, logos or labels appearing anywhere. Colours stay in the reference palette: cream paper, deep navy rope, blue-grey shadow; no green tones. Photographic, tactile, macro realism.
```

Take B (hanya kalau Take A bergerak terlalu sedikit atau ekor talinya berayun terlalu jauh): ganti kalimat ekor tali dengan "the hanging tail of rope stays still; instead, the only visible motion is the slow breathing of the light and a few fibres stirring". Semua yang lain sama.

Hindari untuk A1: simpul yang "sedang diikat" atau longgar; dua simpul; tali yang kusut; tangan atau pinset; tali dengan garis warna/pola (motif = huruf palsu); kertas bergaris atau berkop; kamera bergerak (merusak loop first=last); kilatan cahaya cepat (flicker menaikkan ukuran VP9).

Detik pengambilan poster: `00:00.000`. Kalau crossfade loop dipakai (§5 langkah 2), poster tetap dari frame 0 file final.

---

### A2 — PageHero `/services` (tiga utas terpisah)

| Field | Nilai | Alasan |
|---|---|---|
| File | `page-services.webp` (1200×900), `page-services-m.webp` (780×260) | Desktop 5 kolom ±440 px → 2× = 880; 1200 memberi margin crop. Mobile 350 px CSS → 2× = 700; 780 memberi margin. |
| Penempatan | `PageHero media` di `app/services/page.tsx` | — |
| `aspect_ratio` sumber | `3:2` | Dari 3:2 (≈2496×1664 di 2K): crop 4:3 memotong 11% sisi, crop 3:1 memotong 33% atas-bawah. Kedua crop moderat. |
| Alt | `Tiga utas tali berwarna lime, oranye, dan navy berjajar sejajar di atas kertas cream, belum saling bertemu` | — |
| Biaya | 3 kandidat ≈ $0,39 | — |

Prompt (Gemini):

```
Macro still-life photograph, horizontal 3:2 composition. Three separate lengths of cotton cord, each about 5 mm in diameter, lying perfectly parallel and horizontal on a sheet of plain cream paper with a fine fiber texture, evenly spaced, never touching or crossing, each running from the left edge of the frame to the right edge. Top cord: bright yellow-green lime #BDF24A, not grass green. Middle cord: warm burnt orange #FF7E00. Bottom cord: deep navy #06243B. All three cords occupy only the central horizontal band of the frame, roughly the middle 40 percent of its height; the areas above and below are empty cream paper (safe zone for cropping). The twisted strands and fibres of each cord are sharp and visible. Lighting: one hard, low, directional light from the left, casting a thin crisp shadow under each cord toward the lower right; soft cream bounce fill so shadows stay blue-grey, not black. Colour palette strictly: cream paper #F7F4EE, lime, orange, navy, blue-grey shadows; no other colours, no green other than the lime cord. Camera: 100 mm macro, about 25 degrees off vertical looking down, mild depth of field with all three cords sharp. No people, no hands, no objects other than the cords and the paper. No text, letters, numbers, logos, labels, patterns on the paper. Calm, orderly, premium, tactile, photographic realism.
```

Hindari: tali saling menyilang atau bersentuhan (itu babak A4); lime yang bergeser ke hijau daun; lebih atau kurang dari tiga tali; tali dengan ujung terurai berlebihan.

---

### A3 — PageHero `/case-studies` (simpul ditarik kencang)

| Field | Nilai | Alasan |
|---|---|---|
| File | `page-case-studies.webp` (1200×900), `page-case-studies-m.webp` (780×260) | — |
| Penempatan | `PageHero media` di `app/case-studies/page.tsx` | — |
| `aspect_ratio` sumber | `3:2` | sama dengan A2 |
| Alt | `Satu simpul tali navy ditarik kencang di atas kertas cream, serat talinya terlihat tegang` | — |
| Biaya | 3 kandidat ≈ $0,39 | — |

Prompt (Gemini):

```
Macro still-life photograph, horizontal 3:2 composition. A single thick deep-navy cotton rope, about 8 mm in diameter, stretched horizontally under strong tension across the frame from the left edge to the right edge, with one small tight overhand knot in the exact centre. The rope is pulled so taut that its twisted strands are compressed and straight, and individual cotton fibres stand out from the surface around the knot, showing the strain. The rope and knot sit in the central horizontal band of the frame, roughly the middle 40 percent of its height; above and below is empty cream paper with a fine fiber texture (safe zone for cropping). The rope is lifted a few millimetres above the paper by the tension, so its shadow is slightly separated from it. Lighting: one hard, low, directional light from the left, casting a crisp, slightly offset navy-grey shadow of the rope onto the paper toward the lower right; soft cream bounce fill from the right. Colour palette strictly: cream paper #F7F4EE, deep navy rope #06243B, blue-grey shadow; no other colours, no green. Camera: 100 mm macro, about 20 degrees off vertical, shallow depth of field with the knot sharpest and the rope ends softening toward the edges. No people, no hands, no hooks, no tools, no objects other than the rope and the paper. No text, letters, numbers, logos, labels, patterns. Tense, precise, premium, tactile, photographic realism.
```

Hindari: tali kendor melengkung (kehilangan makna "tegang"); kait, pengait logam, jari yang menarik; dua simpul; serat putus (terbaca gagal, bukan kuat).

---

### A4 — PageHero `/about` (banyak benang dipilin jadi satu)

| Field | Nilai | Alasan |
|---|---|---|
| File | `page-about.webp` (1200×900), `page-about-m.webp` (780×260) | — |
| Penempatan | `PageHero media` di `app/about/page.tsx` | — |
| `aspect_ratio` sumber | `3:2` | — |
| Alt | `Puluhan benang halus dipilin menjadi satu tali tunggal di atas kertas cream` | — |
| Biaya | 3 kandidat ≈ $0,39 | — |

Prompt (Gemini):

```
Macro still-life photograph, horizontal 3:2 composition. On the left half of the frame, dozens of very fine loose threads enter from the left edge, spread out and slightly wavy, lying on plain cream paper with a fine fiber texture: most threads are deep navy #06243B, with a few threads of bright yellow-green lime #BDF24A (not grass green) and a few of warm burnt orange #FF7E00 among them. Moving toward the centre, the threads gather, and from the centre to the right edge they are twisted together into one single, smooth, tightly wound rope about 8 mm in diameter, predominantly navy with thin lime and orange strands visible in its twist. The threads and rope stay within the central horizontal band of the frame, roughly the middle 40 percent of its height; above and below is empty cream paper (safe zone for cropping). Lighting: one hard, low, directional light from the left, so each loose thread throws a thin crisp shadow and the twisted rope shows strong relief; soft cream bounce fill from the right. Colour palette strictly: cream paper #F7F4EE, navy, lime, orange, blue-grey shadows; no other colours, no green other than the lime threads. Camera: 100 mm macro, about 25 degrees off vertical, depth of field holding the whole rope sharp and letting the loosest threads at the far left soften slightly. No people, no hands, no spindle, no tools, no objects other than thread, rope and paper. No text, letters, numbers, logos, labels, patterns. Calm, patient, premium, tactile, photographic realism.
```

Hindari: benang kusut menggumpal; alat pemintal atau jari; benang warna di luar palette (merah, biru muda, ungu); tali hasil pilinan yang tidak menyambung dengan benang-benangnya.

---

### A5 — PageHero `/contact` (ujung terbuka, satu lingkaran belum diikat)

| Field | Nilai | Alasan |
|---|---|---|
| File | `page-contact.webp` (1200×900), `page-contact-m.webp` (780×260) | — |
| Penempatan | `PageHero media` di `app/contact/page.tsx` | — |
| `aspect_ratio` sumber | `3:2` | — |
| Alt | `Ujung tali navy membentuk satu lingkaran terbuka yang mengarah keluar bingkai, belum diikat, di atas kertas cream` | — |
| Biaya | 3 kandidat ≈ $0,39 | — |

Prompt (Gemini):

```
Macro still-life photograph, horizontal 3:2 composition. A single thick deep-navy cotton rope, about 8 mm in diameter, lying relaxed on plain cream paper with a fine fiber texture. The rope enters from the left edge, forms one open, round, untied loop slightly left of centre, and then its free end runs toward the right and exits the frame at the right edge; the end is not tucked through the loop, so the knot is not yet made. The loop is soft and slightly open, not pulled tight. The rope stays within the central horizontal band of the frame, roughly the middle 40 percent of its height; above and below is empty cream paper (safe zone for cropping). Lighting: one hard, low, directional light from the left, casting a crisp navy-grey shadow of the rope toward the lower right; soft cream bounce fill from the right. Colour palette strictly: cream paper #F7F4EE, deep navy rope #06243B, blue-grey shadow; no other colours, no green. Camera: 100 mm macro, about 25 degrees off vertical, shallow depth of field with the loop sharpest and the exiting end softening slightly. No people, no hands, no objects other than the rope and the paper. No text, letters, numbers, logos, labels, patterns. Open, inviting, quiet, premium, tactile, photographic realism.
```

Hindari: simpul yang sudah jadi (itu A1); dua lingkaran atau spiral; ujung tali yang terurai berat; ujung yang masuk ke dalam lingkaran (menjadi simpul setengah jadi).

---

## 3. Checklist seleksi kandidat (semua aset)

Tolak kandidat kalau salah satu terjadi:
1. Ada bentuk yang terbaca sebagai huruf, angka, logo, atau UI, termasuk pola pada kertas.
2. Ada bagian tubuh manusia, alat (pinset, kait, pemintal), atau benda selain tali dan kertas.
3. Ada warna hijau selain hue lime `#BDF24A` — cek dengan sampel warna di 5 titik pada tali lime: hue harus 70–90° (HSL), bukan 95–150°.
4. Highlight terbakar (putih polos tanpa tekstur kertas) >3% frame.
5. Subjek keluar dari band tengah (A1: sepertiga tengah vertikal; A2–A5: 40% tengah horizontal) — crop mobile akan memotongnya.
6. Topologi tali salah: simpul yang tidak mungkin secara fisik, tali yang menembus dirinya sendiri, jumlah tali tidak sesuai babak (A2 harus tepat tiga; A5 tepat satu lingkaran).
7. Tekstur tali terlihat seperti plastik atau ilustrasi 3D (tanpa serat).
8. Untuk A1: frame 0 dan frame terakhir video berbeda terlihat; kamera bergerak; simpul berubah bentuk.

Kalau semua kandidat gagal, ubah satu kalimat prompt (biasanya kalimat cahaya atau sudut kamera), jangan menambah larangan baru: model gambar merespons instruksi positif lebih konsisten daripada daftar larangan panjang.

---

## 4. Contoh request

### 4.1 Gambar first-frame — `google/gemini-3-pro-image`

```bash
KEY=$(cat ~/.config/openrouter/browseruse-key)
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON' > A1-frame-v1.json
{
  "model": "google/gemini-3-pro-image",
  "messages": [
    { "role": "user", "content": "<PROMPT A1 first-frame, salin utuh dari §2>" }
  ],
  "modalities": ["image", "text"],
  "image_config": { "aspect_ratio": "3:4", "image_size": "2K" }
}
JSON
```

Gambar ada di `choices[0].message.images[0].image_url.url` sebagai data URI `data:image/png;base64,...`:

```bash
jq -r '.choices[0].message.images[0].image_url.url' A1-frame-v1.json \
  | sed 's/^data:image\/[a-z]*;base64,//' | base64 -d > assets-src/A1-frame-v1.png
```

Untuk A2–A5 ganti `aspect_ratio` ke `"3:2"`. Kalau `image_config` ditolak (400), hapus field itu dan andalkan kalimat "vertical 3:4 composition"/"horizontal 3:2 composition" di prompt, lalu crop di ffmpeg. Cek dimensi hasil: `sips -g pixelWidth -g pixelHeight assets-src/A1-frame-v1.png`.

### 4.2 Video — `bytedance/seedance-2.0-mini`

Jalankan dulu satu test 480p 4 detik (±$0,06) untuk memastikan bentuk `frame_images` diterima, baru take 720p 8 detik. Test ini juga sekaligus mengecek apakah simpul tetap diam.

```bash
FRAME=$(base64 -i assets-src/A1-frame-v3.png | tr -d '\n')
curl -s -X POST https://openrouter.ai/api/v1/videos \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg p "<PROMPT A1 video, salin utuh dari §2>" --arg f "data:image/png;base64,$FRAME" '{
    model: "bytedance/seedance-2.0-mini",
    prompt: $p,
    duration: 8,
    resolution: "720p",
    aspect_ratio: "3:4",
    generate_audio: false,
    frame_images: { first_frame: $f, last_frame: $f }
  }')" > A1-take-a.202.json
```

Body yang dikirim (tanpa base64 panjang):

```json
{
  "model": "bytedance/seedance-2.0-mini",
  "prompt": "Locked-off static camera, no camera movement ...",
  "duration": 8,
  "resolution": "720p",
  "aspect_ratio": "3:4",
  "generate_audio": false,
  "frame_images": {
    "first_frame": "data:image/png;base64,....",
    "last_frame": "data:image/png;base64,...."
  }
}
```

Respons 202 berisi `id` dan `polling_url`. Poll:

```bash
ID=$(jq -r .id A1-take-a.202.json)
until [ "$(curl -s -H "Authorization: Bearer $KEY" https://openrouter.ai/api/v1/videos/$ID | tee A1-take-a.status.json | jq -r .status)" = "completed" ]; do sleep 10; done
curl -sL "$(jq -r '.unsigned_urls[0]' A1-take-a.status.json)" -o assets-src/A1-take-a.mp4
```

Catatan bentuk `frame_images`: nama endpoint dan field `frame_images` sudah dicek, tetapi dokumentasi OpenRouter TIDAK memverifikasi apakah isinya objek `{first_frame,last_frame}` atau array, dan apakah menerima data URI atau hanya URL https. Test 480p 4 detik di atas ada untuk membuktikan ini; kalau ditolak 400, coba (1) URL https publik ke PNG (unggah sementara ke R2), lalu (2) bentuk array `[{"type":"first_frame","url":...}]`. Jangan lanjut ke 720p sebelum test lolos.

---

## 5. Pipeline pasca-generate (ffmpeg 8.1 di `/usr/local/bin/ffmpeg`)

Cek loop dulu: `ffplay -loop 0 assets-src/A1-take-a.mp4`; kalau ada lompatan di sambungan, pakai crossfade 0,5 s (langkah 2), kalau tidak, lewati.

1. Normalisasi ukuran, buang audio:
```bash
ffmpeg -y -i assets-src/A1-take-a.mp4 -an -vf "scale=720:960:flags=lanczos,fps=24" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p assets-src/A1-clean.mp4
```
2. (Opsional) crossfade ekor ke kepala, hasil 7,5 s:
```bash
ffmpeg -y -i assets-src/A1-clean.mp4 -filter_complex \
 "[0:v]split[a][b];[a]trim=end=7.5,setpts=PTS-STARTPTS[head];[b]trim=start=7.5,setpts=PTS-STARTPTS[tail];[tail][head]xfade=transition=fade:duration=0.5:offset=0[v]" \
 -map "[v]" -an -c:v libx264 -crf 18 -pix_fmt yuv420p assets-src/A1-loop.mp4
```
Kalau langkah 2 dilewati: `cp assets-src/A1-clean.mp4 assets-src/A1-loop.mp4`.
3. VP9 WebM dua pass, target ≤1,2 MB (kertas polos + gerak minim biasanya 400–700 KB di CRF 34):
```bash
ffmpeg -y -i assets-src/A1-loop.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p -pass 1 -f null /dev/null && \
ffmpeg -y -i assets-src/A1-loop.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p -pass 2 public/video/hero-loop.webm
```
Kalau >1.258.291 byte: `-crf 36`, lalu `38`. Kalau masih lewat, `scale=600:800`.
4. H.264 MP4 fallback:
```bash
ffmpeg -y -i assets-src/A1-loop.mp4 -an -c:v libx264 -crf 27 -preset slow -profile:v main -level 4.0 -pix_fmt yuv420p -movflags +faststart public/video/hero-loop.mp4
```
5. Poster desktop dari frame 0 video final (bukan dari PNG Gemini, supaya warna identik):
```bash
ffmpeg -y -i public/video/hero-loop.mp4 -ss 0 -frames:v 1 -vf "scale=720:960" -c:v libwebp -quality 78 -compression_level 6 public/img/hero-poster.webp
```
Kalau >122.880 byte: `-quality 70`, lalu `scale=600:800`.
6. Poster mobile 3:2 = band tengah 50% tinggi frame yang sama:
```bash
ffmpeg -y -i public/video/hero-loop.mp4 -ss 0 -frames:v 1 -vf "crop=720:480:0:240" -c:v libwebp -quality 78 -compression_level 6 public/img/hero-poster-m.webp
```
Kalau >61.440 byte: `-quality 70`. Cek simpul tidak terpotong (buka file; simpul harus utuh di tengah).
7. Gambar PageHero desktop 4:3 (crop sisi dari sumber 3:2, tengah):
```bash
ffmpeg -y -i assets-src/A2-v2.png -vf "crop=ih*4/3:ih,scale=1200:900:flags=lanczos" -c:v libwebp -quality 80 -compression_level 6 public/img/page-services.webp
```
8. Strip mobile 3:1 (crop atas-bawah dari sumber 3:2, tengah):
```bash
ffmpeg -y -i assets-src/A2-v2.png -vf "crop=iw:iw/3,scale=780:260:flags=lanczos" -c:v libwebp -quality 80 -compression_level 6 public/img/page-services-m.webp
```
Ulangi 7–8 untuk A3–A5. Cek ukuran: `stat -f%z public/img/page-*.webp` — desktop ≤92.160, mobile ≤40.960. Lewat batas: `-quality 72` dulu, baru turunkan dimensi.
9. Verifikasi tanpa audio: `ffprobe -v error -select_streams a -show_entries stream=codec_type public/video/hero-loop.webm` harus kosong; ulangi untuk `.mp4`.

---

## 6. Estimasi biaya total

| Item | Hitungan | Perkiraan |
|---|---|---|
| Gemini A1 first-frame | 5 kandidat × ±$0,13 | $0,65 |
| Gemini A2–A5 | 4 aset × 3 kandidat = 12 × ±$0,13 | $1,56 |
| Iterasi prompt gambar (cadangan) | 6 gambar | $0,78 |
| Seedance test 480p | 1 × 4 s × $0,01345 | $0,06 |
| Seedance 720p Take A + Take B | 2 × 8 s × ±$0,03 | $0,48 |
| Seedance cadangan 1 take | 1 × 8 s × ±$0,03 | $0,24 |
| **Total** | | **≈ $3,77**, siapkan $5 dari kredit $15,54 |

Harga per gambar Gemini 3 Pro Image dari tarif output ±1.120 token gambar (1K dan 2K sama) pada $120/1M token; harga 720p Seedance adalah perkiraan 2,25× tarif 480p. Keduanya dicek dari field `usage`/`cost` pada respons request pertama sebelum batch.
