"use client";

import { useState } from "react";
import {
  ChartNoAxesCombined,
  Code2,
  Database,
  Dna,
  FileCheck2,
  FlaskConical,
  ScanSearch,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/data/personal";

const DEFAULT_VISIBLE = 8;

const visualDomains: Array<{ icon: LucideIcon; tone: string; active: string }> = [
  { icon: ScanSearch, tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300", active: "border-sky-400/60 bg-sky-400/[0.08]" },
  { icon: Dna, tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300", active: "border-violet-400/60 bg-violet-400/[0.08]" },
  { icon: Database, tone: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300", active: "border-indigo-400/60 bg-indigo-400/[0.08]" },
  { icon: Code2, tone: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300", active: "border-cyan-400/60 bg-cyan-400/[0.08]" },
  { icon: ChartNoAxesCombined, tone: "bg-blue-500/15 text-blue-700 dark:text-blue-300", active: "border-blue-400/60 bg-blue-400/[0.08]" },
  { icon: FlaskConical, tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300", active: "border-amber-400/60 bg-amber-400/[0.08]" },
  { icon: Sprout, tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", active: "border-emerald-400/60 bg-emerald-400/[0.08]" },
  { icon: FileCheck2, tone: "bg-rose-500/15 text-rose-700 dark:text-rose-300", active: "border-rose-400/60 bg-rose-400/[0.08]" },
];

export default function SkillsMatrix() {
  const [active, setActive] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const domain = skills[active];
  const visual = visualDomains[active];
  const visible = showAll ? domain.items : domain.items.slice(0, DEFAULT_VISIBLE);
  const cells = [...skills.slice(0, 4), null, ...skills.slice(4)];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-card p-5 sm:p-7">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="tablist" aria-label="Crop improvement capability domains">
        {cells.map((skill, cellIndex) => {
          if (!skill) {
            return (
              <div key="crop-center" className="relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-500/15 via-card to-violet-500/10 p-4 text-center">
                <span className="absolute -right-7 -top-7 size-24 rounded-full border border-emerald-400/20" />
                <Sprout className="size-7 text-emerald-600 dark:text-emerald-300" strokeWidth={1.6} aria-hidden="true" />
                <span className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-foreground">Crop improvement</span>
                <span className="mt-1 text-[10px] text-muted-foreground">field → molecule → model</span>
              </div>
            );
          }

          const skillIndex = cellIndex < 4 ? cellIndex : cellIndex - 1;
          const itemVisual = visualDomains[skillIndex];
          const Icon = itemVisual.icon;
          const selected = skillIndex === active;
          return (
            <button
              key={skill.category}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="skill-domain-panel"
              title={skill.category}
              onClick={() => {
                setActive(skillIndex);
                setShowAll(false);
              }}
              className={`min-h-32 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected ? `${itemVisual.active} -translate-y-0.5 shadow-lg` : "border-border bg-background/45 hover:border-muted-foreground/40"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className={`flex size-10 items-center justify-center rounded-xl ${itemVisual.tone}`}>
                  <Icon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-bold tabular-nums text-muted-foreground/60">{skill.items.length}</span>
              </span>
              <span className="mt-4 block text-sm font-bold text-foreground">{skill.short ?? skill.category}</span>
            </button>
          );
        })}
      </div>

      <div id="skill-domain-panel" role="tabpanel" aria-live="polite" className="mt-4 rounded-2xl border border-border bg-background/55 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className={`flex size-10 items-center justify-center rounded-xl ${visual.tone}`}>
              {(() => {
                const ActiveIcon = visual.icon;
                return <ActiveIcon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />;
              })()}
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Active capability</p>
              <p className="mt-1 text-sm font-bold text-foreground">{domain.category}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{domain.items.length} verified skills</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {visible.map((item) => (
            <span key={item} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80">
              {item}
            </span>
          ))}
        </div>

        {domain.items.length > DEFAULT_VISIBLE && (
          <button type="button" onClick={() => setShowAll((value) => !value)} className="mt-4 text-xs font-semibold text-primary hover:underline">
            {showAll ? "Show essentials" : `Show all ${domain.items.length}`}
          </button>
        )}
      </div>
    </div>
  );
}
