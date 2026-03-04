"use client";

import { useState } from "react";
import { googleScholar, scopus } from "@/data/analytics";
import { ShinyCard } from "@/components/ui/shiny-card";

type Tab = "scholar" | "scopus";

export default function ScholarAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("scholar");

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("scholar")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "scholar"
              ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
              : "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--foreground)]/50 hover:text-[var(--foreground)]"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
            Google Scholar
          </span>
        </button>
        <button
          onClick={() => setActiveTab("scopus")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "scopus"
              ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
              : "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--foreground)]/50 hover:text-[var(--foreground)]"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 19.059l-12-6.529-12 6.529 12 6.529 12-6.529zm-12-7.412l-12-6.529 12-6.529 12 6.529-12 6.529z" />
            </svg>
            Scopus
          </span>
        </button>
      </div>

      {/* Google Scholar Panel */}
      {activeTab === "scholar" && (
        <div className="space-y-6">
          {/* Metrics cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MetricCard label="Total Citations" value={googleScholar.metrics.citations.toLocaleString()} />
            <MetricCard label="h-index" value={googleScholar.metrics.hIndex.toString()} />
            <MetricCard label="i10-index" value={googleScholar.metrics.i10Index.toString()} />
          </div>

          {/* Since 2021 row */}
          <ShinyCard className="p-4" duration={5500}>
            <p className="text-xs text-[var(--muted-foreground)] mb-3 font-medium uppercase tracking-wide">Since 2021</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl font-bold text-[var(--foreground)]">{googleScholar.since2021.citations.toLocaleString()}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Citations</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--foreground)]">{googleScholar.since2021.hIndex}</p>
                <p className="text-xs text-[var(--muted-foreground)]">h-index</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--foreground)]">{googleScholar.since2021.i10Index}</p>
                <p className="text-xs text-[var(--muted-foreground)]">i10-index</p>
              </div>
            </div>
          </ShinyCard>

          {/* Citation bar chart */}
          <ShinyCard className="p-5" duration={5000}>
            <p className="text-sm font-medium text-[var(--foreground)] mb-4">Citations per Year</p>
            <CitationBarGraph data={googleScholar.citationsByYear} />
          </ShinyCard>

          {/* Link to profile */}
          <div className="text-center">
            <a
              href={googleScholar.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] hover:underline"
            >
              View full Google Scholar profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Scopus Panel */}
      {activeTab === "scopus" && (
        <div className="space-y-6">
          {/* Metrics cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MetricCard label="Total Citations" value={scopus.metrics.citations.toLocaleString()} />
            <MetricCard label="Documents" value={scopus.metrics.documents.toString()} />
            <MetricCard label="h-index" value={scopus.metrics.hIndex.toString()} />
          </div>

          {/* Additional info */}
          <ShinyCard className="p-4" duration={5500}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xl font-bold text-[var(--foreground)]">{scopus.metrics.citingDocuments.toLocaleString()}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Citing Documents</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--foreground)]">{scopus.metrics.documents}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Total Documents</p>
              </div>
            </div>
          </ShinyCard>

          {/* Link to profile */}
          <div className="text-center">
            <a
              href={scopus.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] hover:underline"
            >
              View full Scopus profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      )}
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

  const maxCount = Math.max(...data.map((d) => d.count));
  const yMax = Math.ceil(maxCount / 100) * 100;
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  const barCount = data.length;
  const gap = 8;
  const barWidth = (chartW - gap * (barCount - 1)) / barCount;

  const xBar = (i: number) => padding.left + i * (barWidth + gap);
  const yScale = (v: number) => padding.top + chartH - (v / yMax) * chartH;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto min-w-[400px]"
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

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <ShinyCard className="p-5 text-center" duration={4500}>
      <p className="text-3xl font-bold text-[var(--foreground)] mb-1">{value}</p>
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
    </ShinyCard>
  );
}
