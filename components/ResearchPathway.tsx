"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
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
};

const stages: Stage[] = [
  {
    id: "crop",
    number: "01",
    label: "Start in the field",
    cue: "Observe before measuring",
    evidence: "327 vines followed across two growing seasons",
    translation: "Define the plant response and the trait worth improving.",
    href: "/#experience",
    linkLabel: "See the field program",
    icon: Sprout,
  },
  {
    id: "signal",
    number: "02",
    label: "Measure the signal",
    cue: "See what symptoms miss",
    evidence: "dPCR, RNA sequencing, and metabolite profiles",
    translation: "Find infection and stress responses before the eye can.",
    href: "/#skills",
    linkLabel: "See the laboratory toolkit",
    icon: Dna,
  },
  {
    id: "intelligence",
    number: "03",
    label: "Make sense of it",
    cue: "Let biology guide the model",
    evidence: "Multi-omics, causal analysis, and machine learning",
    translation: "Separate strong biological signals from statistical noise.",
    href: "/methods/causal-mediation",
    linkLabel: "Visit the methods lab",
    icon: ChartNoAxesCombined,
  },
  {
    id: "improvement",
    number: "04",
    label: "Return to the crop",
    cue: "Evidence should change a decision",
    evidence: "Earlier detection, validated assays, and candidate traits",
    translation: "Move useful evidence toward healthier, more resilient crops.",
    href: "/#projects",
    linkLabel: "See the research outcomes",
    icon: Target,
  },
];

const fieldNotes = [
  { label: "Field", value: "327 vines · two seasons", icon: Sprout },
  { label: "Bench", value: "dPCR · RNA-seq · metabolites", icon: Dna },
  { label: "Analysis", value: "Mechanisms · markers · trait leads", icon: ChartNoAxesCombined },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("crop");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-20" aria-labelledby="research-pathway-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-muted-foreground">How I work</p>
          <h2
            id="research-pathway-title"
            className="mt-3 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
          >
            Crop improvement is the destination. Data is how I get there.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="border-b border-border bg-section-bg p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4 border-b border-foreground/15 pb-4 text-xs text-muted-foreground">
              <span>Field note 04</span>
              <span>Davis, California</span>
            </div>

            <blockquote className="mt-10 font-sans text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              “I do not begin with a model. I begin with what changed in the plant.”
            </blockquote>

            <div className="relative mt-12 space-y-6 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-foreground/15">
              {fieldNotes.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.label} className="relative flex items-center gap-4">
                    <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-section-bg text-foreground">
                      <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">{note.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{note.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-12 border-t border-foreground/15 pt-4 font-sans text-sm italic text-muted-foreground">
              Prem Pratap Singh · field → bench → evidence
            </p>
          </aside>

          <div>
            <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4" role="tablist" aria-label="Research pathway">
              {stages.map((stage) => {
                const selected = stage.id === active.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="research-pathway-panel"
                    onClick={() => setActiveId(stage.id)}
                    className={`border-b-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/40 sm:border-r sm:last:border-r-0 ${
                      selected
                        ? "border-b-foreground bg-muted/45 text-foreground"
                        : "border-b-transparent text-muted-foreground hover:bg-muted/25 hover:text-foreground"
                    }`}
                  >
                    <span className="block font-mono text-[10px]">{stage.number}</span>
                    <span className="mt-1 block text-xs font-semibold leading-tight">{stage.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="research-pathway-panel"
              role="tabpanel"
              aria-live="polite"
              className="flex min-h-[440px] flex-col p-7 sm:p-10"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Step {active.number}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{active.label}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{active.cue}</p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground">
                  <ActiveIcon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>

              <div className="my-10 grid border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
                <div className="py-6 sm:pr-8">
                  <p className="text-xs font-semibold text-muted-foreground">Evidence carried forward</p>
                  <p className="mt-3 text-lg font-medium leading-snug text-foreground">{active.evidence}</p>
                </div>
                <div className="border-t border-border py-6 sm:border-t-0 sm:pl-8">
                  <p className="text-xs font-semibold text-muted-foreground">What it changes</p>
                  <p className="mt-3 text-lg font-medium leading-snug text-foreground">{active.translation}</p>
                </div>
              </div>

              <Link
                href={active.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {active.linkLabel} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
