export type FaqItem = { q: string; a: string };

/**
 * Accordion FAQ list, matching the setup preview's `.faq-item` (`<details>` rows inside one card).
 * First item defaults open, same as the preview. Uses `group-open:` so no client JS is needed.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="rounded-[20px] border border-black/8 bg-white px-2 sm:px-3">
      {items.map((item, i) => (
        <details key={item.q} className="group border-black/8 py-[1.15rem] px-2" open={i === 0} style={i === 0 ? undefined : { borderTopWidth: 1 }}>
          <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-bold text-[#06243B] text-[0.975rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="shrink-0 text-xl leading-none text-[#06243B]/35 group-open:hidden">+</span>
            <span className="shrink-0 text-xl leading-none text-[#06243B]/35 hidden group-open:inline">&minus;</span>
          </summary>
          <p className="mt-[0.7rem] text-[0.925rem] text-[#3D4F60] leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
