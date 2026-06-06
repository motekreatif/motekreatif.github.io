import { cn } from "@/lib/cn";

type BlobProps = {
  variant?: "primary" | "dark" | "orange" | "pink";
  className?: string;
};

export function Blob({ variant = "primary", className }: BlobProps) {
  const fill = {
    primary: "#BDF24A",
    dark: "#06243B",
    orange: "#FF7E00",
    pink: "#06243B",
  }[variant];

  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <g transform="translate(300,300)">
        <path
          d="M165,-188C209,-148,234,-89,233,-32C232,25,205,80,167,127C129,174,80,213,24,219C-32,225,-94,200,-141,159C-188,118,-220,62,-225,3C-230,-56,-209,-118,-167,-159C-126,-201,-65,-221,-2,-220C61,-219,121,-198,165,-188Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export function WaveDivider({
  className,
  flip = false,
  fill = "#F7F4EE",
}: {
  className?: string;
  flip?: boolean;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "block w-full h-[60px] md:h-[100px]",
        flip && "rotate-180",
        className
      )}
    >
      <path
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"
        fill={fill}
      />
    </svg>
  );
}
