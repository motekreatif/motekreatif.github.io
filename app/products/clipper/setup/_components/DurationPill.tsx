import { Clock } from "lucide-react";

/** Small "± N menit" pill used in hero rows and step headers, matching the preview's `.duration`. */
export function DurationPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-[0.4rem] text-[0.8rem] font-bold text-[#06243B] bg-[#06243B]/[0.07] px-3 py-[0.35rem] rounded-full">
      <Clock className="h-3.5 w-3.5 text-[#06243B]/55" />
      {children}
    </span>
  );
}
