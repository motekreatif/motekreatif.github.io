import { ArrowUpRight, Check } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { PRODUCTS } from "@/lib/data";

export const metadata = buildMeta({
  title: "Produk Digital SaaS — WhatsApp CRM, Akuntansi, Photobooth",
  description:
    "Tools digital buatan Mote: Mote Blaster (WhatsApp CRM), Modal Tekun (keuangan keluarga), Klir (akuntansi UMKM), Mote Capture (photobooth), Mote LAB (marketplace research).",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Produk Digital"
        title="Lima produk digital, satu prinsip: dipakai dulu sebelum dijual."
        highlight="dipakai dulu sebelum dijual"
        description="Setiap produk lahir dari kebutuhan nyata di internal kami atau klien. Begitu terbukti efektif, kami buka untuk publik."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-10">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            const reverse = i % 2 === 1;
            return (
              <AnimatedSection
                key={product.name}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="card-soft p-8 h-full flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                      <div className="h-16 w-16 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                        <Icon className="h-8 w-8" strokeWidth={2.2} />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          product.status === "Live"
                            ? "bg-[#06243B]/20 text-[#06243B]"
                            : "bg-[#BDF24A] text-[#06243B]"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#06243B]">
                      {product.name}
                    </h2>
                    <p className="text-[#06243B]/85 font-medium">{product.tagline}</p>
                    <p className="text-[#3D4F60] leading-relaxed">{product.description}</p>
                    {product.price && (
                      <div className="text-sm font-bold text-[#FF7E00]">
                        Mulai {product.price}
                      </div>
                    )}
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto self-start btn btn-primary group"
                    >
                      Coba {product.name}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-6 lg:py-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#06243B]/60 mb-4">
                    Fitur utama
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl border border-black/5"
                      >
                        <span className="h-6 w-6 rounded-full bg-[#06243B] text-[#BDF24A] flex items-center justify-center shrink-0">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-[#06243B] font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
