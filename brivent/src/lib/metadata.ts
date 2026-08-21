import { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: `${title} | ${siteConfig.shortName}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
