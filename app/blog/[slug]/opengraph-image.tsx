import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/mdx";
import { formatContentDate } from "@/lib/date";

export const alt = "Blog post by Prem Pratap Singh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title || "Blog Post";
  const tags = post?.tags?.slice(0, 3) || [];
  const date = post
    ? formatContentDate(post.date, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const readingTime = post?.readingTime || "";

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
        {/* Accent circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(166,180,223,0.16) 0%, transparent 70%)",
          }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 14,
                  color: "#83c69e",
                  border: "1px solid #354238",
                  borderRadius: "9999px",
                  padding: "6px 16px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 48 : 56,
            fontWeight: 800,
            color: "#f5f0e6",
            lineHeight: 1.2,
            marginBottom: "32px",
            letterSpacing: "-0.02em",
            maxWidth: "900px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: 18,
            color: "#b4b8b1",
          }}
        >
          {date && <span>{date}</span>}
          {date && readingTime && <span>·</span>}
          {readingTime && <span>{readingTime}</span>}
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
            borderTop: "1px solid #354238",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #285f47, #46567d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e6",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              PS
            </div>
            <div style={{ fontSize: 18, color: "#b4b8b1" }}>Prem Pratap Singh</div>
          </div>
          <div style={{ fontSize: 16, color: "#b4b8b1" }}>prempsingh.com/blog</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
