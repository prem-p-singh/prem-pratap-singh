"use client";

import { useState } from "react";
import { skills } from "@/data/personal";
import { ShinyCard } from "@/components/ui/shiny-card";

const DEFAULT_VISIBLE = 8;

export default function SkillsMatrix() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const domain = skills[active];
  const total = domain.items.length;
  const visible = showAll ? domain.items : domain.items.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = total - DEFAULT_VISIBLE;

  return (
    <ShinyCard className="p-6" duration={5000}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Core Competencies
      </h3>

      {/* Competency options (header) */}
      <div
        className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-border"
        role="tablist"
        aria-label="Core competency domains"
      >
        {skills.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.category}
              role="tab"
              aria-selected={isActive}
              title={s.category}
              onClick={() => {
                setActive(i);
                setShowAll(false);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--foreground)]/50 hover:text-[var(--foreground)]"
              }`}
            >
              {s.short ?? s.category}
            </button>
          );
        })}
      </div>

      {/* Active domain */}
      <div className="flex items-baseline justify-between mb-4 gap-3">
        <p className="text-sm font-medium text-foreground">{domain.category}</p>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {total} skills
        </span>
      </div>

      {/* Skills as buttons */}
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 text-sm bg-muted text-muted-foreground rounded-md border border-transparent hover:bg-foreground hover:text-background transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground hover:underline"
        >
          {showAll ? "Show fewer" : `Show all ${total}`}
          <svg
            className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </ShinyCard>
  );
}
