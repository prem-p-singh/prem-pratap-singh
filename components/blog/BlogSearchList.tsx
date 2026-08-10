"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPostMeta } from "@/lib/mdx";
import { formatContentDate } from "@/lib/date";

interface BlogSearchListProps {
  posts: BlogPostMeta[];
}

type TrailId = "all" | "vineyard" | "signals" | "sensing" | "defense";

const researchTrails: Array<{
  id: TrailId;
  label: string;
  hint: string;
  keywords: string[];
  dotClass: string;
}> = [
  {
    id: "all",
    label: "Everything",
    hint: "The full research notebook",
    keywords: [],
    dotClass: "bg-foreground",
  },
  {
    id: "vineyard",
    label: "Vineyard",
    hint: "Grapevines, viruses, and field questions",
    keywords: ["grapevine", "vineyard", "vine ", "grbv"],
    dotClass: "bg-emerald-500",
  },
  {
    id: "signals",
    label: "Omics & RNA",
    hint: "Genes, molecules, and cross-kingdom signals",
    keywords: ["omics", "rna", "gene", "genom", "molecular", "mass spectrometry"],
    dotClass: "bg-violet-500",
  },
  {
    id: "sensing",
    label: "Sensing & 3D",
    hint: "Earlier signals and sharper measurements",
    keywords: ["3d", "sensing", "point cloud", "imaging", "geometry", "biomarker", "detection"],
    dotClass: "bg-sky-500",
  },
  {
    id: "defense",
    label: "Disease defense",
    hint: "Pathogens, resistance, and management",
    keywords: ["pathogen", "disease", "defense", "resistance", "fusarium", "xylella", "phytophthora"],
    dotClass: "bg-amber-500",
  },
];

const DEFAULT_VISIBLE = 4;

function searchableText(post: BlogPostMeta) {
  return [post.title, post.description, ...(post.tags ?? [])]
    .join(" ")
    .toLowerCase();
}

export default function BlogSearchList({ posts }: BlogSearchListProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTrail, setActiveTrail] = useState<TrailId>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const trail = researchTrails.find((item) => item.id === activeTrail) ?? researchTrails[0];
    return posts.filter((p) => {
      const haystack = searchableText(p);
      const matchesTrail = trail.keywords.length === 0 || trail.keywords.some((keyword) => haystack.includes(keyword));
      return matchesTrail && (!q || haystack.includes(q));
    });
  }, [activeTrail, query, posts]);

  const isFiltering = query.trim().length > 0 || activeTrail !== "all";
  const visible = isFiltering || showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
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
    <>
      <div className="mb-8 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Research radar
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Follow the question that catches you
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Pick a trail to reshape the reading list, or let the notebook choose an article for you.
            </p>
          </div>
          <button
            type="button"
            onClick={surpriseMe}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
            Surprise me
          </button>
        </div>

        <div className="border-t border-border bg-muted/30 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="group" aria-label="Research trails">
            {researchTrails.map((trail) => {
              const count = posts.filter((post) => {
                const haystack = searchableText(post);
                return trail.keywords.length === 0 || trail.keywords.some((keyword) => haystack.includes(keyword));
              }).length;
              const selected = activeTrail === trail.id;
              return (
                <button
                  key={trail.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => chooseTrail(trail.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary/50 bg-background shadow-sm"
                      : "border-transparent hover:border-border hover:bg-background/70"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className={`size-2 rounded-full ${trail.dotClass}`} />
                      {trail.label}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                    {trail.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">Reading list</h3>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {filtered.length} of {posts.length}
          </span>
        </div>

        <div className="relative w-full sm:w-80">
          <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within this trail..."
            aria-label="Search articles"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
        <div className="space-y-4">
          {visible.map((post) => {
            const formattedDate = formatContentDate(post.date, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                      <time dateTime={post.date}>{formattedDate}</time>
                      <span className="hidden sm:inline">·</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 mb-3">
                        {post.description}
                      </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 4 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{post.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:flex flex-shrink-0 items-center">
                    <svg
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Show more / Show less — only for the unfiltered notebook */}
        {!isFiltering && hiddenCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              {showAll ? (
                <>
                  Show less
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              ) : (
                <>
                  Show {hiddenCount} more {hiddenCount === 1 ? "article" : "articles"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
        </>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">
            No articles match{" "}
            <span className="text-foreground font-medium">
              &quot;{query}&quot;
            </span>
            .
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveTrail("all");
            }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
