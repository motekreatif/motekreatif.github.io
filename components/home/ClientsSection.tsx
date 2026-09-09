import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PARTNER_LOGOS } from "@/lib/data";

export function ClientsSection() {
  return (
    <section className="bg-[#F7F4EE] py-20 sm:py-24">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Dipercaya Oleh"
          title="Brand & komunitas yang tumbuh bersama kami."
          description="Dari hotel, FMCG, fashion, sampai komunitas kreatif—kami senang ketika klien kami tumbuh lebih besar dari sebelumnya."
          align="center"
        />

        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-10 gap-x-8 items-center">
          {PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={64}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
