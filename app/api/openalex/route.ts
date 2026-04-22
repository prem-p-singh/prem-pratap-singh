import { NextResponse } from "next/server";

// Cache for 24 hours. OpenAlex updates roughly weekly, so this is plenty.
export const revalidate = 86400;

const OPENALEX_AUTHOR_ID = "A5049732395"; // Prem Pratap Singh (ORCID 0000-0001-7921-9379)

interface OpenAlexAuthor {
  display_name: string;
  works_count: number;
  cited_by_count: number;
  summary_stats?: {
    h_index?: number;
    i10_index?: number;
    "2yr_mean_citedness"?: number;
  };
  counts_by_year?: { year: number; works_count: number; cited_by_count: number }[];
  updated_date?: string;
}

export async function GET() {
  try {
    // Polite API usage: identify the app via mailto param (OpenAlex recommendation)
    const url = `https://api.openalex.org/authors/${OPENALEX_AUTHOR_ID}?mailto=ppssingh@ucdavis.edu`;

    const res = await fetch(url, {
      headers: { "User-Agent": "prempsingh.com/1.0 (ppssingh@ucdavis.edu)" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `OpenAlex returned ${res.status}` },
        { status: 502 }
      );
    }

    const data: OpenAlexAuthor = await res.json();

    const citationsByYear = (data.counts_by_year || [])
      .map((y) => ({ year: y.year, count: y.cited_by_count }))
      .sort((a, b) => a.year - b.year);

    return NextResponse.json({
      name: data.display_name,
      works: data.works_count,
      citations: data.cited_by_count,
      hIndex: data.summary_stats?.h_index ?? null,
      i10Index: data.summary_stats?.i10_index ?? null,
      twoYearMeanCitedness: data.summary_stats?.["2yr_mean_citedness"] ?? null,
      citationsByYear,
      updatedAt: data.updated_date ?? null,
      source: "OpenAlex",
      profileUrl: `https://openalex.org/authors/${OPENALEX_AUTHOR_ID}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
