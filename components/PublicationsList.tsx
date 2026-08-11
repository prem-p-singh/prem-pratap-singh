"use client";

import { useMemo, useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import type { Publication } from "@/components/PublicationCard";

const INITIAL_COUNT = 8;

type FilterType = "all" | "journal" | "book";

export default function PublicationsList({ publications }: { publications: Publication[] }) {
  const [showAll, setShowAll] = useState(false);
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const allMethods = useMemo(() => {
    const methods = new Set<string>();
    publications.forEach((publication) => publication.methods?.forEach((method) => methods.add(method)));
    return Array.from(methods).sort();
  }, [publications]);

  const filtered = useMemo(
    () => publications.filter((publication) => {
      if (typeFilter !== "all" && publication.type !== typeFilter) return false;
      if (methodFilter !== "all" && !publication.methods?.includes(methodFilter)) return false;
      return true;
    }),
    [methodFilter, publications, typeFilter],
  );

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  function selectType(type: FilterType) {
    setTypeFilter(type);
    setShowAll(false);
  }

  return (
    <>
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter publications by type">
          {(["all", "journal", "book"] as FilterType[]).map((type) => {
            const label = type === "all" ? "All" : type === "journal" ? "Articles" : "Chapters";
            const count = type === "all" ? publications.length : publications.filter((publication) => publication.type === type).length;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={typeFilter === type}
                onClick={() => selectType(type)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {label} <span className="ml-1 opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          Method
          <select
            value={methodFilter}
            onChange={(event) => {
              setMethodFilter(event.target.value);
              setShowAll(false);
            }}
            className="max-w-56 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="all">All methods</option>
            {allMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </label>
      </div>

      {displayed.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {displayed.map((publication, index) => (
            <article key={`${publication.title}-${index}`} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex items-start justify-between gap-4">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  publication.type === "book"
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : "bg-violet-500/15 text-violet-700 dark:text-violet-300"
                }`}>
                  <BookOpen className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-2xl font-black tabular-nums text-foreground/15">{publication.year}</span>
              </div>

              <h3 className="mt-4 line-clamp-3 font-semibold leading-snug text-foreground">
                {publication.title}
              </h3>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                <span className="line-clamp-1 text-xs font-medium text-primary">{publication.venue}</span>
                {publication.links?.paper && publication.links.paper !== "#" && (
                  <a
                    href={publication.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    aria-label={`Open ${publication.title}`}
                  >
                    <ExternalLink className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                )}
              </div>

              <details className="group/details mt-3">
                <summary className="cursor-pointer list-none text-xs font-semibold text-muted-foreground hover:text-foreground marker:content-none">
                  Authors & methods <span className="inline-block transition-transform group-open/details:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="mt-3 rounded-xl bg-muted/40 p-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">{publication.authors.join(", ")}</p>
                  {publication.methods && publication.methods.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {publication.methods.map((method) => (
                        <span key={method} className="rounded-full border border-border bg-background px-2 py-1 text-xs font-medium text-foreground/75">
                          {method}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
          No publications match these filters.
        </p>
      )}

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
            {showAll ? "Show less" : `Show ${filtered.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </>
  );
}
