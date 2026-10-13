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
type Tone = "field" | "biology" | "data" | "decision";

// Family colours, written out in full so Tailwind can see every class.
const tones: Record<Tone, { tile: string; edge: string; selected: string; link: string }> = {
  field: {
    tile: "bg-field-wash text-field",
    edge: "bg-field",
    selected: "aria-selected:border-field",
    link: "text-field",
  },
  biology: {
    tile: "bg-biology-wash text-biology",
    edge: "bg-biology",
    selected: "aria-selected:border-biology",
    link: "text-biology",
  },
  data: {
    tile: "bg-data-wash text-data",
    edge: "bg-data",
    selected: "aria-selected:border-data",
    link: "text-data",
  },
  decision: {
    tile: "bg-decision-wash text-decision",
    edge: "bg-decision",
    selected: "aria-selected:border-decision",
    link: "text-decision",
  },
};

const iconTile = "flex size-11 shrink-0 items-center justify-center rounded-xl";

type Stage = {
  id: StageId;
  label: string;
  cue: string;
  evidence: string;
  translation: string;
  href: string;
  linkLabel: string;
  icon: ComponentType<IconProps>;
  tone: Tone;
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
    tone: "field",
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
    tone: "biology",
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
    tone: "data",
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
    tone: "decision",
  },
];

const fieldNotes: Array<{
  label: string;
  value: string;
  icon: ComponentType<IconProps>;
  tone: Tone;
}> = [
  { label: "Field", value: "327 vine samples, two seasons", icon: FieldIcon, tone: "field" },
  { label: "Bench", value: "dPCR, RNA-seq and metabolites", icon: BenchIcon, tone: "biology" },
  {
    label: "Analysis",
    value: "Mechanisms, markers and trait leads",
    icon: AnalysisIcon,
    tone: "data",
  },
];

export default function ResearchPathway() {
  const [activeId, setActiveId] = useState<StageId>("crop");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = active.icon;
  const activeTone = tones[active.tone];

  // Arrow keys, Home and End move focus and selection together, from the focused step.
  // Modified keys are left alone so browser and system shortcuts keep working.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
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
      className="guided-scroll-section"
      aria-labelledby="research-pathway-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="section-kicker">How I work</p>
            <h2
              id="research-pathway-title"
              className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl"
            >
              Crop improvement is the destination. Data is how I get there.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              I do not begin with a model. I begin with what changed in the plant.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Davis, California</p>

            <dl className="paper-panel mt-8 divide-y divide-border px-5 text-sm leading-normal">
              {fieldNotes.map((note) => {
                const Icon = note.icon;
                return (
                  <div key={note.label} className="relative py-4 pl-15">
                    <dt className="text-muted-foreground">
                      <span
                        className={`absolute inset-y-0 left-0 my-auto ${iconTile} ${tones[note.tone].tile}`}
                      >
                        <Icon size={22} />
                      </span>
                      {note.label}
                    </dt>
                    <dd className="font-medium tabular-nums text-foreground">{note.value}</dd>
                  </div>
                );
              })}
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
                const tone = tones[stage.tone];
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    id={`research-pathway-tab-${stage.id}`}
                    aria-selected={stage.id === active.id}
                    tabIndex={stage.id === active.id ? 0 : -1}
                    aria-controls="research-pathway-panel"
                    onClick={() => setActiveId(stage.id)}
                    className={`-ml-px flex items-center gap-3 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:text-foreground md:-mt-px md:ml-0 md:flex-col md:items-start md:gap-3 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-4 ${tone.selected}`}
                  >
                    <span className={`${iconTile} ${tone.tile}`}>
                      <Icon size={22} />
                    </span>
                    <span className="text-sm font-semibold leading-snug">
                      <span className="mr-2 tabular-nums">{index + 1}</span>
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="research-pathway-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`research-pathway-tab-${active.id}`}
              className="paper-panel mt-8 p-6 sm:p-8"
            >
              <span className={`absolute inset-x-0 top-0 h-1 ${activeTone.edge}`} aria-hidden="true" />
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-2xl leading-tight text-foreground sm:text-3xl">
                    {active.label}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">{active.cue}</p>
                </div>
                <span className={`${iconTile} ${activeTone.tile}`}>
                  <ActiveIcon size={22} />
                </span>
              </div>

              <dl className="mt-6 grid border-y border-border text-sm leading-normal sm:grid-cols-2 sm:divide-x sm:divide-border">
                <div className="py-5 sm:pr-6">
                  <dt className="text-muted-foreground">Evidence carried forward</dt>
                  <dd className="mt-2 text-base font-medium leading-snug tabular-nums text-foreground">
                    {active.evidence}
                  </dd>
                </div>
                <div className="border-t border-border py-5 sm:border-t-0 sm:pl-6">
                  <dt className="text-muted-foreground">What it changes</dt>
                  <dd className="mt-2 text-base font-medium leading-snug text-foreground">
                    {active.translation}
                  </dd>
                </div>
              </dl>

              <Link
                href={active.href}
                className={`mt-5 inline-block text-sm font-semibold underline underline-offset-4 ${activeTone.link}`}
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
