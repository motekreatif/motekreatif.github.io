import { Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Hubungi Mote Kreatif — Mulai Diskusi Gratis",
  description:
    "Diskusi 30 menit gratis tentang strategi digital marketing brand kamu. WhatsApp, email, atau kunjungi kantor kami di Garut.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Mari mulai dari obrolan santai."
        highlight="obrolan santai"
        description="Isi form di bawah atau langsung chat WhatsApp. Kami balas dalam 1×24 jam—dan kalau bisa lebih cepat."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 lg:grid-cols-12 gap-10">
          <AnimatedSection className="lg:col-span-7">
            <div className="card-soft p-7 md:p-9">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#06243B]">
                Ceritain kebutuhan kamu.
              </h2>
              <p className="text-[#3D4F60] mt-2">
                Form ini langsung lanjut ke chat WhatsApp tim kami—tidak ada spam, tidak ada tracking aneh.
              </p>
              <ContactForm className="mt-6" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-5 flex flex-col gap-4">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card-soft p-6 flex items-center gap-4 hover:bg-[#BDF24A] transition-colors group"
            >
              <div className="h-12 w-12 rounded-2xl bg-[#06243B]/15 text-[#06243B] flex items-center justify-center group-hover:bg-[#06243B] group-hover:text-[#BDF24A]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#3D4F60]">
                  WhatsApp
                </div>
                <div className="font-bold text-[#06243B]">{CONTACT.whatsapp}</div>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="card-soft p-6 flex items-center gap-4 hover:bg-[#BDF24A] transition-colors group"
            >
              <div className="h-12 w-12 rounded-2xl bg-[#FF7E00]/15 text-[#FF7E00] flex items-center justify-center group-hover:bg-[#06243B] group-hover:text-[#BDF24A]">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#3D4F60]">
                  Email
                </div>
                <div className="font-bold text-[#06243B] break-all">
                  {CONTACT.email}
                </div>
              </div>
            </a>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card-soft p-6 flex items-center gap-4 hover:bg-[#BDF24A] transition-colors group"
            >
              <div className="h-12 w-12 rounded-2xl bg-[#06243B]/15 text-[#06243B] flex items-center justify-center group-hover:bg-[#06243B] group-hover:text-[#BDF24A]">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#3D4F60]">
                  Instagram
                </div>
                <div className="font-bold text-[#06243B]">{CONTACT.instagram}</div>
              </div>
            </a>

            {CONTACT.offices.map((office) => (
              <div
                key={office.label}
                className="card-soft p-6 flex items-start gap-4"
              >
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-[#3D4F60]">
                    {office.label}
                  </div>
                  <p className="text-sm text-[#06243B] mt-1 leading-relaxed">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[#F7F4EE] pb-20">
        <div className="container-mote">
          <div className="rounded-3xl overflow-hidden card-soft">
            <iframe
              title="Lokasi MOTE Office HOP Space"
              src="https://www.google.com/maps?q=Jl.+Raya+Cipanas+No.13,+Cimanganten,+Tarogong+Kaler,+Garut&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
