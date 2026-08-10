"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search, Shuffle } from "lucide-react";
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
  dotClass: string;
}> = [
  { id: "all", label: "Everything", keywords: [], dotClass: "bg-foreground" },
  { id: "vineyard", label: "Vineyard", keywords: ["grapevine", "vineyard", "vine ", "grbv"], dotClass: "bg-emerald-500" },
  { id: "signals", label: "Omics & RNA", keywords: ["omics", "rna", "gene", "genom", "molecular", "mass spectrometry"], dotClass: "bg-violet-500" },
  { id: "sensing", label: "Sensing & 3D", keywords: ["3d", "sensing", "point cloud", "imaging", "geometry", "biomarker", "detection"], dotClass: "bg-sky-500" },
  { id: "defense", label: "Disease defense", keywords: ["pathogen", "disease", "defense", "resistance", "fusarium", "xylella", "phytophthora"], dotClass: "bg-amber-500" },
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
    <>
      <div className="mb-8 rounded-3xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Research radar</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Pick a trail</h2>
          </div>
          <button
            type="button"
            onClick={surpriseMe}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Shuffle className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Surprise me
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Research trails">
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
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`size-2 rounded-full ${trail.dotClass}`} />
                {trail.label}
                <span className="text-xs tabular-nums opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">Visual index</h3>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{filtered.length}</span>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Search this trail..."
            aria-label="Search articles"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`relative flex h-full items-center justify-center overflow-hidden ${
                      index % 4 === 0
                        ? "bg-gradient-to-br from-emerald-500/20 to-sky-500/10"
                        : index % 4 === 1
                          ? "bg-gradient-to-br from-violet-500/20 to-rose-500/10"
                          : index % 4 === 2
                            ? "bg-gradient-to-br from-amber-500/20 to-orange-500/10"
                            : "bg-gradient-to-br from-sky-500/20 to-violet-500/10"
                    }`}>
                      <span className="absolute -right-10 -top-10 size-40 rounded-full border border-foreground/10" />
                      <span className="absolute -bottom-12 -left-8 size-32 rounded-full border border-foreground/10" />
                      <BookOpen className="size-12 text-foreground/15" strokeWidth={1.3} aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-3 font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {formatContentDate(post.date, { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
                {showAll ? "Show less" : `Show ${hiddenCount} more`}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">No matching notes.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTrail("all");
            }}
            className="mt-3 text-sm font-semibold text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
