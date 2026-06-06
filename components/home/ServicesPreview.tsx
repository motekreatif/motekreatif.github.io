"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICES } from "@/lib/data";

export function ServicesPreview() {
  return (
    <section className="bg-[#F7F4EE] py-20 sm:py-28">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Layanan"
          title="Lima jalur pertumbuhan untuk brand kamu."
          description="Setiap layanan kami didesain untuk fase bisnis yang berbeda—dari brand baru sampai tim marketing yang siap mandiri."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card-soft p-7 flex flex-col gap-4 group relative overflow-hidden"
              >
                {service.featured && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-[#BDF24A] text-[#06243B]">
                    <Star className="h-3 w-3 fill-current" />
                    Unggulan
                  </span>
                )}
                <div className="h-14 w-14 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7E00] mb-1.5">
                    {service.code}
                  </div>
                  <h3 className="text-xl font-extrabold text-[#06243B] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#3D4F60] text-sm leading-relaxed">
                    {service.short}
                  </p>
                </div>
                <Link
                  href={service.href ?? "/services"}
                  className="mt-auto inline-flex items-center gap-2 text-[#06243B] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
