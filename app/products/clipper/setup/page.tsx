import Link from "next/link";
import { ArrowRight, Clock, Download, Laptop, Apple } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { PaymentNotice } from "./PaymentNotice";
import { HelpFooter } from "./_components/HelpFooter";

const DOWNLOAD_URL = "/downloads/clipper.zip";

export const metadata = buildMeta({
  title: "Panduan Setup Clipper by Mote — Pilih Sistem Operasi",
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
        <code className="px-1.5 py-0.5 rounded bg-[#06243B]/6 font-mono text-[13px]">install.bat</code>.
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
        <code className="px-1.5 py-0.5 rounded bg-[#06243B]/6 font-mono text-[13px]">install.command</code>.
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
        Cara <code className="px-1.5 py-0.5 rounded bg-[#06243B]/6 font-mono text-[13px]">docker compose pull</code>{" "}
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
    <>
      <PageHero
        eyebrow="Clipper · Panduan Setup"
        title="Pasang Clipper di komputer kamu."
        description="Download paketnya, lalu ikuti panduan sesuai laptop kamu. Panduan sekarang dipisah per sistem operasi biar setiap langkah cocok persis dengan yang kamu lihat di layar — bukan konten yang hilang."
      />

      {/* Only renders when iPaymu sent the buyer back here with ?status=success */}
      <PaymentNotice />

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
                  File kecil — cuma pengatur &amp; script. Aplikasi asli ke-download otomatis saat pertama
                  dijalankan, sesuai langkah di panduan OS kamu.
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

      {/* OS choice */}
      <section className="bg-[#06243B] py-16 sm:py-20 text-white">
        <div className="container-mote">
          <div className="max-w-3xl mx-auto flex flex-col gap-7">
            <AnimatedSection className="flex flex-col gap-3">
              <span className="eyebrow eyebrow-on-dark self-start">Langkah berikutnya</span>
              <h2 className="text-white">Kamu pakai laptop apa?</h2>
              <p className="text-white/72 text-[15px]">
                Pilih salah satu — langkah, screenshot, dan estimasi waktunya beda per sistem operasi.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CHOICES.map((c) => (
                <AnimatedSection key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex flex-col gap-[1.1rem] rounded-[24px] border border-white/10 bg-[#0E3450] p-9 shadow-[0_20px_50px_-28px_rgba(2,12,22,0.55)] transition-all duration-200 hover:-translate-y-1.5 hover:border-[#BDF24A]/70 hover:shadow-[0_20px_46px_rgba(189,242,74,0.18),0_0_0_2px_rgba(189,242,74,0.5)]"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="h-16 w-16 rounded-2xl bg-[#06243B] text-[#BDF24A] grid place-items-center shrink-0">
                        <c.icon className={c.iconSize} strokeWidth={2} />
                      </div>
                      <span className="inline-flex items-center gap-[0.4rem] text-[0.8rem] font-bold text-white bg-white/10 px-3 py-[0.35rem] rounded-full">
                        <Clock className="h-3.5 w-3.5 text-white/60" />
                        &plusmn; 30-60 menit pertama kali
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-white">{c.title}</div>
                      <p className="text-white/72 text-[0.95rem] leading-relaxed flex-1 mt-2">{c.body}</p>
                    </div>
                    <span className="inline-flex items-center gap-[0.4rem] font-extrabold text-[#06243B] text-[0.9rem] bg-[#BDF24A] px-[1.15rem] py-[0.65rem] rounded-full w-fit transition-colors group-hover:bg-[#A6D636]">
                      {c.cta}
                      <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy anchor stubs: keep old /setup#update #lancar #troubleshooting links alive */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-mote">
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            <AnimatedSection className="flex flex-col gap-2">
              <h2 className="text-[#06243B] text-[1.25rem]">Nyari sesuatu yang spesifik?</h2>
              <p className="text-[15px] text-[#3D4F60]">
                Konten di bawah ini dulu ada di satu halaman — sekarang tinggal di panduan OS kamu.
              </p>
            </AnimatedSection>
            {LEGACY_STUBS.map((stub) => (
              <div key={stub.id} id={stub.id} className="scroll-mt-24">
                <AnimatedSection className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-6 flex flex-col gap-2">
                  <div className="font-extrabold text-[#06243B] text-[0.975rem]">{stub.title}</div>
                  <p className="text-[15px] text-[#3D4F60]">{stub.body}</p>
                  <div className="flex flex-wrap gap-[0.6rem] mt-1">
                    {stub.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-[0.35rem] text-[0.85rem] font-bold text-[#06243B] bg-white border border-black/[0.14] px-[0.8rem] py-[0.45rem] rounded-full no-underline hover:border-[#06243B] transition-colors"
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
        </div>
      </section>

      <HelpFooter heading="Masih bingung mau pilih yang mana?" />
    </>
  );
}
