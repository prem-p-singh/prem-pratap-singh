import type { Metadata } from "next";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | Prem Pratap Singh`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Prem Pratap Singh",
      title: socialTitle,
      description,
      images: [{ ...DEFAULT_SOCIAL_IMAGE, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
  };
}
