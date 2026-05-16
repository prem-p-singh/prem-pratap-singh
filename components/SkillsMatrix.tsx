"use client";

import { useState } from "react";
import { skills } from "@/data/personal";
import { ShinyCard } from "@/components/ui/shiny-card";

const DEFAULT_VISIBLE = 10;

export default function SkillsMatrix() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const domain = skills[active];
  const total = domain.items.length;
  const visible = showAll ? domain.items : domain.items.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = total - DEFAULT_VISIBLE;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      {/* Domain selector */}
      <div
        className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
        role="tablist"
        aria-label="Skill domains"
      >
        {skills.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.category}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActive(i);
                setShowAll(false);
              }}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--foreground)]/50 hover:text-[var(--foreground)]"
              }`}
            >
              {s.category}
            </button>
          );
        })}
      </div>

      {/* Active domain panel */}
      <ShinyCard className="p-6" duration={5000}>
        <div className="flex items-baseline justify-between mb-5 gap-4">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {domain.category}
          </h3>
          <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
            {total} skills
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {visible.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-sm bg-[var(--muted)] text-[var(--muted-foreground)] rounded-md border border-transparent hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)] transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>

        {hiddenCount > 0 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--foreground)] hover:underline"
          >
            {showAll ? "Show fewer" : `Show all ${total} skills`}
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
    </div>
  );
}
