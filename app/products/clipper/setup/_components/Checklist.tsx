import type { LucideIcon } from "lucide-react";

export type ChecklistItem = {
  icon: LucideIcon;
  title: string;
  sub: string;
};

/** The 3-item preflight checklist — kartu putih dengan badge ikon bulat kuning. */
export function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="rounded-[24px] border border-[rgba(25,25,25,0.10)] bg-white p-[1.65rem] flex flex-col">
      {items.map((it, i) => (
        <div
          key={it.title}
          className={`flex gap-[0.85rem] items-start py-4 ${i === 0 ? "" : "border-t border-[rgba(25,25,25,0.08)]"}`}
        >
          <span className="shrink-0 grid place-items-center h-9 w-9 rounded-full bg-[#F7C526] text-[#191919]">
            <it.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <div className="flex flex-col gap-[0.2rem] pt-1">
            <div className="font-semibold text-[#191919] text-[0.975rem]">{it.title}</div>
            <div className="text-[#5F5F5C] text-[0.9rem]">{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
