import { SectionHeading } from "@/components/shared/SectionHeading";

const reasons: { title: string; text: string }[] = [
  {
    title: "Paham Marketplace",
    text: "Kami ngerti Shopee, TikTok Shop, dan CPAS—bukan cuma pasang iklan Meta lalu selesai.",
  },
  {
    title: "Data-driven",
    text: "Setiap keputusan berdasarkan angka. Weekly reporting, ROAS tracking, conversion analysis.",
  },
  {
    title: "Fokus objective",
    text: "Kami nggak jualan impressions. Target kami sama dengan target kamu: revenue dan profit naik.",
  },
];

export function WhyMote() {
  return (
    <section className="bg-[#06243B] text-white section-padding">
      <div className="container-mote grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <SectionHeading
            eyebrow="Kenapa Mote"
            title="Kenapa brand pilih Mote."
            description="Tiga hal yang konsisten kami dengar dari klien yang pindah dari agency lain ke Mote."
            light
          />
        </div>

        <div className="lg:col-span-7">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="border-t border-[var(--line-on-navy)] py-6 grid grid-cols-[3rem_1fr] gap-4"
            >
              <span className="label text-[#FF7E00]">0{i + 1}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white">
                  {r.title}
                </h3>
                <p className="text-[#EFEBDD]/80 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
