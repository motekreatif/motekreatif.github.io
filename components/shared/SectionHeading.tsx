import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/shared/Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={light ? "navy" : "cream"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "font-extrabold text-balance",
          light ? "text-white" : "text-[#06243B]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-[length:clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.55]",
            light ? "text-white/75" : "text-[#3D4F60]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
