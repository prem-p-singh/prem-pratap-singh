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
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a pathogen or disease..."
          aria-label="Search pathogens"
          className="flex-grow bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
        />
        <div className="flex gap-1.5 flex-wrap">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                group === g
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              {([
                ["pathogen", "Pathogen"],
                ["assemblies", "Genomes"],
                ["pctWell", "Good quality"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} className="px-4 py-2.5">
                  <button
                    onClick={() => setSort(key)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      sort === key ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                    {sort === key && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
              <tr key={r.pathogen} className="hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3">
                  <span className="italic text-foreground font-medium">{r.pathogen}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {r.disease}
                  </span>
                  <span
                    className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded ${
                      GROUP_STYLE[r.group] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r.group}
                  </span>
                </td>
                <td className="px-4 py-3 align-top tabular-nums font-semibold text-foreground">
                  {r.assemblies.toLocaleString()}
                  {r.assemblies === 0 && (
                    <span className="block text-xs font-normal text-danger">none</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  {r.assemblies > 0 ? (
                    <>
                      <span className="tabular-nums text-foreground">{r.pctWell.toFixed(0)}%</span>
                      <span className="block text-xs text-muted-foreground">
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
