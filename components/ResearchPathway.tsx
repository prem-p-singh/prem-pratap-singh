"use client";

import Link from "next/link";
import { useState } from "react";

type StageId = "observe" | "measure" | "model" | "decide";

type Stage = {
  id: StageId;
  number: string;
  title: string;
  cue: string;
  question: string;
  approach: string;
  evidence: string;
  outcome: string;
  href: string;
  linkLabel: string;
  activeClass: string;
  numberClass: string;
  glowClass: string;
};

const stages: Stage[] = [
  {
    id: "observe",
    number: "01",
    title: "Observe",
    cue: "Start in the vineyard",
    question: "What changes first when heat and infection meet?",
    approach:
      "Follow vines across seasons and vineyard blocks, connecting field conditions with fruit chemistry and disease state.",
    evidence: "327 vine samples · two growing seasons",
    outcome:
      "The field pattern becomes a testable biological question instead of a symptom description.",
    href: "/#experience",
    linkLabel: "See the field program",
    activeClass: "border-emerald-400/60 bg-emerald-400/[0.08]",
    numberClass: "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
    glowClass: "bg-emerald-400",
  },
  {
    id: "measure",
    number: "02",
    title: "Measure",
    cue: "Move to the bench",
    question: "Is the virus changing before the vine shows the full effect?",
    approach:
      "Measure viral titer and molecular response with RT-qPCR, digital PCR, RNA sequencing, and metabolite profiling.",
    evidence: "RT-qPCR · digital PCR · RNA-seq · metabolomics",
    outcome:
      "Hidden infection and host-response signals become numbers that can be compared across time and place.",
    href: "/#skills",
    linkLabel: "Explore the toolkit",
    activeClass: "border-violet-400/60 bg-violet-400/[0.08]",
    numberClass: "bg-violet-400/15 text-violet-700 dark:text-violet-300",
    glowClass: "bg-violet-400",
  },
  {
    id: "model",
    number: "03",
    title: "Model",
    cue: "Connect the evidence",
    question: "Which route carries the response: temperature, virus, or both?",
    approach:
      "Use reproducible pipelines, multi-omics integration, and causal mediation to separate pathways that move together.",
    evidence: "39 mediating genes · 2,000 bootstrap runs",
    outcome:
      "A broad association narrows into a mechanism-focused lead that can be challenged experimentally.",
    href: "/methods/causal-mediation",
    linkLabel: "Try the mediation case",
    activeClass: "border-sky-400/60 bg-sky-400/[0.08]",
    numberClass: "bg-sky-400/15 text-sky-700 dark:text-sky-300",
    glowClass: "bg-sky-400",
  },
  {
    id: "decide",
    number: "04",
    title: "Decide",
    cue: "Return to the crop",
    question: "What can a grower, laboratory, or research team do next?",
    approach:
      "Translate the strongest signal into earlier sampling, validated assays, and clearer choices about follow-up experiments.",
    evidence: "Earlier detection · targeted validation · reproducible evidence",
    outcome:
      "The work closes the loop from a plant in the field to a decision someone can actually use.",
    href: "/#projects",
    linkLabel: "See research outcomes",
    activeClass: "border-orange-400/60 bg-orange-400/[0.08]",
    numberClass: "bg-orange-400/15 text-orange-700 dark:text-orange-300",
    glowClass: "bg-orange-400",
  },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("observe");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <section className="relative py-20 overflow-hidden" aria-labelledby="research-pathway-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Follow one research question
          </p>
          <h2 id="research-pathway-title" className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            From a vine in the field to a decision that matters
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Pick a stage to see how observation, molecular measurement, computation,
            and application connect in the same research loop.
          </p>
        </div>

        <div
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="tablist"
          aria-label="Research pathway stages"
        >
          {stages.map((stage, index) => {
            const selected = active.id === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="research-pathway-panel"
                onClick={() => setActiveId(stage.id)}
                className={`relative rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                  selected
                    ? `${stage.activeClass} -translate-y-1 shadow-lg`
                    : "border-border bg-card/70 hover:-translate-y-0.5 hover:border-muted-foreground/50"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${stage.numberClass}`}>
                    {stage.number}
                  </span>
                  {index < stages.length - 1 && (
                    <span className="hidden text-muted-foreground/50 lg:block" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
                <span className="mt-4 block text-lg font-bold text-foreground">{stage.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{stage.cue}</span>
                {selected && (
                  <span className={`absolute inset-x-5 bottom-0 h-0.5 rounded-full ${stage.glowClass}`} />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="research-pathway-panel"
          role="tabpanel"
          aria-live="polite"
          className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card"
        >
          <div className={`absolute inset-y-0 left-0 w-1 ${active.glowClass}`} />
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                The question
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                {active.question}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{active.approach}</p>
              <Link
                href={active.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all"
              >
                {active.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Evidence in hand
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                  {active.evidence}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What changes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{active.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
