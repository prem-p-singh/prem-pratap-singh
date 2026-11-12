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
          background: "#1f4d3a",
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
        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 14,
                  color: "#e9c46a",
                  border: "1px solid rgba(251,246,238,0.26)",
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
            color: "#fbf6ee",
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
            color: "#d3e4d9",
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
            borderTop: "1px solid rgba(251,246,238,0.26)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#6b1d35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbf6ee",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              PS
            </div>
            <div style={{ fontSize: 18, color: "#d3e4d9" }}>Prem Pratap Singh</div>
          </div>
          <div style={{ fontSize: 16, color: "#d3e4d9" }}>prempsingh.com/blog</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
