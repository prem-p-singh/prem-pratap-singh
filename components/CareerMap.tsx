"use client";

import { useState, type KeyboardEvent } from "react";

type CareerStop = {
  id: string;
  period: string;
  title: string;
  stage: string;
  organization: string;
  cropFocus: string;
  dataLayer: string;
  outcome: string;
};

const stops: CareerStop[] = [
  {
    id: "bsc",
    period: "2012–2015",
    title: "Botany foundation",
    stage: "Plant scale",
    organization: "B.Sc. · Banaras Hindu University",
    cropFocus: "Whole-plant biology",
    dataLayer: "Observation, taxonomy and physiology",
    outcome: "Biological foundation",
  },
  {
    id: "msc",
    period: "2015–2017",
    title: "Plant health",
    stage: "Disease systems",
    organization: "M.Sc. Botany · BHU",
    cropFocus: "Plant protection",
    dataLayer: "Pathology, microbial genetics and ecology",
    outcome: "Gold medal and first paper",
  },
  {
    id: "phd",
    period: "2017–2023",
    title: "Mechanism",
    stage: "Controlled assays",
    organization: "Ph.D. Plant Pathology · BHU",
    cropFocus: "Stored-crop protection",
    dataLayer: "Assays, microscopy, gene expression and simulation",
    outcome: "85% less mold, toxin eliminated",
  },
  {
    id: "postdoc",
    period: "2023–Present",
    title: "Multi-omics",
    stage: "Integrated evidence",
    organization: "Postdoctoral Scholar · UC Davis",
    cropFocus: "Disease-resilient grapevines",
    dataLayer: "dPCR, RNA-seq, metabolomics and machine learning",
    outcome: "300+ samples, 1.3B+ reads",
  },
  {
    id: "ai",
    period: "2025–Present",
    title: "Reasoning layer",
    stage: "Decision quality",
    organization: "MOVE Fellow · Handshake AI",
    cropFocus: "Reliable biological decisions",
    dataLayer: "Evidence grading, failure analysis and reference answers",
    outcome: "Scientific AI evaluation",
  },
];

const throughline = [
  { label: "Start with", value: "A crop question in the field" },
  { label: "Return with", value: "Evidence that can guide selection" },
];

const detailRowClass = "grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]";

export default function CareerMap() {
  const [activeId, setActiveId] = useState("postdoc");
  const active = stops.find((stop) => stop.id === activeId) ?? stops[0];

  // Same approach as the How I work stepper: arrow keys, Home and End move focus
  // and selection together. Modified keys are left alone for browser shortcuts.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    const last = stops.length - 1;
    const forward = current === last ? 0 : current + 1;
    const back = current <= 0 ? last : current - 1;
    const targets: Record<string, number> = {
      ArrowRight: forward,
      ArrowDown: forward,
      ArrowLeft: back,
      ArrowUp: back,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveId(stops[next].id);
    tabs[next]?.focus();
  };

  return (
    <section id="career-progression" className="scroll-mt-24" aria-labelledby="career-map-title">
      <span id="education" className="scroll-mt-24" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="section-kicker">My research throughline</p>
            <h2 id="career-map-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
              I start with the crop. Data helps decide what comes next.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Observation, pathology, molecular measurement, multi-omics and modeling
            </p>

            <dl className="mt-8 text-sm leading-normal">
              {throughline.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-border py-3"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-sm text-muted-foreground">
              Each stage adds a new evidence layer. Select a stage to see the crop question, data added, and result.
            </p>

            <div
              role="tablist"
              aria-label="Career progression"
              onKeyDown={moveWithKeys}
              className="mt-6 grid border-l border-border lg:grid-cols-5 lg:border-l-0 lg:border-t"
            >
              {stops.map((stop, index) => (
                <button
                  key={stop.id}
                  type="button"
                  role="tab"
                  id={`career-growth-tab-${stop.id}`}
                  aria-selected={stop.id === active.id}
                  tabIndex={stop.id === active.id ? 0 : -1}
                  aria-controls="career-growth-panel"
                  onClick={() => setActiveId(stop.id)}
                  className="-ml-px flex flex-col items-start gap-1 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:border-accent aria-selected:text-foreground lg:-mt-px lg:ml-0 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pr-4 lg:pt-4"
                >
                  <span className="text-xs tabular-nums">
                    {index + 1}. {stop.period}
                  </span>
                  <span className="text-sm font-semibold leading-snug">{stop.title}</span>
                  <span className="text-xs leading-snug">{stop.stage}</span>
                  <span className="text-xs leading-snug">{stop.organization}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 hidden justify-between gap-4 text-xs text-muted-foreground lg:flex">
              <span>Whole-plant observation</span>
              <span>Increasing data depth</span>
            </p>

            <div
              id="career-growth-panel"
              role="tabpanel"
              aria-labelledby={`career-growth-tab-${active.id}`}
              aria-live="polite"
              className="mt-10"
            >
              <p className="text-sm tabular-nums text-muted-foreground">Selected stage · {active.period}</p>
              <h3 className="mt-1 text-2xl leading-tight text-foreground sm:text-3xl">{active.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{active.organization}</p>

              <dl className="mt-6 text-sm leading-normal">
                <div className={detailRowClass}>
                  <dt className="text-muted-foreground">Crop focus</dt>
                  <dd className="text-foreground">{active.cropFocus}</dd>
                </div>
                <div className={detailRowClass}>
                  <dt className="text-muted-foreground">Data added</dt>
                  <dd className="text-foreground">{active.dataLayer}</dd>
                </div>
                <div className={detailRowClass}>
                  <dt className="text-muted-foreground">Result</dt>
                  <dd className="tabular-nums text-foreground">{active.outcome}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
