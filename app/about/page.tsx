import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";
import { CTASection } from "@/components/home/CTASection";
import { SimpulKnot } from "@/components/about/SimpulKnot";
import { CONTACT } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Tentang MOTE — Bukan Sekadar Agency | Pemantik Energi Muda dari Garut",
  description:
    "MOTE bukan cuma digital marketing agency. Kami pemantik: nyalain energi anak muda dan ngasih salurannya jadi karya, keahlian, bisnis, dan dampak buat kota — mulai dari Garut. Di balik semuanya: Masyarakat Modal Tekun.",
  path: "/about",
});

const threads = [
  { dot: "#BDF24A", name: "Bakat muda", desc: "Generasi muda yang energinya melimpah tapi belum ketemu panggung dan arah." },
  { dot: "#FF7E00", name: "Industri kreatif", desc: "Skill, karya, dan ide kreatif yang butuh disambungin ke nilai yang nyata." },
  { dot: "#06243B", name: "Bisnis & sosial", desc: "UMKM, brand, dan kota yang butuh pertumbuhan yang berkelanjutan — bukan sekali panen." },
];

const instruments = [
  { tag: "Utas bisnis · yang kamu kenal", name: "Layanan", desc: "Creative, digital performance, dan konsultan. Inilah MOTE KREATIF — wajah komersial yang paling keliatan hari ini.", pills: ["Creative", "Digital Performance", "Konsultan"] },
  { tag: "Utas talenta", name: "Pengembangan SDM", desc: "Nyetak & nemenin anak muda naik kelas — dari nol sampai layak dipakai industri.", pills: ["Kelas", "Workshop", "Bootcamp", "Internship"] },
  { tag: "Utas sosial", name: "Campaign Sosial", desc: "Balikin lagi ke kota: pemberdayaan UMKM dan generasi muda biar dampaknya kerasa di luar klien.", pills: ["Pemberdayaan UMKM", "Pemberdayaan Generasi Muda"] },
];

type EcoItem = { name: string; href: string; ext?: boolean; badge: string; soon?: boolean; desc: React.ReactNode };

const products: EcoItem[] = [
  { name: "Mote Blaster", href: "https://blaster.motekreatif.com", ext: true, badge: "Live", desc: "WhatsApp CRM buat bisnis yang serius kelola pelanggan." },
  { name: "Modal Tekun", href: "https://mt.motekreatif.com", ext: true, badge: "Live", desc: "Aplikasi keuangan keluarga yang gampang dipakai siapa aja di rumah." },
  { name: "Klir", href: "https://klir.motekreatif.com", ext: true, badge: "Live", desc: "Akuntansi yang dibikin simpel buat UMKM." },
  { name: "Mote Capture", href: "/products", badge: "Segera", soon: true, desc: "Photobooth digital lewat browser buat event & aktivasi brand." },
];
const sosial: EcoItem[] = [
  { name: "Pemberdayaan UMKM", href: "/community/bisnis", badge: "Kampanye", desc: "Bantu usaha kecil naik kelas — bukan cuma yang jadi klien berbayar." },
  { name: "Pemberdayaan Generasi Muda", href: "/community/kreatif", badge: "Kampanye", desc: "Ngajak anak muda ikut hidup di skena kreatif kotanya sendiri." },
];

function EcoCard({ item }: { item: EcoItem }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-extrabold text-[#06243B] leading-tight group-hover:text-[#06243B] flex items-center gap-1.5">
          {item.name}
          <ArrowUpRight className="h-3.5 w-3.5 text-[#6B6559] opacity-45 transition-all group-hover:opacity-100 group-hover:text-[#FF7E00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h4>
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${item.soon ? "bg-[#BDF24A] text-[#06243B]" : "bg-[#06243B]/[0.13] text-[#06243B]"}`}>{item.badge}</span>
      </div>
      <p className="text-[13.5px] text-[#3D4F60] leading-relaxed mt-2">{item.desc}</p>
    </>
  );
  const cls = "group block bg-white border border-[#06243B]/[0.08] rounded-2xl p-5 transition-all hover:border-[#BDF24A]/60 hover:-translate-y-[3px] hover:shadow-[0_10px_24px_-16px_rgba(6,36,59,0.28)]";
  return item.ext ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={item.href} className={cls}>{inner}</Link>
  );
}

const EcoLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11.5px] font-extrabold tracking-[0.13em] uppercase text-[#FF7E00] mb-4">{children}</div>
);

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Siapa MOTE — sebenarnya"
        title="Anak muda punya energi berlebih. Yang kurang cuma salurannya."
        highlight="salurannya"
        description="MOTE lahir buat mantik energi itu — lalu ngasih saluran, biar dia jadi karya, keahlian, bisnis, dan dampak buat kotanya. Orang kenal kami sebagai agency. Itu baru saluran yang paling keliatan."
      />

      {/* KENAPA KAMI ADA — PEMANTIK */}
      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote max-w-4xl">
          <AnimatedSection className="flex flex-col">
            <span className="eyebrow self-start mb-6">Kenapa kami ada</span>
            <h2 className="text-[clamp(1.5rem,3.6vw,2.4rem)] font-extrabold tracking-tight leading-[1.18] text-[#06243B] max-w-[20ch]">
              Kami <span className="text-[#0F5A34]">pemantik</span>. Tugas kami nyalain — lalu ngeributin.
            </h2>
            <p className="text-lg text-[#3D4F60] leading-relaxed mt-6 max-w-[62ch]">Di kota-kota berkembang, energi paling besar justru yang paling nganggur: anak mudanya. Energinya melimpah, tapi salurannya seret — jadi kececer, atau kabur ke kota lain.</p>
            <p className="text-[#3D4F60] leading-relaxed mt-4 max-w-[62ch]">Dan cara-cara lama buat ngatasinnya banyak yang mentok: nunggu lowongan, nunggu program, nunggu giliran dari pusat. MOTE ada buat <b className="text-[#06243B]">memprovokasi</b> — biar &ldquo;ada cara lain yang lebih baik&rdquo; gak berhenti jadi wacana. Kami pantik terus, ributin terus, sampai cara itu mulai dilihat sebagai <b className="text-[#06243B]">solusi</b> — bukan idealisme.</p>
            <p className="text-lg text-[#3D4F60] leading-relaxed mt-8 max-w-[62ch]">Karena kami percaya satu hal: <b className="text-[#06243B]">energi anak muda adalah solusi paling potensial</b> buat masalah pertumbuhan sebuah kota. Bukan modal besar. Bukan investor luar. Bukan nunggu giliran dari pusat.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* SIMPUL */}
      <section className="bg-[#06243B] text-white py-20 sm:py-24 relative overflow-hidden grain-overlay">
        <div className="container-mote relative z-10">
          <SimpulKnot />
        </div>
      </section>

      {/* TIGA UTAS + INSTRUMEN */}
      <section className="bg-white py-20 sm:py-24 border-y border-[#E7DDC9]">
        <div className="container-mote">
          <span className="eyebrow">Tiga utas, satu simpul</span>
          <h2 className="mt-4 max-w-3xl">Yang kami satuin</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {threads.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.08}>
                <div className="rounded-2xl p-6 border border-[#06243B]/[0.08] bg-white h-full">
                  <span className="w-3.5 h-3.5 rounded-full inline-block" style={{ background: t.dot }} />
                  <h3 className="text-lg font-extrabold text-[#06243B] mt-3 mb-1.5">{t.name}</h3>
                  <p className="text-sm text-[#3D4F60] leading-relaxed">{t.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-lg text-[#3D4F60] leading-relaxed mt-8 max-w-[60ch]"><b className="text-[#06243B]">MOTE simpul yang nautin ketiganya.</b> Dan kami ngiketnya lewat tiga instrumen — bukan cuma agency.</p>
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {instruments.map((ins, i) => (
              <AnimatedSection key={ins.name} delay={i * 0.08}>
                <div className="card-soft p-6 h-full">
                  <div className="text-[11px] font-extrabold tracking-widest uppercase text-[#FF7E00]">{ins.tag}</div>
                  <h3 className="text-xl font-extrabold text-[#06243B] mt-2">{ins.name}</h3>
                  <p className="text-sm text-[#3D4F60] leading-relaxed mt-2">{ins.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ins.pills.map((p) => (
                      <span key={p} className="text-[12px] font-semibold rounded-full px-3 py-1 bg-[#F7F4EE] border border-[#E7DDC9] text-[#06243B]">{p}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-xs text-[#6B6559] mt-6">Tiga instrumen keliatan beda. Tapi diikat satu keyakinan yang sama.</p>
        </div>
      </section>

      {/* EKOSISTEM */}
      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <span className="eyebrow">Bukti, bukan klaim</span>
          <h2 className="mt-4 max-w-3xl">Satu keyakinan. Banyak wujud.</h2>
          <p className="text-lg text-[#3D4F60] leading-relaxed mt-5 max-w-[62ch]">Kalau MOTE cuma agency, daftar ini gak akan sepanjang ini. Tiap wujud di bawah = satu utas yang lagi kami iket ke simpul yang sama.</p>

          {/* Agency */}
          <div className="mt-9">
            <EcoLabel>◆ Agency — utas bisnis</EcoLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              <EcoCard item={{ name: "MOTE KREATIF", href: "/services", badge: "Jalan", desc: "Digital marketing agency & consultant. Wajah komersial yang bikin mesin ekosistem ini tetap kebiayain jalan." }} />
            </div>
          </div>

          {/* Produk digital */}
          <div className="mt-9">
            <EcoLabel>◆ Produk digital — dipakai dulu sebelum dijual</EcoLabel>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => <EcoCard key={p.name} item={p} />)}
            </div>
          </div>

          {/* Kelas MOTE + spektrum */}
          <div className="mt-9">
            <EcoLabel>◆ Kelas MOTE — pemantik &amp; komunitasnya</EcoLabel>
            <AnimatedSection>
              <div className="bg-white border border-[#06243B]/[0.08] rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#06243B]">Kelas MOTE</h3>
                    <p className="text-sm text-[#3D4F60] leading-relaxed mt-2 max-w-[62ch]">Gerakan &amp; kelas gratis yang mantik anak muda buat tumbuh — bukan lembaga formal. Dia nyalain, ngeributin, lalu nemenin. Dan MOTE sengaja mantik dari <b className="text-[#06243B]">dua ujung spektrum sekaligus</b>: yang bikin karya, dan yang bikin usaha.</p>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#06243B]/[0.13] text-[#06243B] shrink-0">Jalan</span>
                </div>
                <div className="mt-6 pt-6 border-t border-dashed border-[#E7DDC9]">
                  <div className="text-sm font-bold text-[#06243B] mb-4">Satu gerakan, dua sisi yang MOTE sama-sama pedulikan:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <Link href="/community/kreatif" className="group block bg-[#F7F4EE] border border-[#E7DDC9] rounded-2xl p-4 transition-all hover:border-[#BDF24A]/65 hover:-translate-y-0.5">
                      <span className="text-2xl">🎨</span>
                      <b className="block text-[#06243B] mt-1.5">Pekerja Industri Kreatif</b>
                      <span className="block text-xs text-[#6B6559] mt-1 leading-relaxed">Masyarakat MOTE — yang bikin karya. Desainer, kreator, marketer muda yang mau tumbuh.</span>
                    </Link>
                    <div className="hidden sm:block h-1 w-full min-w-[36px] rounded-full" style={{ background: "linear-gradient(90deg,#BDF24A,#FF7E00)" }} />
                    <Link href="/community/bisnis" className="group block bg-[#F7F4EE] border border-[#E7DDC9] rounded-2xl p-4 transition-all hover:border-[#BDF24A]/65 hover:-translate-y-0.5 sm:text-right">
                      <span className="text-2xl">🏪</span>
                      <b className="block text-[#06243B] mt-1.5">Pemilik Bisnis</b>
                      <span className="block text-xs text-[#6B6559] mt-1 leading-relaxed">Komunitas Bisnis Go-Digital — yang bikin usaha. Pebisnis yang mau bawa dagangannya ke digital.</span>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Brand produk */}
          <div className="mt-9">
            <EcoLabel>◆ Brand produk — utas karya</EcoLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              <EcoCard item={{ name: "MTGOODS", href: "/products", badge: "Soon", soon: true, desc: "Brand produk sendiri dari MOTE buat Gen Z. Lagi diracik — bocorannya nyusul." }} />
            </div>
          </div>

          {/* Sosial */}
          <div className="mt-9">
            <EcoLabel>◆ Sosial — utas dampak</EcoLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {sosial.map((s) => <EcoCard key={s.name} item={s} />)}
            </div>
          </div>
        </div>
      </section>

      {/* MEANS + WANTS + FUTURE */}
      <section className="bg-white py-20 sm:py-24 border-y border-[#E7DDC9]">
        <div className="container-mote">
          <span className="eyebrow">Ke mana ini semua</span>
          <div className="grid md:grid-cols-2 gap-10 mt-8">
            <AnimatedSection>
              <div className="text-[11.5px] font-extrabold tracking-widest uppercase text-[#FF7E00]">Caranya</div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#06243B] mt-1.5">Bangun dari dalam, sambungin ke luar.</h3>
              <p className="text-[#3D4F60] leading-relaxed mt-4">Kami bangun karakter dan keahlian dari anak muda, lalu nyambungin aktualisasinya ke potensi bisnis dan sosial yang udah ada di sekitarnya. Bukan ngajarin di ruang kelas doang — tapi nautin ke lapangan yang nyata.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-[11.5px] font-extrabold tracking-widest uppercase text-[#FF7E00]">Yang kami kejar</div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#06243B] mt-1.5">Skena yang hidup, ekonomi yang tahan.</h3>
              <p className="text-[#3D4F60] leading-relaxed mt-4">Makin banyak anak muda ikut hidup di skena kreatif, dan industri kreatif nyambung sama bisnis — biar pertumbuhan ekonominya berkelanjutan, bukan musiman.</p>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.15}>
            <div className="mt-12 pt-10 border-t border-dashed border-[#C9BE9E]">
              <div className="text-[11.5px] font-extrabold tracking-widest uppercase text-[#FF7E00]">Masa depan yang kami bayangin</div>
              <div className="text-[clamp(1.5rem,3.4vw,2.3rem)] font-extrabold tracking-tight leading-[1.2] text-[#06243B] mt-4 max-w-[22ch]">Pas problem kota makin kompleks, energi produktif anak muda jadi <span className="text-[#0F5A34]">mesin pertumbuhannya</span>. Bukan penonton. Mesin.</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GARUT */}
      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <div className="max-w-4xl">
            <span className="eyebrow">Kenapa dari Garut</span>
            <h2 className="mt-4">Garut bukan batas kami. Garut titik mulai kami.</h2>
            <p className="text-lg text-[#3D4F60] leading-relaxed mt-5 max-w-[62ch]">Kami mulai dari Garut — sengaja, bukan kepaksa. Logikanya sederhana: kalau energi muda bisa jadi mesin pertumbuhan di kota kayak Garut, dia bisa di mana aja. Yang kami buktiin di sini adalah cetakannya.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {CONTACT.offices.map((office, i) => (
              <AnimatedSection key={office.label} delay={i * 0.08}>
                <div className="card-soft p-6 flex items-start gap-4 h-full">
                  <div className="h-11 w-11 shrink-0 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#06243B]">{office.label}</h3>
                    <p className="text-sm text-[#3D4F60] mt-1.5 leading-relaxed">{office.address}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-[#06243B] text-white py-20 sm:py-28 relative overflow-hidden grain-overlay">
        <div aria-hidden className="absolute inset-x-0 top-[10%] h-[240px] z-0 hidden md:block">
          <RibbonDecoration variant="c" color="#BDF24A" opacity={0.1} strokeWidth={40} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="container-mote relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="eyebrow eyebrow-on-dark">Jadi, MOTE itu agency, ya?</span>
            <div className="text-[clamp(1.3rem,3vw,2rem)] font-extrabold text-white leading-[1.25] max-w-[24ch]">Iya. Untuk sekarang. Tapi yang lagi kami <span className="text-[#BDF24A]">iket</span>, jauh lebih gede dari satu agency.</div>
            <p className="text-white/72 leading-relaxed max-w-[56ch]">Di balik semua ini, satu nama yang bukan basa-basi: <b className="text-white">Masyarakat Modal Tekun</b>. Dari kata Sunda <i>motekar</i> — keluar, main, jadi kreatif. Sebuah simpul yang lagi diiket, satu utas setiap hari.</p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
