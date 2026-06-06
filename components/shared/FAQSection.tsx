import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd, type FAQItem } from "@/lib/faq";

type FAQSectionProps = {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

/**
 * FAQ accordion berbasis <details> native — konten ter-render server-side
 * (terbaca AI crawlers) tanpa butuh JavaScript, plus FAQPage JSON-LD.
 */
export function FAQSection({
  items,
  eyebrow = "FAQ",
  title = "Pertanyaan yang sering ditanyakan.",
  description,
}: FAQSectionProps) {
  return (
    <section className="bg-[#F7F4EE] py-20 sm:py-24">
      <JsonLd data={buildFaqJsonLd(items)} />
      <div className="container-mote max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, i) => (
            <AnimatedSection key={item.question} delay={i * 0.04}>
              <details className="group card-soft overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base sm:text-lg font-bold text-[#06243B]">
                    {item.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#06243B]/60 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#3D4F60] leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
