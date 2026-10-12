"use client";

import Link from "next/link";
import { useState, type ComponentType, type KeyboardEvent } from "react";
import {
  AnalysisIcon,
  BenchIcon,
  CropIcon,
  FieldIcon,
  type IconProps,
} from "@/components/icons/PortfolioIcons";

type StageId = "crop" | "signal" | "intelligence" | "improvement";

type Stage = {
  id: StageId;
  label: string;
  cue: string;
  evidence: string;
  translation: string;
  href: string;
  linkLabel: string;
  icon: ComponentType<IconProps>;
};

const stages: Stage[] = [
  {
    id: "crop",
    label: "Start in the field",
    cue: "Observe before measuring",
    evidence: "327 vine samples followed across two growing seasons",
    translation: "Define the plant response and the trait worth improving.",
    href: "/#experience",
    linkLabel: "See the field program",
    icon: FieldIcon,
  },
  {
    id: "signal",
    label: "Measure the signal",
    cue: "See what symptoms miss",
    evidence: "dPCR, RNA sequencing, and metabolite profiles",
    translation: "Find infection and stress responses before the eye can.",
    href: "/#skills",
    linkLabel: "See the laboratory toolkit",
    icon: BenchIcon,
  },
  {
    id: "intelligence",
    label: "Make sense of it",
    cue: "Let biology guide the model",
    evidence: "Multi-omics, causal analysis, and machine learning",
    translation: "Separate strong biological signals from statistical noise.",
    href: "/methods/causal-mediation",
    linkLabel: "Visit the methods lab",
    icon: AnalysisIcon,
  },
  {
    id: "improvement",
    label: "Return to the crop",
    cue: "Evidence should change a decision",
    evidence: "Earlier detection, validated assays, and candidate traits",
    translation: "Move useful evidence toward healthier, more resilient crops.",
    href: "/#projects",
    linkLabel: "See the research outcomes",
    icon: CropIcon,
  },
];

const fieldNotes = [
  { label: "Field", value: "327 vine samples, two seasons" },
  { label: "Bench", value: "dPCR, RNA-seq and metabolites" },
  { label: "Analysis", value: "Mechanisms and candidate markers" },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("crop");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  // Arrow keys, Home and End move focus and selection together, from the focused step.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    const last = stages.length - 1;
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
    setActiveId(stages[next].id);
    tabs[next]?.focus();
  };

  return (
    <section
      id="how-i-work"
      data-guided-scroll-section
      className="guided-scroll-section"
      aria-labelledby="research-pathway-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="section-kicker">How I work</p>
            <h2
              id="research-pathway-title"
              className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Crop improvement is the destination. Data is how I get there.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              I do not begin with a model. I begin with what changed in the plant.
            </p>

            <dl className="mt-8 text-sm leading-normal">
              {fieldNotes.map((note) => (
                <div
                  key={note.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-border py-3"
                >
                  <dt className="text-muted-foreground">{note.label}</dt>
                  <dd className="tabular-nums text-foreground">{note.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-8">
            <div
              role="tablist"
              aria-label="Research pathway"
              onKeyDown={moveWithKeys}
              className="grid border-l border-border md:grid-cols-4 md:border-l-0 md:border-t"
            >
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    id={`research-pathway-tab-${stage.id}`}
                    aria-selected={stage.id === active.id}
                    aria-controls="research-pathway-panel"
                    onClick={() => setActiveId(stage.id)}
                    className="-ml-px flex items-center gap-3 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:border-accent aria-selected:text-foreground md:-mt-px md:ml-0 md:flex-col md:items-start md:gap-2 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-4"
                  >
                    <span className="text-xs tabular-nums">{index + 1}</span>
                    <Icon className="shrink-0" />
                    <span className="text-sm font-semibold leading-snug">{stage.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="research-pathway-panel"
              role="tabpanel"
              aria-labelledby={`research-pathway-tab-${active.id}`}
              aria-live="polite"
              className="mt-10"
            >
              <h3 className="text-2xl leading-tight text-foreground sm:text-3xl">{active.label}</h3>
              <p className="mt-2 text-base text-muted-foreground">{active.cue}</p>

              <dl className="mt-6 text-sm leading-normal">
                <div className="grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-muted-foreground">Evidence carried forward</dt>
                  <dd className="tabular-nums text-foreground">{active.evidence}</dd>
                </div>
                <div className="grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-muted-foreground">What it changes</dt>
                  <dd className="text-foreground">{active.translation}</dd>
                </div>
              </dl>

              <Link
                href={active.href}
                className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
              >
                {active.linkLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
