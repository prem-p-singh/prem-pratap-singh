"use client";

import { useMemo, useState } from "react";
import pathogens from "@/profile/pathogenGenomes.json";

type Row = (typeof pathogens)[number];
type SortKey = "assemblies" | "pctWell" | "pathogen";

const GROUP_STYLE: Record<string, string> = {
  Bacterium: "bg-data-wash text-data",
  Fungus: "bg-field-wash text-field",
  Oomycete: "bg-decision-wash text-decision",
};

export default function PathogenTable() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("assemblies");

  const groups = ["All", "Bacterium", "Fungus", "Oomycete"];

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = pathogens as Row[];
    if (group !== "All") out = out.filter((r) => r.group === group);
    if (q) {
      out = out.filter((r) =>
        `${r.pathogen} ${r.disease} ${r.group}`.toLowerCase().includes(q)
      );
    }
    return [...out].sort((a, b) =>
      sort === "pathogen"
        ? a.pathogen.localeCompare(b.pathogen)
        : (b[sort] as number) - (a[sort] as number)
    );
  }, [query, group, sort]);

  return (
    <div className="not-prose my-8">
      {/* Controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a pathogen or disease..."
          aria-label="Search pathogens"
          className="paper-control w-full px-3 py-2 text-sm placeholder:text-muted-foreground sm:flex-1"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by pathogen group">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-field hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm leading-normal">
          <thead>
            <tr className="border-b border-border text-left">
              {([
                ["pathogen", "Pathogen"],
                ["assemblies", "Genomes"],
                ["pctWell", "Good quality"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  className="px-4 py-3"
                  aria-sort={sort === key ? (key === "pathogen" ? "ascending" : "descending") : "none"}
                >
                  <button
                    type="button"
                    onClick={() => setSort(key)}
                    className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
                      sort === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                    {sort === key && (
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.pathogen}>
                <td className="px-4 py-3">
                  <span className="font-semibold italic text-foreground">{r.pathogen}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {r.disease}
                  </span>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      GROUP_STYLE[r.group] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r.group}
                  </span>
                </td>
                <td className="px-4 py-3 align-top font-semibold tabular-nums text-foreground">
                  {r.assemblies.toLocaleString()}
                  {r.assemblies === 0 && (
                    <span className="block text-xs font-normal text-danger">none</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  {r.assemblies > 0 ? (
                    <>
                      <span className="tabular-nums text-foreground">{r.pctWell.toFixed(0)}%</span>
                      <span className="block text-xs tabular-nums text-muted-foreground">
                        {r.wellAssembled.toLocaleString()} of {r.assemblies.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">&ndash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Showing {rows.length} of {pathogens.length} pathogens. &ldquo;Good quality&rdquo; means the
        assembly reaches chromosome level or better.
      </p>
    </div>
  );
}
