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
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter publications by type">
          {(["all", "journal", "book"] as FilterType[]).map((type) => {
            const label = type === "all" ? "All" : type === "journal" ? "Articles" : "Chapters";
            const count = type === "all" ? publications.length : publications.filter((publication) => publication.type === type).length;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={typeFilter === type}
                onClick={() => selectType(type)}
                className="text-sm text-muted-foreground underline-offset-8 transition-colors hover:text-foreground aria-pressed:font-semibold aria-pressed:text-foreground aria-pressed:underline aria-pressed:decoration-accent aria-pressed:decoration-2"
              >
                {label} <span className="font-normal tabular-nums text-muted-foreground">{count}</span>
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
        <ul>
          {displayed.map((publication, index) => (
            <li key={`${publication.title}-${index}`} className="border-b border-border py-5">
              <PublicationCard publication={publication} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-b border-border py-8 text-sm text-muted-foreground">
          No publications match these filters.
        </p>
      )}

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-6">
          <button type="button" onClick={() => setShowAll((value) => !value)} className="btn-outline">
            {showAll ? "Show less" : `Show ${filtered.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </>
  );
}
