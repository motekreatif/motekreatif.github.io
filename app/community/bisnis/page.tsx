import { ArrowRight, MessageCircle } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";
import { CorongCuan } from "@/components/community/CorongCuan";

export const metadata = buildMeta({
  title: "Corong Cuan — Kalkulator Marketing Gratis buat Pemilik Bisnis | MOTE",
  description:
    "Corong Cuan: kalkulator marketing gratis dari MOTE buat pemilik bisnis yang mau bawa usahanya ke digital. Isi target omzet, alat ini bongkar mundur berapa pelanggan, jangkauan, & budget iklan yang dibutuhkan — lalu gabung komunitas pebisnis go-digital.",
  path: "/community/bisnis",
});

const WA_GROUP = "https://chat.whatsapp.com/Lo7vyoMqIQB2YFlIDxufq2?mode=gi_t";

const steps = ["Pilih jenis bisnismu", "Isi target omzet & harga", "Lihat corong & ongkosnya"];

const benefits = [
  { icon: "💬", t: "Tanya bebas kalau bingung — marketing, jualan online, tools, semua boleh" },
  { icon: "🤝", t: "Ketemu sesama pebisnis se-fase, gak ngerasa jalan sendirian" },
  { icon: "📈", t: "Belajar dari kasus nyata bisnis lain — apa yang jalan, apa yang boncos" },
  { icon: "🎁", t: "Update ilmu & praktik digital gratis langsung dari tim MOTE" },
  { icon: "🔗", t: "Jejaring = pintu kolaborasi, partner, bahkan pelanggan baru" },
  { icon: "🗿", t: "Lingkungan yang saling dorong buat konsisten, bukan cuma wacana" },
];

export default function CommunityBisnisPage() {
  return (
    <>
      <PageHero
        eyebrow="🗿 Corong Cuan · alat gratis dari MOTE"
        title="Punya target omzet. Tau ongkos marketing-nya?"
        highlight="ongkos marketing"
        description="Corong Cuan itu kalkulator gratis buat pemilik bisnis yang mau serius bawa usahanya ke digital — tapi belum ngerti hitung-hitungannya. Kasih tau target omzet bulananmu, alat ini bongkar mundur: butuh berapa pelanggan, seberapa luas jangkauan, dan berapa budget iklan buat nyampe ke sana."
        actions={
          <>
            <div className="w-full flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <span key={s} className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#06243B] bg-[#06243B]/[0.06] border border-[#06243B]/10 rounded-full px-3.5 py-1.5 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-[#BDF24A] text-[#06243B] inline-flex items-center justify-center text-[12px] font-extrabold">{i + 1}</span>
                  {s}
                </span>
              ))}
            </div>
            <p className="w-full text-sm text-[#06243B]/60 font-semibold mt-1">Gratis · ±30 detik · tanpa daftar, tanpa ribet</p>
          </>
        }
      />

      {/* ═══ KALKULATOR ═══ */}
      <section className="bg-[#F7F4EE]">
        <CorongCuan waGroup={WA_GROUP} />
      </section>

      {/* ═══ CTA KOMUNITAS ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden grain-overlay" style={{ background: "linear-gradient(135deg, #BDF24A 0%, #CDF56A 45%, #BDF24A 100%)" }}>
        <div aria-hidden className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#06243B]/10 blur-3xl z-0" />
        <div aria-hidden className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#FF7E00]/25 blur-3xl z-0" />
        <div className="absolute inset-x-0 top-[5%] h-[260px] z-0 hidden md:block" aria-hidden>
          <RibbonDecoration variant="b" color="#FF7E00" opacity={0.32} strokeWidth={50} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute inset-x-0 bottom-[5%] h-[240px] z-0 hidden md:block" aria-hidden>
          <RibbonDecoration variant="c" color="#06243B" opacity={0.12} strokeWidth={40} delay={0.3} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="container-mote relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center flex flex-col gap-5 items-center">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A]">Kamu barusan lihat mesinnya</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06243B] text-balance">Sekarang bayangin ngejalaninnya tiap hari — bareng yang sefrekuensi.</h2>
            <p className="text-base sm:text-lg text-[#06243B]/85 max-w-2xl">Angka tadi baru 1 channel. Marketing beneran = ngatur &amp; ngukur SEMUA pintu (iklan, organik, WA, pelanggan balik) terus-terusan pakai data. Ada tempat ngumpul pebisnis yang lagi belajar benerin ini bareng — ditemani tim MOTE. Gratis.</p>

            <div className="rounded-2xl bg-[#06243B]/[0.06] border border-[#06243B]/15 px-5 py-4 text-[14.5px] leading-relaxed text-[#06243B] max-w-2xl text-left">
              <b>Pas banget kalau kamu:</b> baru mau serius bawa bisnis ke digital · capek nebak-nebak budget &amp; hasil · mau belajar bareng orang yang sefrekuensi. <b>Bukan</b> buat yang nyari pelet instan atau jalan pintas. 🗿
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-9 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.t} delay={i * 0.06}>
                <div className="flex gap-3 items-start bg-white/40 border border-[#06243B]/10 rounded-2xl px-4 py-3.5 h-full text-[14px] font-medium text-[#06243B]">
                  <span className="text-lg leading-none">{b.icon}</span>
                  <span className="leading-snug">{b.t}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col items-center gap-3 mt-10">
              <a href={WA_GROUP} target="_blank" rel="noopener noreferrer" className="btn btn-dark group">
                <MessageCircle className="h-4 w-4" />
                Gabung Grup Pebisnis Go-Digital — Gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm italic text-[#06243B]/65">MOTE ikut membersamai, bukan menggurui · isinya diskusi &amp; saling bantu, bukan spam jualan.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
