import Image from "next/image";

/** Real product screenshot with caption, matching the setup preview's `.shot` / `.shot-cap`. */
export function ShotFigure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="m-0">
      <div className="rounded-2xl overflow-hidden border border-black/8 shadow-[0_1px_2px_rgba(6,36,59,0.05),0_14px_30px_-24px_rgba(6,36,59,0.18)]">
        <Image src={src} alt={alt} width={width} height={height} className="block w-full h-auto" unoptimized />
      </div>
      <figcaption className="text-[0.8rem] text-[#3D4F60] mt-[0.55rem]">{caption}</figcaption>
    </figure>
  );
}
