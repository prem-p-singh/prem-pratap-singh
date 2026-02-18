"use client";

import { useState } from "react";
import { googleScholar, scopus } from "@/data/analytics";

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
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-surface text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
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
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-surface text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
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
          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Since 2021</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl font-bold text-foreground">{googleScholar.since2021.citations.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Citations</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{googleScholar.since2021.hIndex}</p>
                <p className="text-xs text-muted-foreground">h-index</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{googleScholar.since2021.i10Index}</p>
                <p className="text-xs text-muted-foreground">i10-index</p>
              </div>
            </div>
          </div>

          {/* Citation chart — SVG line graph */}
          <div className="glass-card p-5">
            <p className="text-sm font-medium text-foreground mb-4">Citations per Year</p>
            <CitationGraph data={googleScholar.citationsByYear} />
          </div>

          {/* Link to profile */}
          <div className="text-center">
            <a
              href={googleScholar.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
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
          <div className="glass-card p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xl font-bold text-foreground">{scopus.metrics.citingDocuments.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Citing Documents</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{scopus.metrics.documents}</p>
                <p className="text-xs text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </div>

          {/* Link to profile */}
          <div className="text-center">
            <a
              href={scopus.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
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

function CitationGraph({ data }: { data: { year: number; count: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const padding = { top: 20, right: 20, bottom: 32, left: 44 };
  const width = 600;
  const height = 240;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxCount = Math.max(...data.map((d) => d.count));
  // Round up to a nice number for y-axis
  const yMax = Math.ceil(maxCount / 100) * 100;
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
  const yScale = (v: number) => padding.top + chartH - (v / yMax) * chartH;

  // Build line path
  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)} ${yScale(d.count).toFixed(1)}`)
    .join(" ");

  // Build area path (line + close along bottom)
  const areaPath = `${linePath} L ${xScale(data.length - 1).toFixed(1)} ${yScale(0).toFixed(1)} L ${xScale(0).toFixed(1)} ${yScale(0).toFixed(1)} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto min-w-[400px]"
        onMouseLeave={() => setHovered(null)}
      >
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
              className="fill-muted-foreground"
              fontSize={11}
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="var(--primary)" opacity={0.1} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points + year labels */}
        {data.map((d, i) => (
          <g key={d.year} onMouseEnter={() => setHovered(i)}>
            {/* Invisible larger hit area */}
            <circle cx={xScale(i)} cy={yScale(d.count)} r={16} fill="transparent" />

            {/* Visible dot */}
            <circle
              cx={xScale(i)}
              cy={yScale(d.count)}
              r={hovered === i ? 6 : 4}
              fill={hovered === i ? "var(--primary)" : "var(--background)"}
              stroke="var(--primary)"
              strokeWidth={2}
              className="transition-all duration-150"
            />

            {/* Tooltip on hover */}
            {hovered === i && (
              <g>
                <rect
                  x={xScale(i) - 28}
                  y={yScale(d.count) - 30}
                  width={56}
                  height={22}
                  rx={4}
                  fill="var(--foreground)"
                />
                <text
                  x={xScale(i)}
                  y={yScale(d.count) - 15}
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
              x={xScale(i)}
              y={height - 6}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={11}
            >
              {d.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card glow-hover p-5 text-center">
      <p className="text-3xl font-bold gradient-text mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
