"use client";

import { useState } from "react";
import {
  ChartNoAxesCombined,
  ChevronRight,
  Code2,
  Database,
  Dna,
  FileCheck2,
  FlaskConical,
  ScanSearch,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/profile/personal";

const DEFAULT_VISIBLE = 10;

const domainVisuals: Array<{
  icon: LucideIcon;
  text: string;
  surface: string;
  active: string;
  bar: string;
}> = [
  { icon: ScanSearch, text: "text-biology", surface: "bg-biology-wash", active: "border-l-biology bg-biology-wash text-foreground", bar: "bg-biology" },
  { icon: Dna, text: "text-biology", surface: "bg-biology-wash", active: "border-l-biology bg-biology-wash text-foreground", bar: "bg-biology" },
  { icon: Database, text: "text-data", surface: "bg-data-wash", active: "border-l-data bg-data-wash text-foreground", bar: "bg-data" },
  { icon: Code2, text: "text-data", surface: "bg-data-wash", active: "border-l-data bg-data-wash text-foreground", bar: "bg-data" },
  { icon: ChartNoAxesCombined, text: "text-data", surface: "bg-data-wash", active: "border-l-data bg-data-wash text-foreground", bar: "bg-data" },
  { icon: FlaskConical, text: "text-decision", surface: "bg-decision-wash", active: "border-l-decision bg-decision-wash text-foreground", bar: "bg-decision" },
  { icon: Sprout, text: "text-field", surface: "bg-field-wash", active: "border-l-field bg-field-wash text-foreground", bar: "bg-field" },
  { icon: FileCheck2, text: "text-decision", surface: "bg-decision-wash", active: "border-l-decision bg-decision-wash text-foreground", bar: "bg-decision" },
];

export default function SkillsMatrix() {
  const [active, setActive] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const domain = skills[active];
  const visible = showAll ? domain.items : domain.items.slice(0, DEFAULT_VISIBLE);
  const activeVisual = domainVisuals[active];
  const ActiveIcon = activeVisual.icon;

  return (
    <div className="paper-panel overflow-hidden bg-card lg:grid lg:grid-cols-[0.72fr_1.28fr]">
      <div className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <p className="text-sm font-semibold text-foreground">Capability index</p>
          <span className="font-mono text-xs text-muted-foreground">08 domains</span>
        </div>

        <div role="tablist" aria-label="Research capability domains">
          {skills.map((skill, index) => {
            const visual = domainVisuals[index];
            const Icon = visual.icon;
            const selected = index === active;
            return (
              <button
                key={skill.category}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="skill-domain-panel"
                title={skill.category}
                onClick={() => {
                  setActive(index);
                  setShowAll(false);
                }}
                className={`group flex w-full items-center gap-3 border-b border-l-2 border-b-border px-5 py-3.5 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-data/45 sm:px-6 ${
                  selected ? visual.active : "border-l-transparent text-muted-foreground hover:bg-muted/25 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? `border-transparent ${visual.surface} ${visual.text}`
                      : `border-border ${visual.text}`
                  }`}
                >
                  <Icon className="size-6" strokeWidth={1.65} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {skill.short ?? skill.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{skill.items.length}</span>
                <ChevronRight
                  className={`size-3.5 transition-transform ${selected ? `translate-x-0.5 ${visual.text}` : "text-muted-foreground/45"}`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="skill-domain-panel"
        role="tabpanel"
        aria-live="polite"
        className="p-5 sm:p-7 lg:p-9"
      >
        <div className={`mb-7 h-1 w-14 rounded-full ${activeVisual.bar}`} aria-hidden="true" />
        <div className="flex items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ActiveIcon className={`size-6 ${activeVisual.text}`} strokeWidth={1.65} aria-hidden="true" />
              <span>Selected domain</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {domain.category}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className={`font-mono text-2xl font-medium ${activeVisual.text}`}>{domain.items.length}</p>
            <p className="text-xs text-muted-foreground">core methods</p>
          </div>
        </div>

        <ol className="mt-7 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
          {visible.map((item, index) => (
            <li key={item} className="flex gap-3 border-b border-border py-3 text-sm leading-snug text-foreground/85">
              <span className={`font-mono text-xs ${activeVisual.text}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        {domain.items.length > DEFAULT_VISIBLE && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mt-5 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {showAll ? "Show the essential methods" : `Show all ${domain.items.length} skills`}
          </button>
        )}
      </div>
    </div>
  );
}
