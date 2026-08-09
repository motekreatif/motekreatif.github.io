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
  RefreshCw,
  Sparkles,
  Square,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Checklist } from "../_components/Checklist";
import { NoteCallout } from "../_components/NoteCallout";
import { CollapsiblePanel, Branch, Divider } from "../_components/CollapsiblePanel";
import { CmdBlock } from "../_components/CmdBlock";
import { ShotFigure } from "../_components/ShotFigure";
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
  title: "Panduan Setup Clipper Rumahan — Windows",
  description:
    "Cara pasang Clipper di Windows 10/11: cek virtualization, install Docker Desktop, jalankan install.bat, dan wizard aktivasi. Lengkap dengan update dan troubleshooting.",
  path: "/products/clipper/setup/windows",
});

const CHECKLIST = [
  { icon: Monitor, title: "Windows 10 atau 11, versi 64-bit", sub: "Cek di Settings › System › About › System type." },
  { icon: HardDrive, title: "Disk kosong minimal 15 GB", sub: "Buat aplikasi, model AI, dan klip hasil render." },
  {
    icon: Cpu,
    title: "Virtualization aktif di CPU kamu",
    sub: "Buka Task Manager › Performance › CPU, lihat baris Virtualization di kanan bawah.",
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
    a: `Buka Docker Desktop dulu, tunggu sampai ikonnya hijau / bertulisan "running", baru dobel-klik install lagi. Kalau belum ada Docker, install dari Langkah 1.`,
  },
  {
    q: "Halaman localhost:3060 gak kebuka?",
    a: `Tunggu — download pertama makan beberapa menit. Kalau port 3060 kepakai aplikasi lain, buka docker-compose.yml, ganti angka kiri di baris "3060:3050" (misal jadi 3070:3050), simpan, dobel-klik install lagi, lalu buka localhost:3070.`,
  },
  {
    q: "Habis restart laptop kok localhost:3060 gak kebuka?",
    a: `Docker Desktop ikut mati saat laptop dimatikan. Nyalain Docker Desktop dulu (tunggu "running"), lalu dobel-klik start.bat. Detail di bagian "Buka lagi" di atas.`,
  },
  {
    q: "Video-nya minta login / dibatasi umur?",
    a: "Untuk video ber-gate, isi cookies opsional di menu Settings. Video publik biasa gak butuh ini.",
  },
  {
    q: "Klip jadinya di mana?",
    a: `Di folder "clips" tepat di sebelah file install tadi — buka langsung dari Explorer, gak perlu download.`,
  },
  {
    q: "Kok di dashboard saya gak ada kartu style?",
    a: `Kartu style hadir di update terbaru. Ikuti bagian "Update ke versi terbaru" di atas. Pengaturan dan klip kamu gak hilang.`,
  },
  {
    q: `Saat update muncul "input/output error" / pull gagal?`,
    a: "Biasanya disk Docker penuh. Pastikan disk kosong minimal 10 GB, restart Docker Desktop, lalu jalankan docker compose pull lagi. Klip dan pengaturan kamu tetap aman.",
  },
  {
    q: `Muncul "Windows protected your PC" saat buka install.bat?`,
    a: "Itu SmartScreen, normal buat file yang di-download. Klik More info, lalu Run anyway.",
  },
];

export default function ClipperSetupWindowsPage() {
  const steps: RailStep[] = [
    {
      id: "langkah-1",
      num: 1,
      title: "Install Docker Desktop",
      duration: "± 5 menit",
      body: (
        <>
          <p className="text-[#5F5F5C] text-[0.975rem] leading-[1.7]">
            Download Docker Desktop, lalu jalankan installer-nya <b className="text-[#191919]">as Administrator</b>{" "}
            (klik kanan › Run as administrator). Clipper jalan di dalam Docker biar rapi dan gak ngotorin komputer
            kamu.
          </p>
          <div className="flex flex-col gap-[0.55rem]">
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Pilih <b className="text-[#191919]">All-users installation</b>
            </p>
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Centang <b className="text-[#191919]">&ldquo;Use WSL 2 instead of Hyper-V&rdquo;</b>
            </p>
            <p className="block text-[0.95rem] text-[#5F5F5C] leading-[1.55]">
              <CheckCircle2 className="float-left mt-[0.1rem] mr-[0.6rem] h-4 w-4 text-[#191919]" />
              Biarkan <b className="text-[#191919]">&ldquo;Allow Windows Containers&rdquo;</b> kosong
            </p>
          </div>
          <ShotFigure
            src="/img/clipper/setup/win-docker-configuration.webp"
            alt="Dialog Configuration saat instalasi Docker Desktop di Windows"
            caption="Dialog Configuration installer Docker Desktop — cocokkan pilihanmu dengan yang ini."
            width={1400}
            height={787}
          />
          <NoteCallout variant="calm" icon={RefreshCw}>
            Restart komputer <b className="text-[#191919]">SESUDAH</b> instalasi selesai, bukan sebelumnya.
          </NoteCallout>
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
          <CollapsiblePanel summary="Kalau Docker minta update WSL">
            <Branch>
              Buka PowerShell <b className="text-[#191919]">as Administrator</b>, jalankan dua perintah ini satu per
              satu.
            </Branch>
            <CmdBlock command="wsl --update" />
            <CmdBlock command="wsl --set-default-version 2" />
            <Branch>
              <b className="text-[#191919]">Quit Docker Desktop dari system tray</b> (klik kanan ikonnya › Quit),
              lalu buka lagi.
            </Branch>
            <NoteCallout variant="check" icon={TriangleAlert}>
              <b className="text-[#191919]">Kalau perintahnya gagal atau gak dikenal:</b> download manual{" "}
              <code className={INLINE_CODE}>wsl_update_x64.msi</code>{" "}
              dari Microsoft, install, lalu ulangi dari atas.
            </NoteCallout>
          </CollapsiblePanel>
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
            Download paket Clipper, extract ZIP-nya, buka foldernya, lalu jalankan{" "}
            <code className={INLINE_CODE}>install.bat</code>.
          </p>
          <NoteCallout variant="calm" icon={CircleHelp}>
            File{" "}
            <code className={INLINE_CODE}>install.command</code> itu
            buat Mac — abaikan.
          </NoteCallout>
          <ShotFigure
            src="/img/clipper/setup/win-folder-contents.webp"
            alt="Isi folder hasil extract, terlihat install.bat dan install.command"
            caption="Isi folder hasil extract — yang kamu jalankan cuma install.bat."
            width={1400}
            height={792}
          />
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
            Dobel-klik <code className={INLINE_CODE}>install.bat</code>.
            Ini yang bakal kamu lihat, berurutan:
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
                    1,5-2 GB terkompresi lewat jaringan.
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
          {/* The cmd screenshot that used to sit here was taken before the
              installer's download message was corrected: it still showed the
              old "a few hundred MB" line, contradicting the honest ~2 GB figure
              stated a few lines above it. A screenshot that argues with its own
              page is worse than no screenshot, so it is out until a fresh one
              is taken from a machine running the corrected install.bat. */}
          <NoteCallout variant="calm" icon={Terminal}>
            Jendela cmd <b className="text-[#191919]">menutup sendiri</b> setelah kamu dobel-klik — itu normal,
            terjadi baik pas berhasil maupun gagal. Cara mastiin lolos: cek apakah file{" "}
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
          eyebrow="Clipper · Setup Windows"
          title={
            <>
              Pasang Clipper <HeroMark>di Windows.</HeroMark>
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
                Tiga menit ngecek ini bisa hindarin kamu install ulang. Kalau semua lolos, langsung lanjut ke Langkah
                1.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <Checklist items={CHECKLIST} />
            </AnimatedSection>

            <AnimatedSection className="flex flex-col gap-3">
              <NoteCallout variant="calm" icon={CheckCircle2} label="Kalau Enabled">
                Lanjut langsung ke{" "}
                <a href="#langkah-1" className="text-[#191919] font-bold underline underline-offset-2">
                  Langkah 1 ›
                </a>
              </NoteCallout>
              <NoteCallout variant="check" icon={TriangleAlert} label="Kalau Disabled, atau gak nemu barisnya">
                Buka panel di bawah — salah satu dari tiga penyebab ini yang berlaku buat kamu.
              </NoteCallout>
            </AnimatedSection>

            <AnimatedSection>
              <CollapsiblePanel summary="Virtualization mati atau gak kedeteksi — cek 3 penyebab">
                <ShotFigure
                  src="/img/clipper/setup/win-virtualization-not-detected.webp"
                  alt="Docker Desktop menampilkan pesan Virtualization support not detected"
                  caption="Docker Desktop kalau CPU virtualization belum aktif — pesannya persis begini."
                  width={1400}
                  height={795}
                />
                <Branch title="PC atau laptop biasa">
                  Nyalakan <b className="text-[#191919]">Intel VT-x / AMD-V (kadang disebut SVM Mode)</b> di BIOS.
                  Tombol masuk BIOS beda-beda tiap merek — cari &ldquo;cara enable virtualization [merek laptop
                  kamu]&rdquo; di Google buat tombolnya.
                </Branch>
                <Divider />
                <Branch title={`PowerShell bilang "wsl" gak dikenal`}>
                  Buka PowerShell <b className="text-[#191919]">as Administrator</b>, jalankan perintah ini, lalu
                  restart komputer.
                </Branch>
                <CmdBlock command="wsl --install" />
                <Divider />
                <Branch title="Komputer virtual atau VPS tanpa nested virtualization">
                  Jujur: <b className="text-[#191919]">ini gak bisa jalan</b>. Hubungi kami dulu sebelum lanjut
                  install.
                </Branch>
                <NoteCallout variant="calm" icon={CircleHelp}>
                  <b className="text-[#191919]">Login akun Docker gak memperbaiki ini.</b> Docker suka nampilin
                  tombol &ldquo;Sign in&rdquo; yang kelihatannya kayak solusi — itu gak ada hubungannya sama
                  virtualization.
                </NoteCallout>
              </CollapsiblePanel>
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
                  { num: "1", title: "Nyalain Docker Desktop", text: `Tunggu sampai statusnya "running". Ini yang paling sering kelupaan.` },
                  { num: "2", title: "Dobel-klik start.bat", text: "Atau dobel-klik install.bat lagi — aman, gak ngulang download." },
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
                <b className="text-[#191919]">Mau berhenti sementara?</b> Dobel-klik{" "}
                <code className={INLINE_CODE}>stop.bat</code>. Klip
                yang sudah jadi tetap ada di folder &ldquo;clips&rdquo;.
              </NoteCallout>
            </AnimatedSection>
          </div>
        </section>

        <UpdateSection
          terminalInstruction={
            <>
              Nyalain Docker Desktop dulu (tunggu &ldquo;running&rdquo;, pastikan disk kosong minimal 10 GB). Buka
              folder Clipper, klik address bar, ketik{" "}
              <code className={INLINE_CODE}>cmd</code>, Enter. Lalu
              jalankan:
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
