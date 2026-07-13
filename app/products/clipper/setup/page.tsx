import {
  ArrowRight,
  Download,
  KeyRound,
  Palette,
  Sparkles,
  Server,
  MousePointerClick,
  FolderOpen,
  HelpCircle,
  Power,
  Play,
  Square,
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/constants";

const DOWNLOAD_URL = "/downloads/clipper.zip";

export const metadata = buildMeta({
  title: "Panduan Setup Clipper by Mote — Install, Aktivasi & Buka Lagi",
  description:
    "Cara memasang Clipper by Mote di komputer kamu: install Docker, jalankan aplikasi, aktivasi lisensi, isi API key gratis, dan cara buka lagi setelah laptop dimatikan. Lengkap dengan troubleshooting.",
  path: "/products/clipper/setup",
});

const STEPS = [
  {
    icon: Server,
    label: "Langkah 1",
    title: "Install Docker Desktop (sekali saja)",
    body: "Clipper jalan di dalam Docker biar rapi dan gak ngotorin komputer kamu. Download Docker Desktop, install, buka, lalu tunggu sampai statusnya “running”.",
    extra: (
      <div className="flex flex-wrap gap-3 pt-1">
        <a
          href="https://www.docker.com/products/docker-desktop/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark group text-sm"
        >
          Download Docker Desktop
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    ),
  },
  {
    icon: MousePointerClick,
    label: "Langkah 2",
    title: "Jalankan Clipper — dobel-klik",
    body: "Buka folder hasil download tadi, lalu dobel-klik file launcher-nya. Dia otomatis nyiapin semuanya dan buka http://localhost:3060 di browser. Download pertama beberapa ratus MB (sekali saja) — biarkan jendelanya terbuka, bukan macet.",
    extra: (
      <ul className="flex flex-col gap-2 text-[15px] text-[#3D4F60] pt-1">
        <li>
          <b className="text-[#06243B]">macOS:</b>{" "}
          <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5 font-mono text-[13px]">install.command</code>{" "}
          — pertama kali macOS mungkin blokir (“Apple could not verify…”). Itu{" "}
          <b>normal</b> buat file download; cara ngelewatinnya (<b>Open Anyway</b>) ada di{" "}
          <a href="#troubleshooting" className="text-[#06243B] underline underline-offset-2">
            Troubleshooting
          </a>{" "}
          di bawah.
        </li>
        <li>
          <b className="text-[#06243B]">Windows:</b>{" "}
          <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5 font-mono text-[13px]">install.bat</code>
        </li>
      </ul>
    ),
  },
  {
    icon: KeyRound,
    label: "Langkah 3",
    title: "Wizard pertama — 3 langkah cepat",
    body: "Begitu browser kebuka, wizard nuntun kamu. Gak ada bikin akun atau password — begitu aktif, aplikasi langsung kebuka di komputer kamu.",
    extra: (
      <ol className="flex flex-col gap-3 pt-1">
        {[
          { icon: KeyRound, t: "Tempel LICENSE KEY", d: "Dari email pembelian kamu → klik Activate." },
          { icon: Palette, t: "Atur BRAND", d: "Nama, logo, dan warna kamu sendiri (white-label)." },
          { icon: Sparkles, t: "Tempel API key GRATIS", d: "Gemini + Groq. Link ambil key-nya muncul langsung di wizard." },
        ].map((s) => (
          <li key={s.t} className="flex gap-3">
            <span className="shrink-0 mt-0.5 grid place-items-center h-7 w-7 rounded-lg bg-[#BDF24A]">
              <s.icon className="h-4 w-4 text-[#06243B]" />
            </span>
            <span className="text-[15px] text-[#3D4F60]">
              <b className="text-[#06243B]">{s.t}</b> — {s.d}
            </span>
          </li>
        ))}
      </ol>
    ),
  },
];

const KEYS = [
  { name: "Gemini", role: "Milih momen terbaik dari video", url: "https://aistudio.google.com/app/apikey" },
  { name: "Groq", role: "Nyalin ucapan jadi teks (transcribe)", url: "https://console.groq.com/keys" },
];

const FAQ = [
  {
    q: "macOS blokir dengan “Apple could not verify” / file gak bisa dibuka?",
    a: "Ini normal buat aplikasi yang di-download (belum kami notarisasi ke Apple — aman, ini script lokal kamu). Cara ngelewatinnya di macOS: (1) dobel-klik install.command, peringatan muncul → klik Done / Batal. (2) Buka menu Apple  → System Settings → Privacy & Security. (3) Scroll ke bawah; di sebelah tulisan “install.command was blocked” klik tombol Open Anyway. (4) Konfirmasi pakai Touch ID / password, lalu dobel-klik install.command lagi → Open. Di macOS versi lama, klik-kanan install.command → Open → Open juga bisa. Di Windows, kalau muncul “Windows protected your PC”, klik More info → Run anyway.",
  },
  {
    q: "“Docker isn't running”?",
    a: "Buka Docker Desktop dulu, tunggu sampai ikonnya hijau / bertulisan “running”, baru dobel-klik install lagi. Kalau belum ada Docker, install dari langkah 1.",
  },
  {
    q: "Halaman localhost:3060 gak kebuka?",
    a: "Tunggu — download pertama makan beberapa menit. Kalau port 3060 kepakai aplikasi lain, buka docker-compose.yml, ganti angka kiri di baris “3060:3050” (misal jadi 3070:3050), simpan, dobel-klik install lagi, lalu buka localhost:3070.",
  },
  {
    q: "Habis restart laptop kok localhost:3060 gak kebuka?",
    a: "Setelah laptop dimatikan, Docker Desktop mati juga. Nyalain Docker Desktop dulu (tunggu “running”), lalu dobel-klik start.command / start.bat. Detail di bagian “Buka lagi Clipper” di atas.",
  },
  {
    q: "Video-nya minta login / dibatasi umur?",
    a: "Untuk video ber-gate, kamu bisa isi cookies opsional di menu Settings. Video publik biasa gak butuh ini.",
  },
  {
    q: "Klip jadinya di mana?",
    a: "Di folder “clips” tepat di sebelah file install tadi — buka langsung dari Finder / Explorer, gak perlu download.",
  },
];

export default function ClipperSetupPage() {
  return (
    <>
      <PageHero
        eyebrow="Clipper · Panduan Setup"
        title="Pasang Clipper di laptop kamu — 3 langkah."
        highlight="3 langkah"
        description="Sudah beli Clipper? Ikuti panduan ini dari nol sampai jadi klip pertama. Butuh sekitar 10 menit, mostly nunggu download."
        actions={
          <>
            <a href={DOWNLOAD_URL} className="btn btn-dark group" download>
              Download Clipper
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#langkah" className="btn btn-ghost">
              Lihat langkahnya
            </a>
          </>
        }
      />

      {/* Download card */}
      <section className="bg-white pt-12 sm:pt-16 pb-6">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-[#F7F8FA] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="shrink-0 grid place-items-center h-16 w-16 rounded-2xl bg-[#BDF24A]">
              <Download className="h-8 w-8 text-[#06243B]" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <h3 className="text-[#06243B] text-xl font-semibold">Paket Clipper (ZIP)</h3>
                <p className="text-[15px] text-[#3D4F60]">
                  File kecil — cuma pengatur & script. Aplikasi asli ke-download otomatis saat pertama dijalankan.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={DOWNLOAD_URL} className="btn btn-primary group" download>
                  Download clipper.zip
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <span className="text-sm text-[#3D4F60]">
                  Butuh <b className="text-[#06243B]">license key</b> dari email pembelian kamu.
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section id="langkah" className="bg-white py-16 sm:py-20">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow">Langkah demi langkah</span>
            <h2 className="text-[#06243B]">Dari download sampai klip pertama.</h2>
          </AnimatedSection>
          <div className="flex flex-col gap-6">
            {STEPS.map((s) => (
              <AnimatedSection
                key={s.title}
                className="rounded-2xl border border-black/8 bg-white p-7 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-[0_1px_2px_rgba(6,36,59,0.04),0_14px_30px_-24px_rgba(6,36,59,0.18)]"
              >
                <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-3">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-[#06243B]">
                    <s.icon className="h-6 w-6 text-[#BDF24A]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#06243B]/50">
                    {s.label}
                  </span>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-[#06243B] text-xl font-semibold">{s.title}</h3>
                  <p className="text-[15px] text-[#3D4F60] leading-relaxed">{s.body}</p>
                  {s.extra}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Restart / open again */}
      <section className="bg-[#F7F8FA] py-16 sm:py-24 border-y border-black/5">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow">Buka lagi</span>
            <h2 className="text-[#06243B]">Habis matiin laptop? Buka lagi gampang.</h2>
            <p className="text-[15px] text-[#3D4F60] leading-relaxed">
              Kamu <b className="text-[#06243B]">gak perlu install ulang</b>. Setelah laptop dimatikan atau
              restart, cukup nyalain lagi lewat 3 langkah ini.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Power,
                t: "1. Nyalain Docker Desktop",
                d: "Buka Docker Desktop dulu, tunggu sampai statusnya “running”. Ini yang paling sering kelupaan.",
              },
              {
                icon: Play,
                t: "2. Dobel-klik start",
                d: "start.command (macOS) atau start.bat (Windows). Atau dobel-klik install lagi — aman, gak ngulang download.",
              },
              {
                icon: FolderOpen,
                t: "3. Buka localhost:3060",
                d: "Aplikasi kebuka lagi persis seperti terakhir kali — lisensi & pengaturan kamu tetap tersimpan.",
              },
            ].map((s) => (
              <AnimatedSection
                key={s.t}
                className="rounded-2xl border border-black/8 bg-white p-7 flex flex-col gap-3"
              >
                <div className="h-11 w-11 rounded-xl bg-[#BDF24A]/20 flex items-center justify-center text-[#06243B]">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-extrabold text-[#06243B]">{s.t}</h3>
                <p className="text-[15px] text-[#3D4F60] leading-relaxed">{s.d}</p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="flex items-start gap-3 rounded-xl border border-black/8 bg-white px-5 py-4">
            <Square className="h-5 w-5 text-[#06243B]/40 shrink-0 mt-0.5" />
            <p className="text-[15px] text-[#3D4F60]">
              <b className="text-[#06243B]">Mau berhenti sementara?</b> Dobel-klik{" "}
              <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5 font-mono text-[13px]">stop.command</code>{" "}
              /{" "}
              <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5 font-mono text-[13px]">stop.bat</code>.
              Klip yang sudah jadi tetap ada di folder “clips”.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Free keys */}
      <section className="bg-[#06243B] py-16 sm:py-24 text-white">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow eyebrow-on-dark self-start">Yang kamu butuhin</span>
            <h2 className="text-white">Dua API key gratis — 2 menit.</h2>
            <p className="text-white/70 text-[15px]">
              Clipper pakai AI-nya kamu sendiri (biar gratis & unlimited sesuai kuota gratis mereka). Ambil dua
              key ini, tempel di wizard langkah 3. Keduanya punya tier gratis.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-5">
            {KEYS.map((k) => (
              <AnimatedSection
                key={k.name}
                className="rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col gap-3"
              >
                <h3 className="text-white text-lg font-semibold">{k.name}</h3>
                <p className="text-white/70 text-[15px] flex-1">{k.role}</p>
                <a
                  href={k.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#BDF24A] font-medium text-sm hover:underline"
                >
                  Ambil key {k.name}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="bg-white py-16 sm:py-24 scroll-mt-24">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow">Troubleshooting</span>
            <h2 className="text-[#06243B]">Nyangkut? Ini yang paling sering.</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-5">
            {FAQ.map((f) => (
              <AnimatedSection
                key={f.q}
                className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-7 flex flex-col gap-2"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-[#06243B]/40 shrink-0 mt-0.5" />
                  <h3 className="text-[#06243B] font-semibold text-[16px]">{f.q}</h3>
                </div>
                <p className="text-[15px] text-[#3D4F60] leading-relaxed pl-7">{f.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Help footer */}
      <section className="bg-[#F7F8FA] py-16 sm:py-20 border-t border-black/5">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
            <span className="grid place-items-center h-14 w-14 rounded-2xl bg-[#06243B]">
              <FolderOpen className="h-7 w-7 text-[#BDF24A]" />
            </span>
            <h2 className="text-[#06243B]">Masih bingung?</h2>
            <p className="text-[15px] text-[#3D4F60] max-w-md">
              Balas email pembelian kamu, atau hubungi kami — dibantu sampai klip pertama kamu jadi.
            </p>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-dark group">
              Hubungi Mote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
