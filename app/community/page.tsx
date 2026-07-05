import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

export const metadata = buildMeta({
  title: "Komunitas MOTE — Pilih Jalurmu · Kreatif atau Pemilik Bisnis",
  description:
    "Selamat datang di Komunitas MOTE. Kamu mau gabung sebagai pekerja industri kreatif (Masyarakat MOTE) atau pemilik bisnis yang mau bawa usahanya ke digital? Pilih jalurmu — dua-duanya gratis & terbuka.",
  path: "/community",
});

const choices = [
  {
    href: "/community/kreatif",
    emoji: "🎨",
    accent: "#0F5A34",
    accentBg: "rgba(189,242,74,0.22)",
    kicker: "Masyarakat MOTE",
    title: "Pekerja Industri Kreatif",
    desc: "Desainer, marketer, kreator, freelancer — yang mau tumbuh, berjejaring, dan jalan terus di industri kreatif. Kelas gratis + teman seperjalanan.",
    cta: "Masuk Masyarakat MOTE",
  },
  {
    href: "/community/bisnis",
    emoji: "🏪",
    accent: "#FF7E00",
    accentBg: "rgba(255,126,0,0.14)",
    kicker: "Pebisnis Go-Digital",
    title: "Pemilik Bisnis",
    desc: "Punya usaha & mau bawa ke digital tapi belum ngerti hitungannya. Mulai dari cek ongkos marketingmu lewat Corong Cuan — lalu ngumpul bareng pebisnis se-fase.",
    cta: "Cek & Gabung Pebisnis",
  },
];

export default function CommunityGatePage() {
  return (
    <section
      className="relative isolate overflow-hidden text-[#06243B] grain-overlay min-h-[78vh] flex items-center"
      style={{ background: "linear-gradient(135deg, #F4D23A 0%, #F7DF75 50%, #F4D23A 100%)" }}
    >
      <div aria-hidden className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#BDF24A]/40 blur-3xl z-0" />
      <div aria-hidden className="absolute -bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#FF7E00]/20 blur-3xl z-0" />
      <div className="absolute inset-x-0 top-[10%] h-[220px] z-0 hidden sm:block" aria-hidden>
        <RibbonDecoration variant="a" color="#BDF24A" opacity={0.5} strokeWidth={40} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="absolute inset-x-0 bottom-[6%] h-[220px] z-0 hidden sm:block" aria-hidden>
        <RibbonDecoration variant="b" color="#FF7E00" opacity={0.28} strokeWidth={38} delay={0.3} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="container-mote relative z-10 py-16 sm:py-20 w-full">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <AnimatedSection>
            <span className="eyebrow eyebrow-on-yellow">Selamat datang di Komunitas MOTE 🗿</span>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1 className="font-extrabold leading-[1.05] tracking-tight text-[#06243B] text-balance">
              Kamu mau gabung sebagai <span className="highlight-text">apa</span>?
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-base sm:text-lg text-[#06243B]/75 leading-relaxed max-w-xl">
              Biar kami arahin ke tempat yang paling pas buatmu. Pilih satu — dua-duanya gratis & terbuka.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto">
          {choices.map((c, i) => (
            <AnimatedSection key={c.href} delay={0.18 + i * 0.1}>
              <Link href={c.href} className="card-soft group block h-full p-7 sm:p-8 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06243B]/20 rounded-[20px]">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: c.accentBg }}
                >
                  {c.emoji}
                </div>
                <div className="text-[11px] font-extrabold tracking-widest uppercase mt-5" style={{ color: c.accent }}>
                  {c.kicker}
                </div>
                <div className="font-extrabold text-2xl mt-1 text-[#06243B]">{c.title}</div>
                <p className="text-[14.5px] leading-relaxed text-[#3D4F60] mt-2.5">{c.desc}</p>
                <div
                  className="inline-flex items-center gap-2 mt-5 font-extrabold text-[15px]"
                  style={{ color: c.accent }}
                >
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="text-center text-sm italic text-[#06243B]/60 mt-8">
            Belum yakin? Tenang — kamu bisa balik ke sini kapan aja dan pilih jalur yang satunya.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
