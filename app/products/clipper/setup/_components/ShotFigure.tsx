import Image from "next/image";

/** Real product screenshot with caption — bingkai terang membulat, keterbacaan nomor satu. */
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
      <div className="rounded-[20px] overflow-hidden border border-[rgba(25,25,25,0.10)] bg-white shadow-[0_14px_40px_-30px_rgba(25,25,25,0.35)]">
        <Image src={src} alt={alt} width={width} height={height} className="block w-full h-auto" unoptimized />
      </div>
      <figcaption className="text-[0.8rem] text-[#5F5F5C] mt-[0.55rem]">{caption}</figcaption>
    </figure>
  );
}
