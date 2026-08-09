import Link from "next/link";
import { ArrowRight, Clock, Download, Laptop, Apple } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PaymentNotice } from "./PaymentNotice";
import { HelpFooter } from "./_components/HelpFooter";
import { SetupHero, HeroMark } from "./_components/SetupHero";
import { BLOCK, BODY_CLASS, BTN_YELLOW, CARD_BORDER, H2_CLASS, INLINE_CODE } from "./_components/skin";

const DOWNLOAD_URL = "/downloads/clipper.zip";

export const metadata = buildMeta({
  title: "Panduan Setup Clipper Rumahan — Pilih Sistem Operasi",
  description:
    "Sudah beli Clipper? Download paketnya lalu pilih panduan sesuai laptop kamu — Windows atau Mac. Masing-masing punya langkah dan waktu tunggu yang beda.",
  path: "/products/clipper/setup",
});

const CHOICES = [
  {
    href: "/products/clipper/setup/windows",
    icon: Laptop,
    iconSize: "h-[30px] w-[30px]",
    title: "Saya pakai Windows",
    body: (
      <>
        Windows 10/11. Install Docker Desktop, cek virtualization di Task Manager, lalu jalankan{" "}
        <code className={INLINE_CODE}>install.bat</code>.
      </>
    ),
    cta: "Buka panduan Windows",
  },
  {
    href: "/products/clipper/setup/mac",
    icon: Apple,
    iconSize: "h-7 w-7",
    title: "Saya pakai Mac",
    body: (
      <>
        Apple Silicon atau Intel. Install Docker Desktop, izinkan Gatekeeper, lalu jalankan{" "}
        <code className={INLINE_CODE}>install.command</code>.
      </>
    ),
    cta: "Buka panduan Mac",
  },
];

const LEGACY_STUBS = [
  {
    id: "update",
    title: "Update ke versi terbaru",
    body: (
      <>
        Cara <code className={INLINE_CODE}>docker compose pull</code>{" "}
        yang aman tanpa kehilangan klip dan lisensi kamu.
      </>
    ),
    links: [
      { label: "Update di Windows", href: "/products/clipper/setup/windows#update" },
      { label: "Update di Mac", href: "/products/clipper/setup/mac#update" },
    ],
  },
  {
    id: "lancar",
    title: "Biar generate lancar (AI gratis kena limit)",
    body: "Cara nambah key Gemini gratis dan apa yang harus dilakukan kalau kena kuota harian.",
    links: [
      { label: "Lihat di Windows", href: "/products/clipper/setup/windows#lancar" },
      { label: "Lihat di Mac", href: "/products/clipper/setup/mac#lancar" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: "Docker gak jalan, localhost gak kebuka, port bentrok, dan masalah umum lainnya.",
    links: [
      { label: "Lihat di Windows", href: "/products/clipper/setup/windows#troubleshooting" },
      { label: "Lihat di Mac", href: "/products/clipper/setup/mac#troubleshooting" },
    ],
  },
];

export default function ClipperSetupChooserPage() {
  return (
    <div data-skin="clipper" className="bg-[#EFEFEC] text-[#191919]">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-5 py-3 sm:py-5 space-y-3 sm:space-y-5">
        <SetupHero
          eyebrow="Clipper · Panduan Setup"
          title={
            <>
              Pasang Clipper <HeroMark>di komputer kamu.</HeroMark>
            </>
          }
          description="Download paketnya, lalu ikuti panduan sesuai laptop kamu. Panduan sekarang dipisah per sistem operasi biar setiap langkah cocok persis dengan yang kamu lihat di layar — bukan konten yang hilang."
        />

        {/* Only renders when iPaymu sent the buyer back here with ?status=success */}
        <PaymentNotice />

        {/* Download card — blok putih */}
        <section className={`${BLOCK} bg-white px-4 py-12 sm:px-10 sm:py-16`}>
          <AnimatedSection className="mx-auto max-w-3xl flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="shrink-0 grid place-items-center h-16 w-16 rounded-full bg-[#F7C526]">
              <Download className="h-8 w-8 text-[#191919]" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <h3 className="text-[#191919] text-xl font-semibold">Paket Clipper (ZIP)</h3>
                <p className="text-[15px] text-[#5F5F5C] leading-relaxed">
                  File kecil — cuma pengatur &amp; script. Aplikasi asli ke-download otomatis saat pertama
                  dijalankan, sesuai langkah di panduan OS kamu.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={DOWNLOAD_URL} className={`${BTN_YELLOW} group`} download>
                  Download clipper.zip
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <span className="text-sm text-[#5F5F5C]">
                  Butuh <b className="text-[#191919]">license key</b> dari email pembelian kamu.
                </span>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* OS choice — blok kuning penuh: titik keputusan halaman ini */}
        <section className={`${BLOCK} bg-[#F7C526] px-4 py-14 sm:px-10 sm:py-20`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-7">
            <AnimatedSection className="flex flex-col gap-3">
              <span className="inline-flex items-center self-start rounded-full border border-[#191919]/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#191919]">
                Langkah berikutnya
              </span>
              <h2 className={H2_CLASS}>Kamu pakai laptop apa?</h2>
              <p className="text-[15px] text-[#191919]/75 leading-relaxed">
                Pilih salah satu — langkah, screenshot, dan estimasi waktunya beda per sistem operasi.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CHOICES.map((c) => (
                <AnimatedSection key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex flex-col gap-[1.1rem] rounded-[24px] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(25,25,25,0.45)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(25,25,25,0.55)]"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="h-16 w-16 rounded-full bg-[#191919] text-[#F7C526] grid place-items-center shrink-0">
                        <c.icon className={c.iconSize} strokeWidth={2} />
                      </div>
                      <span className="inline-flex items-center gap-[0.4rem] text-[0.8rem] font-semibold text-[#191919] bg-[#191919]/[0.07] px-3 py-[0.35rem] rounded-full">
                        <Clock className="h-3.5 w-3.5 text-[#191919]/55" />
                        &plusmn; 30-60 menit pertama kali
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-[#191919]">{c.title}</div>
                      <p className="text-[#5F5F5C] text-[0.95rem] leading-relaxed flex-1 mt-2">{c.body}</p>
                    </div>
                    <span className="inline-flex items-center gap-[0.4rem] font-semibold text-[#F7C526] text-[0.9rem] bg-[#191919] px-[1.15rem] py-[0.65rem] rounded-full w-fit transition-colors group-hover:bg-black">
                      {c.cta}
                      <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy anchor stubs: keep old /setup#update #lancar #troubleshooting links alive */}
        <section className={`${BLOCK} bg-[#F1F1EE] px-4 py-14 sm:px-10 sm:py-16`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-5">
            <AnimatedSection className="flex flex-col gap-2">
              <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-[#191919]">
                Nyari sesuatu yang spesifik?
              </h2>
              <p className={BODY_CLASS}>
                Konten di bawah ini dulu ada di satu halaman — sekarang tinggal di panduan OS kamu.
              </p>
            </AnimatedSection>
            {LEGACY_STUBS.map((stub) => (
              <div key={stub.id} id={stub.id} className="scroll-mt-24">
                <AnimatedSection className={`rounded-[24px] ${CARD_BORDER} bg-white p-6 flex flex-col gap-2`}>
                  <div className="font-semibold text-[#191919] text-[0.975rem]">{stub.title}</div>
                  <p className="text-[15px] text-[#5F5F5C] leading-relaxed">{stub.body}</p>
                  <div className="flex flex-wrap gap-[0.6rem] mt-1">
                    {stub.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-[0.35rem] text-[0.85rem] font-semibold text-[#191919] border border-[#191919]/20 px-[0.8rem] py-[0.45rem] rounded-full no-underline hover:bg-[#191919] hover:text-white transition-colors"
                      >
                        {l.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </section>

        <HelpFooter heading="Masih bingung mau pilih yang mana?" />
      </div>
    </div>
  );
}
