import type { ReactNode } from "react";

export type MiniStepItem = {
  num: string;
  title: string;
  text: ReactNode;
};

/** Compact numbered recap list (menit progression, "buka lagi" routine) — nomor dalam lingkaran kuning. */
export function MiniSteps({ items }: { items: MiniStepItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((it) => (
        <div key={it.num + it.title} className="flex gap-[0.85rem] items-start">
          <span className="shrink-0 w-7 h-7 rounded-full bg-[#F7C526] text-[#191919] font-bold text-[0.85rem] grid place-items-center">
            {it.num}
          </span>
          <div className="flex flex-col gap-[0.15rem]">
            <div className="font-semibold text-[#191919] text-[0.95rem]">{it.title}</div>
            <div className="text-[#5F5F5C] text-[0.9rem] leading-relaxed">{it.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
