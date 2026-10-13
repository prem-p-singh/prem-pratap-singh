"use client";

import { useMemo, useState } from "react";
import PublicationCard, { type Publication } from "@/components/PublicationCard";

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-field hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              >
                {label} <span className="ml-1 font-normal tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          Method
          <select
            value={methodFilter}
            onChange={(event) => {
              setMethodFilter(event.target.value);
              setShowAll(false);
            }}
            className="paper-control max-w-56 px-3 py-2 text-sm"
          >
            <option value="all">All methods</option>
            {allMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </label>
      </div>

      {displayed.length > 0 ? (
        <ul className="paper-panel mt-5 divide-y divide-border px-5 sm:px-7">
          {displayed.map((publication, index) => (
            <li key={`${publication.title}-${index}`} className="py-5">
              <PublicationCard publication={publication} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="paper-panel mt-5 px-6 py-8 text-sm text-muted-foreground">
          No publications match these filters.
        </p>
      )}

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-5">
          <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
            {showAll ? "Show less" : `Show ${filtered.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </>
  );
}
