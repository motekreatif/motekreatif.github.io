import { cn } from "@/lib/cn";

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
        <span className={cn("eyebrow", light && "eyebrow-light")}>{eyebrow}</span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-extrabold text-balance",
          light ? "text-white" : "text-[#06243B]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg leading-relaxed",
            light ? "text-white/75" : "text-[#3D4F60]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
