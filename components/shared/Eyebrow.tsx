import type { ReactNode } from "react";

type Tone = "cream" | "yellow" | "navy";

const TEXT: Record<Tone, string> = {
  cream: "text-[#06243B]",
  yellow: "text-[#06243B]",
  navy: "text-[#EFEBDD]",
};
const BAR: Record<Tone, string> = {
  cream: "bg-[#FF7E00]",
  yellow: "bg-[#FF7E00]",
  navy: "bg-[#BDF24A]",
};

export function Eyebrow({
  children,
  tone,
  as: Tag = "span",
}: {
  children: ReactNode;
  tone: Tone;
  as?: "span" | "p";
}) {
  return (
    <Tag className={`label inline-flex items-center gap-3 ${TEXT[tone]}`}>
      <span aria-hidden className={`inline-block h-[2px] w-5 ${BAR[tone]}`} />
      {children}
    </Tag>
  );
}
