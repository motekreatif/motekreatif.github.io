import { Megaphone, Building2, MessageSquareQuote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const pillars = [
  {
    icon: Megaphone,
    name: "Paid Media",
    tagline: "Iklan yang efisien",
    tactics: ["Meta Ads", "CPAS Shopee", "Google Ads", "TikTok Ads"],
  },
  {
    icon: Building2,
    name: "Owned Media",
    tagline: "Aset yang kamu kontrol",
    tactics: ["Marketplace", "Website", "Konten", "Social Media"],
  },
  {
    icon: MessageSquareQuote,
    name: "Earned Media",
    tagline: "Bukti sosial organik",
    tactics: ["Review", "KOL", "Word of mouth", "UGC"],
  },
];

export function TrifectaMarketing() {
  return (
    <section className="relative text-white section-padding overflow-hidden grain-overlay bg-[#06243B]">
      <div className="container-mote relative z-10">
        <SectionHeading
          eyebrow="Pendekatan Trifecta"
          title="Bukan cuma Ads."
          description="Kebanyakan agency hanya fokus di Paid Media—pasang iklan, selesai. Mote mengelola ketiga sisi secara terintegrasi: iklan yang efisien, konten dan marketplace yang optimal, dan strategi untuk mendapatkan social proof organik."
          light
        />

        <div className="mt-14 lg:mt-20">
          <DesktopTriangle />
          <MobileStack />
        </div>
      </div>
    </section>
  );
}

function DesktopTriangle() {
  return (
    <div className="hidden lg:block relative h-[520px] max-w-3xl mx-auto">
      <svg
        viewBox="0 0 600 520"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <path
          d="M 300 70 L 90 420"
          stroke="#EFEBDD"
          strokeOpacity="0.3"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 300 70 L 510 420"
          stroke="#EFEBDD"
          strokeOpacity="0.3"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 90 420 L 510 420"
          stroke="#EFEBDD"
          strokeOpacity="0.3"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <PillarNode pillar={pillars[0]} className="absolute left-1/2 -translate-x-1/2 top-0" />
      <PillarNode pillar={pillars[1]} className="absolute left-0 bottom-0" />
      <PillarNode pillar={pillars[2]} className="absolute right-0 bottom-0" />

      <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-[4px] bg-[#BDF24A] text-[#06243B] px-3 py-2 font-bold text-center">
          <div className="label">
            Mote handles
          </div>
          <div className="font-extrabold text-lg leading-tight">All three</div>
        </div>
      </div>
    </div>
  );
}

function MobileStack() {
  return (
    <div className="lg:hidden flex flex-col gap-5 max-w-md mx-auto">
      <div className="rounded-[12px] bg-[#BDF24A] text-[#06243B] px-5 py-3 text-center font-extrabold">
        Mote mengelola ketiga sisi
      </div>
      {pillars.map((p) => (
        <PillarCard pillar={p} key={p.name} />
      ))}
    </div>
  );
}

function PillarNode({
  pillar,
  className,
}: {
  pillar: (typeof pillars)[number];
  className?: string;
}) {
  const Icon = pillar.icon;
  return (
    // Latar solid, bukan white/[0.07]: garis segitiga digambar di belakang kartu,
    // dan lewat kartu tembus pandang ia melintas persis di atas nama pilarnya.
    <article
      // z-10 saja, tanpa `relative`: posisi tiap node datang dari className
      // (`absolute left-0 bottom-0` dst), dan `relative` akan menimpanya.
      className={`z-10 w-64 bg-[#0E2C44] border border-white/15 rounded-[12px] p-5 transition-colors hover:border-[#BDF24A]/45 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-10 rounded-[4px] bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="label text-[#BDF24A]">
            {pillar.tagline}
          </div>
          <h3 className="text-lg font-extrabold text-white leading-tight">
            {pillar.name}
          </h3>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {pillar.tactics.map((t) => (
          <li
            key={t}
            className="text-[11px] font-semibold px-2 py-1 rounded-[4px] bg-white/10 text-white/90"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function PillarCard({
  pillar,
}: {
  pillar: (typeof pillars)[number];
}) {
  const Icon = pillar.icon;
  return (
    <article className="bg-[#0E2C44] border border-white/15 rounded-[12px] p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-10 rounded-[4px] bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="label text-[#BDF24A]">
            {pillar.tagline}
          </div>
          <h3 className="text-lg font-extrabold text-white">{pillar.name}</h3>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {pillar.tactics.map((t) => (
          <li
            key={t}
            className="text-[11px] font-semibold px-2 py-1 rounded-[4px] bg-white/10 text-white/90"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
