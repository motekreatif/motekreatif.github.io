import type { Metadata } from "next";
import { SITE } from "./constants";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildMeta({ title, description, path = "/" }: BuildMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
