import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const dataDirectory = path.join(process.cwd(), "content/data");

/** First markdown image in the body, used as the card cover. */
function extractCoverImage(content: string): string | undefined {
  const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1].trim() : undefined;
}

export interface DataPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  image?: string;
  dataset?: string;
  source?: string;
  sourceUrl?: string;
  codePath?: string;
  records?: number;
  content: string;
}

export type DataPostMeta = Omit<DataPost, "content">;

function toMeta(slug: string, raw: string): DataPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    readingTime: readingTime(content).text,
    image: data.image || extractCoverImage(content),
    dataset: data.dataset,
    source: data.source,
    sourceUrl: data.sourceUrl,
    codePath: data.codePath,
    records: typeof data.records === "number" ? data.records : undefined,
    content,
  };
}

export function getAllDataPosts(): DataPostMeta[] {
  if (!fs.existsSync(dataDirectory)) return [];
  return fs
    .readdirSync(dataDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { content, ...meta } = toMeta(
        slug,
        fs.readFileSync(path.join(dataDirectory, f), "utf8")
      );
      void content;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDataPostBySlug(slug: string): DataPost | null {
  if (!/^[a-zA-Z0-9-]+$/.test(slug)) return null;
  const full = path.join(dataDirectory, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  return toMeta(slug, fs.readFileSync(full, "utf8"));
}

export function getAllDataSlugs(): string[] {
  if (!fs.existsSync(dataDirectory)) return [];
  return fs
    .readdirSync(dataDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
