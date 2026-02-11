"use client";

import { useState } from "react";
import { googleScholar, scopus } from "@/data/analytics";

type Tab = "scholar" | "scopus";

export default function ScholarAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("scholar");

  const maxCitations = Math.max(...googleScholar.citationsByYear.map((d) => d.count));

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("scholar")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "scholar"
              ? "bg-primary text-white shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
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
              ? "bg-primary text-white shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
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
          <div className="bg-card rounded-xl border border-border p-4">
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

          {/* Citation chart */}
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm font-medium text-foreground mb-4">Citations per Year</p>
            <div className="flex items-end gap-2 h-40">
              {googleScholar.citationsByYear.map((d) => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground font-medium">
                    {d.count > 0 ? d.count : ""}
                  </span>
                  <div
                    className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-colors min-h-[2px]"
                    style={{ height: `${(d.count / maxCitations) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.year}</span>
                </div>
              ))}
            </div>
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
          <div className="bg-card rounded-xl border border-border p-4">
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

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 text-center card-hover">
      <p className="text-3xl font-bold text-primary mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
