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
    // Articles data and chapters decision, as on the homepage; citations field, indices biology.
    { v: STATIC.journalArticles, l: "Journal articles", wash: "bg-data-wash", text: "text-data" },
    { v: STATIC.bookChapters, l: "Book chapters", wash: "bg-decision-wash", text: "text-decision" },
    { v: live?.citations ?? FALLBACK.citations, l: "Citations", wash: "bg-field-wash", text: "text-field" },
    { v: live?.indices ?? FALLBACK.indices, l: "Indices", wash: "bg-biology-wash", text: "text-biology" },
  ];

  return (
    <div className="paper-panel p-6 sm:p-7">
      <dl className="grid grid-cols-2 gap-3">
        {cells.map((s) => (
          <div
            key={s.l}
            className={`flex flex-col-reverse justify-end rounded-xl px-4 py-3 ${s.wash}`}
          >
            <dt className="text-sm font-semibold leading-snug text-foreground">{s.l}</dt>
            <dd className={`text-2xl font-semibold tabular-nums ${s.text}`}>{s.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Citations and indices update automatically from OpenAlex.
      </p>
    </div>
  );
}
