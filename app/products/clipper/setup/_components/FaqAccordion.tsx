import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

/**
 * Accordion FAQ list — kartu putih membulat per pertanyaan dengan chevron
 * dalam lingkaran kuning, sekulit dengan FAQ halaman jual. First item
 * defaults open. Uses `group-open:` so no client JS is needed.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group rounded-[20px] bg-white overflow-hidden shadow-[0_14px_40px_-30px_rgba(25,25,25,0.35)]"
          open={i === 0}
        >
          <summary className="list-none cursor-pointer flex items-center justify-between gap-4 p-5 sm:p-6 font-semibold text-[#191919] text-[0.975rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F7C526]">
              <ChevronDown className="h-4 w-4 text-[#191919] transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-[0.925rem] text-[#5F5F5C] leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
