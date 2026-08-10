"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChartNoAxesCombined,
  Dna,
  Sprout,
  Target,
  type LucideIcon,
} from "lucide-react";

type StageId = "crop" | "signal" | "intelligence" | "improvement";

type Stage = {
  id: StageId;
  number: string;
  label: string;
  cue: string;
  evidence: string;
  translation: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
  tone: string;
  activeClass: string;
  glowClass: string;
};

const stages: Stage[] = [
  {
    id: "crop",
    number: "01",
    label: "Crop question",
    cue: "Phenotype first",
    evidence: "327 vine samples · two seasons",
    translation: "Define the disease response and crop trait worth improving.",
    href: "/#experience",
    linkLabel: "Field program",
    icon: Sprout,
    tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    activeClass: "border-emerald-400/60 bg-emerald-400/[0.08]",
    glowClass: "bg-emerald-400",
  },
  {
    id: "signal",
    number: "02",
    label: "Molecular signal",
    cue: "Measure what the eye misses",
    evidence: "dPCR · RNA-seq · metabolomics",
    translation: "Expose infection and host response before symptoms tell the whole story.",
    href: "/#skills",
    linkLabel: "Capability map",
    icon: Dna,
    tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    activeClass: "border-violet-400/60 bg-violet-400/[0.08]",
    glowClass: "bg-violet-400",
  },
  {
    id: "intelligence",
    number: "03",
    label: "Data intelligence",
    cue: "Connect every layer",
    evidence: "Multi-omics · causal models · machine learning",
    translation: "Rank mechanisms and candidate markers for experimental validation.",
    href: "/methods/causal-mediation",
    linkLabel: "Methods lab",
    icon: ChartNoAxesCombined,
    tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    activeClass: "border-sky-400/60 bg-sky-400/[0.08]",
    glowClass: "bg-sky-400",
  },
  {
    id: "improvement",
    number: "04",
    label: "Crop improvement",
    cue: "Return evidence to the plant",
    evidence: "Earlier detection · trait leads · validated assays",
    translation: "Move the strongest evidence toward selection and disease-resilient crops.",
    href: "/#projects",
    linkLabel: "Research outcomes",
    icon: Target,
    tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    activeClass: "border-amber-400/60 bg-amber-400/[0.08]",
    glowClass: "bg-amber-400",
  },
];

const dataOrbit = [
  { label: "Field phenotype", position: "left-4 top-12 sm:left-8", tone: "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300" },
  { label: "dPCR", position: "right-5 top-16 sm:right-10", tone: "border-sky-400/40 bg-sky-400/10 text-sky-700 dark:text-sky-300" },
  { label: "RNA-seq", position: "right-3 bottom-28 sm:right-8", tone: "border-violet-400/40 bg-violet-400/10 text-violet-700 dark:text-violet-300" },
  { label: "Multi-omics", position: "left-4 bottom-20 sm:left-10", tone: "border-orange-400/40 bg-orange-400/10 text-orange-700 dark:text-orange-300" },
  { label: "Trait leads", position: "bottom-5 left-1/2 -translate-x-1/2", tone: "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300" },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("crop");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden py-20" aria-labelledby="research-pathway-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Crop improvement system
            </p>
            <h2 id="research-pathway-title" className="mt-3 max-w-4xl text-3xl font-bold text-foreground sm:text-5xl">
              I start with the crop. <span className="text-primary">I move with data.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-400" /> Field-grounded
            <span className="ml-2 size-2 rounded-full bg-violet-400" /> Data-driven
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-border bg-card">
            <div className="absolute inset-0 bg-dot-grid opacity-15" />
            <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20" />
            <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/20" />
            <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-500/15 to-violet-500/15 blur-xl" />

            <div className="absolute left-1/2 top-1/2 z-10 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-emerald-400/40 bg-background/90 text-center shadow-2xl backdrop-blur-sm">
              <Sprout className="size-8 text-emerald-600 dark:text-emerald-300" strokeWidth={1.6} aria-hidden="true" />
              <span className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-foreground">Crop</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">improvement</span>
            </div>

            {dataOrbit.map((item, index) => (
              <span
                key={item.label}
                className={`absolute z-10 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${item.position} ${item.tone} ${index === 2 ? "animate-pulse" : ""}`}
              >
                {item.label}
              </span>
            ))}

            <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-1.5" aria-hidden="true">
              {["bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-orange-400"].map((tone, index) => (
                <span key={tone} className={`rounded-full ${tone} ${index === 1 ? "size-2.5" : "size-1.5"}`} />
              ))}
            </div>
            <p className="absolute inset-x-8 bottom-12 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Data circles the question. The crop stays at the center.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3" role="tablist" aria-label="Crop improvement pathway">
              {stages.map((stage) => {
                const Icon = stage.icon;
                const selected = stage.id === active.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="crop-improvement-panel"
                    onClick={() => setActiveId(stage.id)}
                    className={`relative rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      selected ? `${stage.activeClass} -translate-y-0.5 shadow-lg` : "border-border bg-card hover:border-muted-foreground/50"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={`flex size-9 items-center justify-center rounded-xl ${stage.tone}`}>
                        <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-black tabular-nums text-muted-foreground/50">{stage.number}</span>
                    </span>
                    <span className="mt-3 block text-sm font-bold text-foreground">{stage.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{stage.cue}</span>
                    {selected && <span className={`absolute inset-x-4 bottom-0 h-0.5 rounded-full ${stage.glowClass}`} />}
                  </button>
                );
              })}
            </div>

            <div id="crop-improvement-panel" role="tabpanel" aria-live="polite" className="relative mt-4 flex flex-1 flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-8">
              <div className={`absolute inset-y-0 left-0 w-1 ${active.glowClass}`} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{active.cue}</p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{active.label}</h3>
                </div>
                <span className={`flex size-12 items-center justify-center rounded-2xl ${active.tone}`}>
                  <ActiveIcon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
              </div>

              <div className="my-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Data carried forward</p>
                  <p className="mt-2 font-semibold text-foreground">{active.evidence}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Crop value</p>
                  <p className="mt-2 font-semibold text-foreground">{active.translation}</p>
                </div>
              </div>

              <Link href={active.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
                {active.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
