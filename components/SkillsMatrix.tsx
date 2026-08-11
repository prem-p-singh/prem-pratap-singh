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
  { icon: ScanSearch, text: "text-sky-500", surface: "bg-sky-500/15", active: "border-l-sky-500 bg-sky-500/[0.08] text-foreground", bar: "bg-sky-500" },
  { icon: Dna, text: "text-violet-500", surface: "bg-violet-500/15", active: "border-l-violet-500 bg-violet-500/[0.08] text-foreground", bar: "bg-violet-500" },
  { icon: Database, text: "text-indigo-500", surface: "bg-indigo-500/15", active: "border-l-indigo-500 bg-indigo-500/[0.08] text-foreground", bar: "bg-indigo-500" },
  { icon: Code2, text: "text-cyan-500", surface: "bg-cyan-500/15", active: "border-l-cyan-500 bg-cyan-500/[0.08] text-foreground", bar: "bg-cyan-500" },
  { icon: ChartNoAxesCombined, text: "text-blue-500", surface: "bg-blue-500/15", active: "border-l-blue-500 bg-blue-500/[0.08] text-foreground", bar: "bg-blue-500" },
  { icon: FlaskConical, text: "text-amber-500", surface: "bg-amber-500/15", active: "border-l-amber-500 bg-amber-500/[0.08] text-foreground", bar: "bg-amber-500" },
  { icon: Sprout, text: "text-emerald-500", surface: "bg-emerald-500/15", active: "border-l-emerald-500 bg-emerald-500/[0.08] text-foreground", bar: "bg-emerald-500" },
  { icon: FileCheck2, text: "text-rose-500", surface: "bg-rose-500/15", active: "border-l-rose-500 bg-rose-500/[0.08] text-foreground", bar: "bg-rose-500" },
];

export default function SkillsMatrix() {
  const [active, setActive] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const domain = skills[active];
  const visible = showAll ? domain.items : domain.items.slice(0, DEFAULT_VISIBLE);
  const activeVisual = domainVisuals[active];
  const ActiveIcon = activeVisual.icon;

  return (
    <div className="overflow-hidden border-y border-border bg-card lg:grid lg:grid-cols-[0.72fr_1.28fr]">
      <div className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <p className="text-sm font-semibold text-foreground">Capability index</p>
          <span className="font-mono text-[11px] text-muted-foreground">08 domains</span>
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
                className={`group flex w-full items-center gap-3 border-b border-l-2 border-b-border px-5 py-3.5 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500/45 sm:px-6 ${
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
                <span className="font-mono text-[10px] text-muted-foreground">{skill.items.length}</span>
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
            <p className="text-[11px] text-muted-foreground">verified skills</p>
          </div>
        </div>

        <ol className="mt-7 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
          {visible.map((item, index) => (
            <li key={item} className="flex gap-3 border-b border-border py-3 text-sm leading-snug text-foreground/85">
              <span className={`mt-0.5 font-mono text-[10px] ${activeVisual.text}`}>
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
