"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatContentDate } from "@/lib/date";
import { FieldIcon } from "@/components/icons/PortfolioIcons";
import type { BlogPostMeta } from "@/lib/mdx";

interface BlogSearchListProps {
  posts: BlogPostMeta[];
}

type TrailId = "all" | "vineyard" | "signals" | "sensing" | "defense";

const researchTrails: Array<{
  id: TrailId;
  label: string;
  keywords: string[];
  dot: string;
}> = [
  // Dot colours as the previous design had them, one family per trail.
  { id: "all", label: "Everything", keywords: [], dot: "bg-foreground" },
  { id: "vineyard", label: "Vineyard", keywords: ["grapevine", "vineyard", "vine ", "grbv"], dot: "bg-field" },
  { id: "signals", label: "Omics & RNA", keywords: ["omics", "rna", "gene", "genom", "molecular", "mass spectrometry"], dot: "bg-biology" },
  { id: "sensing", label: "Sensing & 3D", keywords: ["3d", "sensing", "point cloud", "imaging", "geometry", "biomarker", "detection"], dot: "bg-data" },
  { id: "defense", label: "Disease defense", keywords: ["pathogen", "disease", "defense", "resistance", "fusarium", "xylella", "phytophthora"], dot: "bg-decision" },
];

const tagClass =
  "rounded-full border border-field/20 bg-field-wash px-3 py-1 text-xs font-semibold text-field";

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
          className="mt-6 flex flex-wrap gap-2"
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
                className="group inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-field hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              >
                <span
                  className={`mr-2 size-2 rounded-full group-aria-pressed:bg-primary-foreground ${trail.dot}`}
                  aria-hidden="true"
                />
                {trail.label} <span className="ml-1 font-normal tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={surpriseMe}
          className="btn-outline mt-6"
        >
          Surprise me
        </button>
      </div>

      <div className="lg:col-span-8">
        <div className="paper-panel flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {visible.map((post) => {
                const image = post.visualSummary || post.image;
                // Without an image the first tag sits in the tinted band, so the list starts at the second.
                const tags = image ? post.tags : post.tags.slice(1);
                return (
                  <li key={post.slug} className="paper-panel flex flex-col">
                    {image ? (
                      <div className="relative aspect-video border-b border-border">
                        <Image
                          src={image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      // No image: a tinted band with the notebook's field icon and the post's first tag.
                      <div className="flex items-center justify-between gap-4 border-b border-border bg-field-wash px-6 py-5">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-field">
                          <FieldIcon size={22} />
                        </span>
                        {post.tags[0] && (
                          <span className="rounded-full border border-field/20 bg-card px-3 py-1 text-xs font-semibold text-field">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex justify-between gap-4 text-sm tabular-nums text-muted-foreground">
                        <time dateTime={post.date}>
                          {formatContentDate(post.date, { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                        <span>{post.readingTime}</span>
                      </p>
                      <h3 className="mt-3 text-xl leading-snug text-foreground">
                        {/* The link's ::after covers the card, so the image or band is clickable too. */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.description && (
                        <p className="mb-5 mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {post.description}
                        </p>
                      )}
                      {tags.length > 0 && (
                        <ul className="mt-auto flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <li key={tag} className={tagClass}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {hiddenCount > 0 && (
              <div className="mt-6">
                <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
                  {showAll ? "Show less" : `Show ${hiddenCount} more`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="paper-panel mt-5 p-6">
            <p className="text-base text-muted-foreground">No matching notes.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTrail("all");
              }}
              className="mt-3 text-sm font-semibold text-field underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
