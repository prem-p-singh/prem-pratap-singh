"use client";

import { useEffect, useState } from "react";

// Curated, paper-verified counts. OpenAlex "works" count is not equal to
// these because it also indexes preprints and other items, so journal and
// chapter counts stay static while citations and indices update live.
const STATIC = {
  journalArticles: "36",
  bookChapters: "21",
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
    <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
      {cells.map((s) => (
        <div key={s.l} className="text-center">
          <p className="text-xl font-bold text-foreground">{s.v}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
        </div>
      ))}
      <p className="col-span-2 sm:col-span-4 text-center text-[11px] text-muted-foreground/70 mt-2">
        Citations and indices update automatically from OpenAlex.
      </p>
    </div>
  );
}
