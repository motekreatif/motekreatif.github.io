import Link from "next/link";
import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQSection } from "@/components/shared/FAQSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { TDMO_FAQ, buildServiceJsonLd } from "@/lib/faq";
import { CONTACT } from "@/lib/constants";

export const metadata = buildMeta({
  title: "TDMO — Program Bangun Tim Marketing Internal 6 Bulan",
  description:
    "Program kemitraan strategis 6 bulan untuk owner bisnis yang ingin membangun tim marketing internal yang mandiri, terukur, dan menghasilkan revenue.",
  path: "/tdmo",
});

const problems = [
  {
    bad: "Tim marketing hanya bisa eksekusi",
    badDesc:
      "Mereka bisa bikin konten, tapi tidak bisa mikir strategi. Tidak tahu kenapa posting konten ini, untuk siapa, dan dampaknya apa ke bisnis.",
    good: "Tim berpikir strategis & terstruktur",
    goodDesc:
      "Dengan framework KPI yang jelas, tim tahu apa yang harus dicapai, bagaimana mengukurnya, dan action apa yang perlu diambil.",
  },
  {
    bad: "Owner bingung mengontrol tim",
    badDesc:
      "Sudah hire tim marketing, tapi tidak tahu cara evaluasi. Tidak ada KPI, tidak ada SOP, semua berjalan berdasarkan feeling.",
    good: "SOP & reporting yang otomatis",
    goodDesc:
      "Owner bisa evaluasi tim dengan data, bukan feeling. Sistem berjalan meskipun owner tidak hadir setiap hari.",
  },
  {
    bad: "Marketing tidak terhubung ke revenue",
    badDesc:
      "Budget marketing keluar setiap bulan, tapi tidak tahu berapa yang kembali. Reach naik, tapi omset tetap segitu-gitu aja.",
    good: "Setiap rupiah marketing terukur",
    goodDesc:
      "Financial projection yang rasional menghubungkan setiap aktivitas marketing ke dampak revenue yang bisa diproyeksikan.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Strategic Mentoring",
    text: "Framework KPI, financial projection, content strategy — ilmu yang biasanya hanya dimiliki CMO, ditransfer ke tim kamu.",
  },
  {
    num: "02",
    title: "Execution Support",
    text: "Di awal, MOTE bantu eksekusi sambil mengajar. Seiring waktu, tim kamu take over — dan MOTE jadi pengawas & sparring partner.",
  },
  {
    num: "03",
    title: "AI CRM Automation",
    text: "Sistem otomatis yang merawat database pelanggan, memberikan promo personal, dan menjawab inquiries — tanpa menambah beban kerja staf.",
  },
];

const workflow = [
  {
    num: "01",
    title: "Discovery Call",
    text: "60 menit diskusi gratis. Kami review kondisi bisnis dan tim marketing kamu. Kalau fit, lanjut. Kalau tidak, kami jujur bilang.",
    tag: "GRATIS · TANPA TEKANAN",
  },
  {
    num: "02",
    title: "Diagnostic & Planning",
    text: "Deep dive 1-2 minggu. Kami audit bisnis, tim, performa marketing, dan financial baseline. Output: roadmap 6 bulan yang spesifik untuk bisnis kamu.",
    tag: "1-2 MINGGU",
  },
  {
    num: "03",
    title: "Kickoff & Foundation",
    text: "Program dimulai. Bulan 1-2: MOTE handle execution sambil transfer knowledge. KPI framework terinstal. Tim kamu mulai belajar.",
    tag: "BULAN 1-2",
  },
  {
    num: "04",
    title: "System & Transition",
    text: "Bulan 3-4: AI CRM go-live. Tim kamu mulai lead execution. MOTE shift ke optimization dan advanced mentoring.",
    tag: "BULAN 3-4",
  },
  {
    num: "05",
    title: "Independence & Graduation",
    text: "Bulan 5-6: Tim kamu handle 90% secara mandiri. Stress test, SOP documentation, handover lengkap. Di akhir: graduation — tim kamu siap jalan sendiri.",
    tag: "BULAN 5-6 · HANDOVER LENGKAP",
  },
];

const results = [
  {
    brand: "Home of BEN",
    stat: "Tim Marketing 100% Mandiri",
    desc: "Setelah program selesai, seluruh konten dan aktivasi marketing dihandle tim internal — tanpa MOTE.",
  },
  {
    brand: "Balong Aja",
    stat: "Conversion 2,12% → 3,66%",
    desc: "Peningkatan signifikan dalam 5 bulan melalui strategi multi-kanal kreatif dan berbasis data.",
  },
  {
    brand: "Rancabango Hotel",
    stat: "Occupancy Rate 61%",
    desc: "Mencapai target revenue dalam 6 bulan, dengan occupancy rate di atas rata-rata market.",
  },
];

const whyMote = [
  {
    title: "On-Site Engagement",
    text: "Hadir setiap minggu di tempat kamu — bukan Zoom call yang gampang dibatalkan. Kehadiran fisik adalah bentuk akuntabilitas.",
  },
  {
    title: "Marketing yang Bicara Angka",
    text: "Setiap insight terhubung ke financial outcome bisnis. Bukan vanity metrics — tapi ROI, CAC, LTV, dan revenue projection.",
  },
  {
    title: "AI yang Praktis",
    text: "Implementasi AI CRM yang benar-benar mengurangi beban operasional — bukan buzzword, tapi tools yang terukur dampaknya.",
  },
  {
    title: "Build, Not Just Run",
    text: "Insentif kami selaras dengan kemandirian tim kamu. Klien yang mandiri = case study terbaik = sumber referral terkuat.",
  },
  {
    title: "Lokal, Tapi Tidak Lokal-an",
    text: "Berakar di Garut (keunggulan geografis untuk weekly visit), tapi standar kerja setara agency Jakarta. Biaya lebih rasional, kualitas tidak kompromi.",
  },
];

const waLink = `${CONTACT.whatsappLink}?text=Halo%20MOTE,%20saya%20tertarik%20dengan%20program%20TDMO.%20Boleh%20diskusi?`;

export default function TDMOPage() {
  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          name: "TDMO — Team Development & Marketing Optimization",
          description:
            "Program kemitraan strategis 6 bulan dari Mote Kreatif untuk membangun tim marketing internal yang mandiri: weekly on-site mentoring, KPI framework, financial projection, dan AI CRM automation.",
          path: "/tdmo",
          serviceType: "Marketing Team Development Program",
        })}
      />
      <section className="relative isolate overflow-hidden bg-[#06243B] text-white">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#BDF24A]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-[#FF7E00]/15 blur-3xl"
        />
        <div className="container-mote relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <AnimatedSection className="lg:col-span-7 flex flex-col gap-5">
            <span className="eyebrow eyebrow-on-dark self-start">
              TDMO by Mote Kreatif
            </span>
            <h1 className="font-extrabold leading-[1.05] tracking-tight text-white text-balance">
              Bangun Tim Marketing yang{" "}
              <span className="highlight-text">Mandiri</span> &amp; Terukur.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#EFEBDD] max-w-xl leading-relaxed">
              Program kemitraan strategis 6 bulan untuk owner bisnis yang ingin lepas dari micro-managing tim marketing — dan mulai melihat dampak nyata ke revenue.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                <MessageCircle className="h-4 w-4" />
                Diskusi Gratis 60 Menit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="#tentang" className="btn btn-ghost-light">
                Pelajari TDMO
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 mt-6">
              {[
                { num: "6", label: "Bulan terstruktur" },
                { num: "20+", label: "Modul mentoring" },
                { num: "AI", label: "CRM automation" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-extrabold text-[#BDF24A]">
                    {s.num}
                  </div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-white/70 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-5" delay={0.15}>
            <div className="rounded-3xl p-7 lg:p-8 bg-white/[0.06] border border-white/15 backdrop-blur-sm">
              <span className="eyebrow eyebrow-light">Program Kemitraan</span>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-3 text-white">
                Bukan agency biasa. Ini kemitraan strategis.
              </h2>
              <p className="text-white/80 mt-3 leading-relaxed">
                MOTE hadir on-site setiap minggu untuk membangun kapabilitas tim marketing internal kamu — bukan mengerjakan untuk kamu, tapi membangun bersama kamu.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Weekly On-Site", "KPI Framework", "AI CRM", "Graduation"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#BDF24A] text-[#06243B]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="masalah" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Masalah yang kami temui"
            title="Setiap owner F&B yang kami temui, mengeluhkan hal yang sama."
            description="Apakah kamu juga merasakan salah satunya?"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className="bg-white rounded-3xl p-7 border border-black/5 flex flex-col gap-5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#FF7E00]">
                Sebelum TDMO
              </h3>
              {problems.map((p) => (
                <div key={p.bad} className="flex items-start gap-3">
                  <span className="h-7 w-7 shrink-0 rounded-full bg-[#FF7E00]/15 text-[#FF7E00] flex items-center justify-center">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <div>
                    <h4 className="font-bold text-[#06243B]">{p.bad}</h4>
                    <p className="text-sm text-[#3D4F60] mt-1 leading-relaxed">
                      {p.badDesc}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedSection>
            <AnimatedSection
              delay={0.1}
              className="bg-[#06243B] text-white rounded-3xl p-7 flex flex-col gap-5"
            >
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#BDF24A]">
                Setelah TDMO
              </h3>
              {problems.map((p) => (
                <div key={p.good} className="flex items-start gap-3">
                  <span className="h-7 w-7 shrink-0 rounded-full bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <div>
                    <h4 className="font-bold text-white">{p.good}</h4>
                    <p className="text-sm text-white/70 mt-1 leading-relaxed">
                      {p.goodDesc}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-[#06243B] text-white py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Tentang TDMO"
            title="Bukan agency biasa. Ini kemitraan strategis."
            description="TDMO (Team Development & Marketing Optimization) adalah program 6 bulan di mana tim MOTE hadir on-site di tempat kamu — setiap minggu — untuk membangun kapabilitas tim marketing internal. Bukan mengerjakan untuk kamu, tapi membangun bersama kamu."
            light
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <AnimatedSection
                key={p.num}
                delay={i * 0.08}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6"
              >
                <div className="text-4xl font-extrabold text-[#BDF24A]">{p.num}</div>
                <h3 className="text-xl font-extrabold mt-3 text-white">{p.title}</h3>
                <p className="text-white/75 mt-2 text-sm leading-relaxed">{p.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Cara Kerja"
            title="Dari kenalan sampai graduation, alurnya jelas."
          />
          <div className="mt-12 relative">
            <div
              aria-hidden
              className="absolute left-5 md:left-7 top-2 bottom-2 w-px bg-[#06243B]/15"
            />
            <ol className="flex flex-col gap-6">
              {workflow.map((step, i) => (
                <AnimatedSection
                  key={step.num}
                  delay={i * 0.06}
                  className="relative pl-14 md:pl-20"
                >
                  <div className="absolute left-0 top-0 h-10 w-10 md:h-14 md:w-14 rounded-2xl bg-[#06243B] text-[#BDF24A] flex items-center justify-center font-extrabold text-sm md:text-base">
                    {step.num}
                  </div>
                  <div className="card-soft p-6">
                    <h3 className="text-xl font-extrabold text-[#06243B]">{step.title}</h3>
                    <p className="text-[#3D4F60] mt-2 leading-relaxed">{step.text}</p>
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-[#BDF24A] text-[#06243B]">
                      {step.tag}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="bukti" className="bg-[#BDF24A] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Hasil Nyata"
            title="Bukan teori. Ini hasil kerja."
            description="Beberapa hasil kolaborasi kami dengan brand F&B & leisure di Garut–Bandung."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {results.map((r, i) => (
              <AnimatedSection
                key={r.brand}
                delay={i * 0.08}
                className="bg-white rounded-3xl p-7 border border-black/5"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[#FF7E00]">
                  {r.brand}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#06243B] mt-3 leading-tight">
                  {r.stat}
                </div>
                <p className="text-[#3D4F60] mt-3 text-sm leading-relaxed">{r.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="kenapa" className="bg-[#06243B] text-white py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Kenapa MOTE"
            title="5 hal yang membedakan kami, dan tidak mudah ditiru."
            light
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyMote.map((w, i) => (
              <AnimatedSection
                key={w.title}
                delay={i * 0.06}
                className={`bg-white/[0.06] border border-white/10 rounded-2xl p-6 flex items-start gap-4 ${
                  i === whyMote.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#BDF24A] text-[#06243B] flex items-center justify-center font-extrabold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{w.title}</h3>
                  <p className="text-white/75 mt-1.5 text-sm leading-relaxed">{w.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="mulai" className="bg-[#BDF24A] py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#06243B]/10 blur-3xl"
        />
        <div className="container-mote relative">
          <AnimatedSection className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A]">Mulai Sekarang</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06243B] text-balance">
              Mari mulai dari diskusi 60 menit.
            </h2>
            <p className="text-[#06243B]/80 text-base sm:text-lg max-w-lg">
              Tanpa biaya, tanpa tekanan. Kami review kondisi bisnis dan tim marketing kamu, lalu sampaikan apakah TDMO fit untuk kebutuhanmu.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark group"
              >
                <MessageCircle className="h-4 w-4" />
                Chat via WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`mailto:${CONTACT.email}?subject=Diskusi%20TDMO`}
                className="btn btn-ghost"
              >
                Kirim Email
              </a>
            </div>
            <p className="text-sm italic text-[#06243B]/60 mt-2">
              Kalau cocok, kami submit proposal. Kalau tidak fit, kami jujur bilang.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <FAQSection
        items={TDMO_FAQ}
        title="Pertanyaan seputar TDMO."
        description="Hal-hal yang paling sering ditanyakan owner bisnis sebelum mulai program."
      />
    </>
  );
}
