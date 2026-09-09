import {
  CircleDollarSign,
  Store,
  TrendingDown,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

type Pain = {
  icon: LucideIcon;
  text: string;
};

const pains: Pain[] = [
  {
    icon: TrendingDown,
    text: "Sudah ngiklan tapi ROAS di bawah 3x—budget habis, hasil belum kelihatan.",
  },
  {
    icon: Store,
    text: "Toko Shopee/TikTok Shop sudah ada tapi traffic dan konversi stagnan.",
  },
  {
    icon: Users,
    text: "Tim marketing ada tapi belum bisa baca data dan optimize campaign.",
  },
  {
    icon: CircleDollarSign,
    text: "Budget marketing habis tapi nggak tau mana channel yang menghasilkan.",
  },
];

export function PainPoints() {
  return (
    <section className="relative bg-[#F7F4EE] section-padding-tight overflow-hidden">
      <div className="container-mote relative">
        <SectionHeading
          eyebrow="Yang sering kami dengar"
          title="Apakah ini yang kamu rasakan?"
          description="Kalau salah satu kedengeran familiar, kamu tidak sendirian. Empat keluhan ini muncul di hampir setiap discovery call yang kami lakukan."
        />

        <div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.text}
                className="flex items-start gap-4 py-4 border-t border-[var(--line-on-cream)]"
              >
                <Icon className="h-5 w-5 mt-0.5 shrink-0 text-[#06243B]" />
                <p className="text-[#06243B] font-semibold leading-snug">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
