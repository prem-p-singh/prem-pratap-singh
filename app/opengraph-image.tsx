import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Prem Pratap Singh — plant scientist and data scientist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#6b1d35",
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
        {/* Top label */}
        <div
          style={{
            fontSize: 24,
            color: "#e9c46a",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          Crop biology · molecular evidence · data science
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: "#fbf6ee",
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
            color: "#ecd3d9",
            lineHeight: 1.45,
            maxWidth: "860px",
            marginBottom: "110px",
          }}
        >
          Plant-pathogen interactions · Multi-omics · Grapevine virology · Bioinformatics
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
            background: "#1f4d3a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#fbf6ee",
            }}
          >
            prempsingh.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: 20,
              color: "#d3e4d9",
            }}
          >
            <span>25+ Publications</span>
            <span>·</span>
            <span>2300+ Citations</span>
            <span>·</span>
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
