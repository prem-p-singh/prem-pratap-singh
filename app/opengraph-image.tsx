import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Prem Pratap Singh — Postdoctoral Scholar at UC Davis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)",
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
        {/* Subtle accent circle */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            fontSize: 18,
            color: "#a1a1aa",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Postdoctoral Scholar at UC Davis
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Prem Pratap Singh
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          Plant-pathogen interactions · Multi-omics · Grapevine virology · Bioinformatics
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#71717a",
            }}
          >
            prempsingh.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: 16,
              color: "#71717a",
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
