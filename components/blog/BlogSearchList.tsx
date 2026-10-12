"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatContentDate } from "@/lib/date";
import type { BlogPostMeta } from "@/lib/mdx";

interface BlogSearchListProps {
  posts: BlogPostMeta[];
}

type TrailId = "all" | "vineyard" | "signals" | "sensing" | "defense";

const researchTrails: Array<{
  id: TrailId;
  label: string;
  keywords: string[];
}> = [
  { id: "all", label: "Everything", keywords: [] },
  { id: "vineyard", label: "Vineyard", keywords: ["grapevine", "vineyard", "vine ", "grbv"] },
  { id: "signals", label: "Omics & RNA", keywords: ["omics", "rna", "gene", "genom", "molecular", "mass spectrometry"] },
  { id: "sensing", label: "Sensing & 3D", keywords: ["3d", "sensing", "point cloud", "imaging", "geometry", "biomarker", "detection"] },
  { id: "defense", label: "Disease defense", keywords: ["pathogen", "disease", "defense", "resistance", "fusarium", "xylella", "phytophthora"] },
];

const DEFAULT_VISIBLE = 6;

function searchableText(post: BlogPostMeta) {
  return [post.title, post.description, ...(post.tags ?? [])].join(" ").toLowerCase();
}

export default function BlogSearchList({ posts }: BlogSearchListProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTrail, setActiveTrail] = useState<TrailId>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const trail = researchTrails.find((item) => item.id === activeTrail) ?? researchTrails[0];
    return posts.filter((post) => {
      const haystack = searchableText(post);
      const matchesTrail = trail.keywords.length === 0 || trail.keywords.some((keyword) => haystack.includes(keyword));
      return matchesTrail && (!q || haystack.includes(q));
    });
  }, [activeTrail, posts, query]);

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = Math.max(0, filtered.length - DEFAULT_VISIBLE);

  function chooseTrail(id: TrailId) {
    setActiveTrail(id);
    setShowAll(false);
  }

  function surpriseMe() {
    const pool = filtered.length > 0 ? filtered : posts;
    const post = pool[Math.floor(Math.random() * pool.length)];
    if (post) router.push(`/blog/${post.slug}`);
  }

  return (
    <section
      className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24"
      aria-labelledby="blog-trails-title"
    >
      <div className="lg:col-span-4">
        <p className="section-kicker">Research radar</p>
        <h2 id="blog-trails-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
          Pick a trail
        </h2>

        <div
          className="mt-6 flex flex-wrap gap-x-5 gap-y-1 lg:flex-col"
          role="group"
          aria-label="Research trails"
        >
          {researchTrails.map((trail) => {
            const count = posts.filter((post) => {
              const haystack = searchableText(post);
              return trail.keywords.length === 0 || trail.keywords.some((keyword) => haystack.includes(keyword));
            }).length;
            return (
              <button
                key={trail.id}
                type="button"
                aria-pressed={activeTrail === trail.id}
                onClick={() => chooseTrail(trail.id)}
                className="py-1.5 text-left text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground aria-pressed:text-accent aria-pressed:underline"
              >
                {trail.label} <span className="tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={surpriseMe}
          className="mt-5 text-sm text-accent underline-offset-4 hover:underline"
        >
          Surprise me
        </button>
      </div>

      <div className="lg:col-span-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
          <h3 className="font-sans! text-base font-semibold text-foreground">
            Visual index{" "}
            <span className="font-normal tabular-nums text-muted-foreground">{filtered.length}</span>
          </h3>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Search this trail..."
            aria-label="Search articles"
            className="paper-control w-full px-3 py-2 text-sm placeholder:text-muted-foreground sm:w-72"
          />
        </div>

        {filtered.length > 0 ? (
          <>
            <ul className="mt-8">
              {visible.map((post) => {
                const image = post.visualSummary || post.image;
                return (
                  <li
                    key={post.slug}
                    className={`relative grid gap-x-8 gap-y-4 border-t border-border py-6 first:border-t-0 first:pt-0 ${
                      image ? "sm:grid-cols-4" : ""
                    }`}
                  >
                    {image && (
                      <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-md border border-border sm:max-w-none">
                        <Image
                          src={image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 320px, 200px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className={image ? "sm:col-span-3" : undefined}>
                      <p className="flex items-center gap-2 text-sm tabular-nums text-muted-foreground">
                        <time dateTime={post.date}>
                          {formatContentDate(post.date, { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </p>
                      <h3 className="mt-1 text-xl leading-snug text-foreground">
                        {/* The link's ::after covers the row, so the thumbnail is clickable too. */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.description && (
                        <p className="mt-2 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                          {post.description}
                        </p>
                      )}
                      {post.tags.length > 0 && (
                        <p className="mt-2 text-sm text-muted-foreground">{post.tags.join(", ")}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {hiddenCount > 0 && (
              <div className="mt-2 border-t border-border pt-6">
                <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
                  {showAll ? "Show less" : `Show ${hiddenCount} more`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8">
            <p className="text-base text-muted-foreground">No matching notes.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTrail("all");
              }}
              className="mt-3 text-sm text-accent underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
