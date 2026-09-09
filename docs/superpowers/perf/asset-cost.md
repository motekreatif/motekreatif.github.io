# Catatan generate aset — OpenRouter

Tanggal: 8–9 September 2026
Pasangan dari: `../specs/2026-09-08-asset-prompts.md`, plan Jalur B.
Kunci API: `~/.config/openrouter/browseruse-key`.

## Bentuk `frame_images` yang diterima Seedance 2.0 Mini

Endpoint `POST https://openrouter.ai/api/v1/videos` menolak bentuk objek
`{"first_frame": …, "last_frame": …}` yang ditulis di spec:

```
ZodError: expected array, received object   (path: frame_images)
```

Bentuk yang benar adalah array, tiap elemen sebuah objek dengan tiga kunci
wajib. Ditemukan dengan mengirim elemen kosong dan membaca daftar nilai yang
diminta Zod:

```json
"frame_images": [
  {"type": "image_url", "image_url": {"url": "data:image/png;base64,…"}, "frame_type": "first_frame"},
  {"type": "image_url", "image_url": {"url": "data:image/png;base64,…"}, "frame_type": "last_frame"}
]
```

`type` hanya menerima `"image_url"`. `frame_type` hanya menerima `"first_frame"`
atau `"last_frame"`. Data URI base64 diterima; tidak perlu URL https.

Skrip yang dipakai: `assets-src/genvid.py` (di luar git, `/assets-src/` ada di
`.gitignore`).

## Perilaku model

`first_frame` dipatuhi. `last_frame` diabaikan — pada take 480p pertama, SSIM
frame terakhir terhadap gambar referensi 0,860 sementara frame pertama 0,952.

Kamera tetap diam sesuai prompt. Dugaan awal adanya push-in terbantahkan:
pencocokan frame pertama terhadap frame terakhir pada rentang skala 1,00–1,15
dan geser ±20 px menghasilkan skala 1,0 dan geseran 0 px sebagai pasangan
terbaik. Yang berubah adalah subjeknya — ekor tali mengayun dan loop simpul
sedikit membuka.

Amplitudo ayunan di 480p lebih besar daripada di 720p. Take 720p yang dipakai
gerakannya paling tenang dari tiga take.

Karena `last_frame` tidak mengunci, sambungan loop dibuat di pasca-produksi
dengan palindrome (`split` → `reverse` → `concat`). Hasilnya mulus secara
matematis di kedua ujung, jadi crossfade langkah 2 spec dilewati.

## Biaya

| Take | Resolusi | Durasi | Biaya | Hasil |
|---|---|---|---|---|
| test 1 | 480p | 4 s | $0,0558 | validasi bentuk `frame_images`; ayunan terlalu besar |
| test 2 | 480p | 4 s | $0,0558 | prompt kunci kamera diperketat; ayunan masih besar |
| take A | 720p | 4 s | $0,1230 | dipakai |

Video: $0,2346. Gambar A1 (5 kandidat Gemini 3 Pro Image): ±$0,70.

Tarif terukur: 480p $0,01395/detik, 720p $0,03075/detik.

## Berkas produksi A1

| Berkas | Ukuran | Batas spec |
|---|---|---|
| `public/video/hero-loop.webm` | 429.379 B | 1.258.291 B |
| `public/video/hero-loop.mp4` | 411.654 B | — |
| `public/img/hero-poster.webp` | 16.694 B | 122.880 B |
| `public/img/hero-poster-m.webp` | 11.326 B | 61.440 B |

Durasi akhir 8,08 detik, 720×960, 24 fps, tanpa trek audio (diverifikasi
`ffprobe -select_streams a`).

## Catatan alat

`ffmpeg` 8.1 di mesin ini dibangun tanpa `libwebp`. Langkah 5–8 spec yang
memakai `-c:v libwebp` gagal dengan `Unknown encoder 'libwebp'`. Ganti dengan
ekstrak PNG lewat ffmpeg lalu `cwebp -q <q> -m 6` dari `/usr/local/bin/cwebp`.
