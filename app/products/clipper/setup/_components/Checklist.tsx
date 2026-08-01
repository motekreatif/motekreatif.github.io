import type { LucideIcon } from "lucide-react";

export type ChecklistItem = {
  icon: LucideIcon;
  title: string;
  sub: string;
};

/** The 3-item preflight checklist, matching the setup preview's `.checklist`. */
export function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="rounded-[20px] border border-black/8 bg-white p-[1.65rem] flex flex-col">
      {items.map((it, i) => (
        <div
          key={it.title}
          className={`flex gap-[0.85rem] items-start py-4 ${i === 0 ? "" : "border-t border-black/8"}`}
        >
          <it.icon className="h-5 w-5 text-[#06243B] mt-[0.15rem] shrink-0" strokeWidth={2.2} />
          <div className="flex flex-col gap-[0.2rem]">
            <div className="font-bold text-[#06243B] text-[0.975rem]">{it.title}</div>
            <div className="text-[#3D4F60] text-[0.9rem]">{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
