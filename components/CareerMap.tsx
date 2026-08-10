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
  organization: string;
  cropFocus: string;
  dataLayer: string;
  outcome: string;
  icon: LucideIcon;
  height: string;
  tone: string;
  bar: string;
  border: string;
};

const stops: CareerStop[] = [
  {
    id: "bsc",
    period: "2012–2015",
    title: "Botany foundation",
    organization: "B.Sc. · Banaras Hindu University",
    cropFocus: "Whole-plant biology",
    dataLayer: "Observation · taxonomy · physiology",
    outcome: "Biological foundation",
    icon: BookOpen,
    height: "h-24",
    tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    bar: "from-emerald-500/55 to-emerald-500/10",
    border: "border-emerald-400/60",
  },
  {
    id: "msc",
    period: "2015–2017",
    title: "Plant health",
    organization: "M.Sc. Botany · BHU",
    cropFocus: "Plant protection",
    dataLayer: "Pathology · microbial genetics · ecology",
    outcome: "Gold medal · first paper",
    icon: Award,
    height: "h-32",
    tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    bar: "from-amber-500/55 to-amber-500/10",
    border: "border-amber-400/60",
  },
  {
    id: "phd",
    period: "2017–2023",
    title: "Mechanism",
    organization: "Ph.D. Plant Pathology · BHU",
    cropFocus: "Stored-crop protection",
    dataLayer: "Assays · microscopy · gene expression · simulation",
    outcome: "85% less mold · toxin eliminated",
    icon: Microscope,
    height: "h-40",
    tone: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
    bar: "from-orange-500/55 to-orange-500/10",
    border: "border-orange-400/60",
  },
  {
    id: "postdoc",
    period: "2023–Present",
    title: "Multi-omics",
    organization: "Postdoctoral Scholar · UC Davis",
    cropFocus: "Disease-resilient grapevines",
    dataLayer: "dPCR · RNA-seq · metabolomics · machine learning",
    outcome: "300+ samples · 1.3B+ reads",
    icon: Database,
    height: "h-52",
    tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    bar: "from-violet-500/55 to-violet-500/10",
    border: "border-violet-400/60",
  },
  {
    id: "ai",
    period: "2025–Present",
    title: "Reasoning layer",
    organization: "MOVE Fellow · Handshake AI",
    cropFocus: "Reliable biological decisions",
    dataLayer: "Evidence grading · failure analysis · reference answers",
    outcome: "Scientific AI evaluation",
    icon: Bot,
    height: "h-60",
    tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    bar: "from-sky-500/55 to-sky-500/10",
    border: "border-sky-400/60",
  },
];

export default function CareerMap() {
  const [activeId, setActiveId] = useState("postdoc");
  const active = stops.find((stop) => stop.id === activeId) ?? stops[0];

  return (
    <section id="experience" className="py-20" aria-labelledby="career-map-title">
      <span id="education" className="scroll-mt-24" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Growth in data depth</p>
            <h2 id="career-map-title" className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              The crop stayed central. <span className="text-primary">The data grew deeper.</span>
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Direction of travel</p>
            <p className="mt-2 text-sm font-semibold text-foreground">Botany → pathology → data-guided crop improvement</p>
            <p className="mt-1 text-xs text-muted-foreground">Scientific AI adds a reasoning layer; it is not the destination.</p>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pb-3">
          <div className="min-w-[820px] rounded-[2rem] border border-border bg-card px-6 pb-6 pt-8">
            <div className="flex h-72 items-end gap-4 border-b border-border px-3" role="tablist" aria-label="Career growth in data depth">
              {stops.map((stop) => {
                const Icon = stop.icon;
                const selected = stop.id === active.id;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="career-growth-panel"
                    onClick={() => setActiveId(stop.id)}
                    className="group flex h-full flex-1 flex-col items-center justify-end focus-visible:outline-none"
                  >
                    <span className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stop.period}</span>
                    <span className={`relative flex w-full items-start justify-center rounded-t-2xl border-x border-t bg-gradient-to-b pt-4 transition-all ${stop.height} ${stop.bar} ${
                      selected ? `${stop.border} shadow-[0_0_30px_-12px_currentColor]` : "border-border group-hover:border-muted-foreground/50"
                    }`}>
                      <span className={`flex size-11 items-center justify-center rounded-xl border border-background/70 ${stop.tone} ${selected ? "scale-110" : ""}`}>
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="absolute inset-x-0 bottom-3 px-2 text-center text-xs font-bold text-foreground">{stop.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>Plant observation</span>
              <span>Increasing data depth →</span>
            </div>
          </div>
        </div>

        <div id="career-growth-panel" role="tabpanel" aria-live="polite" className={`mt-5 overflow-hidden rounded-[2rem] border bg-card ${active.border}`}>
          <div className="border-b border-border px-6 py-4 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{active.organization}</p>
          </div>
          <div className="grid sm:grid-cols-3">
            <div className="p-6 sm:border-r sm:border-border sm:p-8">
              <Sprout className="size-5 text-emerald-600 dark:text-emerald-300" strokeWidth={1.7} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Crop focus</p>
              <p className="mt-2 font-bold text-foreground">{active.cropFocus}</p>
            </div>
            <div className="border-t border-border p-6 sm:border-r sm:border-t-0 sm:p-8">
              <Database className="size-5 text-violet-600 dark:text-violet-300" strokeWidth={1.7} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Data added</p>
              <p className="mt-2 font-bold text-foreground">{active.dataLayer}</p>
            </div>
            <div className="border-t border-border p-6 sm:border-t-0 sm:p-8">
              <Target className="size-5 text-amber-600 dark:text-amber-300" strokeWidth={1.7} aria-hidden="true" />
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Result</p>
              <p className="mt-2 font-bold text-foreground">{active.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
