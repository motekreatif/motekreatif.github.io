import Image from "next/image";
import {
  ArrowRight,
  Check,
  X,
  Clipboard,
  Sparkles,
  Download,
  Lock,
  Infinity as InfinityIcon,
  Wand2,
  Server,
  KeyRound,
  Palette,
  Scissors,
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/constants";
import { CheckoutForm } from "./CheckoutForm";

const PRICE = "Rp 90.467";

export const metadata = buildMeta({
  title: "Clipper by Mote — Bikin Klip Pendek dari YouTube, Sekali Bayar",
  description:
    "Paste link YouTube, AI pilih momen terbaik, jadi klip vertikal ber-caption — semua jalan di komputer kamu sendiri. Bayar sekali " +
    PRICE +
    ", punya selamanya. Tanpa langganan bulanan.",
  path: "/products/clipper",
});

const PAINS = [
  {
    title: "Langganan bulanan gak berhenti",
    body: "Opus Clip, Vidyo, dkk narik biaya tiap bulan. Berhenti bayar, tool-nya mati — konten kamu ikut berhenti.",
  },
  {
    title: "Kredit menit cepat habis",
    body: "Paket murah cuma dapat sedikit menit. Lagi produktif, kredit habis, harus upgrade atau nunggu bulan depan.",
  },
  {
    title: "Video kamu naik ke server orang",
    body: "Upload mentahan ke cloud pihak ketiga. Buat konten sensitif atau klien, itu risiko privasi yang gak perlu.",
  },
];

const STEPS = [
  {
    icon: Clipboard,
    title: "Paste link YouTube",
    body: "Tempel URL video apa pun. Podcast, webinar, wawancara, live — Clipper ambil videonya langsung.",
  },
  {
    icon: Sparkles,
    title: "AI pilih momen terbaik",
    body: "AI transkrip + cari bagian paling menarik, lalu bikin klip vertikal 9:16 dengan caption otomatis, reframe wajah, dan hook.",
  },
  {
    icon: Download,
    title: "Download klip",
    body: "Klip jadi tersimpan di komputer kamu. Tinggal unduh dan posting ke TikTok, Reels, atau Shorts.",
  },
];

const FEATURES = [
  { icon: Lock, title: "100% lokal & privat", body: "Jalan di komputer kamu sendiri. Video gak pernah diupload ke server siapa pun." },
  { icon: InfinityIcon, title: "Tanpa batas render", body: "Bikin sebanyak yang kamu mau. Gak ada kuota menit, gak ada biaya per klip." },
  { icon: Wand2, title: "Caption, reframe, hook otomatis", body: "Caption menyala, wajah selalu ke-frame, hook di awal — semua digarap AI." },
  { icon: KeyRound, title: "Cukup 2 API key gratis", body: "Gemini (Google AI Studio) + Groq. Dua-duanya punya paket gratis. Panduan ada di wizard." },
  { icon: Palette, title: "Brand kamu sendiri", body: "Set nama, logo, dan warna sendiri. Cocok buat agency yang mau tool ber-brand untuk klien." },
  { icon: Server, title: "Sekali install, punya selamanya", body: "docker compose up, isi 2 key, selesai. Gak ada langganan, gak ada yang bisa dimatikan." },
];

const FAQS = [
  {
    q: "Bedanya sama Opus Clip apa?",
    a: "Opus Clip langganan bulanan dan video kamu diproses di server mereka. Clipper bayar sekali, jalan di komputer kamu sendiri, dan render-nya tanpa batas. Kamu pegang penuh.",
  },
  {
    q: "Susah gak install-nya?",
    a: "Install Docker Desktop sekali, lalu double-click launcher (Mac/Windows). Wizard pertama nuntun kamu isi lisensi, brand, dan 2 API key gratis. Sekitar 10 menit.",
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
      <PageHero
        eyebrow="Produk Digital · Clipper"
        title="Bikin klip pendek dari YouTube — di komputer kamu sendiri."
        highlight="di komputer kamu sendiri"
        description={`Paste link, AI pilih momen terbaik, jadi klip vertikal ber-caption. Bayar sekali ${PRICE}, punya selamanya. Tanpa langganan bulanan.`}
        actions={
          <>
            <a href="#beli" className="btn btn-dark group">
              Beli sekarang — {PRICE}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#cara-kerja" className="btn btn-ghost">
              Lihat cara kerja
            </a>
          </>
        }
      />

      {/* Product preview — the real dashboard, in a browser frame */}
      <section className="bg-[#F7F4EE] pt-12 sm:pt-16 pb-6">
        <div className="container-mote">
          <AnimatedSection className="mx-auto max-w-4xl">
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_30px_80px_-30px_rgba(6,36,59,0.45)]">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5 bg-[#F7F4EE]">
                <span className="h-3 w-3 rounded-full bg-[#FF7E00]/70" />
                <span className="h-3 w-3 rounded-full bg-[#BDF24A]" />
                <span className="h-3 w-3 rounded-full bg-[#06243B]/25" />
                <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs text-[#3D4F60] font-medium truncate">
                  Clipper — dashboard kamu, jalan lokal di localhost:3060
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
            <p className="text-center text-sm text-[#3D4F60] mt-4">
              Tampilan asli aplikasinya — nama, logo, dan warna bisa kamu ganti jadi brand sendiri.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-10">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Kenapa cari alternatif</span>
            <h2 className="text-[#06243B]">Capek bayar tool clip tiap bulan?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAINS.map((p) => (
              <AnimatedSection key={p.title} className="card-soft p-7 flex flex-col gap-3 h-full">
                <h3 className="text-lg font-extrabold text-[#06243B]">{p.title}</h3>
                <p className="text-[#3D4F60] leading-relaxed">{p.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="bg-[#06243B] py-20 sm:py-24 text-white">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow eyebrow-on-dark self-start">Cara kerja</span>
            <h2 className="text-white">Tiga langkah, dari link jadi klip siap posting.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection
                  key={s.title}
                  className="rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col gap-4 h-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                      <Icon className="h-7 w-7" strokeWidth={2.2} />
                    </div>
                    <span className="text-5xl font-extrabold text-white/10">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{s.title}</h3>
                  <p className="text-[#EFEBDD]/80 leading-relaxed">{s.body}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Yang kamu dapat</span>
            <h2 className="text-[#06243B]">Semua yang dibutuhin buat produksi klip, sekali beli.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <AnimatedSection key={f.title} className="card-soft p-7 flex flex-col gap-3 h-full">
                  <div className="h-12 w-12 rounded-xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#06243B]">{f.title}</h3>
                  <p className="text-[#3D4F60] leading-relaxed">{f.body}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#06243B] py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-12">
          <AnimatedSection className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow eyebrow-on-dark self-start">Sekali bayar vs langganan</span>
            <h2 className="text-white">Kenapa punya sendiri lebih menang.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscription */}
            <AnimatedSection className="rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col gap-4">
              <h3 className="text-lg font-extrabold text-[#EFEBDD]">Tool clip langganan bulanan</h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Bayar tiap bulan, terus-terusan",
                  "Render dibatasi kredit menit",
                  "Video kamu diproses di server mereka",
                  "Pakai brand mereka, bukan kamu",
                  "Stop bayar = tool langsung mati",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#EFEBDD]/70">
                    <span className="h-5 w-5 rounded-full bg-white/10 text-[#EFEBDD]/70 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            {/* Clipper */}
            <AnimatedSection className="rounded-2xl bg-[#BDF24A] p-7 flex flex-col gap-4 shadow-[0_20px_50px_-20px_rgba(189,242,74,0.5)]">
              <h3 className="text-lg font-extrabold text-[#06243B]">Clipper by Mote</h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Bayar sekali Rp 90.467, punya selamanya",
                  "Render tanpa batas, sepuasnya",
                  "100% lokal — video tetap di komputer kamu",
                  "Brand kamu sendiri (nama, logo, warna)",
                  "Tetap jalan selamanya, gak bisa dimatikan",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#06243B]">
                    <span className="h-5 w-5 rounded-full bg-[#06243B] text-[#BDF24A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm font-semibold">{t}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="bg-white py-16 sm:py-20 border-y border-black/5">
        <div className="container-mote">
          <AnimatedSection className="flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
            <div className="max-w-md flex flex-col gap-3">
              <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Yang kamu butuh</span>
              <h2 className="text-[#06243B] text-2xl md:text-3xl">Cukup Docker + 2 key gratis.</h2>
              <p className="text-[#3D4F60] leading-relaxed">
                Gak perlu server, gak perlu langganan cloud. Semua jalan lokal di komputer kamu.
              </p>
            </div>
            <ul className="flex flex-col gap-3 lg:w-1/2">
              {[
                "Docker Desktop (gratis, sekali install)",
                "API key Gemini — Google AI Studio (gratis)",
                "API key Groq — transkripsi cepat (gratis)",
                "Cookies YouTube opsional, cuma buat video ber-gate",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 p-4 bg-[#F7F4EE] rounded-xl">
                  <span className="h-6 w-6 rounded-full bg-[#06243B] text-[#BDF24A] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-[#06243B] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Buy */}
      <section id="beli" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection className="flex flex-col gap-5">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">Beli sekali, punya selamanya</span>
            <h2 className="text-[#06243B]">
              Satu kali <span className="highlight-text">{PRICE}</span>. Tanpa langganan.
            </h2>
            <p className="text-[#3D4F60] leading-relaxed text-lg">
              Setara harga sekali ngopi. Isi data, bayar, dan lisensi + panduan install
              langsung dikirim ke email kamu.
            </p>
            <ul className="flex flex-col gap-2.5 mt-2">
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
          </AnimatedSection>
          <AnimatedSection>
            <CheckoutForm />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-24 border-t border-black/5">
        <div className="container-mote max-w-3xl flex flex-col gap-10">
          <AnimatedSection className="flex flex-col gap-3">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A] self-start">FAQ</span>
            <h2 className="text-[#06243B]">Pertanyaan yang sering muncul.</h2>
          </AnimatedSection>
          <div className="flex flex-col gap-4">
            {FAQS.map((f) => (
              <AnimatedSection key={f.q} className="rounded-2xl border border-black/8 p-6 bg-[#F7F4EE]">
                <h3 className="text-base font-extrabold text-[#06243B] mb-2">{f.q}</h3>
                <p className="text-[#3D4F60] leading-relaxed">{f.a}</p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between rounded-2xl bg-[#06243B] p-7">
            <div>
              <p className="text-white font-extrabold text-lg">Masih ragu cocok atau tidak?</p>
              <p className="text-[#EFEBDD]/80">Chat dulu — kami jujur bilang cocok atau tidak buat kamu.</p>
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
