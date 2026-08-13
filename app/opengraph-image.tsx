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
          background: "linear-gradient(135deg, #111713 0%, #18211b 52%, #111713 100%)",
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
            background: "radial-gradient(circle, rgba(131,198,158,0.18) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(166,180,223,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            fontSize: 18,
            color: "#83c69e",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Crop biology · molecular evidence · data science
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f5f0e6",
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
            color: "#b4b8b1",
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
              color: "#b4b8b1",
            }}
          >
            prempsingh.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: 16,
              color: "#b4b8b1",
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
