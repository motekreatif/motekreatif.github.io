import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Cpu,
  Download,
  HardDrive,
  KeyRound,
  Monitor,
  Palette,
  Sparkles,
  Square,
  Terminal,
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Checklist } from "../_components/Checklist";
import { NoteCallout } from "../_components/NoteCallout";
import { StepRail, type RailStep } from "../_components/StepRail";
import { MiniSteps } from "../_components/MiniSteps";
import { DurationPill } from "../_components/DurationPill";
import { FreeTierLimitsSection } from "../_components/FreeTierLimitsSection";
import { UpdateSection } from "../_components/UpdateSection";
import { FaqAccordion } from "../_components/FaqAccordion";
import { HelpFooter } from "../_components/HelpFooter";
import { SetupHero, HeroMark } from "../_components/SetupHero";
import {
  BLOCK,
  BODY_CLASS,
  BTN_INK,
  BTN_OUTLINE_ON_DARK,
  BTN_YELLOW,
  CARD_BORDER,
  CHIP_LIGHT,
  H2_CLASS,
  INLINE_CODE,
} from "../_components/skin";

const DOWNLOAD_URL = "/downloads/clipper.zip";

export const metadata = buildMeta({
  title: "Panduan Setup Clipper Rumahan — Mac",
  description:
    "Cara pasang Clipper di Mac (Apple Silicon atau Intel): install Docker Desktop, izinkan Gatekeeper, jalankan install.command, dan wizard aktivasi. Lengkap dengan update dan troubleshooting.",
  path: "/products/clipper/setup/mac",
});

const CHECKLIST = [
  { icon: Monitor, title: "macOS versi yang didukung Docker Desktop terbaru", sub: "Cek di menu Apple › About This Mac › macOS." },
  { icon: HardDrive, title: "Disk kosong minimal 15 GB", sub: "Buat aplikasi, model AI, dan klip hasil render." },
  {
    icon: Cpu,
    title: "Chip: Apple Silicon atau Intel",
    sub: "Cek di menu Apple › About This Mac › Chip. Kamu perlu tau ini buat Langkah 1.",
  },
];

const WIZARD_STEPS = [
  { icon: KeyRound, t: "Tempel LICENSE KEY", d: "Format CLIP-XXXX-XXXX-XXXX dari email pembelian kamu, klik Activate." },
  { icon: Palette, t: "Atur BRAND", d: "Nama, logo, dan warna kamu sendiri." },
  { icon: Sparkles, t: "Tempel API key GRATIS", d: "Gemini + Groq, link ambil key-nya muncul langsung di wizard." },
];

const TROUBLESHOOTING = [
  {
    q: `"Docker isn't running"?`,
    a: `Buka Docker Desktop dari Applications dulu, tunggu sampai ikon paus statusnya "running", baru buka install.command lagi. Kalau belum ada Docker, install dari Langkah 1.`,
  },
  {
    q: "Halaman localhost:3060 gak kebuka?",
    a: `Tunggu — download pertama makan beberapa menit. Kalau port 3060 kepakai aplikasi lain, buka docker-compose.yml, ganti angka kiri di baris "3060:3050" (misal jadi 3070:3050), simpan, buka install.command lagi, lalu buka localhost:3070.`,
  },
  {
    q: "Habis restart Mac kok localhost:3060 gak kebuka?",
    a: `Docker Desktop ikut mati saat Mac dimatikan. Nyalain Docker Desktop dulu (tunggu "running"), lalu buka start.command. Detail di bagian "Buka lagi" di atas.`,
  },
  {
    q: "Video-nya minta login / dibatasi umur?",
    a: "Untuk video ber-gate, isi cookies opsional di menu Settings. Video publik biasa gak butuh ini.",
  },
  {
    q: "Klip jadinya di mana?",
    a: `Di folder "clips" tepat di sebelah file install tadi — buka langsung dari Finder, gak perlu download.`,
  },
  {
    q: "Kok di dashboard saya gak ada kartu style?",
    a: `Kartu style hadir di update terbaru. Ikuti bagian "Update ke versi terbaru" di atas. Pengaturan dan klip kamu gak hilang.`,
  },
  {
    q: `Saat update muncul "input/output error" / pull gagal?`,
    a: "Biasanya disk Docker penuh. Pastikan disk kosong minimal 10 GB, restart Docker Desktop, lalu jalankan docker compose pull lagi. Klip dan pengaturan kamu tetap aman.",
  },
];

export default function ClipperSetupMacPage() {
  const steps: RailStep[] = [
    {
      id: "langkah-1",
      num: 1,
      title: "Install Docker Desktop",
      duration: "± 5 menit",
      body: (
        <>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Download Docker Desktop — pastikan pilih build yang cocok sama chip kamu dari Langkah &ldquo;Cek
            dulu&rdquo; di atas (Apple Silicon atau Intel, salah pilih bikin Docker gagal buka). Buka file
            .dmg-nya, lalu drag ikon Docker ke folder Applications.
          </p>
          <div className="flex flex-col gap-[0.55rem]">
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Buka Docker dari folder <b className="text-[#191919]">Applications</b>, bukan dari .dmg
            </p>
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Setujui dialog izin sistem yang muncul saat pertama buka
            </p>
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Tunggu ikon paus di menu bar sampai statusnya &ldquo;running&rdquo;
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://www.docker.com/products/docker-desktop/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN_INK} group text-sm`}
            >
              Download Docker Desktop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </>
      ),
    },
    {
      id: "langkah-2",
      num: 2,
      title: "Download & extract",
      duration: "± 5 menit",
      body: (
        <>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Download paket Clipper, extract ZIP-nya, buka foldernya. File yang kamu jalankan adalah{" "}
            <code className={INLINE_CODE}>install.command</code>.
          </p>
          <NoteCallout variant="calm" icon={CircleHelp}>
            File <code className={INLINE_CODE}>install.bat</code>{" "}
            itu buat Windows — abaikan.
          </NoteCallout>
          <div className="flex flex-col gap-[0.55rem]">
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <span className="float-left mt-[0.1rem] mr-[0.6rem] h-[22px] w-[22px] rounded-full bg-[#F7C526] text-[#191919] text-[0.7rem] font-bold grid place-items-center">
                1
              </span>
              Klik kanan{" "}
              <code className={INLINE_CODE}>install.command</code> ›
              pilih <b className="text-[#191919]">Open</b> (bukan dobel-klik biasa)
            </p>
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <span className="float-left mt-[0.1rem] mr-[0.6rem] h-[22px] w-[22px] rounded-full bg-[#F7C526] text-[#191919] text-[0.7rem] font-bold grid place-items-center">
                2
              </span>
              macOS nampilin peringatan — klik <b className="text-[#191919]">Open</b> lagi di dialog konfirmasinya
            </p>
          </div>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Ini normal buat aplikasi yang di-download:{" "}
            <code className={INLINE_CODE}>install.command</code>{" "}
            belum dinotarisasi ke Apple, jadi Gatekeeper blokir di percobaan pertama. Bukan virus — ini script
            lokal kamu sendiri.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href={DOWNLOAD_URL} className={`${BTN_YELLOW} group`} download>
              Download clipper.zip
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <span className="text-sm text-[#5F5F5C]">
              Butuh <b className="text-[#191919]">license key</b> dari email pembelian kamu.
            </span>
          </div>
        </>
      ),
    },
    {
      id: "langkah-3",
      num: 3,
      title: "Jalankan",
      duration: "± 20 menit, mostly nunggu",
      body: (
        <>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Setelah lolos dialog Gatekeeper di Langkah 2. Ini yang bakal kamu lihat, berurutan:
          </p>
          <MiniSteps
            items={[
              { num: "0-1", title: "Menit 0-1: mengecek Docker", text: "Cepat — cuma mastiin Docker Desktop udah nyala." },
              {
                num: "1-20",
                title: "Menit 1-20: layar diam",
                text: (
                  <>
                    Ini lagi mengunduh aplikasinya, ±2 GB, <b className="text-[#191919]">sekali seumur hidup</b>.
                    Alasannya: worker Clipper bawa model AI transkripsi &amp; deteksi wajah sendiri, biar semuanya
                    jalan 100% lokal tanpa API berbayar. Angka nyata: worker 3,8 GB + web 619 MB di disk, sekitar
                    1,5-2 GB terkompresi lewat jaringan. Di Apple Silicon, tahap ini terasa sedikit lebih lama
                    karena emulasi — lihat catatan di &ldquo;Cek dulu&rdquo; di atas.
                  </>
                ),
              },
              {
                num: "→",
                title: "Lalu browser terbuka sendiri",
                text: (
                  <>
                    Ke <code className={INLINE_CODE}>localhost:3060</code>,
                    langsung masuk wizard aktivasi.
                  </>
                ),
              },
            ]}
          />
          <NoteCallout variant="calm" icon={Terminal}>
            Jendela Terminal <b className="text-[#191919]">menutup sendiri</b> setelah kamu buka install.command —
            itu normal, terjadi baik pas berhasil maupun gagal. Cara mastiin lolos: cek apakah file{" "}
            <code className={INLINE_CODE}>.env</code> muncul di
            folder yang sama. Kalau ada, berarti sudah lolos cek Docker.
          </NoteCallout>
        </>
      ),
    },
    {
      id: "langkah-4",
      num: 4,
      title: "Wizard 3 langkah",
      duration: "± 2 menit",
      body: (
        <>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Begitu browser kebuka, wizard nuntun kamu. Gak ada bikin akun atau password.
          </p>
          <ol className="flex flex-col gap-3">
            {WIZARD_STEPS.map((s) => (
              <li key={s.t} className="flex gap-3">
                <span className="shrink-0 mt-0.5 grid place-items-center h-7 w-7 rounded-full bg-[#F7C526]">
                  <s.icon className="h-4 w-4 text-[#191919]" />
                </span>
                <span className="text-[15px] text-[#5F5F5C]">
                  <b className="text-[#191919]">{s.t}</b> — {s.d}
                </span>
              </li>
            ))}
          </ol>
        </>
      ),
    },
  ];

  return (
    <div data-skin="clipper" className="bg-[#EFEFEC] text-[#191919]">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-5 py-3 sm:py-5 space-y-3 sm:space-y-5">
        <SetupHero
          eyebrow="Clipper · Setup Mac"
          title={
            <>
              Pasang Clipper <HeroMark>di Mac.</HeroMark>
            </>
          }
          description="Total waktu jujur: 30-60 menit di percobaan pertama, dan hampir semuanya cuma nunggu unduhan ±2 GB. Buka lagi berikutnya tinggal hitungan detik."
          actions={
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-wrap gap-2">
                <DurationPill tone="dark">Pertama kali: 30-60 menit</DurationPill>
                <DurationPill tone="dark">Buka lagi: hitungan detik</DurationPill>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#preflight" className={`${BTN_YELLOW} group`}>
                  Cek kesiapan dulu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/products/clipper/setup" className={BTN_OUTLINE_ON_DARK}>
                  Kembali pilih OS
                </Link>
              </div>
            </div>
          }
        />

        {/* Preflight */}
        <section id="preflight" className={`${BLOCK} bg-white px-4 py-14 sm:px-10 sm:py-20 scroll-mt-24`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-10">
            <AnimatedSection className="flex flex-col gap-3">
              <h2 className={H2_CLASS}>Cek dulu 3 hal.</h2>
              <p className={BODY_CLASS}>
                Gak ada yang bakal blokir instalasi kamu — ini cuma biar kamu tau apa yang bakal kamu lihat.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <Checklist items={CHECKLIST} />
            </AnimatedSection>

            <AnimatedSection>
              <NoteCallout variant="calm" icon={CircleHelp}>
                <b className="text-[#191919]">Catatan jujur buat Apple Silicon (M1-M4):</b> image Clipper kami
                dibangun buat amd64 (Intel), jadi di Mac M-series dia jalan lewat emulasi dan sedikit lebih lambat —
                itu bukan produk rusak. Di Windows / Mac Intel, image ini jalan native, penuh performa.
              </NoteCallout>
            </AnimatedSection>
          </div>
        </section>

        {/* Langkah demi langkah */}
        <section className={`${BLOCK} bg-[#F1F1EE] px-4 py-14 sm:px-10 sm:py-20`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-10">
            <AnimatedSection className="flex flex-col gap-3">
              <h2 className={H2_CLASS}>Dari download sampai klip pertama.</h2>
              <p className={BODY_CLASS}>
                Empat langkah. Kebanyakan kamu cuma nunggu — jendelanya jangan ditutup.
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <StepRail steps={steps} />
            </AnimatedSection>
          </div>
        </section>

        <FreeTierLimitsSection />

        {/* Buka lagi */}
        <section id="buka-lagi" className={`${BLOCK} bg-[#F1F1EE] px-4 py-14 sm:px-10 sm:py-20 scroll-mt-24`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-7">
            <AnimatedSection className="flex flex-col gap-3">
              <h2 className={H2_CLASS}>Habis matiin laptop? Buka lagi gampang.</h2>
              <p className={BODY_CLASS}>
                Kamu <b className="text-[#191919]">gak perlu install ulang</b>. Cukup tiga langkah ini.
              </p>
            </AnimatedSection>
            <AnimatedSection className={`rounded-[24px] ${CARD_BORDER} bg-white p-[1.65rem]`}>
              <MiniSteps
                items={[
                  {
                    num: "1",
                    title: "Nyalain Docker Desktop",
                    text: `Buka dari Applications, tunggu sampai ikon paus di menu bar statusnya "running".`,
                  },
                  { num: "2", title: "Buka start.command", text: "Atau buka install.command lagi — aman, gak ngulang download." },
                  {
                    num: "3",
                    title: "Buka localhost:3060",
                    text: "Aplikasi kebuka lagi persis seperti terakhir kali — lisensi & pengaturan tetap tersimpan.",
                  },
                ]}
              />
            </AnimatedSection>
            <AnimatedSection>
              <NoteCallout variant="calm" icon={Square} className="bg-white">
                <b className="text-[#191919]">Mau berhenti sementara?</b> Buka{" "}
                <code className={INLINE_CODE}>stop.command</code>.
                Klip yang sudah jadi tetap ada di folder &ldquo;clips&rdquo;.
              </NoteCallout>
            </AnimatedSection>
          </div>
        </section>

        <UpdateSection
          terminalInstruction={
            <>
              Nyalain Docker Desktop dulu (tunggu &ldquo;running&rdquo;, pastikan disk kosong minimal 10 GB). Buka
              Terminal, ketik <code className={INLINE_CODE}>cd </code>,
              seret folder Clipper kamu ke jendela Terminal, Enter. Lalu jalankan:
            </>
          }
        />

        {/* Troubleshooting */}
        <section id="troubleshooting" className={`${BLOCK} bg-[#E7E7E3] px-4 py-14 sm:px-10 sm:py-20 scroll-mt-24`}>
          <div className="mx-auto max-w-3xl flex flex-col gap-8">
            <AnimatedSection className="flex flex-col gap-3">
              <span className={`${CHIP_LIGHT} self-start`}>Kalau nyangkut</span>
              <h2 className={H2_CLASS}>Yang paling sering ditanyain.</h2>
            </AnimatedSection>
            <AnimatedSection>
              <FaqAccordion items={TROUBLESHOOTING} />
            </AnimatedSection>
          </div>
        </section>

        <HelpFooter />
      </div>
    </div>
  );
}
