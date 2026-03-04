import { getAllPosts } from "@/lib/mdx";

const siteUrl = "https://www.prempsingh.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const feedItems = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description || "")}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>ppssingh@ucdavis.edu (Prem Pratap Singh)</author>${
        post.tags && post.tags.length > 0
          ? post.tags.map((tag) => `\n      <category>${escapeXml(tag)}</category>`).join("")
          : ""
      }
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Prem Pratap Singh&apos;s Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Research insights on plant-pathogen interactions, multi-omics, grapevine virology, and sustainable agriculture by Prem Pratap Singh.</description>
    <language>en-us</language>
    <managingEditor>ppssingh@ucdavis.edu (Prem Pratap Singh)</managingEditor>
    <webMaster>ppssingh@ucdavis.edu (Prem Pratap Singh)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/images/profile.jpg</url>
      <title>Prem Pratap Singh&apos;s Blog</title>
      <link>${siteUrl}</link>
    </image>
${feedItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
