import Image from "next/image";
import { MapPin } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { CONTACT, SITE } from "@/lib/constants";
import { PHILOSOPHY } from "@/lib/data";

export const metadata = buildMeta({
  title: "Tentang Mote Kreatif — Digital Marketing Agency & Consultant Garut",
  description:
    "Mote Kreatif adalah digital marketing agency & consultant berbasis di Garut, Jawa Barat. Didirikan 2024 oleh PT Masyarakat Modal Tekun. Push boundaries, agile, humanistic, playful.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Push boundaries · Agile · Humanistic · Playful."
        highlight="Playful"
        description="Empat kata yang ngebantu kami ngambil keputusan setiap hari. Bukan poster di dinding—ini cara kami kerja."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection className="flex flex-col gap-5">
            <span className="eyebrow self-start">Cerita Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#06243B]">
              Lahir dari kebutuhan, dirawat dengan ketekunan.
            </h2>
            <p className="text-[#3D4F60] leading-relaxed">
              {SITE.description}
            </p>
            <p className="text-[#3D4F60] leading-relaxed">
              {SITE.name} hadir dari perjumpaan antara kepekaan sosial dan peluang ekonomi di kota berkembang yang penuh potensi. Kami percaya brand lokal layak dapat strategi sekelas brand global—dengan tone yang humanis dan eksekusi yang rasional.
            </p>
            <p className="text-[#3D4F60] leading-relaxed">
              Hari ini kami melayani 20+ klien, menjalankan 50+ project, dan ngebangun 4 produk digital yang dipakai sehari-hari. Tapi yang kami banggakan bukan angkanya—tapi tim klien yang mandiri di akhir program kami.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="card-soft p-5">
                <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00]">
                  Visi
                </div>
                <p className="text-[#06243B] font-semibold mt-2 leading-snug">
                  Menjadi ekosistem kreatif & digital terdepan untuk brand lokal Indonesia.
                </p>
              </div>
              <div className="card-soft p-5">
                <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00]">
                  Misi
                </div>
                <p className="text-[#06243B] font-semibold mt-2 leading-snug">
                  Membantu brand, individu, dan komunitas bertumbuh dengan ketekunan sebagai modal utama.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden col-span-2 sm:col-span-1">
              <Image
                src="/img/img3.webp"
                alt="Diskusi strategi tim Mote Kreatif"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/img/img2.webp"
                  alt="Sesi audience workshop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/img/img1.webp"
                  alt="Speaker presentasi Mote Kreatif"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[#06243B] text-white py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Filosofi"
            title="Empat pilar cara kami kerja."
            description="Setiap keputusan strategis di Mote Kreatif diukur dengan empat pilar ini. Kalau salah satu nggak terpenuhi, kami evaluasi ulang."
            light
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PHILOSOPHY.map((p, i) => (
              <AnimatedSection
                key={p.title}
                delay={i * 0.08}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-7"
              >
                <div className="text-3xl font-extrabold text-[#BDF24A]">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-extrabold mt-3 text-white">
                  {p.title}
                </h3>
                <p className="text-white/75 mt-2 text-sm leading-relaxed">
                  {p.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <SectionHeading
            eyebrow="Lokasi"
            title="Berakar di Garut. Standar Jakarta."
            description="Dua kantor di Garut sebagai basis kerja, ruang diskusi, dan tempat klien mampir."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONTACT.offices.map((office, i) => (
              <AnimatedSection
                key={office.label}
                delay={i * 0.08}
                className="card-soft p-7 flex items-start gap-4"
              >
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#06243B]">
                    {office.label}
                  </h3>
                  <p className="text-[#3D4F60] mt-2 leading-relaxed text-sm">
                    {office.address}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
