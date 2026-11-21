import { ImageResponse } from "next/og";
import { og } from "@/lib/og-theme";
import { bookChapters, publications } from "@/profile/publications";

export const runtime = "edge";
export const alt = "Prem Pratap Singh, plant scientist and data scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Counted from the publication list, the same way the homepage counts them,
// so the image cannot fall out of step with the site.
const articleCount = publications.filter(
  (publication) => publication.venue !== "In Preparation"
).length;

export default async function OGImage() {
  // The round mark, read from the same file the top bar uses.
  const mark = await fetch(new URL("../public/images/logo-mark.png", import.meta.url)).then((response) =>
    response.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: og.paper,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Mark, top right */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={mark as unknown as string}
          width={132}
          height={132}
          style={{ position: "absolute", top: 64, right: 80 }}
        />

        {/* Top label */}
        <div
          style={{
            fontSize: 24,
            color: og.accent,
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          Crop biology, molecular evidence, data science
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: og.ink,
            lineHeight: 1,
            marginBottom: "28px",
            letterSpacing: "-0.03em",
          }}
        >
          Prem Pratap Singh
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: og.ink2,
            lineHeight: 1.45,
            maxWidth: "860px",
            marginBottom: "110px",
          }}
        >
          Plant-pathogen interactions, multi-omics, grapevine virology, bioinformatics
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "110px",
            padding: "0 80px",
            background: og.paper2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: og.ink,
            }}
          >
            prempsingh.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: 20,
              color: og.ink2,
            }}
          >
            <span>{articleCount} peer-reviewed articles</span>
            <span>{bookChapters.length} book chapters</span>
            <span>2300+ Citations</span>
            <span>h-index 25</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
