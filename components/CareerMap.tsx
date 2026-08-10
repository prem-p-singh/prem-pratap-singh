"use client";

import { useState } from "react";
import {
  Award,
  Bot,
  BookOpen,
  Database,
  Microscope,
  Sprout,
  Target,
  type LucideIcon,
} from "lucide-react";

type CareerStop = {
  id: string;
  period: string;
  title: string;
  stage: string;
  organization: string;
  cropFocus: string;
  dataLayer: string;
  outcome: string;
  icon: LucideIcon;
  height: string;
  tone: string;
  bar: string;
  border: string;
  activeBorder: string;
  accent: string;
};

const stops: CareerStop[] = [
  {
    id: "bsc",
    period: "2012–2015",
    title: "Botany foundation",
    stage: "Plant scale",
    organization: "B.Sc. · Banaras Hindu University",
    cropFocus: "Whole-plant biology",
    dataLayer: "Observation · taxonomy · physiology",
    outcome: "Biological foundation",
    icon: BookOpen,
    height: "h-32",
    tone: "border-emerald-400/40 bg-emerald-400/15 text-emerald-400",
    bar: "from-emerald-500/40 via-emerald-500/20 to-emerald-500/[0.06]",
    border: "border-emerald-400/60",
    activeBorder: "border-emerald-400",
    accent: "bg-emerald-400",
  },
  {
    id: "msc",
    period: "2015–2017",
    title: "Plant health",
    stage: "Disease systems",
    organization: "M.Sc. Botany · BHU",
    cropFocus: "Plant protection",
    dataLayer: "Pathology · microbial genetics · ecology",
    outcome: "Gold medal · first paper",
    icon: Award,
    height: "h-40",
    tone: "border-amber-400/40 bg-amber-400/15 text-amber-400",
    bar: "from-amber-500/40 via-amber-500/20 to-amber-500/[0.06]",
    border: "border-amber-400/60",
    activeBorder: "border-amber-400",
    accent: "bg-amber-400",
  },
  {
    id: "phd",
    period: "2017–2023",
    title: "Mechanism",
    stage: "Controlled assays",
    organization: "Ph.D. Plant Pathology · BHU",
    cropFocus: "Stored-crop protection",
    dataLayer: "Assays · microscopy · gene expression · simulation",
    outcome: "85% less mold · toxin eliminated",
    icon: Microscope,
    height: "h-48",
    tone: "border-orange-400/40 bg-orange-400/15 text-orange-400",
    bar: "from-orange-500/40 via-orange-500/20 to-orange-500/[0.06]",
    border: "border-orange-400/60",
    activeBorder: "border-orange-400",
    accent: "bg-orange-400",
  },
  {
    id: "postdoc",
    period: "2023–Present",
    title: "Multi-omics",
    stage: "Integrated evidence",
    organization: "Postdoctoral Scholar · UC Davis",
    cropFocus: "Disease-resilient grapevines",
    dataLayer: "dPCR · RNA-seq · metabolomics · machine learning",
    outcome: "300+ samples · 1.3B+ reads",
    icon: Database,
    height: "h-56",
    tone: "border-violet-400/40 bg-violet-400/15 text-violet-400",
    bar: "from-violet-500/40 via-violet-500/20 to-violet-500/[0.06]",
    border: "border-violet-400/60",
    activeBorder: "border-violet-400",
    accent: "bg-violet-400",
  },
  {
    id: "ai",
    period: "2025–Present",
    title: "Reasoning layer",
    stage: "Decision quality",
    organization: "MOVE Fellow · Handshake AI",
    cropFocus: "Reliable biological decisions",
    dataLayer: "Evidence grading · failure analysis · reference answers",
    outcome: "Scientific AI evaluation",
    icon: Bot,
    height: "h-64",
    tone: "border-sky-400/40 bg-sky-400/15 text-sky-400",
    bar: "from-sky-500/40 via-sky-500/20 to-sky-500/[0.06]",
    border: "border-sky-400/60",
    activeBorder: "border-sky-400",
    accent: "bg-sky-400",
  },
];

export default function CareerMap() {
  const [activeId, setActiveId] = useState("postdoc");
  const active = stops.find((stop) => stop.id === activeId) ?? stops[0];

  return (
    <section id="experience" className="py-20" aria-labelledby="career-map-title">
      <span id="education" className="scroll-mt-24" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">My research throughline</p>
            <h2 id="career-map-title" className="mt-4 max-w-3xl text-4xl font-bold leading-[1.06] text-foreground sm:text-5xl lg:text-6xl">
              I start with the crop. <span className="text-muted-foreground">Data helps decide what comes next.</span>
            </h2>
          </div>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-y border-border py-5">
            <div className="row-span-2 flex flex-col items-center py-1" aria-hidden="true">
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="min-h-12 w-px flex-1 bg-gradient-to-b from-emerald-400 via-violet-400 to-sky-400" />
              <span className="size-3 rounded-full border-2 border-sky-400 bg-card" />
            </div>
            <div className="pb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">Start with</p>
              <p className="mt-1 text-lg font-semibold text-foreground">A crop question in the field</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400">Return with</p>
              <p className="mt-1 text-lg font-semibold text-foreground">Evidence that can guide selection</p>
            </div>
            <p className="col-span-2 mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              Observation · pathology · molecular measurement · multi-omics · modeling
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto pb-3">
          <div className="min-w-[900px] overflow-hidden rounded-[2rem] border border-border bg-card">
            <div className="flex items-end justify-between gap-8 border-b border-border px-8 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Career progression</p>
                <p className="mt-1 text-sm text-foreground">Each stage adds a new evidence layer.</p>
              </div>
              <p className="max-w-sm text-right text-xs leading-relaxed text-muted-foreground">
                Select a stage to see the crop question, data added, and result.
              </p>
            </div>

            <div className="relative px-6 pt-7">
              <div className="pointer-events-none absolute inset-x-9 bottom-0 top-12 flex flex-col justify-between" aria-hidden="true">
                <span className="border-t border-dashed border-border/70" />
                <span className="border-t border-dashed border-border/70" />
                <span className="border-t border-dashed border-border/70" />
                <span className="border-t border-dashed border-border/70" />
              </div>

              <div className="relative flex h-[22rem] items-end gap-4 border-b border-border px-3" role="tablist" aria-label="Career growth in data depth">
                {stops.map((stop, index) => {
                  const Icon = stop.icon;
                  const selected = stop.id === active.id;
                  return (
                    <button
                      key={stop.id}
                      id={`career-growth-tab-${stop.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="career-growth-panel"
                      aria-label={`${stop.period}: ${stop.title}`}
                      onClick={() => setActiveId(stop.id)}
                      className="group flex h-full flex-1 flex-col items-center justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-card"
                    >
                      <span className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${selected ? "text-foreground" : "text-muted-foreground"}`}>{stop.period}</span>
                      <span className={`relative flex w-full flex-col items-center rounded-t-2xl border-x border-t bg-gradient-to-b px-3 pt-4 text-left transition-[transform,border-color,background-color] duration-300 ${stop.height} ${stop.bar} ${
                        selected ? `${stop.activeBorder} -translate-y-1` : "border-border group-hover:-translate-y-0.5 group-hover:border-muted-foreground/60"
                      }`}>
                        <span className="absolute left-4 top-4 text-[10px] font-semibold tabular-nums text-foreground/50">0{index + 1}</span>
                        <span className={`flex size-12 items-center justify-center rounded-2xl border ${stop.tone}`}>
                          <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="mt-auto w-full pb-4 text-center">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stop.stage}</span>
                          <span className="mt-1 block text-sm font-bold leading-tight text-foreground">{stop.title}</span>
                        </span>
                        <span className={`absolute inset-x-0 bottom-0 h-1 ${stop.accent} ${selected ? "opacity-100" : "opacity-40"}`} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between px-9 py-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span>Whole-plant observation</span>
              <span className="flex items-center gap-3"><span className="h-px w-12 bg-muted-foreground/50" aria-hidden="true" /> Increasing data depth →</span>
            </div>
          </div>
        </div>

        <div
          id="career-growth-panel"
          role="tabpanel"
          aria-labelledby={`career-growth-tab-${active.id}`}
          aria-live="polite"
          className={`mt-5 overflow-hidden rounded-[2rem] border bg-card ${active.border}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className={`size-2.5 rounded-full ${active.accent}`} aria-hidden="true" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Selected stage · {active.period}</p>
                <p className="mt-1 font-semibold text-foreground">{active.organization}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">{active.title}</span>
          </div>
          <div className="grid sm:grid-cols-3">
            <div className="p-6 sm:border-r sm:border-border sm:p-8">
              <Sprout className="size-6 text-emerald-400" strokeWidth={1.8} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Crop focus</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-foreground">{active.cropFocus}</p>
            </div>
            <div className="border-t border-border p-6 sm:border-r sm:border-t-0 sm:p-8">
              <Database className="size-6 text-violet-400" strokeWidth={1.8} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Data added</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-foreground">{active.dataLayer}</p>
            </div>
            <div className="border-t border-border p-6 sm:border-t-0 sm:p-8">
              <Target className="size-6 text-amber-400" strokeWidth={1.8} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Result</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-foreground">{active.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
