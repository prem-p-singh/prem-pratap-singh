"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, Network, TrendingUp } from "lucide-react";
import { googleScholar, scopus } from "@/profile/analytics";

type Tab = "scholar" | "scopus" | "openalex";

interface OpenAlexData {
  name: string;
  works: number;
  citations: number;
  citationsReportedByOpenAlex?: number;
  excludedCitations?: number;
  firstPaperYear?: number;
  hIndex: number | null;
  i10Index: number | null;
  twoYearMeanCitedness: number | null;
  citationsByYear: { year: number; count: number }[];
  updatedAt: string | null;
  profileUrl: string;
}

export default function ScholarAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("scholar");
  const [openAlex, setOpenAlex] = useState<OpenAlexData | null>(null);
  const [openAlexError, setOpenAlexError] = useState<string | null>(null);
  const recentCitationShare = Math.round(
    (googleScholar.since2021.citations / googleScholar.metrics.citations) * 100
  );

  useEffect(() => {
    if (activeTab !== "openalex" || openAlex) return;
    let cancelled = false;
    fetch("/api/openalex")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) setOpenAlexError(data.error);
        else setOpenAlex(data);
      })
      .catch((e) => {
        if (!cancelled) setOpenAlexError(e.message || "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, openAlex]);

  const profileLink =
    activeTab === "scholar"
      ? googleScholar.profileUrl
      : activeTab === "scopus"
        ? scopus.profileUrl
        : openAlex?.profileUrl;

  return (
    <div className="min-w-0 overflow-hidden rounded-[2rem] border border-border bg-card">
      <div className="flex flex-col gap-5 border-b border-border p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
            Citation signals
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Evidence that keeps traveling
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-2xl border border-border bg-background/65 p-1">
          {([
            ["scholar", "Scholar"],
            ["scopus", "Scopus"],
            ["openalex", "OpenAlex"],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors sm:px-4 ${
                activeTab === tab
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {tab === "openalex" && (
                <span className="ml-1.5 hidden rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] text-emerald-600 dark:text-emerald-300 sm:inline">
                  LIVE
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 p-4 sm:p-7">
        {activeTab === "scholar" && (
          <div className="grid min-w-0 gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative min-w-0 overflow-hidden rounded-3xl border border-emerald-400/30 bg-emerald-400/[0.09] p-5 sm:p-6">
                <span className="absolute -right-8 -top-8 size-32 rounded-full border border-emerald-400/20" />
                <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                <p className="mt-8 text-5xl font-black tracking-[-0.06em] text-foreground sm:text-6xl">
                  {googleScholar.metrics.citations.toLocaleString()}
                </p>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">citations and counting</p>
              </div>

              <div className="min-w-0 rounded-3xl border border-border bg-background/60 p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3">
                  <MetricTile label="h-index" value={googleScholar.metrics.hIndex.toString()} />
                  <MetricTile label="i10-index" value={googleScholar.metrics.i10Index.toString()} />
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {googleScholar.since2021.citations.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">citations since 2021</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-300">{recentCitationShare}%</p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                      style={{ width: `${recentCitationShare}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                    Most citations arrived in the recent research window.
                  </p>
                </div>
              </div>
            </div>

            <CitationPanel data={googleScholar.citationsByYear} />
          </div>
        )}

        {activeTab === "scopus" && (
          <div className="grid min-w-0 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-w-0 overflow-hidden rounded-3xl border border-violet-400/30 bg-violet-400/[0.09] p-5 sm:p-6">
              <Network className="size-5 text-violet-600 dark:text-violet-300" aria-hidden="true" />
              <p className="mt-10 text-5xl font-black tracking-[-0.06em] text-foreground sm:text-6xl">
                {scopus.metrics.citations.toLocaleString()}
              </p>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">Scopus citations</p>
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-violet-400/20 pt-5">
                <MetricTile label="documents" value={scopus.metrics.documents.toString()} />
                <MetricTile label="h-index" value={scopus.metrics.hIndex.toString()} />
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-border bg-background/60 p-5 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Research network
              </p>
              <div className="mt-8 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <FlowMetric value={scopus.metrics.documents.toString()} label="works" />
                <span className="hidden text-muted-foreground/50 sm:block" aria-hidden="true">→</span>
                <FlowMetric value={scopus.metrics.citingDocuments.toLocaleString()} label="citing documents" />
                <span className="hidden text-muted-foreground/50 sm:block" aria-hidden="true">→</span>
                <FlowMetric value={scopus.metrics.citations.toLocaleString()} label="citations" />
              </div>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A compact view of how published studies move outward through the scientific literature.
              </p>
            </div>
          </div>
        )}

        {activeTab === "openalex" && (
          <div>
            {!openAlex && !openAlexError && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-border bg-background/60 p-5">
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-3 w-24 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {openAlexError && (
              <div className="rounded-3xl border border-border bg-background/60 px-6 py-12 text-center text-sm text-muted-foreground">
                Live data is temporarily unavailable ({openAlexError}). Scholar and Scopus remain available above.
              </div>
            )}

            {openAlex && (
              <div className="grid min-w-0 gap-5 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="min-w-0 rounded-3xl border border-sky-400/30 bg-sky-400/[0.09] p-5 sm:p-6">
                  <BookOpen className="size-5 text-sky-600 dark:text-sky-300" aria-hidden="true" />
                  <p className="mt-8 text-5xl font-black tracking-[-0.06em] text-foreground sm:text-6xl">
                    {openAlex.citations.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">live OpenAlex citations</p>
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <MetricTile label="works" value={openAlex.works.toString()} />
                    <MetricTile label="h-index" value={openAlex.hIndex?.toString() ?? "–"} />
                    <MetricTile label="i10-index" value={openAlex.i10Index?.toString() ?? "–"} />
                    <MetricTile
                      label="2-year mean"
                      value={openAlex.twoYearMeanCitedness?.toFixed(2) ?? "–"}
                    />
                  </div>
                </div>
                {openAlex.citationsByYear.length > 0 ? (
                  <CitationPanel data={openAlex.citationsByYear} />
                ) : (
                  <div className="flex min-h-72 items-center justify-center rounded-3xl border border-border bg-background/60 text-sm text-muted-foreground">
                    Annual citation data is not available yet.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {profileLink && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground">
              {activeTab === "openalex" && openAlex?.updatedAt
                ? `OpenAlex updated ${new Date(openAlex.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
                : "Profile metrics shown from the selected index."}
            </p>
            <a
              href={profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
            >
              Open full profile <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function CitationPanel({ data }: { data: { year: number; count: number }[] }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background/60 p-4 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Momentum
          </p>
          <p className="mt-1 text-lg font-bold text-foreground">Citations by year</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-600 dark:text-emerald-300">
          <TrendingUp className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-3">
        <CitationBarGraph data={data} />
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4">
      <p className="text-2xl font-black tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function FlowMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <p className="text-2xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function CitationBarGraph({ data }: { data: { year: number; count: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const padding = { top: 28, right: 20, bottom: 32, left: 44 };
  const width = 600;
  const height = 260;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const tickStep = Math.max(1, Math.ceil(maxCount / 40) * 10);
  const yMax = tickStep * 4;
  const yTicks = Array.from({ length: 5 }, (_, i) => tickStep * i);

  const barCount = data.length;
  const gap = 8;
  const barWidth = (chartW - gap * (barCount - 1)) / barCount;

  const xBar = (i: number) => padding.left + i * (barWidth + gap);
  const yScale = (v: number) => padding.top + chartH - (v / yMax) * chartH;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[280px]"
        onMouseLeave={() => setHovered(null)}
      >
        {/* Gradient definition for bars */}
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={yScale(tick)}
              x2={width - padding.right}
              y2={yScale(tick)}
              stroke="var(--border)"
              strokeDasharray={tick === 0 ? "0" : "4 4"}
              strokeWidth={tick === 0 ? 1 : 0.5}
            />
            <text
              x={padding.left - 8}
              y={yScale(tick) + 4}
              textAnchor="end"
              className="fill-[var(--muted-foreground)]"
              fontSize={11}
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Bars + year labels */}
        {data.map((d, i) => {
          const barH = (d.count / yMax) * chartH;
          const x = xBar(i);
          const y = yScale(d.count);
          const isHovered = hovered === i;

          return (
            <g key={d.year} onMouseEnter={() => setHovered(i)}>
              {/* Invisible larger hit area */}
              <rect
                x={x - 4}
                y={padding.top}
                width={barWidth + 8}
                height={chartH}
                fill="transparent"
              />

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={3}
                fill={isHovered ? "url(#barGradHover)" : "url(#barGrad)"}
                className="transition-all duration-200"
              />

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={x + barWidth / 2 - 28}
                    y={y - 28}
                    width={56}
                    height={22}
                    rx={4}
                    fill="var(--foreground)"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 13}
                    textAnchor="middle"
                    fill="var(--background)"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {d.count}
                  </text>
                </g>
              )}

              {/* Year label on x-axis */}
              <text
                x={x + barWidth / 2}
                y={height - 6}
                textAnchor="middle"
                className="fill-[var(--muted-foreground)]"
                fontSize={11}
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
