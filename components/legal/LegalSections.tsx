import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export type LegalSection = {
  num: string;
  title: string;
  body: ReactNode;
};

export function LegalSections({
  sections,
  updatedAt,
}: {
  sections: LegalSection[];
  updatedAt: string;
}) {
  return (
    <section className="bg-[#F7F4EE] py-16 sm:py-20">
      <div className="container-mote max-w-3xl flex flex-col gap-4">
        <p className="text-sm text-[#3D4F60] mb-1">
          Terakhir diperbarui: {updatedAt}
        </p>

        {sections.map(({ num, title, body }, i) => (
          <AnimatedSection key={num} delay={Math.min(i, 4) * 0.04}>
            <div className="card-soft p-6 md:p-8 flex gap-5 items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-[#06243B]/10 leading-none shrink-0 select-none w-10 text-center">
                {num}
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-[#06243B] mb-2">
                  {title}
                </h2>
                <div className="text-[#3D4F60] text-sm leading-relaxed [&_a]:text-[#06243B] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
                  {body}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
