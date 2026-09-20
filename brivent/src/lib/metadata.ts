import { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedAt?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
  type = "website",
  publishedAt,
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteConfig.url}${ogImage}`
    : undefined;

  const published = publishedAt ? new Date(publishedAt) : null;
  const validPublished =
    published && !Number.isNaN(published.getTime()) ? published.toISOString() : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_NG",
      type,
      ...(type === "article" && validPublished ? { publishedTime: validPublished } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}