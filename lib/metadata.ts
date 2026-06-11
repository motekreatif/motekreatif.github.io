import type { Metadata } from "next";
import { SITE } from "./constants";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  /** Relatif ke domain (mis. "/img/meta.webp") atau URL absolut. Default share card brand. */
  image?: string;
};

export function buildMeta({
  title,
  description,
  path = "/",
  image = "/img/meta.webp",
}: BuildMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "id_ID",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
