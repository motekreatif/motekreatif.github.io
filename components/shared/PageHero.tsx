import type { ReactNode } from "react";
import { Eyebrow } from "@/components/shared/Eyebrow";

export type PageHeroMedia = { src: string; srcMobile: string; alt: string };

export function PageHero({
  eyebrow,
  title,
  description,
  highlight,
  actions,
  media,
  variant = "default",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  highlight?: string;
  actions?: ReactNode;
  media?: PageHeroMedia;
  variant?: "default" | "compact";
}) {
  const renderTitle = () => {
    if (variant === "compact" || !highlight || !title.includes(highlight)) return title;
    const [before, after] = title.split(highlight);
    return (
      <>
        {before}
        <span className="highlight-text">{highlight}</span>
        {after}
      </>
    );
  };

  if (variant === "compact") {
    return (
      <section className="bg-[#F7F4EE] text-[#06243B] border-b border-[var(--line-on-cream)]">
        <div className="container-mote py-[clamp(2.5rem,5vw,4rem)] max-w-[44rem] flex flex-col gap-4">
          <Eyebrow tone="cream">{eyebrow}</Eyebrow>
          <h1 className="text-[length:clamp(1.875rem,1.2rem+2.6vw,3rem)] leading-[1.05] tracking-[-0.025em]">
            {title}
          </h1>
          {description && <p className="text-[#3D4F60]">{description}</p>}
          {actions && <div className="flex flex-wrap gap-3 mt-2">{actions}</div>}
        </div>
      </section>
    );
  }

  const text = (
    <div className={`flex flex-col gap-5 ${media ? "lg:col-span-7" : "max-w-[44rem]"}`}>
      <Eyebrow tone="yellow">{eyebrow}</Eyebrow>
      <h1 className="text-balance max-w-[18ch]">{renderTitle()}</h1>
      {description && <p className="lead text-[#06243B]/80">{description}</p>}
      {actions && <div className="flex flex-wrap gap-3 mt-2">{actions}</div>}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#F4D23A] text-[#06243B] grain-overlay border-b border-[var(--line-on-yellow)]">
      <div
        className={`container-mote relative z-10 py-[clamp(3rem,6vw,5rem)] ${
          media ? "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-center" : ""
        }`}
      >
        {text}
        {media && (
          <div className="lg:col-span-5">
            <div className="relative w-full border border-[#06243B] aspect-[3/1] lg:aspect-[4/3] lg:max-h-[360px] overflow-hidden">
              <picture>
                <source media="(min-width: 1024px)" srcSet={media.src} width={1200} height={900} />
                <img
                  src={media.srcMobile}
                  alt={media.alt}
                  width={780}
                  height={260}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
