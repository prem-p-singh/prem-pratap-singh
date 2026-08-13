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
  selectedClass: string;
  numberClass: string;
  accentClass: string;
  iconClass: string;
  linkClass: string;
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
    selectedClass: "border-b-field bg-field-wash text-field",
    numberClass: "text-field",
    accentClass: "bg-field",
    iconClass: "border-field/35 bg-field-wash text-field",
    linkClass: "text-field decoration-field/40 hover:decoration-field",
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
    selectedClass: "border-b-biology bg-biology-wash text-biology",
    numberClass: "text-biology",
    accentClass: "bg-biology",
    iconClass: "border-biology/35 bg-biology-wash text-biology",
    linkClass: "text-biology decoration-biology/40 hover:decoration-biology",
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
    selectedClass: "border-b-data bg-data-wash text-data",
    numberClass: "text-data",
    accentClass: "bg-data",
    iconClass: "border-data/35 bg-data-wash text-data",
    linkClass: "text-data decoration-data/40 hover:decoration-data",
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
    selectedClass: "border-b-decision bg-decision-wash text-decision",
    numberClass: "text-decision",
    accentClass: "bg-decision",
    iconClass: "border-decision/35 bg-decision-wash text-decision",
    linkClass: "text-decision decoration-decision/40 hover:decoration-decision",
  },
];

const fieldNotes = [
  {
    label: "Field",
    value: "327 vines · two seasons",
    icon: Sprout,
    tone: "border-field/35 bg-field-wash text-field",
  },
  {
    label: "Bench",
    value: "dPCR · RNA-seq · metabolites",
    icon: Dna,
    tone: "border-biology/35 bg-biology-wash text-biology",
  },
  {
    label: "Analysis",
    value: "Mechanisms · markers · trait leads",
    icon: ChartNoAxesCombined,
    tone: "border-data/35 bg-data-wash text-data",
  },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("crop");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = active.icon;

  return (
    <section id="how-i-work" data-guided-scroll-section className="guided-scroll-section relative py-6 sm:py-8" aria-labelledby="research-pathway-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-kicker">How I work</p>
          <h2
            id="research-pathway-title"
            className="mt-3 text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-5xl"
          >
            Crop improvement is the destination. Data is how I get there.
          </h2>
        </div>

        <div className="paper-panel mt-12 overflow-hidden bg-card lg:grid lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="border-b border-border bg-section-bg p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4 border-b border-foreground/15 pb-4 text-xs text-muted-foreground">
              <span>Field note 04</span>
              <span>Davis, California</span>
            </div>

            <p className="mt-10 font-sans text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              I do not begin with a model. I begin with what changed in the plant.
            </p>

            <div className="relative mt-12 space-y-6 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-gradient-to-b before:from-field/45 before:via-biology/45 before:to-data/45">
              {fieldNotes.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.label} className="relative flex items-center gap-4">
                    <span className={`z-10 flex size-9 shrink-0 items-center justify-center rounded-full border ${note.tone}`}>
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

            <div className="mt-12 border-t border-foreground/15 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Prem Pratap Singh
              </p>
              <div className="mt-3 flex items-center" aria-label="Research route: field, bench, evidence">
                <span className="font-sans text-sm font-semibold text-field">Field</span>
                <span className="mx-3 flex min-w-6 flex-1 items-center" aria-hidden="true">
                  <span className="h-px flex-1 bg-gradient-to-r from-field/70 to-biology/70" />
                  <span className="size-1.5 rounded-full bg-biology" />
                </span>
                <span className="font-sans text-sm font-semibold text-biology">Bench</span>
                <span className="mx-3 flex min-w-6 flex-1 items-center" aria-hidden="true">
                  <span className="h-px flex-1 bg-gradient-to-r from-biology/70 to-data/70" />
                  <span className="size-1.5 rounded-full bg-data" />
                </span>
                <span className="font-sans text-sm font-semibold text-data">Evidence</span>
              </div>
            </div>
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
                        ? stage.selectedClass
                        : "border-b-transparent text-muted-foreground hover:bg-muted/25 hover:text-foreground"
                    }`}
                  >
                    <span className={`block text-xs font-semibold tabular-nums ${stage.numberClass}`}>{stage.number}</span>
                    <span className="mt-1 block text-xs font-semibold leading-tight">{stage.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="research-pathway-panel"
              role="tabpanel"
              aria-live="polite"
              className="relative flex min-h-[440px] flex-col overflow-hidden p-7 sm:p-10"
            >
              <span className={`absolute inset-x-0 top-0 h-0.5 ${active.accentClass}`} aria-hidden="true" />
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className={`text-xs font-semibold tabular-nums ${active.numberClass}`}>Step {active.number}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{active.label}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{active.cue}</p>
                </div>
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-full border ${active.iconClass}`}>
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
                className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors ${active.linkClass}`}
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
