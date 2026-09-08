# Upgrade Visual motekreatif.com — Rencana Implementasi

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengganti hero homepage, 9 section homepage, dan `PageHero` (12 halaman) dari tampilan template (gradient, blob, ribbon, fade-up) ke sistem garis 1px + band solid + media utas/simpul, dengan mobile sebagai desain sendiri dan anggaran performa yang diukur sebelum–sesudah.

**Architecture:** Dua jalur paralel. Jalur A (kode) membangun token CSS → komponen baru (`Eyebrow`, `ProofRow`, `useVideoAllowed`, `HeroMedia`) → hero sampai benar → section lain → `PageHero`, memakai placeholder SVG untuk media. Jalur B (aset) menghasilkan 1 video + 4 gambar lewat OpenRouter dan mengencode 10 file produksi. Kedua jalur bertemu di Task 16 (tukar placeholder dengan aset asli), lalu pengukuran performa akhir. Tiga gerbang review pemilik memakai screenshot lokal.

**Tech Stack:** Next.js 15.1 App Router (static export), React 19, Tailwind v4, framer-motion 11 (dipertahankan hanya di `StatsSection` dan file luar scope), lucide-react, pnpm, ffmpeg 8.1, lighthouse CLI (`/usr/local/bin/lighthouse`), Python `playwright` (terpasang) untuk screenshot dan cek viewport.

**Spec:** `docs/superpowers/specs/2026-09-08-motekreatif-visual-upgrade-design.md` (desain) + `docs/superpowers/specs/2026-09-08-asset-prompts.md` (aset). Nomor § di bawah merujuk ke spec desain kecuali disebut "aset §".

## Global Constraints

- Headline hero persis: `Bikin iklan & toko online kamu balik modal — bukan cuma rame dilihat.` (`<span class="highlight-text">balik modal</span>` tetap).
- Teks hanya boleh berubah sesuai §11.4: tiga proof point hero (`20,8x` / `ROAS Ads CPAS`, `+77%` / `Revenue dari Digital Aktivasi`, `+300%` / `leads WhatsApp`), format angka (§3.1), dan teks yang hilang bersama `FlowDiagram` + link "↳ Hasil nyata…" (dikonfirmasi di Gerbang 1).
- Tidak menyentuh: `lib/jsonld.ts`, `lib/metadata.ts`, `app/sitemap.ts`, struktur h1/h2/h3, blog, halaman detail case study, `components/layout/Header.tsx`.
- Harga tidak pernah tampil.
- Hex yang boleh: `#F7F4EE #06243B #BDF24A #F4D23A #F7DF75 #FF7E00 #3D4F60 #EFEBDD #144668 #FFFFFF` + tiga token garis (§2.4).
- Radius hanya `0 / 4px / 12px` (+ `.btn` pill). Tanpa `box-shadow`, `blur-*`, `linear-gradient`, `backdrop-blur`, `drop-shadow` di scope (§2).
- h1 `clamp(2.25rem, 1.25rem + 3.9vw, 4rem)`; ≤5 baris di 360px (§5.3).
- Target sentuh ≥44×44px; tanpa horizontal scroll di 320/360/390/430 (§5.4–5.5).
- Anggaran: LCP mobile <2.500 ms, CLS <0,10, TBT ≤150 ms; video ≤1.258.291 byte per file, poster ≤122.880 / ≤61.440 byte, PageHero ≤92.160 / ≤40.960 byte (§11).
- Tidak ada `git push`, tidak ada deploy. Commit lokal boleh. Tidak ada `git commit` tanpa `pnpm build` lulus.
- Tiap Agent yang dispawn untuk task ini wajib `model: sonnet` (Jalur B boleh `haiku` untuk langkah ffmpeg mekanis).

---

## Peta file

| File | Status | Tanggung jawab |
|---|---|---|
| `app/globals.css` | ubah | token garis, skala h1/h2/h3, `.lead .stat-num .stat-num-sm .label`, hapus shadow/gradient hover, eyebrow tracking, highlight radius |
| `components/shared/Eyebrow.tsx` | baru | bar 20×2 + label uppercase |
| `components/shared/ProofRow.tsx` | baru | baris angka berhairline, stack/grid2 di mobile |
| `lib/useVideoAllowed.ts` | baru | gate video: ≥1024, no reduced-motion, no saveData |
| `components/shared/HeroMedia.tsx` | baru (client) | `<picture>` poster + video lazy |
| `components/home/HeroSection.tsx` | tulis ulang (server) | hero desktop + mobile |
| `lib/data.ts` | ubah 5 baris | format angka |
| `components/shared/SectionHeading.tsx` | ubah | pakai `Eyebrow`, h2 skala baru |
| `components/home/{PainPoints,CaseStudiesFeatured,TrifectaMarketing,ServicesObjective,WhyMote,ClientsSection,StatsSection,StartHere,CTASection}.tsx` | ubah | §7 |
| `components/shared/PageHero.tsx` | tulis ulang (server) | varian default/compact, media desktop 4:3 + mobile 3:1 |
| `app/{services,case-studies,about,contact,privacy-policy,terms,refund-policy}/page.tsx` | ubah 1 pemanggilan | prop `media` / `variant` |
| `components/shared/RibbonDecoration.tsx` | ubah 1 baris | komentar deprecated |
| `public/img/_placeholder/*.svg` | baru → dihapus di Task 16 | placeholder media |
| `public/video/hero-loop.{webm,mp4}`, `public/img/hero-poster{,-m}.webp`, `public/img/page-*{,-m}.webp` | baru (Jalur B) | aset produksi |
| `assets-src/` + `.gitignore` | baru | file mentah, tidak di-commit |
| `docs/superpowers/perf/2026-09-08-{baseline,after}.md` | baru | angka Lighthouse + ukuran bundle |
| `docs/superpowers/perf/qa_viewports.py` | baru | screenshot + cek scrollWidth/h1/tap target |

## Urutan dan paralelisme

```
Jalur A (kode):  T0 → T1 → T2 → T3 → T4 → T5 → T6 → T7 → [Gerbang 1] → T8 → T9 → T10 → T11 → [Gerbang 2] → T12 → T13 → [Gerbang 3] ─┐
Jalur B (aset):  B1 → B2 → B3 → B4 → B5 → B6 → [Gerbang aset] ───────────────────────────────────────────────────────────────┴→ T16 → T17
```
Jalur B dimulai bersamaan dengan T1; tidak ada task Jalur A yang menunggu Jalur B sampai T16.

---

## JALUR A — Kode

### Task 0: Baseline performa dan alat QA

**Files:**
- Create: `docs/superpowers/perf/2026-09-08-baseline.md`
- Create: `docs/superpowers/perf/qa_viewports.py`

**Interfaces:**
- Produces: `qa_viewports.py <url> <outdir>` — menulis screenshot `<outdir>/<w>x<h>.png` untuk 320×800, 360×800, 390×844, 430×932, 1280×800, 1440×900 dan mencetak per viewport: `overflow=<bool>`, `h1_lines=<n>`, `h1_px=<px>`, `small_targets=[…]` (elemen `a,button` dengan rect <44×44 di dalam `section:first-of-type`).

- [ ] **Step 1: Pastikan build live lulus dan serve lokal**

```bash
cd /Users/nanansomanan/Documents/GitHub/motekreatif.github.io
pnpm build 2>&1 | tail -5
(cd out && python3 -m http.server 3000 >/dev/null 2>&1 &)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```
Expected: `200`.

- [ ] **Step 2: Tulis `qa_viewports.py`**

```python
# docs/superpowers/perf/qa_viewports.py
import json, sys, pathlib
from playwright.sync_api import sync_playwright

VIEWPORTS = [(320, 800), (360, 800), (390, 844), (430, 932), (1280, 800), (1440, 900)]
JS = """
() => {
  document.body.style.overflowX = 'visible';
  const cw = document.documentElement.clientWidth;
  const overflow = [...document.querySelectorAll('section')].some(s => s.scrollWidth > cw)
                   || document.documentElement.scrollWidth > cw;
  const h1 = document.querySelector('h1');
  const h1px = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
  const h1lines = h1 ? Math.round(h1.getBoundingClientRect().height / (h1px * parseFloat(getComputedStyle(h1).lineHeight) / h1px || 1)) : 0;
  const first = document.querySelector('main section');
  const small = first ? [...first.querySelectorAll('a,button')].map(e => {
    const r = e.getBoundingClientRect();
    return (r.width < 44 || r.height < 44) ? `${e.tagName}:${(e.textContent||'').trim().slice(0,30)}:${Math.round(r.width)}x${Math.round(r.height)}` : null;
  }).filter(Boolean) : [];
  const cta = [...document.querySelectorAll('main section a')].find(a => /WhatsApp/.test(a.textContent||''));
  return { overflow, h1px, h1lines, small, ctaBottom: cta ? Math.round(cta.getBoundingClientRect().bottom) : null };
}
"""

def main(url, outdir):
    out = pathlib.Path(outdir); out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, h in VIEWPORTS:
            pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
            pg.goto(url, wait_until="networkidle")
            pg.wait_for_timeout(300)
            pg.screenshot(path=str(out / f"{w}x{h}.png"), full_page=(w >= 1024))
            r = pg.evaluate(JS)
            print(f"{w}x{h}: overflow={r['overflow']} h1_px={r['h1px']} h1_lines={r['h1lines']} cta_bottom={r['ctaBottom']} small_targets={json.dumps(r['small'])}")
            pg.close()
        b.close()

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
```

- [ ] **Step 3: Jalankan alat QA pada kondisi live (baseline visual)**

```bash
python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/ /tmp/shots-baseline
```
Expected: 6 baris output + 6 PNG. Catat `h1_lines` dan `small_targets` — ini bukti kondisi awal.

- [ ] **Step 4: Lighthouse baseline (mobile ×3, desktop ×3, `/services` ×1, `/privacy-policy` ×1)**

```bash
for i in 1 2 3; do lighthouse http://localhost:3000/ --preset=perf --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --quiet --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-base-m-$i.json; done
for i in 1 2 3; do lighthouse http://localhost:3000/ --preset=perf --form-factor=desktop --screenEmulation.disabled --throttling-method=simulate --quiet --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-base-d-$i.json; done
lighthouse http://localhost:3000/services/ --preset=perf --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --quiet --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-base-services.json
lighthouse http://localhost:3000/privacy-policy/ --preset=perf --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --quiet --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh-base-legal.json
for f in /tmp/lh-base-*.json; do echo "$f"; jq -r '[.audits["largest-contentful-paint"].numericValue, .audits["cumulative-layout-shift"].numericValue, .audits["total-blocking-time"].numericValue, .audits["total-byte-weight"].numericValue, .audits["largest-contentful-paint-element"].details.items[0].items[0].node.selector] | @tsv' "$f"; done
wc -c out/index.html; du -sk out/_next/static/chunks; ls -l out/_next/static/chunks/app/page-*.js out/_next/static/chunks/app/layout-*.js out/_next/static/css/*.css
```

- [ ] **Step 5: Tulis `2026-09-08-baseline.md`** — tabel: kolom `halaman | form factor | LCP median | CLS median | TBT median | byte weight | elemen LCP`, plus tabel ukuran (`index.html`, `chunks` total, `page-*.js`, `layout-*.js`, css). Tambahkan baris `share mobile GA4 90 hari: <isi dari GA4, atau "tidak diambil">`.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/perf/
git commit -m "chore(perf): baseline lighthouse + alat QA viewport sebelum upgrade visual"
```

---

### Task 1: Token dan tipografi di `globals.css`

**Files:**
- Modify: `app/globals.css:216-225` (heading), `:263-303` (`.btn*`), `.eyebrow*`, `.highlight-text`, `.card-soft`, `.card-dark:hover`; tambah `:root` token dan `@layer components` class baru.

**Interfaces:**
- Produces: CSS vars `--line-on-cream`, `--line-on-yellow`, `--line-on-navy`; class `.lead`, `.stat-num`, `.stat-num-sm`, `.label`, `.band-padding`.

- [ ] **Step 1: Tambah token garis dan class baru**

Tambahkan setelah blok `@theme { … }`:
```css
:root {
  --line-on-cream: rgba(6, 36, 59, 0.16);
  --line-on-yellow: rgba(6, 36, 59, 0.22);
  --line-on-navy: rgba(239, 235, 221, 0.18);
}
```
Tambahkan di `@layer components`:
```css
.lead { font-size: clamp(1.125rem, 1rem + 0.6vw, 1.375rem); line-height: 1.4; font-weight: 500; max-width: 48ch; }
.stat-num { font-size: clamp(2.25rem, 1.5rem + 3vw, 3.75rem); line-height: 1; letter-spacing: -0.03em; font-weight: 800; font-variant-numeric: tabular-nums; }
.stat-num-sm { font-size: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem); line-height: 1; letter-spacing: -0.02em; font-weight: 800; font-variant-numeric: tabular-nums; }
.label { font-size: 0.75rem; line-height: 1; letter-spacing: 0.08em; font-weight: 600; text-transform: uppercase; }
.band-padding { padding-block: clamp(2rem, 4vw, 3rem); }
```

- [ ] **Step 2: Ganti skala heading (baris 216-225)**

```css
h1, h2, h3, h4, h5, h6 { font-weight: 800; color: var(--color-text-primary); }
h1 { font-size: clamp(2.25rem, 1.25rem + 3.9vw, 4rem); line-height: 1.0; letter-spacing: -0.03em; }
h2 { font-size: clamp(1.875rem, 1.2rem + 2.6vw, 3rem); line-height: 1.05; letter-spacing: -0.025em; }
h3 { font-size: clamp(1.25rem, 1.05rem + 0.8vw, 1.5rem); line-height: 1.2; letter-spacing: -0.01em; font-weight: 700; }
```

- [ ] **Step 3: Hapus shadow/gradient dan ubah eyebrow, highlight, card**

- `.btn` transition: hapus `box-shadow 0.2s ease,` dan `background-image 0.3s ease`.
- `.btn-primary:hover`: ganti `background: linear-gradient(…)` → `background: #F4D23A;`; hapus baris `box-shadow`.
- `.btn-dark:hover`: hapus baris `box-shadow` (background `#144668` tetap lewat var).
- `.eyebrow`: hapus `background`, `padding`, `border-radius`; `letter-spacing: 0.18em` → `0.08em`.
- `.eyebrow-on-dark`, `.eyebrow-light`, `.eyebrow-on-yellow`: hapus `background` saja.
- `.highlight-text`: `border-radius` → `2px`.
- `.card-soft`: hapus `box-shadow`, `border-radius: 20px` → `12px`; `.card-soft:hover`: hapus `box-shadow`, border-color → `#06243B`.
- `.card-dark:hover`: hapus `box-shadow`.
Blok `body:has([data-skin="clipper"])` (baris 121-190) TIDAK disentuh (halaman clipper di luar scope).

- [ ] **Step 4: Verifikasi**

```bash
pnpm build 2>&1 | grep -E "error|warn|Compiled" | head
grep -nE '^\s*\.(btn-primary|btn-dark|card-soft|card-dark|eyebrow[a-z-]*|highlight-text)(:hover)?\s*\{' -A6 app/globals.css | grep -E 'box-shadow|linear-gradient|letter-spacing: 0.18em' | grep -v 'data-skin'
```
Expected: build lulus; grep kedua kosong.

- [ ] **Step 5: Commit** — `git commit -am "feat(css): token garis, skala tipografi baru, hapus shadow/gradient hover"`

---

### Task 2: Komponen `Eyebrow`

**Files:**
- Create: `components/shared/Eyebrow.tsx`

**Interfaces:**
- Produces: `Eyebrow({ children, tone, as? })`, `tone: "cream" | "yellow" | "navy"`.

- [ ] **Step 1: Tulis komponen**

```tsx
import type { ReactNode } from "react";

type Tone = "cream" | "yellow" | "navy";

const TEXT: Record<Tone, string> = {
  cream: "text-[#06243B]",
  yellow: "text-[#06243B]",
  navy: "text-[#EFEBDD]",
};
const BAR: Record<Tone, string> = {
  cream: "bg-[#FF7E00]",
  yellow: "bg-[#FF7E00]",
  navy: "bg-[#BDF24A]",
};

export function Eyebrow({
  children,
  tone,
  as: Tag = "span",
}: {
  children: ReactNode;
  tone: Tone;
  as?: "span" | "p";
}) {
  return (
    <Tag className={`label inline-flex items-center gap-3 ${TEXT[tone]}`}>
      <span aria-hidden className={`inline-block h-[2px] w-5 ${BAR[tone]}`} />
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verifikasi** — `pnpm build` lulus; `grep -c "#" components/shared/Eyebrow.tsx` menunjukkan hanya hex dari daftar.
- [ ] **Step 3: Commit** — `git add components/shared/Eyebrow.tsx && git commit -m "feat(ui): komponen Eyebrow bar 20x2"`

---

### Task 3: Komponen `ProofRow`

**Files:**
- Create: `components/shared/ProofRow.tsx`

**Interfaces:**
- Produces: `ProofRow({ items, tone, numSize?, mobileLayout? })` sesuai §8; item `{ value: ReactNode; label: string; href?: string; ariaLabel?: string }`.

- [ ] **Step 1: Tulis komponen**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "yellow" | "cream" | "navy";
export type ProofItem = { value: ReactNode; label: string; href?: string; ariaLabel?: string };

const LINE: Record<Tone, string> = {
  yellow: "border-[var(--line-on-yellow)]",
  cream: "border-[var(--line-on-cream)]",
  navy: "border-[var(--line-on-navy)]",
};
const NUM: Record<Tone, string> = { yellow: "text-[#06243B]", cream: "text-[#06243B]", navy: "text-white" };
const LABEL: Record<Tone, string> = { yellow: "text-[#06243B]/80", cream: "text-[#3D4F60]", navy: "text-[#EFEBDD]/80" };

export function ProofRow({
  items,
  tone,
  numSize = "lg",
  mobileLayout = "stack",
}: {
  items: ProofItem[];
  tone: Tone;
  numSize?: "lg" | "sm";
  mobileLayout?: "stack" | "grid2";
}) {
  const numClass = numSize === "lg" ? "stat-num" : "stat-num-sm";
  const mobile = mobileLayout === "grid2" ? "grid grid-cols-2 md:grid-cols-[repeat(var(--n),1fr)]" : "flex flex-col md:grid md:grid-cols-[repeat(var(--n),1fr)]";
  return (
    <div className={mobile} style={{ ["--n" as string]: items.length }}>
      {items.map((it, i) => {
        const inner = (
          <>
            <span className={`${numClass} ${NUM[tone]} min-w-[5.5ch]`}>{it.value}</span>
            <span className={`text-base leading-snug ${LABEL[tone]}`}>{it.label}</span>
          </>
        );
        const cell =
          mobileLayout === "stack"
            ? `flex items-center gap-4 min-h-[64px] py-3 ${i > 0 ? `border-t ${LINE[tone]}` : ""} md:flex-col md:items-start md:gap-2 md:py-0 md:border-t-0 md:px-6 ${i > 0 ? `md:border-l ${LINE[tone]}` : "md:pl-0"}`
            : `flex flex-col gap-2 py-3 px-4 first:pl-0 ${i % 2 === 1 ? `border-l ${LINE[tone]}` : ""} md:px-6 md:border-l-0 ${i > 0 ? `md:border-l ${LINE[tone]}` : "md:pl-0"}`;
        return it.href ? (
          <Link key={it.label} href={it.href} aria-label={it.ariaLabel ?? it.label} className={`${cell} group transition-colors duration-200 hover:text-[#FF7E00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06243B]`}>
            {inner}
          </Link>
        ) : (
          <div key={it.label} className={cell}>{inner}</div>
        );
      })}
    </div>
  );
}
```
Catatan: `md:grid-cols-[repeat(var(--n),1fr)]` — Tailwind v4 menerima arbitrary value dengan var. Kalau build menolak, ganti dengan `style={{ gridTemplateColumns: \`repeat(${items.length}, 1fr)\` }}` di wrapper dengan class `md:grid`.

- [ ] **Step 2: Verifikasi** — `pnpm build` lulus.
- [ ] **Step 3: Commit** — `git add components/shared/ProofRow.tsx && git commit -m "feat(ui): ProofRow baris angka berhairline, stack/grid2 di mobile"`

---

### Task 4: Hook `useVideoAllowed`

**Files:**
- Create: `lib/useVideoAllowed.ts`

**Interfaces:**
- Produces: `useVideoAllowed(): boolean`.

- [ ] **Step 1: Tulis hook**

```ts
"use client";
import { useEffect, useState } from "react";

const DESKTOP = "(min-width: 1024px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function compute(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return (
    window.matchMedia(DESKTOP).matches &&
    !window.matchMedia(REDUCED).matches &&
    nav.connection?.saveData !== true
  );
}

export function useVideoAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const update = () => setAllowed(compute());
    update();
    const mqs = [window.matchMedia(DESKTOP), window.matchMedia(REDUCED)];
    mqs.forEach((m) => m.addEventListener("change", update));
    return () => mqs.forEach((m) => m.removeEventListener("change", update));
  }, []);
  return allowed;
}
```

- [ ] **Step 2: Verifikasi** — `pnpm build` lulus.
- [ ] **Step 3: Commit** — `git add lib/useVideoAllowed.ts && git commit -m "feat(video): hook useVideoAllowed"`

---

### Task 5: Placeholder SVG dan komponen `HeroMedia`

**Files:**
- Create: `public/img/_placeholder/hero-3x4.svg`, `hero-3x2.svg`, `page-4x3.svg`, `page-3x1.svg`
- Create: `components/shared/HeroMedia.tsx`

**Interfaces:**
- Consumes: `useVideoAllowed` (Task 4).
- Produces: `HeroMedia({ poster, posterMobile, posterAlt, webm?, mp4?, className? })`.

- [ ] **Step 1: Buat 4 placeholder** (satu perintah per file, ganti angka `viewBox`):

```bash
mkdir -p public/img/_placeholder
for spec in "hero-3x4 720 960" "hero-3x2 720 480" "page-4x3 1200 900" "page-3x1 780 260"; do set -- $spec
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %s %s" width="%s" height="%s"><rect width="100%%" height="100%%" fill="#F7F4EE"/><line x1="0" y1="%s" x2="%s" y2="0" stroke="#06243B" stroke-width="2"/></svg>' $2 $3 $2 $3 $3 $2 > public/img/_placeholder/$1.svg; done
ls -l public/img/_placeholder
```
Expected: 4 file <1 KB.

- [ ] **Step 2: Tulis `HeroMedia`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useVideoAllowed } from "@/lib/useVideoAllowed";

export function HeroMedia({
  poster, posterMobile, posterAlt, webm, mp4, className = "",
}: {
  poster: string; posterMobile: string; posterAlt: string; webm?: string; mp4?: string; className?: string;
}) {
  const allowed = useVideoAllowed();
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(webm || mp4);

  useEffect(() => {
    if (!allowed || !hasVideo) { setMount(false); setReady(false); return; }
    let idle: number | undefined;
    const go = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
      idle = w.requestIdleCallback ? w.requestIdleCallback(() => setMount(true)) : window.setTimeout(() => setMount(true), 200);
    };
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
    return () => { window.removeEventListener("load", go); if (idle) window.clearTimeout(idle); };
  }, [allowed, hasVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!mount || !v) return;
    const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio < 0.1) v.pause(); else v.play().catch(() => {}); }, { threshold: [0, 0.1] });
    io.observe(v);
    v.play().catch(() => {});
    return () => io.disconnect();
  }, [mount]);

  return (
    <div className={`relative w-full border border-[#06243B] aspect-[3/2] lg:aspect-[3/4] overflow-hidden ${className}`}>
      <picture>
        <source media="(min-width: 1024px)" srcSet={poster} width={720} height={960} />
        <img src={posterMobile} alt={posterAlt} width={720} height={480} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      {mount && (
        <video ref={videoRef} autoPlay muted loop playsInline preload="none" aria-hidden onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{ opacity: ready ? 1 : 0 }}>
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verifikasi** — `pnpm build` lulus; `grep -c "aspect-\[3/2\]" components/shared/HeroMedia.tsx` = 1.
- [ ] **Step 4: Commit** — `git add public/img/_placeholder components/shared/HeroMedia.tsx && git commit -m "feat(ui): HeroMedia picture+video lazy, placeholder SVG"`

---

### Task 6: Tulis ulang `HeroSection` (desktop + mobile)

**Files:**
- Rewrite: `components/home/HeroSection.tsx`
- Modify: `components/shared/RibbonDecoration.tsx:1` (tambah komentar `// deprecated: jangan dipakai di komponen baru`)

**Interfaces:**
- Consumes: `Eyebrow`, `ProofRow`, `HeroMedia`, `CONTACT` dari `@/lib/constants`.

- [ ] **Step 1: Tulis ulang file (server component, tanpa `"use client"`)**

```tsx
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ProofRow } from "@/components/shared/ProofRow";
import { HeroMedia } from "@/components/shared/HeroMedia";

const HERO_PROOF = [
  { value: "20,8x", label: "ROAS Ads CPAS", href: "/case-studies/hanoon-industries", ariaLabel: "Lihat studi kasus Hanoon Industries" },
  { value: "+77%", label: "Revenue dari Digital Aktivasi", href: "/case-studies/rancabango-hotel", ariaLabel: "Lihat studi kasus Rancabango Hotel & Resort" },
  { value: "+300%", label: "leads WhatsApp", href: "/case-studies/popondok", ariaLabel: "Lihat studi kasus Popondok" },
];

const HERO_POSTER = "/img/_placeholder/hero-3x4.svg";
const HERO_POSTER_M = "/img/_placeholder/hero-3x2.svg";
const HERO_ALT = "Simpul tali navy yang sudah terikat rapi di atas kertas cream, difoto dari dekat dengan cahaya dari samping";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden text-[#06243B] grain-overlay">
      <div className="bg-[#F4D23A]">
        <div className="container-mote pt-10 pb-10 lg:pt-12 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Eyebrow tone="yellow">Digital Marketing Consultant</Eyebrow>
            <h1 className="text-balance max-w-[18ch]">
              Bikin iklan &amp; toko online kamu{" "}
              <span className="highlight-text">balik modal</span> — bukan cuma rame dilihat.
            </h1>
            <p className="lead text-[#06243B]/80">
              Khusus brand F&amp;B, hotel, dan seller Shopee/TikTok Shop yang serius mau scale. Satu tim urus iklan, konten, sampai marketplace — semua diukur dari penjualan, bukan sekadar angka view.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-6">
                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark group w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi Gratis via WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="#case-studies" className="inline-flex items-center gap-2 min-h-[44px] font-semibold text-[#06243B] hover:text-[#FF7E00] transition-colors duration-150">
                  Lihat Bukti: ROAS 20,8x &amp; +77% Omset
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm font-medium text-[#06243B]/70">
                Gratis &amp; tanpa komitmen — kalau nggak cocok, kami jujur bilang.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroMedia poster={HERO_POSTER} posterMobile={HERO_POSTER_M} posterAlt={HERO_ALT} />
          </div>
        </div>
      </div>
      <div className="bg-[#F7DF75] border-t border-[var(--line-on-yellow)]">
        <div className="container-mote band-padding">
          <ProofRow items={HERO_PROOF} tone="yellow" mobileLayout="stack" />
        </div>
      </div>
    </section>
  );
}
```
Prop `webm`/`mp4` sengaja belum dikirim (fase placeholder) — ditambahkan di Task 16.

- [ ] **Step 2: Tandai `RibbonDecoration` deprecated** — sisipkan baris 1: `// deprecated: jangan dipakai di komponen baru (spec 2026-09-08 §4.6)`.

- [ ] **Step 3: Verifikasi statis**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
grep -n "blur-3xl\|RibbonDecoration\|Sparkles\|linear-gradient\|framer-motion\|FlowDiagram\|+157%\|MER\|min-h-\[90svh\]\|Hasil nyata" components/home/HeroSection.tsx
grep -c "<video" out/index.html; grep -o '<img[^>]*hero-3x2[^>]*>' out/index.html | grep -c 'width="720" height="480"'
```
Expected: build lulus; grep kedua kosong; `0` lalu `1`.

- [ ] **Step 4: Verifikasi mobile/desktop dengan alat QA**

```bash
pkill -f "http.server 3000"; (cd out && python3 -m http.server 3000 >/dev/null 2>&1 &)
python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/ /tmp/shots-t6
```
Expected: semua `overflow=False`; `h1_px=36` di 320–430, `64` di 1440; `h1_lines` ≤5 di 360/390, ≤6 di 320; `cta_bottom` ≤ 844 di 390×844; `small_targets=[]`.
Kalau `h1_lines` = 6 di 360: ubah floor h1 di `globals.css` ke `2.125rem`, ulangi.

- [ ] **Step 5: Commit** — `git commit -am "feat(hero): band solid, ProofRow final, HeroMedia placeholder, mobile poster 3:2"`

---

### Task 7: Format angka di `lib/data.ts`

**Files:**
- Modify: `lib/data.ts:263,269,285,287,293`

- [ ] **Step 1: Ganti lima string**

```bash
sed -i '' -e '263s/0\.44%/0,44%/' -e '269s/0\.44%/0,44%/' -e '285s/20\.8x (+116\.89%)/20,8x (+116,89%)/' -e '287s/20\.8x (+116\.89%)/20,8x (+116,89%)/' -e '293s/20\.8x/20,8x/; 293s/116\.89%/116,89%/' lib/data.ts
```

- [ ] **Step 2: Verifikasi**

```bash
grep -nE '[0-9]\.[0-9]+(x|%)' lib/data.ts components app; echo "exit=$?"
grep -n '20,8x\|0,44%\|116,89%' lib/data.ts | wc -l
```
Expected: baris pertama kosong (`exit=1`); baris kedua `5`.

- [ ] **Step 3: Commit** — `git commit -am "fix(data): koma desimal Indonesia untuk ROAS dan marketing cost ratio"`

---

### Gerbang 1 — Review pemilik: hero

- [ ] Jalankan `python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/ /tmp/shots-gate1` dan tunjukkan `390x844.png`, `360x800.png`, `1440x900.png` ke pemilik.
- [ ] Tanyakan tiga hal saja: (1) hero desktop dan mobile disetujui sebagai acuan section lain? (2) konfirmasi hilangnya teks `FlowDiagram` dan link "↳ Hasil nyata…" (§11.4 butir 3). (3) h1 36px di mobile terbaca cukup besar?
- [ ] Tidak lanjut ke Task 8 sebelum jawaban (1) = ya. Kalau revisi: perbaiki di Task 6, ulangi gerbang.

---

### Task 8: `SectionHeading`, `PainPoints`, `CaseStudiesFeatured`

**Files:**
- Modify: `components/shared/SectionHeading.tsx`, `components/home/PainPoints.tsx`, `components/home/CaseStudiesFeatured.tsx`

- [ ] **Step 1: `SectionHeading`** — ganti `<span className={cn("eyebrow", light && "eyebrow-light")}>` dengan `<Eyebrow tone={light ? "navy" : "cream"}>{eyebrow}</Eyebrow>`; hapus class ukuran `text-3xl sm:text-4xl md:text-5xl` dari `<h2>` (skala dari `globals.css`); description pakai class `text-base sm:text-lg` → `text-[length:clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.55]`.

- [ ] **Step 2: `PainPoints`** (§7 #2) — grid `mt-12 grid … gap-4` → `mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10`; tiap item: hapus `card-soft`, `iconBg`, `iconColor`, `rounded-full`; jadikan `<li>`/`<div className="flex items-start gap-4 py-4 border-t border-[var(--line-on-cream)]">` dengan `<Icon className="h-5 w-5 mt-0.5 shrink-0 text-[#06243B]" />` dan teks body. Hapus import framer-motion, `containerVariants`/`itemVariants` bila ada.

- [ ] **Step 3: `CaseStudiesFeatured`** (§7 #3) — hapus `motion`, `containerVariants`, `cardVariants`, `whileHover`; `motion.article` → `<Link href={`/case-studies/${cs.slug}`} className="group block md:border-l md:border-[var(--line-on-cream)] md:pl-6 first:md:border-l-0 first:md:pl-0 py-4 md:py-0 border-t border-[var(--line-on-cream)] md:border-t-0 min-h-[64px]">`; angka: class baris 84 → `stat-num-sm text-[#06243B]`; badge baris 91: `text-[10px] uppercase … rounded` → `text-xs font-semibold rounded-[4px] px-2 py-1`; eyebrow "Hasil, bukan janji" TETAP. Link "Lihat semua" tetap.

- [ ] **Step 4: Verifikasi**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
grep -n "framer-motion\|card-soft\|bg-clip-text\|rounded-full\|rounded-2xl\|shadow-" components/home/PainPoints.tsx components/home/CaseStudiesFeatured.tsx components/shared/SectionHeading.tsx
git diff --stat -- components | cat
```
Expected: build lulus; grep kosong. Cek teks tidak berubah: `git diff components/home/PainPoints.tsx components/home/CaseStudiesFeatured.tsx | grep '^[-+]' | grep -v '^[-+][-+]' | grep -vE 'className|import|const |variants|motion|^\+\s*$|^-\s*$|<|/>' ` → harus kosong atau hanya baris tag.

- [ ] **Step 5: Commit** — `git commit -am "refactor(home): PainPoints list berhairline, CaseStudies kolom tanpa kartu, SectionHeading pakai Eyebrow"`

---

### Task 9: `TrifectaMarketing`, `ServicesObjective`, `WhyMote`

**Files:**
- Modify: `components/home/TrifectaMarketing.tsx`, `components/home/ServicesObjective.tsx`, `components/home/WhyMote.tsx`

- [ ] **Step 1: `TrifectaMarketing`** (§7 #4, §10) — background section `bg-[#06243B]`; hapus import `RibbonDecoration`, div `blur-3xl`, dua ribbon, inline gradient; tiga `motion.path` → `<path … stroke="#EFEBDD" strokeOpacity="0.3" strokeWidth="1" />` tanpa `strokeDasharray`, tanpa `style filter`; badge tengah → `<div className="rounded-[4px] bg-[#BDF24A] text-[#06243B] px-3 py-2 font-bold">` dengan teks live tetap; `PillarNode`/`PillarCard`: `rounded-2xl`→`rounded-[12px]`, hapus `backdrop-blur-sm`, `whileHover`, gradient lime → `bg-[#BDF24A]`; kotak ikon `h-10 w-10 rounded-[4px] bg-[#BDF24A] text-[#06243B]`; eyebrow tagline `text-[10px]` → `label`. Kalau setelah ini tidak ada `motion.` tersisa, hapus import framer-motion dan `"use client"` bila tidak ada state.

- [ ] **Step 2: `ServicesObjective`** (§7 #5) — hapus empat string `linear-gradient` dan `iconBg`; kotak ikon `h-10 w-10 rounded-[4px] bg-[#06243B] text-[#F4D23A]`; kartu `rounded-2xl … shadow-sm` → `rounded-[12px] border border-[var(--line-on-cream)] bg-white`; badge "Unggulan" → `rounded-[4px] bg-[#BDF24A] text-xs font-semibold px-2 py-1`; hapus framer-motion.

- [ ] **Step 3: `WhyMote`** (§7 #6) — background `bg-[#06243B]` (hapus inline gradient baris 46 + ribbon baris 54 + import); layout → `grid lg:grid-cols-12 gap-10`: heading (`SectionHeading light`) di `lg:col-span-5 lg:sticky lg:top-28 self-start`, tiga poin di `lg:col-span-7` sebagai `<div className="border-t border-[var(--line-on-navy)] py-6 grid grid-cols-[3rem_1fr] gap-4">` dengan `<span className="label text-[#FF7E00]">0{i+1}</span>`, h3 putih, body `text-[#EFEBDD]/80`; hapus kotak ikon, `card-dark`, framer-motion.

- [ ] **Step 4: Verifikasi**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
grep -n "blur-3xl\|RibbonDecoration\|linear-gradient\|drop-shadow\|strokeDasharray\|backdrop-blur\|whileHover\|framer-motion\|rounded-2xl\|rounded-xl\|shadow-\|A6D636\|card-dark" components/home/TrifectaMarketing.tsx components/home/ServicesObjective.tsx components/home/WhyMote.tsx
```
Expected: build lulus; grep kosong.

- [ ] **Step 5: Commit** — `git commit -am "refactor(home): Trifecta/Services/WhyMote tanpa gradient, blob, ribbon, motion"`

---

### Task 10: `ClientsSection`, `StatsSection`, `StartHere`, `CTASection`

**Files:**
- Modify: `components/home/ClientsSection.tsx`, `components/home/StatsSection.tsx`, `components/home/StartHere.tsx`, `components/home/CTASection.tsx`

- [ ] **Step 1: `ClientsSection`** — pada `<img>` logo tambah class `grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-opacity duration-200`; hapus framer-motion bila ada.

- [ ] **Step 2: `StatsSection`** — section `bg-white py-16 sm:py-20 border-y border-black/5` → `bg-[#F7F4EE] band-padding border-y border-[var(--line-on-cream)]`; `duration = 1200` → `900`; `Counter` return `<span ref={ref} className="inline-block min-w-[3ch] tabular-nums">`; ganti grid 2×4 dengan `<ProofRow tone="cream" mobileLayout="grid2" items={STATS.map(s => ({ value: <Counter value={s.value} suffix={s.suffix} />, label: s.label }))} />`. `useInView` dari framer-motion tetap (satu-satunya pemakai yang diizinkan). Untuk `prefers-reduced-motion`: di awal `useEffect`, `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }`.

- [ ] **Step 3: `StartHere`** — kotak ikon baris 70 → `<span className="stat-num-sm text-[#06243B]">0{i+1}</span>`; hapus import ikon yang jadi tidak terpakai; judul langkah `<h3>` (skala global), deskripsi body; panel CTA baris 89 `rounded-2xl` → `rounded-[12px] bg-[#06243B]`; hapus framer-motion.

- [ ] **Step 4: `CTASection`** — section `bg-[#BDF24A] grain-overlay`; hapus inline gradient, dua `blur-3xl`, dua ribbon + import; eyebrow → `<Eyebrow tone="yellow">` (bar orange di lime); tombol `.btn-dark`; hapus framer-motion. Teks tetap.

- [ ] **Step 5: Verifikasi seluruh homepage**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
grep -rn "blur-3xl\|RibbonDecoration\|Sparkles\|linear-gradient\|bg-clip-text\|backdrop-blur\|drop-shadow" components/home components/shared/PageHero.tsx components/shared/SectionHeading.tsx | grep -v "^components/shared/PageHero"
grep -rn "rounded-xl\|rounded-2xl\|rounded-3xl\|rounded-\[20px\]\|rounded-\[24px\]" components/home
grep -rln "framer-motion" components/home
grep -rn "shadow-" components/home
grep -ohn "#[0-9A-Fa-f]\{6\}" components/home/*.tsx components/shared/{Eyebrow,ProofRow,HeroMedia,SectionHeading}.tsx | sed 's/.*://' | sort -u
```
Expected: build lulus; grep 2–4 kosong kecuali `framer-motion` → hanya `components/home/StatsSection.tsx` (dan file yang tidak diimpor `app/page.tsx`: `ProductsPreview`, `CustomerJourney`, `ServicesPreview` — boleh, di luar scope); daftar hex ⊆ daftar Global Constraints.

- [ ] **Step 6: QA viewport + screenshot**

```bash
pkill -f "http.server 3000"; (cd out && python3 -m http.server 3000 >/dev/null 2>&1 &)
python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/ /tmp/shots-t10
```
Expected: `overflow=False` di semua viewport.

- [ ] **Step 7: Commit** — `git commit -am "refactor(home): Clients/Stats/StartHere/CTA ke sistem garis dan band solid"`

---

### Task 11: Cek rangka section dan hex (kriteria §12 butir 2–7, 26)

- [ ] **Step 1:** Isi tabel rangka 10 section (dari §7) di komentar PR/catatan lokal; pastikan tidak ada tiga berurutan "heading kiri + grid kartu" (yang memakai: ServicesObjective, StartHere — dua, tidak berurutan).
- [ ] **Step 2:** Jalankan ulang seluruh grep §12 butir 2–7. Semua harus lulus.
- [ ] **Step 3:** `pnpm lint` bersih.

---

### Gerbang 2 — Review pemilik: seluruh homepage

- [ ] Tunjukkan `/tmp/shots-t10/390x844.png` (full-page: ubah `full_page=True` sementara untuk viewport mobile pada run ini) dan `1440x900.png`.
- [ ] Pertanyaan: urutan dan variasi rangka section disetujui? Ada section yang terasa kosong tanpa kartu?
- [ ] Tidak lanjut ke Task 12 sebelum ACC.

---

### Task 12: Tulis ulang `PageHero` (default + compact, media desktop 4:3 + mobile 3:1)

**Files:**
- Rewrite: `components/shared/PageHero.tsx`

**Interfaces:**
- Produces: `PageHero({ eyebrow, title, highlight?, description?, actions?, media?, variant? })`, `PageHeroMedia = { src, srcMobile, alt }` (§6.1).

- [ ] **Step 1: Tulis ulang (server component)**

```tsx
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/shared/Eyebrow";

export type PageHeroMedia = { src: string; srcMobile: string; alt: string };

export function PageHero({
  eyebrow, title, description, highlight, actions, media, variant = "default",
}: {
  eyebrow: string; title: string; description?: string; highlight?: string; actions?: ReactNode; media?: PageHeroMedia; variant?: "default" | "compact";
}) {
  const renderTitle = () => {
    if (variant === "compact" || !highlight || !title.includes(highlight)) return title;
    const [before, after] = title.split(highlight);
    return (<>{before}<span className="highlight-text">{highlight}</span>{after}</>);
  };

  if (variant === "compact") {
    return (
      <section className="bg-[#F7F4EE] text-[#06243B] border-b border-[var(--line-on-cream)]">
        <div className="container-mote py-[clamp(2.5rem,5vw,4rem)] max-w-[44rem] flex flex-col gap-4">
          <Eyebrow tone="cream">{eyebrow}</Eyebrow>
          <h1 className="text-[length:clamp(1.875rem,1.2rem+2.6vw,3rem)] leading-[1.05] tracking-[-0.025em]">{title}</h1>
          {description && <p className="text-[#3D4F60]">{description}</p>}
          {actions && <div className="flex flex-wrap gap-3 mt-2">{actions}</div>}
        </div>
      </section>
    );
  }

  const text = (
    <div className={`flex flex-col gap-5 ${media ? "lg:col-span-7" : "max-w-[44rem]"}`}>
      <Eyebrow tone="yellow">{eyebrow}</Eyebrow>
      <h1 className="text-balance max-w-[18ch]">{renderTitle()}</h1>
      {description && <p className="lead text-[#06243B]/80">{description}</p>}
      {actions && <div className="flex flex-wrap gap-3 mt-2">{actions}</div>}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#F4D23A] text-[#06243B] grain-overlay border-b border-[var(--line-on-yellow)]">
      <div className={`container-mote relative z-10 py-[clamp(3rem,6vw,5rem)] ${media ? "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-center" : ""}`}>
        {text}
        {media && (
          <div className="lg:col-span-5">
            <div className="relative w-full border border-[#06243B] aspect-[3/1] lg:aspect-[4/3] lg:max-h-[360px] overflow-hidden">
              <picture>
                <source media="(min-width: 1024px)" srcSet={media.src} width={1200} height={900} />
                <img src={media.srcMobile} alt={media.alt} width={780} height={260} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifikasi** — `pnpm build` lulus; `grep -n "use client\|framer-motion\|RibbonDecoration\|blur-3xl\|linear-gradient" components/shared/PageHero.tsx` kosong. Halaman tanpa `media` (mis. `/blog/`) harus tetap render: `curl -s http://localhost:3000/blog/ | grep -c "<h1"` = 1 setelah serve ulang.
- [ ] **Step 3: Commit** — `git commit -am "refactor(PageHero): server component, varian compact, media desktop 4:3 + strip mobile 3:1"`

---

### Task 13: Pasang prop `media` / `variant` di 7 halaman

**Files:**
- Modify: `app/services/page.tsx`, `app/case-studies/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` (tambah `media`), `app/privacy-policy/page.tsx`, `app/terms/page.tsx`, `app/refund-policy/page.tsx` (tambah `variant="compact"`).

- [ ] **Step 1: Tambah `media` (placeholder) di 4 halaman** — contoh `app/services/page.tsx:33-38`:

```tsx
<PageHero
  eyebrow="Layanan"
  title="Lima layanan inti untuk lima fase pertumbuhan brand."
  highlight="pertumbuhan"
  description="…(tidak diubah)…"
  media={{ src: "/img/_placeholder/page-4x3.svg", srcMobile: "/img/_placeholder/page-3x1.svg", alt: "Tiga utas tali berwarna lime, oranye, dan navy berjajar sejajar di atas kertas cream, belum saling bertemu" }}
/>
```
Alt per halaman dari dokumen aset A2–A5 (services / case-studies / about / contact).

- [ ] **Step 2: Tambah `variant="compact"` di 3 halaman legal.** Tidak ada perubahan lain di file itu.

- [ ] **Step 3: Verifikasi**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
git diff --stat -- app | cat        # hanya 7 file, tiap file ≤ +2 baris
pkill -f "http.server 3000"; (cd out && python3 -m http.server 3000 >/dev/null 2>&1 &)
for p in services case-studies about contact; do python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/$p/ /tmp/shots-t13-$p | grep -E "^(390x844|1440x900)"; done
python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/privacy-policy/ /tmp/shots-t13-legal | head -1
```
Expected: `overflow=False` semua; screenshot 1440 memperlihatkan frame 4:3, 390 memperlihatkan strip 3:1; legal berlatar cream.

- [ ] **Step 4: Commit** — `git commit -am "feat(pages): media PageHero di 4 halaman, varian compact di 3 halaman legal"`

---

### Gerbang 3 — Review pemilik: PageHero

- [ ] Tunjukkan `/tmp/shots-t13-services/{390x844,1440x900}.png` dan `/tmp/shots-t13-legal/390x844.png`.
- [ ] Pertanyaan: strip 3:1 di mobile dipertahankan atau lebih baik tanpa gambar di mobile? (keputusan spec §5.8 = dipertahankan; pemilik bisa membatalkan di sini tanpa mengubah kode selain `hidden lg:block` pada wrapper).
- [ ] Tidak lanjut ke Task 16 sebelum ACC dan sebelum Gerbang aset lolos.

---

## JALUR B — Aset (paralel dengan Task 1–13)

### Task B1: Persiapan

- [ ] `mkdir -p assets-src public/video && printf '\n# aset mentah generatif (PNG Gemini, MP4 Seedance)\n/assets-src/\n' >> .gitignore`
- [ ] `test -s ~/.config/openrouter/browseruse-key && echo ok` → `ok`. Cek kredit: `curl -s https://openrouter.ai/api/v1/credits -H "Authorization: Bearer $(cat ~/.config/openrouter/browseruse-key)" | jq .` → catat angka awal.
- [ ] `git commit -am "chore: abaikan assets-src"`

### Task B2: First-frame hero A1 (5 kandidat)

- [ ] Jalankan request aset §4.1 lima kali dengan prompt A1, output `assets-src/A1-frame-v{1..5}.png`. Catat `usage`/`cost` respons pertama ke `docs/superpowers/perf/asset-cost.md` (tabel `item | biaya`).
- [ ] Seleksi dengan aset §3 (8 butir). Buat contact sheet: `ffmpeg -y -i assets-src/A1-frame-v%d.png -filter_complex "scale=360:-1,tile=5x1" assets-src/A1-sheet.png` (jalankan setelah menamai ulang jadi `A1-frame-1.png` dst. bila perlu). Tandai pilihan: `cp assets-src/A1-frame-vN.png assets-src/A1-frame-pick.png`.
- [ ] Cek posisi simpul untuk crop mobile: `ffmpeg -y -i assets-src/A1-frame-pick.png -vf "crop=iw:ih/2:0:ih/4" assets-src/A1-crop-check.png` — simpul harus utuh. Kalau terpotong, pilih kandidat lain atau generate ulang.

### Task B3: Test Seedance 480p 4 s (wajib sebelum 720p)

- [ ] Kirim request aset §4.2 dengan `resolution: "480p"`, `duration: 4`, `first_frame`/`last_frame` = `A1-frame-pick.png`. Simpan `A1-test.mp4`.
- [ ] Kalau 400 pada `frame_images`: coba bentuk alternatif berurutan seperti aset §4.2 catatan. Catat bentuk yang diterima di `docs/superpowers/perf/asset-cost.md`.
- [ ] Cek: `ffprobe -v error -show_entries stream=width,height,nb_frames A1-test.mp4`; putar `ffplay -loop 0 assets-src/A1-test.mp4` — simpul diam? kamera diam? frame awal = akhir? Kalau simpul bergerak/berubah, revisi prompt video (Take B) sebelum 720p.

### Task B4: Take 720p 8 s (A dan, bila perlu, B)

- [ ] Request 720p 8 s dengan prompt Take A → `A1-take-a.mp4`. Evaluasi seperti B3. Take B hanya kalau A gagal aset §3 butir 8.
- [ ] Cek frame awal vs akhir: `ffmpeg -y -i assets-src/A1-take-a.mp4 -vf "select='eq(n,0)+eq(n,191)',tile=2x1" -frames:v 1 assets-src/A1-firstlast.png` — kedua frame harus identik secara visual.

### Task B5: Encode video + poster (aset §5 langkah 1–6, 9)

- [ ] Jalankan langkah 1 (dan 2 bila loop melompat), 3, 4, 5, 6, 9.
- [ ] Verifikasi:
```bash
stat -f "%N %z" public/video/hero-loop.webm public/video/hero-loop.mp4 public/img/hero-poster.webp public/img/hero-poster-m.webp
ffprobe -v error -show_entries stream=width,height,r_frame_rate,codec_name public/video/hero-loop.webm
ffprobe -v error -select_streams a -show_entries stream=codec_type public/video/hero-loop.webm public/video/hero-loop.mp4
```
Expected: ≤1258291, ≤1258291, ≤122880, ≤61440; `vp9 720 960 24/1`; audio kosong.

### Task B6: Gambar A2–A5 (3 kandidat masing-masing) + encode (aset §5 langkah 7–8)

- [ ] Request 3:2 2K ×3 per aset → `assets-src/A{2..5}-v{1..3}.png`; seleksi aset §3; `cp` pilihan ke `A{n}-pick.png`.
- [ ] Encode desktop 4:3 dan mobile 3:1 untuk keempatnya (perintah aset §5 langkah 7–8, ganti nama file).
- [ ] Verifikasi: `for f in public/img/page-*.webp; do echo "$f $(stat -f%z $f)"; done` — desktop ≤92160, mobile ≤40960; `sips -g pixelWidth -g pixelHeight public/img/page-*.webp` → 1200×900 / 780×260.
- [ ] Buat contact sheet 10 file produksi untuk gerbang aset: `ffmpeg -y -i public/img/page-services.webp -i public/img/page-case-studies.webp -i public/img/page-about.webp -i public/img/page-contact.webp -filter_complex "[0][1][2][3]hstack=4,scale=1600:-1" assets-src/pages-sheet.png` dan sejenisnya untuk `*-m.webp`.

### Gerbang aset — Review pemilik

- [ ] Tunjukkan `assets-src/A1-firstlast.png`, `hero-loop.mp4` (putar), `assets-src/pages-sheet.png`, poster mobile. Tanyakan: babak cerita terbaca? ada hijau yang mengganggu? simpul terasa rapi (bukan kusut)?
- [ ] Revisi = ulangi task B2/B6 untuk aset yang ditolak saja. Catat total biaya akhir di `asset-cost.md`.

---

## PENYATUAN

### Task 16: Tukar placeholder dengan aset asli

**Files:**
- Modify: `components/home/HeroSection.tsx` (konstanta `HERO_POSTER*`, tambah prop `webm`/`mp4`), `app/{services,case-studies,about,contact}/page.tsx` (path media)
- Delete: `public/img/_placeholder/`

- [ ] **Step 1:** `HeroSection.tsx`: `HERO_POSTER = "/img/hero-poster.webp"`, `HERO_POSTER_M = "/img/hero-poster-m.webp"`; `<HeroMedia … webm="/video/hero-loop.webm" mp4="/video/hero-loop.mp4" />`.
- [ ] **Step 2:** Empat halaman: `src: "/img/page-<x>.webp"`, `srcMobile: "/img/page-<x>-m.webp"`.
- [ ] **Step 3:** `git rm -r public/img/_placeholder`.
- [ ] **Step 4: Verifikasi**

```bash
pnpm build 2>&1 | grep -E "error|Compiled" | head -3
grep -rn "_placeholder" components app public/img; echo "exit=$?"
grep -c "<video" out/index.html; grep -o 'hero-poster-m.webp[^>]*' out/index.html | head -1
```
Expected: build lulus; `exit=1`; `0`; atribut `width="720" height="480"` ada.

- [ ] **Step 5: Perilaku browser (§12 butir 13–15, 18)** — di Chrome manual pada `http://localhost:3000/`:
  - 390×844: Network filter `video` → 0 request setelah scroll penuh.
  - 1280×800: `hero-loop.webm` muncul setelah garis `load`; `<video>` opacity 1 ≤1 s.
  - Emulate `prefers-reduced-motion: reduce` + reload: `document.querySelector("video")` → `null`.
  - Performance panel saat video berputar ≥55 fps; tidak ada layout shift.
  Catat hasil empat cek ini di `docs/superpowers/perf/2026-09-08-after.md` §"Perilaku browser".

- [ ] **Step 6: Commit** — `git add -A public/img public/video components app && git commit -m "feat(assets): video hero loop, poster, gambar PageHero — ganti placeholder"`

### Task 17: Pengukuran akhir dan kriteria selesai

- [ ] **Step 1:** Jalankan persis perintah Task 0 Step 4 dengan prefix file `/tmp/lh-after-*`. Tambah `/services/` desktop satu run.
- [ ] **Step 2:** Tulis `docs/superpowers/perf/2026-09-08-after.md` dengan tabel yang sama seperti baseline + kolom delta. Lulus bila: LCP mobile median <2.500, CLS <0,10, TBT ≤150, LCP desktop <1.800, elemen LCP = `img[src*="hero-poster"]` atau `h1`.
- [ ] **Step 3:** `python3 docs/superpowers/perf/qa_viewports.py http://localhost:3000/ /tmp/shots-final` → `overflow=False` ×6, `small_targets=[]`, `h1_lines` sesuai §5.3.
- [ ] **Step 4:** Jalankan seluruh §12 butir 1–12 dan 19–27 sebagai checklist; tempel hasil grep ke `after.md`.
- [ ] **Step 5:** `git commit -am "chore(perf): hasil lighthouse sesudah upgrade visual"`.
- [ ] **Step 6:** Laporkan ke pemilik: tautan tiga screenshot final, tabel before/after, dan pernyataan "belum di-push, belum di-deploy". Pekerjaan berhenti di sini.

---

## Self-review terhadap spec

- Spec §2 (radius/shadow/garis/warna/spacing/motion) → Task 1, 6, 8–10, 11 grep.
- §3 tipografi + §3.1 format angka → Task 1, 7.
- §4 hero desktop + §5 mobile (poster 3:2, h1 36, tap 44, overflow, ProofRow stack, FAB) → Task 5, 6 (+ alat QA Task 0).
- §6 PageHero + §6.4 pemetaan → Task 12, 13.
- §7 sepuluh section → Task 6, 8, 9, 10.
- §8 komponen baru → Task 2, 3, 4, 5.
- §9 motion → Task 10 (Counter 900 ms, reduced-motion), Task 5 (fade 300 ms).
- §10 daftar hapus → grep Task 10 Step 5 dan Task 11.
- §11 performa/SEO → Task 0 (baseline), 16 (perilaku browser), 17 (after); kunci teks → cek diff di Task 8 Step 4 dan Gerbang 1.
- Aset §2–§6 → Task B1–B6.
- Tidak ada `git push`/deploy di task mana pun.
