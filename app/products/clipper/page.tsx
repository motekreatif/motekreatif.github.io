import Image from "next/image";
import {
  ArrowRight,
  Check,
  X,
  Download,
  Lock,
  Infinity as InfinityIcon,
  Wand2,
  Server,
  KeyRound,
  Palette,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CONTACT } from "@/lib/constants";
import { CheckoutForm } from "./CheckoutForm";
import { Stepper } from "./Stepper";

const PRICE = "Rp 90.467";

export const metadata = buildMeta({
  title: "Clipper by Mote — Bikin Klip Pendek dari YouTube, Sekali Bayar",
  description:
    "Paste link YouTube, AI pilih momen terbaik, jadi klip vertikal ber-caption — semua jalan di komputer kamu sendiri. Bayar sekali " +
    PRICE +
    ", punya selamanya. Tanpa langganan bulanan.",
  path: "/products/clipper",
});

const FEATURES = [
  { icon: Lock, title: "100% lokal & privat", body: "Jalan di komputer kamu sendiri. Video gak pernah diupload ke server siapa pun." },
  { icon: InfinityIcon, title: "Tanpa batas render", body: "Bikin sebanyak yang kamu mau. Gak ada kuota menit, gak ada biaya per klip." },
  { icon: Wand2, title: "Caption, reframe, hook otomatis", body: "Caption menyala, wajah selalu ke-frame, hook di awal — semua digarap AI." },
  { icon: KeyRound, title: "Cukup 2 API key gratis", body: "Gemini (Google AI Studio) + Groq. Dua-duanya punya paket gratis. Panduan ada di wizard." },
  { icon: Palette, title: "Brand kamu sendiri", body: "Set nama, logo, dan warna sendiri. Cocok buat agency yang mau tool ber-brand untuk klien." },
  { icon: Server, title: "Sekali install, punya selamanya", body: "docker compose up, isi 2 key, selesai. Gak ada langganan, gak ada yang bisa dimatikan." },
];

const SUBSCRIPTION_CONS = [
  "Bayar tiap bulan, terus-terusan",
  "Render dibatasi kredit menit",
  "Video kamu diproses di server mereka",
  "Pakai brand mereka, bukan kamu",
  "Stop bayar = tool langsung mati",
];

const CLIPPER_PROS = [
  "Bayar sekali Rp 90.467, punya selamanya",
  "Render tanpa batas, sepuasnya",
  "100% lokal — video tetap di komputer kamu",
  "Brand kamu sendiri (nama, logo, warna)",
  "Tetap jalan selamanya, gak bisa dimatikan",
];

const FAQS = [
  {
    q: "Bedanya sama Opus Clip apa?",
    a: "Opus Clip langganan bulanan dan video kamu diproses di server mereka. Clipper bayar sekali, jalan di komputer kamu sendiri, dan render-nya tanpa batas. Kamu pegang penuh.",
  },
  {
    q: "Susah gak install-nya?",
    a: "Install Docker Desktop sekali, lalu double-click launcher (Mac/Windows). Wizard pertama nuntun kamu isi lisensi, brand, dan 2 API key gratis. Sekitar 10 menit — panduan lengkap ada di halaman setup.",
  },
  {
    q: "API key-nya bayar?",
    a: "Gratis. Gemini dari Google AI Studio dan Groq dua-duanya punya free tier yang cukup buat pemakaian normal. Link-nya disediakan di wizard.",
  },
  {
    q: "Lisensinya buat berapa perangkat?",
    a: "Lisensi terkunci ke satu perangkat (device-lock). Butuh pindah komputer atau lisensi tambahan? Chat WhatsApp kami.",
  },
  {
    q: "Ada refund?",
    a: "Produk digital dengan lisensi, jadi refund terbatas. Ragu apakah cocok? Chat dulu via WhatsApp sebelum beli — kami jujur bilang cocok atau tidak.",
  },
];

export default function ClipperPage() {
  return (
    <>
      {/* Announcement strip */}
      <div className="bg-[#06243B] text-white">
        <div className="container-mote flex items-center justify-center gap-2.5 py-2.5 text-center text-[13px] sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BDF24A] shrink-0" />
          <span className="text-white/85">
            Sekali bayar <b className="text-[#BDF24A]">{PRICE}</b> — punya selamanya. Tanpa langganan bulanan.
          </span>
        </div>
      </div>

      {/* Hero — centered */}
      <section className="bg-white pt-14 sm:pt-20 pb-10">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-3xl flex flex-col items-center text-center gap-6">
            <span className="eyebrow">AI Clipper Desktop · Lokal</span>
            <h1 className="text-[#06243B] text-balance">
              Bikin klip pendek dari YouTube — <span className="highlight-text">di laptop kamu sendiri.</span>
            </h1>
            <p className="text-[#3D4F60] text-lg leading-relaxed max-w-2xl">
              Paste link, AI pilih momen terbaik, jadi klip vertikal ber-caption. Semua diproses lokal —
              tanpa upload, tanpa watermark, tanpa langganan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-1">
              <a href="#beli" className="btn btn-dark group w-full sm:w-auto">
                Beli sekarang — {PRICE}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#cara-kerja" className="btn btn-ghost w-full sm:w-auto">
                Lihat cara kerja
              </a>
            </div>
          </AnimatedSection>

          {/* Product screenshot — the star */}
          <AnimatedSection className="mx-auto max-w-5xl mt-12 sm:mt-16">
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_40px_100px_-40px_rgba(6,36,59,0.5)]">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
                <span className="ml-2 font-mono text-[11px] text-[#06243B]/45 truncate">
                  localhost:3060 — dashboard kamu, jalan lokal
                </span>
              </div>
              <Image
                src="/img/clipper-dashboard.png"
                alt="Dashboard Clipper: paste link YouTube, atur jumlah klip, lalu generate klip pendek otomatis"
                width={1400}
                height={741}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
            <p className="text-center text-sm text-[#3D4F60]/70 mt-4">
              Tampilan asli aplikasinya — nama, logo, dan warna bisa kamu ganti jadi brand sendiri.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works — interactive stepper */}
      <section id="cara-kerja" className="bg-[#F7F8FA] py-20 sm:py-24 border-y border-black/5">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-3">
            <span className="eyebrow">Cara kerja</span>
            <h2 className="text-[#06243B]">Dari link jadi klip siap posting.</h2>
            <p className="text-[#3D4F60] leading-relaxed">
              Empat langkah, semua otomatis dan jalan di komputer kamu.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <Stepper />
          </AnimatedSection>
        </div>
      </section>

      {/* Sample output — real clip */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection className="order-1 lg:order-1 flex justify-center">
            <div className="relative w-[240px] sm:w-[288px] shrink-0 rounded-[2rem] border-[6px] border-[#06243B] bg-[#06243B] shadow-[0_40px_90px_-40px_rgba(6,36,59,0.55)]">
              <video
                src="/video/clipper-sample.mp4"
                poster="/video/clipper-sample-poster.jpg"
                className="block w-full aspect-[9/16] rounded-[1.5rem] object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="order-2 lg:order-2 flex flex-col gap-5">
            <span className="eyebrow">Contoh hasil</span>
            <h2 className="text-[#06243B]">Beginilah klip yang keluar.</h2>
            <p className="text-[#3D4F60] leading-relaxed text-lg">
              Ini output asli Clipper — vertikal 9:16, caption menyala otomatis, wajah selalu
              ke-frame, dan hook ditaruh di detik-detik awal. Langsung siap posting ke TikTok,
              Reels, atau Shorts.
            </p>
            <ul className="flex flex-col gap-2.5 mt-1">
              {[
                "Caption otomatis, sinkron per kata",
                "Reframe wajah ke 9:16 otomatis",
                "Hook di 3 detik awal biar nge-stop scroll",
                "Siap posting, tanpa edit tambahan",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-[#06243B] font-medium">
                  <span className="h-5 w-5 rounded-full bg-[#BDF24A] text-[#06243B] flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-3">
            <span className="eyebrow">Sekali bayar vs langganan</span>
            <h2 className="text-[#06243B]">Kenapa punya sendiri lebih menang.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {/* Subscription */}
            <AnimatedSection className="rounded-2xl border border-black/10 bg-[#F7F8FA] p-8 flex flex-col gap-5">
              <h3 className="text-lg font-extrabold text-[#06243B]/70">Tool clip langganan bulanan</h3>
              <ul className="flex flex-col gap-3.5">
                {SUBSCRIPTION_CONS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#3D4F60]">
                    <span className="h-5 w-5 rounded-full bg-black/5 text-[#06243B]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            {/* Clipper */}
            <AnimatedSection className="relative rounded-2xl border-2 border-[#BDF24A] bg-white p-8 flex flex-col gap-5 shadow-[0_24px_60px_-30px_rgba(6,36,59,0.35)]">
              <span className="absolute -top-3 left-8 rounded-full bg-[#BDF24A] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#06243B]">
                Clipper by Mote
              </span>
              <h3 className="text-lg font-extrabold text-[#06243B]">Punya sendiri, sekali bayar</h3>
              <ul className="flex flex-col gap-3.5">
                {CLIPPER_PROS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#06243B]">
                    <span className="h-5 w-5 rounded-full bg-[#BDF24A] text-[#06243B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-[15px] font-semibold">{t}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F7F8FA] py-20 sm:py-24 border-y border-black/5">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-3">
            <span className="eyebrow">Yang kamu dapat</span>
            <h2 className="text-[#06243B]">Semua buat produksi klip, sekali beli.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <AnimatedSection
                  key={f.title}
                  className="rounded-2xl border border-black/8 bg-white p-7 flex flex-col gap-3 h-full"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#BDF24A]/20 flex items-center justify-center text-[#06243B]">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#06243B]">{f.title}</h3>
                  <p className="text-[#3D4F60] leading-relaxed text-[15px]">{f.body}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buy */}
      <section id="beli" className="bg-white py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection className="flex flex-col gap-5">
            <span className="eyebrow">Beli sekali, punya selamanya</span>
            <h2 className="text-[#06243B]">
              Satu kali <span className="highlight-text">{PRICE}</span>. Tanpa langganan.
            </h2>
            <p className="text-[#3D4F60] leading-relaxed text-lg">
              Setara harga sekali ngopi. Isi data, bayar, dan lisensi + panduan install langsung
              dikirim ke email kamu.
            </p>
            <ul className="flex flex-col gap-2.5 mt-1">
              {[
                "Lisensi seumur hidup — tanpa biaya bulanan",
                "Render klip tanpa batas",
                "Jalan lokal, video kamu tetap privat",
                "Brand sendiri (nama, logo, warna)",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-[#06243B] font-medium">
                  <span className="h-5 w-5 rounded-full bg-[#BDF24A] text-[#06243B] flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="/products/clipper/setup"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#06243B]/60 hover:text-[#06243B] mt-1 self-start"
            >
              Sudah beli? Lihat panduan setup
              <ChevronRight className="h-4 w-4" />
            </a>
          </AnimatedSection>
          <AnimatedSection>
            <CheckoutForm />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FA] py-20 sm:py-24 border-t border-black/5">
        <div className="container-mote max-w-3xl flex flex-col gap-10">
          <AnimatedSection className="flex flex-col gap-3">
            <span className="eyebrow">FAQ</span>
            <h2 className="text-[#06243B]">Pertanyaan yang sering muncul.</h2>
          </AnimatedSection>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <AnimatedSection key={f.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-black/8 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-extrabold text-[#06243B]">{f.q}</h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#06243B]/50 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#3D4F60] leading-relaxed">{f.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between rounded-2xl bg-[#06243B] p-7">
            <div>
              <p className="text-white font-extrabold text-lg">Masih ragu cocok atau tidak?</p>
              <p className="text-white/70">Chat dulu — kami jujur bilang cocok atau tidak buat kamu.</p>
            </div>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group shrink-0"
            >
              Chat via WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
