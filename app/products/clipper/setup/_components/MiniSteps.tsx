import type { ReactNode } from "react";

export type MiniStepItem = {
  num: string;
  title: string;
  text: ReactNode;
};

/** Compact numbered recap list (menit progression, "buka lagi" routine), matching the preview's `.mini-steps`. */
export function MiniSteps({ items }: { items: MiniStepItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((it) => (
        <div key={it.num + it.title} className="flex gap-[0.85rem] items-start">
          <span className="shrink-0 w-7 h-7 rounded-full bg-[#06243B]/8 text-[#06243B] font-extrabold text-[0.85rem] grid place-items-center">
            {it.num}
          </span>
          <div className="flex flex-col gap-[0.15rem]">
            <div className="font-bold text-[#06243B] text-[0.95rem]">{it.title}</div>
            <div className="text-[#3D4F60] text-[0.9rem] leading-relaxed">{it.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
