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
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/constants";

const DOWNLOAD_URL = "/downloads/clipper.zip";

export const metadata = buildMeta({
  title: "Panduan Setup Clipper by Mote — Install & Aktivasi",
  description:
    "Cara memasang Clipper by Mote di komputer kamu: install Docker, jalankan aplikasi, aktivasi lisensi, isi API key gratis. Lengkap dengan troubleshooting.",
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
      <ul className="flex flex-col gap-2 text-[15px] text-[#06243B]/80 pt-1">
        <li>
          <b>macOS:</b> <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5">install.command</code>{" "}
          — pertama kali: klik-kanan → <b>Open</b> buat lewatin peringatan keamanan.
        </li>
        <li>
          <b>Windows:</b> <code className="px-1.5 py-0.5 rounded bg-[#06243B]/5">install.bat</code>
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
          {
            icon: KeyRound,
            t: "Tempel LICENSE KEY",
            d: "Dari email pembelian kamu → klik Activate.",
          },
          {
            icon: Palette,
            t: "Atur BRAND",
            d: "Nama, logo, dan warna kamu sendiri (white-label).",
          },
          {
            icon: Sparkles,
            t: "Tempel API key GRATIS",
            d: "Gemini + Groq. Link ambil key-nya muncul langsung di wizard.",
          },
        ].map((s) => (
          <li key={s.t} className="flex gap-3">
            <span className="shrink-0 mt-0.5 grid place-items-center h-7 w-7 rounded-lg bg-[#BDF24A]">
              <s.icon className="h-4 w-4 text-[#06243B]" />
            </span>
            <span className="text-[15px] text-[#06243B]/80">
              <b className="text-[#06243B]">{s.t}</b> — {s.d}
            </span>
          </li>
        ))}
      </ol>
    ),
  },
];

const KEYS = [
  {
    name: "Gemini",
    role: "Milih momen terbaik dari video",
    url: "https://aistudio.google.com/app/apikey",
  },
  {
    name: "Groq",
    role: "Nyalin ucapan jadi teks (transcribe)",
    url: "https://console.groq.com/keys",
  },
];

const FAQ = [
  {
    q: "Dobel-klik install tapi gak ada yang terjadi / muncul peringatan?",
    a: "Di macOS, pertama kali klik-kanan file install.command → pilih Open → Open lagi. Ini normal buat file yang di-download. Di Windows, kalau muncul “Windows protected your PC”, klik More info → Run anyway.",
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
    q: "License key ditolak / “license server unreachable”?",
    a: "Pastikan komputer online saat aktivasi. 1 key = 1 komputer (bisa pindah komputer maksimal 3 kali). Kalau tetap gagal, balas email pembelian kamu — kami bantu reset.",
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
        title="Pasang Clipper di komputer kamu — 3 langkah."
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
      <section className="bg-[#F7F4EE] pt-12 sm:pt-16 pb-6">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-3xl card-soft p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="shrink-0 grid place-items-center h-16 w-16 rounded-2xl bg-[#BDF24A]">
              <Download className="h-8 w-8 text-[#06243B]" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <h3 className="text-[#06243B] text-xl font-semibold">Paket Clipper (ZIP)</h3>
                <p className="text-[15px] text-[#06243B]/70">
                  File kecil — cuma pengatur & script. Aplikasi asli ke-download otomatis saat pertama
                  dijalankan.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={DOWNLOAD_URL} className="btn btn-primary group" download>
                  Download clipper.zip
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <span className="text-sm text-[#06243B]/60">
                  Butuh <b>license key</b> dari email pembelian kamu.
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section id="langkah" className="bg-[#F7F4EE] py-16 sm:py-24">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Langkah demi langkah</span>
            <h2 className="text-[#06243B]">Dari download sampai klip pertama.</h2>
          </AnimatedSection>
          <div className="flex flex-col gap-6">
            {STEPS.map((s) => (
              <AnimatedSection key={s.title} className="card-soft p-7 sm:p-8 flex flex-col sm:flex-row gap-6">
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
                  <p className="text-[15px] text-[#06243B]/80 leading-relaxed">{s.body}</p>
                  {s.extra}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Free keys */}
      <section className="bg-[#06243B] py-16 sm:py-24 text-white">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow eyebrow-on-dark self-start">Yang kamu butuhin</span>
            <h2 className="text-white">Dua API key gratis — 2 menit.</h2>
            <p className="text-white/70 text-[15px]">
              Clipper pakai AI-nya kamu sendiri (biar gratis & unlimited sesuai kuota gratis mereka).
              Ambil dua key ini, tempel di wizard langkah 3. Keduanya punya tier gratis.
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
      <section className="bg-white py-16 sm:py-24">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Troubleshooting</span>
            <h2 className="text-[#06243B]">Nyangkut? Ini yang paling sering.</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-5">
            {FAQ.map((f) => (
              <AnimatedSection key={f.q} className="card-soft p-7 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-[#06243B]/40 shrink-0 mt-0.5" />
                  <h3 className="text-[#06243B] font-semibold text-[16px]">{f.q}</h3>
                </div>
                <p className="text-[15px] text-[#06243B]/75 leading-relaxed pl-7">{f.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Help footer */}
      <section className="bg-[#F7F4EE] py-16 sm:py-20 border-t border-black/5">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
            <span className="grid place-items-center h-14 w-14 rounded-2xl bg-[#06243B]">
              <FolderOpen className="h-7 w-7 text-[#BDF24A]" />
            </span>
            <h2 className="text-[#06243B]">Masih bingung?</h2>
            <p className="text-[15px] text-[#06243B]/75 max-w-md">
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
