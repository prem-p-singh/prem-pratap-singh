"use client";

import { useEffect, useState } from "react";

// Curated, paper-verified counts. OpenAlex "works" count is not equal to
// these because it also indexes preprints and other items, so journal and
// chapter counts stay static while citations and indices update live.
const STATIC = {
  journalArticles: "38",
  bookChapters: "22",
};

// Fallback values shown until the live fetch resolves (or if it fails).
// These match the conservative figures on the rest of the site.
const FALLBACK = {
  citations: "1,900+",
  indices: "h 25 · i10 38",
};

export default function JourneyImpact() {
  const [live, setLive] = useState<{ citations: string; indices: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/openalex")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || d?.error) return;
        const citations =
          typeof d.citations === "number"
            ? d.citations.toLocaleString()
            : FALLBACK.citations;
        const h = d.hIndex ?? 25;
        const i10 = d.i10Index ?? 38;
        setLive({ citations, indices: `h ${h} · i10 ${i10}` });
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cells = [
    { v: STATIC.journalArticles, l: "Journal articles" },
    { v: STATIC.bookChapters, l: "Book chapters" },
    { v: live?.citations ?? FALLBACK.citations, l: "Citations" },
    { v: live?.indices ?? FALLBACK.indices, l: "Indices" },
  ];

  return (
    <>
      <dl className="text-sm leading-normal">
        {cells.map((s) => (
          <div
            key={s.l}
            className="grid grid-cols-[9rem_1fr] gap-x-4 border-t border-border py-3 first:border-t-0 first:pt-0"
          >
            <dt className="text-muted-foreground">{s.l}</dt>
            <dd className="text-base font-semibold tabular-nums text-foreground">{s.v}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-border pt-3 text-xs text-muted-foreground">
        Citations and indices update automatically from OpenAlex.
      </p>
    </>
  );
}
