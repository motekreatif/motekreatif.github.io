import { ArrowRight, MessageCircle } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

export const metadata = buildMeta({
  title: "Community — Masyarakat MOTE · Komunitas Anak Muda Kreatif Garut",
  description:
    "Masyarakat MOTE: komunitas anak muda kreatif yang percaya maju itu ditempuh, bukan ditunggu. Kelas gratis, ritual Kamis Tekun, dan teman seperjalanan — mulai dari Garut.",
  path: "/community",
});

const WA_GROUP = "https://chat.whatsapp.com/IySuVRGrDrN87b0J44ruqA?mode=gi_t";

const heroMeta = ["Kelas gratis & terbuka", "Kumpul tiap Kamis", "Online + offline di Garut"];

const volumes = [
  {
    img: "/community/kelas-vol1.jpg",
    alt: "Suasana Kelas MOTE Vol. 1",
    vol: "Kelas MOTE · Vol. 1",
    accent: "#5c7d13",
    tagBg: "rgba(189,242,74,0.25)",
    title: "Pertama kali dibuka ke publik",
    desc: "Kelas terbuka yang ngajak orang kreatif buat berjejaring dan ngobrol seputar dunia agency & industri kreatif. Disambut meriah — dan bikin kami yakin ini layak dilanjutin.",
    segs: [
      { tag: "Kelas", topic: "“Multimedia Career Path — Ubah Skill Jadi Karir Setelah Lulus Sekolah”", by: "Galih Afriali" },
      { tag: "Sharing", topic: "“Kenalan sama budaya kerja agensi”", by: "Ale" },
    ],
  },
  {
    img: "/community/kelas-vol2.jpg",
    alt: "Suasana Kelas MOTE Vol. 2 di THE HOP Space, Garut",
    vol: "Kelas MOTE · Vol. 2",
    accent: "#FF7E00",
    tagBg: "rgba(255,126,0,0.14)",
    title: "THE HOP Space, Garut",
    free: "gratis & terbuka",
    desc: "Bahasannya makin nyata: graphic design & dunia CRM. Yang dateng pulang bawa satu pertanyaan — “kapan kelas selanjutnya?”",
    segs: [
      { tag: "Creative Class", topic: "“Jangan jadi desainer grafis di zaman sekarang, kecuali…”", by: "Rangga Muhamad Ariansyah" },
      { tag: "Sharing Session", topic: "“#Terjebak di Agency”", by: "Nadilla Firas Varosa" },
    ],
  },
];

const topics = ["Self Development", "AI buat kerja kreatif", "Marketing", "Industri Kreatif", "Skill Profesional", "Content Creator"];

const fases = [
  { no: "1", c: "#8A7E63", icon: "🌱", name: "Amateur", desc: "Kamu di sini kalau baru terjun dan nyoba-nyoba — kerjaan personal, proyek iseng. Belum bisa nilai karyamu bagus atau nggak, tapi penasarannya nyala.", tag: "Kelas MOTE nemenin", insp: false },
  { no: "2", c: "#FF7E00", icon: "🔨", name: "Beginner", desc: "Kamu di sini kalau udah niat serius tapi disiplinnya belum ajeg — masih kerja pas ada mood. Fase paling gampang nyerah. Di sini teman seperjalanan paling kepake.", tag: "Kelas MOTE nemenin", insp: false },
  { no: "3", c: "#2C8CE6", icon: "💼", name: "Professional", desc: "Kamu di sini kalau disiplin kerjamu udah jalan tanpa nunggu mood, punya standar sendiri, dan skill mulai jadi nafkah.", tag: "Kelas MOTE nemenin", insp: false },
  { no: "4", c: "#06243B", icon: "⭐", name: "Ekspertist", desc: "Yang udah bikin produk & sistem sendiri — punya cara khas yang dikenali, jadi tempat orang minta pandangan.", tag: "✨ Ikon & inspirasi", insp: true },
  { no: "5", c: "#0F5A34", icon: "👑", name: "Master", desc: "Yang keahliannya udah bukan soal diri sendiri — bikin cara pandang baru, dan ngangkat orang lain naik.", tag: "✨ Ikon & inspirasi", insp: true },
];

const gets = [
  { icon: "🧭", name: "Arah", desc: "Peta fase + kelas & sharing yang bantu kamu naik — gratis dan terbuka." },
  { icon: "🤝", name: "Teman seperjalanan", desc: "Orang-orang yang sama-sama lagi jalan — bukan penonton, bukan pesaing." },
  { icon: "🎨", name: "Panggung buat progres", desc: "Karyamu dilihat, di-review, dan dirayain — walau masih jauh dari sempurna." },
  { icon: "📍", name: "Tempat mendarat", desc: "Online tiap minggu, dan ketemu darat di Garut buat yang makin dekat." },
];

const joinSteps = [
  { no: "1", c: "#2C8CE6", name: "Masuk WA Community", desc: "Pintu paling ringan. Kenalan, nyimak dulu juga boleh, terus ikut Kamis Tekun pertamamu.", note: "Gratis · cukup niat" },
  { no: "2", c: "#FF7E00", name: "Naik ke Discord", desc: "Buat yang makin serius: kanal per topik, arsip materi, kolaborasi, dan Tekun Streak yang kecatat.", note: "Kalau udah kerasa klik" },
  { no: "3", c: "#0F5A34", name: "Ketemu darat di Garut", desc: "Kelas offline & kumpul komunitas — kayak Kelas MOTE Vol. 2 di THE HOP Space. Ikatan paling kuat lahir di sini.", note: "Garut sebagai rumah" },
];

export default function CommunityPage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <PageHero
        eyebrow="Komunitas anak muda kreatif · Garut"
        title="Maju itu ditempuh, bukan ditunggu."
        highlight="ditempuh"
        description="Masyarakat MOTE adalah kumpulan anak muda kreatif yang percaya satu hal: modal utama buat tumbuh bukan bakat, bukan koneksi, bukan lahir di kota besar — tapi tekun yang dirawat. Kami mulai dari Garut. Kamu bisa mulai dari mana aja."
        actions={
          <>
            <a href={WA_GROUP} target="_blank" rel="noopener noreferrer" className="btn btn-dark group">
              <MessageCircle className="h-4 w-4" />
              Gabung Masyarakat MOTE
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#siapa-kita" className="btn btn-ghost">Kenalan dulu</a>
            <div className="w-full flex flex-wrap gap-2 mt-1">
              {heroMeta.map((m) => (
                <span key={m} className="text-xs sm:text-sm text-[#06243B] bg-[#06243B]/[0.06] border border-[#06243B]/10 rounded-full px-3.5 py-1.5 font-semibold">{m}</span>
              ))}
            </div>
          </>
        }
      />

      {/* ══ SIAPA KITA ══ */}
      <section id="siapa-kita" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading eyebrow="Siapa kita" title="Kami menyebutnya Modal Tekun" description="Nama MOTE datang dari kata Sunda motekar — keluar, bermain, jadi kreatif. Dan “Masyarakat MOTE” bukan sekadar nama grup: dia turunan langsung dari nama panjang kami, Masyarakat Modal Tekun." />
          <AnimatedSection>
            <p className="mt-8 text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight text-[#06243B] max-w-3xl text-balance">
              Kami percaya hasil hebat lahir dari yang <span className="text-[#0F5A34]">jalan terus</span> — bukan dari yang paling berbakat. Di sini, yang dirayakan bukan karya paling kinclong, tapi orang yang minggu ini <span className="text-[#0F5A34]">selangkah lebih jauh</span> dari minggu kemarin.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4 mt-9">
            <AnimatedSection>
              <div className="card-soft p-6 h-full border-l-4 border-l-[#BDF24A]">
                <div className="text-[11px] font-extrabold tracking-widest uppercase text-[#0F5A34]">Yang kami pegang</div>
                <div className="font-extrabold text-xl mt-1.5 mb-2 text-[#06243B]">Modal Tekun</div>
                <p className="text-[15px] leading-relaxed text-[#3D4F60]">Percaya kemampuan itu tumbuh kalau diasah. Nggak nunggu mood, nggak nunggu “berbakat dulu”. Tekun bukan hobi — tekun itu identitas.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="card-soft p-6 h-full border-l-4 border-l-[#FF7E00]">
                <div className="text-[11px] font-extrabold tracking-widest uppercase text-[#FF7E00]">Yang kami lawan</div>
                <div className="font-extrabold text-xl mt-1.5 mb-2 text-[#06243B]">Suara “aku mah gitu-gitu aja”</div>
                <p className="text-[15px] leading-relaxed text-[#3D4F60]">Kami menyebutnya <b className="text-[#06243B]">Dobyih</b> — suara kecil di kepala yang bilang bakat itu mentok dan usaha percuma. Bukan orang. Bukan siapa-siapa. Suara itu pernah mampir ke kami semua.</p>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.15}>
            <div className="mt-5 rounded-2xl bg-[#BDF24A]/20 border border-[#BDF24A] px-5 py-4 text-[15px] leading-relaxed text-[#06243B] max-w-3xl">
              <b>Biar jelas:</b> musuh kami bukan manusia. Yang belum jago bukan musuh — justru dia yang paling kami tunggu. Yang kami lawan cuma satu: suara nyerah di kepala sendiri. Di sini, suara itu nggak dibiarin menang.
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ KELAS MOTE ══ */}
      <section id="kelas-mote" className="bg-white py-20 sm:py-24 border-y border-[#E7DDC9]">
        <div className="container-mote">
          <SectionHeading eyebrow="Pemantiknya" title="Kelas MOTE — belajar bareng, tanpa gerbang" description="Sebelum jadi komunitas, semuanya berawal dari satu kebiasaan kecil." />
          <AnimatedSection>
            <div className="mt-8 card-soft border-l-[6px] border-l-[#0F5A34] p-6 sm:p-7">
              <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#FF7E00]">Cerita asalnya</div>
              <div className="font-extrabold text-xl sm:text-[23px] leading-snug mt-2 mb-3 text-[#06243B]">Kelas MOTE nggak lahir di ruang meeting. Dia lahir dari kelas internal — tiap Kamis.</div>
              <div className="space-y-3 text-[15px] leading-relaxed text-[#3D4F60]">
                <p>Tiap Kamis, tim MOTE KREATIF gantian jadi pemateri: saling nurunin ilmu desain, marketing, sampai cara kerja agency. Bukan pelatihan formal — cuma kebiasaan ngasah diri bareng, tanpa absen.</p>
                <p>Pelan-pelan kebiasaan itu ngasih hasil: kami tumbuh, personal maupun bareng-bareng. Dan makin kerasa manfaatnya, makin jelas satu hal — <b className="text-[#06243B]">sayang banget kalau cuma kami yang ngerasain.</b></p>
                <p>Jadi kelas internal itu dibuka ke publik. Lahir Vol. 1, lalu Vol. 2. Gratis, terbuka, dan disambut lebih ramai dari yang kami bayangin. Sekarang giliranmu.</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {volumes.map((v, i) => (
              <AnimatedSection key={v.vol} delay={i * 0.1}>
                <div className="card-soft overflow-hidden flex flex-col h-full">
                  <img src={v.img} alt={v.alt} loading="lazy" className="w-full aspect-[3/2] object-cover" />
                  <div className="p-5 sm:p-6">
                    <div className="text-[11px] font-extrabold tracking-widest uppercase" style={{ color: v.accent }}>{v.vol}</div>
                    <div className="font-extrabold text-lg mt-1 text-[#06243B]">
                      {v.title}
                      {v.free && <span className="ml-2 align-middle text-[11px] font-extrabold text-[#0F5A34] bg-[#0F5A34]/10 rounded-md px-2 py-0.5">{v.free}</span>}
                    </div>
                    <p className="text-sm leading-relaxed text-[#3D4F60] mt-2">{v.desc}</p>
                    <div className="mt-3 space-y-2">
                      {v.segs.map((s) => (
                        <div key={s.topic} className="text-[13.5px] leading-relaxed text-[#3D4F60]">
                          <span className="inline-block text-[9.5px] font-extrabold uppercase tracking-wide rounded px-2 py-0.5 mr-1.5 align-middle" style={{ background: v.tagBg, color: v.accent }}>{s.tag}</span>
                          {s.topic} · <b className="text-[#06243B]">{s.by}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.15}>
            <div className="mt-6 card-soft p-6">
              <b className="text-[#06243B] text-base">Yang dibahas di Kelas MOTE</b>
              <p className="text-sm text-[#3D4F60] mt-1.5">Topiknya luas, benang merahnya satu: gimana caranya tumbuh beneran di dunia kreatif — bukan lewat jalan pintas.</p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {topics.map((t) => (
                  <span key={t} className="text-[13.5px] font-semibold rounded-full px-4 py-2 bg-[#06243B]/[0.06] border border-[#06243B]/10 text-[#06243B]">{t}</span>
                ))}
                <span className="text-[13.5px] font-semibold rounded-full px-4 py-2 bg-[#F7F4EE] border border-[#E7DDC9] text-[#6B6559]">+ topik lain, sesuai kebutuhan warga</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ 5 FASE ══ */}
      <section id="lima-fase" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading eyebrow="Peta perjalanan" title="5 fase yang kami yakini — kamu lagi di mana?" description="Ini bukan sertifikat, bukan penghakiman, dan nggak ada yang nge-cap kamu. Ini cuma peta yang kami percaya: perjalanan tumbuh di dunia kreatif itu ada fasenya, dan hampir semua orang ngelewatin fase yang mirip. Kenali sendiri kamu di mana — lalu jalan." />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
            {fases.map((f, i) => (
              <AnimatedSection key={f.no} delay={i * 0.06}>
                <div className="card-soft p-4 h-full flex flex-col" style={{ borderTop: `6px solid ${f.c}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-[13px] text-white" style={{ background: f.c }}>{f.no}</div>
                  <div className="font-extrabold text-[17px] mt-3 flex items-center gap-1.5 text-[#06243B]"><span>{f.icon}</span>{f.name}</div>
                  <p className="text-[13px] leading-relaxed text-[#3D4F60] mt-2 flex-1">{f.desc}</p>
                  <span className={`mt-3 text-[10px] font-extrabold uppercase tracking-wide rounded-md px-2.5 py-1.5 self-start ${f.insp ? "bg-[#FBFDF1] text-[#5f7a1c] border border-[#DCEBB2]" : "bg-[#0F5A34]/10 text-[#0F5A34]"}`}>{f.tag}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.15}>
            <div className="mt-6 rounded-2xl bg-white border border-dashed border-[#C9BE9E] px-5 py-4 text-[15px] leading-relaxed text-[#3D4F60]">
              <b className="text-[#06243B]">Fase ≠ nilai dirimu.</b> Ini fase skill, bukan martabat. Anak fase 1 yang jalan terus lebih “Masyarakat MOTE” daripada yang jago tapi berhenti. Kelas MOTE fokus nemenin fase 1–3; fase 4–5 kami taruh sebagai bintang arah — bukti kalau tekun dijalanin, cara sendiri itu lahir.
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ RITUAL ══ */}
      <section id="ritual" className="bg-[#06243B] text-white py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading light eyebrow="Cara kami jalan" title="Bukan grup pasif. Ada ritmenya." description="Komunitas hidup dari kebiasaan, bukan pengumuman. Dua ritual ini yang bikin “tekun” kerasa nyata tiap minggu — bukan cuma slogan." />
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            {[
              { hbg: "#0F5A34", icon: "🗓️", t: "Kamis Tekun", s: "kumpul mingguan, tiap Kamis", body: [<>Satu hari sakral tiap minggu: kumpul, sharing, dan saling lihat progres. Kenapa Kamis? Karena Kelas MOTE sendiri lahir dari kebiasaan kelas internal tim tiap Kamis — harinya kami pertahankan.</>, <>Kadang bahas skill, kadang bahas jalan karir, kadang cuma saling nge-review karya. Yang penting: <b className="text-[#06243B]">ketemu, dan jalan lagi.</b></>] },
              { hbg: "#FF7E00", icon: "🔥", t: "Tekun Streak", s: "rayain konsistensi, bukan bakat", body: [<>Tiap minggu kamu commit <b className="text-[#06243B]">satu langkah kecil</b> — bikin satu karya, belajar satu skill, praktek satu kali — lalu lapor tiap Kamis. Streak = berapa minggu kamu jalan tanpa putus.</>, <>Yang disorot bukan karya paling bagus, tapi <b className="text-[#06243B]">yang paling konsisten</b>. Putus streak? Nggak dihukum. Mulai lagi dari minggu satu — yang penting balik jalan.</>] },
            ].map((r, i) => (
              <AnimatedSection key={r.t} delay={i * 0.1}>
                <div className="rounded-[20px] overflow-hidden bg-white h-full">
                  <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ background: r.hbg }}>
                    <span className="text-2xl leading-none">{r.icon}</span>
                    <div><div className="font-extrabold text-lg">{r.t}</div><div className="text-[11.5px] opacity-90">{r.s}</div></div>
                  </div>
                  <div className="p-5 text-[14.5px] leading-relaxed text-[#3D4F60] space-y-2.5">
                    {r.body.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {gets.map((g, i) => (
              <AnimatedSection key={g.name} delay={i * 0.08}>
                <div className="card-dark p-4 h-full">
                  <div className="text-2xl leading-none">{g.icon}</div>
                  <div className="font-extrabold text-[15px] mt-2 text-white">{g.name}</div>
                  <div className="text-[12.8px] text-[#CDE7D6] mt-1 leading-relaxed">{g.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CARA GABUNG ══ */}
      <section id="gabung" className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading eyebrow="Cara gabung" title="Mulai dari yang paling ringan" description="Nggak ada seleksi, nggak ada syarat portofolio. Masuk dari pintu paling santai — makin dekat, makin dalam. Semua di kecepatanmu sendiri." />
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {joinSteps.map((s, i) => (
              <AnimatedSection key={s.no} delay={i * 0.08}>
                <div className="card-soft p-6 h-full">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm text-white" style={{ background: s.c }}>{s.no}</div>
                  <div className="font-extrabold text-[17px] mt-3 text-[#06243B]">{s.name}</div>
                  <p className="text-[13.6px] leading-relaxed text-[#3D4F60] mt-1.5">{s.desc}</p>
                  <div className="text-xs text-[#6B6559] mt-2.5">{s.note}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL (mirror CTASection) ══ */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden grain-overlay"
        style={{ background: "linear-gradient(135deg, #BDF24A 0%, #CDF56A 45%, #BDF24A 100%)" }}
      >
        <div aria-hidden className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#06243B]/10 blur-3xl z-0" />
        <div aria-hidden className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#FF7E00]/25 blur-3xl z-0" />
        <div className="absolute inset-x-0 top-[5%] h-[260px] z-0 hidden md:block" aria-hidden>
          <RibbonDecoration variant="b" color="#FF7E00" opacity={0.32} strokeWidth={50} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="absolute inset-x-0 bottom-[5%] h-[240px] z-0 hidden md:block" aria-hidden>
          <RibbonDecoration variant="c" color="#06243B" opacity={0.12} strokeWidth={40} delay={0.3} className="absolute inset-0 w-full h-full" />
        </div>
        <div className="container-mote relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
            <span className="eyebrow bg-[#06243B] text-[#BDF24A]">Kamis Tekun nungguin</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06243B] text-balance">Suara “gitu-gitu aja” itu nggak harus menang.</h2>
            <p className="text-base sm:text-lg text-[#06243B]/85 max-w-xl">Kamu nggak butuh bakat besar buat mulai. Cuma butuh satu langkah kecil minggu ini — dan tempat yang bikin kamu jalan terus.</p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a href={WA_GROUP} target="_blank" rel="noopener noreferrer" className="btn btn-dark group">
                <MessageCircle className="h-4 w-4" />
                Gabung WA Community
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="text-sm italic text-[#06243B]/65 mt-1">Gratis. Nggak ada seleksi. Yang penting niat jalan.</p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
