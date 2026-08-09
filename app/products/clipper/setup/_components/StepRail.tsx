import type { ReactNode } from "react";
import { DurationPill } from "./DurationPill";

export type RailStep = {
  id?: string;
  num: number;
  title: string;
  duration: string;
  body: ReactNode;
};

/**
 * Numbered step rail with a connecting vertical line between badges.
 * Badge nomor = lingkaran kuning dengan angka ink — langkah tetap bernomor jelas.
 */
export function StepRail({ steps }: { steps: RailStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div
            key={s.num}
            id={s.id}
            className={`relative grid grid-cols-[44px_1fr] sm:grid-cols-[56px_1fr] gap-x-4 sm:gap-x-5 ${
              isLast ? "pb-0" : "pb-11 sm:pb-[2.75rem]"
            } ${s.id ? "scroll-mt-24" : ""}`}
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute w-0.5 bg-[#191919]/[0.14] left-[21px] top-[46px] sm:left-[27px] sm:top-[58px] bottom-0"
              />
            )}
            <span className="relative z-[1] w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#F7C526] text-[#191919] grid place-items-center text-[1.05rem] sm:text-[1.375rem] font-bold shrink-0">
              {s.num}
            </span>
            <div className="flex flex-col gap-[0.85rem] pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-[1.2rem] text-[#191919]">{s.title}</span>
                <DurationPill>{s.duration}</DurationPill>
              </div>
              {s.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
