import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { KeyStat } from "./data";

const methodsDirectory = path.join(process.cwd(), "content/methods");

function extractCoverImage(content: string): string | undefined {
  const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1].trim() : undefined;
}

export interface MethodPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  image?: string;
  visualSummary?: string;
  /** The statistical technique this case study is built on. */
  method?: string;
  /** Where the method was originally developed (paper or project). */
  origin?: string;
  /** Link to the paper or repository behind the original work. */
  paperUrl?: string;
  paperLabel?: string;
  /** Public dataset the method was re-applied to. */
  reappliedTo?: string;
  codePath?: string;
  keyStats?: KeyStat[];
  toolkit?: string[];
  content: string;
}

export type MethodPostMeta = Omit<MethodPost, "content">;

function toMeta(slug: string, raw: string): MethodPost {
  const { data, content } = matter(raw);
  const generatedSummary = `/methods/${slug}/visual-summary.jpg`;
  const hasGeneratedSummary = fs.existsSync(path.join(process.cwd(), "public", generatedSummary));
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    readingTime: readingTime(content).text,
    image: data.image || extractCoverImage(content),
    visualSummary: data.visualSummary || (hasGeneratedSummary ? generatedSummary : undefined),
    method: data.method,
    origin: data.origin,
    paperUrl: data.paperUrl,
    paperLabel: data.paperLabel,
    reappliedTo: data.reappliedTo,
    codePath: data.codePath,
    keyStats: Array.isArray(data.keyStats) ? data.keyStats : undefined,
    toolkit: Array.isArray(data.toolkit) ? data.toolkit : undefined,
    content,
  };
}

export function getAllMethodPosts(): MethodPostMeta[] {
  if (!fs.existsSync(methodsDirectory)) return [];
  return fs
    .readdirSync(methodsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { content, ...meta } = toMeta(
        slug,
        fs.readFileSync(path.join(methodsDirectory, f), "utf8")
      );
      void content;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMethodPostBySlug(slug: string): MethodPost | null {
  if (!/^[a-zA-Z0-9-]+$/.test(slug)) return null;
  const full = path.join(methodsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  return toMeta(slug, fs.readFileSync(full, "utf8"));
}

export function getAllMethodSlugs(): string[] {
  if (!fs.existsSync(methodsDirectory)) return [];
  return fs
    .readdirSync(methodsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
