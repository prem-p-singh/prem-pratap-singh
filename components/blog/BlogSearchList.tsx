"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/mdx";

interface BlogSearchListProps {
  posts: BlogPostMeta[];
}

export default function BlogSearchList({ posts }: BlogSearchListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [
        p.title,
        p.description,
        ...(p.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, posts]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} of {posts.length}
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, description, tag..."
            aria-label="Search articles"
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );

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
            onClick={() => setQuery("")}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
